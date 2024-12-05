import { Component } from '@angular/core';
import { CarService } from '../../shared/services/car.service';
import { Car } from '../../shared/models/car.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class AddCarComponent {
  carForm: FormGroup;

  constructor(
    private carService: CarService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize the form with empty values and validation
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      type: ['', Validators.required],
      pricePerDay: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.carForm.valid) {
      const car: Car = this.carForm.value;

      this.carService.addCar(car).subscribe({
        next: (createdCar) => {
          alert('Car added successfully!');
          this.router.navigate(['/cars']); // Navigate back to the car list
        },
        error: (err) => {
          console.error('Error adding car:', err);
          alert('Failed to add car.');
        }
      });
    }
  }
}
