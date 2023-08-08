import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/login';

export const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const tokenItem = JSON.parse(window.localStorage.getItem('access_token') || '{}');
  
    if (tokenItem !== null) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const [form, setForm] = useState<{
      username: string,
      password: string,
  }>({
    username: '',
    password: '',
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
      .then((res) => {
        // console.log(res);
        window.localStorage.setItem('access_token', JSON.stringify(res));
        navigate('/dashboard');
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
      <button type="submit">Login</button>
    </form>
    <br />
    <Link to="/register">Register</Link>
  </div> 
  );
};