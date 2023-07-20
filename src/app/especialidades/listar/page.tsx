"use client"

import TablaEspecialidad from "@/app/components/ListarEspecialidades"






export default function PaginaListarEspecialidades(){

    return(

        <div className="container">
            <h1>Especialidades Registradas</h1>
            <TablaEspecialidad></TablaEspecialidad>
        </div>        

    )
}