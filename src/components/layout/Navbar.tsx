
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Home, Search, PlusSquare, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { CreatePostModal } from '@/components/post/CreatePostModal';

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-instagram-border z-10">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          <div className="text-xl font-semibold">Instagram Clone</div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full ${isActive('/') ? 'text-black' : 'text-gray-500'}`}
              >
                <Home className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full ${isActive('/explore') ? 'text-black' : 'text-gray-500'}`}
              >
                <Search className="h-6 w-6" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-gray-500"
              onClick={() => setCreatePostOpen(true)}
            >
              <PlusSquare className="h-6 w-6" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-8 w-8">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/profile">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <CreatePostModal 
        open={createPostOpen} 
        onOpenChange={setCreatePostOpen} 
      />
    </>
  );
}
