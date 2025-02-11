import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

export interface ConfigData {
  title: string;
  resultFooter: string;
}

@Injectable({
  providedIn: 'root'
})
export class UiConfigurationService {
  defaultFooter = '<p>Een * achter de naam betekent dat de schutters dezelfde score hebben.</p><p>Meld incorrecte of elders geschoten persoonlijke records bij de wedstrijdsecretaris.</p>';
  private data: ConfigData = {
    title: 'AHV Centaur',
    resultFooter: this.defaultFooter
  };

  public config$ = new BehaviorSubject<ConfigData>(this.data);
  public title$ = new BehaviorSubject<string>(this.data.title);
  public resultFooter$ = new BehaviorSubject<string>(this.data.resultFooter);

  constructor(public apiService: ApiService) {
    this.reload();
  }

  async reload(): Promise<void> {
    const json = await this.apiService.getUiConfiguration("config");
    const data: ConfigData = json as ConfigData;
    if (data) {
      this.data = data;
      this.config$.next(this.data);
      this.title$.next(this.data.title ?? 'AHV Centaur');
      this.resultFooter$.next(this.data.resultFooter ?? this.defaultFooter);
    }
    this.config$.next(this.data);
  }

  async updateTitle(title: string) {
    this.data.title = title;
    this.title$.next(this.data.title ?? 'AHV Centaur');
    this.config$.next(this.data);
    this.apiService.putUiConfiguration("config", JSON.stringify(this.data));
  }

  updateResultFooter(resultFooter: string) {
    this.data.resultFooter = resultFooter;
    this.resultFooter$.next(this.data.resultFooter ?? '<p></p>');
    this.config$.next(this.data);
    this.apiService.putUiConfiguration("config", JSON.stringify(this.data));
  }
}

