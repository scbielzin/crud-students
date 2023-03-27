import React, {useState} from "react";
import { toast } from 'react-toastify'
import { isEmail } from 'validator';
import { useSelector, useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";

import Loading from "../../components/Loading";
import * as actions from '../../store/modules/auth/actions'

export default function Register() {
    const dispatch = useDispatch();
    const id = useSelector(state => state.auth.user.id);
    const nomeStored = useSelector(state => state.auth.user.nome)
    const emailStored = useSelector(state => state.auth.user.email)
    const instagramStored = useSelector(state => state.auth.user.instagram)
    const nascimentoStored = useSelector(state => state.auth.user.nascimento)
    const telefoneStored = useSelector(state => state.auth.user.telefone)

    const isLoading = useSelector(state => state.auth.isLoading)

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [instagram, setInstagram] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');

    React.useEffect(() => {
        if(!id) return;

        setNome(nomeStored);
        setEmail(emailStored);
        setInstagram(instagramStored);
        setNascimento(nascimentoStored);
        setTelefone(telefoneStored);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        let formErrors = false;

        if(nome.length < 3 || nome.length > 255) {
            formErrors = true;
            toast.error('Name must have between 3 and 255 characters!');
        }

        if(!isEmail(email)) {
            formErrors = true;
            toast.error('This is not an e-mail!');
        }

        if(!id && (password.length < 6 || password.length > 50)) {
            formErrors = true;
            toast.error('Password must have between 6 and 50 characters!');
        }

        if(formErrors) return;

        dispatch(actions.registerRequest({nome, email, password, instagram, nascimento, telefone, id}));

    }

    return (
    <>
        <Container>
            <Loading isLoading={isLoading}/>
            <h1>{id ? 'Edit profile' : 'Create your account'}</h1>

            <Form onSubmit={handleSubmit}>
                <label htmlFor="nome">
                    Name:
                    <input type="text" value={nome} placeholder="Your name"
                    onChange={e => setNome(e.target.value)}/>
                </label>

                <label htmlFor="email">
                    E-mail:
                    <input type="email" value={email} placeholder="Your e-mail"
                    onChange={e => setEmail(e.target.value)}/>
                </label>

                <label htmlFor="senha">
                    Password:
                    <input type="password" value={password} placeholder="Your password"
                    onChange={e => setPassword(e.target.value)}/>
                </label>

                <label htmlFor="instagram">
                    Instagram:
                    <input type="text" value={instagram} placeholder="Your instagram"
                    onChange={e => setInstagram(e.target.value)}/>
                </label>

                <label htmlFor="nascimento">
                    Born:
                    <input type="date" value={nascimento} placeholder="Your born"
                    onChange={e => setNascimento(e.target.value)}/>
                </label>

                <label htmlFor="telefone">
                    Phone Number:
                    <input type="text" value={telefone} placeholder="Your phonenumber"
                    onChange={e => setTelefone(e.target.value)}/>
                </label>
                <button type="submit">{id ? 'Save' : 'Create my account'}</button>
            </Form>
        </Container>

    </>
    )
}