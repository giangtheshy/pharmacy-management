import React, { FC } from 'react'

interface PropsPartner<T>{
  ele?:T
}
const Partner= <T extends object>(props:PropsPartner<T>) => {
  return (
    <div>Partner</div>
  )
}

export default Partner