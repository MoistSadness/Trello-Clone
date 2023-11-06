'use client'
import Sidebar from "./Sidebar"
import Board from "./Board"
import { useEffect } from "react"

export default function Kanban() {
    console.log("kanbamn")
    return (
        <div className=" bg-currentLine flex flex-row h-full overflow-y-auto">
            <Sidebar />
            <Board />
        </div>
    )
}