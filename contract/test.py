import matplotlib.pyplot as plt
from random import *

MAX_BLOCKS = 200
EXPONENT = 2
DECIMAL = 10 ** 18
CUSTOMIZATION = 100000000000000

reserve = 200

def get_pool_balance(s):
    n = EXPONENT + 1
    mn = CUSTOMIZATION // n
    ts = s + 1
    s_pow = ts ** n

    return mn * s_pow

def get_price(s, b):
    n = EXPONENT + 1
    mn = CUSTOMIZATION // n
    ts = s + 1
    sk = ts + 1
    sk_exp = sk ** n
    value = mn * sk_exp

    return value - b

def zlp_to_blocks(amount, block_decimal):
    value = amount // block_decimal

    if (value > MAX_BLOCKS):
        return MAX_BLOCKS

    return value

def buy(amount):
    b = get_pool_balance(reserve)
    price = get_price(reserve, b)
    blocks = zlp_to_blocks(amount, price)
    
    return (price / DECIMAL, blocks)

prices = []
block_list = []

for i in range(100):
    amount = randint(1, 100) * (DECIMAL)
    # amount = 500 * DECIMAL
    (price, blocks) = buy(amount)
    reserve = reserve + blocks

    prices.append(price)
    block_list.append(blocks)

# plt.plot(block_list)
# plt.ylabel('blocks')
# plt.grid(True)

plt.plot(prices)
plt.ylabel('price')
plt.grid(True)
plt.show()
