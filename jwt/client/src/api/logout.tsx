import { baseURL } from "./baseURL"

export const logout = async () => {
  const url = `${baseURL}logout`;

  const response = await fetch(
    url,
    {
      credentials: "include",
      method: "POST",
    }
  )
  
  return response.json();
}