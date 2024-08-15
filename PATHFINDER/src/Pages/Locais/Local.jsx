import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Local () {


    function handleRegisterClick(){
        navigate('/cadastroLocal');
    }
    return(
        <div>
         
         <button type="button" className="button" onClick={handleRegisterClick}>Cadastrar Local</button>


        </div>
    )
}
export default Local; 