# Data Processing & Transformation - Digital Twin Energy Meter 

## Blueprint

This architecture ensures scalable data transformation and storage while providing regular batch processing and reporting. It also implements an effective archival mechanism for older data.

## A - Task:
i. This work provides execution  steps and best practices in data transformation techniques using Python in a use case for converting a multitude of spreadsheet data comprising electricity meter consumption readings, cleansing them and storing them in a Database. 

Using Python for ensuring data ingestion, cleansing, transformation and for batch processing multiple Spreadsheet as data source ( including live streaming from an asynchronous distributed system via an API). Example of the format of sample data is provided below:

 - SMR89134A, SMR89135A... SMR89154A (20 RECORDS)

- SMR89134B, SMR89135B... SMR89154B (20 RECORDS)

- SMR89134C, SMR89135C... SMR89154C (20 RECORDS). 

ii. Attach a TIME STAMP to each of the records as they a streamed/registered and archive every 30 days. 

iii. Attach an SQL query statement that will segregate the 3 different data sources into 3 different tables.

iv. Calculate mean values of meter readings over peak periods (time series). Add Graphs.

v. Add ERROR handling and exceptions to the code.

vi. Provide a batch processing code (in Python) that will send the readings in the Database to a Sponsored owner at an email address.


## B - Architecture - DATA PIPELINE

```


               DATA INGESTION LAYER
+-------------------------------------------------+
|   Input Sources                                 |
| - Synthetic Data
| - Excel Files with Meter Consumption Data       |
| - Real-time Streaming of Meter Readings         |
| - API Endpoints for External Data Sources       |
+-------------------------------------------------+
|   Tools                                         |
| - Python (Pandas, OpenPyXL for spreadsheets)    |
| - Kafka or RabbitMQ for real-time streaming     |
+-------------------------------------------------+
                    |
            DATA TRANSFORMATION LAYER
                    |                            
+-------------------------------------------------+
|   Data Cleansing                                |
| - Handle missing,duplicate or invalid meter     |
|    readings                                     |
| - Standardize timestamps and formats            |
+-------------------------------------------------+
|   Data Transformation                           |
| - Aggregate daily, weekly, and monthly readings |
| - Create derived metrics (e.g., avg consumption)|
+-------------------------------------------------+
|   Tools                                         |
| - Python (NumPy, Pandas)                        |
| - PySpark for large-scale processing            |
+-------------------------------------------------+
                  |
            STORAGE LAYER
                  |
+-------------------------------------------------+
|   Database                                      |
| - PostgreSQL or MySQL for structured data       |
| - Separate tables for sources A, B, and C       |
| - Indexed columns for timestamp-based queries   |
+-------------------------------------------------+
|   Data Lake                                     |
| - S3/Blob Storage for raw and transformed data  |
+-------------------------------------------------+
                   |
             ARCHIVAL SYSTEM
                   |
+-------------------------------------------------+
|   Archival Process                              |
| - Move data older than 30 days to archive folder|
| - Compress files to reduce storage size         |
+-------------------------------------------------+
|   Tools                                         |
| - Python (Schedule/Crontab for automation)      |
| - Cloud Storage (AWS S3, GCP Bucket)            |
+-------------------------------------------------+
                   |
         BATCH PROCESSING & NOTIFICATION LAYER
                   |
+-------------------------------------------------+
|   Scheduled Jobs                                |
| - Batch export of data to stakeholders          |
| - Generate and email reports (PDF/CSV)          |
+-------------------------------------------------+
|   Notification System                           |
| - Send reports to bob@btl.com via SMTP          |
| - Integrate email notifications with SES/SendGrid|
+-------------------------------------------------+
|   Tools                                         |
| - Python (smtplib, pandas for formatting emails)|
| - Celery + RabbitMQ for batch processing        |
+-------------------------------------------------+
                   |
            MONITORING AND LOGGING
                   |
+-------------------------------------------------+
|   Logging                                       |
| - Track ingestion errors, transformation issues |
| - Log storage/archival successes or failures    |
+-------------------------------------------------+
|   Monitoring                                    |
| - Prometheus for pipeline metrics               |
| - Grafana for real-time dashboards and alerts   |
+-------------------------------------------------+


```
#### Summary Architecture Overview

The architecture for the end-to-end development process of processing electricity meter consumption readings includes the following key components:

- Data Ingestion Layer:

Tools: Python Scripts, Scheduler (e.g., Cron Jobs or Airflow)

Description: Python scripts read raw spreadsheet data (Excel/CSV files) from multiple sources. Data includes SMR89134A, SMR89134B, and SMR89134C records.

- Data Transformation Layer:

Tools: Python with Pandas and NumPy for data cleansing and transformation.
Description: Clean and validate data to ensure it is consistent, structured, and timestamped for ingestion into the database (remove NULL values, duplicates and errorneous values, attach TIMESPAM).

- Storage Layer:

Tools: Relational Database (PostgreSQL/MySQL).

Description: Store cleaned and timestamped data into three separate tables (for A, B, and C data sources).

- Archival System:

Tools: Python Script, File System (e.g., AWS S3 or Local Archive Folder).

Description: Archive live data to a specified directory every 30 days for historical reference.

- Batch Processing and Notification Layer:


Tools: Python Script, SMTP (Simple Mail Transfer Protocol) for email delivery.

Description: Generate periodic reports from the database and send the readings via email.


- Monitoring and Logging:

Tools: Logging Frameworks (e.g., Python logging), Dashboard (e.g., Grafana or Kibana for metrics and alerts).

Description: Track the health and success of the pipeline.


## C - Steps and Best Practices for Data Transformation Using Python

 #### Data Extraction / Ingestion:

- Load data from multiple spreadsheets (Excel files).
Use libraries like pandas to efficiently read and manipulate data.
Stream data live from sources where possible.

#### Data Cleansing:

- Handle missing or null values using imputation or removal.

- Standardize data formats (e.g., date and time).

- Remove duplicates or erroneous records.

- Validate data integrity (e.g., check meter reading formats).

#### Transformation:

i. Add a timestamp column to each record.

ii. Aggregate data as necessary (e.g., by date or by meter ID).

iii. Ensure consistent naming and data types.

#### Data Storage:


i. Use pyodbc or SQLAlchemy to connect to a Windows/AZURE SQL database.

ii. Write transformed data into appropriate database tables.

iii. Archive live streaming readings into an archive folder every 30 days.


#### SQL Segregation:

i. Write SQL queries to separate the 3 data sources into distinct database tables.


#### Batch Processing:

i. Use batch processing techniques to send periodic data to the sponsored owner.

ii.Automate email sending using Python libraries like smtplib or email.


### D - Simplified Python Code - Data Transformation:

```
import pandas as pd
import datetime
import os
import pyodbc
import shutil
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib

# Step 1: Data Extraction and Reading
def read_live_stream(file_path):
    df = pd.read_excel(file_path)  # Reading Excel file
    df['Timestamp'] = datetime.datetime.now()  # Add timestamp
    return df

# Step 2: Data Cleansing
def clean_data(df):
    df = df.drop_duplicates()
    df = df.dropna()  # Remove rows with null values
    return df

# Step 3: Data Transformation
def transform_data(df):
    # Add any necessary transformations (e.g., data standardization)
    return df

# Step 4: Data Storage in SQL
def store_data_in_sql(df, table_name, connection_string):
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()

    for _, row in df.iterrows():
        cursor.execute(f"""
            INSERT INTO {table_name} (MeterID, Reading, Timestamp)
            VALUES (?, ?, ?)
        """, row['MeterID'], row['Reading'], row['Timestamp'])
    conn.commit()
    conn.close()

# Step 5: Archive Old Files
def archive_files(source_folder, archive_folder, days=30):
    for file in os.listdir(source_folder):
        file_path = os.path.join(source_folder, file)
        if os.path.isfile(file_path) and (datetime.datetime.now() - datetime.datetime.fromtimestamp(os.path.getmtime(file_path))).days > days:
            shutil.move(file_path, archive_folder)

# Step 6: Sending Batch Data via Email
def send_email(subject, body, to_email, from_email, smtp_server, smtp_port, password):
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(from_email, password)
    server.send_message(msg)
    server.quit()

# Example Usage
if __name__ == "__main__":
    # File paths and connection strings
    live_stream_file = "live_stream.xlsx"
    connection_string = "Driver={SQL Server};Server=server_name;Database=database_name;UID=user;PWD=password;"
    source_folder = "./live_readings"
    archive_folder = "./archive"

    # Step 1-3: Read, Cleanse, and Transform Data
    df = read_live_stream(live_stream_file)
    df = clean_data(df)
    df = transform_data(df)

    # Step 4: Store Data in SQL
    store_data_in_sql(df, "MeterReadings", connection_string)

    # Step 5: Archive Files
    archive_files(source_folder, archive_folder)

    # Step 6: Send Batch Data via Email
    email_subject = "Meter Readings Batch Report"
    email_body = "The meter readings have been processed and stored in the database."
    send_email(email_subject, email_body, "bob@btl.com", "youremail@example.com", "smtp.example.com", 587, "yourpassword")

```
### E -  Example Dataset for the Spreadsheet

![image](https://github.com/kukuu/integration/blob/main/digital-twin-smart-%20energy-sample-data.png) 

### F - SQL Query for Segregation

```
-- Separate data sources into different tables
-- Table 1: Data Source A
CREATE TABLE MeterReadings_A AS 
SELECT * 
FROM MeterReadings 
WHERE MeterID LIKE 'SMR%34A';

-- Table 2: Data Source B
CREATE TABLE MeterReadings_B AS 
SELECT * 
FROM MeterReadings 
WHERE MeterID LIKE 'SMR%34B';

-- Table 3: Data Source C
CREATE TABLE MeterReadings_C AS 
SELECT * 
FROM MeterReadings 
WHERE MeterID LIKE 'SMR%34C';


```

### G - Batch Processing (Python)

i. Automate the batch processing, use a Python scheduler like schedule or cron (on Linux):

```
import schedule
import time

# Define a batch job
def batch_job():
    # Fetch data from SQL database and send it via email
    email_subject = "Daily Meter Readings Report"
    email_body = "Attached are the daily meter readings."
    send_email(email_subject, email_body, "bob@btl.com", "youremail@example.com", "smtp.example.com", 587, "yourpassword")

# Schedule the job to run daily at midnight
schedule.every().day.at("00:00").do(batch_job)

while True:
    schedule.run_pending()
    time.sleep(1)


```


ii.  Attach Timestamp and Archiving Readings (Python)

1. Reading Data and Attaching Timestamps

```
import pandas as pd
from datetime import datetime

# Sample data creation
data = {
    "SMR89134A": [10, 15, 20, 25],
    "SMR89134B": [30, 35, 40, 45],
    "SMR89134C": [50, 55, 60, 65]
}

# Create DataFrame
df = pd.DataFrame(data)

# Add timestamp to each record
df['timestamp'] = datetime.now()

# Save data to a file for ingestion
df.to_csv("meter_readings.csv", index=False)
print("Data with timestamps:")
print(df)


```

2. Archiving Data Every 30 Days

```
import os
import shutil
from datetime import datetime, timedelta

# Define source and archive folder
source_folder = "./live_data/"
archive_folder = "./archive/"

# Archive function
def archive_readings():
    current_time = datetime.now()
    cutoff_time = current_time - timedelta(days=30)

    # Iterate over files in the source folder
    for file_name in os.listdir(source_folder):
        file_path = os.path.join(source_folder, file_name)
        
        # Check file's last modified time
        file_modified_time = datetime.fromtimestamp(os.path.getmtime(file_path))
        if file_modified_time < cutoff_time:
            # Move file to archive folder
            shutil.move(file_path, os.path.join(archive_folder, file_name))
            print(f"Archived: {file_name}")

# Run the archiving function
archive_readings()

```

### H - Segregating Data Sources (SQL Query)

```
-- Create separate tables for the data sources
CREATE TABLE meter_readings_a (
    id SERIAL PRIMARY KEY,
    reading FLOAT,
    timestamp TIMESTAMP
);

CREATE TABLE meter_readings_b (
    id SERIAL PRIMARY KEY,
    reading FLOAT,
    timestamp TIMESTAMP
);

CREATE TABLE meter_readings_c (
    id SERIAL PRIMARY KEY,
    reading FLOAT,
    timestamp TIMESTAMP
);

-- Insert records into their respective tables
INSERT INTO meter_readings_a (reading, timestamp)
SELECT reading, timestamp FROM raw_readings WHERE source = 'A';

INSERT INTO meter_readings_b (reading, timestamp)
SELECT reading, timestamp FROM raw_readings WHERE source = 'B';

INSERT INTO meter_readings_c (reading, timestamp)
SELECT reading, timestamp FROM raw_readings WHERE source = 'C';

```

### I - Batch Processing and Sending Email (Python)

```
import smtplib
from email.mime.text import MIMEText
import psycopg2

# Database connection
def fetch_readings():
    connection = psycopg2.connect(
        dbname="meter_db",
        user="admin",
        password="password",
        host="localhost"
    )
    cursor = connection.cursor()
    
    # Fetch all readings
    cursor.execute("SELECT * FROM meter_readings_a;")
    readings_a = cursor.fetchall()
    
    cursor.execute("SELECT * FROM meter_readings_b;")
    readings_b = cursor.fetchall()
    
    cursor.execute("SELECT * FROM meter_readings_c;")
    readings_c = cursor.fetchall()
    
    connection.close()
    return readings_a, readings_b, readings_c

# Send email
def send_email():
    readings_a, readings_b, readings_c = fetch_readings()
    
    # Format the email content
    email_content = f"""
    Meter Readings Report:
    ----------------------
    Source A Readings: {readings_a}
    Source B Readings: {readings_b}
    Source C Readings: {readings_c}
    """
    
    # Email setup
    msg = MIMEText(email_content)
    msg['Subject'] = "Meter Readings Report"
    msg['From'] = "noreply@metering.com"
    msg['To'] = "bob@btl.com"
    
    # Send email
    with smtplib.SMTP('smtp.example.com', 587) as server:
        server.starttls()
        server.login("your_email@example.com", "your_password")
        server.send_message(msg)
        print("Email sent successfully!")

# Run the batch process
send_email()


```


## J - Infrastructure

- Development Tools:

i. Python (with libraries: pandas, numpy, sqlalchemy, smtplib)

ii. Jupyter Notebook for testing transformations.

iii. Git for version control.


- Storage and Database:

i. PostgreSQL/MySQL for data storage.

ii. Local file storage or AWS S3 bucket for archiving.


- Task Scheduler:

i. Apache Airflow or Cron for scheduling periodic tasks (data ingestion, archival).

- Email Delivery Service:

i. SMTP server or third-party service like SendGrid for sending email reports.

- Cloud or Local Hosting:

i. AWS EC2/Google Cloud VM or local server for hosting scripts and database.


## Repository

- https://github.com/kukuu/digital-twin-PV4-


##   MMHHS Target Operating Model

![image](https://github.com/kukuu/integration/blob/main/target-operating-model.png)


## Related tasks 

### Sub-tasks (Blueprints)

- Architecture Design Solutions for Energy Consumption:

https://github.com/kukuu/integration/blob/main/architecture-backend-energy-tasks.md


## V2 

- https://digital-twin-v2-chi.vercel.app/



## Related Links 

-  https://github.com/DataSolutionSoftware/Home
-  https://digital-twin-v2-chi.vercel.app/
-  https://github.com/kukuu/digital-twin-v2
-  https://github.com/kukuu/integration/blob/main/digital-twin.md
-  https://github.com/kukuu/digital-twin/tree/main
-  https://www.mhhsprogramme.co.uk/programme-information/programme-overview
-  https://github.com/kukuu/integration/tree/main
-  https://github.com/kukuu/integration/blob/main/digital-transformation-practices.md
