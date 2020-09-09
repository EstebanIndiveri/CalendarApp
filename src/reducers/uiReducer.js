import { types } from "../types/types";

const initalState={
    modalOpen:false
}


const uiReducer = (state=initalState,action) => {
switch (action.type) {
    case types.uiOpenModal:
        return{
            ...state,
            modalOpen:true
        }
        case types.uiCloseModal:
        return{
            ...state,
            modalOpen:false
        }
    default:
        return state;
}
}
 
export default uiReducer;