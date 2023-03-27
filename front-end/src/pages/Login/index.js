import React from "react";
import {toast} from 'react-toastify'
import { isEmail } from 'validator';
import { useDispatch, useSelector } from "react-redux";
import {get} from 'lodash';

import { Container } from "../../styles/GlobalStyles";
import {Form} from './styled'
import * as actions from '../../store/modules/auth/actions'

import Loading from "../../components/Loading";

export default function Login(props) {
    const dispatch = useDispatch();

    const prevPath = get(props, 'location.state.prevPath', '/'); //pega pagina que o user estava antes do login

    const isLoading = useSelector(state => state.auth.isLoading)

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = e => {
        e.preventDefault();
        let formErrors = false;

        if(!isEmail(email)) {
            formErrors = true;
            toast.error('This is not an e-mail!');
        }

        if(password.length < 6 || password.length > 50) {
            formErrors = true;
            toast.error('Password must have between 6 and 50 characters!');
        }

        if(formErrors) return;

        dispatch(actions.loginRequest({email, password, prevPath}));
    }

    return (
    <>
        <Container>
            <h1>Login</h1>

            <Loading isLoading={isLoading}/>

            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)}/>

                <button type="submit">Login</button>
            </Form>
        </Container>

    </>
    )
}