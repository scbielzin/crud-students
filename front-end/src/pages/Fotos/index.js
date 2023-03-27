import React from "react";
import {get} from 'lodash'
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import {toast} from 'react-toastify';

import {Container} from '../../styles/GlobalStyles'
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions'
import axios from '../../services/axios';
import history from '../../services/history';

import {Title, Form} from './styled'

import {FaPlus} from 'react-icons/fa'


export default function Fotos({ match }) {
    const dispatch = useDispatch();
    const id = get(match, 'params.id', '')

    const [isLoading, setIsLoading] = React.useState(false);
    const [foto, setFoto] = React.useState('');

    React.useEffect(() => {
        const getData = async() => {
            try {
                setIsLoading(true);
                const {data} = await axios.get(`/alunos/${id}`);
                setFoto(get(data, 'Fotos[0].url', ''))
                setIsLoading(false);
            } catch(err) {
                setIsLoading(true);
                toast.error('Error to get the image.')
                setIsLoading(true);
                history.push("/")
            }
        }

        
        getData();
    }, [id]);

    const handleChange = async e => {
        const file = e.target.files[0];
        const fotoURL = URL.createObjectURL(file);

        setFoto(fotoURL);

        const formData = new FormData();

        formData.append('aluno_id', id);
        formData.append('foto', file);

        try {
            setIsLoading(true);
            await axios.post('/fotos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            toast.success("Sucessful!")
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            const {status} = get(err, 'response', '');

            toast.error('Error to send the photo.')

            if(status === 401) dispatch(actions.loginFailure());
        }
    }


    return(
        <Container>
            <Loading isLoading={isLoading}/>
            <Title>Fotos</Title>

            <Form>
                <label htmlFor="foto">
                    {foto ? <img src={foto} alt="Foto"/> : <FaPlus size="30px"></FaPlus>}
                    <input type="file" id="foto" onChange={handleChange}></input>
                </label> 
            </Form>
        </Container>
    )
}

Fotos.propTypes = {
    match: PropTypes.shape({}).isRequired
}