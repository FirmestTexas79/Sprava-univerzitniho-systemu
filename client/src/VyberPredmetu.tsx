import React, { useState } from 'react';
import './VyberPredmetu.css'; // Import stylů
import { Link } from 'react-router-dom';

const VyberPredmetu = () => {
    // Předpokládejme, že máte nějaký seznam předmětů
    const predmety = ["Matematika", "Fyzika", "Chemie", "Biologie", "Informatika"];
    const [vybranePredmety, setVybranePredmety] = useState<string[]>([]);

    const handleVyberPredmetu = (predmet: string) => {
        setVybranePredmety(prev => [...prev, predmet]);
    };

    return (
        <div className="vyber-predmetu-container">
            <nav className="navbar">
                <Link to="/dashboard">Domů</Link> {/* Změna z a href na Link to */}
                <Link to="/Rozvrh">Rozvrh</Link> {/* Přidán odkaz na Rozvrh */}
                <Link to="/vyber-predmetu">Výběr předmětů</Link> {/* Předpokládá se, že toto je funkce dostupná studentům */}
                <Link to="/osobni-udaje-ucitele">Osobní údaje</Link> {/* Předpokládá se, že toto vede na stránku s osobními údaji studenta */}
            </nav>
            <h2>Výběr Předmětu</h2>
            <ul>
                {predmety.map(predmet => (
                    <li key={predmet}>
                        {predmet} <button onClick={() => handleVyberPredmetu(predmet)}>Vybrat</button>
                    </li>
                ))}
            </ul>
            {vybranePredmety.length > 0 && (
                <div>
                    <h3>Vybrané předměty:</h3>
                    <ul>
                        {vybranePredmety.map(predmet => (
                            <li key={predmet}>{predmet}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VyberPredmetu;
