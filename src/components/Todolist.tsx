import React, { useCallback} from "react";
import {PropsType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


export const Todolist = React.memo(function (props: PropsType) {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.tlID)
    }, [props])

    const clickAll = useCallback(() => {
        props.changeFilter('all', props.tlID)
    }, [props])

    const clickActive = useCallback(() => {
        props.changeFilter('active', props.tlID)
    }, [props])

    const clickCompleted = useCallback(() => {
        props.changeFilter('completed', props.tlID)
    }, [props])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }

    const taskList = tasksForTodoList.map((t) => {
        return <Task key={t.id} tlID={props.tlID} task={t} checkBox={props.checkBox} onChangeTitle={props.onChangeTitle}
                     removeTask={props.removeTask}/>
    })


    const onChangeTitleTodoList = useCallback((newTitle: string) => {
        props.onChangeTodoListTitle(newTitle, props.tlID)
    }, [props])

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
})