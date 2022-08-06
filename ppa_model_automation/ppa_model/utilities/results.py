import pandas as pd

class Results:
    def __init__(self, df):
        self.df = df
        
    def _initial_measurement_date(self,group_name):
        """
        Returns the minimum start date for a given group of contracts
        Args:
            - group_name: The name of the group to find minimum start date from e.g. 2021.104.1
        """
        return self.df.groupby('Final Groups of Contracts')['Start Date'].min()[group_name] 
    
    def _group_on_date(self, group_name, date):
        """
        Returns a group of contacts present at a particular start date
        
        Args:
            - date: a date which may be an Initial Measurement for a particular group of contracts
        """
        grouped = self.df.groupby(['Final Groups of Contracts','Start Date'])
        group = grouped.get_group((group_name, date))
        return group
    
    def _get_group_name(self):
        return input('Enter Group name you want to make calculations for: ')
    
    def _get_measurement_date(self):
        return input('Enter date you want to make calculations for: ')
    
    def _premiums_on_initial_measurement(self, group_name):
        """
        Returns the total premiums recieved on the earliest start date of the policies in the group
        """
        initial_measurement_date = self._initial_measurement_date(group_name)
        group = self._group_on_date(group_name, initial_measurement_date)
        return group[['PV Premiums', 'Ending Date']]
    
    def _acquisition_costs_on_initial_measurement(self,group_name):
        """
        Returns the total acquisition costs of contracts present at the earliest start of a group
        """
        # This code needs refactoring. This function has some similar lines of code like premiums_on_initial_measurement
        initial_measurement_date = self._initial_measurement_date(group_name)
        group = self._group_on_date(group_name, initial_measurement_date)
        return group[['Acquisition Costs', 'Ending Date']]
    
    def _elapsed_time(self, measurement_date, group_name):
        """
        Returns the time between the start date and the measurement date per each contract in a group.
        It also returns the group
        """
        group = self.df.groupby('Final Groups of Contracts').get_group(group_name)
        elapsed_time = (pd.Period(measurement_date,'M') - group['Start Date'].dt.to_period('M')).apply(lambda x: x.n) + 1
        elapsed_time.loc[elapsed_time < 0] = 0
        elapsed_time.loc[pd.Period(measurement_date,'M') > group['Ending Date'].dt.to_period('M')] = 0
        return group, elapsed_time
    
    def lfrc_at_initial_measurement(self,group_name):
        """
        Returns the opening balance at Initial Measurement which is found by subtracting the acquisition costs from the premiums
        """
        premiums = self._premiums_on_initial_measurement(group_name)
        acquisition_costs = self._acquisition_costs_on_initial_measurement(group_name)
        return (premiums['PV Premiums'] - acquisition_costs['Acquisition Costs']).sum()
    
    def opening_balance(self, measurement_date,group_name):
        premiums = self._premiums_on_initial_measurement(group_name)
        acquisition_costs = self._acquisition_costs_on_initial_measurement(group_name)
        opening_bal = premiums['PV Premiums'] - acquisition_costs['Acquisition Costs']
        return opening_bal.loc[premiums['Ending Date'] >= measurement_date].sum()

    
    def premiums_received_in_the_period(self, group_name, measurement_date, group):
        """
        Returns the summation of all the premiums received in a group in the period from the initial measurement to the measurement date
        """
        # TODO
        # Ideally we should use date of premium payment insted of start date
        # We should also factor varying premium payment frequency
        return group.loc[(group['Start Date'] <= measurement_date) &
                          (group['Ending Date'] >= measurement_date) &
                          (group['Final Groups of Contracts'] == group_name),'Total Premium'].sum()

    def acquisition_costs_in_the_period(self, group_name, measurement_date, group):
        return group.loc[(group['Start Date'] <= measurement_date) &
                          (group['Ending Date'] >= measurement_date) &
                          (group['Final Groups of Contracts'] == group_name),'Acquisition Costs'].sum()


    def acquisition_costs_ammortised_over_the_period(self, measurement_date, elapsed_time, group, group_name):
        """
        Returns the ammortised acquisition costs
        """
        group = group.loc[(group['Start Date'] <= measurement_date) &
                          (group['Ending Date'] >= measurement_date) &
                          (group['Final Groups of Contracts'] == group_name)]
        return (group['Acquisition Costs']  *   elapsed_time / group['duration']).sum()
    
    def insurance_revenue(self, measurement_date, elapsed_time, group):
        group = group.loc[group['Start Date'] <= measurement_date]
        group = group.loc[group['Ending Date'] >= measurement_date]
        return (group['Total Premium'] * (elapsed_time / group['duration'])).sum()
    
    #TODO
    # premiums received in the period, acquisition costs in the period, acquisition costs ammortised over the period and insurance revenue have some similar code. This can be made into a seperate stand alone function which is called  

    def compute_results(self,group_name, measurement_date):
        group, elapsed_time = self._elapsed_time(measurement_date=measurement_date, group_name=group_name)
        initial_measurement_date = self._initial_measurement_date(group_name=group_name)
        opening_balance =  self.opening_balance(group_name=group_name, measurement_date=measurement_date)
        premiums_received_in_the_period = self.premiums_received_in_the_period(group_name=group_name,
                                                                               measurement_date=measurement_date,
                                                                               group=group)
        acquisition_costs_in_the_period = self.acquisition_costs_in_the_period(group_name,measurement_date,group)

        acquisition_costs_ammortised_over_the_period = self.acquisition_costs_ammortised_over_the_period(measurement_date=measurement_date,
                                                                                                         elapsed_time=elapsed_time,
                                                                                                         group=group, group_name=group_name)
        insurance_revenue = self.insurance_revenue(measurement_date=measurement_date,
                                                   elapsed_time=elapsed_time,
                                                   group=group)

        results = pd.DataFrame([[opening_balance],[premiums_received_in_the_period],[-acquisition_costs_in_the_period],[acquisition_costs_ammortised_over_the_period],[-insurance_revenue]], index = ['Opening Balance', 'Premiums Recieved', 'Acquisiton Costs','Amortised Acquisition Costs', 'Insurance Revenue'], columns = [group_name])
        LFRC = results.sum().values[0]
        results.loc['LFRC', group_name] = LFRC
        return results