import Sequelize, { Model } from 'Sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Campo nome não pode estar vázio!'
                    },
                    len: {
                        args: [3, 255],
                        msg: 'Campo nome deve ter de 3 até 255 letras.'
                    }
                }
            },
            instagram: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    isEmail: {
                        msg: "Isto não é um e-mail válido!"
                    }
                }
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],
                        msg: "A senha deve ter de 6 até 50 letras."
                    }
                }
            },
            nascimento: Sequelize.DATE,
            telefone: Sequelize.STRING,
        }, {
            sequelize,
        });

        this.addHook('beforeSave', async user => {
            if(user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        })
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash)
    }
}