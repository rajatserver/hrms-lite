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
  const [apiHealth, setApiHealth] = useState(null); // null = unknown, true = operational, false = down
  const checkApiHealth = async () => {
    try {
      const res = await API.get("/health");
      setApiHealth(res.status === 200);
    } catch (err) {
      setApiHealth(false);
    }
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async (employee_id) => {
    try {
      const res = await API.get(`/attendance/${employee_id}`);
      setAttendance(res.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
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
    checkApiHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">HRMS <span className="text-indigo-600">Lite</span></h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form and Stats */}
          <div className="lg:col-span-1 space-y-6">
            <EmployeeForm refresh={fetchEmployees} />
            
            <div className="glass-card p-6 bg-indigo-600 text-white border-none shadow-indigo-200">
              <h3 className="font-semibold mb-2">System Status</h3>
              <p className="text-indigo-100 text-sm mb-4">
                {apiHealth === false
                  ? "The API is currently starting up due to the free hosting tier. Please allow up to one minute for the container to become operational on Vercel. Thank you for your patience."
                  : "The HRMS lite instance is healthy and connected to the production database."}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono bg-indigo-700/50 p-2 rounded-lg">
                <span className={`w-2 h-2 rounded-full ${apiHealth === null ? 'bg-yellow-400 animate-pulse' : apiHealth ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                {apiHealth === null ? 'API: Checking...' : apiHealth ? 'API: Operational' : 'API: Down'}
              </div>
            </div>
          </div>

          {/* Right Column: List and Attendance */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              {loading ? (
                <div className="glass-card p-20 flex justify-center">
                  <Spinner />
                </div>
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

            {selectedEmployee && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-card p-6 border-indigo-100 bg-indigo-50/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Attendance Manager</h2>
                      <p className="text-sm text-slate-500">Managing records for <span className="font-semibold text-indigo-600">{selectedEmployee.full_name}</span></p>
                    </div>
                    <MarkAttendanceModal selectedEmployee={selectedEmployee} refresh={fetchAttendance} />
                  </div>
                  <AttendanceList records={attendance} employee={selectedEmployee} />
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function MarkAttendanceModal({ selectedEmployee, refresh }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Mark Attendance
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
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
