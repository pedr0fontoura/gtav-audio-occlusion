import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import FileImporter from './components/FileImporter';

import { Container, TableContainer } from './styles';

const Home = () => {
  const [importedFiles, setImportedFiles] = useState([]);

  const handleFileImport = (file: File) => {
    setImportedFiles(oldValue => [file, ...oldValue]);
  };

  return (
    <Container>
      <FileImporter onFileImport={handleFileImport} />
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Files</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {importedFiles.map(file => (
              <tr key={file.path}>
                <td>{file.name}</td>
                <td>
                  <FaTimes size={16} />
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
