import { useState } from "react";
import { Link } from 'react-router-dom';

export const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username: 
        <input
          id="username"
          type="text"
          value={form.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
    <br />
    <Link to="/register">Register</Link>
  </div> 
  );
};