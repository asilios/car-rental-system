import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RentalService } from '../../shared/services/rental.service';
import { Rental } from '../../shared/models/rental.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-rental',
  templateUrl: './edit-rental.component.html',
  styleUrls: ['./edit-rental.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class EditRentalComponent implements OnInit {
  rentalForm!: FormGroup;
  rentalId!: number;

  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router  // Make router public
  ) {}

  ngOnInit(): void {
    // Get the rental ID from the route
    this.rentalId = +this.route.snapshot.paramMap.get('id')!;
    this.loadRental(this.rentalId);

    // Initialize the form
    this.rentalForm = this.fb.group({
      customerName: ['', Validators.required],
      carId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalPrice: ['', Validators.required],
    });
  }

  loadRental(id: number): void {
    this.rentalService.getRentalById(id).subscribe((rental) => {
      this.rentalForm.patchValue(rental);
    });
  }

  onSubmit(): void {
    if (this.rentalForm.valid) {
      const updatedRental: Rental = {
        id: this.rentalId,
        ...this.rentalForm.value,
      };

      this.rentalService.updateRental(this.rentalId, updatedRental).subscribe(() => {
        alert('Rental updated successfully!');
        this.router.navigate(['/rentals']);
      });
    }
  }
}
