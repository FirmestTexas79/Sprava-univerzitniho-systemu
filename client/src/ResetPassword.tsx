import React, { useState } from 'react';
import './ResetPassword.css';
const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Odeslání žádosti pro obnovu hesla pro:", email);
    // Další logika
  };

  return (
    <form onSubmit={handleSubmit} className="reset-password-form">
      <h2>Obnovit heslo</h2>
      <p>Pro obnovu hesla prosím zadejte svůj e-mail:</p>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Váš e-mail"
        />
      </div>
      <button type="submit">Odeslat</button>
    </form>
  );
};

export default ResetPassword;
