import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://shopping-list-135ee-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const productsListinDB = ref(dataBase, "products");

// #################################################################
// #################################################################
// #################################################################
// #################################################################

let inputTyping = document.querySelector(".input-typing");
let buttonTyping = document.querySelector(".button-typing");
let ulList = document.querySelector(".ul-list");

// #################################################################
// #################################################################

buttonTyping.addEventListener("click", function () {
  let inputTypingValue = inputTyping.value;
  console.log(inputTypingValue);

  push(productsListinDB, inputTypingValue);
  console.log(`${inputTypingValue} added to database`);

  clearInput();
  addProduct(inputTypingValue);

  onValue(productsListinDB, function (snapshot) {
    console.log(snapshot.val());

    if (snapshot.exists()) {
      
    let BDDUpDate = Object.values(snapshot.val());
    console.log(BDDUpDate);

    let BDDEntries = Object.entries(snapshot.val());
    console.log(BDDEntries);

    ulList.innerHTML = "";

    for (let i = 0; i < BDDUpDate.length; i++) {
      // console.log(BDDUpDate[i]);
      // addProduct(BDDUpDate[i]);
      let ProductEntries = BDDEntries[i];
      let ProductId = ProductEntries[0];
      let ProductValue = ProductEntries[1];
      addProduct(ProductEntries);
    }
    } else {
      ulList.innerHTML="Pas de produits dans la liste !"
    }

  });
});


function clearInput() {
  inputTyping.value = "";
}

function addProduct(item) {
  let newProduct = document.createElement("li");
   let ItemId = item[0];
  let ItemValue = item[1];
  
  newProduct.textContent = ItemValue; 


  newProduct.addEventListener("click", function () {

    let iDLocationInBDD = ref(dataBase, `products/${ItemId}`);
    console.log(iDLocationInBDD);
    console.log(ItemId);
    remove(iDLocationInBDD);
  });


  ulList.append(newProduct);
}










 // Remplacez ces valeurs par celles de votre propre projet Firebase
    var firebaseConfig = {
      apiKey: "VOTRE_API_KEY",
      authDomain: "VOTRE_AUTH_DOMAIN",
      projectId: "VOTRE_PROJECT_ID",
      storageBucket: "VOTRE_STORAGE_BUCKET",
      messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
      appId: "VOTRE_APP_ID"
    };

    // Initialisez Firebase
    firebase.initializeApp(firebaseConfig);

    // Récupération des champs d'entrée
    var emailInput = document.getElementById("emailInput");
    var passwordInput = document.getElementById("passwordInput");

    // Inscription avec email et mot de passe
    function signUp() {
      var email = emailInput.value;
      var password = passwordInput.value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("Utilisateur inscrit :", user);
        })
        .catch((error) => {
          console.error("Erreur d'inscription :", error);
        });
    }

    // Connexion avec email et mot de passe
    function signIn() {
      var email = emailInput.value;
      var password = passwordInput.value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("Utilisateur connecté :", user);
        })
        .catch((error) => {
          console.error("Erreur de connexion :", error);
        });
    }

    // Déconnexion
    function signOut() {
      firebase.auth().signOut().then(() => {
        console.log("Utilisateur déconnecté");
      }).catch((error) => {
        console.error("Erreur de déconnexion :", error);
      });
    }









// let profileData = {
//   name: "vincent",
//   age: 32,
//   size: 2.43,
//   color: "brown",
// };

// let values = Object.values(profileData);
// console.log(values);
// let keys = Object.keys(profileData);
// console.log(keys);
// let valuesAndKeys = Object.entries(profileData);
// console.log(valuesAndKeys);
