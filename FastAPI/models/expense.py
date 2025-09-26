from pydantic import BaseModel

# Pydantic model for a single expense item for automatic request body validation
class Expense(BaseModel):
    userId: str
    amount: float
    category: str
    date: str
    paymentMethod: str = None
    notes: str = None