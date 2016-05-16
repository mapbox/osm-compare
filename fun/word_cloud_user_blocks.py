#!/usr/bin/env python2

import json
from os import path
from wordcloud import WordCloud
from bs4 import BeautifulSoup

filename = 'data/user_blocks.json'
with open(filename) as f:
    user_blocks = json.load(f)

reasons = list()
for user_block in user_blocks:
    soup = BeautifulSoup(user_block['reason'], 'html.parser')
    reasons.append(soup.text.encode('utf-8'))
# print reasons
text = ' '.join(reasons)

# Generate a word cloud image
wordcloud = WordCloud().generate(text)

# Display the generated image:
# the matplotlib way:
# import matplotlib.pyplot as plt
# plt.imshow(wordcloud)
# plt.axis("off")
#
# # take relative word frequencies into account, lower max_font_size
# wordcloud = WordCloud(max_font_size=40, relative_scaling=.5).generate(text)
# plt.figure()
# plt.imshow(wordcloud)
# plt.axis("off")
# plt.show()

# The pil way (if you don't have matplotlib)
image = wordcloud.to_image()
image.show()
