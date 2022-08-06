from calendar import month
import pandas as pd
import numpy as np

class MonthlyResults:
    def __init__(self, df:pd.DataFrame, measurement_date: pd.Timestamp):
        self.df = df
        self.measurement_date = measurement_date

    def _initial_measurement_date(self, group_name):
        return self.df.groupby('Final Groups of Contracts')['Start Date'].min()[group_name]

    def _group_end_date(self,group_name):
        return self.df.groupby('Final Groups of Contracts')['Ending Date'].max()[group_name]

    def _group_on_date(self, group_name,date):
        grouped = self.df.groupby(['Final Group of Contracts','Start Date'])
        return grouped.get_group((group_name, date))

    def _period_boundaries(self, month_and_year: pd.Period):
        """
        Returns two dates(start and end) which are the start and the end of a specified month in a particular year where initial_measurement_date <= start <= end <= measurement_date

        Args:
            month_and_year: An string representing the month and year in the format 'YYYY/mm'
        """
        start = pd.Timestamp(year=month_and_year.year,month=month_and_year.month, day=1)
        if month_and_year.month in [1,3,5,7,8,10,12]:
            max_day_value = 31
        elif month_and_year.month in [4,6,9,11]:
            max_day_value = 30
        elif month_and_year.month == 2:
            if self.measurement_date.year % 4 == 0:
                max_day_value = 29
            else:
                max_day_value = 28

        end = pd.Timestamp(year=month_and_year.year,month=month_and_year.month, day=max_day_value)

        return start, end

    def group(self, group_name):
        """
        Returns a dataframe which contains contracts from the same group

        Args:
            group_name: the name of the group to be filtered
        """
        return self.df.groupby('Final Groups of Contracts').get_group(group_name)


    def prems_or_acquisition_costs_in_the_period(self,typ,start, end, group):
        """
        Returns the total premiums or acquisition costs in a particular month in the measurement period:

        Args:
            group_name: the group we are making calculation for
            typ: Total Premiums or Acquisition Costs
            start, end: The start and end of the month calculated using the period boundaries method
            group: The group we are making calculations for. It is calculated using the group method 
        """
        return group.loc[(group['Start Date'] >= start) & (group['Start Date'] <= end), typ].sum()

    def _elapsed_time(self,group,end):
        """
        Returns the number of months between the start date of each contract in a group and the end of period(month) we are making calculations for

        Args:
            group: The group we are making calculations for. It is obtained using the group method
            end: The end of the month, on which we are making calculations 
        """
        elapsed_time = (pd.Period(end,'M') - group['Start Date'].dt.to_period('M')).apply(lambda x: x.n) + 1
        elapsed_time.loc[elapsed_time < 0] = 0
        elapsed_time.loc[pd.Period(end,'M') > group['Ending Date'].dt.to_period('M')] = 0
        return elapsed_time

    def ammortisation_in_the_period(self,group,start,end,typ):
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
        premiums_in_the_period = self.prems_or_acquisition_costs_in_the_period(typ = 'Total Premium',start = start, end=end, group=group)
        acquisition_costs_in_the_period = self.prems_or_acquisition_costs_in_the_period('Acquisition Costs',start=start,end=end,group=group)
        insurance_revenue = self.ammortisation_in_the_period(group=group, start=start,end=end, typ='Total Premium')
        ammortised_acquisiton_costs = self.ammortisation_in_the_period(group=group,start=start,end=end,typ='Acquisition Costs')

        return pd.DataFrame([[0],[premiums_in_the_period],[-acquisition_costs_in_the_period],[ammortised_acquisiton_costs],[-insurance_revenue],[0]], columns = [end.month_name() + ' ' + str(end.year)], index = ['Opening Balance','Premiums Received', 'Acquisition Costs','Ammortised Acquisition Costs','Insurance Revenue','Closing Balance'])


    def results(self,group_name):
        st.markdown(f'#### {group_name}')
        tables = []

        period = self.measurement_date.to_period('M') - self._initial_measurement_date(group_name=group_name).to_period('M')
        for i in range(period.n + 1):
            if self._initial_measurement_date(group_name=group_name) > self.measurement_date:
                st.warning(f'The measurement Date is less than the group start date. No Liability for group {group_name}')
                break
            if self._group_end_date(group_name = group_name).year < self.measurement_date.year:
                st.warning(f'The group end year is less than the measurent year. The group {group_name} has been derecognised')
                break
            tables.append(self.compute_month_results(group_name=group_name,month_and_year= pd.Period(self._initial_measurement_date(group_name=group_name),'M') + i))
        if len(tables) != 0:
            results = pd.concat(tables,axis = 1)
            return self._insert_balances(results=results)

    def _insert_balances(self,results):
        columns = results.columns
        results.iat[0,0] = 0
        results.iat[-1,0] = results.iloc[:-1,0].sum()
        for i in range(1,len(columns)):
            results.iat[0,i] = results.iat[-1,i-1]
            results.iat[-1,i] = results.iloc[:-1,i].sum()
        return results
