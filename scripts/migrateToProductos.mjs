import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Copia la configuración usada por la app (confirma que coincide con src/firebase/config.js)
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

const CANDIDATE_COLLECTIONS = [
  "productos",
  "0",
  "productos_nacionales",
  "productosNacionales",
  "productosNacionalesServer",
];
const TARGET_COLLECTION = "productos";

function normalize(raw) {
  const lowered = {};
  Object.keys(raw || {}).forEach((k) => {
    lowered[k.toLowerCase()] = raw[k];
  });
  const out = {};
  out.categoria = lowered.categoria || lowered.category || "";
  out.id = Number(lowered.id ?? lowered["i d"] ?? lowered.codigo ?? 0) || 0;
  out.imagen =
    lowered.imagen || lowered.image || lowered.urlimagen || lowered.url || "";
  out.nombre = lowered.nombre || lowered.name || lowered.title || "";
  out.precio = Number(lowered.precio ?? lowered.price ?? 0) || 0;
  out.stock =
    Number(lowered.stock ?? lowered.cantidad ?? lowered.quantity ?? 0) || 0;
  return out;
}

async function collectExistingIds() {
  const existing = new Set();
  const snapshot = await getDocs(collection(db, TARGET_COLLECTION));
  let maxId = 0;
  snapshot.forEach((doc) => {
    const data = doc.data() || {};
    const normalized = normalize(data);
    if (Number.isFinite(normalized.id) && normalized.id > 0) {
      existing.add(Number(normalized.id));
      if (normalized.id > maxId) maxId = normalized.id;
    }
  });
  return { existing, maxId };
}

(async function migrate() {
  console.log("Inicio de migración a colección:", TARGET_COLLECTION);
  const { existing, maxId: initialMax } = await collectExistingIds();
  let maxId = initialMax || 0;
  const summary = { copied: 0, skippedAlreadyInTarget: 0, errors: 0 };

  for (const col of CANDIDATE_COLLECTIONS) {
    try {
      const snap = await getDocs(collection(db, col));
      if (snap.empty) {
        console.log(`Colección ${col} vacía o inexistente.`);
        continue;
      }
      console.log(`Leyendo ${snap.size} documentos desde ${col}...`);
      for (const d of snap.docs) {
        try {
          // evitar duplicar si ya está en la colección target con el mismo doc id y contenido
          // Normalizamos campos y garantizamos id único
          const raw = d.data() || {};
          const item = normalize(raw);
          if (
            !item.nombre &&
            !item.imagen &&
            item.precio === 0 &&
            item.stock === 0
          ) {
            // posible documento vacío o no relevante
          }
          // asegurar id único
          if (!item.id || existing.has(Number(item.id))) {
            maxId += 1;
            item.id = maxId;
          }
          existing.add(Number(item.id));
          // Escribir en la colección target
          await addDoc(collection(db, TARGET_COLLECTION), item);
          summary.copied += 1;
          console.log(
            `Copiado doc ${d.id} -> id:${item.id} (colección ${col})`,
          );
        } catch (innerErr) {
          summary.errors += 1;
          console.error("Error copiando doc", d.id, innerErr);
        }
      }
    } catch (err) {
      console.warn(`No se pudo leer colección ${col}:`, err.message || err);
    }
  }

  console.log("Migración finalizada. Resumen:", summary);
  process.exit(0);
})();
