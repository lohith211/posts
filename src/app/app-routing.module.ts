import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { NopageComponent } from './nopage/nopage.component';

const routes: Routes = [
  { path: 'posts', component: UserComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'notfound', component: NopageComponent },

  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
