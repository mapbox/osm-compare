import json
import csv

json_filename = 'data/user_blocks.json'
csv_filename = 'data/user_blocks.csv'

with open(json_filename) as f:
    user_blocks = json.load(f)

with open(csv_filename, 'w') as f:
    writer = csv.writer(f, delimiter='|')
    field_names = ['id', 'blocked_user', 'blocked_by', 'reason', 'created_at', 'ends_at']
    writer.writerow(field_names)
    for user_block in user_blocks:
        writer.writerow([
            user_block['id'],
            user_block['blocked_user'].encode('utf-8'),
            user_block['blocked_by'].encode('utf-8'),
            user_block['reason'].encode('utf-8'),
            user_block['created_at'],
            user_block['ends_at'],
        ])
