<?php
session_start();

// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');

require '../helpers.php';
require '../Framework/Database.php';
require '../Framework/Validation.php';
$config = require '../config/db.php';

$db = new Database($config);

// Read the incoming JSON data
$inputData = json_decode(file_get_contents('php://input'), true);
$email = $inputData['email'] ?? '';  // Added null coalescing to avoid undefined index error
$password = $inputData['password'] ?? '';  // Same as above

$errors = [];

// Validate inputs
if (!Validation::string($email)) {
    $errors['email'] = 'Please enter valid email address';
}
if (!Validation::string($password)) {
    $errors['password'] = 'Please enter password';
}

// If there are validation errors, send them back to the frontend
if (!empty($errors)) {
    echo json_encode(['errors' => $errors]);
    exit;
}

$params = [
    'email' => $email
];

// Fetch user data including id, email, role, first name, last name, and password
$user = $db->query('SELECT id, email, first_name, last_name, password, role FROM users WHERE email = :email', $params)->fetch();

if ($user) {
    // Verify the user input password against the hashed password
    if (password_verify($password, $user->password)) {
        $_SESSION['user_id'] = $user->id;
        $_SESSION['email'] = $user->email;
        $_SESSION['firstName'] = $user->first_name;
        $_SESSION['lastName'] = $user->last_name;
        $_SESSION['role'] = $user->role;  // Store the role in the session

        echo json_encode([
            'user' => [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'role' => $user->role // Include the role in the response
            ]
        ]);
    } else {
        echo json_encode(['message' => 'Invalid Password']);
    }
} else {
    echo json_encode(['message' => 'Email not found']);
}
