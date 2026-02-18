export default function AttendanceList({ records, employee }) {
  if (!employee) return null;
  const filteredRecords = records?.filter((rec) => rec.employee_id === employee.employee_id) || [];
  if (!filteredRecords.length)
    return <p className="text-gray-500">No attendance records for this employee.</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Attendance Records</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-2 px-3 font-semibold text-gray-600 text-left">Date</th>
              <th className="py-2 px-3 font-semibold text-gray-600 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((rec) => (
              <tr key={rec.id || rec.attendance_id} className="border-b border-gray-100 hover:bg-green-50 transition">
                <td className="py-2 px-3 font-mono text-gray-700 text-left align-middle">{rec.date}</td>
                <td className="py-2 px-3 text-center align-middle">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${rec.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{rec.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
