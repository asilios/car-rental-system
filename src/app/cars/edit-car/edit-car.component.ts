import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from '../../shared/services/car.service';
import { Car } from '../../shared/models/car.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class EditCarComponent implements OnInit {
  carForm!: FormGroup;
  carId!: number;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.carId = +this.route.snapshot.paramMap.get('id')!;
  this.loadCar(this.carId);

  this.carForm = this.fb.group({
    model: ['', Validators.required],
    type: ['', Validators.required],
    pricePerDay: [0, Validators.required]
  });
}


  loadCar(id: number): void {
    this.carService.getCarById(id).subscribe((car) => {
      this.carForm.patchValue(car);
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      console.log('Form is valid. Submitting...', this.carForm.value);

      const updatedCar: Car = {
        id: this.carId,
        ...this.carForm.value
      };

      this.carService.updateCar(this.carId, updatedCar).subscribe(
        () => {
          alert('Car updated successfully!');
          this.router.navigate(['/cars']);
        },
        (error) => {
          console.error('Error updating car:', error); // Log any errors here
        }
      );
    } else {
      console.log('Form is invalid.');
    }
  }
}
