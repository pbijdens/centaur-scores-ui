import { Routes } from '@angular/router';
import { MatchesListComponent } from './pages/matches-list/matches-list.component';
import { MatchEditorComponent } from './pages/match-editor/match-editor.component';
import { MatchResultViewComponent } from './pages/match-result-view/match-result-view.component';
import { CompetitionsComponent } from './pages/competitions-component/competitions.component';
import { ParticipantsListsComponent } from './pages/participant-lists-component/participants-list.component';
import { ParticipantsListEditorComponent } from './pages/participant-list-editor-component/participants-list-editor.component';
import { ManageCompetitionComponent } from './pages/manage-competition/manage-competition.component';

export const routes: Routes = [
    { path: '', redirectTo: '/matches', pathMatch: 'full'  },
    { path: 'matches', component: MatchesListComponent },
    { path: 'matches/:id', component: MatchEditorComponent },
    { path: 'competitions', component: CompetitionsComponent },
    { path: 'competitions/:competitionId', component: ManageCompetitionComponent },
    { path: 'participantlists', component: ParticipantsListsComponent },
    { path: 'participantlists/:listId', component: ParticipantsListEditorComponent },
    { path: 'participantlists/:listId/members/:id', component: ParticipantsListEditorComponent },
    { path: 'result/:id', component: MatchResultViewComponent },
    { path: 'result/:id/:sort', component: MatchResultViewComponent },
];

