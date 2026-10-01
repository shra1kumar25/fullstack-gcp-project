from sqlalchemy import Column, Integer, String

from app.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    course = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)
