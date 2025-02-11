import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { UiConfigurationService } from './ui-configuration.service';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {

    private prefix = '';
    private DefaultPageTitle = 'AHV Centaur';

    public title$: Subject<string> = new BehaviorSubject(this.DefaultPageTitle);

    constructor(private uiConfiguration: UiConfigurationService) {
        this.uiConfiguration.title$.subscribe(t => {
            this.DefaultPageTitle = t;
            this.title$.next(this.prefix ? `${this.prefix} - ${this.DefaultPageTitle}` : `${this.DefaultPageTitle}`);
        });
    }

    async setPageTitle(prefix: string) {
        this.prefix = prefix;
        this.title$.next(this.prefix ? `${this.prefix} - ${this.DefaultPageTitle}` : `${this.DefaultPageTitle}`);
    }
}
