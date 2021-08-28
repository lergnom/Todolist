import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'b018a2e7-a067-422d-aa3e-08e12df481c7'
    }
});

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TodoType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
}

type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
    data: T
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const TodolistAPI = {
    getTodolists() {
        return instance.get<Array<TodoType>>(`todo-lists/`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<TodoType>>('todo-lists/', {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title});
    }

};


export type TaskItemType = {
    addedDate: string,
    deadline: null | string,
    description: null | string,
    id: string,
    order: number,
    priority: number,
    startDate: null | string,
    status: number,
    title: string,
    todoListId: string,
}


export type GetTasksType = {
    error: null | string
    // items: {
    //     [key: string]: Array<TaskItemType>
    // }
    items: TaskItemType[]
    totalCount: number
}


type CommonTaskType<D = {}> = {
    data: D
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
}
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export const TasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks/`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonTaskType>(`/todo-lists/${todolistId}/tasks/`, {title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
};