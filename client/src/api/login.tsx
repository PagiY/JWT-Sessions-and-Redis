const baseURL = `http://localhost:8000/api/`;

export const login = async (data: {username: string, password: string, user_type: 'client' | 'admin'}) => {
  const url = `${baseURL}login`;
  
  const response = await fetch(
    url,
    {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
 
  return response.json();
}