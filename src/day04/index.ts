import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const pairs : string[] = rawInput.split("\n");
  const splitPairs = pairs.map(str => str.split(","));

  const rangePairs = splitPairs.map(pair => pair.map(str => {
    const arr = str.split("-");
    return [parseInt(arr[0]), parseInt(arr[1])];
  }));
  return rangePairs;
};

// produce true if either interval is fully contained within the other
// e.g. rangeContains([0, 2], [1, 1]) => true
const rangeContains = (a : number[], b : number[]) => {
  const aInB = a[0] >= b[0] && a[1] <= b[1];
  const bInA = b[0] >= a[0] && b[1] <= a[1];

  return aInB || bInA;
}

// produce true if either range overlaps the other
const rangeOverlaps = (a : number[], b : number[]) => {
  const aMinInB = a[0] >= b[0] && a[0] <= b[1];
  const aMaxInB = a[1] >= b[0] && a[1] <= b[1];

  const bMininA = b[0] >= a[0] && b[0] <= a[1];
  const bMaxinA = b[1] >= a[0] && b[1] <= a[1];

  return aMinInB || aMaxInB || bMaxinA || bMaxinA;
}

const part1 = (rawInput: string) => {
  const pairArr = parseInput(rawInput);

  let sumContain : number = 0;
  for(let i = 0; i < pairArr.length; i++) {
    const pair = pairArr[i];
    if(rangeContains(pair[0], pair[1])) sumContain++;
  }

  return sumContain;
};

const part2 = (rawInput: string) => {
  const pairArr = parseInput(rawInput);

  let sumOverlaps : number = 0;
  for(let i = 0; i < pairArr.length; i++) {
    const pair = pairArr[i];
    if(rangeOverlaps(pair[0], pair[1])) sumOverlaps++;
  }

  return sumOverlaps;
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
