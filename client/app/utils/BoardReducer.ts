import { Reducer } from "react"
import ListModel from "../Models/ListModel"
import CardModel from "../Models/CardModel"
import { arrayMove } from "@dnd-kit/sortable";

// Declare strings as variables for easier debugging
export const ACTION_TYPES = {
    INITIALIZE: 'INITIALIZE',
    MOVE_CARD: 'MOVE_CARD',
    HOVER_CARD: 'HOVER_CARD',
    UPDATE_LIST: 'UPDATE_LIST',
    UPDATE_CARD: 'UPDATE_CARD',
};

type InitializeAction = {
    type: string,
    payload: ListModel[]
}

type MoveCardAction = {
    type: string,
    payload: {
        active: any,
        over: any
    }
}

type UpdateListAction = {
    type: string,
    payload: ListModel
}

type UpdateCardAction = {
    type: string,
    payload: CardModel
}

type ActionType = InitializeAction | MoveCardAction | UpdateListAction | UpdateCardAction


///////////////////////////////////////////////////////////
// Reducer

export const BoardReducer: Reducer<ListModel[], ActionType> = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.INITIALIZE:
            if (Array.isArray(action.payload)) {
                return HandleInitialize(action.payload); // If payload is an array, directly pass it to HandleInitialize
            }
            else throw new Error()
            
        case ACTION_TYPES.MOVE_CARD:
            return HandleMoveCard(state, action.payload); 

        case ACTION_TYPES.HOVER_CARD:
            return HandleHoverCard(state, action.payload); 

        default:
            throw new Error(); // Return the state as default
    }
};


///////////////////////////////////////////////////////////
// Handlers

function HandleInitialize(payload: ListModel[]) {
    const newstate: ListModel[] = []
    payload.map((list: ListModel) => newstate.push(list))
    console.log("completed initialization: ", newstate)
    return newstate
}

/** When the user hovers a card over a different container, move that card's parent 
 * to that container so the card can be dropped into that container
 */
function HandleHoverCard(state: ListModel[], payload: any) {
    console.log(payload)
    console.log("hii")

    // Get the id for the container the card is being hovered over

    // Update the card's parent to the new container

    // update state

    
    return state
}




/** When the user drops a card on a container, add it to that container
 * When it hovers, the parent should already be set to the destination.
 * 
 */
function HandleMoveCard(state: ListModel[], payload: any) {
    console.log("Handling card move")
    const destinationID = payload.over?.data?.current?.parent;
    //console.log(destinationID)

    // Sometimes, the destination ID shows up undefined and throws an error. It might be an issue with the collision handling algorithm used by DND-kit
    if (!destinationID){ 
        console.log("No destnation container found!")
        return state
    }

    const destinationIndex: number | undefined = state?.findIndex((list: ListModel) => destinationID === list.ID)

    if (destinationIndex === -1) {
        console.log("Destination index not found")
        return state
    }

    // Get the index of the target card's original position
    const oldIndex = state[destinationIndex].content.findIndex((card:CardModel) => card.ID === payload.active.id);
    // Get the index of the target card's new position
    const newIndex = state[destinationIndex].content.findIndex((card:CardModel) => card.ID === payload.over.id);
    
    //console.log(oldIndex, newIndex)
    
    // Move the card to the desired location
    const newList = arrayMove(state[destinationIndex].content, oldIndex, newIndex);
    const destinationList = { ...state[destinationIndex] };
    destinationList.content = newList
    console.log("new list: ", destinationList)

    // Create a new state with the modified source and destination lists
    /* */
    const newstate = state.map((list, index) => {
        if (index === destinationIndex) {
            return destinationList;
        }
        return list;
    });
    console.log("new state ", newstate)
    return newstate
   






   //return state


    /*
    console.log("state: ", state)
    console.log("Payload: ", payload)
    // iterate through the array of lists until the destination ID is matched
    const destinationIndex: number | undefined = state?.findIndex((list: ListModel) => payload.destinationID === list.ID)
    const parentIndex: number | undefined = state?.findIndex((list: ListModel) => payload.parentID === list.ID)
    const cardIndex: number | undefined = state[parentIndex].content?.findIndex((card: CardModel) => payload.cardID === card.ID)
    
    console.log(destinationIndex,parentIndex,cardIndex)
    
    // If the target card is not found, do nothing
    if (cardIndex == -1) return state

    // Create copies of the involved lists and the moved card
    const parentList = { ...state[parentIndex] };
    const destinationList = { ...state[destinationIndex] };
    const targetCard = { ...parentList.content[cardIndex] };

    // Update the target card with it's new parent
    targetCard.parentID = destinationList.ID

    // Remove the card from it's parent list
    //parentList.content.splice(cardIndex, 1);

    // Add the card to the destination list
    //destinationList.content.push(targetCard);

    // Create a new state with the modified source and destination lists
    const newstate = state.map((list, index) => {
        if (index === parentIndex) {
            return parentList;
        } else if (index === destinationIndex) {
            return destinationList;
        }
        return list;
    });

    return newstate
    */
}