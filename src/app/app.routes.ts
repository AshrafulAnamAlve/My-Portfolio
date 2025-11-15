import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Feedback } from './feedback/feedback';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:"home", component:Home},
    {path:"login",component:Dashboard},
    {path:"feedback", component:Feedback}

];
