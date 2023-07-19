import { useEffect, useState } from "react";


interface Paciente{
    cedula:number;
    nombre:string;
    apellido:string;
    fechaNacimiento:string;
    telefono:string;
    _links: Record<string, {href:string}>
}

interface Medico{
    tarjetaProfesional:number;
    nombre:string;
    apellido:string;
    consultorio:string;
    correo:string;
    especialidad:string;
    _links: Record<string, {href:string}>
}

interface Cita{
    paciente:string;
    medico:string;
    fecha:string;

}

const CitaFormulario =()=>{
    const [pacientes, setPacientes] = useState<Paciente[]>([])
    const [medicos, setMedicos] = useState<Medico[]>([])

    useEffect(
        ()=>{
            const fetchMedicos = async()=>{
                try {
                    const response = await fetch("http://localhost:8080/medicos")
                    const data = await response.json()
                    setMedicos(data._embedded.medicos)
                } catch (error) {
                    console.error(error)
                }
            };

            fetchMedicos();
        },[])

        useEffect(
            ()=>{
                const fetchPacientes = async()=>{
                    try {
                        const response = await fetch("http://localhost:8080/pacientes")
                        const data = await response.json()
                        setPacientes(data._embedded.pacientes)
                    } catch (error) {
                        console.error(error)
                    }
                };
    
                fetchPacientes();
            },[])

            return(
                <div>
                    <form>

                    <select 
            name="medico"
            >
                <option value="">Seleccione una Medico</option>
                {
                medicos.map((medico, index)=>(
                <option key={index} value={medico._links.medico.href}>
                    {medico.nombre}
                </option>

                ))        

                }

            </select>

 
            <select 
            name="paciente"
            >
                <option value="">Seleccione un Paciente</option>
                {
                pacientes.map((paciente, index)=>(
                <option key={index} value={paciente._links.paciente.href}>
                    {paciente.nombre}
                </option>

                ))        

                }

            </select>
           
          

                        <input type="date" 
                        name="fecha"
                        placeholder="Fecha"/>

                        <button type="submit">Guardar</button>
                    </form>
                </div>
            )


}

export default CitaFormulario