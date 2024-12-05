import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../shared/services/rental.service';
import { Rental } from '../../shared/models/rental.model';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css'],
  imports:[ReactiveFormsModule, CommonModule, RouterModule]
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getRentals().subscribe((data) => {
      this.rentals = data;
    });
  }

  deleteRental(id: number): void {
    if (confirm('Are you sure you want to delete this rental?')) {
      this.rentalService.deleteRental(id).subscribe(() => {
        this.loadRentals();
      });
    }
  }
}
