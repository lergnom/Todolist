import {useEffect, useState} from "react";
import {TasksAPI, TodolistAPI} from "../api/todolist-api";

export default {
    title: "WorkWithAPI"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        TodolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistTitle = 'What to by';
        TodolistAPI.createTodolist(todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '1147169a-3092-48b5-8259-28e360914f68';
        TodolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const
            todolistId = 'fc4bd1da-b3cd-4612-b78e-b5dadc75f9ad',
            newTitle = 'My todolist';

        TodolistAPI.updateTodolist(todolistId, newTitle)
            .then((res) => {
                setState(res.data)
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'fc4bd1da-b3cd-4612-b78e-b5dadc75f9ad';
        TasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const
            todolistId = 'fc4bd1da-b3cd-4612-b78e-b5dadc75f9ad',
            taskTitle = 'JS';
        TasksAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            })


    }, [])

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const
            todolistId = 'fc4bd1da-b3cd-4612-b78e-b5dadc75f9ad',
            taskId = 'cb501b66-2e23-452c-ac98-45a47a928ffb';

        TasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTask = () => {
    const
        [state, setState] = useState<any>(null),
        todolistId = 'fc4bd1da-b3cd-4612-b78e-b5dadc75f9ad',
        taskId = '9d6c8b42-84a9-419d-8298-70cf6ef93338',
        newTitle = 'REDUX';

    useEffect(() => {
        TasksAPI.updateTask(todolistId, taskId, newTitle)
            .then((res) => {
                setState(res.data);
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};