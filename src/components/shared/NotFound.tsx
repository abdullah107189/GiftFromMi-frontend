import { Link } from "react-router";
import { Button } from "../ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* Simple 404 Text */}
        <div className="mb-6">
          <div className="text-8xl md:text-9xl font-bold text-primary/30">
            404
          </div>
        </div>

        {/* Message */}
        <h1 className="md:text-2xl text-xl font-semibold mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link to="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
