""" This script is used to run the algorithm
to find match utensil stores """
from main import logger
from data import stores
from math import sin, cos, sqrt, atan2, radians

ARRIVAL_TIME_WEIGHT = 0.5
SUPPLY_WEIGHT = 0.6
DISTANCE_WEIGHT = 0.3
BAG_COST_WEIGHT = 0.7


def ranking(**info):
    """ rank the possible results
    by the defined metrics
    """
    logger.info("Ranking the possible stores")
    results, store_info = metric(info['loc'], info['usage'])
    results = dict(sorted(results.items(), key=lambda x: x[1]))
    return results[:3], store_info


def metric(rest_loc, rest_usage):
    """ a score used to evaluate the best
    utensil store for restaurant
    """
    logger.info("Calculating metrics")
    results = {}
    store_info = {}
    for store in stores:
        store_loc = store['location']
        dist = distance(store_loc, rest_loc)
        supply = min(0, 30 - store['storage'] / rest_usage)
        arr_time = store['delivery duration']
        bag_cost = store['price']
        metric = ARRIVAL_TIME_WEIGHT* arr_time + SUPPLY_WEIGHT* supply \
                + DISTANCE_WEIGHT* dist + BAG_COST_WEIGHT* bag_cost

        results[store] = metric
        store_info[store]['dist'] = dist
        store_info[store]['days'] = store['storage'] / rest_usage
        store_info[store]['duration'] = store['delivery duration']
        store_info[store]['price'] = store['price']

    return results, store_info


def distance(pair1, pair2):
    """ calculate the distance in km from the
        given paris of latitude and longitude
    params:
        pair1 (tuple): (latitude, longitude)
        pair2 (tuple): (latitude, longitude)
    returns:
        distance (float)
    """
    # radius of earth in km
    R = 6373.0

    lat1 = radians(pair1[0])
    lon1 = radians(pair1[1])
    lat2 = radians(pair2[0])
    lon2 = radians(pair2[1])
    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c

    return distance