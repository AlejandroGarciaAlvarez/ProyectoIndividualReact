// src/services/api.js
export async function getUsers() {
  // Consumo de API REST JSONPlaceholder [cite: 117]
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}