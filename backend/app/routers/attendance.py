from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List

from .. import models, schemas
from ..dependencies import get_db

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/", response_model=schemas.AttendanceResponse, status_code=201)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):

    # 🔍 Find employee using BUSINESS ID
    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    if attendance.status not in ["Present", "Absent"]:
        raise HTTPException(status_code=400, detail="Invalid attendance status")

    new_attendance = models.Attendance(
        employee_id=employee.id,   # store internal DB ID
        date=attendance.date,
        status=attendance.status
    )

    try:
        db.add(new_attendance)
        db.commit()
        db.refresh(new_attendance)

        return schemas.AttendanceResponse(
            id=new_attendance.id,
            employee_id=employee.employee_id,
            date=new_attendance.date,
            status=new_attendance.status
        )

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )


@router.get("/{employee_id}", response_model=List[schemas.AttendanceResponse])
def get_attendance(employee_id: str, db: Session = Depends(get_db)):

    # 🔍 Find employee by BUSINESS ID
    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    records = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee.id
    ).all()

    return [
        schemas.AttendanceResponse(
            id=record.id,
            employee_id=employee.employee_id,
            date=record.date,
            status=record.status
        )
        for record in records
    ]
