import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/layout/ui/card";
import { Button } from "@/components/layout/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/layout/ui/dialog";
import { ScrollArea } from "@/components/layout/ui/scroll-area";
import { Plus, ArrowLeft } from "lucide-react";
import { MultipleChoiceCreator } from "./multiple-choice-creator";
import { SentenceBuilderCreator } from "./sentence-builder-creator";
import { FillInBlanksCreator } from "./fill-in-blanks-creator";

const SCHEMA_TYPES = [
  {
    id: "multiple-choice",
    title: "Multiple Choice Question",
    description: "Create a question with multiple options and one correct answer",
    icon: "📝",
  },
  {
    id: "sentence-builder",
    title: "Sentence Builder",
    description: "Create a drag-and-drop sentence building exercise",
    icon: "🔄",
  },
  {
    id: "fill-in-blanks",
    title: "Fill in the Blanks",
    description: "Create a question with blank spaces to be filled",
    icon: "✏️",
  },
];

export default function QuestionCreator() {
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSchemaSelect = (schemaId) => {
    setSelectedSchema(schemaId);
    setIsDialogOpen(false);
  };

  const handleBack = () => {
    setSelectedSchema(null);
    setIsDialogOpen(true);
  };

  const renderCreator = () => {
    switch (selectedSchema) {
      case "multiple-choice":
        return <MultipleChoiceCreator />;
      case "sentence-builder":
        return <SentenceBuilderCreator />;
      case "fill-in-blanks":
        return <FillInBlanksCreator />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {selectedSchema ? (
        <div>
          <Button variant="ghost" className="flex items-center gap-2 mb-4" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Question Types
          </Button>
          {renderCreator()}
        </div>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Select Question Type</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 gap-4">
                {SCHEMA_TYPES.map((schema) => (
                  <Card key={schema.id} className="cursor-pointer transition-colors hover:bg-gray-50" onClick={() => handleSchemaSelect(schema.id)}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{schema.icon}</span>
                        {schema.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{schema.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
