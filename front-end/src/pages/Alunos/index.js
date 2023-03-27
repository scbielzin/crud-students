import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { get } from 'lodash'
import { FaUserCircle, FaEdit, FaWindowClose, FaCheck } from 'react-icons/fa'

import { Container } from "../../styles/GlobalStyles";
import { AlunoContainer, ProfilePicture, NovoAluno } from "./styled";

import {props} from 'prop-types'

import axios from "../../services/axios";

import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default function Alunos() {

    const [alunos, setAlunos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const correto = false;

    React.useEffect(() => {
        async function getData() {  
            setIsLoading(true);
            const response = await axios.get('/alunos')
            setAlunos(response.data);
            setIsLoading(false);
        }

        getData();
    }, []);

    const handleDeleteAsk = e => {
        e.preventDefault();

        const exclamation = e.currentTarget.nextSibling; //current target é o link, next sibling proximo irmão
            exclamation.setAttribute('display', 'block');
            e.currentTarget.remove();
    }

    const handleDelete = async (e, id, index) => {
        e.persist();
        try {
            setIsLoading(true);
            await axios.delete(`/alunos/${id}`)
            const novosAlunos = [...alunos];

            novosAlunos.splice(index, 1);

            setAlunos(novosAlunos);

            setIsLoading(false)
        
        } catch(err) {
            const errors = get(err, 'response.data.errors', []);
            errors.map(err => toast.error(err))
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <h1>Students</h1>
            <Loading isLoading={isLoading}/>

            <NovoAluno to="/aluno/">New student</NovoAluno>

            <AlunoContainer>
                {alunos.map((aluno, index) => (
                    <div key={String(aluno.id)}>
                        {get(aluno, 'Fotos[0].url', false) ? (
                            <ProfilePicture>
                                <img crossorigin="anonymous" src={aluno.Fotos[0].url} alt=""/>
                            </ProfilePicture>
                        ) : (
                            <FaUserCircle size={36}/>
                        )}
                        
                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>

                        
                        <Link to={`/aluno/${aluno.id}/edit`}><FaEdit size={16}/></Link>
                        <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}><FaWindowClose size={16}/></Link>  

                        <FaCheck 
                        size={16} 
                        display="none" 
                        cursor="pointer"
                        onClick={e => handleDelete(e, aluno.id, index)}
                        />
                    </div>
                ))}
            </AlunoContainer>
        </Container>
    )
}

