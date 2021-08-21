import {useEffect, useState} from "react";
import {TodolistAPI} from "../api/todolist-api";

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
    }, [])

    return <div>{JSON.stringify(state)}</div>;
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistTitle = 'What to by';
        TodolistAPI.createTodolist(todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}