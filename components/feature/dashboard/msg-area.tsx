import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Smile, Mic, Send } from 'lucide-react'

export function MessageArea() {
  const messages = [
    { id: 1, sender: "John Doe", content: "Hey everyone! How's it going?", time: "10:30 AM" },
    { id: 2, sender: "Jane Smith", content: "Hi John! All good here. How about you?", time: "10:32 AM" },
    { id: 3, sender: "You", content: "Hello! I'm doing great, thanks for asking!", time: "10:35 AM" },
    // Add more messages as needed
  ]

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.sender === "You" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              <p className="font-semibold">{message.sender}</p>
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">{message.time}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input type="text" placeholder="Write a message..." className="flex-1" />
          <Button variant="ghost" size="icon">
            <Smile className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

