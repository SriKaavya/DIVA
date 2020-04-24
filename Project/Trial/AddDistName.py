import json
import itertools

with open('/Users/srikaavya/PycharmProjects/Diva/Project/Trial/data.json', 'r') as f:
#with open('/Users/srikaavya/PycharmProjects/Diva/Project/static/data/geoman.json', 'r') as f:
    data = json.load(f)

dist_dict={1:"Central", 2:"Wentworth", 3:"Grand Crossing", 4:"South Chicago", 5:"Calumet", 6:"Gresham", 7:"Eaglewood", 8:"Chicago Lawn", 9:"Deering", 10:"Ogden", 11:"Harrison", 12:"Near West", 14:"Shakespeare", 15:"Austin", 16:"Jefferson Park", 17:"Albany Park", 18:"Near North", 19:"Town Hall", 20:"Lincoln", 22:"Morgan Park", 24:"Rogers Park", 25:"Grand Central"}
rm_dist = {1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,22,24,25}

features = []
for feat in data['features']:
	#feat["properties"]["name"] = dist_dict[feat["properties"]["dist_num"]]
	if int(feat["properties"]["dist_num"]) in rm_dist:
		feat["properties"]["name"] = dist_dict[int(feat["properties"]["dist_num"])]
		id =int(feat["properties"]["dist_num"])
		print(feat["properties"]["dist_num"])
		print(dist_dict[int(feat["properties"]["dist_num"])])
		feat["geometry"]["type"] = "Polygon"
		features.append(feat)
	else:
		print(" no")
data['features'] = features

#with open('/Users/srikaavya/Desktop/FinalDistrictMapGeoJSON.json', 'w') as data_file:
  #  data = json.dump(data, data_file)
	#print(feat["properties"]["name"])
