import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    
    private DefaultPageTitle = 'AHV Centaur';

    public title$: Subject<string> = new BehaviorSubject(this.DefaultPageTitle);

    constructor() { }

    async setPageTitle(prefix: string) {
        this.title$.next(`${prefix} - ${this.DefaultPageTitle}`);
    }


}
