import { Routes } from '@angular/router';
import { MatchesListComponent } from './pages/matches-list/matches-list.component';
import { MatchEditorComponent } from './pages/match-editor/match-editor.component';
import { CompetitionsComponent } from './pages/competitions-component/competitions.component';
import { ParticipantsListsComponent } from './pages/participant-lists-component/participants-list.component';
import { ParticipantsListEditorComponent } from './pages/participant-list-editor-component/participants-list-editor.component';
import { ManageCompetitionComponent } from './pages/manage-competition/manage-competition.component';
import { CompetitionResultsComponent } from './pages/competition-results/competition-results.component';
import { MatchResultsComponent } from './pages/match-results/match-results.component';
import { PersonalBestListsComponent } from './pages/personal-best-lists/personal-best-lists.component';
import { PersonalBestListEditorComponent } from './pages/personal-best-list-editor/personal-best-list-editor.component';
import { PersonalBestSuggestionsComponent } from './pages/personal-best-suggestions/personal-best-suggestions.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserAclListComponent } from './pages/user-acl-list/user-acl-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/competitions', pathMatch: 'full'  },
    { path: 'matches', component: MatchesListComponent },
    { path: 'matches/:id', component: MatchEditorComponent },
    { path: 'matches/:id/results', component: MatchResultsComponent },
    { path: 'competitions', component: CompetitionsComponent },
    { path: 'competitions/:competitionId', component: ManageCompetitionComponent },
    { path: 'competitions/:competitionId/matches', redirectTo: '/competitions/:competitionId', pathMatch: 'full' },
    { path: 'competitions/:competitionId/matches/:id', component: MatchEditorComponent },
    { path: 'competitions/:competitionId/matches/:id/results', component: MatchResultsComponent },
    { path: 'competitions/:competitionId/participantlists', redirectTo: '/competitions/:competitionId', pathMatch: 'full' },
    { path: 'competitions/:competitionId/participantlists/:listId', component: ParticipantsListEditorComponent },
    { path: 'competitions/:competitionId/participantlists/:listId/pbl', component: PersonalBestListsComponent },
    { path: 'competitions/:competitionId/participantlists/:listId/pbl/:pblId', component: PersonalBestListEditorComponent },
    { path: 'competitions/:competitionId/participantlists/:listId/personalbest', component: PersonalBestSuggestionsComponent },    
    { path: 'competitions/:competitionId/results', component: CompetitionResultsComponent },
    { path: 'participantlists', component: ParticipantsListsComponent },
    { path: 'participantlists/:listId', component: ParticipantsListEditorComponent },
    { path: 'participantlists/:listId/pbl', component: PersonalBestListsComponent },
    { path: 'participantlists/:listId/pbl/:pblId', component: PersonalBestListEditorComponent },
    { path: 'participantlists/:listId/personalbest', component: PersonalBestSuggestionsComponent },

    { path: 'auth', redirectTo: '/auth/user', pathMatch: 'full' },
    { path: 'auth/user', component: UserListComponent },
    { path: 'auth/acl', component: UserAclListComponent },
];


