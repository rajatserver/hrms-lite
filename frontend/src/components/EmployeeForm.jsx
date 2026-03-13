import { useState } from "react";
import API from "../api/client";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/employees/", form);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      refresh();
    } catch (err) {
      let detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        detail = detail.map((d) => `${d.loc?.join(' → ') || 'Error'}: ${d.msg}`).join('\n');
      }
      alert(detail || "Error creating employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Add Employee</h2>
          <p className="text-xs text-slate-500">Create a new member profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">EMPLOYEE ID</label>
            <input
              placeholder="Employee ID (e.g. EMP001)"
              required
              value={form.employee_id}
              onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
              className="input-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
            <input
              placeholder="Enter full name"
              required
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="input-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
            <input
              type="email"
              placeholder="email@company.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Department</label>
            <select
              required
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="input-primary"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </div>

        <button
          disabled={loading}
          className="btn-primary w-full mt-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : "Register Employee"}
        </button>
      </form>
    </div>
  );
}
