export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
};

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
  // Always return null during SSR
  if (typeof window === "undefined") {
    return null;
  }

  // Only run this code on the client
  const sessionStr = localStorage.getItem("user-session");

  if (sessionStr) {
    try {
      return { user: JSON.parse(sessionStr) as User };
    } catch {
      return null;
    }
  }

  return null;
}

export async function createSession(user: User): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem("user-session", JSON.stringify(user));
  }
}

export async function destroySession(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user-session");
  }
}
