import API from "../api/client";

export default function EmployeeList({ employees, refresh, onSelectEmployee, selectedEmployee, onEmployeeDeleted }) {
  const deleteEmployee = async (employee_id) => {
    if (!window.confirm("Delete employee?")) return;
    await API.delete(`/employees/${employee_id}`);
    refresh();
    if (selectedEmployee && selectedEmployee.employee_id === employee_id) {
      if (onSelectEmployee) onSelectEmployee(null);
      if (onEmployeeDeleted) onEmployeeDeleted();
    }
  };

  if (!employees.length)
    return <p className="text-gray-500">No employees found.</p>;

  const handleSelectEmployee = (emp) => {
    if (onSelectEmployee) {
      onSelectEmployee(emp);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Employees</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-200 bg-gray-50">
              <th className="py-2 px-3 font-semibold text-gray-600">ID</th>
              <th className="py-2 px-3 font-semibold text-gray-600">Name</th>
              <th className="py-2 px-3 font-semibold text-gray-600">Email</th>
              <th className="py-2 px-3 font-semibold text-gray-600">Dept</th>
              <th className="py-2 px-3"></th>
              <th className="py-2 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.employee_id}
                className={`border-b border-gray-100 hover:bg-blue-50 transition ${selectedEmployee && selectedEmployee.employee_id === emp.employee_id ? 'bg-blue-100/60' : ''}`}
              >
                <td className="py-2 px-3 font-mono text-gray-700">{emp.employee_id}</td>
                <td className="py-2 px-3">{emp.full_name}</td>
                <td className="py-2 px-3">{emp.email}</td>
                <td className="py-2 px-3">{emp.department}</td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => deleteEmployee(emp.employee_id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1 rounded transition shadow-sm border border-red-100"
                  >
                    Delete
                  </button>
                </td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => handleSelectEmployee(emp)}
                    className={`bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded transition shadow-sm border border-blue-100 ${selectedEmployee && selectedEmployee.employee_id === emp.employee_id ? 'ring-2 ring-blue-400' : ''}`}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
