<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Check for maintenance mode
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Composer autoloader
require __DIR__.'/../vendor/autoload.php';

// Bootstrap the application
$app = require_once __DIR__.'/../bootstrap/app.php';

// Handle the request and send the response
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);