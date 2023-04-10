import React from "react";
import { Link, useRouteError } from "react-router-dom";

type ErrorResponse = {
  data: any;
  status: number;
  statusText: string;
  message?: string;
};

const NotFoundPage: React.FC = () => {
  const error = useRouteError() as ErrorResponse;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 bg-gray-900">
      <h1 className="text-8xl font-bold text-red-600">Error!</h1>
      <p className="text-4xl font-medium text-white">{error?.statusText || error?.message}</p>
      <Link to="/" className="text-xl text-sky-400 underline">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
