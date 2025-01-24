<?php
session_start();
session_destroy();

// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');

echo json_encode(['message' => 'Logged out successfully']);
