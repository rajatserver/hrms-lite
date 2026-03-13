import API from "../api/client";

export default function EmployeeList({ employees, refresh, onSelectEmployee, selectedEmployee, onEmployeeDeleted }) {
  const deleteEmployee = async (employee_id) => {
    if (!window.confirm("Are you sure you want to remove this employee?")) return;
    try {
      await API.delete(`/employees/${employee_id}`);
      refresh();
      if (selectedEmployee && selectedEmployee.employee_id === employee_id) {
        if (onSelectEmployee) onSelectEmployee(null);
        if (onEmployeeDeleted) onEmployeeDeleted();
      }
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  const handleSelectEmployee = (emp) => {
    if (onSelectEmployee) {
      onSelectEmployee(emp);
    }
  };

  if (!employees.length)
    return (
      <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No employees found</h3>
        <p className="text-slate-500 max-w-xs mt-1">Start by adding your first team member using the form on the left.</p>
      </div>
    );

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900">Employee Directory</h2>
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {employees.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-100 bg-slate-50/30">
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Profile</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr
                key={emp.employee_id}
                className={`hover:bg-indigo-50/30 transition-colors group ${selectedEmployee && selectedEmployee.employee_id === emp.employee_id ? 'bg-indigo-50/50' : ''}`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {emp.full_name ? emp.full_name.split(' ').map(w => w.charAt(0).toUpperCase()).join('') : ''}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 leading-tight">{emp.full_name ? emp.full_name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : ''}</div>
                      <div className="text-xs text-slate-500 mt-1">Employee ID: {emp.employee_id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-slate-600">{emp.email}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                    {emp.department}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleSelectEmployee(emp)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${selectedEmployee && selectedEmployee.employee_id === emp.employee_id ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                    >
                      {selectedEmployee && selectedEmployee.employee_id === emp.employee_id ? 'Active' : 'Manage'}
                    </button>
                    <button
                      onClick={() => deleteEmployee(emp.employee_id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Employee"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
