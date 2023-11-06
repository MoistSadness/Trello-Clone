/** Each Item represents one card on the board. The board will then be rendered using arrays of these item classes
 * 
 */

export default class CardModel {
    ID: string
    parentID:string
    title: string
    content: string

    constructor(ID: string, parentID:string, title: string, content: string){
        this.ID = ID
        this.parentID = parentID,
        this.title = title
        this.content = content
    }
}