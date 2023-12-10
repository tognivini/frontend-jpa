import React from 'react'

import { DefaultBadge } from './styles'

const Badge = ({ children, ...props }) => {

  let statusColor = ''
  switch(props?.statusBadge){
    case 'VALIDO':
      statusColor = 'green'
      break;
    case 'AG_VALIDACAO':
      statusColor = 'blue'
      break;
    case 'BLOCO_EM_VALIDACAO':
      statusColor = 'orange'
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
