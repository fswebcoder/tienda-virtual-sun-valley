import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent() {
            return import('./auth/pages/auth/auth.component').then(m => m.AuthComponent);
        },
    }
];
