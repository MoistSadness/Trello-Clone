'use client'

import { useState, useEffect } from "react"
import { useDroppable } from "@dnd-kit/core"
import Item from "@/app/Models/CardModel"
import Card from "./Card"

type ListProps = {
    ID: string,
    title: string,
    items: Item[]
}

export default function List({ID, title, items}: ListProps) {


    const {setNodeRef} = useDroppable({
        id: ID,
    })

    function RenderCards() {
        return (
            items.map((item, index): any => (
                <Card key={index} id={item.ID} title={item.title} index={index} parent={ID} />
            ))
        )
    }

    return (
        <section ref={setNodeRef} className="bg-cyan w-56 h-fit flex flex-col p-2">
            {title} Drop onto me!
            {RenderCards()}
        </section>
    )
}