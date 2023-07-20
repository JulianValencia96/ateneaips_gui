import { useEffect, useState } from "react";


interface Especialidad{
    nombre:string;
}

const EspecialidadFormulario =()=>{

    const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
    const [submitted, setSubmitted] = useState(false)
    const handleSubmit= async(e:any)=>{

        e.preventDefault()

        const miEspecialidad:Especialidad = {
            nombre:e.target.nombre.value
           
        }

        console.log(miEspecialidad)

        try {

            const response = await fetch("http://localhost:8080/especialidades", {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(miEspecialidad)
            });

            const data = await response.json();
            console.log(data);


            if (response.ok) {
                //Clear the form
                e.target.reset();
        
                //Disable the submit button
                e.target.disabled = true;
        
                setSubmitted(true); // Set the submitted state to true
                setTimeout(() => {
                  setSubmitted(false); // Reset the submitted state after 3 seconds
                  //Redirect to the list of counselings
                  window.location.href = "/especialidades/listar";          
                }, 2000);
              }
            
            
            e.target.reset()

            setSubmitted(true)
            setTimeout(()=>{
                setSubmitted(false), 3000})
            
        } catch (error) {
            console.error(error)
            
        }
    }


        //TO DO: Verificar mensaje

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" 
            name="nombre"
            placeholder="Nombre Especialidad"/>

            <button type="submit">Guardar</button>
            {
                submitted && <div className="success-message">Se registró el Especialidad exitosamente</div>
            }
            
                
        </form>
    )
}

export default EspecialidadFormulario