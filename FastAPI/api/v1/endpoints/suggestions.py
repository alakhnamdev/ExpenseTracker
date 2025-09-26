from fastapi import APIRouter, HTTPException
from typing import List

from models.expense import Expense
from controllers.analyzer import FinancialAnalyzer

router = APIRouter()

@router.post('/suggestions')
async def get_financial_suggestions(expenses: List[Expense]):
    """
    Main API endpoint to generate financial suggestions.
    The expenses parameter is automatically validated by FastAPI using the Expense Pydantic model.
    """
    if not expenses:
        raise HTTPException(status_code=400, detail="Invalid input. Expected a non-empty list of expense objects.")

    try:
        # Convert Pydantic models to a list of dictionaries for Pandas
        request_data = [expense.dict() for expense in expenses]
        
        analyzer = FinancialAnalyzer(request_data)
        suggestions = analyzer.generate_all_suggestions()

        return {'suggestions': suggestions}
    except Exception as e:
        # In a real app, you'd want to log this error.
        raise HTTPException(status_code=500, detail=f"An error occurred while processing your request: {str(e)}")

@router.get('/health', summary="Health Check", tags=["Health"])
def health_check():
    """Health check endpoint"""
    return {'status': 'healthy', 'message': 'Smart Finance Suggestions API is running'}