# HRMS Lite

HRMS Lite is a lightweight Human Resource Management System designed to manage employees and track daily attendance records. It is a full-stack application with a **FastAPI** backend and a **React** frontend, styled using **Tailwind CSS**.

---

## Features

### Backend
- Built with FastAPI and PostgreSQL
- Employee management:
  - Add new employees
  - View all employees
  - Delete employees
  - Unique Employee ID and Email validation
- Attendance management:
  - Mark attendance (Present/Absent)
  - View attendance per employee
  - Prevent duplicate attendance for the same date
- RESTful API design with Swagger documentation
- Database modeling with SQLAlchemy
- Data validation using Pydantic
- Error handling and proper HTTP status codes

### Frontend
- Built with React and Vite
- Employee management (add, list)
- Attendance tracking (add, list)
- Error handling and loading spinners
- Modern UI with Tailwind CSS

---

## Project Structure

```
hrms-lite/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app/
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── routers/
│   │   │   ├── attendance.py
│   │   │   └── employees.py
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── api/
│   │   │   └── client.js
│   │   └── components/
│   │       ├── AttendanceForm.jsx
│   │       ├── AttendanceList.jsx
│   │       ├── EmployeeForm.jsx
│   │       ├── EmployeeList.jsx
│   │       ├── ErrorBanner.jsx
│   │       └── Spinner.jsx
```

---

## Getting Started

### Prerequisites

- Python 3.11
- PostgreSQL
- Node.js (v16 or higher recommended)
- npm

### Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```sh
   conda create -n hrms-lite python=3.11
   conda activate hrms-lite
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   Create a `.env` file in the `backend` directory with the following content:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/hrms
   ```
   Ensure PostgreSQL is running locally.
5. Run the application:
   ```sh
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://localhost:8000` and the Swagger documentation at `http://localhost:8000/docs`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

4. To build for production:
   ```sh
   npm run build
   ```

---

## Technologies Used

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Pydantic](https://pydantic-docs.helpmanual.io/)

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## License

This project is licensed under the MIT License.
