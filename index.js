const readline = require("readline-sync");
const fs = require("fs");
class RGB {
  R;
  G;
  B;
  Classification;
  Distance;

  constructor(R, G, B, Classification) {
    this.R = R;
    this.G = G;
    this.B = B;
    this.Classification = Classification;
  }
}

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
  const input_RGB = new RGB();
  const KNN_LIST = [3, 5, 7];

  input_RGB.R = getNumberInput("R");
  input_RGB.G = getNumberInput("G");
  input_RGB.B = getNumberInput("B");

  const distancePerNeighbor = BaseData.map((row) => {
    const base_RGB = new RGB(row[0], row[1], row[2], row[3]);

    return mapToDistanceObj(base_RGB, input_RGB);
  });

  KNN_LIST.forEach((K) => {
    console.log("==================");
    console.log(`KNN(${K})`);
    console.log(getClassificationRanking(distancePerNeighbor, K));
    console.log("==================");
  });
}

function getClassificationRanking(RGBMappedList, NN) {
  const resultObj = {};
  const RGBRestrictMappedList = RGBMappedList.sort((a, b) =>
    a.Distance < b.Distance ? -1 : 1
  ).slice(0, NN);
  const klassList = RGBRestrictMappedList.map(
    (RGB_Item) => RGB_Item.Classification
  );

  klassList.forEach((classification) => {
    resultObj[classification] = (resultObj[classification] || 0) + 1;
  });

  return resultObj;
}

function getNumberInput(value) {
  return parseInt(readline.question(`Input ${value} Value: `));
}

function mapToDistanceObj(base_RGB, input_RGB) {
  const R_Pow = (base_RGB.R - input_RGB.R) ** 2;
  const G_Pow = (base_RGB.G - input_RGB.G) ** 2;
  const B_Pow = (base_RGB.B - input_RGB.B) ** 2;

  base_RGB.Distance = (R_Pow + G_Pow + B_Pow) ** 0.5;

  return base_RGB;
}

start();
