import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AnalyticsService
} from '../../../../core/services/analytics';

import {
  DashboardResponse
} from '../../../../core/models/dashboard-response.model';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './dashboard.component.html',

  styleUrl:
    './dashboard.component.scss'
})
export class DashboardComponent
  implements OnInit {

  private analyticsService =
    inject(AnalyticsService);

  private cdr =
    inject(ChangeDetectorRef);

  dashboard?: DashboardResponse;

  loading = true;

  ngOnInit(): void {

    console.log(
      'Dashboard Init'
    );

    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;

    this.analyticsService
      .getDashboard()
      .subscribe({

        next: response => {

          console.log(
            'Dashboard Response:',
            response
          );

          this.dashboard =
            response;

          this.loading =
            false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(
            'Dashboard Error:',
            error
          );

          this.loading =
            false;

          this.cdr.detectChanges();
        }
      });
  }
}