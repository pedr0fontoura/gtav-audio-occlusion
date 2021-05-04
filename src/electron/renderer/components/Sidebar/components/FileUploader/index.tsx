import React, { useState, DragEvent } from 'react';
import { FaFileImport, FaRegFile, FaTimes } from 'react-icons/fa';

interface IFileUploaderProps {
  text: string;
  fileType: string;
}

import { Container, Text, RemoveButton } from './styles';

const FileUploader = ({ text, fileType }: IFileUploaderProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File>();

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

    if (!file.name.includes(fileType)) {
      return false;
    }

    return true;
  };

  const handleFile = (file: File): void => {
    if (validateFile(file)) {
      console.log(file);
      setSelectedFile(file);
    }
  };

  const dragDrop = (event: DragEvent): void => {
    event.preventDefault();

    if (selectedFile) return;

    const files = event.dataTransfer.files;

    const file = files[0];

    if (file) {
      handleFile(file);
    }

    setIsDraggingOver(0);
  };

  const removeFile = (): void => {
    setSelectedFile(undefined);
    setIsDraggingOver(0);
  };

  return (
    <Container
      isFileSelected={!!selectedFile}
      isDraggingOver={!!isDraggingOver}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={dragDrop}
    >
      {selectedFile ? (
        <>
          <FaRegFile size={20} />
          <Text>{selectedFile.name}</Text>
          <RemoveButton onClick={removeFile}>
            <FaTimes size={14} />
          </RemoveButton>
        </>
      ) : (
        <>
          <FaFileImport size={20} />
          <Text>{text}</Text>
        </>
      )}
    </Container>
  );
};

export default FileUploader;
