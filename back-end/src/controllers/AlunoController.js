import Aluno from '../models/Aluno.js'
import Foto from '../models/Foto.js';

class AlunoController {
    async index(req, res) {
        const alunos = await Aluno.findAll({
            attributes: ["id", "nome", "instagram", "email", "nascimento", "telefone"],
            order: [['id', 'DESC'], [Foto, 'id', 'DESC']], //ver o recente usuário feito para o mais antigo
            include: {
                model: Foto,
                attributes: ['url', 'filename'],
            }
        });
        res.json(alunos)
    }

    async store(req, res) {
        try {
            const aluno = await Aluno.create(req.body);
        } catch(e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            if(!id) {
                return res.status(400).json({
                    errors: ['Missing ID!'] //faltando id
                })
            }

            const aluno = await Aluno.findByPk(id, {
                attributes: ["id", "nome", "instagram", "email", "nascimento", "telefone"],
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']], //ver o recente usuário feito para o mais antigo
                include: {
                    model: Foto,
                    attributes: ['url', 'filename'],
                }
            });

            if(!aluno) {
                return res.status(400).json({
                    errors: ["Aluno doesn't exist!"] //faltando aluno
                })
            }

            return res.json(aluno)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            if(!id) {
                return res.status(400).json({
                    errors: ['Missing ID!'] //faltando id
                })
            }

            const aluno = await Aluno.findByPk(id);

            if(!aluno) {
                return res.status(400).json({
                    errors: ["Aluno doesn't exist!"] //faltando aluno
                })
            }

            await aluno.destroy();
            return res.json('Deleted with sucessful!')
        } catch(e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            if(!id) {
                return res.status(400).json({
                    errors: ['Missing ID!'] //faltando id
                })
            }

            const aluno = await Aluno.findByPk(id);

            if(!aluno) {
                return res.status(400).json({
                    errors: ["Aluno doesn't exist!"] //faltando aluno
                })
            }

            const novoAluno = await aluno.update(req.body);

            return res.json(novoAluno)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            })
        }
    }

}

export default new AlunoController();