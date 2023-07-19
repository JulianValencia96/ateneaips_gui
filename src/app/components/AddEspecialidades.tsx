//Importaciones

import { Fira_Mono } from "next/font/google"
import { useState } from "react"

//Crear la funcion

const PlusIcon = ()=>{
    //Manejo de eventos
    const [abierto, setAbierto] = useState(false)

    const [datosFormulario, setDatosFormulario] = useState(
        {
            "nombre":""
        }
    )
    //Estructura JSX del componente

    const clickIcon =()=>{
        setAbierto(!abierto)
    }

    const cambiarValor = (e:any)=>{
        setDatosFormulario(
            {
                ...datosFormulario,
                [e.target.name]:e.target.value
            }
        )
    }

    const procesarFormulario= async(e:any)=>{
        e.preventDefault()

        //Manejar el formulario

        try{
            const response = await fetch("http://localhost:8080/especialidades",
            {
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(datosFormulario)
            }
            )

            if(!response.ok){
                throw new Error('No se pudo guardar')
            }

            setAbierto(false)
        }catch(error){

        }
    }

    return(
        <div>
            <div onClick ={clickIcon} >
            <span>+</span>
            </div>

            {abierto &&(
                <form onSubmit={procesarFormulario}>
                    <input type="text" name="nombre" placeholder="Nombre Especialidad" onChange={cambiarValor}/>
                    <button type="submit"> Guardar</button>
                </form>
            )}
        </div>
    )
}

export default PlusIcon