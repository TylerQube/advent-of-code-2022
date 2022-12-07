import run from "aocrunner";

const parseInput = (rawInput: string) : string[][] => {
  const rawDrawing = rawInput.split(/\n\s*\n/)[0].split('    ').join(' XXX');

  const rawCrates : string[][] = rawDrawing.split("\n").map(row => row.split(" ")).slice(0, -1);

  // build 2D array of crates, start from bottom up
  let crates2D : string[][] = [[], [], [], [], [], [], [], [], []];
  for(let row = 0; row < rawCrates.length; row++) {
    const crateRow : string[] = rawCrates[rawCrates.length - 1 - row];
    for(let stack = 0; stack < crateRow.length; stack++) {
      const crate : string = crateRow[stack];

      if(crate.substring(1, 2) != "X")crates2D[stack].push(crate.substring(1, 2));
    }
  }

  return crates2D;
};

const parseProcedure = (rawInput : string) : number[][] => {
  const rawProcedure : string = rawInput.split(/\n\s*\n/)[1];

  const instructions = rawProcedure.split("\n").map(str => {
    const arr = str.split(" ");
    const numArr : number[] = arr.map(str => parseInt(str));
    return [numArr[1], numArr[3], numArr[5]];
  });
  return instructions;
};

const part1 = (rawInput: string) => {
  let crates : string[][] = parseInput(rawInput);
  const procedure : number[][] = parseProcedure(rawInput);

  for(let i = 0; i < procedure.length; i++) {
    const cmd = procedure[i];

    const numCrates = cmd[0];
    const from = cmd[1] - 1;
    const to = cmd[2] - 1;

    for(let num = 0; num < numCrates; num++) {
      const crate = crates[from].pop();
      crates[to].push(crate);
    }
  }

  let finalStr = "";
  for(let stack = 0; stack < crates.length; stack++) {
    finalStr += crates[stack][crates[stack].length - 1];
  }

  return finalStr;
};

const part2 = (rawInput: string) => {
  let crates : string[][] = parseInput(rawInput);
  const procedure : number[][] = parseProcedure(rawInput);

  for(let i = 0; i < procedure.length; i++) {
    const cmd = procedure[i];

    const numCrates = cmd[0];
    const from = cmd[1] - 1;
    const to = cmd[2] - 1;

    const cratesToMove = crates[from].slice(-numCrates);
    crates[from] = crates[from].slice(0, -numCrates);
    crates[to].push(...cratesToMove);
  }

  let finalStr = "";
  for(let stack = 0; stack < crates.length; stack++) {
    finalStr += crates[stack][crates[stack].length - 1];
  }

  return finalStr;
};

run({
  part1: {
    tests: [
      // {
      //   input: "",
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
