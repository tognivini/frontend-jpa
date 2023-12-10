import styled from 'styled-components'

export const DefaultBadge = styled.div`
  font-weight: bold;
  font-size: 12px;
  border: solid 1.4px;
  border-radius: 3px;
  border-color: ${({ statusColor }) => statusColor ? statusColor : 'green'};
  background-color: ${({ statusColor }) => statusColor ? statusColor : 'green'};
  height: 18px;
  width: auto;
`