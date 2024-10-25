'use client'

import { cn } from '@/lib/utils'
import { SettingsIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go'
const routes = [
  {
    label: 'Home',
    href: '/',
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: 'My Tasks',
    href: '/tasks',
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: 'Settings',
    href: '/',
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: 'Members',
    href: '/members',
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
]

const Navigation = () => {
  return (
    <ul className='flex flex-col'>
      {
        routes.map((route) => {
          const isActive = false;
          const Icon = isActive ? route.activeIcon : route.icon;

          return (
            <li key={route.href}>
              <Link 
              className={cn('flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500',
                isActive && 'bg-white shadow-sm hover:opacity-100 text-primary')} 
                href={route.href}
              >
                <Icon className='size-5' />
                <div>{route.label}</div>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Navigation