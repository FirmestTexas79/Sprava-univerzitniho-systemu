import React, { useState } from 'react';
import './OsobniUdaje.css'; // Import stylů
import { Link } from 'react-router-dom';

const OsobniUdaje = () => {
    // Předpokládejme, že data studenta se načítají dynamicky (např. z API)
    const [student, setStudent] = useState({
        jmeno: "Jan Novák",
        email: "jan.novak@example.com",
        telefon: "123 456 789",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudent(prevState => ({ ...prevState, [name]: value }));
    };
    

    return (
        <div className="osobni-udaje-container">
            <nav className="navbar">
                <Link to="/dashboard">Domů</Link> {/* Změna z a href na Link to */}
                <Link to="/Rozvrh">Rozvrh</Link> {/* Přidán odkaz na Rozvrh */}
                <Link to="/vyber-predmetu">Výběr předmětů</Link> {/* Předpokládá se, že toto je funkce dostupná studentům */}
                <Link to="/osobni-udaje">Osobní údaje</Link> {/* Předpokládá se, že toto vede na stránku s osobními údaji studenta */}
            </nav>
            <h2>Osobní údaje</h2>
            <form>
                <label>
                    Jméno:
                    <input type="text" name="jmeno" value={student.jmeno} onChange={handleChange} />
                </label>
                <label>
                    E-mail:
                    <input type="email" name="email" value={student.email} onChange={handleChange} />
                </label>
                <label>
                    Telefon:
                    <input type="text" name="telefon" value={student.telefon} onChange={handleChange} />
                </label>
                <button type="button" onClick={() => alert('Údaje byly aktualizovány.')}>Uložit změny</button>
            </form>
        </div>
    );
};

export default OsobniUdaje;
