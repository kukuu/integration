# Data Transformation - Digital Twin Energy Meter


## Problem Statement:
i. Execute in steps and best practices data transformation techniques using Python in a use case for converting a multitude of spreadsheet data comprising electricity meter consumption readings, cleansing them and storing them in (Windows/AZURE SQL) a Database. 

Present a  Python code for ensuring such transformation using an example of a Spreadsheet record list below ( live streaming from an asynchronous distributed system via an API) of the following format order:

 - SMR89134A, SMR89135A... SMR89154A (20 RECORDS)

- SMR89134B, SMR89135B... SMR89154B (20 RECORDS)

- SMR89134C, SMR89135C... SMR89154C (20 RECORDS). 

ii. Attach a TIME STAMP to each of the records and indicate in Python how you would archive the live streaming readings into an ARCHIVE Folder every 30 days. Attach an SQL query statement that will segregate the 3 different data sources into 3 different tables. 

iv. Add ERROR handling and exceptions to the code.

iii. Provide a batch processing code in Python that will send the readings in the Database to a Sponsored owner at an email address.

## Steps and Best Practices for Data Transformation Using Python

- Data Extraction:

Load data from multiple spreadsheets (Excel files).
Use libraries like pandas to efficiently read and manipulate data.
Stream data live from sources where possible.
Data Cleansing:

- Handle missing or null values using imputation or removal.

- Standardize data formats (e.g., date and time).

- Remove duplicates or erroneous records.

- Validate data integrity (e.g., check meter reading formats).

- Transformation:

i. Add a timestamp column to each record.
Aggregate data as necessary (e.g., by date or by meter ID).
Ensure consistent naming and data types.
Data Storage:


ii. Use pyodbc or SQLAlchemy to connect to a Windows/AZURE SQL database.
Write transformed data into appropriate database tables.
Archive live streaming readings into an archive folder every 30 days.
SQL Segregation:

iii. Write SQL queries to separate the 3 data sources into distinct database tables.

- Batch Processing:

i. Use batch processing techniques to send periodic data to the sponsored owner.

ii.Automate email sending using Python libraries like smtplib or email.
