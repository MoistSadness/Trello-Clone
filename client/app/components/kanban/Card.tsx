'use client'

import { useDraggable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

type CardProps = {
    id: string,
    title: string,
    index: number,
    parent: string,
}

export default function Card({ id, title, index, parent }: CardProps) {


    const { attributes,
        listeners,
        setNodeRef,
        transform,
        transition, } = useSortable({
            id: id,
            data: { title, index, parent }
        })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <section
            className="bg-purple mt-1"
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            {id}
        </section>
    )
}