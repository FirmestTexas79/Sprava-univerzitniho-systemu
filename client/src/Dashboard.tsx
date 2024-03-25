import React from 'react';
import './Dashboard.css'; // Předpokládejme, že máte styly definované v Dashboard.css

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Vítejte na Dashboardu</h1>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-summary">
                    <h2>Shrnutí</h2>
                    <p>Tady by mohly být nějaké základní informace nebo statistiky.</p>
                </section>
                <section className="dashboard-controls">
                    <h2>Ovládací prvky</h2>
                    <button>Udělat něco</button>
                </section>
            </main>
            <footer className="dashboard-footer">
                <p>© {new Date().getFullYear()} Vaše Společnost</p>
            </footer>
        </div>
    );
};

export default Dashboard;
