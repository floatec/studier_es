__author__ = 'floatec'
import requests
import re
import pickle
import json
def getUnis():
    unilist=[]
    rlink=re.compile(r"<a href=\"(.*?)\" class=\"item-title\">.*?\n.*?<b>(.*?)</b>",re.MULTILINE)
    for i in range(1,51):
        resp=requests.get("http://www.studycheck.de/hochschulen/seite-"+str(i))
        match=rlink.findall(resp.text)
        unilist=unilist+match
        print(match)
    return unilist



#unilist=getUnis()
#pickle.dump( unilist, open( "unilist.p", "wb" ) )
unilist=pickle.load( open( "unilist.p", "rb" ) )
print(json.dumps(unilist))
list=[]
rlink=re.compile(r"<a href=\".*?\" class=\"course_link\" title=\"(.*?)\">.*?\n\t.?.*?\t*?\((.*?)\)",re.MULTILINE)
raddress=re.compile(r"<b>(.*?)</b><br />\n(.*?)<br />\n.*?([0-9]{5}) (.*?)<br /><br />\n.*?Tel.: (.*?)<br />\n.*?<a href=\"(.*?)\"",re.MULTILINE)
rrating=re.compile(r'<span class="key">Studieninhalte</span>\n	  				<span><span class="rating rating-big rating_5">	<span class="nostars">		<span class="stars" style="width:[0-9]{1,3}%;"></span>	</span><span class="value"><b>(.{3})</b> / 5</span></span></span>\n  				</li>\n    			<li>				\n	  				<span class="key">Lehrveranstaltungen</span>\n	  				<span><span class="rating rating-big rating_5">	<span class="nostars">		<span class="stars" style="width:[0-9]{1,3}%;"></span>	</span><span class="value"><b>(.{3})</b> / 5</span></span></span>\n  				</li>\n  				<li>\n	  				<span class="key">Dozenten</span>\n	  				<span><span class="rating rating-big rating_5">	<span class="nostars">		<span class="stars" style="width:[0-9]{1,3}%;"></span>	</span><span class="value"><b>(.{3})</b> / 5</span></span></span>\n  				</li>\n  				<li>			\n	  				<span class="key">Organisation</span>\n	  				<span><span class="rating rating-big rating_5">	<span class="nostars">		<span class="stars" style="width:[0-9]{1,3}%;"></span>	</span><span class="value"><b>(.{3})</b> / 5</span></span></span>\n  				</li>  \n  				<li>				\n	  				<span class="key">Ausstattung</span>\n	  				<span><span class="rating rating-big rating_5">	<span class="nostars">		<span class="stars" style="width:[0-9]{1,3}%;"></span>	</span><span class="value"><b>(.{3})</b> / 5</span></span></span>\n  				</li>\n				  				<li>			\n	  				<span class="key">Campusleben</span>\n	  				<span><span class="rating rating-big rating_5">	<span class="nostars">		<span class="stars" style="width:[0-9]{1,3}%;"></span>	</span><span class="value"><b>(.{3})</b> / 5</span></span></span>\n  				</li>\n				  				<li class="last">  				\n	  				<span class="key">Gesamtbewertung</span>\n	  				<span itemprop="ratingValue"><span class="rating rating-big rating_5">	<span class="nostars">		<span class="stars" style="width:[0-9]{1,3}%;"></span>	</span><span class="value"><b>(.{3})</b> / 5</span></span></span>\n  				</li>\n			</ul>\n		</div>',re.MULTILINE)
rcomment=re.compile(r'<div class="list-body">\n			<p>((.|\n)*?)</p>\n</div>',re.MULTILINE)

count=0
for uni in unilist:
    count=count+1
    print(uni[0])
    worked=True
    while True:
         try:
            resp=requests.get("http://www.studycheck.de"+str(uni[0]), timeout=3)
         except requests.exceptions.Timeout:
            worked=False
            print('.')
         if worked:
            break
    match=rlink.findall(resp.text)
    address=raddress.findall(resp.text)
    rating=rrating.findall(resp.text)
    comments=rcomment.findall(resp.text)
    print(comments)
    print(rating)
    data={'id':count,'name':uni[1],'studycheck':uni[0],'studcheck_rating':rating,'studiengaenge':match,'address':address}
    list.append(data)
    obj = open('studienganenge.json', 'w')
    obj.write(json.dumps(list).replace('\\t',''))
    obj.close
    data['comments']=comments
    obj = open('unis/uni_'+str(count)+'.json', 'w')
    obj.write(json.dumps(data).replace('\\t',''))
    obj.close
print(json.dumps(list))

pickle.dump( list, open( "studienganglist.p", "wb" ) )