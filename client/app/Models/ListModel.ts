import CardModel from "./CardModel";

/** Each list represents a column of cards on the Kanban board
 * 
 */

export default class ListModel {
    id;
    title;
    content;

    constructor(id: string, title: string, content: CardModel[]){
        this.id = id
        this.title = title
        this.content = content
    }
}