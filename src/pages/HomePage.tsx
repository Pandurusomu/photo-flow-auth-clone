
import React, { useState, useEffect } from 'react';
import { ProtectedLayout } from '@/components/layout/Layout';
import { PostItem } from '@/components/post/PostItem';
import { Skeleton } from '@/components/ui/skeleton';
import { Post } from '@/types';
import { fetchPosts } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load posts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [toast]);

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  return (
    <ProtectedLayout>
      <div className="container mx-auto max-w-lg px-4 py-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-[400px] w-full" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          ))
        ) : (
          <>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts yet. Follow users to see their posts!</p>
              </div>
            ) : (
              posts.map(post => (
                <PostItem 
                  key={post.id} 
                  post={post} 
                  onPostUpdate={handlePostUpdate}
                />
              ))
            )}
          </>
        )}
      </div>
    </ProtectedLayout>
  );
}
