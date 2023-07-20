"use client"

import TablaMedico from "@/app/components/ListaMedicos"

export default function PaginaListarMedicos(){

    return(

        <div className="container">
            <h1>Medicos Registrados</h1>
            <TablaMedico></TablaMedico>
        </div>        

    )
}