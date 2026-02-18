export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-10" role="status" aria-label="Loading">
      <span className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></span>
    </div>
  );
}
