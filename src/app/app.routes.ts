import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './cars/car-list/car-list.component';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { RentalListComponent } from './rentals/rental-list/rental-list.component';
import { AddRentalComponent } from './rentals/add-rental/add-rental.component';
import { AppComponent } from './app.component';
import { EditCarComponent } from './cars/edit-car/edit-car.component';

export const routes: Routes = [
  { path: 'cars', component: CarListComponent },
  { path: 'cars/add', component: AddCarComponent },
  { path: 'cars/edit/:id', component: EditCarComponent },
  { path: 'rentals', component: RentalListComponent },
  { path: 'rentals/add', component: AddRentalComponent },
  { path: '', component: RentalListComponent},
  { path: 'rentals/edit/:id', component: RentalListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
