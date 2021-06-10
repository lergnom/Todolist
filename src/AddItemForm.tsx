import Button from "@material-ui/core/Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type AddItemFormTypeProps = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormTypeProps) {
    let [title, setTitle] = useState("")
    const [error, setError] = useState(false)

    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        title = e.target.value
        setTitle(title)
        setError(false)
    }

    const addItem = () => {
        const titleCheck = title.trim()
        if (titleCheck !== "") {
            props.addItem(titleCheck)
            setTitle("")
        } else {
            setTitle("")
            setError(true)
        }
    }


    const onKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            addItem()
            setTitle("")
        }
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       onChange={onChangeHandle}
                       className={error ? "errorInputFrame" : ""}
                       value={title}
                       onKeyPress={onKeyPressHandle}/>
            <Button variant={"contained"} color={"primary"} onClick={addItem}>+</Button>
            <div className={"errorBlock"}> {error ? 'Incorrect input' : ''}</div>
        </div>

    )

}