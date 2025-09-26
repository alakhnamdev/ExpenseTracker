"use client";

import UpdateBudgetForm from "@/components/UpdateBudgetForm";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Separate component that uses useSearchParams
function UpdateBudgetContent() {
  const searchParams = useSearchParams();
  const budgetId = searchParams.get("id") || "";
  const category = searchParams.get("category") || "";
  const monthlyLimit = searchParams.get("monthlyLimit") || "";

  return (
    <section className="p-6">
      <UpdateBudgetForm
        budgetId={budgetId}
        E_category={category}
        E_monthlyLimit={monthlyLimit}
      />
    </section>
  );
}

// Main component that wraps the content in Suspense
export default function UpdateExpensePage() {
  return (
    <Suspense fallback={<div>Loading budget details...</div>}>
      <UpdateBudgetContent />
    </Suspense>
  );
}