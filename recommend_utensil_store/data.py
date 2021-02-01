"""This script is used to manage
utensil store information """

stores = {
    "Bed Bath & Beyond": {
        "name": 'Bed Bath & Beyond',
        "location": (30.15, 40.2),
        "storage": 30000,
        "price": 20,
        "delivery duration": 5},

    "The Home Depot": {
        "name": 'The Home Depot',
        "location": (28.4, 37),
        "storage": 40000,
        "price": 15,
        "delivery duration": 3},

    "Walmart Supercenter": {
        "name": 'Walmart Supercenter',
        "location": (30.10, 39),
        "storage": 5000,
        "price": 10,
        "delivery duration": 3},

    "Lowe's Home Improvement": {
        "name": "Lowe's Home Improvement",
        "location": (29.85, 38.05),
        "storage": 50000,
        "price": 27,
        "delivery duration": 1},

    "Target": {
        "name": 'Target',
        "location": (31.5, 42),
        "storage": 15000,
        "price": 18,
        "delivery duration": 6}

}


def decrease_storage(stores_dict, store_number, amount):
    """ If the restaurant accept a store's plan,
        the store's storage should decrease
    params:
        stores_dict (dict)
        store_number (int)
        amount (int): the amount of bags bought by the restaurant
    """
    str_ = "store" + str(store_number)
    stores_dict[str_]['storage'] -= amount

    return stores_dict
