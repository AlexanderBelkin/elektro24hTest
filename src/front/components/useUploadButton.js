import React, { useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import { Image, Close } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

function useUploadButton({preview, previewImg, input, button, closeButton}) {
  const maxFiles = 3;
  const maxFileSize = 3 * 1024 * 1024; // 3Mb
  const snackbar = useSnackbar();
  const [files, setFiles] = useState([]);
  const isLimitFiles = files => files.length > maxFiles;

  const isLimitFileSize = files => Boolean(files.find(file => file.size > maxFileSize));

  const onImageUploaded = event => {
    const files = Array.from(event.target.files);
    if (isLimitFiles(files)) {
      snackbar.enqueueSnackbar(`You can upload max ${maxFiles} files`, {
        variant: 'warning'
      });
    } else if (isLimitFileSize(files)) {
      snackbar.enqueueSnackbar(`Max file size is ${Math.round((maxFileSize / 1024) / 1024)} Mb`, {
        variant: 'warning'
      });
    } else {
      setFiles([ ...Array.from(event.target.files) ]);
    }
  };

  const handleDeleteFile = (event, index) => {
    files.splice(index, 1);
    setFiles([ ...files ]);
  }

  return {
    preview: (
      files.length > 0 && (
        <div className={preview}>
          {files.map((file, index) => (
            <div key={index}>
              <IconButton
                size='small'
                color='secondary'
                className={closeButton}
                onClick={event => handleDeleteFile(event, index)}
              >
                <Close/>
              </IconButton>
              <img
                key={index}
                className={previewImg}
                src={URL.createObjectURL(file)}
              />
            </div>
          ))}
        </div>
      )
    ),
    button: (
      <div>
        <input
          onChange={onImageUploaded}
          accept='image/*'
          className={input}
          style={{ display: 'none' }}
          id='raised-button-file'
          multiple
          type='file'
          maxLength={3}
        />
        <label htmlFor='raised-button-file'>
          <Button
            color='primary'
            variant='contained'
            component='span'
            startIcon={<Image/>}
            className={button}
          >
            Upload images
          </Button>
        </label>
      </div>
    ),
    fileState: files,
  }
}

export default useUploadButton;
