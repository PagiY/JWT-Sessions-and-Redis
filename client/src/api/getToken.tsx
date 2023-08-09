const baseURL = `http://localhost:8000/api/`;

export const getToken = async () => {
  const url = `${baseURL}`;
  
  const response = await fetch(
    url,
    {
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    }
  );
 
  return response.json();
}