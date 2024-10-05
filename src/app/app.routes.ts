import { Routes } from '@angular/router';
import { MatchesListComponent } from './pages/matches-list/matches-list.component';
import { MatchEditorComponent } from './pages/match-editor/match-editor.component';
import { CompetitionsComponent } from './pages/competitions-component/competitions.component';
import { ParticipantsListsComponent } from './pages/participant-lists-component/participants-list.component';
import { ParticipantsListEditorComponent } from './pages/participant-list-editor-component/participants-list-editor.component';
import { ManageCompetitionComponent } from './pages/manage-competition/manage-competition.component';
import { CompetitionResultsComponent } from './pages/competition-results/competition-results.component';
import { MatchResultsComponent } from './pages/match-results/match-results.component';

export const routes: Routes = [
    { path: '', redirectTo: '/competitions', pathMatch: 'full'  },
    { path: 'matches', component: MatchesListComponent },
    { path: 'matches/:id', component: MatchEditorComponent },
    { path: 'matches/:id/results', component: MatchResultsComponent },
    { path: 'competitions', component: CompetitionsComponent },
    { path: 'competitions/:competitionId', component: ManageCompetitionComponent },
    { path: 'competitions/:competitionId/results', component: CompetitionResultsComponent },
    { path: 'participantlists', component: ParticipantsListsComponent },
    { path: 'participantlists/:listId', component: ParticipantsListEditorComponent },
    { path: 'participantlists/:listId/members/:id', component: ParticipantsListEditorComponent },
];

