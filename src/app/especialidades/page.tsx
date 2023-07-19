"use client"

//Importaciones

import { useState, useEffect} from 'react';
import ListarEspecialidades from '../components/ListarEspecialidades';
import PlusIcon from '../components/AddEspecialidades';

//Definir los campos de la especialidad cuando hagan una peticion esta "ruta"

export default function PaginaEspecialidad(){

//Rescatar los datos de los estudiantes desde la API
const [especialidades, setEspecialidades]=useState([])

useEffect(
    ()=>{

        const fetchespecialidades = async()=>{

            try{

                const response = await fetch(`http://localhost:8080/especialidades`)
                if(!response.ok){
                    throw new Error("No pude rescatar estudiantes")
                    
                }

                const data = await response.json()

                setEspecialidades(data._embedded.especialidades)
            }catch(error){
                console.error(error)

            }
        }

        fetchespecialidades()
    }
)

//Llamar al componente StudentTable

return(
    <div className='container'>
        <h1>Listado de Especialidades</h1>
        <ListarEspecialidades especialidades={especialidades}/>
        <PlusIcon></PlusIcon>
    </div>
)

}