This application was developed for WebApplication module, as coursework portfolio project @ WIUT by student ID: 00013735
As the reminder of 00013735/20 = 15. My project is Car Rental System
# Car Rental System

## Project Overview
The **Car Rental System** is a comprehensive platform designed for efficiently managing car rentals. It allows users to perform CRUD (Create, Read, Update, Delete) operations on cars and rentals, ensuring a seamless experience for both administrators and customers.

---

## Features
### 1. Manage Cars
- Add new cars to the system.
- Edit existing car details, including model, type, and price per day.
- View a list of all cars with details.
- Delete cars from the system.

### 2. Manage Rentals
- Add new rental records, linking cars to customers.
- Edit rental details, such as dates and total price.
- View all rental records in a tabular format.
- Delete rental records.

### 3. Navigation
- Easy navigation between Cars and Rentals pages using a centralized menu.
- Responsive design for improved user experience.

### 4. Validation
- Client-side form validation to ensure correct and complete data entry.

### 5. Error Handling
- Proper handling of API errors with user-friendly messages.

---

## How to Run the Project

### Front-End: Angular Application
1. **Navigate to the front-end folder**:
   ```bash
   cd car-rental-frontend
2. **Install dependencies**:
   ```bash
   npm install
3. **Start the Angular development server**:
   ```bash
   ng serve
4. **Start the Angular development server**:
   Open http://localhost:4200.

### Back-End: ASP.NET Core API
1. **Navigate to the back-end folder**:
    ```bash
    cd CarRentalApi
2. **Restore dependencies**:
    ```bash
    dotnet restore
3. **Run the API server**:
    ```bash
    dotnet run
4. **Access the API**
    at http://localhost:5000.

**Front-End**:
  Framework: Angular Version: 16.0.0
  Styling: Bootstrap Version: 5.3.0
  Language: TypeScript Version: 4.x.x
**Back-End**:
  Framework: ASP.NET Core Web API Version: 6
  ORM: Entity Framework Core Version: 6
  Language: C#
**Database**:
  System: SQL Server Version: 2019
