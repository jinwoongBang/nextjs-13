import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

interface Props {
  children?: React.ReactNode
}
const NextLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar></Navbar>
      <div className="mt-20 p-10 min-h-[80vh]">{children}</div>
      <Footer></Footer>
    </>
  )
}

export default NextLayout
