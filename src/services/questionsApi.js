const API_BASE_URL = "http://localhost:8000/api/v1";

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

  // Get all questions
  getAllQuestions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions`);

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
