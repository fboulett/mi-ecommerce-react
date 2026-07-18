// Script para agregar descripciones a productos en Firebase
// Ejecutar con: node scripts/addDescriptions.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

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

// Descripciones para productos basadas en búsquedas web
const descripciones = {
  "1": "Cerveza Quilces 1L, la cerveza argentina por excelencia, ideal para compartir en reuniones y acompañar comidas tradicionales.",
  "2": "Fernet Branca 750ml, el digestivo italiano más popular en Argentina, perfecto para preparar el clásico fernet con cola.",
  "3": "Vino Rutini Reserva Malbec 750cc, un tinto elegante con notas frutadas y taninos suaves, ideal para carnes y quesos.",
  "4": "Rutini Cabernet Malbec 750ml, corte equilibrado 50% Cabernet Sauvignon y 50% Malbec con crianza en roble francés.",
  "5": "Alfajor Jorgito Negro con Dulce de Leche 330g, el clásico argentino con tapas crujientes, abundante dulce de leche y cobertura de chocolate.",
  "6": "Galletitas Surtido Bagley 398g, la variedad perfecta con Chocolinas, Rumba, Sonrisas, Anillitos y más, ideales para compartir.",
  "7": "Galletitas Oreo Clásica 351g, las icónicas galletas de cacao con relleno de crema sabor vainilla, perfectas para mojar en leche.",
  "8": "Gaseosa Manaos Cola 2.25L, la bebida refrescante argentina con sabor intenso a cola, ideal para compartir en familia.",
  "9": "Mantecol Clásico 130g, el turrón de maní tradicional argentino, una golosina suave y cremosa perfecta para cualquier momento.",
  "10": "Yerba Mate con Palo Taragüi 1kg, la yerba mate líder de Argentina con sabor intenso, cuerpo y rendimiento excepcional.",
  "12": "Papas bastón 250gr, papas prefritas crujientes hechas con aceite de girasol, ideales como guarnición o snack.",
  "13": "Bife de chorizo 1KG, corte premium de lomo con capa de grasa exterior, textura tierna y sabor intenso, ideal para parrilla.",
};

async function addDescriptions() {
  try {
    const COLLECTION_CANDIDATES = ['productos', '0', 'productos_nacionales', 'productosNacionales'];
    
    for (const COLLECTION_NAME of COLLECTION_CANDIDATES) {
      console.log(`\nIntentando colección: ${COLLECTION_NAME}`);
      
      try {
        const productosRef = collection(db, COLLECTION_NAME);
        const snapshot = await getDocs(productosRef);
        
        if (snapshot.empty) {
          console.log(`Colección ${COLLECTION_NAME} vacía o inexistente.`);
          continue;
        }
        
        console.log(`Encontrados ${snapshot.docs.length} productos en ${COLLECTION_NAME}`);
        
        for (const docSnapshot of snapshot.docs) {
          const productData = docSnapshot.data();
          const productId = String(productData.id || docSnapshot.id);
          
          if (descripciones[productId]) {
            await updateDoc(doc(db, COLLECTION_NAME, docSnapshot.id), {
              descripcion: descripciones[productId]
            });
            console.log(`✓ Descripción agregada al producto ${productId} (${productData.nombre || productData.name})`);
          } else {
            console.log(`⚠ No hay descripción para el producto ${productId} (${productData.nombre || productData.name})`);
          }
        }
        
        break; // Si encontramos productos en esta colección, no seguimos buscando
      } catch (err) {
        console.log(`Error en colección ${COLLECTION_NAME}:`, err.message);
      }
    }
    
    console.log('\n✅ Proceso completado');
  } catch (error) {
    console.error('Error general:', error);
  }
}

addDescriptions();
