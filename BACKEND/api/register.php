<?php
require '../helpers.php';
require '../Framework/Database.php';
require '../Framework/Validation.php';
$config = require '../config/db.php';

$db = new Database($config);


// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Read the incoming JSON data
$inputData = json_decode(file_get_contents('php://input'), true);
$firstName = $inputData['firstName'];
$lastName = $inputData['lastName'];
$email = $inputData['email'];
$password = $inputData['password'];
$cpassword = $inputData['cpassword'];



// Validate and sanitize input data
$errors = [];


if (!Validation::string($firstName, 2, 50)) {
    $errors['firstName'] = 'Please enter first name';
}

if (!Validation::string($lastName, 2, 50)) {
    $errors['firstName'] = 'Please enter last name';
}

if (!Validation::string($email)) {
    $errors['firstName'] = 'Please enter valid emeial address';
}

if (!Validation::match($password, $cpassword)) {
    $errors['password_confirmation'] = 'Passwords do not match';
}

// Check if there are any validation errors
if (!empty($errors)) {
    // Return errors as JSON response
    echo json_encode(['errors' => $errors]);
    exit;
} else {
    //store the data into database
    echo json_encode(['message' => 'Registration successful']);
}
