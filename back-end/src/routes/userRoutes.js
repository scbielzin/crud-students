import { Router } from 'express';
import UserController from '../controllers/UserController.js';

import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();


//não deveria existir
//router.get('/', UserController.index); //listar usuários
//router.get('/:id', UserController.show); //mostrar usuário

router.post('/', UserController.store); //cria novo user
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;

/* 
index > lista todos os usuários > GET
store/crate > cria um novo usuário > POST
delete > apaga usuário > DELETE
show > mostra um usuário > GET
update > atualiza um usuário > PATCH ou PUT
*/