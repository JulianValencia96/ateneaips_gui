import { table } from "console";
import { Tangerine } from "next/font/google";
import { useEffect, useState } from "react";


interface Especialidad {
    nombre: string;
}


const TablaEspecialidad = () => {

    const [especialidad, setEspecialidades] = useState<Especialidad[]>([])

    useEffect(
        () => {
            const fetchEspecialidades = async () => {
                try {
                    const response = await fetch("http://localhost:8080/especialidades")
                    const data = await response.json()

                    //Codigo base - entregable_frontEnd

                    const especialidadData: any = [];
                    //Error: Variable 'especialidadData' implicitly has type 'any[]' in some locations where its type cannot be determined.ts(7034)
                    //Solucion: definir especialidadData como any
                    for (const especialidad of data._embedded.especialidades) {

                        especialidadData.push({

                            nombre: especialidad.nombre,

                        });
                    }

                    setEspecialidades(especialidadData);





                    //####################################

                    /*setEspecialidades(data._embedded.especialidad)
                    console.log(especialidad) */
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchEspecialidades();
        }, [])

    return (
        <table>
            <thead>
                <tr>
                 
                    <th>
                        Nombre Especialidad
                    </th>

                </tr>
            </thead>
            <tbody>
                {
                    especialidad.map((especialidad, index) => (


                        <tr key={index}>
                            
                            <td>{especialidad.nombre}</td>
                            
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TablaEspecialidad