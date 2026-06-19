import { Routes } from '@angular/router';

import { DashboardLayoutComponent }
    from './layouts/dashboard-layout/dashboard-layout.component';

import { LoginComponent }
    from './features/auth/pages/login/login.component';

import { DashboardComponent }
    from './features/dashboard/pages/dashboard/dashboard.component';

import { SensorListComponent }
    from './features/sensors/pages/sensor-list/sensor-list.component';

import { MeasurementListComponent }
    from './features/measurements/pages/measurement-list/measurement-list.component';

import { AnalyticsDashboardComponent }
    from './features/analytics/pages/analytics-dashboard/analytics-dashboard.component';

import { PredictionDashboardComponent }
    from './features/predictions/pages/prediction-dashboard/prediction-dashboard.component';

import { NotificationListComponent }
    from './features/notifications/pages/notification-list/notification-list.component';

import { SubscriptionDetailComponent }
    from './features/subscriptions/pages/subscription-detail/subscription-detail.component';

import { RegisterComponent }
    from './features/auth/pages/register/register.component';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'register',
        component: RegisterComponent
    },

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: '',
        component: DashboardLayoutComponent,

        children: [

            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },

            {
                path: 'dashboard',
                component: DashboardComponent
            },

            {
                path: 'sensors',
                component: SensorListComponent
            },

            {
                path: 'measurements',
                component: MeasurementListComponent
            },

            {
                path: 'analytics',
                component: AnalyticsDashboardComponent
            },

            {
                path: 'predictions',
                component: PredictionDashboardComponent
            },

            {
                path: 'notifications',
                component: NotificationListComponent
            },

            {
                path: 'subscriptions',
                component: SubscriptionDetailComponent
            }
        ]
    },

    {
        path: '**',
        redirectTo: 'dashboard'
    }
];