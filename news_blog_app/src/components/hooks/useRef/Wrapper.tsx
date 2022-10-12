import React, { useRef } from "react";
import { Changer } from "./Changer";
import { ChangeZone } from "./ChangeZone";

const WrapperRef = () => {
    const zoneRef = useRef();
    return(
        <div>
            <Changer zoneRef={zoneRef} />
            <ChangeZone zoneRef={zoneRef} />
        </div>
    );
}

export { WrapperRef };