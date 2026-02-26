import { useState, useEffect } from "react";
import API from "../api/client";

export default function AttendanceForm({ refresh, selectedEmployee, onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    employee_id: selectedEmployee?.employee_id || "",
    date: today,
    status: "Present",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      employee_id: selectedEmployee?.employee_id || "",
    }));
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/attendance/", form);
      refresh(form.employee_id);
      onClose();
    } catch (err) {
      alert(err.response?.data?.detail || "Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900">Mark Attendance</h2>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
            {selectedEmployee?.full_name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-indigo-900">{selectedEmployee?.full_name}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Selection Date</label>
            <input
              type="date"
              required
              value={form.date}
              max={today}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="input-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Attendance Status</label>
            <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setForm({ ...form, status: "Present" })}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${form.status === 'Present' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Present
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, status: "Absent" })}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${form.status === 'Absent' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Absent
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : "Confirm Selection"}
          </button>
        </div>
      </form>
    </div>
  );
}
