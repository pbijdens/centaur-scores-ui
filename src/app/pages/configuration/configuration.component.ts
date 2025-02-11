import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ConfigData, UiConfigurationService } from '../../services/ui-configuration.service';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, Subscription } from 'rxjs';
import { ControlUpButtonComponent } from "../../shared/control-up-button/control-up-button.component";
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ControlUpButtonComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.less'
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  private titleText$ = new Subject<string>();
  private resultFooterText$ = new Subject<string>();

  public title = '';
  public resultFooter = '';

  constructor(private apiService: ApiService, private uiConfiguration: UiConfigurationService, public authorizationService: AuthorizationService) {
  }  

  async ngOnInit(): Promise<void> {
    this.subscriptions.push(this.uiConfiguration.config$.subscribe(config => {
      this.title = config.title;
      this.resultFooter = config.resultFooter;
    }));

    // Change handler for title
    this.subscriptions.push(this.titleText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(value => { this.uiConfiguration.updateTitle(value); })
    ).subscribe());

    // Change handler for result footer HTML
    this.subscriptions.push(this.resultFooterText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(value => { this.uiConfiguration.updateResultFooter(value); })
    ).subscribe());
  }

  async titleChanged($event: any) {
    this.titleText$.next($event.target.value);
  }

  async resultFooterChanged($event: any) {
    this.resultFooterText$.next($event.target.value);
  }

  async ngOnDestroy(): Promise<void> {
    this.subscriptions.forEach(s => s.unsubscribe());    
    this.subscriptions = [];
  }
}
