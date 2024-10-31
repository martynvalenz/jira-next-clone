import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DottedDashSeparator from './DottedDashSeparator'
import Navigation from './Navigation'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'

const Sidebar = () => {
  return (
    <aside className='h-full bg-neutral-100 p-4 w-full'>
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={140} height={32} />
      </Link>
      <DottedDashSeparator className='my-4' />
      <WorkspaceSwitcher />
      <DottedDashSeparator className='my-4' />
      <Navigation/>
    </aside>
  )
}

export default Sidebar