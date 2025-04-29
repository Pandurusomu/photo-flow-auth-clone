
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader, Image as ImageIcon } from 'lucide-react';
import { createPost } from '@/lib/data';

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated?: () => void;
}

export function CreatePostModal({ open, onOpenChange, onPostCreated }: CreatePostModalProps) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  // For demo purposes, using placeholder images
  const placeholderImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80"
  ];

  const handleSubmit = async () => {
    if (!caption.trim() || !imageUrl) {
      toast({
        title: "Missing details",
        description: "Please add a caption and select an image",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost(caption, imageUrl);
      toast({
        title: "Post created!",
        description: "Your post has been published successfully",
      });
      setCaption('');
      setImageUrl('');
      setPreviewUrl(null);
      onOpenChange(false);
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectImage = (url: string) => {
    setImageUrl(url);
    setPreviewUrl(url);
  };

  // In a real app, this would be a file upload component
  const renderImageSelector = () => (
    <div className="mb-4">
      <p className="text-sm text-gray-500 mb-2">Select an image from our collection:</p>
      <div className="grid grid-cols-2 gap-2">
        {placeholderImages.map((url, index) => (
          <div 
            key={index}
            onClick={() => selectImage(url)}
            className={`cursor-pointer rounded-md overflow-hidden h-24 ${imageUrl === url ? 'ring-2 ring-instagram-primary' : ''}`}
          >
            <img src={url} alt={`Image ${index + 1}`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
        </DialogHeader>
        
        {!previewUrl ? (
          <div className="grid place-items-center py-8">
            {renderImageSelector()}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md overflow-hidden">
              <img src={previewUrl} alt="Preview" className="w-full object-cover" />
            </div>
            
            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        )}
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !imageUrl}
            className="bg-instagram-primary hover:bg-blue-600"
          >
            {isSubmitting ? (
              <>
                <Loader size={16} className="mr-2 animate-spin" /> 
                Posting...
              </>
            ) : (
              "Share"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
