import requests
from lxml import *
from lxml import etree
import io
import time

# headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}


def findALink(url):
    headers = {"User-Agent": "Web Scraper 3000"}

    try:
        # HTML DOCUMENT in Bytes
        # start = time.perf_counter()
        htmlDoc = requests.get(url, headers=headers).content
        # end = time.perf_counter()
        # print(end - start)

        # Parses the Bytes and returns a ElementTree object
        htmlTree = etree.parse(io.BytesIO(htmlDoc), etree.HTMLParser())

        # Note: Xpath is a language for navigating through a XML file structure

        # Querys HTML tree for <a> tags containing keywords
        result = htmlTree.xpath(
            "//a[contains(@href,'scholarship') or contains(@href,'bursar')]"
        )

        # Direct link is found
        if result:
            # finds first URL that is accessible
            for element in result:
                url = element.attrib["href"]
                print(url)
                if doesWebsiteExist(url):
                    return url
        else:
            return None

    # URL entered couldn't be found
    except Exception:
        print("Something went wrong with scraping the Site!")
        return None


# PERFORMANCE TESTING
def doesWebsiteExist(url):
    try:
        request = requests.head(url, headers={"User-Agent": "Web Scraper 3000"})
    except Exception:
        return False
    return True


# t0 = time.perf_counter()
# findALink("https://www.miltonchamber.ca")
# t1 = time.perf_counter()

# print(t1 - t0)

# t0 = time.perf_counter()
# findALink2("https://www.miltonchamber.ca")
# t1 = time.perf_counter()
# print(t1 - t0)
