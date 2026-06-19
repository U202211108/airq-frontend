import {
  Component,
  OnInit,
  inject
}
  from '@angular/core';

import {
  interval
} from 'rxjs';

import { FormsModule }
  from '@angular/forms';

import {
  ChangeDetectorRef
} from '@angular/core';

import { DatePipe } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
}
  from '@angular/forms';

import { CommonModule }
  from '@angular/common';

import { SensorService }
  from '../../../../core/services/sensor';

import { Sensor }
  from '../../../../core/models/sensor.model';

import { MeasurementService }
  from '../../../../core/services/measurement';

import { Measurement }
  from '../../../../core/models/measurement.model';

@Component({
  selector: 'app-sensor-list',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, DatePipe, FormsModule],

  templateUrl:
    './sensor-list.component.html',

  styleUrl:
    './sensor-list.component.scss'
})
export class SensorListComponent
  implements OnInit {

  private sensorService =
    inject(SensorService);

  private cdr =
    inject(ChangeDetectorRef);

  private measurementService =
    inject(MeasurementService);

  private fb =
    inject(FormBuilder);

  showModal = false;

  searchTerm = '';

  expandedSensorId: number | null = null;

  measurementsMap:
    Record<number, Measurement[]> = {};

  toggleSensor(
    sensorId: number
  ): void {

    this.expandedSensorId =
      this.expandedSensorId === sensorId
        ? null
        : sensorId;
  }

  sensors: Sensor[] = [];

  get filteredSensors(): Sensor[] {

    if (!this.searchTerm.trim()) {
      return this.sensors;
    }

    const term =
      this.searchTerm.toLowerCase();

    return this.sensors.filter(sensor =>

      sensor.serialNumber
        .toLowerCase()
        .includes(term)

      ||

      sensor.location
        .toLowerCase()
        .includes(term)

      ||

      sensor.id
        .toString()
        .includes(term)

    );
  }

  loading = true;

  sensorForm =
    this.fb.group({

      serialNumber: [
        '',
        Validators.required
      ],

      location: [
        '',
        Validators.required
      ]

    });

  loadSensors(): void {

    this.loading = true;

    this.sensorService
      .getSensors()
      .subscribe({

        next: sensors => {

          console.log('Sensores cargados:', sensors);

          this.sensors = sensors;

          sensors.forEach(sensor => {

            this.measurementService
              .getBySensor(sensor.id)
              .subscribe({

                next: measurements => {

                  this.measurementsMap[sensor.id] =
                    measurements;

                  console.log(
                    'Mediciones sensor',
                    sensor.id,
                    measurements
                  );

                  this.cdr.detectChanges();
                }
              });
          });

          this.loading = false;
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  ngOnInit(): void {

    this.loadSensors();

    interval(15000)
      .subscribe(() => {

        this.loadSensors();

      });
  }

  openModal() {

    this.showModal = true;
  }

  closeModal() {

    this.showModal = false;

    this.sensorForm.reset();
  }

  createSensor() {

    if (this.sensorForm.invalid) return;

    this.sensorService
      .createSensor(
        this.sensorForm.getRawValue() as any
      )
      .subscribe({

        next: sensor => {

          const qualityType =
            Math.floor(Math.random() * 3);

          let measurementData;

          switch (qualityType) {

            case 0:

              measurementData = {

                sensorId: sensor.id,

                co2: 500,

                pm25: 12,

                temperature: 23,

                humidity: 58

              };

              break;

            case 1:

              measurementData = {

                sensorId: sensor.id,

                co2: 850,

                pm25: 22,

                temperature: 26,

                humidity: 63

              };

              break;

            default:

              measurementData = {

                sensorId: sensor.id,

                co2: 1200,

                pm25: 40,

                temperature: 31,

                humidity: 72

              };

          }

          this.measurementService
            .createMeasurement(measurementData)

        },

        error: console.error

      });

  }

  getLatestMeasurement(
    sensorId: number
  ): Measurement | null {

    const measurements =
      this.measurementsMap[sensorId];

    if (
      !measurements ||
      measurements.length === 0
    ) {
      return null;
    }

    return measurements[
      measurements.length - 1
    ];
  }

  getAirQuality(
    measurement: Measurement | null
  ): string {

    if (!measurement) {
      return 'SIN DATOS';
    }

    if (
      measurement.co2 > 1000 ||
      measurement.pm25 > 35
    ) {
      return 'CRÍTICO';
    }

    if (
      measurement.co2 > 700 ||
      measurement.pm25 > 20
    ) {
      return 'MODERADO';
    }

    return 'BUENO';
  }

  get activeSensors() {

    return this.sensors.filter(
      sensor => sensor.active
    ).length;
  }

  get inactiveSensors() {

    return this.sensors.filter(
      sensor => !sensor.active
    ).length;
  }
}