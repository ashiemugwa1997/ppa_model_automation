from django.db import models

# Create your models here.
import numpy as np
from calendar import month
import pandas as pd
import numpy as np
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


class DataChecks:
    def __init__(self, df, columns, df_name, floats, ints):
        self.df = df
        self.columns = columns
        self.df_name = df_name
        self.floats = floats
        self.ints = ints

    def _convert_to_dtype(self, columns, dtype):
        """
        Converts columns to a particular data type. Returns a list of columns where the conversion failed

        Args:
            columns: a list of columns to be converted to dtype
            dtype: the data type to be converted to
        """
        failed_conversion = []
        for i in columns:
            try:
                self.df[i] = self.df[i].astype(dtype)
            except:
                failed_conversion.append(i)
        return failed_conversion

    def validate_data_types(self):
        """
        Saves lists of columns that not in the required data types and failed to be converted
        """
        cat_cols = self.df.select_dtypes(include='O').columns
        self.df[cat_cols] = self.df[cat_cols].apply(lambda x: x.str.strip().str.title())

        try:
            # TODO this try except block need to be revisited
            self.float_failed_conversion = self._convert_to_dtype(self.floats, 'float')
        except:
            pass

        try:
            self.ints_failed_conversion = self._convert_to_dtype(self.ints, 'int')
        except:
            pass

    def validate_data_columns(self):
        """
        Checks if a daframe has all the required columns

        Args:
            df: The dataframe to be validated
            columns: A list of columns that are required to be in the dataframe
            df_name: The name of the dataframe. It is used for identification when an error message is printed
                        This should either be SourceData, CombinedRatios or ClassOfBusiness
        """

        self.df.columns = self.df.columns.str.strip()
        missing_columns = [i for i in self.columns if not i in self.df.columns]
        self.missing_columns = missing_columns

    def validate_data_missing_values(self):
        """
        Checks if there are missing values in the dataframe
        Prints the rows containing missing values
        """
        missing_data_df = self.df.loc[self.df.isnull().any(axis=1)]
        self.missing_data_df = missing_data_df

    def validate_data_dates(self):
        """
        Checks if date columns are seen as dates. If they are not, the function tries to convert all the date columns to timestamp using the pd.to_datetime function. The dates should have the format dd/mm/yyyy for the coneversion to work
        """
        date_columns = self.df.columns[self.df.columns.str.contains('date', case=False)]
        invalid_dates = []
        for i in date_columns:
            if self.df[i].dtypes != np.dtype('datetime64[ns]'):
                try:
                    self.df[i] = pd.to_datetime(i, format='%d/%m/%Y')
                except:
                    invalid_dates.append(i)
        self.invalid_dates = invalid_dates

    def data_check_report(self):
        self.validate_data_columns()
        self.validate_data_missing_values()
        self.validate_data_types()
        self.validate_data_dates()
        if len(self.missing_columns) > 0:
            st.warning(f"The following columns are missing from the {self.df_name} dataframe:\n{self.missing_columns}")
        else:
            st.success(f'Required Columns Validation for {self.df_name} Completed')

        if len(self.missing_data_df) > 0:
            st.warning(
                f'The below rows in the {self.df_name} dataframe contains missing values. Fill in the missing value '
                f'for the model to work')
            st.write(self.missing_data_df.loc[:, self.missing_data_df.isnull().any()])
        else:
            st.success(f'Missing Information Validation for {self.df_name} Completed')

        if len(self.float_failed_conversion) > 0:
            st.warning(
                f'The columns {self.float_failed_conversion} have some values which are not numeric and cannot be '
                f'converted to floats')
        else:
            st.success('Checks on float columns done')

        if len(self.ints_failed_conversion) > 0:
            st.warning(
                f'The columns {self.ints_failed_conversion} have some values which are not numeric and cannot be '
                f'converted to integers')
        else:
            st.success('Checks on Integer columns done')

        if len(self.invalid_dates) > 0:
            st.warning(
                f'The following columns are not being recognised as dates. Check and Change the format of all the '
                f'dates to dd/mm/yyyy \n{self.invalid_dates}')
        else:
            st.success(f'Dates Validation for {self.df_name} Completed')

        if len(self.missing_columns) > 0 or len(self.missing_data_df) > 0 or len(self.invalid_dates) > 0 or len(
                self.float_failed_conversion) > 0 or len(self.ints_failed_conversion) > 0:
            st.warning('Please fix the above issues before running the model')  # TODO add a button to fix the issues


class PAAEligibilityTestingAndGrouping:
    def __init__(self, df, loss_ratio_threshold):
        """
            Args:
                1. df: Dataframe containing cashflow estimations
                2. loss_ratio_threshold: a threshold to determine if a contact is profitable or not
            Ideally this class should be used after an object has been created from the CashFlowEstimation class

        """
        self.df = df
        self.loss_ratio_threshold = loss_ratio_threshold

    def automatic_paa(self):
        self.df['Automatic PAA Eligibility Test'] = np.where(self.df.duration <= 12, 'Automatic PAA',
                                                             'Test For Eligibility')
        self.auto_paa = self.df.loc[self.df['Automatic PAA Eligibility Test'] == 'Automatic PAA']

    def eligibitlity_test(self):
        pass

    def _group_contracts(self):
        is_profitable = np.where(self.auto_paa['Combined Loss Ratio'] < self.loss_ratio_threshold, 1, 0)
        self.auto_paa['Final Groups of Contracts'] = self.auto_paa['Start Date'].dt.year.astype(str) + '.' + \
                                                     self.auto_paa['Portfolio ID'].astype(
                                                         str) + '.' + is_profitable.astype(str)

    def test_and_group(self):
        self.automatic_paa()
        self.eligibitlity_test()
        self._group_contracts()
        self.groups = self.auto_paa['Final Groups of Contracts'].value_counts()

    def analyze_groups(self):
        groups = self.auto_paa.groupby('Final Groups of Contracts').agg({'Start Date': 'min',
                                                                         'Ending Date': 'max',
                                                                         'Premium Installment': 'sum',
                                                                         'Total Premium': 'sum',
                                                                         'PV Premiums': 'sum',
                                                                         'PV Claims': 'sum',
                                                                         'PV Expenses': 'sum',
                                                                         'Risk Adjustment': sum,
                                                                         'FCFs': 'sum',
                                                                         'Acquisition Costs': 'sum'})
        self.groups_stats = groups.assign(
            combined_loss_ratio=(groups['PV Claims'] + groups['PV Expenses'] + groups['Risk Adjustment']) / groups[
                'PV Premiums'])


class MonthlyResults:
    def __init__(self, df: pd.DataFrame, measurement_date: pd.Timestamp):
        self.df = df
        self.measurement_date = measurement_date

    def _initial_measurement_date(self, group_name):
        return self.df.groupby('Final Groups of Contracts')['Start Date'].min()[group_name]

    def _group_end_date(self, group_name):
        return self.df.groupby('Final Groups of Contracts')['Ending Date'].max()[group_name]

    def _group_on_date(self, group_name, date):
        grouped = self.df.groupby(['Final Group of Contracts', 'Start Date'])
        return grouped.get_group((group_name, date))

    def _period_boundaries(self, month_and_year: pd.Period):
        """
        Returns two dates(start and end) which are the start and the end of a specified month in a particular year where initial_measurement_date <= start <= end <= measurement_date

        Args:
            month_and_year: An string representing the month and year in the format 'YYYY/mm'
        """
        start = pd.Timestamp(year=month_and_year.year, month=month_and_year.month, day=1)
        if month_and_year.month in [1, 3, 5, 7, 8, 10, 12]:
            max_day_value = 31
        elif month_and_year.month in [4, 6, 9, 11]:
            max_day_value = 30
        elif month_and_year.month == 2:
            if self.measurement_date.year % 4 == 0:
                max_day_value = 29
            else:
                max_day_value = 28

        end = pd.Timestamp(year=month_and_year.year, month=month_and_year.month, day=max_day_value)

        return start, end

    def group(self, group_name):
        """
        Returns a dataframe which contains contracts from the same group

        Args:
            group_name: the name of the group to be filtered
        """
        return self.df.groupby('Final Groups of Contracts').get_group(group_name)

    def prems_or_acquisition_costs_in_the_period(self, typ, start, end, group):
        """
        Returns the total premiums or acquisition costs in a particular month in the measurement period:

        Args:
            group_name: the group we are making calculation for
            typ: Total Premiums or Acquisition Costs
            start, end: The start and end of the month calculated using the period boundaries method
            group: The group we are making calculations for. It is calculated using the group method
        """
        return group.loc[(group['Start Date'] >= start) & (group['Start Date'] <= end), typ].sum()

    def _elapsed_time(self, group, end):
        """
        Returns the number of months between the start date of each contract in a group and the end of period(month) we are making calculations for

        Args:
            group: The group we are making calculations for. It is obtained using the group method
            end: The end of the month, on which we are making calculations
        """
        elapsed_time = (pd.Period(end, 'M') - group['Start Date'].dt.to_period('M')).apply(lambda x: x.n) + 1
        elapsed_time.loc[elapsed_time < 0] = 0
        elapsed_time.loc[pd.Period(end, 'M') > group['Ending Date'].dt.to_period('M')] = 0
        return elapsed_time

    def ammortisation_in_the_period(self, group, start, end, typ):
        """
        Return the insurance revenue, acquisition costs or loss component ammortised for the period. The period is one month

        Args:
            group: The group for which we are making calculations for. It is obtained from the group method
            start, end: The start or end of the month for which we want to ammortised the cashflows. They are obtained from the period boundaries method
            typ: Total Premiums, Acquisition Costs
        """
        group = group.loc[(group['Start Date'] <= end) & (group['Ending Date'] >= start)]
        return (group[typ] * (1 / group['duration'])).sum()

    def compute_month_results(self, group_name, month_and_year):
        start, end = self._period_boundaries(month_and_year=month_and_year)
        group = self.group(group_name=group_name)
        premiums_in_the_period = self.prems_or_acquisition_costs_in_the_period(typ='Total Premium', start=start,
                                                                               end=end, group=group)
        acquisition_costs_in_the_period = self.prems_or_acquisition_costs_in_the_period('Acquisition Costs',
                                                                                        start=start, end=end,
                                                                                        group=group)
        insurance_revenue = self.ammortisation_in_the_period(group=group, start=start, end=end, typ='Total Premium')
        ammortised_acquisiton_costs = self.ammortisation_in_the_period(group=group, start=start, end=end,
                                                                       typ='Acquisition Costs')

        return pd.DataFrame(
            [[0], [premiums_in_the_period], [-acquisition_costs_in_the_period], [ammortised_acquisiton_costs],
             [-insurance_revenue], [0]], columns=[end.month_name() + ' ' + str(end.year)],
            index=['Opening Balance', 'Premiums Received', 'Acquisition Costs', 'Ammortised Acquisition Costs',
                   'Insurance Revenue', 'Closing Balance'])

    def results(self, group_name):
        st.markdown(f'#### {group_name}')
        tables = []

        period = self.measurement_date.to_period('M') - self._initial_measurement_date(group_name=group_name).to_period(
            'M')
        for i in range(period.n + 1):
            if self._initial_measurement_date(group_name=group_name) > self.measurement_date:
                st.warning(
                    f'The measurement Date is less than the group start date. No Liability for group {group_name}')
                break
            if self._group_end_date(group_name=group_name).year < self.measurement_date.year:
                st.warning(
                    f'The group end year is less than the measurent year. The group {group_name} has been derecognised')
                break
            tables.append(self.compute_month_results(group_name=group_name, month_and_year=pd.Period(
                self._initial_measurement_date(group_name=group_name), 'M') + i))
        if len(tables) != 0:
            results = pd.concat(tables, axis=1)
            return self._insert_balances(results=results)

    def _insert_balances(self, results):
        columns = results.columns
        results.iat[0, 0] = 0
        results.iat[-1, 0] = results.iloc[:-1, 0].sum()
        for i in range(1, len(columns)):
            results.iat[0, i] = results.iat[-1, i - 1]
            results.iat[-1, i] = results.iloc[:-1, i].sum()
        return results
