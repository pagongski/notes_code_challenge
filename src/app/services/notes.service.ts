import {Injectable} from '@angular/core';
import 'secure-ls';
import {Note} from '../models/note';
import {Observable, of} from 'rxjs';
import {current} from '../../../node_modules/codelyzer/util/syntaxKind';

// const NOTES: Note[] = [{
//   id: 1,
//   date: '2018-08-23',
//   title: 'note 1',
//   description: 'description of note 1'
// }];

declare var SecureLS: any;

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    notes: Note[];
    ls = new SecureLS();

    constructor() {
    }

    getNextId(): number {
        // let nextId = localStorage.getItem('notesSequenceId');
        let nextId = this.ls.get('notesSequenceId');
        if (!nextId) {
            nextId = '1';
        }
        this.setNextId(String(+nextId + 1));
        return +nextId;
    }

    setNextId(sequence: string): void {
        // localStorage.setItem('notesSequenceId', sequence);
        this.ls.set('notesSequenceId', sequence);
    }

    getNotes(): Observable<Note[]> {
        // this.notes = JSON.parse(localStorage.getItem('notes'));
        const notesTemp = this.ls.get('notes');
        if (!notesTemp) {
            this.notes = null;
        } else {
            this.notes = JSON.parse(notesTemp);
        }

        return of(this.notes);
    }

    createNote(note: Note): void {
        if (!this.notes) {
            this.notes = [];
        }
        note.id = this.getNextId();
        this.notes.push(note);
        this.updateNotes();
    }

    updateNote(note: Note, index: number): void {
        console.log('edited note');
        this.notes[index] = note;
        this.updateNotes();
    }

    updateNotes(): void {
        this.ls.set('notes', JSON.stringify(this.notes));
        // localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    deleteNote(note: Note): void {
        console.log('');
        this.notes = this.notes.filter(x => x !== note);
        if (this.notes.length > 0) {
            this.updateNotes();
        } else {
            this.removeAll();
        }
    }

    removeAll(): void {
        // localStorage.clear();
        this.ls.removeAll();
    }
}
