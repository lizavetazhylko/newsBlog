import React, { useContext } from "react";
import { TestContext } from "./Wrapper";

const Consumer = () => {
    const text = useContext(TestContext);
    return (
        <span>
            {text}
        </span>
    )
}
export { Consumer };