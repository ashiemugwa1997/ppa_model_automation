import pandas as pd 
import numpy as np
from django.contrib import messages

class DataChecks:
    def __init__(self, df,columns,df_name,floats,ints):
        self.df = df
        self.columns = columns
        self.df_name = df_name
        self.floats = floats
        self.ints = ints

    def _convert_to_dtype(self,columns, dtype):
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
        cat_cols = self.df.select_dtypes(include = 'O').columns
        self.df[cat_cols] = self.df[cat_cols].apply(lambda x: x.str.strip().str.title())

        try:
            #TODO this try except block need to be revisited
            self.float_failed_conversion = self._convert_to_dtype(self.floats,'float')
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
        missing_data_df = self.df.loc[self.df.isnull().any(axis = 1)]
        self.missing_data_df = missing_data_df

    def validate_data_dates(self):
        """
        Checks if date columns are seen as dates. If they are not, the function tries to convert all the date columns to timestamp using the pd.to_datetime function. The dates should have the format dd/mm/yyyy for the coneversion to work
        """
        date_columns = self.df.columns[self.df.columns.str.contains('date',case = False)]
        invalid_dates = []
        for i in date_columns:
            if self.df[i].dtypes != np.dtype('datetime64[ns]'):
                try:
                    self.df[i] = pd.to_datetime(i, format='%d/%m/%Y')
                except:
                    invalid_dates.append(i)
        self.invalid_dates = invalid_dates

    def data_check_report(self, request):
        self.validate_data_columns()
        self.validate_data_missing_values()
        self.validate_data_types()
        self.validate_data_dates()
        if len(self.missing_columns) > 0:
            messages.add_message(request, messages.WARNING, f"The following columns are missing from the {self.df_name} dataframe:\n{self.missing_columns}")
        else:
            messages.add_message(request, messages.SUCCESS, f'Required Columns Validation for {self.df_name} Completed')

        if len(self.missing_data_df) > 0:
            messages.add_message(request, messages.WARNING, f'The below rows in the {self.df_name} dataframe contains missing values. Fill in the missing '
                       f'value for the model to work')
            # st.write(self.missing_data_df.loc[:,self.missing_data_df.isnull().any()])
        else:
            messages.add_message(request, messages.SUCCESS, f'Missing Information Validation for {self.df_name} Completed')
        
        if len(self.float_failed_conversion) > 0:
            messages.add_message(request, messages.WARNING, f'The columns {self.float_failed_conversion} have some values which are not numeric and cannot '
                       f'be converted to floats')
        else:
            messages.add_message(request, messages.SUCCESS, 'Checks on float columns done')

        if len(self.ints_failed_conversion) > 0:
            messages.add_message(request, messages.WARNING, f'The columns {self.ints_failed_conversion} have some values which are not numeric and cannot '
                       f'be converted to integers')
        else:
            messages.add_message(request, messages.SUCCESS, 'Checks on Integer columns done') 

        if len(self.invalid_dates) > 0:
            messages.add_message(request, messages.WARNING, f'The following columns are not being recognised as dates. Check and Change the format of all '
                       f'the dates to dd/mm/yyyy \n{self.invalid_dates}')
        else:
            messages.add_message(request, messages.SUCCESS, f'Dates Validation for {self.df_name} Completed')

        if len(self.missing_columns) > 0 or len(self.missing_data_df) > 0 or len(self.invalid_dates) > 0 or len(self.float_failed_conversion) > 0 or len(self.ints_failed_conversion) > 0:
            messages.add_message(request, messages.ERROR, "Error occurred")