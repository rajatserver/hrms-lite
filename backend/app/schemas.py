from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Literal


# -------- EMPLOYEE -------- #

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str

    class Config:
        from_attributes = True


# -------- ATTENDANCE -------- #

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: Literal["Present", "Absent"]


class AttendanceResponse(BaseModel):
    id: int
    employee_id: str
    date: date
    status: Literal["Present", "Absent"]

    class Config:
        from_attributes = True
