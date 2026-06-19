import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import {
  MeasurementService
} from '../../core/services/measurement';

@Component({
  selector: 'app-dashboard-layout',

  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl:
    './dashboard-layout.component.html',

  styleUrl:
    './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent
  implements OnInit {

  private measurementService =
    inject(MeasurementService);

  constructor(
    private router: Router
  ) { }

  notificationCount = 0;

  ngOnInit(): void {

    this.loadNotifications();

  }

  loadNotifications(): void {

    this.measurementService
      .getMeasurements()
      .subscribe({

        next: measurements => {

          const readNotifications =
            JSON.parse(

              localStorage.getItem(
                'readNotifications'
              ) ?? '[]'

            );

          this.notificationCount =

            measurements.filter(

              measurement => {

                const key =

                  `${measurement.sensor}-${measurement.recordedAt}`;

                return (

                  (measurement.co2 > 700 ||

                    measurement.pm25 > 20)

                  &&

                  !readNotifications.includes(
                    key
                  )

                );

              }

            ).length;

        }

      });

  }

  goToNotifications(): void {

    this.measurementService
      .getMeasurements()
      .subscribe({

        next: measurements => {

          const currentAlerts =

            measurements.filter(

              measurement =>

                measurement.co2 > 700 ||

                measurement.pm25 > 20

            ).length;

          localStorage.setItem(
            'lastSeenAlertCount',
            currentAlerts.toString()
          );

          this.notificationCount = 0;

          this.router.navigate([
            '/notifications'
          ]);

        }

      });

  }

  logout(): void {

    localStorage.clear();

    this.router.navigate([
      '/login'
    ]);

  }

}