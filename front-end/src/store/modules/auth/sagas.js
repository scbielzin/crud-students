import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {get} from 'lodash'
import * as actions from './actions'
import * as types from '../types'
import axios from '../../../services/axios'

function* loginRequest({ payload }) {
    try {
        const response = yield call(axios.post, '/tokens', payload);
        yield put(actions.loginSucess({...response.data}));

        toast.success('You are logged!');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    } catch (e) {
        toast.error('Invalid user or password!')

        yield put(actions.loginFailure());
    }
}

function persistRehydrate({payload}) {
    const token = get(payload, 'auth.token', '');
    if(!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
    const {id, nome, email, password, instagram, nascimento, telefone} = payload;

    try {
        if(id) {
            yield call(axios.put, '/users', {
                nome,
                email,
                password: password || undefined,
                instagram,
                nascimento,
                telefone
            });
            toast.success("User updated with sucessful!");
            yield put(actions.registerUpdatedSuccess({ nome, email, password, instagram, nascimento, telefone }));
        } else {
            yield call(axios.post, '/users', {
                nome,
                email,
                password: password,
                instagram,
                nascimento,
                telefone
            });
            toast.success("User created with sucessful!");
            yield put(actions.registerCreatedSuccess({ nome, email, password, instagram, nascimento, telefone }));

        }
    } catch (e) {
        const errors = get(e, 'response.data.errors', []);
        const status = get(e, 'response.status', 0);

        if(status === 401) { //Mudou o e-mail ou senha desloga
            toast.error('You need to Log in again!');
            yield put(actions.loginFailure()); //Garantir o deslog

        }

        if (errors.length > 0) {
            errors.map(error => toast.error(error));
        } else {
            toast.error('Erro desconhecido');
        }

        yield put(actions.registerFailure());
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest)
]);


