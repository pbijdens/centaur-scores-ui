import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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
