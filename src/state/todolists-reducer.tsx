import {TodoListPropsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodoListPropsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST-ID':
            return [...state].filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        default:
            throw new Error("I don't understand this type")
    }

}