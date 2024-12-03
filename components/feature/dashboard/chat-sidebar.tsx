import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MoreVertical, MessageCircle, Archive, Star, Settings, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarProps {
  activeChat: number | null
  setActiveChat: (id: number) => void
}

export function Sidebar({ activeChat, setActiveChat }: SidebarProps) {
  const chats = [
    { id: 1, name: "John Doe", message: "Hey, how are you?", time: "12:30 PM", unread: 2 },
    { id: 2, name: "Jane Smith", message: "Can we meet tomorrow?", time: "11:45 AM", unread: 0 },
    { id: 3, name: "Work Group", message: "New project update!", time: "10:20 AM", unread: 5 },
    { id: 4, name: "Family Group", message: "Mom: Don't forget the dinner on Sunday!", time: "09:15 AM", unread: 1 },
    { id: 5, name: "Alice Johnson", message: "The presentation went well!", time: "Yesterday", unread: 0 },
  ]

  return (
    <div className="w-80 bg-white dark:bg-gray-800 flex flex-col border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 bg-gray-100 dark:bg-gray-900 flex items-center justify-between">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>
      </div>
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input type="text" placeholder="Search or start new chat" className="pl-10 bg-gray-100 dark:bg-gray-700" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {chats.map((chat) => (
          <div 
            key={chat.id} 
            className={`flex items-center p-3 cursor-pointer ${
              activeChat === chat.id ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveChat(chat.id)}
          >
            <Avatar className="mr-3">
              <AvatarImage src={`/placeholder-avatar-${chat.id}.jpg`} alt={chat.name} />
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{chat.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{chat.message}</p>
                {chat.unread > 0 && (
                  <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="mr-2">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              <span>Starred messages</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              <span>Archived chats</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

