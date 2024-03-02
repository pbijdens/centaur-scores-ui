import { Routes } from '@angular/router';
import { MatchesListComponent } from './matches-list/matches-list.component';
import { MatchEditorComponent } from './match-editor/match-editor.component';
import { MatchResultViewComponent } from './match-result-view/match-result-view.component';

export const routes: Routes = [
    { path: '', redirectTo: '/matches', pathMatch: 'full'  },
    { path: 'matches', component: MatchesListComponent },
    { path: 'edit/:id', component: MatchEditorComponent },
    { path: 'result/:id', component: MatchResultViewComponent },
];
