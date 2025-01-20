<?php
session_start();

// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require '../helpers.php';
require '../Framework/Database.php';
require '../Framework/Validation.php';
$config = require '../config/db.php';

$db = new Database($config);


// Read the incoming JSON data
$inputData = json_decode(file_get_contents('php://input'), true);
$email = $inputData['email'];
$password = $inputData['password'];


$errors = [];


//validate inputs
if (!Validation::string($email)) {
    $errors['email'] = 'Please enter valid email address';
}
if (!Validation::string($password)) {
    $errors['password'] = 'Please enter password';
}


//If there is a error value then send it to front end
if (!empty($errors)) {
    echo json_encode(['errors' => $errors]);
    exit;
}

$params = [
    'email' => $email
];

// $user_password = $db->query('SELECT password FROM users WHERE email = :email', $params)->FETCH();

$user = $db->query('SELECT first_name, last_name, password FROM users WHERE email = :email', $params)->fetch();


if ($user) {
    // Verify the user input password against the hashed password
    if (password_verify($password, $user->password)) {
        $_SESSION['user_id'] = $user->id;
        $_SESSION['email'] = $user->email;
        $_SESSION['firstName'] = $user->first_name;
        $_SESSION['lastName'] = $user->last_name;
        echo json_encode([
            'message' => 'Correct credentials',
            'user' => [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
            ]
        ]);
    } else {
        echo json_encode(['message' => 'Invalid Password']);
    }
} else {
    echo json_encode(['message' => 'Email not found']);
}
