const TimeCost = require('./index.js');

const loopCost = new TimeCost();

let sum = 0;
for (let i = 0; i < 10_000_000; i++) {
    let end = loopCost.record();
    sum += Math.random();
    end();
}

console.log(loopCost.statistics);
