<?php
require './Framework/Database.php';
$config = require './config/db.php';

$db = new Database($config);


echo 'running';
