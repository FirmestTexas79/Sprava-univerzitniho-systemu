import React from 'react';


// Definice typů pro stav
type RegistrationState = {
  name: string;
  email: string;
  password: string;
};

// Třída Registration rozšiřující React.Component
// Specifikujeme prázdné props a typ pro stav
class Registration extends React.Component<{}, RegistrationState> {
  state: RegistrationState = {
    name: '',
    email: '',
    password: '',
  };

  // Handler pro změnu hodnot ve formuláři
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<RegistrationState, keyof RegistrationState>);
  };

  // Handler pro odeslání formuláře
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Zabráníme výchozímu chování formuláře
    console.log('Registration data:', this.state);
    // Zde by se odeslala data na server
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Registrace</h2>
        <div>
          <label>Jméno:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Heslo:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Registrovat</button>
      </form>
    );
  }
}

export default Registration;
