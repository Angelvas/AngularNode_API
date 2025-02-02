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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuario_models_1 = require("./usuario-models");
const connection_1 = __importDefault(require("../db/connection"));
// Rutas API
const preguntas_1 = __importDefault(require("../routes/preguntas"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const preguntas_usuario_1 = __importDefault(require("../routes/preguntas_usuario"));
const roles_1 = __importDefault(require("../routes/roles"));
class Server {
    constructor() {
        console.log('Estoy en el constructor');
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnectValidate();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('App corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/users', usuario_1.default);
        this.app.use('/api/preguntas', preguntas_1.default);
        this.app.use('/api/preguntasusuario', preguntas_usuario_1.default);
        this.app.use('/api/roles', roles_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        //Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield usuario_models_1.User.sync();
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
    dbConnectValidate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
