import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

(async function cleanup() {
  try {
    const colRef = collection(db, "0");
    const snap = await getDocs(colRef);
    if (snap.empty) {
      console.log('Colección "0" vacía o inexistente. Nada para eliminar.');
      process.exit(0);
    }
    console.log(`Eliminando ${snap.size} documentos de la colección '0'...`);
    let deleted = 0;
    for (const d of snap.docs) {
      try {
        await deleteDoc(doc(db, "0", d.id));
        deleted += 1;
        console.log("Eliminado doc id:", d.id);
      } catch (err) {
        console.error("Error eliminando doc", d.id, err);
      }
    }
    console.log("Eliminación finalizada. Documentos eliminados:", deleted);
    process.exit(0);
  } catch (err) {
    console.error("Error accediendo a la colección 0:", err);
    process.exit(1);
  }
})();
