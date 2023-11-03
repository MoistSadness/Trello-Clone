/** Each Item represents one card on the board. The board will then be rendered using arrays of these item classes
 * 
 */

export default class CardModel {
    id: string
    name: string
    content: string

    constructor(id: string, name: string, content: string){
        this.id = id
        this.name = name
        this.content = content
    }
}