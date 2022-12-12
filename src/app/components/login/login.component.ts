import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UserModel } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public Hide: boolean = true;
  public Error!: string;
  public Username!: string;
  public Password!: string;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public OnFormSubmit() {
    const user: UserModel = {username: this.Username, password: this.Password};
    this.authService
    .LogInUser(user)
    .subscribe(            
      res => this.router.navigateByUrl("/todos"),
      err => this.Error = err,
    )
  }
}
