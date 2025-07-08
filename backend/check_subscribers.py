import sqlite3
import csv

# Connect to the SQLite database
conn = sqlite3.connect("subscribers.db")
cursor = conn.cursor()

# Query to select all data from the subscribers table
cursor.execute("SELECT * FROM subscribers")

# Fetch all rows
rows = cursor.fetchall()

# Get column names
column_names = [description[0] for description in cursor.description]

# Open a CSV file and write the data
with open("subscribers.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    
    # Write column names
    writer.writerow(column_names)
    
    # Write data rows
    writer.writerows(rows)

# Close the connection
conn.close()

print("Data successfully exported to subscribers.csv")