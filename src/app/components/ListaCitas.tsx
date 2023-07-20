import { table } from "console";
import { Tangerine } from "next/font/google";
import { useEffect, useState } from "react";


interface Cita{
    fecha: string | null;
    medico: Medico;
    paciente: Paciente;
 
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

                    //Codigo base - entregable_frontEnd

                    const citaData = [];
                    for (const cita of data._embedded.citas) {
                      const medicoResponse = await fetch(cita._links.medico.href);
                      if (!medicoResponse.ok) {
                        continue
                      }
                      
                      
                      const medicoData = await medicoResponse.json();
            
                      console.log(medicoData);
            
                      const pacienteResponse = await fetch(cita._links.paciente.href);
                      const pacienteData = await pacienteResponse.json();
                      
            
                      citaData.push({
                        medico: medicoData,
                        paciente: pacienteData,
                        fecha: cita.fecha,
                      });
                    }
            
                    setCitas(citaData);
            




                    //####################################

                    /*setCitas(data._embedded.citas)
                    console.log(citas) */
                } catch (error) {
                    console.error('Error fetching data:', error);
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
                        <td>{cita.medico.nombre}</td>
                        <td>{cita.paciente.nombre}</td>
                        <td>{cita.fecha}</td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        )
}

export default TablaCita