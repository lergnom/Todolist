import React from "react";
import {PropsType} from "./App";

export function Todolist(props: PropsType) {
    const taskList = props.tasks.map((t) => {
        return (<li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
            <button onClick={() => {
                props.removeTask(t.id)
            }}> x
            </button>
        </li>)
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>

    )
}