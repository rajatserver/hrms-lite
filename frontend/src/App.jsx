import { useEffect, useState } from "react";
import API from "./api/client";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";
import Spinner from "./components/Spinner";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await API.get("/employees");
    setEmployees(res.data);
    setLoading(false);
  };

  const fetchAttendance = async (employee_id) => {
    const res = await API.get(`/attendance/${employee_id}`);
    setAttendance(res.data);
  };

  const handleSelectEmployee = (emp) => {
    setSelectedEmployee(emp);
    if (emp && emp.employee_id) {
      fetchAttendance(emp.employee_id);
    } else {
      setAttendance([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-2 md:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 drop-shadow-sm">HRMS Lite</h1>
          <span className="text-sm text-gray-400 mt-2 md:mt-0">Modern HR Management</span>
        </header>

        <section className="mb-8">
          <EmployeeForm refresh={fetchEmployees} />
        </section>

        <section className="mb-12">
          {loading ? (
            <Spinner />
          ) : (
            <EmployeeList
              employees={employees}
              refresh={fetchEmployees}
              onSelectEmployee={handleSelectEmployee}
              selectedEmployee={selectedEmployee}
              onEmployeeDeleted={() => setAttendance([])}
            />
          )}
        </section>

        {/* Show Mark Attendance and Attendance List only when employee is selected */}
        {selectedEmployee && (
          <section className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <MarkAttendanceModal selectedEmployee={selectedEmployee} refresh={fetchAttendance} />
              <AttendanceList records={attendance} employee={selectedEmployee} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Modal component for Mark Attendance
function MarkAttendanceModal({ selectedEmployee, refresh }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
        onClick={() => setOpen(true)}
      >
        Mark Attendance
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-2xl p-0 md:p-0 border border-gray-200 max-w-lg w-full relative">
            <AttendanceForm
              refresh={refresh}
              selectedEmployee={selectedEmployee}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
