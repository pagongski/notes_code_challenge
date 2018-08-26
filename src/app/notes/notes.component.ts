import {Component, OnInit} from '@angular/core';
import {Note} from '../models/note';
import {NotesService} from '../services/notes.service';
import {AppRoutingModule} from '../app-routing.module';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NoteCUComponent} from './note-cu.component';


@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {


    notes: Note[] = [];
    selectedNote: Note;
    deleteOneType = false;
    removeAllType = false;

    constructor(private notesService: NotesService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.getNotes();
    }

    actionNote(actionType: string, note: Note = null, index: number = 0) {
        const modalRef = this.modalService.open(NoteCUComponent, { centered: true });
        modalRef.componentInstance.actionType = actionType;
        switch (actionType) {
            case 'update':
                modalRef.componentInstance.note = note;
                modalRef.componentInstance.index = index;
                modalRef.componentInstance.formTitle = 'Update Note';
                modalRef.componentInstance.submitButtonLabel = 'Update';

                break;
            case 'view':
                modalRef.componentInstance.note = note;
                modalRef.componentInstance.index = index;
                modalRef.componentInstance.formTitle = 'View Note Details';
                modalRef.componentInstance.closeButtonLabel = 'Close';

                break;
        }
        modalRef.result.then((result) => {
            if (result === 'update' || result === 'create') {
                this.getNotes();
            }
        }, (reason) => {

        });

    }

    removeAll() {
        this.removeAllType = true;
        const that = this;
        $('#alertModal').modal().on('hide.bs.modal', function (e) {
            that.removeAllType = false;
        });
        $('#alertModal #modalHeaderText').text('Are you sure you want to remove all notes?');
        $('#alertModal #noteTitle').text('');
        $('#alertModal #noteDescription').text('All notes in local storage will be deleted and sequenceIds will be reset.');
    }

    removeAllConfirm() {
        this.notesService.removeAll();
        this.getNotes();
    }

    deleteNote(note): void {
        this.deleteOneType = true;
        this.selectedNote = note;
        const that = this;
        $('#alertModal').modal().on('hide.bs.modal', function (e) {
            that.deleteOneType = false;
        });
        $('#alertModal #modalHeaderText').text('Are you sure you want me to delete this note?');
        $('#alertModal #noteTitle').text(note.title);
        $('#alertModal #noteDescription').text(note.description);

    }

    deleteNoteConfirm(): void {
        this.notesService.deleteNote(this.selectedNote);
        this.getNotes();
    }

    getNotes(): void {
        this.notesService.getNotes().subscribe(notes => {
            this.notes = notes;
        });
    }


}
