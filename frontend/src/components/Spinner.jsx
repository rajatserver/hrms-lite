export default function Spinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <span className="text-sm font-medium text-slate-500 animate-pulse">Syncing data...</span>
    </div>
  );
}
