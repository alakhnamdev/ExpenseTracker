"use client";

import { ColumnDef } from "@tanstack/react-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import DeleteExpense from "@/utils/Expense/DeleteExpense";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";

export type Expense = {
  _id: number;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  notes: string;
};

const NotesCell = ({ notes }: { notes: string }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={toggleExpanded} style={{ cursor: "pointer" }}>
      {expanded ? (
        <p
          style={{
            wordBreak: "break-word",
            maxWidth: "250px",
            whiteSpace: "normal",
          }}
        >
          {notes}
        </p>
      ) : (
        <p
          style={{
            wordBreak: "break-word",
            maxWidth: "250px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >{notes}</p>
      )}
    </div>
  );
};

export const getColumns = (refreshData: () => void): ColumnDef<Expense>[] => [
  {
    accessorKey: "amount",
    header: () => <div className="">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment Method
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 250,

    cell: ({ row }) => {
      const notes: string = row.getValue("notes") ?? "";
      return <NotesCell notes={notes} />;
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const expense = row.original;

      const handleDelete = async () => {
        try {
          await DeleteExpense(expense._id.toString());
          refreshData();
        } catch (error) {
          console.error("Failed to delete expense and refresh data", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <a
              href={`/update-expense?id=${expense._id}&amount=${expense.amount}&category=${expense.category}&date=${expense.date}&paymentMethod=${expense.paymentMethod}&notes=${expense.notes}`}
            >
              <DropdownMenuItem>
                  Edit expense
              </DropdownMenuItem>
            </a>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-600"
                  onSelect={(e) => e.preventDefault()}
                >
                  Delete expense
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this expense.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

];
