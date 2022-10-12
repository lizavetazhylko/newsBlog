import React from "react";

const ChangeZone = (props: any) => {
    const { zoneRef } = props;
    const colorArr = ["red", "green", "blue", "yellow", "black", "orange", 'purple', 'brown']
    return(
        <div ref={zoneRef} style={{"width": 300, "border": "1px solid black", "height": 150, "overflowY": "auto", "overflowX": "hidden" }}>
            {colorArr.map(color => {
                return(<div style = {{backgroundColor: color, width: 800, height: 150 }}/>)
            })}
        </div>
    )
}

export { ChangeZone };