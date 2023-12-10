import styled, { css } from 'styled-components'

const fullWidthStyle = css`
  width: 100%;
`
const transparentCss = css`
  /* border: 1px solid transparent !important;

  text-decoration-line: underline !important;

  background: transparent;

  padding: 0 !important;
  font-weight: 500; */

  /* :hover {
    color: ${({ color }) => colors[color] || colors.blueGreenLight} !important;
    svg {
      color: ${({ color }) => colors[color] || colors.blueGreenLight} !important;
    }
    background: transparent !important;
  } */
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

  ${({ transparent }) => transparent && transparentCss}
`