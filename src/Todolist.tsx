import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {PropsType} from "./App";

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState(false)


    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        title = e.target.value
        setTitle(title)
        setError(false)
    }

    const addTask = () => {
        const titleCheck = title.trim()
        if (titleCheck !== "") {
            props.addTask(titleCheck)
            setTitle("")
        } else {
            setTitle("")
            setError(true)
        }
    }

    const clickAll = () => {
        props.changeFilter('all')
    }

    const clickActive = () => {
        props.changeFilter('active')
    }

    const clickCompleted = () => {
        props.changeFilter('completed')
    }

    const taskList = props.tasks.map((t) => {
        const changeBox = (e: ChangeEvent<HTMLInputElement>) => {
            props.checkBox(t.id, e.currentTarget.checked)
        }
        return (<li className={t.isDone ? 'activeTask' : ''} key={t.id}><input type="checkbox" checked={t.isDone}
                                                                               onChange={changeBox}/>
            <span>{t.title}</span>
            <button onClick={() => {
                props.removeTask(t.id)
            }}> x
            </button>
        </li>)
    })

    const onKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            addTask()
            setTitle("")
        }
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={onChangeHandle} className={error ? "errorInputFrame" : ""} value={title}
                       onKeyPress={onKeyPressHandle}/>
                <button onClick={addTask}>+</button>
                <div className={"errorBlock"}> {error ? 'Incorrect input' : ''}</div>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "activeFilter" : ""} onClick={clickAll}>All
                </button>
                <button className={props.filter === 'active' ? "activeFilter" : ""} onClick={clickActive}>Active
                </button>
                <button className={props.filter === 'completed' ? "activeFilter" : ""}
                        onClick={clickCompleted}>Completed
                </button>
            </div>
        </div>

    )
}