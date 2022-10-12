import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const Changer = (props: any) => {
    const [pixels, setPixels] = useState('')
    const { zoneRef } = props;
    const handleChange = () => {
        zoneRef.current.scrollTop = +pixels;
    }
    return (
        <div className="d-flex">
            <Form.Control value={pixels} onChange={(e) => setPixels(e.target.value) } />
            <Button onClick={handleChange}>Change</Button>
        </div>
    )
}

export { Changer };