import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext(null);

const getAuthErrorMessage = (error) => {
    const code = error?.code;

    switch (code) {
        case 'auth/configuration-not-found':
        case 'auth/operation-not-allowed':
            return 'Firebase Authentication no está habilitado para este proyecto. Activa Email/Password en Firebase Console > Authentication > Sign-in method.';
        case 'auth/invalid-api-key':
            return 'La API key de Firebase no es válida. Revisa la configuración de tu proyecto.';
        case 'auth/network-request-failed':
            return 'No se pudo conectar con Firebase. Revisa tu conexión a internet.';
        case 'auth/weak-password':
            return 'La contraseña debe tener al menos 6 caracteres.';
        case 'auth/email-already-in-use':
            return 'Ya existe una cuenta con ese correo.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            return 'Correo o contraseña incorrectos.';
        default:
            return error?.message || 'No se pudo completar la operación.';
    }
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'usuarios', user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp(),
                rol: 'cliente',
            });

            return userCredential;
        } catch (error) {
            throw new Error(getAuthErrorMessage(error));
        }
    };

    const login = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(getAuthErrorMessage(error));
        }
    };

    const logout = () => signOut(auth);

    const value = useMemo(
        () => ({ currentUser, loading, login, register, logout }),
        [currentUser, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
