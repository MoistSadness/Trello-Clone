import { Reducer } from "react"
import ListModel from "../Models/ListModel"
import CardModel from "../Models/CardModel"
import { arrayMove } from "@dnd-kit/sortable";
import { stat } from "fs";

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
    //console.log(action.type)
    switch (action.type) {
        case ACTION_TYPES.INITIALIZE:
            if (Array.isArray(action.payload)) {
                return HandleInitialize(action.payload); // If payload is an array, directly pass it to HandleInitialize
            }
            else throw new Error()

        case ACTION_TYPES.HOVER_CARD:
            return HandleHoverCard(state, action.payload);
            break;

        default:
            throw new Error(); // Return the state as default
    }
};


///////////////////////////////////////////////////////////
// Handlers

function HandleInitialize(payload: ListModel[]) {
    const newstate: ListModel[] = []
    payload.map((list: ListModel) => newstate.push(list))
    //console.log("completed initialization: ", newstate)
    return newstate
}

/** When the user hovers a card over a different container, move that card's parent 
 * to that container so the card can be dropped into that container
 */
function HandleHoverCard(state: ListModel[], payload: any) {
    console.log("Handling Hover")

    ////////////////////////////////////////////////////////
    //  Getting all the necessary variables
    //

    // Get the id for the container the card is being hovered over
    const destinationContainerID = payload.over?.data?.current?.parent;
    if (!destinationContainerID) return state       // Sometimes, the destination ID shows up undefined and throws an error. It might be an issue with the collision handling algorithm used by DND-kit

    // Getting the state index for the destination container
    const destinationContainerIndex: number | undefined = state?.findIndex((list: ListModel) => destinationContainerID === list.ID)
    if (destinationContainerIndex === -1) return state

    // Get the id for the card's current container
    const activeContainerID = payload.active?.data?.current?.parent
    if (!activeContainerID) return state;

    // Getting the state index for the active container
    const activeContainerIndex: number | undefined = state?.findIndex((list: ListModel) => payload.active?.data?.current?.parent === list.ID)
    if (activeContainerIndex === -1) return state

    // Get the position of the card within it's current list
    const activePos: number | undefined = state[activeContainerIndex].content.findIndex((card: CardModel) => payload.active.id === card.ID)
    if (activePos === -1) return state
    // Get the position of the card's target list
    const targetPos: number | undefined = state[destinationContainerIndex].content.findIndex((card: CardModel) => payload.over.id === card.ID)
    if (targetPos === -1) return state

    ////////////////////////////////////////////////////////
    //  Handling card move based on if its being moved inside the current container or being moved to another one
    //
    if (destinationContainerIndex === activeContainerIndex) {
        //console.log("Moving card within the container")

        const newList = arrayMove(state[destinationContainerIndex].content, activePos, targetPos);
        const destinationList = { ...state[destinationContainerIndex] };
        destinationList.content = newList

        // Create a new state with the modified source and destination lists
        const newstate = state.map((list, index) => {
            if (index === destinationContainerIndex) {
                return destinationList;
            }
            return list;
        });
        //console.log("new state ", newstate)
        return newstate
    }
    else {
        //console.log("Moving card to another container")

        // create a copy of the original card and update it
        const updatedCard: CardModel | undefined = state[activeContainerIndex].content[activePos]
        if (!updatedCard) return state
        updatedCard.parentID = destinationContainerID     // update parent

        // Remove the card from it's original container
        const newActiveList: ListModel = state[activeContainerIndex]
        newActiveList.content.splice(activePos, 1)

        // create a copy of the cards in the destination list
        const newDestinationList: ListModel = state[destinationContainerIndex]
        newDestinationList.content.splice(targetPos, 0, updatedCard)

    }
}

