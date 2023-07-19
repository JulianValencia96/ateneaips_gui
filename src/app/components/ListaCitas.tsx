import { table } from "console";
import { Tangerine } from "next/font/google";
import { useEffect, useState } from "react";


interface Cita{
    _links:Record<string, {href:string}>
    fecha:string;
 
}

interface Medico{
    nombre:string
}

interface Paciente{
    nombre:string
}

const TablaCita=()=>{

    const [citas, setCitas] = useState<Cita[]>([])

    useEffect(
        ()=>{
            const fetchCitas = async()=>{
                try {
                    const response = await fetch("http://localhost:8080/citas")
                    const data = await response.json()
                    setCitas(data._embedded.citas)
                    console.log(citas)
                } catch (error) {
                    console.error(error)
                }
            };

            fetchCitas();
        },[])

        return(
            <table>
                <thead>
                    <tr>
                        <th>
                            Medico
                        </th>
                        <th>
                            Paciente
                        </th>

                        <th>
                            Fecha
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        citas.map((cita, index)=>(

                        
                    <tr key={index}>
                        <td>{cita._links.medico.href}</td>
                        <td>{cita._links.paciente.href}</td>
                        <td>{cita.fecha}</td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        )
}

export default TablaCita