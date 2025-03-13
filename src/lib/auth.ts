// This is a mock authentication system
// In a real app, you'd use NextAuth.js or a similar authentication solution

export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
};

// Mock admin user
const ADMIN_USER: User = {
  id: "1",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
};

// Mock user credentials for login
const VALID_CREDENTIALS = {
  email: "admin@example.com",
  password: "password123",
};

// Check if credentials are valid
export async function validateCredentials(
  email: string,
  password: string
): Promise<User | null> {
  if (
    email === VALID_CREDENTIALS.email &&
    password === VALID_CREDENTIALS.password
  ) {
    return ADMIN_USER;
  }
  return null;
}

// Mock session checking
export async function getSession(): Promise<{ user: User } | null> {
  // In a real app, this would check cookies or session storage
  // For demo purposes, we'll simulate being logged in

  const sessionStr =
    typeof window !== "undefined" ? localStorage.getItem("user-session") : null;

  if (sessionStr) {
    try {
      return { user: JSON.parse(sessionStr) as User };
    } catch {
      return null;
    }
  }

  return null;
}

// Create a session
export async function createSession(user: User): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem("user-session", JSON.stringify(user));
  }
}

// Destroy the session
export async function destroySession(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user-session");
  }
}
