"""Download user blocks from: http://www.openstreetmap.org/user_blocks

Following is the content format:
<div class="" id="content">
<div class="content-heading">
<div class="content-inner">
<h1><a href="/user/Firefishy">Firefishy</a> blocked by <a href="/user/blackadder">blackadder</a></h1>
<ul class="secondary-actions clearfix">
<li><a href="/user_blocks">View all blocks</a></li>
</ul>
</div>
</div>
<div class="content-body">
<div class="content-inner">
<p><b>Created</b>: <span title="12 October 2009 at 19:51">over 6 years</span> ago</p>
<p><b>Status</b>: Ended <span title="12 October 2009 at 19:51">over 6 years</span> ago.</p>
<p><b>Reason for block:</b></p>
<div class="richtext"><p>This is testing the soft ban feature. Firefishy is not really a bad chap.</p></div>
</div>
</div>
</div>
"""
import json
import datetime
import requests
from bs4 import BeautifulSoup

filename = 'user_blocks.json'
url = 'http://www.openstreetmap.org/user_blocks'
dt_format = '%d %B %Y at %H:%M'

## Start and end of block ids.
block_ids = range(1, 940)

def parse_dt(string):
    return datetime.datetime.strptime(string, dt_format)

for i in block_ids:
    print i
    result = dict()
    result['id'] = i
    response = requests.get('{}/{}'.format(url, i))
    soup = BeautifulSoup(response.text, 'html.parser')
    content = soup.find(id='content')
    print content

    if content.find('h1') is None:
        continue

    blocked_user, blocked_by = [user.text for user in content.find('h1').find_all('a')]
    result['blocked_user'] = blocked_user
    result['blocked_by'] = blocked_by

    paragraphs = content.find('div', class_='content-body').find('div', class_='content-inner').find_all('p')
    # print '***********************'
    # print paragraphs

    created_at_index, ends_at_index = (0, 1)
    if 'Revoker' in paragraphs[0].text:
        created_at_index, ends_at_index = (1, 2)

    # Convert to string to write as JSON.
    created_at = str(parse_dt(paragraphs[created_at_index].find('span')['title']))
    result['created_at'] = str(created_at)

    if paragraphs[1].find('span') is not None:
        ends_at = parse_dt(paragraphs[ends_at_index].find('span')['title'])
    else:
        ends_at = paragraphs[1].text.replace('Status:', '').strip()
    ends_at = str(ends_at)
    result['ends_at'] = str(ends_at)

    print created_at, ends_at

    reason = content.find('div', class_='richtext')
    if reason is not None:
        reason = str(reason)
    else:
        reason = str()
    result['reason'] = reason

    # Read previously downloaded results.
    with open(filename) as f:
        results = json.load(f)

    # Append new result.
    results.append(result)

    # Write back results to file.
    with open(filename, 'w') as f:
        json.dump(results, f, indent=4)
