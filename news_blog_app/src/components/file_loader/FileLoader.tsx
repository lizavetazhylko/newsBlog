import React from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FileLoaderType } from '../../types';

const FileLoader = (props: FileLoaderType) => {
    const { image, onChange: outerOnChange, onRemove: outerOnRemove } = props;
    const onChange = (imageList: ImageListType) => {
      outerOnChange(imageList);
    };
    const onRemove = (func: Function, index: number) => {
        outerOnRemove();
        func(index)
    }
    return (
        <ImageUploading
        value={image ? [image] : []}
        onChange={onChange}
      >
        {({
          imageList,
          onImageUpload,
          // onImageUpdate,
          onImageRemove,
          // isDragging,
          // dragProps
        }) =>  (
          // write your building UI
          <div className="upload__image-wrapper">
            <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <InputGroup>
                    <Form.Control placeholder='Select file' value={imageList[0] && imageList[0].file?.name || ''} disabled/>
                    <Button variant="primary" id="button-addon1" onClick={onImageUpload}>
                        {imageList[0] ? 'Change' : 'Upload'}
                    </Button>
                </InputGroup>
            </Form.Group>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="200" />
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                  <button onClick={() => onRemove(onImageRemove, index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    )
}

export { FileLoader };