import React, { useState, useEffect } from 'react';
import { Button, IconButton } from '@material-ui/core';
import { Image, Close } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/styles';
import { isEmpty } from 'lodash';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    '& > div': {
      position: 'relative',
    },
  },
  previewImg: {
    width: 64,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

function useUploadButton({images}) {
  const maxFiles = config.validation.imagePost.count;
  const maxFileSize = config.validation.imagePost.size;
  const snackbar = useSnackbar();
  const classes = useStyles();
  const isLimitFiles = files => files.length > maxFiles;
  const [isEditMode, setIsEditMode] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setIsEditMode(!isEmpty(images));
  }, [images]);

  useEffect(() => {
    if (isEditMode) {
      setFiles(images);
    }
  }, [isEditMode]);

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
        <div className={classes.preview}>
          {files.map((file, index) => (
            <div key={index}>
              <IconButton
                size='small'
                color='secondary'
                className={classes.closeButton}
                onClick={event => handleDeleteFile(event, index)}
              >
                <Close/>
              </IconButton>
              <img
                key={index}
                className={classes.previewImg}
                src={isEditMode ? file : URL.createObjectURL(file)}
                alt={file.name}
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
