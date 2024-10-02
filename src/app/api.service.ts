import { Injectable } from '@angular/core';
import { MatchModel } from './models/match-model';
import { ParticipantModel } from './models/participant-model';
import { CompetitionModel } from './models/competition-model';
import { ParticipantsListModel } from './models/participants-list-model';
import { ParticipantsListMember } from './models/participants-list-member';
import { RulesetModel } from './models/ruleset-model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  get url(): String {
    const result = `${window.location.protocol}//${window.location.hostname}:8062`;
    return result;
  }

  async getMatches(): Promise<MatchModel[]> {
    const data = await fetch(`${this.url}/match`);
    return (await data.json()) ?? [];
  }

  async getMatch(id: number): Promise<MatchModel> {
    const data = await fetch(`${this.url}/match/${id}`);
    return (await data.json()) ?? {};
  }

  async getActiveMatch(): Promise<MatchModel | undefined> {
    const data = await fetch(`${this.url}/match/active`);
    if (data.status == 200) return (await data.json()) ?? {}; 
    else return undefined;
  }

  async putMatch(match: MatchModel): Promise<MatchModel> {
    const data = await fetch(`${this.url}/match/${match.id}`, {
      method: 'PUT',
      body: JSON.stringify(match),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];
  }
  async postMatch(match: MatchModel): Promise<MatchModel> {
    const data = await fetch(`${this.url}/match`, {
      method: 'POST',
      body: JSON.stringify(match),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];
  }

  async setActive(match: MatchModel, value: boolean): Promise<void> {
    const data = await fetch(`${this.url}/match/${match.id}/active/${value}`, {
      method: 'PUT'
    });
    return (await data.json()) ?? [];
  }

  async getParticipantsForMatch(matchId: number): Promise<Array<ParticipantModel>> {
    const data = await fetch(`${this.url}/match/${matchId}/participants`, {
      method: 'GET'
    });
    return (await data.json()) ?? [];
  }

  async getCompetitions(): Promise<CompetitionModel[]> {
    const data = await fetch(`${this.url}/competitions`);
    return (await data.json()) ?? [];
  }

  async getParticipantsLists(): Promise<ParticipantsListModel[]> {
    const data = await fetch(`${this.url}/participantlists`);
    return (await data.json()) ?? [];
  }

  async getParticipantsListMember(listId: number, id: number): Promise<ParticipantModel> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members/${id}`);
    return (await data.json()) ?? [];
  }

  async getParticipantsListMembers(listId: number): Promise<ParticipantsListMember[]> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members`);
    return (await data.json()) ?? [];
  }

  async deleteParticipantsListMember(listId: number, id: number): Promise<number> {
    {
      const data = await fetch(`${this.url}/participantlists/${listId}/members/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      });
      return (await data.json()) ?? [];
    }
  }

  async addParticipantsListMember(listId: number, participant: ParticipantsListMember): Promise<ParticipantsListMember> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members`, {
      method: 'POST',
      body: JSON.stringify(participant),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];
  }

  async updateParticipantsListMember(listId: number, id: number, participant: ParticipantsListMember): Promise<ParticipantsListMember> {
    const data = await fetch(`${this.url}/participantlists/${listId}/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(participant),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];
  }

  async addParticipantsList(list: ParticipantsListModel): Promise<ParticipantsListModel> {
    list.id = -1;
    const data = await fetch(`${this.url}/participantlists`, {
      method: 'POST',
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];
  }

  async deleteParticipantsList(list: ParticipantsListModel): Promise<number> {
    const data = await fetch(`${this.url}/participantlists/${list.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];  
  }

  async updateParticipantsList(list: ParticipantsListModel): Promise<ParticipantModel> {
    const data = await fetch(`${this.url}/participantlists/${list.id}`, {
      method: 'PUT',
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];
  }

  async addCompetition(competition: CompetitionModel): Promise<CompetitionModel> {
    competition.id = -1;
    const data = await fetch(`${this.url}/competitions`, {
      method: 'POST',
      body: JSON.stringify(competition),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];
  }

  async deleteCompetition(competition: CompetitionModel): Promise<number> {
    const data = await fetch(`${this.url}/competitions/${competition.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];  
  }

  async updateCompetition(competition: CompetitionModel): Promise<ParticipantModel> {
    const data = await fetch(`${this.url}/competitions/${competition.id}`, {
      method: 'PUT',
      body: JSON.stringify(competition),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await data.json()) ?? [];
  }

  async getRulesets(): Promise<RulesetModel[]> {
    const data = await fetch(`${this.url}/rulesets`);
    return (await data.json()) ?? [];    
  }

  async getCompetition(id: number): Promise<CompetitionModel | undefined> {
    const data = await fetch(`${this.url}/competitions/${id}`);
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }

  async getParticipantsList(id: number): Promise<ParticipantsListModel | undefined> {
    const data = await fetch(`${this.url}/participantlists/${id}`);
    return data.status == 200 ? ((await data.json()) ?? {}) : undefined;
  }
}
