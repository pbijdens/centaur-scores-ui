import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

// Service that locally stores teh active list ID and maintaisn this over sessions
// only relevant for management functions such as PR registration etc.
@Injectable({
  providedIn: 'root'
})
export class ActiveListService {

  public activeList: number = -1;
  public activeList$: Subject<number> = new BehaviorSubject<number>(-1);

  constructor() { 
    this.activeList = +(localStorage.getItem('active-list') ?? "-1");
    if (this.activeList != -1) {
      this.activeList$.next(this.activeList);
    }
  }

  setActiveList(activeList: number | undefined): void {
    this.activeList = activeList ?? -1;
    this.activeList$.next(this.activeList);
    localStorage.setItem('active-list', `${this.activeList}`);
  }
}
