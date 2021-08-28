import {TasksStateType, TodoListTaskTypeProps} from "../App";
import {v1} from "uuid";
import {AddTodolist, RemoveTodolist, SetTodolistsType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TasksAPI} from "../api/todolist-api";

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolist
    | RemoveTodolist
    | SetTodolistsType
    | SetTasksType

const initialState: TodoListTaskTypeProps = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS": {
            const copyState = {...state};
            copyState[action.todolistId] = action.tasks;
            return copyState;
        }
        case "SET_TODOLISTS": {
            const stateCopy = {...state};
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }


        case 'REMOVE-TASK': {
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
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST-ID': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            // throw new Error("I not understand action type")
            return state
    }


}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const;
}

type AddTaskActionType = ReturnType<typeof addTaskAC>;

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const;
};

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todolistId, isDone} as const;
};

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, taskId, todolistId} as const;
};

type SetTasksType = ReturnType<typeof setTasksAC>;
const setTasksAC = (tasks: any, todolistId: string) => ({
    type: 'SET_TASKS',
    tasks,
    todolistId
}) as const;

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
    TasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId));
        })
}