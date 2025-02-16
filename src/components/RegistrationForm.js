import React, { useState } from "react";
import { registerUser } from "../api";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom"; // Fix: Use React Router for navigation

function RegistrationForm() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await registerUser(formData);
            setSuccess("User Registered Successfully!");
            setError(null);
            setFormData({ firstName: "", lastName: "", email: "" });
        } catch (err) {
            setError("Error registering user.");
            setSuccess(null);
        }
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center">Register a User Account</h2>
                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Sign Up</Button>
                    </Form>
                    <p className="mt-3">
                        <Link to="/admin">Go to Admin Page</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default RegistrationForm;
