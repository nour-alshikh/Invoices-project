<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerReportController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceAttachmentController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InvoiceDetailController;
use App\Http\Controllers\InvoiceReportController;
use App\Http\Controllers\InvoicesArchiveController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


//  Public Routes
// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



// Sections
Route::get('/sections', [SectionController::class, 'index']);
Route::get('/sections/{id}', [SectionController::class, 'show']);

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Invoices
Route::get('/invoices', [InvoiceController::class, 'index']);
Route::get('/invoices/{id}', [InvoiceController::class, 'show']);

Route::get('/invoice-details/{id}', [InvoiceDetailController::class, 'show']);
Route::get('/invoice-attachments/{id}', [InvoiceAttachmentController::class, 'show']);

Route::get('/invoices/status/{status}', [InvoiceController::class, 'show_by_status']);

Route::get('/invoices-archived', [InvoicesArchiveController::class, 'index']);





Route::middleware('auth:sanctum')->group(function () {
    // Log out
    Route::post('/logout', [AuthController::class, 'logout']);

    // Sections
    Route::post('/sections', [SectionController::class, 'store']);
    Route::post('/sections/{id}', [SectionController::class, 'update']);
    Route::delete('/sections/{id}', [SectionController::class, 'destroy']);

    // Products
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/get-products/{id}', [ProductController::class, 'getProducts']);
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Invoices
    Route::post('/invoices', [InvoiceController::class, 'store']);
    Route::post('/invoices/{id}', [InvoiceController::class, 'update']);
    Route::delete('/invoices/{id}', [InvoiceController::class, 'destroy']);

    Route::post('/invoice-attachments/{id}', [InvoiceAttachmentController::class, 'store']);
    Route::delete('/invoice-attachments/{id}', [InvoiceAttachmentController::class, 'destroy']);

    Route::post('/update-status/{id}', [InvoiceController::class, 'update_status']);

    Route::get('/add-to-archive/{id}', [InvoicesArchiveController::class, 'addToArchive']);

    Route::get('/restore-archive/{id}', [InvoicesArchiveController::class, 'restoreArchive']);

    Route::post('/invoices-report', [InvoiceReportController::class, 'index']);
    Route::post('/customer-report', [CustomerReportController::class, 'index']);

    Route::post('/notifications', [HomeController::class, 'getNotifications']);

    Route::post('/notifications/mark-as-read', [HomeController::class, 'markAsRead']);




    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::post('/users/{id}', [UserController::class, 'update']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);

    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::post('/roles/{id}', [RoleController::class, 'update']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    Route::delete('/roles/{id}', [RoleController::class, 'delete']);
});
