import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        async loadComponent() {
            const m = await import('./auth/pages/auth/auth.component');
            return m.AuthComponent;
        },
    },
    {
        path: 'store',
        async loadComponent() {
            const m = await import('./store/home-store/home-store.component');
            return m.HomeStoreComponent;
        },
        children: [
            {
                path: 'products',
                async loadComponent() {
                    const m = await import('./store/components/smart/products-smart/products-smart.component');
                    return m.ProductsSmartComponent;
                }
            },
            {
                path: 'users',
                async loadComponent() {
                    const m = await import('./users/pages/home-user/home-user.component');
                    return m.HomeUserComponent;
                }
            }
        ]
    }
];
