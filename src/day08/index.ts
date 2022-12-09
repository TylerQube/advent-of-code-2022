import run from "aocrunner";
import { parse } from "path";

const parseInput = (rawInput: string): number[][] => {
  return rawInput.split("\n").map(row => Array.from(row).map(char => parseInt(char)));
};

const onEdge = (rowLen: number, colLen: number, row: number, col: number): boolean => {
  return row == 0 || row == colLen - 1 || col == 0 || col == rowLen - 1;
}

const visible = (trees: number[][], treeRow: number, treeCol: number): boolean => {
  const treeVal = trees[treeRow][treeCol];

  let visibleTBLF = [true, true, true, true];

  // from top
  for(let row = 0; row < treeRow; row++) {
    const curTree: number = trees[row][treeCol];
    if(curTree >= treeVal) visibleTBLF[0] = false;
  }
  // from bottom
  for(let row = trees.length - 1; row > treeRow; row--) {
    const curTree = trees[row][treeCol];
    if(curTree >= treeVal) visibleTBLF[1] = false;
  }
  // from left
  for(let col = 0; col < treeCol; col++) {
    const curTree = trees[treeRow][col];
    if(curTree >= treeVal) visibleTBLF[2] = false;
  }
  // from right
  for(let col = trees[0].length - 1; col > treeCol; col--) {
    const curTree = trees[treeRow][col];
    if(curTree >= treeVal) visibleTBLF[3] = false;
  }
  return visibleTBLF.includes(true);
};

const part1 = (rawInput: string) => {
  const trees: number[][] = parseInput(rawInput);
  
  let numVisible = 0;
  for(let row = 0; row < trees.length; row++) {
    for(let col = 0; col < trees[row].length; col++) {
      const edgeTree = onEdge(trees[0].length, trees.length, row, col);
      if(edgeTree || visible(trees, row, col)) numVisible++;
    }
  }
  return numVisible;
};

const scenicScore = (trees: number[][], treeRow: number, treeCol: number): number => {
  let dirScores = [0, 0, 0, 0];
  const treeVal = trees[treeRow][treeCol];

  // to top
  for(let row = treeRow - 1; row >= 0; row--) {
    const curTree: number = trees[row][treeCol];
    dirScores[0]++;
    if(curTree >= treeVal) break;
  }
  // to bottom
  for(let row = treeRow + 1; row < trees.length; row++) {
    const curTree: number = trees[row][treeCol];
    dirScores[1]++;
    if(curTree >= treeVal) break;
  }
  // to left
  for(let col = treeCol - 1; col >= 0; col--) {
    const curTree: number = trees[treeRow][col];
    dirScores[2]++;
    if(curTree >= treeVal) break;
  }
  // to bottom
  for(let col = treeCol + 1; col < trees.length; col++) {
    const curTree: number = trees[treeRow][col];
    dirScores[3]++;
    if(curTree >= treeVal) break;
  }

  return dirScores.reduce((ps, v) => ps * v);
}

const part2 = (rawInput: string) => {
  const trees = parseInput(rawInput);
  let bestScore = 0;
  for(let row = 0; row < trees.length; row++) {
    for(let col = 0; col < trees[row].length; col++) {
      bestScore = Math.max(bestScore, scenicScore(trees, row, col));
    }
  }

  return bestScore;
};

run({
  part1: {
    tests: [
      {
        input: `30373\n25512\n65332\n33549\n35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373\n25512\n65332\n33549\n35390`,
        expected: 8,
      },
      {
        input: `311\n111\n111`,
        expected: 1,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
