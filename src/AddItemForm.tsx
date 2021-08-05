import Button from "@material-ui/core/Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormTypeProps = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function(props: AddItemFormTypeProps)  {

        console.log("Add item Form")
        let [title, setTitle] = useState("")
        const [error, setError] = useState<boolean | string>(false)

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
                           error={!!error}
                           label={"Название"}
                           helperText={error}
                           value={title}
                           onKeyPress={onKeyPressHandle}/>
                <IconButton color={"primary"} onClick={addItem}>
                    <AddBox/>
                </IconButton>
                <div className={"errorBlock"}> {error ? 'Incorrect input' : ''}</div>
            </div>

        )

    }
)