import React from "react";

const HOC = (props: IHOC) => {
    const handleHocClick = () => {
        if (props.active === props.id) {
            props.setActive('')
        } else {
            props.setActive(props.id)
        }
    }
    const isActive = props.active === props.id;
    return(
        <div onClick={handleHocClick} style={{border: isActive ? '2px solid red': '', width: 'min-content'}}>
            {props.wrappedComponent}
        </div>
    )
};

interface IHOC {
    wrappedComponent: any,
    id: string,
    active: string,
    setActive: (active: string) => void,
}

export { HOC };