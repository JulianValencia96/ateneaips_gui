import { table } from "console";
import { Tangerine } from "next/font/google";
import { useEffect, useState } from "react";


interface Paciente{
    cedula:number;
    apellido:string;
    fechaNacimiento:string;
    nombre:string;
    telefono:string;
}


const TablaPaciente=()=>{

    const [pacientes, setPacientes] = useState<Paciente[]>([])

    useEffect(
        ()=>{
            const fetchPacientes = async()=>{
                try {
                    const response = await fetch("http://localhost:8080/pacientes")
                    const data = await response.json()

                    //Codigo base - entregable_frontEnd

                    const pacienteData:any = [];
                    //Error: Variable 'pacienteData' implicitly has type 'any[]' in some locations where its type cannot be determined.ts(7034)
                    //Solucion: definir pacienteData como any
                    for (const paciente of data._embedded.pacientes) {
                      
                      pacienteData.push({
                        cedula: paciente.cedula,
                        apellido: paciente.apellido,
                        fechaNacimiento: paciente.fechaNacimiento, 
                        nombre: paciente.nombre,
                        telefono: paciente.telefono,
                      });
                    }
            
                    setPacientes(pacienteData);
            




                    //####################################

                    /*setPacientes(data._embedded.pacientes)
                    console.log(pacientes) */
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchPacientes();
        },[])

        return(
            <table>
                <thead>
                    <tr>
                        <th>
                            Cedula
                        </th>
                        <th>
                            Nombre
                        </th>

                        <th>
                            Apellido
                        </th>
                        <th>
                            Fecha de Nacimiento
                        </th>
                        <th>
                            Telefono
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pacientes.map((paciente, index)=>(

                        
                    <tr key={index}>
                        <td>{paciente.cedula}</td>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.apellido}</td>
                        <td>{paciente.fechaNacimiento}</td>
                        <td>{paciente.telefono}</td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        )
}

export default TablaPaciente