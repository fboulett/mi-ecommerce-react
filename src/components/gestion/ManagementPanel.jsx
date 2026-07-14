import { FormularioContainer } from '../FormularioContainer/FormularioContainer';

export function ManagementPanel() {
    return (
        <section style={{ padding: '2rem' }}>
            <h2>Panel de gestión</h2>
            <p>Solo los usuarios autenticados pueden acceder a esta sección.</p>
            <FormularioContainer />
        </section>
    );
}
