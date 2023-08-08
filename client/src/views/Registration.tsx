import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {

  const [form, setForm] = useState<{
    username: string,
    password: string,
    confirm_password: string,
    user_type: 'client' | 'admin'
  }>({
    username: '',
    password: '',
    confirm_password: '',
    user_type: 'client',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    return;
  }

  return (
    <div>
      <h2>Register</h2>
      <br />
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
        <label htmlFor="password">
          Confirm Password:
          <input
            id="confirm_password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="user_type">
          User Type: 
          <select
            id="user_type"
            name="user_type"
            value={form.user_type}
            onChange={handleChange}
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/">Login</Link>
    </div>
  )
}