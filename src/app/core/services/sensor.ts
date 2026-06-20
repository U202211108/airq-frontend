import { Injectable, inject }
  from '@angular/core';

import {
  HttpClient
}
  from '@angular/common/http';

import { MeasurementService }
  from '../../core/services/measurement';

import { Measurement }
  from '../../core/models/measurement.model';

import {
  Observable
}
  from 'rxjs';

import {
  Sensor
}
  from '../models/sensor.model';

import {
  CreateSensor
}
  from '../models/create-sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private http =
    inject(HttpClient);

  private measurementService =
    inject(MeasurementService);

  expandedSensorId?: number;

  measurementsMap:
    Record<number, Measurement[]> = {};

  private api =
    'http://localhost:8080/api/v1/sensors';

  getSensors(): Observable<Sensor[]> {

    return this.http.get<Sensor[]>(
      this.api
    );
  }

  createSensor(
    sensor: CreateSensor
  ): Observable<Sensor> {

    return this.http.post<Sensor>(
      this.api,
      sensor
    );
  }

  updateSensor(
    id: number,
    sensor: CreateSensor
  ): Observable<Sensor> {

    return this.http.put<Sensor>(
      `${this.api}/${id}`,
      sensor
    );

  }

  deleteSensor(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.api}/${id}`
    );

  }
}