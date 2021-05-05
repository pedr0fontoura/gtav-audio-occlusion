import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import FileImporter from './components/FileImporter';

import { Container, TableContainer, RemoveBtn } from './styles';

const Home = () => {
  const [importedFiles, setImportedFiles] = useState([]);

  const handleFileImport = (file: File): void => {
    const isFileAlreadyImported = importedFiles.find(
      importedFile => importedFile.path === file.path,
    );

    if (isFileAlreadyImported) return;

    setImportedFiles(oldValue => [file, ...oldValue]);
  };

  const removeFile = (path: string): void => {
    console.log('removing', path);
    setImportedFiles(files => files.filter(file => file.path !== path));
  };

  return (
    <Container>
      <FileImporter onFileImport={handleFileImport} />
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Path</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {importedFiles.map(file => (
              <tr key={file.path}>
                <td>{file.name}</td>
                <td>{file.path}</td>
                <td>
                  <RemoveBtn onClick={() => removeFile(file.path)}>
                    <FaTimes size={16} />
                  </RemoveBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default Home;
