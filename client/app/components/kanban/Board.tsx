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

    //console.log(boardstate)

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

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleCardDragOver = ({active, over}: any) => {
        //console.log("HANDLING DRAG")
        //console.log("over: ", e)
        
        dispatch({
            type: ACTION_TYPES.HOVER_CARD,
            payload: {
                active, over
            }
        })
    }

    function HandleCardDragEnd(e: any) {
        const { active, over } = e;
        if (active.id !== over.id) {
            //console.log("boardsdtate: ", boardstate)
            //console.log("active: ", active)
            //console.log("over: ", over)

            dispatch({
                type: ACTION_TYPES.MOVE_CARD,
                payload: {
                    active, over
                }
            })
        }
    }

    /*
    // store the ids for all the cards in a matrix
    const [ids, setIds] = useState<string[][]>([])
    useEffect(() => {
        const boardIds: string[][] = []
        boardstate.map((list: ListModel) => {
            //console.log("list", list)
            // create an array of ids
            let listIds: string[] = []
            list.content.map((card: CardModel) => {
                listIds.push(card.ID)
            })
            boardIds.push(listIds)
            listIds = []
        })
        console.log("ids", boardIds)
        setIds(boardIds)

    }, [boardstate])
    */

    function RenderBoard() {
        /*
        const ids: string[] = []
        boardstate.map((list: ListModel) => ids.push(list?.ID))
        */


        return boardstate?.map((list: ListModel, index: number) => {
            // Create a list of ID's required for the 
            /**/
            const listItems: string[] = []
            list.content.map((card: CardModel) => {
                listItems.push(card.ID)
            })
            
            return (
                <SortableContext key={list.ID} items={listItems} strategy={verticalListSortingStrategy}>
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
                onDragOver={handleCardDragOver}
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