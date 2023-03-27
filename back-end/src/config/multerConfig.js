//guardar arquivos

import multer from 'multer';
import {extname, resolve} from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000)
//retorna um valor entre 10.000 e 20.000
export default {
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new multer.MulterError('This file is not a image!'));
        }
        return cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => { //seta pagina de uploads
            cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'))
        },
        filename: (req, file, cb) => { //renomeia o arquivo do usuário para melhor espaço e organização
            cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`) //agora se chama a data de agora + extensão correta
        }
        //o aleatório entra pela minima chance de usuários
        //enviarem fotos ao mesmo tempo
    })
};