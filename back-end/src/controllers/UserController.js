import User from '../models/User.js'

class UserController {
    async store(req, res) { //cria usuário
        try {
            const novoUser = await User.create(req.body);
            const { id, nome, email} = novoUser;
            return res.json({ id, nome, email});
        } catch(e) {
            return res.status(400).json({errors: e.errors.map((err) => err.message)});
        }
    }

    //Index

    async index(req, res) {
        try{
            const users = await User.findAll({ attributes: ['id', 'nome', 'email', 'instagram'] });
            return res.json(users);
        }catch(e){
            return res.json(null);
        }
    }

    //Show

    async show(req, res) {
        try{
            const user = await User.findByPk(req.params.id);

            const { id, nome, email, instagram } = user
            return res.json({ id, nome, email, instagram });
        }catch(e){
            return res.json(null);
        }
    }

    //Update

    async update(req, res) {
        try{
            
            const user = await User.findByPk(req.userId);

            if(!user) {
                return res.status(400).json({
                    errors: ['Usuário não existe.'],
                });
            }

            const novosDados = await user.update(req.body);
            const { id, nome, email, instagram } = novosDados

            return res.json({ id, nome, email, instagram });
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    //Delete

    async delete(req, res) {

        const user = await User.findByPk(req.userId);

        try{
            if(!req.params.id) {
                return res.status(400).json({
                    errors: ['ID não enviado.'],
                });
            }


            if(!user) {
                return res.status(400).json({
                    errors: ['Usuário não existe.'],
                });
            }

            await user.destroy();

            return res.json(null);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
}

export default new UserController();