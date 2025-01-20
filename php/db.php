<?php
// Parametri per la connessione al database
$host = 'localhost';
$db = 'databurger';
$user = 'root';
$pass = '';

try {
    // Creazione connessione PDO al database
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Configura gestione errori con eccezioni
} catch (PDOException $e) {
    // Gestione errori di connessione
    die("Errore di connessione: " . $e->getMessage());
}
?>
