import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import delay from 'express-delay';
import homeRoutes from './src/routes/homeRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import tokenRoutes from './src/routes/tokenRoutes.js'
import alunoRoutes from './src/routes/alunoRoutes.js'
import fotoRoutes from './src/routes/fotoRoutes.js'
import {resolve} from 'path'

import cors from 'cors';

import './src/database/index.js'
import helmet from 'helmet';


class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(delay(2000));
        this.app.use(express.urlencoded({ extended:true }));
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, 'uploads')));
    }

    routes() {
        this.app.use('/', homeRoutes)
        this.app.use('/users/', userRoutes)
        this.app.use('/tokens/', tokenRoutes)
        this.app.use('/alunos/', alunoRoutes)
        this.app.use('/fotos/', fotoRoutes)
    }
}

export default new App().app;
