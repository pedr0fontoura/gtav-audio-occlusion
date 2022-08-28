import React, { useState, DragEvent } from 'react';
import { FaFileImport } from 'react-icons/fa';

interface IFileImporter {
  onFileImport: (file: File) => void;
}

import { Container, ImportButton } from './styles';

const FileImporter = ({ onFileImport }: IFileImporter) => {
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

  const handleFile = (file: File): void => {
    if (validateFile(file)) {
      onFileImport(file);
    }
  };

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
      <ImportButton>
        <FaFileImport size={40} />
      </ImportButton>
      <b>Drop Files</b>
      <span>.ymap.xml, .ytyp.xml</span>
    </Container>
  );
};

export default FileImporter;
