import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "../src/components/RegistrationForm";
import { registerUser } from "../src/api";

test("renders registration form", () => {
    const { getByPlaceholderText } = render(<RegistrationForm />);
    expect(getByPlaceholderText("First Name")).toBeInTheDocument();
});

// Mock API
jest.mock("../src/api", () => ({
    registerUser: jest.fn(),
}));

describe("RegistrationForm Component", () => {
    test("renders registration form inputs and button", () => {
        render(<RegistrationForm />);

        expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    test("submits form successfully", async () => {
        registerUser.mockResolvedValueOnce({
            id: 1,
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice@example.com",
            state: "pending",
        });

        render(<RegistrationForm />);

        fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "Alice" } });
        fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Johnson" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "alice@example.com" } });

        fireEvent.click(screen.getByText("Sign Up"));

        expect(registerUser).toHaveBeenCalledWith({
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice@example.com",
        });

        expect(await screen.findByText("User Registered Successfully!")).toBeInTheDocument();
    });

    test("shows error message on API failure", async () => {
        registerUser.mockRejectedValueOnce(new Error("Registration failed"));

        render(<RegistrationForm />);

        fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "Bob" } });
        fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Smith" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "bob@example.com" } });

        fireEvent.click(screen.getByText("Sign Up"));

        expect(await screen.findByText("Error registering user.")).toBeInTheDocument();
    });
});