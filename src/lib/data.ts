
import { Post, User, Comment } from '@/types';
import { getCurrentUser } from './auth';

// Mock data for our prototype
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    user: {
      id: "1",
      username: "johndoe",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80",
    caption: "Working from home today #productivity",
    likes: 42,
    comments: [
      {
        id: "c1",
        user: {
          id: "2",
          username: "janedoe",
          email: "jane@example.com",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        text: "Love your setup!",
        createdAt: "2023-06-15T10:12:00Z",
      }
    ],
    createdAt: "2023-06-15T09:45:00Z",
  },
  {
    id: "2",
    user: {
      id: "2",
      username: "janedoe",
      email: "jane@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80",
    caption: "New tech setup complete! #tech #coding",
    likes: 89,
    comments: [],
    createdAt: "2023-06-14T14:23:00Z",
  },
  {
    id: "3",
    user: {
      id: "1",
      username: "johndoe",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80",
    caption: "Remote work life #digital #nomad",
    likes: 124,
    comments: [
      {
        id: "c2",
        user: {
          id: "2",
          username: "janedoe",
          email: "jane@example.com",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        text: "This looks amazing!",
        createdAt: "2023-06-13T16:05:00Z",
      }
    ],
    createdAt: "2023-06-13T15:30:00Z",
  },
  {
    id: "4",
    user: {
      id: "2",
      username: "janedoe",
      email: "jane@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80",
    caption: "Office days are productive days! #work #office",
    likes: 67,
    comments: [],
    createdAt: "2023-06-12T11:20:00Z",
  },
  {
    id: "5",
    user: {
      id: "1",
      username: "johndoe",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80",
    caption: "Home sweet home #interiordesign",
    likes: 154,
    comments: [],
    createdAt: "2023-06-10T18:45:00Z",
  }
];

// Helper functions to interact with the mock data
export function fetchPosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      const postsWithLikeStatus = MOCK_POSTS.map(post => ({
        ...post,
        liked: Math.random() > 0.5 // Randomly set like status for demo purposes
      }));
      resolve(postsWithLikeStatus);
    }, 800);
  });
}

export function fetchPostsByUser(userId: string): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userPosts = MOCK_POSTS.filter(post => post.user.id === userId);
      resolve(userPosts);
    }, 500);
  });
}

export function likePost(postId: string): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const postIndex = MOCK_POSTS.findIndex(post => post.id === postId);
      
      if (postIndex === -1) {
        reject(new Error("Post not found"));
        return;
      }

      const updatedPost = { 
        ...MOCK_POSTS[postIndex],
        likes: MOCK_POSTS[postIndex].likes + 1,
        liked: true
      };
      
      MOCK_POSTS[postIndex] = updatedPost;
      resolve(updatedPost);
    }, 300);
  });
}

export function unlikePost(postId: string): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const postIndex = MOCK_POSTS.findIndex(post => post.id === postId);
      
      if (postIndex === -1) {
        reject(new Error("Post not found"));
        return;
      }

      const updatedPost = { 
        ...MOCK_POSTS[postIndex],
        likes: Math.max(0, MOCK_POSTS[postIndex].likes - 1),
        liked: false
      };
      
      MOCK_POSTS[postIndex] = updatedPost;
      resolve(updatedPost);
    }, 300);
  });
}

export function addComment(postId: string, text: string): Promise<Comment> {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      reject(new Error("User not authenticated"));
      return;
    }
    
    setTimeout(() => {
      const postIndex = MOCK_POSTS.findIndex(post => post.id === postId);
      
      if (postIndex === -1) {
        reject(new Error("Post not found"));
        return;
      }

      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        user: currentUser,
        text,
        createdAt: new Date().toISOString(),
      };
      
      MOCK_POSTS[postIndex].comments.push(newComment);
      resolve(newComment);
    }, 300);
  });
}

export function createPost(caption: string, imageUrl: string): Promise<Post> {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      reject(new Error("User not authenticated"));
      return;
    }
    
    setTimeout(() => {
      const newPost: Post = {
        id: Math.random().toString(36).substr(2, 9),
        user: currentUser,
        imageUrl,
        caption,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
        liked: false,
      };
      
      MOCK_POSTS.unshift(newPost); // Add to the beginning of the array
      resolve(newPost);
    }, 500);
  });
}
