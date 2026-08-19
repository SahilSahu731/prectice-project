from enum import Enum

from pydantic import BaseModel, Field


class Difficulty(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"


class PracticeStatus(str, Enum):
    PENDING = "Pending"
    COMPLETED = "Completed"


class PracticeCreate(BaseModel):
    title: str = Field(
        min_length=2,
        max_length=100
    )

    description: str = Field(
        min_length=2,
        max_length=500
    )

    duration: int = Field(gt=0)

    difficulty: Difficulty

    status: PracticeStatus = PracticeStatus.PENDING


class PracticeUpdate(BaseModel):
    title: str = Field(
        min_length=2,
        max_length=100
    )

    description: str = Field(
        min_length=2,
        max_length=500
    )

    duration: int = Field(gt=0)

    difficulty: Difficulty

    status: PracticeStatus