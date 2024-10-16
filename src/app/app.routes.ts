import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/competitions', pathMatch: 'full'  },
    { path: 'matches', loadComponent: () => import('./pages/matches-list/matches-list.component').then(mod => mod.MatchesListComponent) },
    { path: 'matches/:id', loadComponent: () => import('./pages/match-editor/match-editor.component').then(mod => mod.MatchEditorComponent) },
    { path: 'matches/:id/results', loadComponent: () => import('./pages/match-results/match-results.component').then(mod => mod.MatchResultsComponent) },
    { path: 'competitions', loadComponent: () => import('./pages/competitions-component/competitions.component').then(mod => mod.CompetitionsComponent) },
    { path: 'competitions/:competitionId', loadComponent: () => import('./pages/manage-competition/manage-competition.component').then(mod => mod.ManageCompetitionComponent) },
    { path: 'competitions/:competitionId/matches', redirectTo: '/competitions/:competitionId', pathMatch: 'full' },
    { path: 'competitions/:competitionId/matches/:id', loadComponent: () => import('./pages/match-editor/match-editor.component').then(mod => mod.MatchEditorComponent) },
    { path: 'competitions/:competitionId/matches/:id/results', loadComponent: () => import('./pages/match-results/match-results.component').then(mod => mod.MatchResultsComponent) },
    { path: 'competitions/:competitionId/participantlists', redirectTo: '/competitions/:competitionId', pathMatch: 'full' },
    { path: 'competitions/:competitionId/participantlists/:listId', loadComponent: () => import('./pages/participant-list-editor-component/participants-list-editor.component').then(mod => mod.ParticipantsListEditorComponent) },
    { path: 'competitions/:competitionId/participantlists/:listId/pbl', loadComponent: () => import('./pages/personal-best-lists/personal-best-lists.component').then(mod => mod.PersonalBestListsComponent) },
    { path: 'competitions/:competitionId/participantlists/:listId/pbl/:pblId', loadComponent: () => import('./pages/personal-best-list-editor/personal-best-list-editor.component').then(mod => mod.PersonalBestListEditorComponent) },
    { path: 'competitions/:competitionId/participantlists/:listId/personalbest', loadComponent: () => import('./pages/personal-best-suggestions/personal-best-suggestions.component').then(mod => mod.PersonalBestSuggestionsComponent) },    
    { path: 'competitions/:competitionId/results', loadComponent: () => import('./pages/competition-results/competition-results.component').then(mod => mod.CompetitionResultsComponent) },
    { path: 'participantlists', loadComponent: () => import('./pages/participant-lists-component/participants-list.component').then(mod => mod.ParticipantsListsComponent) },
    { path: 'participantlists/:listId', loadComponent: () => import('./pages/participant-list-editor-component/participants-list-editor.component').then(mod => mod.ParticipantsListEditorComponent) },
    { path: 'participantlists/:listId/pbl', loadComponent: () => import('./pages/personal-best-lists/personal-best-lists.component').then(mod => mod.PersonalBestListsComponent) },
    { path: 'participantlists/:listId/pbl/:pblId', loadComponent: () => import('./pages/personal-best-list-editor/personal-best-list-editor.component').then(mod => mod.PersonalBestListEditorComponent) },
    { path: 'participantlists/:listId/personalbest', loadComponent: () => import('./pages/personal-best-suggestions/personal-best-suggestions.component').then(mod => mod.PersonalBestSuggestionsComponent) },

    { path: 'auth', redirectTo: '/auth/user', pathMatch: 'full' },
    { path: 'auth/user', loadComponent: () => import('./pages/user-list/user-list.component').then(mod => mod.UserListComponent) }, // component: UserListComponent) },
    { path: 'auth/acl', loadComponent: () => import('./pages/user-acl-list/user-acl-list.component').then(mod => mod.UserAclListComponent) }, // component: UserAclListComponent) },
];


