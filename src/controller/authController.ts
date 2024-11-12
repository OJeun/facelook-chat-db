
import { Request, Response } from 'express';
import { loginUser, registerUser } from '../service/authService';

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const user = await registerUser(name, email, password);
  return res.status(201).json({ message: 'User registered successfully', user });
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const token = await loginUser(username, password);
  return res.json({ message: 'Login successful', token });
}
