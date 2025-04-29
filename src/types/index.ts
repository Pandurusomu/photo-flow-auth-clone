
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  liked?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
}
