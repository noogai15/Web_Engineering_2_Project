import requests
from bs4 import BeautifulSoup

URL = "https://impfdashboard.de"

headers = {
    "User Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 OPR/75.0.3969.149"


}

page = requests.get(URL, headers = headers)

soup = BeautifulSoup(page.content, "html.parser")

print (soup.prettify())