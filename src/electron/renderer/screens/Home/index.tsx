import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { FaTimes, FaPlus, FaFileDownload } from 'react-icons/fa';

import FileImporter from './components/FileImporter';

import { Container, TableContainer, TableSection, Button } from './styles';

interface ResourceFile {
  name: string;
  path: string;
}

const Home = () => {
  const [files, setFiles] = useState<ResourceFile[]>([]);

  const ymapFile = files.find(file => file.name.includes('.ymap'));
  const ytypFile = files.find(file => file.name.includes('.ytyp'));

  const ymtFile = files.find(file => file.name.includes('.ymt'));
  const dat15File = files.find(file => file.name.includes('_mix.dat15'));
  const dat151File = files.find(file => file.name.includes('_game.dat151'));

  const isGeneratedAreaEnabled = ymapFile && ytypFile;

  const importFile = (file: File): void => {
    const isFileAlreadyImported = files.find(f => f.path === file.path);

    if (isFileAlreadyImported) return;

    setFiles(oldValue => [file, ...oldValue]);

    const { name, path } = file;

    ipcRenderer.send('importFile', JSON.stringify({ name, path }));
  };

  const removeFile = (file: ResourceFile): void => {
    const isRemovedFileASourceFile = file.path.includes('.ymap') || file.path.includes('.ytyp');

    setFiles(oldFiles =>
      oldFiles.filter(f => {
        const isRemovedFile = f.path === file.path;

        if (isRemovedFile) return false;

        if (isRemovedFileASourceFile) {
          if (ymtFile && ymtFile.path === f.path) return false;

          if (dat15File && dat15File.path === f.path) return false;

          if (dat151File && dat151File.path === f.path) return false;
        }

        return true;
      }),
    );

    const { name, path } = file;

    ipcRenderer.send('removeFile', JSON.stringify({ name, path }));
  };

  const handleGenerateAudioOcclusion = async (): Promise<void> => {
    const audioOcclusion: ResourceFile = await ipcRenderer.invoke('generateAudioOcclusion');

    setFiles(oldFiles => [...oldFiles, audioOcclusion]);
  };

  const handleGenerateAudioDynamixData = async (): Promise<void> => {
    const audioDynamixData: ResourceFile = await ipcRenderer.invoke('generateAudioDynamixData');

    setFiles(oldFiles => [...oldFiles, audioDynamixData]);
  };

  const handleGenerateAudioGameData = async (): Promise<void> => {
    const audioGameData: ResourceFile = await ipcRenderer.invoke('generateAudioGameData');

    setFiles(oldFiles => [...oldFiles, audioGameData]);
  };

  const handleWriteAudioOcclusion = async (): Promise<void> => {
    ipcRenderer.send('writeAudioOcclusion');
  };

  const handleWriteAudioDynamixData = async (): Promise<void> => {
    ipcRenderer.send('writeAudioDynamixData');
  };

  const handleWriteAudioGameData = async (): Promise<void> => {
    ipcRenderer.send('writeAudioGameData');
  };

  useEffect(() => {
    (async () => {
      const result: File[] = await ipcRenderer.invoke('getFiles');

      setFiles(result);
    })();
  }, []);

  return (
    <Container>
      <FileImporter onFileImport={importFile} />
      <TableContainer>
        <TableSection>
          <strong>Source</strong>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>File</th>
                <th>Path</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>ymap</td>
                <td>{ymapFile ? ymapFile.name : '...'}</td>
                <td>{ymapFile ? ymapFile.path : '...'}</td>
                <td>
                  {ymapFile && (
                    <Button onClick={() => removeFile(ymapFile)}>
                      <FaTimes size={16} />
                    </Button>
                  )}
                </td>
              </tr>
              <tr>
                <td>ytyp</td>
                <td>{ytypFile ? ytypFile.name : '...'}</td>
                <td>{ytypFile ? ytypFile.path : '...'}</td>
                <td>
                  {ytypFile && (
                    <Button onClick={() => removeFile(ytypFile)}>
                      <FaTimes size={16} />
                    </Button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </TableSection>

        <TableSection disabled={!isGeneratedAreaEnabled}>
          <strong>Generated</strong>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>File</th>
                <th>Dest file path</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>AudioOcclusion</td>
                <td>{ymtFile ? ymtFile.name : '...'}</td>
                <td>{ymtFile ? ymtFile.path : '...'}</td>
                <td>
                  {isGeneratedAreaEnabled && !ymtFile && (
                    <Button onClick={handleGenerateAudioOcclusion}>
                      <FaPlus size={16} />
                    </Button>
                  )}
                  {ymtFile && (
                    <>
                      <Button onClick={handleWriteAudioOcclusion}>
                        <FaFileDownload size={16} />
                      </Button>
                      <Button onClick={() => removeFile(ymtFile)}>
                        <FaTimes size={16} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>

              <tr>
                <td>AudioDynamixData</td>
                <td>{dat15File ? dat15File.name : '...'}</td>
                <td>{dat15File ? dat15File.path : '...'}</td>
                <td>
                  {isGeneratedAreaEnabled && !dat15File && (
                    <Button onClick={handleGenerateAudioDynamixData}>
                      <FaPlus size={16} />
                    </Button>
                  )}
                  {dat15File && (
                    <>
                      <Button onClick={handleWriteAudioDynamixData}>
                        <FaFileDownload size={16} />
                      </Button>
                      <Button onClick={() => removeFile(dat15File)}>
                        <FaTimes size={16} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>

              <tr>
                <td>AudioGameData</td>
                <td>{dat151File ? dat151File.name : '...'}</td>
                <td>{dat151File ? dat151File.path : '...'}</td>
                <td>
                  {isGeneratedAreaEnabled && dat15File && !dat151File && (
                    <Button onClick={handleGenerateAudioGameData}>
                      <FaPlus size={16} />
                    </Button>
                  )}
                  {dat151File && (
                    <>
                      <Button onClick={handleWriteAudioGameData}>
                        <FaFileDownload size={16} />
                      </Button>
                      <Button onClick={() => removeFile(dat151File)}>
                        <FaTimes size={16} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </TableSection>
      </TableContainer>
    </Container>
  );
};

export default Home;
