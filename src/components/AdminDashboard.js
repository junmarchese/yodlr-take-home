import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, updateUser } from "../api";
import { Table, Button, Form, Container, Alert } from "react-bootstrap";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersList = await getUsers();
                setUsers(usersList);
            } catch (err) {
                setError("Error fetching users.");
            }
        }
        fetchUsers();
    }, []);

    async function handleActivate(id) {
        try {
            const user = users.find(u => u.id === id);
            if (!user) {
                setError("User not found.");
                return;
            }

            const updatedUser = { ...user, state: "active" };
            await updateUser(id, updatedUser);

            setUsers(users.map(user => (user.id === id ? updatedUser : user)));
        } catch (err) {
            setError("Error updating user.");
        }
    }

    async function handleDelete(id) {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError("Error deleting user.");
        }
    }

    function handleSearch(e) {
        setSearchTerm(e.target.value.toLowerCase());
    }

    const filteredUsers = users.filter(user =>
        user.firstName?.toLowerCase().includes(searchTerm) ||
        user.lastName?.toLowerCase().includes(searchTerm) ||
        user.email?.toLowerCase().includes(searchTerm)
    );

    return (
        <Container className="mt-4">
            <h2 className="text-center">Admin Dashboard</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Control className="mb-3" type="text" placeholder="Search Users..." onChange={handleSearch} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.state}</td>
                            <td>
                                <Button variant="success" onClick={() => handleActivate(user.id)} disabled={user.state === "active"}>
                                    Activate
                                </Button>{" "}
                                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AdminDashboard;
