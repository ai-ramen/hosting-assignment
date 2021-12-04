<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return view('auth/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/account', function () {
    return Inertia::render('AccountSetting');
})->name('account');

Route::get('/employee', function () {
    return Inertia::render('EmployeeManagement');
})->name('employee');

require __DIR__.'/auth.php';

Route::get('/inventory', function () {
    return view('inventory');
});

Route::get('/dish', function () {
    return view('dishmanagement');
});

Route::get('/orders', function () {
    return view('ordermanagement');
});

Route::get('/pos', function () {
    return view('ordermanagement');
});