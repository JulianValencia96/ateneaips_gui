"use client"

import TablaCita from "@/app/components/ListaCitas"

export default function PaginaListarCitas(){

    return(

        <div className="container">
            <h1>Listado de Citas</h1>
            <TablaCita></TablaCita>   
        </div>        

    )
}