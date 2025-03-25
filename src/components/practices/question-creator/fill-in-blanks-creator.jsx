import React, { useState } from "react";
import { Card } from "@/components/layout/ui/card";
import { Button } from "@/components/layout/ui/button";
import { Input } from "@/components/layout/ui/input";
import { Textarea } from "@/components/layout/ui/textarea";
import { Label } from "@/components/layout/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/layout/ui/select";
import { questionsApi } from "@/services/questionsApi";
import { useToast } from "@/context/ToastContext";

export function FillInBlanksCreator() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState({
    content: {
      sentence: "",
      correctAnswer: "",
      hint: "",
      explanation: "",
    },
    metadata: {
      englishLevel: "A2",
      difficulty: "beginner",
      category: "grammar",
      subCategory: "vocabulary",
      tags: ["fill-in-the-blanks", "vocabulary"],
      type: "fill-in-the-blanks",
    },
    gameMetadata: {
      pointsValue: 10,
      timeLimit: 30,
      difficultyMultiplier: 1.0,
    },
  });

  const handleContentChange = (field, value) => {
    setQuestion((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const handleMetadataChange = (field, value) => {
    setQuestion((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: value,
      },
    }));
  };

  const handleGameMetadataChange = (field, value) => {
    setQuestion((prev) => ({
      ...prev,
      gameMetadata: {
        ...prev.gameMetadata,
        [field]: typeof value === "string" ? parseFloat(value) : value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await questionsApi.createQuestion(question);
      showToast({
        title: "Success",
        description: "Question created successfully",
        variant: "success",
      });
      // Reset form
      setQuestion({
        content: {
          sentence: "",
          correctAnswer: "",
          hint: "",
          explanation: "",
        },
        metadata: {
          englishLevel: "A2",
          difficulty: "beginner",
          category: "grammar",
          subCategory: "vocabulary",
          tags: ["fill-in-blanks", "vocabulary"],
          type: "fill-in-blanks",
        },
        gameMetadata: {
          pointsValue: 10,
          timeLimit: 30,
          difficultyMultiplier: 1.0,
        },
      });
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to create question",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label>Sentence with Blanks</Label>
          <Textarea
            value={question.content.sentence}
            onChange={(e) => handleContentChange("sentence", e.target.value)}
            placeholder="Enter the sentence with ___ for blanks (e.g., The cat ___ on the mat.)"
          />
        </div>

        <div>
          <Label>Correct Answer</Label>
          <Input
            value={question.content.correctAnswer}
            onChange={(e) => handleContentChange("correctAnswer", e.target.value)}
            placeholder="Enter the word that goes in the blank"
          />
        </div>

        <div>
          <Label>Hint</Label>
          <Input
            value={question.content.hint}
            onChange={(e) => handleContentChange("hint", e.target.value)}
            placeholder="Enter a hint for the answer"
          />
        </div>

        <div>
          <Label>Explanation</Label>
          <Textarea
            value={question.content.explanation}
            onChange={(e) => handleContentChange("explanation", e.target.value)}
            placeholder="Explain why this is the correct answer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>English Level</Label>
            <Select value={question.metadata.englishLevel} onValueChange={(value) => handleMetadataChange("englishLevel", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A1">A1 (Beginner)</SelectItem>
                <SelectItem value="A2">A2 (Elementary)</SelectItem>
                <SelectItem value="B1">B1 (Intermediate)</SelectItem>
                <SelectItem value="B2">B2 (Upper Intermediate)</SelectItem>
                <SelectItem value="C1">C1 (Advanced)</SelectItem>
                <SelectItem value="C2">C2 (Mastery)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Difficulty</Label>
            <Select value={question.metadata.difficulty} onValueChange={(value) => handleMetadataChange("difficulty", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Category</Label>
            <Select value={question.metadata.category} onValueChange={(value) => handleMetadataChange("category", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grammar">Grammar</SelectItem>
                <SelectItem value="vocabulary">Vocabulary</SelectItem>
                <SelectItem value="pronunciation">Pronunciation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Sub-Category</Label>
            <Input
              value={question.metadata.subCategory}
              onChange={(e) => handleMetadataChange("subCategory", e.target.value)}
              placeholder="Enter sub-category"
            />
          </div>

          <div>
            <Label>Points Value</Label>
            <Input
              type="number"
              value={question.gameMetadata.pointsValue}
              onChange={(e) => handleGameMetadataChange("pointsValue", e.target.value)}
              min={0}
            />
          </div>

          <div>
            <Label>Time Limit (seconds)</Label>
            <Input
              type="number"
              value={question.gameMetadata.timeLimit}
              onChange={(e) => handleGameMetadataChange("timeLimit", e.target.value)}
              min={0}
            />
          </div>

          <div>
            <Label>Difficulty Multiplier</Label>
            <Input
              type="number"
              step="0.1"
              value={question.gameMetadata.difficultyMultiplier}
              onChange={(e) => handleGameMetadataChange("difficultyMultiplier", e.target.value)}
              min={0}
            />
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? "Creating..." : "Create Question"}
        </Button>
      </div>
    </Card>
  );
}
