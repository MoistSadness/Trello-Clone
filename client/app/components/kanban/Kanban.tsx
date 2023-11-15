'use client'
import Sidebar from "./Sidebar"
import Board from "./Board"

export default function Kanban() {
    //console.log("RENDERING KANBAN")
    return (
        <div className=" bg-currentLine flex flex-row h-full overflow-y-auto">
            <Sidebar />
            <Board />
        </div>
    )
}