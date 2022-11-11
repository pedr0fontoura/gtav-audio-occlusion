import React, { useState, DragEvent } from 'react';
import { FaFileImport } from 'react-icons/fa';

import { Container, Button, CallToAction, Description } from './styles';

type FileImporterProps = {
  validateFile?: (files: File) => boolean;
  onFileImport?: (files: File[]) => void;
  onButtonClick?: () => void;
};

export const FileImporter = ({ validateFile, onFileImport, onButtonClick }: FileImporterProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(0);

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

  const dragDrop = (event: DragEvent): void => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files.length && onFileImport) {
      const fileList: File[] = [];

      for (let i = 0; i < files.length; i++) {
        if (validateFile && !validateFile(files[i])) continue;

        fileList.push(files[i]);
      }

      onFileImport(fileList);
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
      <Button onClick={onButtonClick}>
        <FaFileImport size={60} />
      </Button>
      <CallToAction>Create new project</CallToAction>
      <Description>or drag #map and #typ CodeWalker XML files</Description>
    </Container>
  );
};
