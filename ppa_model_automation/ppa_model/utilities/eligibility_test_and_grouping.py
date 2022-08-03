import pandas as pd
import numpy as np


class PAAEligibilityTestingAndGrouping:
    def __init__(self,df, loss_ratio_threshold):
        """
            Args:
                1. df: Dataframe containing cashflow estimations
                2. loss_ratio_threshold: a threshold to determine if a contact is profitable or not
            Ideally this class should be used after an object has been created from the CashFlowEstimation class
            
        """
        self.df = df
        self.loss_ratio_threshold = loss_ratio_threshold
        
    def automatic_paa(self):
        self.df['Automatic PAA Eligibility Test'] = np.where(self.df.duration <= 12,'Automatic PAA','Test For Eligibility')
        self.auto_paa = self.df.loc[self.df['Automatic PAA Eligibility Test'] == 'Automatic PAA']
        
    def eligibitlity_test(self):
        pass
    
    def _group_contracts(self):
        is_profitable = np.where(self.auto_paa['Combined Loss Ratio'] < self.loss_ratio_threshold,1,0)
        self.auto_paa['Final Groups of Contracts'] = self.auto_paa['Start Date'].dt.year.astype(str) + '.' + self.auto_paa['Portfolio ID'].astype(str) + '.' + is_profitable.astype(str)

    def test_and_group(self):
        self.automatic_paa()
        self.eligibitlity_test()
        self._group_contracts()
        self.groups = self.auto_paa['Final Groups of Contracts'].value_counts()
        
    def analyze_groups(self):
        groups = self.auto_paa.groupby('Final Groups of Contracts').agg({'Start Date':'min',
                                              'Ending Date':'max',
                                              'Premium Installment':'sum',
                                              'Total Premium':'sum',
                                              'PV Premiums':'sum',
                                              'PV Claims':'sum',
                                              'PV Expenses': 'sum',
                                              'Risk Adjustment':sum,
                                              'FCFs':'sum',
                                              'Acquisition Costs':'sum'})
        self.groups_stats = groups.assign(combined_loss_ratio = (groups['PV Claims'] + groups['PV Expenses'] + groups['Risk Adjustment']) / groups['PV Premiums'])