import request from "supertest";
import app from "../server/index";  // Import the Express server

describe("Users API Endpoints", () => {
    let userId;

    test("GET /users - should return all users", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test("POST /users - should create a new user", async () => {
        const newUser = { firstName: "John", lastName: "Doe", email: "john@example.com" };

        const res = await request(app).post("/users").send(newUser);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.firstName).toBe("John");

        userId = res.body.id; // Save the user ID for later tests
    });

    test("GET /users/:id - should return a user by ID", async () => {
        const res = await request(app).get(`/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(userId);
    });

    test("PUT /users/:id - should update a user", async () => {
        const updatedUser = { id: userId, firstName: "John", lastName: "Doe", email: "john@example.com", state: "active" };

        const res = await request(app).put(`/users/${userId}`).send(updatedUser);

        expect(res.statusCode).toBe(200);
        expect(res.body.state).toBe("active");
    });

    test("DELETE /users/:id - should delete a user", async () => {
        const res = await request(app).delete(`/users/${userId}`);
        expect(res.statusCode).toBe(204);

        const checkRes = await request(app).get(`/users/${userId}`);
        expect(checkRes.statusCode).toBe(404);
    });
});
