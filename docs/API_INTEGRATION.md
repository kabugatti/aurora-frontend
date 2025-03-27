# API Integration Documentation

## Overview

This document outlines the integration between the AURORA Frontend and Backend services, specifically focusing on the Question Management System.

## Backend Service Connection

### Base URL Configuration

The backend service URL is configured in the environment variables:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### API Service Structure

The frontend uses a centralized API service structure located in `src/services/questionsApi.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const questionsApi = {
  // Create a new question
  createQuestion: async (questionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  },

  // Get all questions with optional filters
  getAllQuestions: async ({ type, category, subCategory, englishLevel, difficulty } = {}) => {
    try {
      const params = new URLSearchParams();
      if (type) params.append("type", type);
      if (category) params.append("category", category);
      if (subCategory) params.append("subCategory", subCategory);
      if (englishLevel) params.append("englishLevel", englishLevel);
      if (difficulty) params.append("difficulty", difficulty);

      const queryString = params.toString();
      const url = `${API_BASE_URL}/questions${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  },

  // Get a specific question
  getQuestion: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching question:", error);
      throw error;
    }
  },

  // Update a question
  updateQuestion: async (id, questionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  },

  // Delete a question
  deleteQuestion: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  },
};
```

## Question Data Structure

### Question Schema

```typescript
interface Question {
  id: string;
  content: {
    question?: string; // For multiple choice
    wrongAnswers?: string[]; // For multiple choice
    correctAnswer?: string; // For multiple choice and fill-in-blanks
    sentence?: string; // For sentence builder
    words?: string[]; // For sentence builder
    hint?: string; // For Fill in the blanks
    explanation?: string; // For all types
  };
  metadata: {
    englishLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    difficulty: "beginner" | "intermediate" | "advanced";
    category: string;
    subCategory: string;
    tags: string[];
    type: "multiple-choice" | "sentence-builder" | "fill-in-blanks";
  };
  gameMetadata: {
    pointsValue: number;
    difficultyMultiplier: number;
  };
}
```

## API Endpoints

### Questions

#### GET /questions

Retrieves all questions with optional filtering.

**Query Parameters:**

- `type`: Filter by question type
- `category`: Filter by category
- `subCategory`: Filter by sub-category
- `englishLevel`: Filter by English level
- `difficulty`: Filter by difficulty

**Example:**

```javascript
// Get all sentence builder questions
const response = await questionsApi.getAllQuestions({ type: "sentence-builder" });

// Get beginner level questions
const response = await questionsApi.getAllQuestions({ difficulty: "beginner" });
```

#### GET /questions/:id

Retrieves a specific question by ID.

**Example:**

```javascript
const response = await questionsApi.getQuestion("question-id");
```

#### POST /questions

Creates a new question.

**Example:**

```javascript
const questionData = {
  content: {
    sentence: "She enjoys reading books in the quiet library",
    words: ["quiet", "She", "books", "reading", "library", "enjoys", "in", "the"],
    explanation: "This sentence uses the present simple tense...",
  },
  metadata: {
    englishLevel: "A2",
    difficulty: "beginner",
    subCategory: "present-simple",
    tags: ["grammar", "present-simple", "sentence-structure"],
    type: "sentence-builder",
  },
  gameMetadata: {
    pointsValue: 10,
    difficultyMultiplier: 1.0,
  },
};

const response = await questionsApi.createQuestion(questionData);
```

#### PUT /questions/:id

Updates an existing question.

**Example:**

```javascript
const updatedData = {
  content: {
    explanation: "Updated explanation...",
  },
};

const response = await questionsApi.updateQuestion("question-id", updatedData);
```

#### DELETE /questions/:id

Deletes a question.

**Example:**

```javascript
const response = await questionsApi.deleteQuestion("question-id");
```

## Error Handling

The API service includes error handling for common scenarios:

```javascript
try {
  const response = await questionsApi.getAllQuestions();
  // Handle successful response
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error("Server error:", error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error("No response:", error.request);
  } else {
    // Error in request setup
    console.error("Request error:", error.message);
  }
}
```

## Running the Services

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd AURORA-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the backend service:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd AURORA-Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the frontend service:
   ```bash
   npm run dev
   ```

## Testing the Integration

1. Create a test question:

   ```javascript
   const testQuestion = {
     content: {
       sentence: "Test sentence",
       words: ["Test", "sentence"],
       explanation: "Test explanation",
     },
     metadata: {
       englishLevel: "A1",
       difficulty: "beginner",
       subCategory: "test",
       tags: ["test"],
       type: "sentence-builder",
     },
     gameMetadata: {
       pointsValue: 5,
       difficultyMultiplier: 1.0,
     },
   };

   const response = await questionsApi.createQuestion(testQuestion);
   ```

2. Verify the question was created:

   ```javascript
   const questions = await questionsApi.getAllQuestions({ type: "sentence-builder" });
   console.log(questions);
   ```

3. Update and delete the test question:

   ```javascript
   // Update
   await questionsApi.updateQuestion(response.id, {
     content: { explanation: "Updated explanation" },
   });

   // Delete
   await questionsApi.deleteQuestion(response.id);
   ```

## Common Issues and Solutions

1. **CORS Issues**

   - Ensure the backend has CORS properly configured
   - Check that the frontend is using the correct API URL
   - Verify the API_BASE_URL in .env is correct

2. **Authentication Errors**

   - Verify that authentication tokens are being properly sent
   - Check token expiration and refresh mechanisms

3. **Data Validation Errors**

   - Ensure all required fields are present in the request
   - Validate data types match the schema
   - Check that the question type matches the content structure

4. **Network Issues**
   - Check network connectivity
   - Verify the backend service is running
   - Check for any firewall or proxy issues
   - Ensure the API_BASE_URL is accessible

## Implementation Notes

1. **API Base URL**

   - The API base URL is configured in the `.env` file
   - Default URL is `http://localhost:8000/api/v1`
   - Make sure to update this in production

2. **Response Handling**

   - All responses are automatically parsed as JSON
   - Error responses include detailed error messages
   - Failed requests throw errors with descriptive messages

3. **Query Parameters**

   - All query parameters are optional
   - Parameters are properly encoded in the URL
   - Multiple parameters can be combined

4. **Error Logging**
   - All API errors are logged to the console
   - Error messages include the specific operation that failed
   - Network errors are handled separately from API errors
