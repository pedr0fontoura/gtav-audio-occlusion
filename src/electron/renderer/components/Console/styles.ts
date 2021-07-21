import styled from 'styled-components';

interface MessageProps {
  $color: string;
}

export const Container = styled.div`
  height: 25%;
  width: 100%;

  flex-shrink: 0;

  padding: 16px;

  background: #000;

  overflow-y: auto;
`;

export const Message = styled.p<MessageProps>`
  color: ${({ $color }) => $color};

  & + p {
    margin-top: 2px;
  }

  span {
    width: 90px;

    display: inline-block;

    margin-right: 8px;

    color: #aaa;
  }
`;
