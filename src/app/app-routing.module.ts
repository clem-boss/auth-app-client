import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './core/auth.service';
import { IsLoggedGuard } from './core/is-logged.guard';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'todos', component: TodosComponent, canActivate: [IsLoggedGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, IsLoggedGuard]
})
export class AppRoutingModule { }
