import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input onChange={onChangeHandle} className={error ? "errorInputFrame" : ""} value={title}
                   onKeyPress={onKeyPressHandle}/>
            <button onClick={addItem}>+</button>
            <div className={"errorBlock"}> {error ? 'Incorrect input' : ''}</div>
        </div>

    )

}