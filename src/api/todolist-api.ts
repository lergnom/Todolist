import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'b018a2e7-a067-422d-aa3e-08e12df481c7'
    }
});

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

export const TodolistAPI = {
    getTodolists() {
        return instance.get<Array<TodoType>>(`todo-lists/`)
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType>('todo-lists/', {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title});
    }

};


type TaskItemType = {
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

type GetTasksType = {
    error: null | string
    items: {
        [key: string]: Array<TaskItemType>
    }
    totalCount: number
}


type CommonTaskType<D = {}> = {
    data: D
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
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
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<CommonTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title});
    }
};