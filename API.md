# Communication Practice API Documentation

## Base URL

Local development:

```text
http://localhost:8000
```

Production:

```text
YOUR_DEPLOYED_BACKEND_URL
```

## Content Type

Requests containing bodies should use:

```text
Content-Type: application/json
```

---

# Practice Object

```json
{
  "id": "68a...",
  "title": "Interview Introduction",
  "description": "Practice introducing myself clearly",
  "duration": 10,
  "difficulty": "Beginner",
  "status": "Pending"
}
```

## Fields

| Field         | Type    | Description                                     |
| ------------- | ------- | ----------------------------------------------- |
| `id`          | string  | MongoDB document identifier exposed as a string |
| `title`       | string  | Practice title                                  |
| `description` | string  | Practice description                            |
| `duration`    | integer | Duration in minutes                             |
| `difficulty`  | string  | Beginner, Intermediate, or Advanced             |
| `status`      | string  | Pending or Completed                            |

---

# 1. Create Practice

## Request

```http
POST /practices
```

### Request Body

```json
{
  "title": "Interview Introduction",
  "description": "Practice introducing myself clearly",
  "duration": 10,
  "difficulty": "Beginner",
  "status": "Pending"
}
```

## Success Response

### Status

```text
201 Created
```

### Body

```json
{
  "id": "68a123456789...",
  "title": "Interview Introduction",
  "description": "Practice introducing myself clearly",
  "duration": 10,
  "difficulty": "Beginner",
  "status": "Pending"
}
```

## Possible Errors

### `422 Unprocessable Entity`

Returned when validation fails.

Example:

```json
{
  "detail": [
    {
      "type": "greater_than",
      "loc": [
        "body",
        "duration"
      ],
      "msg": "Input should be greater than 0"
    }
  ]
}
```

---

# 2. Get All Practices

## Request

```http
GET /practices
```

## Success Response

### Status

```text
200 OK
```

### Body

```json
[
  {
    "id": "68a123456789...",
    "title": "Interview Introduction",
    "description": "Practice introducing myself clearly",
    "duration": 10,
    "difficulty": "Beginner",
    "status": "Pending"
  },
  {
    "id": "68a987654321...",
    "title": "Product Presentation",
    "description": "Practice presenting a product",
    "duration": 20,
    "difficulty": "Intermediate",
    "status": "Completed"
  }
]
```

If no practices exist:

```json
[]
```

# 3. Update Practice

## Request

```http
PUT /practices/{practice_id}
```

### Request Body

```json
{
  "title": "Advanced Interview Introduction",
  "description": "Practice a polished interview introduction",
  "duration": 15,
  "difficulty": "Intermediate",
  "status": "Pending"
}
```

## Success Response

### Status

```text
200 OK
```

### Body

```json
{
  "id": "68a123456789...",
  "title": "Advanced Interview Introduction",
  "description": "Practice a polished interview introduction",
  "duration": 15,
  "difficulty": "Intermediate",
  "status": "Pending"
}
```

## Possible Errors

### `400 Bad Request`

```json
{
  "detail": "Invalid practice ID"
}
```

### `404 Not Found`

```json
{
  "detail": "Practice not found"
}
```

### `422 Unprocessable Entity`

Returned when the request body fails validation.

---

# 5. Mark Practice as Completed

## Request

```http
PATCH /practices/{practice_id}/complete
```

No request body is required.

## Success Response

### Status

```text
200 OK
```

### Body

```json
{
  "id": "68a123456789...",
  "title": "Interview Introduction",
  "description": "Practice introducing myself clearly",
  "duration": 10,
  "difficulty": "Beginner",
  "status": "Completed"
}
```

Calling the endpoint again on an already-completed practice keeps the status as:

```text
Completed
```

## Possible Errors

### `400 Bad Request`

```json
{
  "detail": "Invalid practice ID"
}
```

### `404 Not Found`

```json
{
  "detail": "Practice not found"
}
```

---

# 6. Delete Practice

## Request

```http
DELETE /practices/{practice_id}
```

## Success Response

### Status

```text
204 No Content
```

No response body is returned.

## Possible Errors

### `400 Bad Request`

```json
{
  "detail": "Invalid practice ID"
}
```

### `404 Not Found`

```json
{
  "detail": "Practice not found"
}
```

---

# 7. Health Check

## Request

```http
GET /health
```

## Success Response

### Status

```text
200 OK
```

### Body

```json
{
  "status": "healthy",
  "database": "connected"
}
```

## Database Failure

### Status

```text
503 Service Unavailable
```

Example:

```json
{
  "detail": "Database unavailable"
}
```

---

# Validation Rules

## Title

```text
Minimum: 2 characters
Maximum: 100 characters
```

## Description

```text
Minimum: 2 characters
Maximum: 500 characters
```

## Duration

Must be:

```text
> 0
```

## Difficulty

Valid values:

```text
Beginner
Intermediate
Advanced
```

## Status

Valid values:

```text
Pending
Completed
```

---

# HTTP Status Code Summary

| Code  | Meaning              | Usage                         |
| ----- | -------------------- | ----------------------------- |
| `200` | OK                   | Successful GET, PUT, or PATCH |
| `201` | Created              | Practice successfully created |
| `204` | No Content           | Practice successfully deleted |
| `400` | Bad Request          | Invalid MongoDB ID            |
| `404` | Not Found            | Practice does not exist       |
| `422` | Unprocessable Entity | Request validation failed     |
| `503` | Service Unavailable  | Database unavailable          |

---

# Interactive Documentation

FastAPI automatically provides Swagger documentation at:

```text
/docs
```

and OpenAPI JSON at:

```text
/openapi.json
```
