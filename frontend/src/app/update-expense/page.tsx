"use client";

import UpdateExpenseForm from "@/components/UpdateExpenseForm";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function UpdateExpenseContent() {
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("id") || "";
  const amount = searchParams.get("amount") || "";
  const category = searchParams.get("category") || "";
  const date = searchParams.get("date") || "";
  const paymentMethod = searchParams.get("paymentMethod") || "";
  const notes = searchParams.get("notes") || "";

  return (
    <section className="p-6">
      <UpdateExpenseForm 
        expenseId={expenseId} 
        E_amount={amount} 
        E_category={category} 
        E_date={date} 
        E_paymentMethod={paymentMethod} 
        E_notes={notes} 
      />
    </section>
  );
}

// Main component that wraps the content in Suspense
export default function UpdateExpensePage() {
  return (
    <Suspense fallback={<div>Loading expense details...</div>}>
      <UpdateExpenseContent />
    </Suspense>
  );
}