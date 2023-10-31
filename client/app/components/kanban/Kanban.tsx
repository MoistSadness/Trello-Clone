import Sidebar from "./Sidebar"
import Board from "./Board"

export default function Kanban() {
    return (
        <div className="flex flex-row h-full">
            <Sidebar />
            <Board />
        </div>
    )
}