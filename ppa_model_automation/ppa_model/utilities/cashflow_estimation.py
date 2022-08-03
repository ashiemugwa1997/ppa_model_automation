import pandas as pd
import numpy as np
from IPython.display import display
import streamlit as st


class CashFlowEstimation:
    """
        Used to estimate the cashflows for insurance contracts 
    """

    def __init__(self, df: pd.DataFrame, discount: float, combined_ratios: pd.DataFrame,
                 class_of_business: pd.DataFrame, risk_adjustment: float):
        """
            Initializes the variables needed to estimate the cashflows
            The data used by this module is the output of the data checks module
            
            Args:
                df: Dataframe containing the source data
                discount: used to calculate the present values
                combined_ratios: Dataframe containing the claims ratio, expense ratio and acquisition costs
                class_of_business: Dataframe containing portfolio id
        """
        self.df = df
        self.df.columns = self.df.columns.str.strip()

        self.discount = discount

        self.combined_ratios = combined_ratios
        self.combined_ratios.columns = self.combined_ratios.columns.str.strip()

        self.class_of_business = class_of_business
        self.class_of_business.columns = self.class_of_business.columns.str.strip()

        self.risk_adjustment = risk_adjustment

    def _merge_data(self):
        """
            Combines the df, combined_ratios and the class of business into a single dataframe
            The new datafram will be accessed via self.data
        """
        self.data = self.df.merge(self.combined_ratios, on='Class of Business').merge(self.class_of_business,
                                                                                      on='Class of Business')

    def _calculate_duration(self):
        """
            Creates a column named duration in the data. Duration = End Date - Start Date of the policy
        """
        duration = (self.data['Ending Date'].dt.to_period('M') - self.data['Start Date'].dt.to_period('M')).apply(
            lambda x: x.n) + 1
        self.data = self.data.assign(duration=duration)

    def _present_value_of_premiums(self):
        time = (self.data['Date of Premium Payment'] - self.data['Start Date']).dt.days
        time = time / 365.25
        pv_premiums = self.data['Premium Installment'] / ((1 + self.discount) ** time)
        self.data['PV Premiums'] = pv_premiums

    def _present_value_of_claims(self):
        self.data['PV Claims'] = self.data['PV Premiums'] * self.data['Claims Ratio']

    def _present_value_of_expenses(self):
        self.data['PV Expenses'] = self.data['PV Premiums'] * self.data['Expense Ratio']

    def _risk_adjustment(self):
        self.data['Risk Adjustment'] = (self.data['PV Claims'] + self.data['PV Expenses']) * self.risk_adjustment

    def _fulfillment_cashflow(self):
        self.data['FCFs'] = self.data['PV Premiums'] - self.data['PV Claims'] - self.data['PV Expenses'] - self.data[
            'Risk Adjustment']

    def _acquisition_costs(self):
        self.data['Acquisition Costs'] = self.data['PV Premiums'] * self.data['Acquisistion costs (Commissions)']

    def _combined_loss_ratio(self):
        self.data['Combined Loss Ratio'] = (self.data['PV Claims'] + self.data['PV Expenses'] + self.data[
            'Risk Adjustment']) / self.data['PV Premiums']

    def estimate_cashflows(self):
        self._merge_data()
        self._calculate_duration()
        self._present_value_of_premiums()
        self._present_value_of_claims()
        self._present_value_of_expenses()
        self._risk_adjustment()
        self._fulfillment_cashflow()
        self._acquisition_costs()
        self._combined_loss_ratio()
