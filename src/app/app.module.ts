import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NotesComponent} from './notes/notes.component';
import { NoteCUComponent } from './notes/note-cu.component';
import { AboutComponent } from './about/about.component';


@NgModule({
    declarations: [
        AppComponent,
        NotesComponent,
        NoteCUComponent,
        AboutComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        NgbActiveModal
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        NoteCUComponent
    ]
})
export class AppModule {
}
