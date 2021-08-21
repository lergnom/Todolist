import {useEffect, useState} from "react";
import {Meta} from "@storybook/react";

export default {
    title: "WorkWithAPI"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {

    }, [])

    return <div>{JSON.stringify(state)}</div>;
}