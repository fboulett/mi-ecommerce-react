// Script para agregar cupones de descuento a Firebase
// Ejecutar con: node scripts/addCoupons.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG1EgfRkKiJys5QGM4yAnKqpb47ovftoA",
  authDomain: "apextienda-5b3b8.firebaseapp.com",
  projectId: "apextienda-5b3b8",
  storageBucket: "apextienda-5b3b8.firebasestorage.app",
  messagingSenderId: "455198037271",
  appId: "1:455198037271:web:3c47b4954ddfa4d62dd352",
  measurementId: "G-PWZKL5Z2FJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Cupones de descuento
const cupones = [
  {
    codigo: "INVIERNO20%",
    descuento: 20,
    cantidadDisponible: 100,
    cantidadUsada: 0,
    activo: true,
    descripcion: "Descuento del 20% por temporada de invierno"
  },
  {
    codigo: "INVIERNO50%",
    descuento: 50,
    cantidadDisponible: 50,
    cantidadUsada: 0,
    activo: true,
    descripcion: "Descuento del 50% por temporada de invierno"
  }
];

async function addCoupons() {
  try {
    const cuponesRef = collection(db, 'cupones');
    
    for (const cupon of cupones) {
      // Verificar si el cupón ya existe
      const q = collection(db, 'cupones');
      const snapshot = await getDocs(q);
      
      let cuponExists = false;
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.codigo === cupon.codigo) {
          cuponExists = true;
          console.log(`⚠ El cupón ${cupon.codigo} ya existe, actualizando...`);
        }
      });
      
      if (cuponExists) {
        // Actualizar cupón existente
        const cuponDoc = snapshot.docs.find(doc => doc.data().codigo === cupon.codigo);
        await setDoc(doc(db, 'cupones', cuponDoc.id), cupon, { merge: true });
        console.log(`✓ Cupón ${cupon.codigo} actualizado en Firebase`);
      } else {
        // Crear nuevo cupón
        const newDocRef = doc(cuponesRef);
        await setDoc(newDocRef, cupon);
        console.log(`✓ Cupón ${cupon.codigo} agregado a Firebase`);
      }
    }
    
    console.log('\n✅ Proceso completado');
  } catch (error) {
    console.error('Error general:', error);
  }
}

addCoupons();
