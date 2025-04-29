
import React, { useState, useEffect } from 'react';
import { ProtectedLayout } from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Post } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { fetchPostsByUser } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';
import { Grid3X3 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!user?.id) return;

    const loadUserPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsByUser(user.id);
        setPosts(fetchedPosts);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile posts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserPosts();
  }, [user, toast]);

  if (!user) return null;

  return (
    <ProtectedLayout>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
          <Avatar className="h-24 w-24 md:h-36 md:w-36">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl">{user.username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-xl font-semibold">{user.username}</h1>
              <Button variant="outline" size="sm">Edit Profile</Button>
            </div>
            
            <div className="flex gap-6 mb-4">
              <div className="text-center md:text-left">
                <span className="font-semibold">{posts.length}</span>{' '}
                <span className="text-gray-500">posts</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold">{user.followers || 0}</span>{' '}
                <span className="text-gray-500">followers</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold">{user.following || 0}</span>{' '}
                <span className="text-gray-500">following</span>
              </div>
            </div>
            
            {user.bio && (
              <p className="text-sm text-center md:text-left">{user.bio}</p>
            )}
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        {/* Profile Content */}
        <Tabs defaultValue="posts">
          <TabsList className="w-full justify-center mb-6">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              <span>Posts</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            {isLoading ? (
              <div className="grid grid-cols-3 gap-1">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full" />
                ))}
              </div>
            ) : (
              <>
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="font-semibold mb-2">No Posts Yet</h3>
                    <p className="text-gray-500">When you share photos, they'll appear here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
                    {posts.map((post) => (
                      <div key={post.id} className="aspect-square">
                        <img
                          src={post.imageUrl}
                          alt={post.caption}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedLayout>
  );
}
