import Sidebar from "./Sidebar"
import Board from "./Board"

export default function Kanban() {
    return (
        <div className=" bg-currentLine flex flex-row h-full overflow-y-auto">
            <Sidebar />
            <Board />
        </div>
    )
}