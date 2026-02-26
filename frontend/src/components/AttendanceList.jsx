export default function AttendanceList({ records, employee }) {
  if (!employee) return null;
  const filteredRecords = records?.filter((rec) => rec.employee_id === employee.employee_id) || [];
  
  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200/60 bg-white/50">
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">Date</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-700 text-left">
                    {new Date(rec.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      rec.status === 'Present' 
                        ? 'bg-green-50 text-green-700 border-green-100' 
                        : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-xs text-slate-400 font-mono">#ID-{rec.id}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-12 text-center text-slate-400 text-sm italic">
                  No attendance records logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
