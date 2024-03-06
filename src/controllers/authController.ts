import { Request, Response } from "express";
import validator from "validator";
import model from "../models/authModelo";

class AuthController {
    public async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // verificar que los datos no esten vacios
            if (
                validator.isEmpty(email.trim()) ||
                validator.isEmpty(password.trim())
            ) {
                const lstUsers = await model.getuserByEmail(email);
                if (lstUsers.length <= 0) {
                    return res
                        .status(404)
                        .json({
                            message: "El usuario y/o contraseña es incorrecto",
                            code: 1,
                        });
                }
                return res.json({ message: "Autenticación correcta", code: 0 });
            }

            return res.json({ message: "Autenticación correcta", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    //Desafio ADD
    public async addUsuario(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            // Verificar que el email no esté vacío y sea válido
            if (!validator.isEmail(email)) {
                return res
                    .status(400)
                    .json({ message: "El email proporcionado no es válido", code: 1 });
            }

            // Verificar si ya existe un usuario con el mismo email
            const existingUser = await model.getuserByEmail(email);
            if (existingUser.length > 0) {
                return res
                    .status(400)
                    .json({ message: "Ya existe un usuario con este email", code: 1 });
            }

            return res.json({ message: "Usuario agregado correctamenting", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    

}

export const authController = new AuthController();
