import { useState } from "react"
import List from "./List"

export default function Board() {
    return (
        <div className="bg-orange">
            <nav className="w-full">
                Title
            </nav>
            <div className="bg-yellow-300 flex flex-rows gap-4">
                <List />
                <List />
                <List />
                <List />
                <section className="bg-cyan w-36 h-fit">
                    New List
                </section>
            </div>
        </div>
    )
}