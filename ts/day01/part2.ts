import * as fs from "fs";
import * as path from "path";

function countOcc(arr: number[]): Map<number, number> {
  const countMap = new Map<number, number>();
  for (const num of arr) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  return countMap;
}

function similarityScore(leftArr: number[], rightArr: number[]): number {
  const rightCountMap = countOcc(rightArr);
  let score = 0;

  for (const num of leftArr) {
    score += num * (rightCountMap.get(num) || 0);
  }

  return score;
}

function getArrFromFile(filePath: string) {
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
  const result = similarityScore(leftArr, rightArr);
  console.log(result);
}

main();
