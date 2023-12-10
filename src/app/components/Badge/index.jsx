import React from 'react'

import { DefaultBadge } from './styles'

const Badge = ({ children, ...props }) => {

  let statusColor = ''
  switch(props?.statusBadge){
    case 'VALIDO':
      statusColor = '#138D75'
      break;
    case 'AG_VALIDACAO':
      statusColor = '#3498DB'
      break;
    case 'BLOCO_EM_VALIDACAO':
      statusColor = '#D68910'
      break;
    default:
      statusColor = 'white'
      break;
  }

  return (
    <DefaultBadge {...props} statusColor={statusColor}>
      <text>
        {children}
      </text>
    </DefaultBadge>
  )
}

export { Badge }
