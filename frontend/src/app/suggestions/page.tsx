"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { GetSuggestions, GetMonthlyExpenseData } from "@/utils/Suggestions";
import { useEffect, useState } from "react";

const FormattedSuggestion = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p className="text-sm text-muted-foreground">
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </p>
  );
};

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const data = await GetMonthlyExpenseData();
        const generatedSuggestions = await GetSuggestions(data);
        setSuggestions(generatedSuggestions.suggestions);
        console.log("Suggestions:", generatedSuggestions)
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <section className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Spending Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {loading ? (
            <p className="text-muted-foreground">Generating suggestions...</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-4">
                <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <FormattedSuggestion text={suggestion} />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No suggestions available at the moment.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
