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
exports.usuarioController = void 0;
const validator_1 = __importDefault(require("validator"));
const usuarioModel_1 = __importDefault(require("../models/usuarioModel"));
const connection_1 = __importDefault(require("../config/connection"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("SELECT * FROM tbl_usuario");
                }));
                res.json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = req.body;
            try {
                if (validator_1.default.isEmpty(email.trim()) || validator_1.default.isEmpty(password.trim()) || validator_1.default.isEmpty(role.trim())) {
                    return res.status(400).json({ message: "Todos los campos son requeridos" });
                }
                if (!validator_1.default.isEmail(req.body.email)) {
                    return res.status(400).json({ message: "Correo electrónico no válido" });
                }
                if (!req.body.password) {
                    return res.status(400).json({ message: "la contraseña debe ser llenada" });
                }
                if (!req.body.role) {
                    return res.status(400).json({ message: "El role es requerido" });
                }
                const encryptedText = yield utils_1.utils.hashPassword(req.body.password);
                if (!encryptedText) {
                    return res.status(500).json({ message: "Error al cifrar la contraseña" });
                }
                req.body.password = encryptedText;
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query('INSERT INTO tbl_usuario SET ?', req.body);
                }));
                res.json({ text: "Usuario agregado" });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = req.body;
            const updateUser = req.body;
            try {
                if (req.body.email && !validator_1.default.isEmail(req.body.email)) {
                    return res.status(400).json({ message: "Correo electrónico no válido" });
                }
                if (validator_1.default.isEmpty(email.trim()) || validator_1.default.isEmpty(password.trim()) || validator_1.default.isEmpty(role.trim())) {
                    return res.status(400).json({ message: "Todos los campos son requeridos" });
                }
                if (!req.body.role) {
                    return res.status(400).json({ message: "El campo 'rol' es obligatorio" });
                }
                const existingUser = yield usuarioModel_1.default.findByEmail(email);
                if (existingUser.length === 0) {
                    return res.status(404).json({ message: "El usuario no existe", code: 1 });
                }
                if (req.body.usuario && req.body.usuario.password) {
                    var encryptedText = yield utils_1.utils.hashPassword(req.body.password);
                    req.body.password = encryptedText;
                }
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("UPDATE tbl_usuario SET ? WHERE email = ?", [updateUser, email]);
                }));
                res.json({ text: "Usuario con el " + email + " ha sido actualizado" });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                console.log('Email:', email);
                if (!validator_1.default.isEmail(email)) {
                    return res.status(400).json({ message: "Correo electrónico no válido" });
                }
                const connection = yield connection_1.default;
                const userExists = yield connection.query('SELECT * FROM tbl_usuario WHERE email = ?', [email]);
                if (userExists.length === 0) {
                    return res.status(404).json({ message: "Usuario con el correo " + email + " no encontrado" });
                }
                // Proceed with the deletion
                const result = yield connection.query('DELETE FROM tbl_usuario WHERE email = ?', [email]);
                return res.json({ text: "Usuario con el correo " + email + " ha sido eliminado" });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=usuarioController.js.map