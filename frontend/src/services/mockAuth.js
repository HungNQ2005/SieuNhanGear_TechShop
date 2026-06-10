// services/mockAuth.js

const users = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: "123456",
    name: "Administrator",
    role: "ADMIN",
  },
  {
    id: 2,
    email: "user@gmail.com",
    password: "123456",
    name: "Nguyen Van A",
    role: "CUSTOMER",
  },
];

export const login = (email, password) => {
  return users.find(
    (u) => u.email === email && u.password === password
  );
};