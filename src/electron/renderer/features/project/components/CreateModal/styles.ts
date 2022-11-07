import styled, { keyframes } from 'styled-components';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const overlayShow = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const contentShow = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const Dialog = DialogPrimitive.Root;

export const Portal = styled(DialogPrimitive.Portal)`
  margin: none;
`;

export const Overlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;

  margin: none;

  background: rgba(0, 0, 0, 0.8);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

export const Content = styled(DialogPrimitive.Content)`
  position: fixed;
  top: 50%;
  left: 50%;

  width: 40rem;
  margin: none;

  display: flex;
  flex-direction: column;

  border-radius: 8px;

  background: ${({ theme }) => theme.colors.gray[800]};

  transform: translate(-50%, -50%);

  overflow: hidden;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

export const Header = styled.div`
  height: 32px;

  padding: 16px;

  background: ${({ theme }) => theme.colors.gray[700]};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(DialogPrimitive.Title)`
  font-size: 0.9em;
  font-weight: normal;
`;

export const Close = styled(DialogPrimitive.Close)`
  border: none;
  outline: none;

  display: flex;
  justify-content: center;
  align-items: center;

  background: none;

  color: white;

  &:hover {
    cursor: pointer;

    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 16px;

  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;

  & + & {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray[700]};
  }
`;

export const Entry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.div`
  height: 32px;
  max-width: 80%;

  flex-grow: 1;
`;

export const TextInput = styled.input`
  height: 100%;
  width: 100%;

  padding: 8px;

  border: none;
  border-radius: 8px;

  font-family: 'Inter';
  font-size: 0.9em;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[400]};

  background: ${({ theme }) => theme.colors.gray[900]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const FileInput = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilePath = styled.p`
  width: 80%;

  font-size: 0.9em;
  color: white;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SelectFileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  padding: 4px;

  font-size: 0.8em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[900]};
  text-transform: lowercase;

  border: none;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.rose[600]};

  transition: background 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.rose[700]};
  }
`;

export const CreateButton = styled.button`
  height: 40px;
  width: 320px;

  margin: 16px auto 0 auto;

  padding: 8px;

  font-size: 0.8em;
  font-weight: 500;
  color: white;
  text-transform: uppercase;

  border: none;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.rose[600]};

  transition: background 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.rose[700]};
  }
`;
