export const DefaultData = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
]

export const GridActions = {
    MOVE: "MOVE",
    HOVER: "HOVER",
}

export const GridReducer = (state: string[][], action:any) => {
    switch(action.type) {

        case GridActions.MOVE: 
            return HandleMove(state, action.payload)
    }

}

function HandleMove(state:string[][], payload:any){
    console.log("moving")
}