import { Reducer } from "react"
import ListModel from "../Models/ListModel"
import CardModel from "../Models/CardModel"

// Declare strings as variables for easier debugging
export const ACTION_TYPES = {
    INITIALIZE: 'INITIALIZE',
    MOVE_CARD: 'MOVE_CARD',
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
        destinationID: string,
        cardID: string,
        parentID: string,
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
            return HandleMoveCard(state, action.payload); // If payload is an array, directly pass it to HandleInitialize

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

function HandleMoveCard(state: ListModel[], payload: any) {
    console.log(payload)
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
    parentList.content.splice(cardIndex, 1);

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
}