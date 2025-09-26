import pandas as pd
from datetime import datetime, timedelta
from typing import List, Dict, Any

class FinancialAnalyzer:
    """
    Class to analyze financial data and generate suggestions.
    This class is framework-agnostic and can be reused.
    """
    def __init__(self, expenses_data: List[Dict[str, Any]]):
        """
        Initialize the analyzer with expense data
        """
        self.df = pd.DataFrame(expenses_data)
        if not self.df.empty:
            self.df['date'] = pd.to_datetime(self.df['date'])
            self.df = self.df.sort_values('date')
            self.latest_date = self.df['date'].max()
        else:
            self.latest_date = datetime.now()

    def get_last_30_days_data(self) -> pd.DataFrame:
        """
        Filter data for the last 30 days based on the most recent date
        """
        cutoff_date = self.latest_date - timedelta(days=30)
        return self.df[self.df['date'] >= cutoff_date].copy()

    def high_spending_category_alert(self, data_30_days: pd.DataFrame) -> List[str]:
        """
        Generate alerts for high spending categories
        """
        suggestions = []
        if data_30_days.empty:
            return suggestions

        category_spending = data_30_days.groupby('category')['amount'].sum().sort_values(ascending=False)

        if len(category_spending) > 0:
            top_category = category_spending.index[0]
            top_amount = category_spending.iloc[0]
            suggestion = f"You're spending a lot on **{top_category}** (₹{top_amount:,.0f} in 30 days). Try to reduce it by 15% this month."
            suggestions.append(suggestion)

        return suggestions

    def spending_trend_increase_alert(self, data_30_days: pd.DataFrame) -> List[str]:
        """
        Compare last 15 days vs previous 15 days spending
        """
        suggestions = []
        if data_30_days.empty:
            return suggestions

        last_15_days_start = self.latest_date - timedelta(days=15)
        prev_15_days_start = self.latest_date - timedelta(days=30)
        prev_15_days_end = self.latest_date - timedelta(days=15)

        last_15_days = data_30_days[data_30_days['date'] >= last_15_days_start]
        prev_15_days = data_30_days[
            (data_30_days['date'] >= prev_15_days_start) &
            (data_30_days['date'] < prev_15_days_end)
        ]

        last_15_total = last_15_days['amount'].sum()
        prev_15_total = prev_15_days['amount'].sum()

        if prev_15_total > 0:
            increase_percentage = ((last_15_total - prev_15_total) / prev_15_total) * 100

            if increase_percentage >= 25:
                suggestion = f"Your total spending is accelerating! It increased by {increase_percentage:.0f}% in the last 15 days."
                suggestions.append(suggestion)

        return suggestions

    def category_spike_alert(self, data_30_days: pd.DataFrame) -> List[str]:
        """
        Detect category spikes in the last 7 days vs previous 3 weeks average
        """
        suggestions = []
        if data_30_days.empty:
            return suggestions

        last_7_days_start = self.latest_date - timedelta(days=7)
        prev_3_weeks_start = self.latest_date - timedelta(days=28)
        prev_3_weeks_end = self.latest_date - timedelta(days=7)

        last_7_days = data_30_days[data_30_days['date'] >= last_7_days_start]
        prev_3_weeks = data_30_days[
            (data_30_days['date'] >= prev_3_weeks_start) &
            (data_30_days['date'] < prev_3_weeks_end)
        ]

        last_7_category_spending = last_7_days.groupby('category')['amount'].sum()
        prev_3_weeks_category_spending = prev_3_weeks.groupby('category')['amount'].sum()
        weekly_avg_spending = prev_3_weeks_category_spending / 3

        for category in last_7_category_spending.index:
            last_7_amount = last_7_category_spending[category]
            if category in weekly_avg_spending.index:
                avg_weekly_amount = weekly_avg_spending[category]
                if avg_weekly_amount > 0 and last_7_amount >= (2 * avg_weekly_amount):
                    increase_percentage = ((last_7_amount - avg_weekly_amount) / avg_weekly_amount) * 100
                    suggestion = f"Your **{category}** expenses increased a lot this week. You spent ₹{last_7_amount:,.0f}, which is {increase_percentage:.0f}% more than your recent average."
                    suggestions.append(suggestion)

        return suggestions

    def generate_all_suggestions(self) -> List[str]:
        """
        Generate all types of financial suggestions
        """
        all_suggestions = []
        data_30_days = self.get_last_30_days_data()

        all_suggestions.extend(self.high_spending_category_alert(data_30_days))
        all_suggestions.extend(self.spending_trend_increase_alert(data_30_days))
        all_suggestions.extend(self.category_spike_alert(data_30_days))

        return all_suggestions