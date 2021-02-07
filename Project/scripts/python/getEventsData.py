import MySQLdb
import random
import requests
import json
from time import time
import csv

db = MySQLdb.connect(host="192.168.1.123",
                     user="developer",
                     passwd="euRkVpvi56SwuKf4qYw8Ug",
                    )
cursor = db.cursor()
data = []

for day in [x for x in range(1577836800, 1577836800+(86400*10), 86400)]:
    query = "select request_id, cli, e.fleet_id, taxi, time, dispatch_date, schedule_date, event, taxiFlags, reqFlags  from taxilinkdb_rtcc.event as e  join taxilinkdb_rtcc.request as r on r.id = e.request_id and r.fleet_id = e.fleet_id where r.fleet_id = 0 and r.dispatch_date>=" + str(day) + " and r.dispatch_date<" +str(day+86400)+ ";"

    cursor.execute(query)
    records = cursor.fetchall()

    for r in records:
        data.append([e for e in r])
    print(day)

# save file
csv_file = "luc_csv.csv"
try:
    with open(csv_file, 'w') as f:
        for d in data:
            f.write("%s\n"%(str(d)[1:-1]))

except IOError:
    print("I/O error")
