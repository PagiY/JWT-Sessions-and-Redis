import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/login';

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
      username: string,
      password: string,
      user_type: 'client' | 'admin'
  }>({
    username: '',
    password: '',
    user_type: 'client',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    login(form)
      .then(() => { 
        console.log('success');
        navigate('/');
      })
      .catch((err) => console.log(err));
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
      <button type="submit">Login</button>
    </form>
    <br />
    <Link to="/register">Register</Link>
  </div> 
  );
};