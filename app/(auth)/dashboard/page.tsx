'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/feature/dashboard/chat-sidebar'
import { ChatArea } from '@/components/feature/dashboard/chat-area'

export default function WhatsAppDashboard() {
  const [activeChat, setActiveChat] = useState<number | null>(null)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatArea activeChat={activeChat} />
    </div>
  )
}

