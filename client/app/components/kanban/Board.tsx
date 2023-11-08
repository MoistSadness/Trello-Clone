'use client'

import { useState, useEffect, useReducer } from "react"
import { BoardReducer, ACTION_TYPES } from "@/app/utils/BoardReducer"
import {
    DndContext,
    rectIntersection,
    closestCenter,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { nanoid } from 'nanoid'
import List from "./List"
import CardModel from "@/app/Models/CardModel"
import ListModel from "@/app/Models/ListModel"

export default function Board() {
    // Each array represents one List on the board
    const initialState: ListModel[] = []
    const [boardstate, dispatch] = useReducer(BoardReducer, initialState)

    console.log(boardstate)


    // Inititalize board data here
    useEffect(() => {
        dispatch({
            type: 'INITIALIZE',
            payload: [
                new ListModel("1", 'To Do', [
                    new CardModel(nanoid(), "1", "Homework", "contents"),
                    new CardModel(nanoid(), "1", "Prayer", "contents"),
                    new CardModel(nanoid(), "1", "Studying", "contents"),
                ]),
                new ListModel("2", 'In Progress', [
                    new CardModel(nanoid(), "2", "Trolling", "contents"),
                    new CardModel(nanoid(), "2", "Girls", "contents"),
                    new CardModel(nanoid(), "2", "Dinner", "contents"),
                ]),
                new ListModel("3", 'Done', [
                    new CardModel(nanoid(), "3", "League of Legends", "contents"),
                    new CardModel(nanoid(), "3", "CounterStrike", "contents"),
                    new CardModel(nanoid(), "3", "Nut", "contents"),
                ]),
            ]
        })
    }, [])

    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleCardDragStart(e: any) {
        const { active } = e;

        setActiveId(active.id);
    }

    function handleCardDragOver(e: any) {
        //console.log(e)
        console.log("over")
    }

    function HandleCardDragEnd(e: any) {
        console.log(e)
        const destinationID: string = e.over.id; // The id for the list that is currently being hovering over
        const cardID: string = e.active.id;      // ID for the selected card item
        const parentID = e.active.data.current?.parent;     // Gets the original parent for the item that is being moved

        // Update state logic
        dispatch({
            type: ACTION_TYPES.MOVE_CARD,
            payload: {
                destinationID, cardID, parentID
            }
        })
        setActiveId(null);
    }

    const listIDs = useState([])
    useEffect(()=>{
        const ids: string[] = []
        boardstate.map((list: ListModel) => ids.push(list.ID))
    }, [boardstate])

    function RenderBoard() {
        const ids: string[] = []
        boardstate.map((list: ListModel) => ids.push(list.ID))

        return boardstate?.map((list: ListModel) => {
            return (
                <SortableContext key={list.ID} items={ids} strategy={verticalListSortingStrategy}>
                    <List key={list.ID} ID={list.ID} title={list.title} items={list.content} />
                </SortableContext>
            )

        })
    }

    return (
        <div className="bg-orange">
            <nav className="w-full">
                Title
            </nav>

            <DndContext
                id={nanoid()}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleCardDragStart}
                onDragOver={handleCardDragOver}
                onDragEnd={HandleCardDragEnd}
            >



                <div className="bg-yellow-300 flex flex-rows gap-4">
                    {RenderBoard()}
                    <section className="bg-cyan w-36 h-fit">
                        New List
                    </section>
                </div>

            </DndContext>

        </div>
    )
}