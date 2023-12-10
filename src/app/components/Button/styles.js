import styled, { css } from 'styled-components'

const fullWidthStyle = css`
  width: 100%;
`
export const DefaultButton = styled.button`
  font-weight: bold;
  outline: none;
  user-select: none;
  border: solid 1.4px
  outline: none;
  border-radius: 8px;
  width: fit-content;

  ${({ fullWidth }) => fullWidth && fullWidthStyle}

  display: flex;
  align-items: center;
  
  cursor: pointer;
  letter-spacing: 0.16px;
`