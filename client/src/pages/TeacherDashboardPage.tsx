import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "../styles/UcitelDashboard.css"; // Předpokládá se, že máte definované styly

export default function TeacherDashboardPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Zde byste měli vymazat všechny relevatní informace o uživateli
        // například z localStorage/sessionStorage nebo kontextu
        sessionStorage.removeItem("isAdmin"); // Příklad odstranění uživatelského stavu
        navigate("/login"); // Přesměrování uživatele na login stránku
    };

    // Navigace k formulářům pro přidání nových entit
    const navigateToAddActivity = () => navigate("/add-activity");
    const navigateToAddRoom = () => navigate("/add-room");
    const navigateToAddSubject = () => navigate("/add-subject");

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <Link to="/ucitel-dashboard">Domů</Link>
                <Link to="/plan-hodin">Plán hodin</Link>
                <Link to="/sprava-kurzu">Správa kurzu</Link>
                <Link to="/zaznam-znamek">Záznam známek</Link>
                <Link to="/vyukove-materialy">Výukové materiály</Link>
                <Link to="/osobni-udaje-ucitele">Osobní údaje</Link>
				<Link to="/add-exam">Zkoušky</Link>
            </nav>
            <button onClick={handleLogout}>Odhlásit se</button>
            <header className="dashboard-header">
                <h1>Vítejte v učitelském rozhraní!</h1>
            </header>
            <main className="dashboard-main">
                {/* Tlačítka pro přidání nových entit */}
                <button onClick={navigateToAddActivity} className="add-button">Přidat Aktivitu</button>
                <button onClick={navigateToAddRoom} className="add-button">Přidat Místnost</button>
                <button onClick={navigateToAddSubject} className="add-button">Přidat Předmět</button>
                
                <section className="dashboard-section">
                    <h2>Plánované lekce</h2>
                    <p>Podrobnosti o vašich příštích lekcích.</p>
                </section>
                <section className="dashboard-section">
                    <h2>Aktuální kurzy</h2>
                    <p>Seznam kurzů, které momentálně vyučujete.</p>
                </section>
            </main>
            <footer className="dashboard-footer">
                <p>© {new Date().getFullYear()} Vaše Škola</p>
            </footer>
        </div>
    );
}
