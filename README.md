# Communication Practice App

A full-stack mobile application for managing communication practice sessions.

The application allows users to create, view, edit, complete, and delete practice sessions. It is built with React Native and Expo on the frontend, FastAPI on the backend, MongoDB for data storage, and Zustand for frontend state management.

## Features

* View all communication practice sessions
* Create a new practice session
* Edit an existing practice
* Mark a practice as completed
* Delete a practice
* Form validation
* Loading and error states
* Responsive mobile interface
* Automatic UI updates after CRUD operations without manual refresh

## Tech Stack

### Mobile

* React Native
* Expo
* TypeScript
* Expo Router
* NativeWind
* Zustand
* Axios

### Backend

* Python
* FastAPI
* PyMongo
* Pydantic
* MongoDB Atlas

## Project Structure

```text
communication-practices/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── serializers.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
└── mobile/
    ├── src/
    │   ├── app/
    │   │   ├── _layout.tsx
    │   │   ├── index.tsx
    │   │   └── practice-form.tsx
    │   │
    │   ├── components/
    │   │   └── PracticeCard.tsx
    │   │
    │   ├── services/
    │   │   ├── api.ts
    │   │   └── practiceApi.ts
    │   │
    │   ├── store/
    │   │   └── practiceStore.ts
    │   │
    │   |─ types/
    │   |    └── practice.ts
    |   ├── global.css
    │  
    │
    ├── .env.example
    ├── tailwind.config.js
    └── package.json
```

## Architecture

```text
React Native UI
       ↓
Zustand Store
       ↓
API Service
       ↓
Axios
       ↓
FastAPI
       ↓
MongoDB Atlas
```

The application uses Zustand as the centralized client-side state store.

After create, edit, complete, or delete operations, the Zustand store is updated immediately using the response from the backend. This allows the UI to update automatically without requiring an additional refresh request.

## Backend Setup

### 1. Navigate to the backend

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python3 -m venv venv
```

### 3. Activate it

Linux/macOS:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure environment variables

Create:

```text
.env
```

based on:

```text
.env.example
```

Example:

```env
MONGO_URL=your_mongodb_connection_string
```

### 6. Run FastAPI

```bash
fastapi dev main.py --host 0.0.0.0
```

The API will be available at:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

## Mobile Setup

### 1. Navigate to the mobile project

```bash
cd mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Create:

```text
.env
```

based on:

```text
.env.example
```

Example:

```env
EXPO_PUBLIC_API_URL=https://your-backend-url.com
```

For local development using a physical phone, use your computer's local network IP instead of `localhost`.

Example:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.10:8000
```

### 4. Start Expo

```bash
npx expo start
```

Use Expo Go or an Android build to run the application.

## Practice Model

A practice session contains:

```json
{
  "id": "string",
  "title": "Interview Introduction",
  "description": "Practice introducing myself clearly",
  "duration": 10,
  "difficulty": "Beginner",
  "status": "Pending"
}
```

### Difficulty Values

```text
Beginner
Intermediate
Advanced
```

### Status Values

```text
Pending
Completed
```

## API Endpoints

| Method | Endpoint                            | Description                |
| ------ | ----------------------------------- | -------------------------- |
| POST   | `/practices`                        | Create a practice          |
| GET    | `/practices`                        | Get all practices          |
| PUT    | `/practices/{practice_id}`          | Update a practice          |
| PATCH  | `/practices/{practice_id}/complete` | Mark practice as completed |
| DELETE | `/practices/{practice_id}`          | Delete a practice          |
| GET    | `/health`                           | Check API/database health  |

Detailed API documentation is available in `API.md`.

FastAPI also provides interactive Swagger documentation at:

```text
/docs
```

## State Management

Zustand is used to maintain shared practice data.

The store provides:

```text
fetchPractices()
addPractice()
editPractice()
markComplete()
removePractice()
```

When the application performs a mutation, the corresponding practice is updated directly inside the Zustand store.

For example:

```text
Delete Practice
      ↓
DELETE API request
      ↓
Backend deletes document
      ↓
Zustand removes practice
      ↓
UI automatically re-renders
```

## Validation

Validation is performed on both frontend and backend.

Frontend validation provides immediate feedback to the user.

Backend validation using Pydantic ensures invalid requests cannot bypass application rules.

Examples:

* Title must not be empty
* Description must not be empty
* Duration must be greater than zero
* Difficulty must use one of the supported values
* Status must be Pending or Completed

## Error Handling

The application handles:

* API failures
* Database connection errors
* Invalid practice IDs
* Missing practices
* Invalid form input
* Loading states

The backend uses appropriate HTTP response codes such as:

```text
200 OK
201 Created
204 No Content
400 Bad Request
404 Not Found
422 Unprocessable Entity
503 Service Unavailable
```

## Design Decisions

### Why MongoDB?

The application currently contains one simple entity with no complex relationships or transactional requirements. MongoDB provides a straightforward document model for the CRUD-focused scope of the assignment.

### Why Zustand?

The application needs shared practice state across multiple screens, but does not require the additional complexity of a larger Redux setup.

Zustand provides a small centralized store and allows the UI to automatically respond to state changes.

### Why Expo?

Expo simplifies React Native project setup, routing, development, and Android builds while allowing the application to use standard React Native components.

### Why one Add/Edit screen?

Creating and editing practices use the same fields and validation rules. Reusing one form avoids duplicated code and keeps both flows consistent.

## Security Notes

Sensitive values such as MongoDB credentials are stored only on the backend through environment variables.

The mobile API URL is also configured through an environment variable, but it is not treated as a secret because values bundled into mobile applications can be inspected.

MongoDB credentials are never included in the React Native application.

## Future Improvements

With more time, the application could include:

* Authentication
* User-specific practices
* Search and filtering
* Practice history
* Pagination
* Automated tests
* Offline support
* Optimistic updates
* More advanced form validation
* Practice analytics

## Author

Developed as a Full Stack Developer assignment using React Native, FastAPI, and MongoDB.
