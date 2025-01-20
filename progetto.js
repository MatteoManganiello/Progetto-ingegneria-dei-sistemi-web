        // Componente Login
        const Login = {
          template: `
          <div class="container">
              <h2 class="text-center">Accedi</h2>
              <form @submit.prevent="handleLogin">
                  <div class="form-group">
                      <label for="username">Username</label>
                      <input type="text" id="username" v-model="username" class="form-control" required>
                  </div>
                  <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" id="password" v-model="password" class="form-control" required>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">Accedi</button>
              </form>
          </div>
          `,
          data() {
              return { username: "", password: "" };
          },
          methods: {
            async handleLogin() {
                try {
                    const response = await fetch("http://localhost:3000/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: this.username,
                            password: this.password,
                        }),
                    });
        
                    if (response.ok) {
                        const result = await response.json();
                        localStorage.setItem("token", result.token); // Salva il token
                        alert("Login effettuato con successo!");
                        this.$router.push("/"); // Reindirizza alla homepage
                    } else {
                        const error = await response.text();
                        alert(`Errore: ${error}`);
                    }
                } catch (error) {
                    console.error("Errore durante il login:", error);
                    alert("Errore durante il login. Riprova più tardi.");
                }
            },
        }};
        
        
          

      const Register = {
        template: `
        <div class="container">
            <h2 class="text-center">Registrati</h2>
            <form @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="username" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Registrati</button>
            </form>
        </div>
        `,
        data() {
            return {
                username: "",
                password: "",
            };
        },
        methods: {
            async handleRegister() {
                try {
                    const response = await fetch("http://localhost:3000/api/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: this.username,
                            password: this.password,
                        }),
                    });
    
                    if (response.ok) {
                        alert("Registrazione completata con successo!");
                        this.$router.push("/Login"); // Reindirizza alla pagina di login
                    } else {
                        const error = await response.text();
                        alert(`Errore: ${error}`);
                    }
                } catch (error) {
                    console.error("Errore durante la registrazione:", error);
                    alert("Errore durante la registrazione. Riprova più tardi.");
                }
            },
        },
    };

const Home = {
  data() {
    return {
      articoli: [
        {
          image: "./immagini/BUYBurger.png",
          text: "\uD83C\uDF54Scopri tutto ciò che abbiamo da offrire.\uD83C\uDF54",
          alt: "Logo di BUYBurger con sfondo colorato",
        },
        {
          image: "./immagini/varietà.png",
          text: "\uD83C\uDF54Trova il panino perfetto che soddisfa i tuoi gusti.\uD83C\uDF54",
          alt: "Una varietà di panini su un tavolo",
        },
        {
          image: "./immagini/uomoBuyBurger.png",
          text: "\uD83C\uDF54Concediti il ​​piacere unico dei nostri panini.\uD83C\uDF54",
          alt: "Un uomo che gusta un panino di BUYBurger",
        }
      ]
    };
  },

  template: `
<div class="container">
  <div class="row">
    <div class="col-md-4" v-for="(articolo, index) in articoli" :key="index">
      <div class="card">
        <img :src="articolo.image" :alt="articolo.alt" class="card-img-top">
        <div class="card-body">
          <p class="card-text" style="font-size: 25px;">{{ articolo.text }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
`
};



const Compra = {
  template: `
<div>
  <h2 style="text-align: center; margin-bottom: 20px;">🍔 Menu 🍔</h2>

  <!-- Sezione Panini -->
  <div>
    <h3 style="text-align: center; margin-top: 20px;">Panini</h3>
    <div v-if="burgers.length">
      <div 
        v-for="burger in burgers" 
        :key="burger.id" 
        style="border: 1px solid #ccc; border-radius: 8px; margin-bottom: 20px; padding: 15px; display: flex; align-items: center;"
      >
        <img 
          :src="burger.image" 
          alt="immagini dei panini" 
          style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-right: 15px;" 
        />
        <div>
          <h3 style="margin: 0 0 10px;">{{ burger.name }}</h3>
          <p style="margin: 0 0 5px; font-size: 14px; color: #555;">{{ burger.description }}</p>
          <p style="margin: 0 0 10px; font-weight: bold;">Prezzo: {{ burger.price }} €</p>
          <button 
            @click="addToCart(burger, 'burger')" 
            style="background-color: #f86106; color: white; border: none; border-radius: 5px; padding: 8px 12px; cursor: pointer;"
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
    <p v-else style="text-align: center; font-size: 18px; color: #888;">Nessun panino disponibile.</p>
  </div>

  <!-- Sezione Patatine -->
  <div>
    <h3 style="text-align: center; margin-top: 20px;">Patatine</h3>
    <div v-if="fries.length">
      <div 
        v-for="fry in fries" 
        :key="fry.id" 
        style="border: 1px solid #ccc; border-radius: 8px; margin-bottom: 20px; padding: 15px; display: flex; align-items: center;"
      >
        <img 
          :src="fry.image" 
          alt="immagini delle patatine" 
          style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-right: 15px;" 
        />
        <div>
          <h3 style="margin: 0 0 10px;">{{ fry.name }}</h3>
          <p style="margin: 0 0 5px; font-size: 14px; color: #555;">{{ fry.description }}</p>
          <p style="margin: 0 0 10px; font-weight: bold;">Prezzo: {{ fry.price }} €</p>
          <button 
            @click="addToCart(fry, 'fries')" 
            style="background-color: #f86106; color: white; border: none; border-radius: 5px; padding: 8px 12px; cursor: pointer;"
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
    <p v-else style="text-align: center; font-size: 18px; color: #888;">Nessuna patatina disponibile.</p>
  </div>

  <!-- Sezione Bevande -->
  <div>
    <h3 style="text-align: center; margin-top: 20px;">Bevande</h3>
    <div v-if="drinks.length">
      <div 
        v-for="drink in drinks" 
        :key="drink.id" 
        style="border: 1px solid #ccc; border-radius: 8px; margin-bottom: 20px; padding: 15px; display: flex; align-items: center;"
      >
        <img 
          :src="drink.image" 
          alt="Immagini dell bevande" 
          style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-right: 15px;" 
        />
        <div>
          <h3 style="margin: 0 0 10px;">{{ drink.name }}</h3>
          <p style="margin: 0 0 5px; font-size: 14px; color: #555;">{{ drink.description }}</p>
          <p style="margin: 0 0 10px; font-weight: bold;">Prezzo: {{ drink.price }} €</p>
          <button 
            @click="addToCart(drink, 'drink')" 
            style="background-color: #f86106; color: white; border: none; border-radius: 5px; padding: 8px 12px; cursor: pointer;"
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
    <p v-else style="text-align: center; font-size: 18px; color: #888;">Nessuna bevanda disponibile.</p>
  </div>

  <!-- Sezione Carrello -->
  <h3 style="text-align: center; margin-top: 30px;">🛒 Carrello 🛒</h3>
  <div v-if="cart.length">
    <ul style="list-style: none; padding: 0;">
      <li 
        v-for="item in cart" 
        :key="item.id" 
        style="border: 1px solid #ccc; border-radius: 8px; margin-bottom: 10px; padding: 10px; display: flex; justify-content: space-between; align-items: center;"
      >
        <div>
          <h4 style="margin: 0;">{{ item.name }}</h4>
          <p style="margin: 0; font-size: 14px;">{{ item.quantity }} x {{ item.price }} €</p>
        </div>
        <div>
          <button 
            style="background-color: #e63946; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;"
            @click="removeFromCart(item)"
          >
            Rimuovi
          </button>
        </div>
      </li>
    </ul>
    <button 
      @click="placeOrder" 
      style="background-color: #2a9d8f; color: white; border: none; border-radius: 8px; padding: 12px 20px; cursor: pointer; display: block; margin: 20px auto;"
    >
      Completa Ordine
    </button>
  </div>
  <p v-else style="text-align: center; font-size: 18px; color: #888;">Il carrello è vuoto.</p>
</div>
  `,
  data() {
    return {
      burgers: [],
      fries: [],
      drinks: [],
      cart: []
    };
  },
  mounted() {
    this.fetchData("burgers");
    this.fetchData("fries");
    this.fetchData("drinks");
  },
  methods: {
    fetchData(type) {
      fetch(`http://localhost:3000/api/${type}`)
        .then((response) => response.json())
        .then((data) => {
          this[type] = data;
        })
        .catch((error) =>
          console.error(`Errore nel caricamento dei dati ${type}:`, error)
        );
    },
    addToCart(item, type) {
      const existingItem = this.cart.find(
        (i) => i.id === item.id && i.type === type
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, type, quantity: 1 });
      }
    },
    removeFromCart(item) {
      this.cart = this.cart.filter((i) => i.id !== item.id || i.type !== item.type);
    },
    placeOrder() {
      const cart = this.cart;
      if (cart.length === 0) {
          alert("Il carrello è vuoto!");
          return;
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      this.$router.push("/ConfermaOrdine");

      fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      })
        .then((response) => {
          if (response.ok) {
            alert("Ordine completato con successo!");
            this.cart = [];
          } else {
            alert("Errore durante il completamento dell'ordine.");
          }
        })
        .catch((error) => console.error("Errore durante l'invio dell'ordine:", error));
    }
  }
};

const ConfermaOrdine = {
  template: `
  <div class="container">
      <h2 class="text-center">Conferma il tuo ordine</h2>
      <form @submit.prevent="finalizeOrder">
          <div class="form-group">
              <label for="customer_name">Nome</label>
              <input type="text" id="customer_name" v-model="customer_name" class="form-control" required>
          </div>
          <div class="form-group">
              <label for="customer_address">Indirizzo</label>
              <input type="text" id="customer_address" v-model="customer_address" class="form-control" required>
          </div>
          <div class="form-group">
              <label for="customer_phone">Numero di telefono</label>
              <input type="tel" id="customer_phone" v-model="customer_phone" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Conferma Ordine</button>
      </form>
  </div>
  `,
  data() {
      return {
          customer_name: "",
          customer_address: "",
          customer_phone: "",
      };
  },
  methods: {
      async finalizeOrder() {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          if (cart.length === 0) {
              alert("Il carrello è vuoto!");
              return;
          }

          const order = {
              customer_name: this.customer_name,
              customer_address: this.customer_address,
              customer_phone: this.customer_phone,
              items: cart,
          };

          try {
              const response = await fetch("http://localhost:3000/api/orders", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(order),
              });

              if (response.ok) {
                  alert("Ordine completato con successo!");
                  localStorage.removeItem("cart");
                  this.$router.push("/");
              } else {
                  const error = await response.text();
                  alert(`Errore: ${error}`);
              }
          } catch (error) {
              console.error("Errore durante l'invio dell'ordine:", error);
              alert("Errore durante l'invio dell'ordine. Riprova più tardi.");
          }
      },
  },
};


const Scopri = { 

  data() {
    return {
      articoli: [
        {
          image: "./immagini/online.jpg",
          text: "Cerchi il burger perfetto? 🍔 Scopri il nostro sito per i migliori burger, ingredienti freschi e sapori unici che soddisfano ogni palato! 🌟 Visita BuyBurger e lascia che il gusto parli da sé!",
          alt: "Burger appetitoso su sfondo con dettagli promozionali"
        },
        {
          image: "./immagini/cucina.jpg",
          text: "I nostri burger sono arte, i nostri cuochi gli artisti! 👨‍🍳🍔 Scopri la maestria dei nostri chef su BuyBurger: passione, qualità e creatività per burger che lasciano il segno. 🌟 Visita buyburger.com!",
          alt: "Chef che prepara un burger con ingredienti freschi"
        },
        {
          image: "./immagini/furgoncino.jpg",
          text: "Il gusto dei nostri burger arriva direttamente a casa tua! 🚚🍔 Con BuyBurger, spedizioni veloci e garantite per assaporare la qualità ovunque tu sia. Ordina ora su buyburger.com!",
          alt: "Furgoncino per consegne di burger con logo BuyBurger"
        },
        {
          image: "./immagini/prezzi.jpg",
          text: "Qualità al top, prezzi al minimo! 🍔💰 Su BuyBurger trovi i burger più buoni senza spendere una fortuna. Gusto irresistibile, prezzi imbattibili: ordina ora su buyburger.com!",
          alt: "Cartellino prezzi con burger e offerta speciale"
        },
        {
          image: "./immagini/ingredienti.jpg",
          text: "Solo il meglio nei nostri burger! 🥩🍅 Su BuyBurger utilizziamo ingredienti di prima qualità, freschi e selezionati con cura per offrirti un gusto autentico e irresistibile. Scopri la differenza su buyburger.com!",
          alt: "Ingredienti freschi per burger: carne, pomodori, lattuga"
        },
        {
          image: "./immagini/codiceqr.jpg",
          text: "Resta connesso con il mondo di BuyBurger! 🍔📲 Scansiona i nostri codici QR per seguirci sui social e non perderti novità, offerte esclusive e dietro le quinte del nostro gusto unico. 🖤🍟",
          alt: "Codice QR per accedere ai profili social di BuyBurger"
        }
      ]
    };
  },
  

template: `
<div class="container">
<div class="row">
  <div class="col-md-4" v-for="(articolo, index) in articoli" :key="index">
    <div class="card">
      <img :src="articolo.image" :alt="articolo.alt" class="card-img-top">
      <div class="card-body">
        <p class="card-text" style="font-size: 25px;">{{ articolo.text }}</p>
      </div>
    </div>
  </div>
</div>
</div>


`
};

const SiteReviews = {
  template: `
  <div class="container">
      <h2 class="text-center">Recensioni del Sito</h2>

      <!-- Modulo per lasciare una recensione -->
      <form @submit.prevent="submitReview" class="mb-4">
          <h3>Lascia una Recensione</h3>
          <div class="form-group">
              <label for="username">Nome:</label>
              <input id="username" v-model="newReview.username" class="form-control" required>
          </div>
          <div class="form-group">
              <label for="rating">Valutazione (1-5):</label>
              <input id="rating" type="number" v-model="newReview.rating" class="form-control" min="1" max="5" required>
          </div>
          <div class="form-group">
              <label for="comment">Commento:</label>
              <textarea id="comment" v-model="newReview.comment" class="form-control" required></textarea>
          </div>
          <button type="submit" class="btn btn-success">Invia Recensione</button>
      </form>

      <!-- Lista delle recensioni -->
      <div>
          <h3>Recensioni Recenti</h3>
          <ul>
              <li v-for="review in reviews" :key="review.id" class="mb-3">
                  <strong>{{ review.username }}</strong> - {{ review.rating }}/5
                  <p>{{ review.comment }}</p>
                  <small>Inserito il {{ new Date(review.created_at).toLocaleString() }}</small>
              </li>
          </ul>
      </div>
  </div>
  `,
  data() {
      return {
          reviews: [],
          newReview: {
              username: "",
              rating: null,
              comment: "",
          },
      };
  },
  mounted() {
      this.fetchReviews();
  },
  methods: {
      async fetchReviews() {
          const response = await fetch("http://localhost:3000/api/site-reviews");
          if (response.ok) {
              this.reviews = await response.json();
          } else {
              alert("Errore durante il recupero delle recensioni.");
          }
      },
      async submitReview() {
          const response = await fetch("http://localhost:3000/api/site-reviews", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(this.newReview),
          });

          if (response.ok) {
              alert("Recensione inviata con successo!");
              this.newReview = { username: "", rating: null, comment: "" };
              this.fetchReviews(); // Aggiorna la lista delle recensioni
          } else {
              alert("Errore durante l'invio della recensione.");
          }
      },
  },
};

const routes = [
  { path: "/Login", component: Login },
  { path: "/Register", component: Register },
  { path: '/', component: Home },
  { path: '/Compra', component: Compra },
  { path: "/ConfermaOrdine", component: ConfermaOrdine },
  { path: '/Scopri', component: Scopri },
  { path: "/Recensioni", component: SiteReviews }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});


const app = Vue.createApp({});
app.use(router);
app.mount('#vueApp');