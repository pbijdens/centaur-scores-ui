import { Injectable } from '@angular/core';
import { WhoAmIResponse } from '../models/who-am-i-response';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private token?: string;
    public user?: WhoAmIResponse | undefined;

    public user$: Subject<WhoAmIResponse | undefined> = new BehaviorSubject<WhoAmIResponse | undefined>(undefined as WhoAmIResponse | undefined);

    constructor() {
        this.token = localStorage.getItem('token') as string;
        this.verifyToken();
    }

    async storeOAuthBearerTokenValue(token: string | undefined): Promise<void> {
        this.token = token;
        if (token) {
            localStorage.setItem('token', `${token}`);
            this.verifyToken();
        }
        else {
            localStorage.removeItem('token');
            delete this.token;
            delete this.user;
            this.user$.next(undefined);
        }
    }

    async getOAuthBearerTokenValue(): Promise<string> {
        this.verifyToken();
        return `Bearer ${this.token || ""}`;
    }

    async registerLoggedInUser(user: WhoAmIResponse | undefined): Promise<void> {
        this.user = user;
        this.user$.next(user);
    }

    async getLoggedInUser(): Promise<WhoAmIResponse | undefined> {
        return this.user;
    }

    private verifyToken() {
        if (this.token) {
            const decoded = jwtDecode(this.token);
            if (Date.now() >= (decoded.exp ?? 0) * 1000) {
                console.warn(`Token is expired.`);
                localStorage.removeItem('token');
                delete this.token;
                delete this.user;
                this.user$.next(undefined);
            } else {
                console.debug(`Token valid for another ${(((decoded.exp ?? 0) * 1000) - Date.now()) / 1000} seconds.`);
            }
        } else {
            console.warn(`No token found in cache.`);
            localStorage.removeItem('token');
            delete this.token;
            delete this.user;
            this.user$.next(undefined);
        }
    }
}