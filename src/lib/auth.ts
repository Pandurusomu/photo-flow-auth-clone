
import { User } from "@/types";

// Mock auth state and functions for our prototype
let currentUser: User | null = null;
let isAuthenticated = false;

// Mock users for our prototype
const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "johndoe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Photography enthusiast. Travel lover.",
    followers: 235,
    following: 114,
  },
  {
    id: "2",
    username: "janedoe",
    email: "jane@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Digital artist and designer",
    followers: 542,
    following: 267,
  },
];

export function signIn(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(user => user.email === email);
      if (user && password.length > 3) {
        currentUser = user;
        isAuthenticated = true;
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 800);
  });
}

export function signUp(username: string, email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    if (!username || !email || !password) {
      reject(new Error("All fields are required"));
      return;
    }
    
    if (password.length < 6) {
      reject(new Error("Password must be at least 6 characters"));
      return;
    }

    setTimeout(() => {
      // Check if user already exists
      const existingUser = MOCK_USERS.find(user => user.email === email || user.username === username);
      if (existingUser) {
        reject(new Error("Username or email already exists"));
        return;
      }

      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
        followers: 0,
        following: 0,
      };

      MOCK_USERS.push(newUser);
      currentUser = newUser;
      isAuthenticated = true;
      resolve(newUser);
    }, 800);
  });
}

export function signOut(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      isAuthenticated = false;
      resolve();
    }, 300);
  });
}

export function getCurrentUser(): User | null {
  return currentUser;
}

export function getIsAuthenticated(): boolean {
  return isAuthenticated;
}
