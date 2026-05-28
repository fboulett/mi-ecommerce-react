import React, { useState } from 'react';
import { FormularioProducto } from '../formulario/FormularioProducto';

export function FormularioContainer() {
    
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        urlImagen: '',
    });
    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };
    const manejarEnvio = (evento) => {
        evento.preventDefault();
        console.log('Enviando los siguientes datos a la API:', datosForm);
    };
    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
        />
    );
    }
