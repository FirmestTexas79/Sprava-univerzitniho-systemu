import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    
    let navigate = useNavigate();

    const handleLogout = () => {
        // Zde byste měli vymazat všechny relevatní informace o uživateli
        // například z localStorage/sessionStorage nebo kontextu
        sessionStorage.removeItem('isAdmin'); // Příklad odstranění uživatelského stavu
        navigate('/login'); // Přesměrování uživatele na login stránku
    };
    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <Link to="/dashboard">Domů</Link> {/* Změna z a href na Link to */}
                <Link to="/Rozvrh">Rozvrh</Link> {/* Přidán odkaz na Rozvrh */}
                <Link to="/vyber-predmetu">Výběr předmětů</Link> {/* Předpokládá se, že toto je funkce dostupná studentům */}
                <Link to="/osobni-udaje">Osobní údaje</Link> {/* Předpokládá se, že toto vede na stránku s osobními údaji studenta */}
            </nav>
            <button onClick={handleLogout}>Odhlásit se</button>
            <header className="dashboard-header">
                <h1>Vítejte ve studentském rozhraní!</h1>
            </header>
            <main className="dashboard-main">
                {/* Příklad obsahu pro studenta */}
                <section className="dashboard-schedule">
                    <h2>Rozvrh</h2>
                    <p>Zde si můžete prohlédnout svůj aktuální školní rozvrh.</p>
                    <button>Prohlédnout rozvrh</button> {/* Tlačítko může vést na stránku s rozvrhem */}
                </section>
                <section className="dashboard-courses">
                    <h2>Výběr předmětů</h2>
                    <p>Zde můžete přidávat a odstraňovat předměty ze svého studijního plánu.</p>
                    <button>Upravit předměty</button> {/* Tlačítko pro úpravu předmětů */}
                </section>
                <section className="dashboard-profile">
                    <h2>Osobní údaje</h2>
                    <p>Zde můžete aktualizovat své osobní údaje.</p>
                    <button>Aktualizovat údaje</button> {/* Tlačítko pro aktualizaci osobních údajů */}
                </section>
            </main>
            <footer className="dashboard-footer">
                <p>© {new Date().getFullYear()} Vaše Škola</p>
            </footer>
        </div>
    );
};

export default Dashboard;
