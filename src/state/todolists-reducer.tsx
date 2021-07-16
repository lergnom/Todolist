import {TodoListPropsType} from "../App";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodoListPropsType>, action: ActionType) => {
    switch (action.type) {
        case 'action':
            return state
        default:
            throw new Error("I don't understand this type")
    }

}