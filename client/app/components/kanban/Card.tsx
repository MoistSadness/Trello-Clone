'use client'

import { useDraggable } from "@dnd-kit/core"
import {CSS} from '@dnd-kit/utilities';

type CardProps = {
    id: string,
    title: string,
    index: number,
    parent: string,
}

export default function Card({id, title, index, parent}: CardProps){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id, 
        data: { title, index, parent }
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined;
    return (
        <section 
            className="bg-purple" 
            style={style}
            ref={setNodeRef} 
            {...listeners} 
            {...attributes}
        >
            {id}. I am a card! Drag Me!
        </section>
    )
}