import React, {useState, useEffect} from "react";
import axios from "../../services/axios";
import history from "../../services/history";
import { useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions'
import {Link} from 'react-router-dom'

import { get } from 'lodash';
import PropTypes from 'prop-types'
import { isEmail } from 'validator';

import {Form, ProfilePicture, Title} from './styled';
import { Container } from "../../styles/GlobalStyles";
import {toast} from 'react-toastify'
import {FaEdit, FaUserCircle} from 'react-icons/fa'
import Loading from '../../components/Loading'

export default function Aluno({match}) {
    const dispatch = useDispatch();

    const id = get(match, 'params.id', '');
    const [nome, setNome] = useState('');
    const [instagram, setInstagram] = useState('');
    const [email, setEmail] = useState('');
    const [nascimento, setNascimento] = useState(new Date());
    const [telefone, setTelefone] = useState('');
    const [foto, setFoto] = useState('');
    const [isLoading, setisLoading] = useState('');

    React.useEffect(() => {
        if(!id) return;
        
        async function getData() {
            try {
                setisLoading(true);
                const {data} = await axios.get(`/alunos/${id}`);
                const Foto = get(data, 'Fotos[0].url', '');

                setFoto(Foto);

                setNome(data.nome);
                setEmail(data.email);
                setInstagram(data.instagram);
                setNascimento(data.nascimento);
                setTelefone(data.telefone);

                setisLoading(false);
            } catch(err) {
                setisLoading(false);
                const status = get(err, 'response.status', 0);
                const errors = get(err, 'response.errors', []);

                if(status == 400) {
                    errors.map(error => toast.error(errors))
                    history.push('/')
                }
            }
        }

        getData();
    }, [id, history]);

    const handleSubmit = async e => {
        e.preventDefault();
        let formErrors = false;

        if(nome.length < 3 || nome.length > 255) {
            toast.error("The name needs to be between 3 and 255 characters.")
            formErrors = true;
        }

        if(instagram.length < 3 || instagram.length > 255) {
            toast.error("The instagram needs to be between 3 and 80 characters.")
            formErrors = true;
        }

        if(!isEmail(email)) {
            toast.error("This isn't an e-mail")
            formErrors = true;
        }

        if(telefone.length < 8 || telefone.length > 12) {
            toast.error("The telephone needs to be between 8 and 12 characters.")
            formErrors = true;
        }

        if(formErrors) return;

        try {

            setisLoading(true);

            if(id) {
                //editando

                await axios.put(`/alunos/${id}`, {
                    nome,
                    email,
                    instagram,
                    nascimento,
                    telefone,
                });

                toast.success("Student was edited with sucessful!");
            } else {
                //criando

                const {data} = await axios.post(`/alunos/`, {
                    nome,
                    email,
                    instagram,
                    nascimento,
                    telefone,
                });

                toast.success("Student was created with sucessful!");
            }

            setisLoading(false);

        } catch(err) {
            const status = get(err, 'response.status', 0)
            const data = get(err, 'response.data', {});
            const errors = get(data, 'errors', []);

            if (errors.length > 0) {
                errors.map(error => toast.error(error));
            } else {
                toast.error('Unknown Error!') //erro desconhecido
            }

            if(status === 401) dispatch(actions.loginFailure())
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading}/>
            <Title>{id ? 'Edit student' : 'Create a student'}</Title>

            {id && (
                <ProfilePicture>
                    {foto ? (
                        <img src={foto} alt={nome}></img>
                    ) : (
                        <FaUserCircle size={180}></FaUserCircle>
                    )}
                    <Link to={`/fotos/${id}`}>
                        <FaEdit size="24px"></FaEdit>
                    </Link>

                </ProfilePicture>
            )}

            <Form onSubmit={handleSubmit}>

                <input type="text" value={nome} 
                onChange={e => setNome(e.target.value)} 
                placeholder="Your name"/>

                <input type="email" value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Your email"/>

                <input type="text" value={instagram} 
                onChange={e => setInstagram(e.target.value)} 
                placeholder="Your instagram"/>

                <input type="date" value={nascimento} 
                onChange={e => setNascimento(e.target.value)} 
                placeholder="Your birth"/>

                <input type="text" value={telefone} 
                onChange={e => setTelefone(e.target.value)} 
                placeholder="Your cellphone number"/>
                
                <button type="submit">Send</button>
            </Form>
        </Container>
    );
}

Aluno.propTypes = {
    match: PropTypes.shape({}).isRequired,
}