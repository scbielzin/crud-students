import multer from 'multer';
import multerConfig from '../config/multerConfig.js';

import Foto from '../models/Foto.js';

const upload = multer(multerConfig).single('foto');

class FotoController {
    async store(req, res) {
        return upload(req, res, async (err) => {
            if(err) {
                return res.status(400).json({
                    errors: [err.code],
                })
            }

            try {
                const { originalname, filename } = req.file;
                const {aluno_id} = req.body;
                const foto = await Foto.create({originalname, filename, aluno_id})

                return res.json(foto);
            } catch(e) {
                return res.status(400).json({
                    errors: ['Aluno não existe!'],
                });
            }
        });
    }
}

export default new FotoController();