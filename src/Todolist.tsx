import React, {ChangeEvent} from "react";
import {PropsType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.tlID)
    }

    const clickAll = () => {
        props.changeFilter('all', props.tlID)
    }

    const clickActive = () => {
        props.changeFilter('active', props.tlID)
    }

    const clickCompleted = () => {
        props.changeFilter('completed', props.tlID)
    }

    const taskList = props.tasks.map((t) => {
        const changeBox = (e: ChangeEvent<HTMLInputElement>) => {
            props.checkBox(t.id, e.currentTarget.checked, props.tlID)
        }

        const onChangeTitleHandler = (newValue: string) => {
            props.onChangeTitle(t.id, newValue, props.tlID)

        }

        return (<div className={t.isDone ? 'activeTask' : ''} key={t.id}><Checkbox color={"primary"}
                                                                                   checked={t.isDone}
                                                                                   onChange={changeBox}/>
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={() => {
                props.removeTask(t.id, props.tlID)
            }}>
                <Delete/>
            </IconButton>
        </div>)
    })


    const onChangeTitleTodoList = (newTitle: string) => {
        props.onChangeTodoListTitle(newTitle, props.tlID)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTitleTodoList}/>
                <IconButton onClick={() => {
                    props.removeList(props.tlID)
                }}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {taskList}
            </div>
            <div>
                <Button variant={"outlined"} color={props.filter === 'all' ? "primary" : "default"}
                        onClick={clickAll}>All
                </Button>
                <Button style={{margin: "0 3px"}} variant={"outlined"}
                        color={props.filter === 'active' ? "primary" : "default"}
                        onClick={clickActive}>Active
                </Button>
                <Button variant={"outlined"} color={props.filter === 'completed' ? "primary" : "default"}
                        onClick={clickCompleted}>Completed
                </Button>
            </div>
        </div>

    )
}