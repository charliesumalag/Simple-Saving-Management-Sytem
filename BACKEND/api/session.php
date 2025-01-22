<?php
session_start();

// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');

// Check if the user is logged in and session data is available
if (isset($_SESSION['user_id'])) {
    // User is logged in, return session data
    echo json_encode([
        'user' => [
            'user_id' => $_SESSION['user_id'],
            'first_name' => $_SESSION['firstName'],
            'last_name' => $_SESSION['lastName'],
            'email' => $_SESSION['email']
        ]
    ]);
} else {
    // No user is logged in
    echo json_encode(['message' => 'No user is logged in']);
}
