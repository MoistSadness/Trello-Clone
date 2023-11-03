'use client'

import { useState, useEffect } from "react"
import { useDroppable } from "@dnd-kit/core"
import Item from "@/app/Models/CardModel"
import Card from "./Card"

type ListProps = {
    id: string,
    title: string,
    items: Item[]
}

export default function List({id, title, items}: ListProps) {
    const {setNodeRef} = useDroppable({
        id: id,
    })

    function RenderCards() {
        return (
            items.map((item, index): any => (
                <Card key={index} id={item.id} title={item.name} index={index} parent={id} />
            ))
        )
    }

    return (
        <section className="bg-cyan w-56 h-fit flex flex-col p-2">
            {title} Drop onto me!
            {RenderCards()}
        </section>
    )
}