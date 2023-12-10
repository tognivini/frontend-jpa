import styled from 'styled-components'

export const DefaultBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 10px;
  border: solid 1.4px;
  border-radius: 3px;
  border-color: ${({ statusColor }) => statusColor ? statusColor : '#138D75'};
  background-color: ${({ statusColor }) => statusColor ? statusColor : '#138D75'};
  height: 18px;
  width: 135px;

  color: #fff;
`