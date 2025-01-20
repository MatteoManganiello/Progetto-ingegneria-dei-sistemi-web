// Importazione delle dipendenze necessarie
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Abilita il CORS per consentire richieste da altri domini
app.use(bodyParser.json()); // Analizza i payload JSON delle richieste

// Connessione al database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "databurger",
});

db.connect((err) => {
  if (err) {
    console.error("Errore nella connessione al database:", err);
    process.exit(1); // Termina il server in caso di errore
  }
  console.log("Connesso al database MySQL");
});

// Endpoint per ottenere i burger
app.get("/api/burgers", (req, res) => {
  const query = "SELECT * FROM burgers";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Errore nel recupero dei dati");
    } else {
      res.json(results); // Restituisce i risultati in formato JSON
    }
  });
});

// Endpoint per ottenere le patatine
app.get("/api/fries", (req, res) => {
  const query = "SELECT * FROM fries";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Errore nel recupero delle patatine");
    } else {
      res.json(results);
    }
  });
});

// Endpoint per ottenere le bevande
app.get("/api/drinks", (req, res) => {
  const query = "SELECT * FROM drinks";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Errore nel recupero delle bevande");
    } else {
      res.json(results);
    }
  });
});

// Endpoint per creare un ordine
app.post("/api/orders", (req, res) => {
  const { customer_name, customer_address, customer_phone, items } = req.body;

  if (!items || items.length === 0) { // Controlla che ci siano articoli nell'ordine
    return res.status(400).send("Nessun articolo specificato per l'ordine");
  }

  const total_price = items.reduce((sum, item) => sum + item.price * item.quantity, 0); // Calcola il totale

  const query = `
    INSERT INTO orders (customer_name, customer_address, customer_phone, total_price) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [customer_name, customer_address, customer_phone, total_price], (err) => {
    if (err) {
      console.error("Errore durante l'inserimento dell'ordine:", err);
      return res.status(500).send("Errore durante l'inserimento dell'ordine");
    }

    res.status(201).send("Ordine creato con successo");
  });
});

// Endpoint per registrare un utente
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username e password sono obbligatori");
  }

  const hashedPassword = require("crypto")
    .createHash("sha256") // Crittografa la password con SHA256
    .update(password)
    .digest("hex");

  const query = "INSERT INTO registrazione (username, password) VALUES (?, ?)";
  db.query(query, [username, hashedPassword], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).send("Username già in uso");
      }
      console.error("Errore durante la registrazione:", err);
      return res.status(500).send("Errore durante la registrazione");
    }
    res.status(201).send("Registrazione completata con successo");
  });
});

// Endpoint per il login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username e password sono obbligatori");
  }

  const hashedPassword = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const query = "SELECT * FROM registrazione WHERE username = ? AND password = ?";
  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      console.error("Errore durante il login:", err);
      return res.status(500).send("Errore durante il login");
    }

    if (results.length === 0) {
      return res.status(401).send("Credenziali non valide");
    }

    res.status(200).json({ message: "Login effettuato con successo" });
  });
});

// Endpoint per aggiungere una recensione
app.post("/api/site-reviews", (req, res) => {
  const { username, rating, comment } = req.body;

  if (!username || !rating || !comment) {
    return res.status(400).send("Tutti i campi sono obbligatori");
  }

  const query = "INSERT INTO site_reviews (username, rating, comment) VALUES (?, ?, ?)";
  db.query(query, [username, rating, comment], (err) => {
    if (err) {
      console.error("Errore durante l'inserimento della recensione:", err);
      return res.status(500).send("Errore durante l'inserimento della recensione");
    }
    res.status(201).send("Recensione salvata con successo");
  });
});

// Endpoint per ottenere le recensioni
app.get("/api/site-reviews", (req, res) => {
  const query = "SELECT * FROM site_reviews ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errore durante il recupero delle recensioni:", err);
      return res.status(500).send("Errore durante il recupero delle recensioni");
    }
    res.json(results);
  });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
