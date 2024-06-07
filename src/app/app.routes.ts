import { Routes } from "@angular/router";
import { UsersComponent } from "./features/users/users.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { UserEditComponent } from "./pages/user-edit/user-edit.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: UsersComponent
            },
            {
                path: 'user/:id',
                component: UserEditComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
]