import styled, { css } from 'styled-components'

const hugeCardStyle = css`
  width: 850px;
`

const simpleCardStyle = css`
  width: 350px;
`

export const Card = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px;
    /* width: 350px; */
    height:400px;
    border: 2px solid white;
    border-radius: var(--border-radius);
    margin: 10px 10px;
    /* background-color: #222222; */
    ${({ hugeCard }) => hugeCard ? hugeCardStyle : simpleCardStyle}

`

export const Row = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
`