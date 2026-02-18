# HRMS Lite – Backend API

A lightweight Human Resource Management System (HRMS Lite) backend built using **FastAPI** and **PostgreSQL**.

This API provides functionality to manage employees and track daily attendance records.

The project is designed to demonstrate practical full-stack backend skills including:

- RESTful API design
- Database modeling
- Data validation
- Error handling
- Production-ready structure
- Deployment readiness

---

## 🚀 Live API (After Deployment)

Backend URL:  
`https://your-backend-url.onrender.com`

API Documentation (Swagger UI):  
`https://your-backend-url.onrender.com/docs`

---

## 📌 Features

### Employee Management
- Add new employee
- View all employees
- Delete employee
- Unique Employee ID validation
- Unique Email validation

### Attendance Management
- Mark attendance (Present / Absent)
- View attendance per employee
- Prevent duplicate attendance for the same date

---

## 🛠 Tech Stack

| Layer        | Technology |
|--------------|------------|
| Backend      | FastAPI |
| Database     | PostgreSQL |
| ORM          | SQLAlchemy |
| Validation   | Pydantic |
| Deployment   | Render |
| API Docs     | Swagger (auto-generated) |

---

## 📂 Project Structure

backend/
│
├── app/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ ├── dependencies.py
│ ├── routers/
│ │ ├── employees.py
│ │ └── attendance.py
│
├── requirements.txt
├── Dockerfile
└── .env


---

## 🗄 Database Design

### Employees Table

| Field        | Type    | Constraint |
|--------------|---------|------------|
| id           | Integer | Primary Key |
| employee_id  | String  | Unique |
| full_name    | String  | Required |
| email        | String  | Unique |
| department   | String  | Required |

---

### Attendance Table

| Field        | Type    | Constraint |
|--------------|---------|------------|
| id           | Integer | Primary Key |
| employee_id  | Integer | Foreign Key |
| date         | Date    | Required |
| status       | String  | Present / Absent |
|              |         | Unique(employee_id + date) |

---

## 🔌 API Endpoints

### Employees

#### Create Employee

POST /employees


#### Get All Employees

GET /employees


#### Delete Employee

DELETE /employees/{id}


---

### Attendance

#### Mark Attendance

POST /attendance


#### Get Attendance for Employee

GET /attendance/{employee_id}


---

## ✅ Validation & Error Handling

The API includes:

- Required field validation
- Email format validation
- Duplicate employee handling
- Duplicate attendance handling
- Proper HTTP status codes:
  - 201 → Created
  - 200 → Success
  - 400 → Bad Request
  - 404 → Not Found
  - 422 → Validation Error
  - 500 → Server Error
- Meaningful error messages

---

## ⚙️ Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/hrms-lite.git
cd hrms-lite/backend

2️⃣ Create Environment
conda create -n hrms-lite python=3.11
conda activate hrms-lite

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Configure Environment Variables

Create a .env file:

DATABASE_URL=postgresql://username:password@localhost:5432/hrms


Make sure PostgreSQL is running locally.

5️⃣ Run Application
uvicorn app.main:app --reload


Open in browser:

http://localhost:8000/docs
