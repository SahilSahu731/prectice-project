from bson import ObjectId
from fastapi import FastAPI, HTTPException, status

from database import client, practice_collection
from models import (
    PracticeCreate,
    PracticeUpdate,
    PracticeStatus,
)
from serializers import practice_serializer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Communication Practice API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Practice API is running"
    }


@app.get("/health")
def health_check():
    try:
        client.admin.command("ping")

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database unavailable"
        )


@app.post(
    "/practices",
    status_code=status.HTTP_201_CREATED
)
def create_practice(practice: PracticeCreate):

    practice_data = practice.model_dump()

    result = practice_collection.insert_one(
        practice_data.copy()
    )

    return {
        "id": str(result.inserted_id),
        **practice_data
    }


@app.get("/practices")
def get_practices():

    practices = practice_collection.find()

    return [
        practice_serializer(practice)
        for practice in practices
    ]


@app.get("/practices/{practice_id}")
def get_practice(practice_id: str):

    if not ObjectId.is_valid(practice_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid practice ID"
        )

    practice = practice_collection.find_one(
        {
            "_id": ObjectId(practice_id)
        }
    )

    if not practice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Practice not found"
        )

    return practice_serializer(practice)


@app.put("/practices/{practice_id}")
def update_practice(
    practice_id: str,
    practice: PracticeUpdate
):

    if not ObjectId.is_valid(practice_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid practice ID"
        )

    practice_data = practice.model_dump()

    result = practice_collection.update_one(
        {
            "_id": ObjectId(practice_id)
        },
        {
            "$set": practice_data
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Practice not found"
        )

    updated_practice = practice_collection.find_one(
        {
            "_id": ObjectId(practice_id)
        }
    )

    return practice_serializer(updated_practice)


@app.patch("/practices/{practice_id}/complete")
def complete_practice(practice_id: str):

    if not ObjectId.is_valid(practice_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid practice ID"
        )

    result = practice_collection.update_one(
        {
            "_id": ObjectId(practice_id)
        },
        {
            "$set": {
                "status": PracticeStatus.COMPLETED.value
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Practice not found"
        )

    updated_practice = practice_collection.find_one(
        {
            "_id": ObjectId(practice_id)
        }
    )

    return practice_serializer(updated_practice)


@app.delete(
    "/practices/{practice_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_practice(practice_id: str):

    if not ObjectId.is_valid(practice_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid practice ID"
        )

    result = practice_collection.delete_one(
        {
            "_id": ObjectId(practice_id)
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Practice not found"
        )
