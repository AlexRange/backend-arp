"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const validator_1 = __importDefault(require("validator"));
const authModelo_1 = __importDefault(require("../models/authModelo"));
class AuthController {
    iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // verificar que los datos no esten vacios
                if (validator_1.default.isEmpty(email.trim()) ||
                    validator_1.default.isEmpty(password.trim())) {
                    const lstUsers = yield authModelo_1.default.getuserByEmail(email);
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
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    //Desafio ADD
    addUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Verificar que el email no esté vacío y sea válido
                if (!validator_1.default.isEmail(email)) {
                    return res
                        .status(400)
                        .json({ message: "El email proporcionado no es válido", code: 1 });
                }
                // Verificar si ya existe un usuario con el mismo email
                const existingUser = yield authModelo_1.default.getuserByEmail(email);
                if (existingUser.length > 0) {
                    return res
                        .status(400)
                        .json({ message: "Ya existe un usuario con este email", code: 1 });
                }
                return res.json({ message: "Usuario agregado correctamenting", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map