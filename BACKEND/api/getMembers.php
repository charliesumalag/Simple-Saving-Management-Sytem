<?php

// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');

// Include required files
require '../helpers.php';
require '../Framework/Database.php';
require '../Framework/Validation.php';
$config = require '../config/db.php';

// Initialize database connection
$db = new Database($config);

// Handle GET request to fetch members
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Query to fetch members
        $query = "SELECT id,first_name FROM users WHERE role='member'";
        $members = $db->query($query)->fetchAll();

        // Send JSON response
        echo json_encode([
            "success" => true,
            "members" => $members,
        ]);
    } catch (Exception $e) {
        // Handle errors and send error response
        echo json_encode([
            "success" => false,
            "message" => "Error fetching members: " . $e->getMessage(),
        ]);
    }
    exit;
}

// Send response for unsupported methods
echo json_encode([
    "success" => false,
    "message" => "Unsupported request method",
]);
