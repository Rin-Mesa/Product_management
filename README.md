# Product Management System

A full-stack CRUD application built with Laravel (Backend API) and Vue 3 (Frontend).

## Project Structure

```
product-management/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── ProductController.php
│   │   └── Models/
│   │       └── Product.php
│   ├── database/
│   │   └── migrations/
│   │       └── 2024_01_01_000000_create_products_table.php
│   ├── routes/
│   │   └── api.php
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProductForm.vue
    │   │   ├── ProductList.vue
    │   │   └── ProductEdit.vue
    │   ├── services/
    │   │   └── productService.js
    │   ├── App.vue
    │   ├── main.js
    │   └── style.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Database Schema

### Products Table

| Field        | Type     |
|--------------|----------|
| id           | bigint   |
| name         | string   |
| description  | text     |
| price        | decimal  |
| quantity     | integer  |
| image        | string   |
| created_at   | timestamp|
| updated_at   | timestamp|

## Backend Setup (Laravel)

### Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL/MariaDB
- Laravel 10+

### Installation Steps

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install Laravel dependencies**
   ```bash
   composer install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env` (if not exists)
   - Update database credentials in `.env`:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=product_management
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```

5. **Create database**
   ```sql
   CREATE DATABASE product_management;
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Start Laravel development server**
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`

## Frontend Setup (Vue 3)

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation Steps

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## API Endpoints

### Products API

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/{id}` - Get a specific product
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product

## Features

- **Create Products**: Add new products with name, description, price, quantity, and image URL
- **Read Products**: View all products in a responsive grid layout
- **Update Products**: Edit existing product details
- **Delete Products**: Remove products from the database
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Automatic refresh after CRUD operations

## Technologies Used

### Backend
- Laravel 10
- PHP 8.1+
- MySQL
- REST API

### Frontend
- Vue 3
- Vite
- Axios
- CSS3

## Development

### Running Both Servers

For development, you need to run both servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend
php artisan serve
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Notes

- The frontend is configured to proxy API requests to `http://localhost:8000`
- Make sure the Laravel backend is running before starting the frontend
- The API base URL in `productService.js` can be adjusted if your backend runs on a different port
