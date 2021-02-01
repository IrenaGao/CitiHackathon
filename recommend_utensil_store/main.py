""" This script is used to find the top choices utensil store
"""
from data import stores
import algorithm
import logging
import sys
import time

import pandas as pd
import numpy as np
from sklearn.cluster import KMeans

from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

logger = logging.getLogger(__name__)
logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)

def main(**restaurant_info):
    """ main function to run the algorithm
    params:
        restaurant_info (kwargs): information
    obtained from the webpage
    """
    output = []
    logging.info('Start case')
    name = restaurant_info['name']
    location = restaurant_info['location']
    carryout_bag = restaurant_info['bag_material']
    bag_daily_usage = restaurant_info['bag_usage']
    if carryout_bag == 'Polypropylene' or carryout_bag == 'Nylon' \
            or carryout_bag == 'Polyester':
        print(f'Restaurant Name: {name}')
        print('Your restaurant is using recyclable materials!')
        output.append(f'{name}')
        output.append('Your restaurant is using recyclable materials!')
    else:
        results, store_info = algorithm.ranking(loc=location, usage=bag_daily_usage)
        print(f'Restaurant Name: {name}')
        print('You are suggested to use recyclable materials, '
              'possible stores are as follows:')
        output.append(f'{name}')
        output.append('You are suggested to use recyclable materials, '
              'possible stores are as follows:')
        for result in results:
            store = store_info[result]
            print('-----------------------------------------')
            print(f"Store name: {result}")
            print(f"Distance: {store['dist']}")
            print(f"Can support you use: {store['days']} days")
            print(f"Price per 100 is: {store['price']}")
            print(f"Delivery duration is: {store['duration']}")
            output.append(f'{result}')
            output.append(f"{store['dist']}")
            output.append(f"{store['days']}")
            output.append(f"{store['price']}")
            output.append(f"{store['duration']}")
    return output
    logging.info("Finish case")

recommendations = []
recommendations2 = []

class Grocery:
    def  __init__(self, state_groc, coords, state, longitude,latitude):


        self.state_groc = state_groc
        self.coords = coords
        self.state = state

        self.longitude = longitude
        self.latitude = latitude

    def recommend_grocery(self):
        kmeans = KMeans(n_clusters=5, init='k-means++')
        kmeans.fit(self.coords)
        self.state_groc['cluster'] = kmeans.predict(self.state_groc[['longitude', 'latitude']])
        top_grocery = self.state_groc.sort_values(by=['review_count', 'stars'], ascending=False)

        # Predict the cluster for longitude and latitude provided
        cluster = kmeans.predict(np.array([self.longitude, self.latitude]).reshape(1, -1))[0]

        # Get the best restaurant in this cluster
        return top_grocery[top_grocery['cluster'] == cluster].iloc[0:5][['name', 'latitude', 'longitude', 'stars', 'review_count']]

def input_resteraunts(state, latitude, longitude):
    df = pd.read_json('yelp_academic_dataset_business.json', lines=True)
    df['Grocery'] = df['categories'].str.contains('Grocery')
    df_grocery = df.loc[df.Grocery == True]
    state_groc = df_grocery[df_grocery.state == state]
    coords = state_groc[['longitude', 'latitude']]
    return Grocery(state_groc, coords, state, longitude,latitude)

@app.route('/result', methods=['POST'])
def getRecommendations():
    data=request.get_json()
    dataName = str(data.get('event').get('name'))
    dataLoc = data.get('event').get('location')
    dataBagMat = data.get('event').get('bagMat')
    dataBagUse = data.get('event').get('bagUse')

    commaplacement = dataLoc.index(',')
    dataLocOne = dataLoc[0:commaplacement]
    dataLocTwoandThree = dataLoc[commaplacement+1:]
    commaplacement2 = dataLocTwoandThree.index(',')
    dataLocTwo = dataLocTwoandThree[:commaplacement2]

    rec = main(name=dataName,
         location=(int(float(dataLocOne)), int(float(dataLocTwo))),
         bag_material=dataBagMat,
         bag_usage=dataBagUse)
    for r in rec:
        recommendations.append(r)
    return "ok"

@app.route('/getresult', methods=['GET'])
def returnRecs():
    return {'recommendations': recommendations}

@app.route('/result2', methods=['POST'])
def getRecommendations2():
    data=request.get_json()
    dataLoc = data.get('event').get('location')

    commaplacement = dataLoc.index(',')
    latitude = dataLoc[0:commaplacement]
    dataLocTwoandThree = dataLoc[commaplacement+1:]
    commaplacement2 = dataLocTwoandThree.index(',')
    longitude = dataLocTwoandThree[:commaplacement2]
    state = dataLocTwoandThree[commaplacement2+1:]

    recs2 = input_resteraunts(state, latitude, longitude).recommend_grocery()
    for rec in recs2.to_numpy():
        for r in rec:
            recommendations2.append(r)
    return "okay"

@app.route('/getresult2', methods=['GET'])
def returnRecs2():
    time.sleep(4)
    return {'recommendations2': recommendations2}

if __name__ == '__main__':
    # main(name='Good_Restaurant',
    #      location=(40, 30),
    #      bag_material='plastic',
    #      bag_usage=500)
    app.run(debug=True)
