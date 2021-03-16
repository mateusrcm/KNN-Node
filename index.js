const readline = require("readline-sync");
const fs = require("fs");

const BaseData = [
  [1, 10, 200, 1],
  [2, 20, 230, 1],
  [6, 25, 150, 1],
  [7, 45, 100, 1],
  [10, 50, 125, 1],
  [3, 24, 111, 1],
  [100, 4, 10, 2],
  [250, 7, 50, 2],
  [243, 5, 68, 2],
  [210, 2, 90, 2],
  [200, 1, 95, 2],
  [215, 0, 68, 2],
  [56, 200, 1, 3],
  [79, 234, 3, 3],
  [80, 210, 8, 3],
  [95, 200, 10, 3],
  [80, 210, 4, 3],
  [49, 207, 1, 3],
];

async function start() {
  const R = parseInt(readline.question("Input R Value: "));
  const G = parseInt(readline.question("Input G Value: "));
  const B = parseInt(readline.question("Input B Value: "));

  function getDistance(R1, G1, B1, klass) {
    const distanceObj = {
      klass,
      distance: null,
    };

    const R_Pow = Math.pow(R1 - R, 2);
    const G_Pow = Math.pow(G1 - G, 2);
    const B_Pow = Math.pow(B1 - B, 2);

    distanceObj.distance = Math.sqrt(R_Pow + G_Pow + B_Pow);

    return distanceObj;
  }

  function KlassRanking(distanceList, NN) {
    const resultObj = {};
    const slicedDistanceList = distanceList
      .sort((a, b) => (a.distance < b.distance ? -1 : 1))
      .slice(0, NN);
    const klassList = slicedDistanceList.map(
      (distanceObj) => distanceObj.klass
    );

    klassList.forEach((klass) => {
      if (resultObj[klass]) resultObj[klass]++;
      else resultObj[klass] = 1;
    });

    const values = Object.values(resultObj);
    const highestValue = Math.max(...values);
    const result = Object.keys(resultObj)[values.indexOf(highestValue)];
    return result;
  }

  const calculatedDistancesPerClass = BaseData.map((row) =>
    getDistance(row[0], row[1], row[2], row[3])
  );

  console.log(`KNN(3): ${KlassRanking(calculatedDistancesPerClass, 3)}`);
  console.log(`KNN(5): ${KlassRanking(calculatedDistancesPerClass, 5)}`);
  console.log(`KNN(7): ${KlassRanking(calculatedDistancesPerClass, 7)}`);
}

start();
