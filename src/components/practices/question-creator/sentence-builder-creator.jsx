import React, { useState } from "react";
import { Card } from "@/components/layout/ui/card";
import { Button } from "@/components/layout/ui/button";
import { Input } from "@/components/layout/ui/input";
import { Textarea } from "@/components/layout/ui/textarea";
import { Label } from "@/components/layout/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/layout/ui/select";
import { questionsApi } from "@/services/questionsApi";
import { useToast } from "@/context/ToastContext";

export function SentenceBuilderCreator() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState({
    content: {
      sentence: "",
      words: [],
      explanation: "",
    },
    metadata: {
      englishLevel: "A2",
      difficulty: "beginner",
      category: "grammar",
      subCategory: "sentence-structure",
      tags: ["sentence-building", "word-order"],
      type: "sentence-builder",
    },
    gameMetadata: {
      pointsValue: 10,
      timeLimit: 60,
      difficultyMultiplier: 1.0,
    },
  });

  const handleContentChange = (field, value) => {
    if (field === "sentence") {
      // Split sentence into words and remove punctuation
      const words = value
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word.length > 0)
        .map((word) => word.replace(/[.,!?]$/, ""));

      setQuestion((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          sentence: value,
          words,
        },
      }));
    } else {
      setQuestion((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [field]: value,
        },
      }));
    }
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
          words: [],
          explanation: "",
        },
        metadata: {
          englishLevel: "A2",
          difficulty: "beginner",
          category: "grammar",
          subCategory: "sentence-structure",
          tags: ["sentence-building", "word-order"],
          type: "sentence-builder",
        },
        gameMetadata: {
          pointsValue: 10,
          timeLimit: 60,
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
          <Label>Complete Sentence</Label>
          <Textarea
            value={question.content.sentence}
            onChange={(e) => handleContentChange("sentence", e.target.value)}
            placeholder="Enter the complete sentence"
          />
        </div>

        <div>
          <Label>Generated Words</Label>
          <div className="flex flex-wrap gap-2 p-4 border rounded-md bg-gray-50">
            {question.content.words.map((word, index) => (
              <div key={index} className="px-3 py-1 bg-white border rounded-md shadow-sm">
                {word}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Explanation</Label>
          <Textarea
            value={question.content.explanation}
            onChange={(e) => handleContentChange("explanation", e.target.value)}
            placeholder="Explain the sentence structure or grammar rules"
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
