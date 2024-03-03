import { Injectable } from '@angular/core';
import { MatchModel } from './models/match-model';
import { ParticipantModel } from './models/participant-model';


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

  async getActiveMatch(): Promise<MatchModel> {
    const data = await fetch(`${this.url}/match/active`);
    return (await data.json()) ?? {};
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
}
