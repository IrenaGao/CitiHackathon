""" This script is used to find the top choices utensil store
"""
from data import stores
from algorithm import ranking
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)


def main(**restaurant_info):
    """ main function to run the algorithm
    params:
        restaurant_info (kwargs): information
    obtained from the webpage
    """
    logging.info('Start case')
    name = restaurant_info['name']
    location = restaurant_info['location']
    carryout_bag = restaurant_info['bag_material']
    bag_daily_usage = restaurant_info['bag_usage']
    if carryout_bag == 'Polypropylene' or carryout_bag == 'Nylon' \
            or carryout_bag == 'Polyester':
        print(f'Restaurant Name: {name}')
        print('Your restaurant is using recyclable materials!')
    else:
        results, store_info = ranking(loc=location, usage=bag_daily_usage)
        print(f'Restaurant Name: {name}')
        print('You are suggest to use recyclable materials, '
              'possible stores are as follows:')
        for result in results:
            store = store_info[result]
            print('-----------------------------------------')
            print(f"Store name: {result}")
            print(f"Distance: {store['dist']}")
            print(f"Can support you use: {store['days']} days")
            print(f"Price per 100 is: {store['price']}")
            print(f"Delivery duration is: {store['duration']}")

    logging.info("Finish case")


if __name__ == '__main__':
    main(name='Good_Restaurant',
         location=(40, 30),
         carryout_bag='plastic',
         bag_daily_usage=500)
