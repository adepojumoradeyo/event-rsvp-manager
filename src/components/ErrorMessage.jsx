function ErrorMessage({ message }) {
  if (!message) return null;

  return <p className="text-gray-500 mt-2">{message}</p>;
}

export default ErrorMessage;
