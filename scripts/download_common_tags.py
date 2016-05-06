import json
import requests

key = 'waterway'
url = 'https://taginfo.openstreetmap.org/api/4/key/values?key={0}&sortname=count&sortorder=desc'

response = requests.get(url.format(key))

common_tags = json.loads(response.text)
results = list()
for common_tag in common_tags['data'][:20]:
    results.append(common_tag['value'])
print '\', \''.join(results)
