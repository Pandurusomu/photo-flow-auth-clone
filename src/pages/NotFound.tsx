
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-instagram-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Sorry, this page isn't available.</p>
        <p className="text-gray-500 mb-8">
          The link you followed may be broken, or the page may have been removed.
        </p>
        <Link to="/">
          <Button className="bg-instagram-primary hover:bg-blue-600">
            Go back to Instagram
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
