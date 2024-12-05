import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'https://localhost:7019/api/Cars';

  constructor(private http: HttpClient) {}

  // Get all cars
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl);
  }

  // Delete a car by ID
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Add a new car
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.baseUrl, car);
  }

  // Get a car by ID
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/${id}`);
  }

  // Update a car
  updateCar(id: number, car: Car): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, car);
  }
}
