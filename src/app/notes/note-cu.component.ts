import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {NotesService} from '../services/notes.service';
import {Note} from '../models/note';

@Component({
    selector: 'app-note-cu',
    templateUrl: './note-cu.component.html',
    styleUrls: ['./note-cu.component.css']
})
export class NoteCUComponent implements OnInit {

    cuNoteForm: FormGroup;
    dateNow = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    @Input() note: Note = {id: 0, date: this.dateNow, title: '', description: ''};
    @Input() index: number;
    @Input() actionType: string;
    @Input() formTitle = 'Create New Note';
    @Input() submitButtonLabel = 'Create Note';
    @Input() closeButtonLabel = 'Cancel';

    constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router, private notesService: NotesService) {
    }

    ngOnInit() {


        this.cuNoteForm = this.fb.group({
            id: [this.note.id],
            date: [this.note.date],
            title: [this.note.title, Validators.required],
            description: [this.note.description, Validators.required]
        });
    }
    get title() { return this.cuNoteForm.get('title'); }

    get description() { return this.cuNoteForm.get('description'); }
    onSubmit(note: Note): void {

        if (this.actionType === 'create') {
            this.notesService.createNote(note);
        } else {
            this.notesService.updateNote(note, this.index);
        }

        this.activeModal.close(this.actionType);
    }


}
