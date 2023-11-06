import CardModel from "./CardModel";

/** Each list represents a column of cards on the Kanban board
 * 
 */

export default class ListModel {
    ID;
    title;
    content;

    constructor(ID: string, title: string, content: CardModel[]){
        this.ID = ID
        this.title = title
        this.content = content
    }
}