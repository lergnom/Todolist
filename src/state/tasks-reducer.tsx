import {TodoListTaskTypeProps} from "../App";

type ActionType = RemoveTaskActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export const tasksReducer = (state: TodoListTaskTypeProps, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // let stateCopy = {...state}
            // stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task => task.id !== action.taskId)
            // return stateCopy
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        }
        default:
            throw new Error("I not understand action type")
    }


}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}