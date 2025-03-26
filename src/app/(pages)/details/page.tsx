import FilesDetails from '@/app/components/FilesDetails'
import UsersDetails from '@/app/components/UsersDetails'
import React from 'react'

export default function page() {
  return (
    <section className='w-full min-h-screen flex items-start justify-center p-4'>
        <FilesDetails />
        <UsersDetails />
    </section>
  )
}
