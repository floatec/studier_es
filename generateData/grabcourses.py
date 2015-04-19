__author__ = 'floatec'

import json
import re
import requests
import difflib
import time
json_data=open("studienganenge.json").read()


def get_rating(html):
    return html.count('full')+html.count('half')*0.5


data = json.loads(json_data)
newlist=[]
for uni in data:
    timedout=0
    worked=True
    while True:
         try:
            resp=requests.get('http://www.unicheck.de/suche/powersuche/'+uni['name']+'/0', timeout=3)
         except requests.exceptions.Timeout:
            worked=False
            print('.')
            time.sleep(5*timedout)
            timedout += 1
         if worked or timedout>5:
            break
    if timedout>5:
        continue
    print(uni['name'])
    match=re.findall('<div class="part part.*?" style="margin: 0 15px 0 0; width: 135px;"><p style="margin-bottom: 0;"><a href=".*?</a></p></div><div class="part part.*?" style="margin: 0 15px 0 0; width: 277px;"><p style="margin-bottom: 0;"><a href="(.*?)">(.*?)</a></p>',resp.text)
    list=[]
    for elm  in match:
        list.append(elm[1])
    print(list)
    if(len(list)>0):
        hit=difflib.get_close_matches(uni['name'], list,1)
        for elm  in match:
            bestres=elm
        print(elm)
        uni['unicheck']=elm[0]


        worked=True
        while True:
             try:
                res=requests.get('http://www.unicheck.de/'+elm[0], timeout=30)
             except requests.exceptions.Timeout:
                worked=False
                print('.')
                time.sleep(5*timedout)
                timedout += 1
             if worked or timedout>5:
                break
        rating=[]
        try:
            studierende=re.findall('<tr><td valign="top"><p><strong>Studierende:</strong></p></td><td valign="top"><p>(.*?)</p></td></tr>',res.text)[0]
            art=re.findall('<tr><td valign="top"><p><strong>Hochschultyp:</strong></p></td><td valign="top"><p>(.*?)</p></td></tr>',res.text)[0]
            rating.append(get_rating(re.findall('id="minimizecategoryAverage1"(.*?)</div>',res.text)[0]))
            rating.append(get_rating(re.findall('id="minimizecategoryAverage2"(.*?)</div>',res.text)[0]))
            rating.append(get_rating(re.findall('id="minimizecategoryAverage3"(.*?)</div>',res.text)[0]))
            rating.append(get_rating(re.findall('id="minimizecategoryAverage4"(.*?)</div>',res.text)[0]))
            rating.append(get_rating(re.findall('id="minimizecategoryAverage5"(.*?)</div>',res.text)[0]))
            rating.append(get_rating(re.findall('id="minimizecategoryAverage6"(.*?)</div>',res.text)[0]))
            rating.append( get_rating(re.findall('<p id="universityAverage">(.*?)</p>',res.text)[0]))
            #rating.append(get_rating(re.findall('id="minimizecategoryAverage7"(.*?)</div>',res.text)[0]))
            #rating.append(get_rating(re.findall('id="minimi    zecategoryAverage8"(.*?)</div>',res.text)[0]))
            uni['unicheck_rating']=rating
            uni['studierende']=studierende
            uni['art']=art
            print(rating)
        except:
            print('error')
    comments=uni['comments']
    uni['comments']=""
    obj = open('studienganenge2.json', 'w')
    newlist.append(uni)
    obj.write(json.dumps(newlist).replace('\\t',''))
    obj.close

    uni['comments']=comments
    obj = open('unis/uni_'+str(uni['id'])+'.json', 'w')
    obj.write(json.dumps(uni).replace('\\t',''))
    obj.close