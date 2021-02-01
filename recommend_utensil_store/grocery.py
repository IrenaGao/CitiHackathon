import pandas as pd
import numpy as np

from flask import Flask
from flask import request
from flask import jsonify

from sklearn.cluster import KMeans

app = Flask(__name__)

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

@app.route('/result2', methods=['POST'])
def input_resteraunts():
    data=request.get_json()
    print(data)
    state = "AZ"
    longitude = -112
    latitude = 33
    df = pd.read_json('yelp_academic_dataset_business.json', lines=True)
    df['Grocery'] = df['categories'].str.contains('Grocery')
    df_grocery = df.loc[df.Grocery == True]
    state_groc = df_grocery[df_grocery.state == state]
    coords = state_groc[['longitude', 'latitude']]

    # return Grocery(state_groc, coords, state, longitude,latitude)
    return "okay"

a = input_resteraunts()

print(a.recommend_grocery())
