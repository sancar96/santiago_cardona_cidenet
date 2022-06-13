<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Employee;
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

Route::get('/', function () {
    return view('welcome');
})->name('listar.empleados');

Route::get('/creacionempleado',function (){
    return view('creacion_empleados');
})->name('creacion.empleado');

Route::get('/editarempleado/{id}',[Employee::class, 'getDataEditEmployee']);

//EDIT EMPLOYEES ROUTES
Route::post('/editarempleado/{id}/editEmployee',[Employee::class,'editEmployee']);
Route::post('/editarempleado/{id}/validateEmail',[Employee::class,'validateEmailExist']);

// LIST EMPLOYEES ROUTES
Route::get('list.employees', [Employee::class, 'listEmployees']);
Route::post('filter.employees', [Employee::class, 'filterEmployees']);
Route::post('delete.employee', [Employee::class, 'deleteEmployee'])->name('delete.employee');

// CREATE EMPLOYEES ROUTES
Route::post('save.employee', [Employee::class, 'saveEmployee'])->name('save.employee');
Route::post('validate.email', [Employee::class, 'validateEmailExist']);