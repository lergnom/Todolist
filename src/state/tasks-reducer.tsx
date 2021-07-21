import {TodoListTaskTypeProps} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}


export const tasksReducer = (state: TodoListTaskTypeProps, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // let stateCopy = {...state}
            // stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task => task.id !== action.taskId)
            // return stateCopy
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }

        }
        default:
            throw new Error("I not understand action type")
    }


}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todolistId, isDone}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, taskId, todolistId}
}