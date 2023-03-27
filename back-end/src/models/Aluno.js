import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Nome precisa ter entre 3 e 255 letras.'
                    }
                }
            },
            instagram: {
                type: Sequelize.STRING,
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Nome precisa ter entre 3 e 255 letras.'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: {
                        msg: 'E-mail inválido.'
                    }
                }
            },
            nascimento: {
                type: Sequelize.DATE,
                defaultValue: '',
                validate: {
                    isDate: {
                        msg: 'Data inválida!'
                    }
                }
            },
            telefone: {
                type: Sequelize.STRING,
            },
        }, {
            sequelize,
            modelName: "Aluno",
        });
        return this;
    }

    static associate(models) {
        this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
    }
}