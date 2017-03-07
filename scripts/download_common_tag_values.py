import json
import requests

key = 'highway'
url = 'https://taginfo.openstreetmap.org/api/4/key/values?key={0}'

response = requests.get(url.format(key))

common_tag_values = json.loads(response.text)
target = open('common_tag_values/highway.json', 'w')
target.write(json.dumps(common_tag_values))
target.close()