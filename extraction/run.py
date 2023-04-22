import requests
from bs4 import BeautifulSoup

url = "https://www.keihan.co.jp/traffic/station/timetables/"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# 各時刻表のURLを取得する
timetables = []
for a in soup.select("dd.newdia a"):
    timetables.append(a["href"])

import os
import time

# 時刻表を保存するディレクトリを作成する
dir_path = "timetables"
if not os.path.exists(dir_path):
    os.makedirs(dir_path)

# 各時刻表をダウンロードする
for index, timetable in enumerate(timetables):
    # 時刻表のURLを取得する
    timetable_url = url + timetable

    # 時刻表の名前を取得する
    timetable_name = timetable_url.split("/")[-1]

    # 時刻表をダウンロードする
    response = requests.get(timetable_url)

    # 時刻表を保存する
    with open(os.path.join(dir_path, timetable_name), "wb") as f:
        f.write(response.content)

    print("Downloaded[" + str(index + 1) + "/" + str(len(timetables)) + "] " + timetable_name)
    time.sleep(1)

print("Complited!!")