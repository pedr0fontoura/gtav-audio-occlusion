import React, { useState, DragEvent } from 'react';
import { FaFileImport } from 'react-icons/fa';

import { useProject } from '../../context';

import { Container, Button, CallToAction, Description } from './styles';

export const FileImporter = () => {
  const [isDraggingOver, setIsDraggingOver] = useState(0);

  const { setCreateModalOpen } = useProject();

  const dragOver = (event: DragEvent): void => {
    event.preventDefault();
  };

  const dragEnter = (event: DragEvent): void => {
    event.preventDefault();
    setIsDraggingOver(value => value + 1);
  };

  const dragLeave = (event: DragEvent): void => {
    event.preventDefault();
    setIsDraggingOver(value => value - 1);
  };

  const validateFile = (file: File): boolean => {
    if (file.type !== 'text/xml') {
      return false;
    }

    const acceptedFileExtensions = ['ytyp.xml', 'ymap.xml'];

    let isFileValid = false;

    acceptedFileExtensions.forEach(fileExtension => {
      if (file.name.includes(fileExtension)) {
        isFileValid = true;
      }
    });

    return isFileValid;
  };

  const handleFile = (file: File): void => {};

  const dragDrop = (event: DragEvent): void => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        handleFile(files[i]);
      }
    }

    setIsDraggingOver(0);
  };

  return (
    <Container
      isDraggingOver={!!isDraggingOver}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={dragDrop}
    >
      <Button onClick={() => setCreateModalOpen(true)}>
        <FaFileImport size={60} />
      </Button>
      <CallToAction>Create new project</CallToAction>
      <Description>or drag #map and #typ CodeWalker XML files</Description>
    </Container>
  );
};
