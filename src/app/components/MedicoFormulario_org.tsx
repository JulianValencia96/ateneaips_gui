import { useEffect, useState } from "react";


interface Especialidad {
    nombre:string;
    id_especialidad:number;
    _links: Record<string, {href:string}> //Link para la relacion
}

interface Medico{
    tarjetaProfesional:number;
    nombre:string;
    apellido:string;
    consultorio:string;
    correo:string;
    especialidad:string;
}

const MedicoFormulario =()=>{

    const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
    const [submitted, setSubmitted] = useState(false)
    const handleSubmit= async(e:any)=>{

        e.preventDefault()

        const miMedico:Medico = {
            tarjetaProfesional:e.target.tarjetaProfesional.value,
            nombre:e.target.nombre.value,
            apellido:e.target.apellido.value,
            consultorio:e.target.consultorio.value,
            correo:e.target.correo.value,
            especialidad:e.target.especialidad.value

        }

        console.log(miMedico)

        try {

            let response = await fetch("http://localhost:8080/medicos", {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(miMedico)
            })
            
            let data:any =await response.json()

            console.log(data)
            console.log(miMedico.especialidad)

            //Guardar el programa usando PUT
            response = await fetch(data._links.especialidad.href, {
                method:"PUT",
                headers:{
                    "Content-type":"text/uri-list"
                },
                body:JSON.stringify(miMedico.especialidad)
            })

             data =await response.json()

             console.log(data)

            e.target.reset()

            setSubmitted(true)
            setTimeout(()=>{
                setSubmitted(false), 3000})
            
        } catch (error) {
            console.error(error)
            
        }
    }

    useEffect(
        ()=>{
            const fetchEspecialidades = async()=>{
                try {
                    const response = await fetch("http://localhost:8080/especialidades")
                    const data = await response.json()
                    setEspecialidades(data._embedded.especialidades)
                } catch (error) {
                    console.error(error)
                }
            };

            fetchEspecialidades();
        },[])

        //TO DO: Verificar mensaje

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" 
            name="nombre"
            placeholder="Nombre"/>
            <input type="text" 
            name="apellido"
            placeholder="Apellido"/>
            <input type="email" 
            name="correo"
            placeholder="Correo"/>
            <input type="text" 
            name="consultorio"
            placeholder="Consultorio"/>
            <input type="text" 
            name="tarjetaProfesional"
            placeholder="Tarjeta Profesional"/>
            
            <select 
            name="especialidad"
            >
                <option value="">Seleccione una Especialidad</option>
                {
                especialidades.map((especialidad, index)=>(
                <option key={index} value={especialidad._links.especialidad.href}>
                    {especialidad.nombre}
                </option>

                ))        

                }

            </select>

            <button type="submit">Guardar</button>
            {
                submitted && <div className="success-message">Se registró el Medico exitosamente</div>
            }
            
                
        </form>
    )
}

export default MedicoFormulario