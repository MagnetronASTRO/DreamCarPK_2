# DreamCarPK

**Responsive web application** for car rental, with full functionality for both **administrators** and **consumers**. This app is containerized using **Docker**, features a **Laravel Sanctum** API for authentication, and uses **Qwik.js** and **TailwindCSS** on the frontend. It is fully responsive and works seamlessly on web and mobile devices.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Architecture](#architecture)  
4. [Setup](#setup)  
5. [Tests](#tests)  
6. [User Manual](#user-manual)  
7. [Admin Manual](#admin-manual)  
8. [Mobile Version](#mobile-version)  
9. [License](#license)

---

## Features

- **Consumers**  
  - Browse available cars for rental.  
  - Make car reservations.  
  - View rental history.  

- **Admins**  
  - All consumer features plus **manage users**, **cars**, and **reservations**.

- **Responsive Design**  
  - Fully functional on both **web and mobile** devices.  

- **Quick Setup**  
  - **Containerized** environment (Docker) for consistent dev and production experience.

---

## Tech Stack

1. **Laravel (PHP)** – Backend framework using **Sanctum** for token-based authentication.  
2. **PostgreSQL** – Robust, modern SQL database.  
3. **Qwik.js** – Next-generation front-end framework for instant-loading, highly performant apps.  
4. **TailwindCSS** – Utility-first CSS framework for fast and consistent styling.  
5. **Docker** – Containerization for easy deployment and consistent dev environment.  
6. **PHPUnit** – For backend unit tests.  
7. **Composer** – Manages PHP dependencies and PSR-4 autoloading.  

---

## Architecture

1. **App**  
   - **MVC** REST api in Laravel sanctum.
   - **Qwik** for front-end SSR and resumability.
2. **Database**  
   - **ERD diagram** available under `docs/database_diagram.png`.  
   - Data base is initializaed with basic/test data using seeders and factories in laravel.

---

## Setup

1. **Clone** this repository and **navigate** into it.
2. **Copy** `.env.example` to `.env` and configure your **variables** (database, ports, etc.).
3. **Run** `make up` to build and start containers (API, Qwik webapp, PostgreSQL).
4. **Run** `make api-setup` to execute **migrations** and **seed** the database.
5. **Default Admin** credentials:  
   - **Email**: `admin@example.com`  
   - **Password**: `11111111`  
   - *(Change this in production!)*  
6. **Test User** credentials:  
   - **Email**: `test@example.com`  
   - **Password**: `test1234`  

---

## Tests

- **Backend**: Run `docker compose exec api php artisan test` or use `phpunit`.  
- **Frontend**: Coming soon (or you can set up your Qwik or Cypress tests).

---

## User Manual

### Home Page – Car Selection
Displays a list of available cars to browse.  
![Home page](/docs/img/homepage.png)

### Reserve Car
Shows car specs, pricing, and a reservation form.  
![Reserve car](/docs/img/car-reservation.png)

### User Reservations
View the user’s current rentals and history.  
![User reservations](/docs/img/user-reservations.png)

### Login
Standard login form with Sanctum-based auth.  
![Login](/docs/img/login-form.png)

### Signup
Register a new user account.  
![Signup](/docs/img/signup-form.png)

---

## Admin Manual

### Admin Panel – Users
View and manage users. Change status (e.g., `ACTIVE` / `BLOCKED`).  
![Admin panel](/docs/img/admin-user-managment.png)

### Admin Panel – Add User
Add a new user manually.  
![Admin panel add user](/docs/img/admin-add-user.png)

### Admin Panel – Edit User
Update user data from the admin panel.  
![Admin panel edit user](/docs/img/admin-edit-user-data.png)

---

## Mobile Version

**Fully responsive** – the same features are accessible from mobile browsers.

| Homepage                           | Car Reservation                             | Reservations                           |
|------------------------------------|---------------------------------------------|-----------------------------------------|
| <img src="/docs/img/mobile-homepage.png" width="240"/>       | <img src="/docs/img/mobile-car-reservation.png" width="240"/>       | <img src="/docs/img/mobile-reservations.png" width="240"/>       |

| Login                              | Signup                                      | Admin Panel                             |
|------------------------------------|---------------------------------------------|-----------------------------------------|
| <img src="/docs/img/mobile-login.png" width="240"/>          | <img src="/docs/img/mobile-signup.png" width="240"/>                 | <img src="/docs/img/mobile-admin-user-panel.png" width="240"/>    |

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
