<?php
// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow your frontend URL
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');  // Allow cookies to be sent with the request

// Handle pre-flight requests (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // Respond with HTTP status code 200 for OPTIONS request
    exit;
}

// Your logout logic starts here
session_start();

// Destroy the session
session_unset();
session_destroy();

// Return a success message
echo json_encode(['message' => 'Logged out successfully']);
