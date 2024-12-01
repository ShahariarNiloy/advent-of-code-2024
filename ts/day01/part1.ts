import * as fs from "fs";
import * as path from "path";

function totalDiff(leftArr: number[], rightArr: number[]): number {
  const leftSorted = [...leftArr].sort((a, b) => a - b);
  const rightSorted = [...rightArr].sort((a, b) => a - b);

  let totalDiff = 0;

  for (let i = 0; i < leftSorted.length; i++) {
    totalDiff += Math.abs(leftSorted[i] - rightSorted[i]);
  }

  return totalDiff;
}

function getArrFromFile(filePath: string): {
  leftArr: number[];
  rightArr: number[];
} {
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.trim().split("\n");

  const leftArr: number[] = [];
  const rightArr: number[] = [];

  for (const line of lines) {
    const [left, right] = line.split(/\s+/).map(Number);
    leftArr.push(left);
    rightArr.push(right);
  }

  return { leftArr, rightArr };
}

function main() {
  const filePath = path.resolve(__dirname, "input.txt");
  const { leftArr, rightArr } = getArrFromFile(filePath);
  const result = totalDiff(leftArr, rightArr);
  console.log(result);
}

main();
