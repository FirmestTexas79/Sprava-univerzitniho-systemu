import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const VyukoveMaterialy = () => {
    const [materialy, setMaterialy] = useState([
        { nazev: "Základy algebra", soubor: "zaklady_algebra.pdf" },
        { nazev: "Historie Evropy", soubor: "historie_evropy.pdf" },
        // Přidejte další materiály podle potřeby
    ]);

    // Funkce pro přidání nového materiálu (pro demonstraci)
    const pridatMaterial = () => {
        const novyMaterial = { nazev: "Nový Materiál", soubor: "novy_material.pdf" };
        setMaterialy(prevMaterialy => [...prevMaterialy, novyMaterial]);
    };

    return (
        <div className="vyukove-materialy-container">
             <nav className="navbar">
                {/* Příklad odkazů specifických pro učitele */}
                <Link to="/UcitelDashboard">Domů</Link>
                <Link to="/plan-hodin">Plán hodin</Link>
                <Link to="/sprava-kurzu">Správa kurzu</Link>
                <Link to="/zaznam-znamek">Záznam známek</Link>
                <Link to="/vyukove-materialy">Výukové materiály</Link>
                <Link to="/osobni-udaje-ucitele">Osobní údaje</Link> {/* Předpokládám sdílenou funkcionalitu s studenty */}
            </nav>
            <h2>Výukové Materiály</h2>
            <button onClick={pridatMaterial}>Přidat Materiál</button>
            <div className="materialy-list">
                {materialy.map((material, index) => (
                    <div key={index} className="material">
                        <h3>{material.nazev}</h3>
                        <p>{material.soubor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VyukoveMaterialy;
