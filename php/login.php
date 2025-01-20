<?php
session_start(); // Avvia la sessione
require_once 'db.php'; // Include la connessione al database

if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Controlla se la richiesta è POST
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Cerca l'utente nel database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica credenziali e avvia la sessione
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        echo "Successo";
    } else {
        http_response_code(401); // Errore autenticazione
        echo "Credenziali errate.";
    }
}
?>
