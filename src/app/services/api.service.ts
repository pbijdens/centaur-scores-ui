import { Injectable } from '@angular/core';
import { MatchModel } from '../models/match-model';
import { ParticipantModel } from '../models/participant-model';
import { CompetitionModel } from '../models/competition-model';
import { ParticipantsListModel } from '../models/participants-list-model';
import { ParticipantsListMember } from '../models/participants-list-member';
import { RulesetModel } from '../models/ruleset-model';
import { MatchResultModel } from '../models/match-result-model';
import { CompetitionResultModel } from '../models/competition-result-model';
import { PersonalBestListModel } from '../models/personal-best-list-model';
import { PersonalBestListEntryModel } from '../models/personal-lest-list-entry-model';
import { NewPersonalBestModel } from '../models/new-personal-best-model';
import { WhoAmIResponse } from '../models/who-am-i-response';
import { AuthorizationService } from './authorization.service';
import { UserModel } from '../models/user-model';
import { UserACLModel } from '../models/user-acl-model';
import { ActiveListService } from './active-list.service';
import { MatchFinalDefinition } from '../models/match-final-definition';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private authorizationService: AuthorizationService, private activeListService: ActiveListService) { }

  get url(): String {
    const result = `${window.location.protocol}//${window.location.hostname}:8062`;
    return result;
  }

  async getMatches(): Promise<MatchModel[]> {
    const data = await fetch(this.activeListService.activeList >= 0 ? `${this.url}/list/${this.activeListService.activeList}/match` : `${this.url}/match`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getMatch(id: number): Promise<MatchModel> {
    const data = await fetch(`${this.url}/match/${id}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? {};
  }

  async getActiveMatch(): Promise<MatchModel | undefined> {
    const data = await fetch(`${this.url}/match/active`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status == 200) return (await data.json()) ?? {};
    else return undefined;
  }

  async putMatch(match: MatchModel): Promise<MatchModel> {
    const data = await fetch(`${this.url}/match/${match.id}`, {
      method: 'PUT',
      body: JSON.stringify(match),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }
  async postMatch(match: MatchModel): Promise<MatchModel> {
    const data = await fetch(`${this.url}/match`, {
      method: 'POST',
      body: JSON.stringify(match),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async deleteMatch(match: MatchModel): Promise<boolean> {
    const data = await fetch(`${this.url}/match/${match.id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async setActive(match: MatchModel, value: boolean): Promise<void> {
    const data = await fetch(`${this.url}/match/${match.id}/active/${value}`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getParticipantsForMatch(matchId: number): Promise<Array<ParticipantModel>> {
    const data = await fetch(`${this.url}/match/${matchId}/participants`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getCompetitions(): Promise<CompetitionModel[]> {
    const data = await fetch(this.activeListService.activeList >= 0 ? `${this.url}/list/${this.activeListService.activeList}/competitions` : `${this.url}/competitions`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getParticipantsLists(): Promise<ParticipantsListModel[]> {
    const data = await fetch(`${this.url}/participantlists`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getParticipantsListMember(listId: number, id: number): Promise<ParticipantsListMember> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members/${id}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getParticipantsListMembers(listId: number): Promise<ParticipantsListMember[]> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async deleteParticipantsListMember(listId: number, id: number): Promise<number> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members/${id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async addParticipantsListMember(listId: number, participant: ParticipantsListMember): Promise<ParticipantsListMember> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members`, {
      method: 'POST',
      body: JSON.stringify(participant),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? []) : participant;
  }

  async updateParticipantsListMember(listId: number, id: number, participant: ParticipantsListMember): Promise<ParticipantsListMember> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(participant),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async addParticipantsList(list: ParticipantsListModel): Promise<ParticipantsListModel> {
    list.id = -1;
    const data = await fetch(`${this.url}/participantlists`, {
      method: 'POST',
      body: JSON.stringify(list),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async deleteParticipantsList(list: ParticipantsListModel): Promise<number> {
    const data = await fetch(`${this.url}/participantlists/${list.id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async updateParticipantsList(list: ParticipantsListModel): Promise<ParticipantModel> {
    const data = await fetch(`${this.url}/participantlists/${list.id}`, {
      method: 'PUT',
      body: JSON.stringify(list),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async addCompetition(competition: CompetitionModel): Promise<CompetitionModel> {
    competition.id = -1;
    const data = await fetch(`${this.url}/competitions`, {
      method: 'POST',
      body: JSON.stringify(competition),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async deleteCompetition(competition: CompetitionModel): Promise<number> {
    const data = await fetch(`${this.url}/competitions/${competition.id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async updateCompetition(competition: CompetitionModel): Promise<ParticipantModel> {
    const data = await fetch(`${this.url}/competitions/${competition.id}`, {
      method: 'PUT',
      body: JSON.stringify(competition),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getRulesets(): Promise<RulesetModel[]> {
    const data = await fetch(this.activeListService.activeList >= 0 ? `${this.url}/list/${this.activeListService.activeList}/rulesets` : `${this.url}/rulesets`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getCompetition(id: number): Promise<CompetitionModel | undefined> {
    const data = await fetch(`${this.url}/competitions/${id}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async getParticipantsList(id: number): Promise<ParticipantsListModel | undefined> {
    const data = await fetch(`${this.url}/participantlists/${id}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async getParticipantForMatch(matchId: number, participantId: number): Promise<ParticipantModel | undefined> {
    const data = await fetch(`${this.url}/match/${matchId}/participants/${participantId}/scoresheet`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async deleteParticipantForMatch(matchId: number, participantId: number): Promise<number> {
    const data = await fetch(`${this.url}/match/${matchId}/participants/${participantId}/scoresheet`, {
      method: 'DELETE',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async updateMatchParticipant(matchId: number, participant: ParticipantModel): Promise<ParticipantModel> {
    const data = await fetch(`${this.url}/match/${matchId}/participants/${participant.id}/scoresheet`, {
      method: 'PUT',
      body: JSON.stringify(participant),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async createParticipantForMatch(matchId: number, participant: ParticipantModel): Promise<CompetitionModel> {
    const data = await fetch(`${this.url}/match/${matchId}/participants/scoresheet`, {
      method: 'POST',
      body: JSON.stringify(participant),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getSingleMatchResults(id: number): Promise<MatchResultModel | undefined> {
    const data = await fetch(`${this.url}/match/${id}/results`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async getCompetitionResults(id: number): Promise<CompetitionResultModel | undefined> {
    const data = await fetch(`${this.url}/competitions/${id}/results`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async updatePersonalBestList(listId: number, list: PersonalBestListModel) {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl/${list.id}`, {
      method: 'PUT',
      body: JSON.stringify(list),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }
  async createPersonalBestList(listId: number, list: PersonalBestListModel) {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl`, {
      method: 'POST',
      body: JSON.stringify(list),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async deletePersonalBestList(listId: number, pbListId: number) {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl/${pbListId}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getPersonalBestList(listId: number, pbListId: number): Promise<PersonalBestListModel> {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl/${pbListId}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async getPersonalBestLists(listId: number): Promise<PersonalBestListModel[]> {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async updatePersonalBestListEntry(listId: number, list: PersonalBestListModel, entry: PersonalBestListEntryModel) {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl/${list.id}/members/${entry.id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async createPersonalBestListEntry(listId: number, list: PersonalBestListModel, entry: PersonalBestListEntryModel) {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl/${list.id}/members`, {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async deletePersonalBestListEntry(listId: number, list: PersonalBestListModel, entry: PersonalBestListEntryModel) {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl/${list.id}/members/${entry.id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders()
    });
    if (data.status != 200) throw "API Failure";
    return (await data.json()) ?? [];
  }

  async getPersonalBestListEntry(listId: number, pbListId: number, entryId: number): Promise<PersonalBestListEntryModel | undefined> {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl/${pbListId}/members/${entryId}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async getPersonalBestSuggestions(listId: number): Promise<NewPersonalBestModel[]> {
    const data = await fetch(`${this.url}/participantlists/${listId}/pbl/suggestions`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async getLoggedInUser(): Promise<WhoAmIResponse | undefined> {
    const data = await fetch(`${this.url}/auth/whoami`, {
      headers: await this.defaultHeaders()
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async signin(username: string, password: string): Promise<string | undefined> {
    const data = await fetch(`${this.url}/auth/login`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
      body: JSON.stringify({ username: username, password: password })
    });
    if (data.status != 200) throw "API Failure";
    return data.status == 200 ? ((await data.text()) ?? undefined) : undefined;
  }

  async getUsers(): Promise<UserModel[]> {
    const data = await fetch(`${this.url}/auth/user`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async updateUser(user: UserModel): Promise<UserModel> {
    const data = await fetch(`${this.url}/auth/user`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(user)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async updatePassword(user: UserModel): Promise<UserModel> {
    const data = await fetch(`${this.url}/auth/password`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(user)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async createUser(user: UserModel): Promise<UserModel> {
    user.id = -1;
    const data = await fetch(`${this.url}/auth/user`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(user)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async deleteUser(user: UserModel): Promise<UserModel> {
    const data = await fetch(`${this.url}/auth/user/${user.id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders()
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async getACLs(): Promise<UserACLModel[]> {
    const data = await fetch(`${this.url}/auth/acl`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async updateACL(acl: UserACLModel): Promise<UserACLModel> {
    const data = await fetch(`${this.url}/auth/acl`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(acl)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async createACL(acl: UserACLModel): Promise<UserACLModel> {
    acl.id = -1;
    const data = await fetch(`${this.url}/auth/acl`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
      body: JSON.stringify(acl)
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async deleteACL(acl: UserACLModel): Promise<UserACLModel> {
    const data = await fetch(`${this.url}/auth/acl/${acl.id}`, {
      method: 'DELETE',
      headers: await this.defaultHeaders()
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async defaultHeaders(): Promise<HeadersInit | undefined> {
    return {
      "content-type": "application/json",
      "authorization": await this.authorizationService.getOAuthBearerTokenValue(),
    };
  }

  async getMatchUiSetting(matchId: number, setting: string): Promise<string | undefined> {
    const data = await fetch(`${this.url}/match/${matchId}/setting/${setting}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async updateMatchUiSetting(matchId: number, setting: string, value: string): Promise<string | undefined> {
    const data = await fetch(`${this.url}/match/${matchId}/setting/${setting}/value/${value}`, {
      method: 'PUT',
      headers: await this.defaultHeaders()
    });
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async getUiConfiguration(setting: string): Promise<any | undefined> {
    const data = await fetch(`${this.url}/admin/config/${setting}`, {
      method: 'GET',
      headers: await this.defaultHeaders(),
    });
    if (data.status == 204) return undefined;;
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async putUiConfiguration(setting: string, value: string): Promise<string | undefined> {
    const data = await fetch(`${this.url}/admin/config/${setting}`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
      body: JSON.stringify({ value: value }),
    });
    if (data.status == 204) return undefined;;
    if (data.status != 200) throw "API Failure";
    return await data.json();
  }

  async createMatchFromFinalsDefinition(matchId: number, definition: MatchFinalDefinition): Promise<number | undefined> {
    const data = await fetch(`${this.url}/match/${matchId}/finals`, {
      method: 'POST',
      body: JSON.stringify(definition),
      headers: await this.defaultHeaders(),
    });
    if (data.status == 204) return undefined;;
    if (data.status != 200) throw "API Failure";
    return (await data.json()).id;
  }

  async updateH2HWinner(matchId: number, discipline: string, bracket: number, winnerId: number, loserId: number): Promise<void> {
    const data = await fetch(`${this.url}/match/${matchId}/finals/win/${discipline}/${bracket}/${winnerId}/${loserId}`, {
      method: 'PUT',
      headers: await this.defaultHeaders(),
    });
    if (data.status == 204) return undefined;;
    if (data.status != 200) throw "API Failure";
  }

  async putH2HNextRound(matchId: number): Promise<void> {
    const data = await fetch(`${this.url}/match/${matchId}/finals/nextround`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
    });
    if (data.status == 204) return undefined;;
    if (data.status != 200) throw "API Failure";
  }

  async putH2HPrevRound(matchId: number): Promise<void> {
    const data = await fetch(`${this.url}/match/${matchId}/finals/nextround/undo`, {
      method: 'POST',
      headers: await this.defaultHeaders(),
    });
    if (data.status == 204) return undefined;;
    if (data.status != 200) throw "API Failure";
  }

}
