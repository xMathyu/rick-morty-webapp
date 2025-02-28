import { Routes } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
