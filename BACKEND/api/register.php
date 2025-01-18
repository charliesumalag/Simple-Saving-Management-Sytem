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
    $errors['lastName'] = 'Please enter last name';
}

if (!Validation::string($email)) {
    $errors['email'] = 'Please enter valid email address';
}
if (!Validation::string($password)) {
    $errors['password'] = 'Please enter password';
}
if (!Validation::string($cpassword)) {
    $errors['cpassword'] = 'Please enter confirmation password';
}


if (!Validation::match($password, $cpassword)) {
    $errors['password_confirmation'] = 'Passwords do not match';
}


// Check if there are any validation errors
if (!empty($errors)) {
    // Return errors as JSON response
    echo json_encode(['errors' => $errors]);
    exit;
}


//Check if the email exist in the database
$params = [
    'email' => $email,
];


$user = $db->query('SELECT * FROM users WHERE email = :email', $params)->FETCH();

if ($user) {
    $errors['email'] = 'Email already exists';
    echo json_encode(['errors' => $errors]);
    exit;
}


//Create user accounts
$params = [
    'first_name' => $firstName,
    'last_name' => $lastName,
    'email' => $email,
    'password' => password_hash($password, PASSWORD_DEFAULT),
];


if ($db->query('INSERT INTO users (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)', $params)) {
    echo json_encode(['message' => 'Registered']);
} else {
    echo json_encode(['errors' => 'Failed to register user']);
}
exit;

// echo json_encode(['message' => 'Registered']);
