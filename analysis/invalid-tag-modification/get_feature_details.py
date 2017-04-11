from bs4 import BeautifulSoup
import requests
import csv
import json

def parse_changeset_page(changeset_id):
    """Parse changeset page to extract feature URLs"""
    url = 'http://osmcha.mapbox.com/{}/'.format(changeset_id)
    r = requests.get(url)

    # Using BeautifulSoup to parse and scrape feature URLs.
    soup = BeautifulSoup(r.text, 'html.parser')

    # Filter by the ID of the collapsible feature.
    div = soup.find(id='collapseOne')
    table = div.find('table')

    feature_urls = []
    # Skip header row of the table.
    for row in table.find_all('tr')[1:]:
        reasons = row.find_all('td')[-1].text.strip()
        # Not interested in fetures not flagged by the invalid_tag_modification comparator.
        if 'modification' not in reasons: continue
        feature_url = 'http://osmcha.mapbox.com{}'.format(row.find_all('td')[0].find('a')['href'])
        feature_urls.append(feature_url)
    return feature_urls

def parse_feature_page(feature_url):
    """Parse feature page to extract feature details."""
    primaryTags = [
        'aerialway', 'aeroway', 'amenity', 'barrier', 'boundary', 'building', 'craft', 'emergency',
        'geological', 'highway', 'historic', 'landuse', 'leisure', 'man_made', 'military', 'natural',
        'office', 'places', 'power', 'public_transport', 'railway', 'route', 'shop', 'sport', 'tourism', 'waterway'
    ]
    details = {'created': '', 'deleted': ''}

    r = requests.get(feature_url)
    # Using BeautifulSoup to parse and scrape feature details.
    soup = BeautifulSoup(r.text, 'html.parser')

    # NOTE: Assuming that the page has only one table.
    table = soup.find('table')

    # Skip header row of the table.
    for row in table.find_all('tr')[1:]:
        tds = [item.text.strip() for item in row.find_all('td')]
        # We are only interested in primary feature tags.
        if tds[0] not in primaryTags: continue

        if tds[-1] == 'ADDED': details['created'] = tds[0]
        elif tds[-1] == 'DELETED': details['deleted'] = tds[0]
    return [details['created'], details['deleted']]

with open('sample.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        try:
            changeset_id = str(int(row[0]))
        except ValueError:
            # For the header of the csv file.
            pass
        else:
            feature_urls = parse_changeset_page(changeset_id)
            for feature_url in feature_urls:
                # Is the changeset harmful or not in the 15th column.
                changeset_details = [changeset_id, row[15], feature_url]
                feature_details = parse_feature_page(feature_url)
                changeset_details.extend(feature_details)
                print(','.join([str(item) for item in changeset_details]))
