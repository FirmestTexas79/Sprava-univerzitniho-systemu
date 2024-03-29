import React, { useState } from 'react';
import './SpravaKurzu.css'; // Import stylů
import { Link } from 'react-router-dom';

const SpravaKurzu = () => {
    const [kurzy, setKurzy] = useState([
        { nazev: "Matematika pro začátečníky", popis: "Základy matematiky." },
        { nazev: "Pokročilá fyzika", popis: "Fyzikální teorie a experimenty." },
        // Přidejte další kurzy podle potřeby
    ]);

    // Funkce pro přidání nového kurzu (příklad)
    const pridatKurz = () => {
        const novyKurz = { nazev: "Nový kurz", popis: "Popis nového kurzu." };
        setKurzy(prevKurzy => [...prevKurzy, novyKurz]);
    };

    return (
        <div className="sprava-kurzu-container">
             <nav className="navbar">
                {/* Příklad odkazů specifických pro učitele */}
                <Link to="/ucitel-dashboard">Domů</Link>
                <Link to="/plan-hodin">Plán hodin</Link>
                <Link to="/sprava-kurzu">Správa kurzu</Link>
                <Link to="/zaznam-znamek">Záznam známek</Link>
                <Link to="/vyukove-materialy">Výukové materiály</Link>
                <Link to="/osobni-udaje-ucitele">Osobní údaje</Link> {/* Předpokládám sdílenou funkcionalitu s studenty */}
            </nav>
            <h2>Správa Kurzů</h2>
            <button onClick={pridatKurz}>Přidat Kurz</button>
            <div className="kurzy-list">
                {kurzy.map((kurz, index) => (
                    <div key={index} className="kurz">
                        <h3>{kurz.nazev}</h3>
                        <p>{kurz.popis}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpravaKurzu;
