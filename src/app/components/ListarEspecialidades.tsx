//Importaciones

import { table } from "console"

//Interfaz de Especialidad

interface Especialidad{
    nombre:string
}

//interfaz para las especialidades


interface EspecialidadProps{
    especialidades: Especialidad[]
}

//Componente FC. Listado de funcion map.

const ListarEspecialidades:React.FC<EspecialidadProps> = ({especialidades}) =>{
    return(
        <table>
            <thead>

            </thead>
            <tbody>

            <tr>
                <td><h3>Nombre Especialidad</h3></td>
            </tr>

                {
                    especialidades.map((especialidad, index)=>{
                        return(
                            <tr>
                                <td>{especialidad.nombre}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ListarEspecialidades
