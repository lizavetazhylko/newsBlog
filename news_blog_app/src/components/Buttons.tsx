import React, { useState } from "react";
import Button, { ButtonTypes } from "./button/Button";
import { HOC } from "./HOC";

const Buttons = () => {
    const [active, setActive] = useState('')
    return (
        <div>
            <HOC id="1"
                active={active}
                setActive={setActive} 
                wrappedComponent={<Button content="Primary"
                    isActive={true}
                    color="white"
                    type={ButtonTypes.primary}
                    onClick={() => console.log('Click on 1 button')} />} />
            <HOC id="2"
                active={active}
                setActive={setActive} 
                wrappedComponent={<Button content="Primary"
                    isActive={false}
                    color="white"
                    type={ButtonTypes.primary}
                    onClick={() => console.log('Click on 2 button')} />} />
            <HOC id="3"
                active={active}
                setActive={setActive} 
                wrappedComponent={<Button content="Secondary"
                    isActive={true}
                    color="black"
                    type={ButtonTypes.secondary}
                    onClick={() => console.log('Click on 3 button')} />} />
            <HOC id="4"
                active={active}
                setActive={setActive}
                wrappedComponent={<Button content="Secondary"
                    isActive={false}
                    color="black"
                    type={ButtonTypes.secondary}
                    onClick={() => console.log('Click on 4 button')} />} />
        </div>
    )
};

export default Buttons;