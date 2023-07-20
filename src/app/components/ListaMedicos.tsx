import { table } from "console";
import { Tangerine } from "next/font/google";
import { useEffect, useState } from "react";


interface Medico{
    
    apellido:string;
    consultorio:string;
    correo:string;
    nombre:string;
    especialidad_id:string;
 
}


const TablaMedico=()=>{

    const [medicos, setMedicos] = useState<Medico[]>([])

    useEffect(
        ()=>{
            const fetchMedicos = async()=>{
                try {
                    const response = await fetch("http://localhost:8080/medicos")
                    const data = await response.json()

                    //Codigo base - entregable_frontEnd

                    const medicoData = []; 
                    for (const medico of data._embedded.medicos) {
             
                      medicoData.push({
                        
                        apellido: medico.apellido,
                        consultorio: medico.consultorio,
                        fechaNacimiento: medico.fechaNacimiento, 
                        nombre: medico.nombre,
                        correo: medico.correo,
                        especialidad_id: medico.especialidad_id
                      });
                    }
            
                    setMedicos(medicoData);
            




                    //####################################

                    /*setMedicos(data._embedded.medicos)
                    console.log(medicos) */
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchMedicos();
        },[])

        return(
            <table>
                <thead>
                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Apellido
                        </th>

                        <th>
                            Consultorio
                        </th>
                        <th>
                            Correo
                        </th>
                        <th>
                            Especialidad
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        medicos.map((medico, index)=>(

                        
                    <tr key={index}>
                        <td>{medico.nombre}</td>
                        <td>{medico.apellido}</td>
                        <td>{medico.consultorio}</td>
                        <td>{medico.correo}</td>
                        <td>{medico.especialidad_id}</td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        )
}

export default TablaMedico