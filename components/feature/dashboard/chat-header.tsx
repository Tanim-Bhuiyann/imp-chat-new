import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paperclip, Smile, Mic, Send, MoreVertical, Search, Phone, Video } from 'lucide-react'

interface ChatAreaProps {
  activeChat: number | null
}

export function ChatArea({ activeChat }: ChatAreaProps) {
  const [message, setMessage] = useState('')
  const [chatData, setChatData] = useState<{
    name: string;
    status: string;
    messages: { id: number; sender: string; content: string; time: string }[];
  } | null>(null)

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockChats = {
      1: {
        name: "John Doe",
        status: "Online",
        messages: [
          { id: 1, sender: "John Doe", content: "Hey! How's it going?", time: "10:30 AM" },
          { id: 2, sender: "You", content: "Hi John! All good here. How about you?", time: "10:32 AM" },
          { id: 3, sender: "John Doe", content: "I'm doing great, thanks for asking!", time: "10:35 AM" },
        ]
      },
      2: {
        name: "Jane Smith",
        status: "Last seen today at 9:15 AM",
        messages: [
          { id: 1, sender: "Jane Smith", content: "Hello! Are we still on for tomorrow's meeting?", time: "Yesterday" },
          { id: 2, sender: "You", content: "Hi Jane! Yes, absolutely. 2 PM, right?", time: "Yesterday" },
          { id: 3, sender: "Jane Smith", content: "Perfect! See you then.", time: "Yesterday" },
        ]
      },
      3: {
        name: "Work Group",
        status: "5 participants",
        messages: [
          { id: 1, sender: "Alice", content: "Team, here's the latest project update.", time: "10:20 AM" },
          { id: 2, sender: "Bob", content: "Thanks, Alice. I'll review it shortly.", time: "10:22 AM" },
          { id: 3, sender: "You", content: "Great work everyone!", time: "10:25 AM" },
        ]
      },
    }

    if (activeChat) {
      setChatData(mockChats[activeChat as keyof typeof mockChats])
    } else {
      setChatData(null)
    }
  }, [activeChat])

  const handleSend = () => {
    if (message.trim() && chatData) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message)
      setChatData(prevData => ({
        ...prevData!,
        messages: [
          ...prevData!.messages,
          { id: prevData!.messages.length + 1, sender: "You", content: message, time: "Just now" }
        ]
      }))
      setMessage('')
    }
  }

  if (!chatData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#e5ddd5] dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Select a chat to start messaging</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-[#e5ddd5] dark:bg-gray-900">
      <header className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage src={`/placeholder-avatar-${activeChat}.jpg`} alt={chatData.name} />
            <AvatarFallback>{chatData.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{chatData.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{chatData.status}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4">
        {chatData.messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === "You"
                  ? "bg-[#dcf8c6] dark:bg-green-700"
                  : "bg-white dark:bg-gray-700"
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{message.time}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Smile className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-6 w-6" />
          </Button>
          <Input 
            type="text" 
            placeholder="Type a message" 
            className="flex-1" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="ghost" size="icon" onClick={handleSend}>
            {message.trim() ? <Send className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

