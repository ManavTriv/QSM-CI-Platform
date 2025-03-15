const ErrorMessage = ({ message }) => (
  <div className="flex justify-center">
    <div className="inline-block p-4 text-red-600 bg-red-100 border border-red-400 rounded-lg">
      Error loading data: {message}
    </div>
  </div>
);

export default ErrorMessage;
