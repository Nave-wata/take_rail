import requests
import json
import re
from bs4 import BeautifulSoup 
import time
import os

class Base:
    def __init__(self, url):
        self.soup = BeautifulSoup(requests.get(url).text, "html.parser")
        self.data = json.loads(self.soup.find(id="__NEXT_DATA__").text)

# 線クラス
class Line(Base):
    def __init__(self, url):
        super().__init__(url)
        self.baseUrl = re.findall(r'(.*/station)+', url)[0]
        self.pref = self.getStationItem()["prefCode"]
        self.company = self.getStationItem()["companyName"]
        self.line = self.getStationItem()["railName"]

    def getPageProps(self):
        return self.data["props"]["pageProps"]
    
    def getStationItem(self):
        return self.getPageProps()["stationItem"]

    def getStationDetails(self):
        return self.getStationItem()["stationDetails"]

    def getLinks(self):
        links = [
            self.baseUrl + "/" + str(stationDetail["code"]) + "?perf=" + str(self.pref) + "&company=" + self.company + "&line=" + self.line
            for stationDetail in self.getStationDetails()
        ]
        return links

# 駅クラス
class Station(Base):
    def __init__(self, url):
        super().__init__(url)
        self.baseUrl = re.findall(r'(.+)/station', url)[0]
        self.id = self.data["query"]["id"]
        self.railGroup = self.getPageProps()["lipFeature"]["TransitSearchInfo"]["Detail"]["StationInfo"]["RailGroup"]

    def getPageProps(self):
        return self.data["props"]["pageProps"]

    def getLinks(self):
        links = [
            self.baseUrl + "/timetable/" + str(self.id) + "/" + str(rail["RailId"]) for rail in self.railGroup
        ]
        return links

# 時刻表クラス
class Timetable(Base):
    def __init__(self, url):
        super().__init__(url)

    # json形式で時刻表を取得
    def getTimetableItem(self):
        return self.data["props"]["pageProps"]["timetableItem"]

def main():
    dir_path = "timetables"
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    with open("keihan.json", "r") as f:
        baseLinks = json.load(f)

    i = 1
    for pref, links in baseLinks.items():
        for lineName, link in links.items():
            line = Line(link)
            time.sleep(1)
            for lineLink in line.getLinks():
                station = Station(lineLink)
                time.sleep(1)
                for stationLink in station.getLinks():
                    for v in [1, 2, 4]:
                        timetable = Timetable(stationLink + "?kind=" + str(v))
                        timetableItem = timetable.getTimetableItem()
                        path = "timetables/" + str(i) + ".json"
                        
                        with open(path, "w") as f:
                            json.dump(timetableItem, f, ensure_ascii=False)

                        print("Saved " + str(i) + ".json")
                        i += 1
                        time.sleep(1)
    f.close()
    print("Complited!!")

if __name__ == "__main__":
    main()