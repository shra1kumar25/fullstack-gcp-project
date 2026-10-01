from pydantic import BaseModel, EmailStr


class StudentBase(BaseModel):
    student_name: str
    email: EmailStr
    course: str
    year: int


class StudentCreate(StudentBase):
    pass


class StudentResponse(StudentBase):
    id: int

    model_config = {
        "from_attributes": True
    }
