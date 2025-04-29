
import React, { useState } from 'react';
import { Post } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatDistance } from 'date-fns';
import { Heart, MessageCircle, Bookmark, Send, MoreHorizontal, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { likePost, unlikePost, addComment } from '@/lib/data';

interface PostItemProps {
  post: Post;
  onPostUpdate?: (updatedPost: Post) => void;
}

export function PostItem({ post, onPostUpdate }: PostItemProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();
  
  const handleLikeToggle = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      let updatedPost;
      if (post.liked) {
        updatedPost = await unlikePost(post.id);
      } else {
        updatedPost = await likePost(post.id);
      }
      if (onPostUpdate) {
        onPostUpdate(updatedPost);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmittingComment) return;
    
    setIsSubmittingComment(true);
    try {
      await addComment(post.id, comment);
      setComment('');
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      });
      // Refresh post data to show new comment
      // This would be handled better with a proper data fetching library
      if (onPostUpdate) {
        const updatedPost = { ...post };
        onPostUpdate(updatedPost);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <Card className="mb-6 overflow-hidden border-instagram-border">
      <CardHeader className="p-4 flex flex-row items-center space-y-0">
        <div className="flex items-center flex-1">
          <Link to={`/profile/${post.user.id}`} className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={post.user.avatar} alt={post.user.username} />
              <AvatarFallback>{post.user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{post.user.username}</span>
          </Link>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <div className="relative pb-[100%]">
        <img 
          src={post.imageUrl} 
          alt={post.caption}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:text-instagram-red"
              onClick={handleLikeToggle}
              disabled={isLiking}
            >
              {post.liked ? (
                <Heart className="h-6 w-6 fill-instagram-red text-instagram-red" />
              ) : (
                <Heart className="h-6 w-6" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full ml-auto">
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="mb-2">
          <p className="font-medium">{post.likes} likes</p>
        </div>
        
        <div className="mb-2">
          <Link to={`/profile/${post.user.id}`} className="font-medium mr-2">
            {post.user.username}
          </Link>
          <span>{post.caption}</span>
        </div>
        
        {post.comments.length > 0 && (
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-sm text-gray-500 mb-2"
          >
            {showComments ? "Hide comments" : `View all ${post.comments.length} comments`}
          </button>
        )}
        
        {showComments && post.comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <Link to={`/profile/${comment.user.id}`} className="font-medium mr-2">
              {comment.user.username}
            </Link>
            <span>{comment.text}</span>
          </div>
        ))}
        
        <p className="text-xs text-gray-500 mt-2">
          {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <form onSubmit={handleCommentSubmit} className="w-full flex">
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none focus-visible:ring-0 flex-1 px-0"
          />
          {comment.trim() && (
            <Button 
              type="submit" 
              variant="ghost" 
              className="font-semibold text-instagram-primary"
              disabled={isSubmittingComment}
            >
              Post
            </Button>
          )}
        </form>
      </CardFooter>
    </Card>
  );
}
