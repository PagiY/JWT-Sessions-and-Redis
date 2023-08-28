const baseURL = `http://localhost:8000/api/`;

export const login = async (data: { username: string, password: string }) => {
  const url = `${baseURL}login`;
  
  const response = await fetch(
    url,
    {
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
 
  return response.json();
}
