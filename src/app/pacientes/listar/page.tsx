"use client"

import TablaPaciente from "@/app/components/ListaPacientes"



export default function PaginaListarPacientes(){

    return(

        <div className="container">
            <h1>Pacientes Registrados</h1>
            <TablaPaciente></TablaPaciente>
        </div>        

    )
}