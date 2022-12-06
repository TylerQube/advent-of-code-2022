import run from "aocrunner";

const parseInput = (rawInput: string) : number[][] => {
  return rawInput.split(/\n\s*\n/).map(elfInventory => elfInventory.split("\n").map(item => parseInt(item)));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const invTotals = input.map((inv : number[]) => inv.reduce((rsf, a) => rsf + a, 0));

  return Math.max(...invTotals);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const invTotals = input.map((inv : number[]) => inv.reduce((rsf, a) => rsf + a, 0));
  const sorted = invTotals.sort((a, b) => b - a);

  let total = 0;
  for(let i = 0; i < Math.min(sorted.length, 3); i++) {
    total += sorted[i];
  }
  return total
};

run({
  part1: {
    tests: [
      {
        input: `20\n30\n10\n\n50`,
        expected: 60,
      },
      {
        input: `20\n20\n0\n\n40`,
        expected: 40,
      },
      {
        input: `1000\n2300\n\n100\n1300\n5000`,
        expected: 6400,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `10\n\n30\n\n40\n\n50\n50\n\n5`,
        expected: 170,
      },
      {
        input: `35`,
        expected: 35,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
