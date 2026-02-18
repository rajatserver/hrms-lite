import { useState } from "react";
import API from "../api/client";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/employees", form);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      refresh();
    } catch (err) {
      let detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        // Compose a user-friendly error message as plain text
        detail = detail.map((d) => `${d.loc?.join(' → ') || 'Error'}: ${d.msg}`).join('\n');
      }
      alert(detail || "Error creating employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Employee</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          placeholder="Employee ID"
          required
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full text-gray-700 bg-gray-50 shadow-sm"
        />

        <input
          placeholder="Full Name"
          required
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full text-gray-700 bg-gray-50 shadow-sm"
        />

        <input
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full text-gray-700 bg-gray-50 shadow-sm"
        />

        <input
          placeholder="Department"
          required
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full text-gray-700 bg-gray-50 shadow-sm"
        />
      </div>

      <button
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition w-full md:w-auto"
      >
        Create
      </button>
    </form>
  );
}
