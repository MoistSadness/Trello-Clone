'use client'

import { useState, useEffect } from "react"
import { DndContext, rectIntersection } from "@dnd-kit/core"
import List from "./List"
import CardModel from "@/app/Models/CardModel"
import ListModel from "@/app/Models/ListModel"


export default function Board() {
    // Each array represents one List on the board
    const [board, setBoard] = useState<ListModel[]>()

    // Inititalize board data here
    useEffect(() => (
        setBoard(() => ([
            new ListModel('1', 'To Do', [
                new CardModel("one", "one", "contents"),
                new CardModel("two", "two", "contents"),
                new CardModel("three", "three", "contents"),
            ]),
            new ListModel('2', 'In Progress', [
                new CardModel("four", "one", "contents"),
                new CardModel("five", "two", "contents"),
                new CardModel("six", "three", "contents"),
            ]),
            new ListModel('3', 'Done', [
                new CardModel("seven", "one", "contents"),
                new CardModel("eight", "two", "contents"),
                new CardModel("nine", "three", "contents"),
            ]),
        ]))
    ), [])

    console.log(board)

    function HandleDragEnd(e: any) {
        console.log(e)
        const container = e.over?.id; // The ID of the container that the item is currently hovering over
        const current: CardModel = e.active.data.current;      // current represents an individual item
        const parent = e.active.data.current?.parent ?? "Todo";     // Gets the original parent for the item that is currently being hovered

        /* 
        if (container === "Todo") {
            setTodoItems([...todoItems, current]);
        } else if (container === "Done") {
            setDoneItems([...doneItems, current]);
        } else {
            setInProgressItems([...inProgressItems, current]);
        }
        if (parent === "Todo") {
            setTodoItems([
                ...todoItems.slice(0, current?.index),
                ...todoItems.slice(index + 1),
            ]);
        } else if (parent === "Done") {
            setDoneItems([
                ...doneItems.slice(0, index),
                ...doneItems.slice(index + 1),
            ]);
        }
        else {
            setInProgressItems([
                ...inProgressItems.slice(0, index),
                ...inProgressItems.slice(index + 1),
            ]);
        }
        */
    }

    function RenderBoard() {
        return board?.map((boardItem: ListModel) => (
            <List key={boardItem.id} id={boardItem.id} title={boardItem.title} items={boardItem.content} />
        ))
    }

    return (
        <div className="bg-orange">
            <nav className="w-full">
                Title
            </nav>

            <DndContext id="hgjfkghkrejkhfjkfhak" collisionDetection={rectIntersection} onDragEnd={HandleDragEnd}>

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