import axios from 'axios';

const BASE_URL = "http://localhost:3000";

export async function getUsers() {
    const res = await fetch(`${BASE_URL}/users`);
    return await res.json();
}

export async function registerUser(userData) {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return await res.json();
}

export async function updateUser(id, userData) {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return await res.json();
}

export async function deleteUser(id) {
    await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
}
