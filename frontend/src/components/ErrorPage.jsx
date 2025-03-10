import { Link } from 'react-router-dom';  // Importing Link from react-router-dom for navigation

// ErrorPage Component to display 404 Error
export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-white bg-black">
      {/* Displaying the 404 error message */}
      <h1 className="text-5xl font-bold">404</h1>

      {/* Displaying the page not found message */}
      <p className="text-xl mt-4">Oops! Page not found.</p>

      {/* Link to navigate back to the Home page */}
      <Link to="/" className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md">
        Go to Home
      </Link>
    </div>
  );
}
