
import { useState, useEffect } from "react";
import API from "../api/client";

export default function AttendanceForm({ refresh, selectedEmployee, onClose }) {
  const [form, setForm] = useState({
    employee_id: selectedEmployee?.employee_id || "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      employee_id: selectedEmployee?.employee_id || "",
    }));
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/attendance", form);
      refresh(form.employee_id);
    } catch (err) {
      alert(err.response?.data?.detail || "Error marking attendance");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100 max-w-2xl mx-auto relative">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Mark Attendance</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <input
          placeholder="Employee ID"
          required
          value={form.employee_id}
          readOnly
          className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700 shadow-sm w-full focus:outline-none cursor-not-allowed"
        />

        <input
          type="date"
          required
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full text-gray-700 bg-gray-50 shadow-sm"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full text-gray-700 bg-gray-50 shadow-sm"
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition w-full md:w-auto">
          Submit
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700 px-4 py-2 rounded transition">
            Close
          </button>
        )}
      </div>
    </form>
  );
}
