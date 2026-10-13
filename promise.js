'use strict';

const getNumber = async () => 10;

const addFive = (value) => value + 5;
const multiplyByTwo = (value) => value * 2;

getNumber()
    .then(addFive)
    .then(multiplyByTwo)
    .then((value) => console.log('Task 1:', value))
    .catch((error) => console.error('Task 1 error:', error.message));


function getUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!userId) {
                reject(new Error('userId is required'));
                return;
            }
            resolve({ userId: userId, userName: 'Oleksandr' });
        }, 500);
    });
}

function getOrder(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: user, orderNumber: 'ORD-2041', price: 2400 });
        }, 500);
    });
}

function getDiscount(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const discountPercent = order.price > 2000 ? 20 : 5;
            const finalPrice = order.price - (order.price * discountPercent) / 100;
            resolve({ order: order, discountPercent: discountPercent, finalPrice: finalPrice });
        }, 500);
    });
}

getUser(7)
    .then((user) => getOrder(user))
    .then((order) => getDiscount(order))
    .then((summary) => {
        const user = summary.order.user;
        console.log('Task 2:');
        console.log(`  user: ${user.userName} (id ${user.userId})`);
        console.log(`  order: ${summary.order.orderNumber}, price ${summary.order.price}`);
        console.log(`  discount: ${summary.discountPercent}% -> final price ${summary.finalPrice}`);
    })
    .catch((error) => console.error('Task 2 error:', error.message));


function customPromiseAll(items) {
    return new Promise((resolve, reject) => {
        const results = new Array(items.length);
        let resolvedCount = 0;

        if (items.length === 0) {
            resolve(results);
            return;
        }

        items.forEach((item, index) => {
            Promise.resolve(item).then(
                (value) => {
                    results[index] = value;
                    resolvedCount += 1;

                    if (resolvedCount === items.length) {
                        resolve(results);
                    }
                },
                (error) => reject(error)
            );
        });
    });
}

const wait = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

customPromiseAll([wait(900, 'first'), wait(200, 'second'), Promise.resolve('third'), 42])
    .then((results) => console.log('Task 3:', results))
    .catch((error) => console.error('Task 3 error:', error.message));
