import React, { useState } from 'react';
import './OsobniUdajeUcitele.css'; // Předpokládáme, že máte definované styly
import { Link } from 'react-router-dom';

const OsobniUdajeUcitele = () => {
    const [ucitel, setUcitel] = useState({
        jmeno: "Jan Novák",
        email: "jan.novak@example.com",
        telefon: "123 456 789",
        specializace: "Matematika",
        // Předpokládejme další osobní údaje podle potřeby
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUcitel(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="osobni-udaje-ucitele-container">
            <nav className="navbar">
                {/* Příklad odkazů specifických pro učitele */}
                <Link to="/ucitel-dashboard">Domů</Link>
                <Link to="/plan-hodin">Plán hodin</Link>
                <Link to="/sprava-kurzu">Správa kurzu</Link>
                <Link to="/zaznam-znamek">Záznam známek</Link>
                <Link to="/vyukove-materialy">Výukové materiály</Link>
                <Link to="/osobni-udaje-ucitele">Osobní údaje</Link> {/* Předpokládám sdílenou funkcionalitu s studenty */}
            </nav>
            <h2>Osobní údaje</h2>
            <form>
                <label>
                    Jméno:
                    <input type="text" name="jmeno" value={ucitel.jmeno} onChange={handleChange} />
                </label>
                <label>
                    E-mail:
                    <input type="email" name="email" value={ucitel.email} onChange={handleChange} />
                </label>
                <label>
                    Telefon:
                    <input type="text" name="telefon" value={ucitel.telefon} onChange={handleChange} />
                </label>
                <label>
                    Specializace:
                    <input type="text" name="specializace" value={ucitel.specializace} onChange={handleChange} />
                </label>
                {/* Přidejte další pole podle potřeby */}
                <button type="submit">Uložit změny</button>
            </form>
        </div>
    );
};

export default OsobniUdajeUcitele;
