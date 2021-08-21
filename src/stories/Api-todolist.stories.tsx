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