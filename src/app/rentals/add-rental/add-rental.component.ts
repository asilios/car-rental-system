import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Rental } from '../../shared/models/rental.model';
import { RentalService } from '../../shared/services/rental.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.css'],
  imports: [FormsModule]
})
export class AddRentalComponent {
  rental: Rental = {
    id: 0,
    customerName: '',
    carId: 0,
    startDate: '',
    endDate: '',
    totalPrice: 0,
  };

  constructor(private rentalService: RentalService, private router: Router) {}

  addRental(): void {
    this.rentalService.addRental(this.rental).subscribe(() => {
      this.router.navigate(['/rentals']);
    });
  }
}
