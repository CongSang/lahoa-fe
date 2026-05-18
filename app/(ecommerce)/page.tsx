import { Loading } from '@/components/common'
import React from 'react'

export interface HomeProps {}

const HomePage = (homeProps: HomeProps) => {
  return (
    <div className='mt-10'><Loading /></div>
  )
}

export default HomePage