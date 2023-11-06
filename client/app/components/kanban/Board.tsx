'use client'

import { useState, useEffect, useReducer } from "react"
import { BoardReducer, ACTION_TYPES } from "@/app/utils/BoardReducer"
import { DndContext, rectIntersection } from "@dnd-kit/core"
import { nanoid } from 'nanoid'
import List from "./List"
import CardModel from "@/app/Models/CardModel"
import ListModel from "@/app/Models/ListModel"
import Card from "./Card"

export default function Board() {
    // Each array represents one List on the board
    const initialState: ListModel[] = []
    const [boardstate, dispatch] = useReducer(BoardReducer, initialState)
    console.log("Rendering board")

    // Inititalize board data here
    useEffect(() => {
        console.log("Initializing")
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

    // When changes are made to the board, rerender it


    function HandleDragEnd(e: any) {
        console.log(e)
        const destinationID: string = e.over.id; // The id for the list that is currently being hovering over
        const cardID: string = e.active.id;      // ID for the selected card item
        const parentID = e.active.data.current?.parent ?? "Todo";     // Gets the original parent for the item that is being moved

        // Update state logic
        dispatch({
            type: ACTION_TYPES.MOVE_CARD,
            payload: {
                destinationID, cardID, parentID
            }
        })
    }

    function RenderBoard() {
        return boardstate?.map((boardItem: ListModel) => (
            <List key={boardItem.ID} ID={boardItem.ID} title={boardItem.title} items={boardItem.content} />
        ))
    }

    return (
        <div className="bg-orange">
            <nav className="w-full">
                Title
            </nav>

            <DndContext id={nanoid()} collisionDetection={rectIntersection} onDragEnd={HandleDragEnd}>
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