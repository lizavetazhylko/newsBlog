import React from "react";
import { Consumer } from "./Consumer";

const TestContext = React.createContext("");

const Wrapper = () => {
    return (
        <div>
            <TestContext.Provider value="Hello it's text from context">
                <Consumer />
            </TestContext.Provider>
        </div>
    )
}

export { Wrapper, TestContext }