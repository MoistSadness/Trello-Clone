import Card
 from "./Card"
export default function List(){
    return (
        <section className="bg-cyan w-48 h-fit flex flex-col p-2">
            This is a list!
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </section>
    )
}