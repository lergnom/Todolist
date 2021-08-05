import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanTypeProps = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanTypeProps) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState("")
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const deactiveEditMode = () => {
        setEditMode(false)
        props.onChange(title)

    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField onChange={changeTitleHandler} value={title} autoFocus onBlur={deactiveEditMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})