import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root',
  })
export class IsLoggedGuard implements CanActivate {
    public IsLogged: boolean = false;

    constructor(private router: Router) {
    }

    public canActivate(): boolean {
        if (this.IsLogged !== true) {
            this.router.navigate([""]);
        }
        return this.IsLogged;
    }
} 