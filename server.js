import express from 'express'
import bcrypt from 'bcrypt'
import stripe from 'stripe'
import { initializeApp } from 'firebase/app'
import { collection, getDoc, getFirestore } from 'firebase/firestore'

//Configuración de Firebase
const firebaseConfig = {
	apiKey: "AIzaSyAAacih3wIMgLJZdz5zhizbIGWfN35ks4I",
  authDomain: "demoecommerce-6f7c4.firebaseapp.com",
  projectId: "demoecommerce-6f7c4",
  storageBucket: "demoecommerce-6f7c4.appspot.com",
  messagingSenderId: "506541339527",
  appId: "1:506541339527:web:901a1b8d1638b0335d9922"
}

const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

//inicialización del servidor
const app = express()

//middleware
app.use(express.static('public'))
app.use(express.json()) // permite compartir forms

// Rutas
// Ruta Home
app.get('/', (req, res) => {
	res.sendFile('index.html', { root: 'public'})
})

// Ruta para registrar
app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { root: 'public'})
})

app.post('/signup', (req, res) => {
  const { name, email, password, number, tac } = req.body
  
  // validaciones
  if (name.length < 3){
    res.json({ 'alert': 'name must be 3 letters long'})
  } else if (!email.length) {
    res.json({ 'alert': 'enter your email'})
  } else if (password.length < 8) {
    res.json({ 'alert': 'password must be 8 letters long'})
  } else if (!Number(number) || number.length < 10) {
    res.json({ 'alert': 'invalid number, please enter valid one'})
  } else if (!tac) {
    res.json({ 'alert': 'you must agree to our terms'})
  } else {
    // Almacenar datos en DB
    const users = collection(db, "users")
    getDoc(doc(users, email)).then(user => {
      if(user.exists()){
        res.json({ 'alert': 'email already exists'})
      } else {
        // encriptar password
      }
    })
  }
})

app.listen(3000, () => {
	console.log('Servidor en Ejecución...')
})

