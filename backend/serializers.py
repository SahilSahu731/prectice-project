def practice_serializer(practice):
    return {
        "id": str(practice["_id"]),
        "title": practice["title"],
        "description": practice["description"],
        "duration": practice["duration"],
        "difficulty": practice["difficulty"],
        "status": practice["status"]
    }