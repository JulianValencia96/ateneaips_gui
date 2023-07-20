import { useEffect, useState } from "react";


interface Paciente{
    cedula:number;
    apellido:string;
    fechaNacimiento:string;
    nombre:string;
    telefono:string;
}

const PacienteFormulario =()=>{

    const [pacientes, setPacientes] = useState<Paciente[]>([])
    const [submitted, setSubmitted] = useState(false)
    const handleSubmit= async(e:any)=>{

        e.preventDefault()

        const miPaciente:Paciente = {
            cedula:e.target.cedula.value,
            apellido:e.target.apellido.value,
            fechaNacimiento:e.target.fechaNacimiento.value,
            nombre:e.target.nombre.value,
            telefono:e.target.telefono.value
        }

        console.log(miPaciente)

        try {

            const response = await fetch("http://localhost:8080/pacientes", {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(miPaciente)
            })
            
            if (response.ok) {
                //Clear the form
                e.target.reset();
        
                //Disable the submit button
                e.target.disabled = true;
        
                setSubmitted(true); // Set the submitted state to true
                setTimeout(() => {
                  setSubmitted(false); // Reset the submitted state after 3 seconds
                  //Redirect to the list of counselings
                  window.location.href = "/pacientes/listar";          
                }, 2000);
              }
            
        } catch (error) {
            console.error(error)
            
        }
    }


        //TO DO: Verificar mensaje

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" 
            name="cedula"
            placeholder="Cedula"/>
            <input type="text" 
            name="nombre"
            placeholder="Nombre"/>
            <input type="text" 
            name="apellido"
            placeholder="Apellido"/>
            <input type="date" 
            name="fechaNacimiento"
            placeholder="Fecha de nacimiento"/>
            <input type="text" 
            name="telefono"
            placeholder="Telefono"/>
            

            <button type="submit">Guardar</button>
            {
                submitted && <div className="success-message">Se registró el Paciente exitosamente</div>
            }
            
                
        </form>
    )
}

export default PacienteFormulario