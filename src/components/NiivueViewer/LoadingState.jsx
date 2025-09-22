const LoadingState = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-2"></div>
        <p className="text-stone-600 text-sm font-medium">Loading image...</p>
      </div>
    </div>
  );
};

export default LoadingState;
