<?php
session_start();

// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');

require '../helpers.php';
require '../Framework/Database.php';
$config = require '../config/db.php';

$db = new Database($config);

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$userId = isset($_GET['user_id']) ? (int) $_GET['user_id'] : 0;

// Query to get savings for the specific user
$query = "SELECT * FROM savings WHERE user_id = :user_id";
$stm = $db->query($query, ['user_id' => $userId]);

// Fetch the savings data
$savings = $stm->fetchAll();

// Return the savings data as a JSON response
echo json_encode(['success' => true, 'savings' => $savings]);
