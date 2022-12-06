import run from "aocrunner";

const parseInput = (rawInput: string) : string[][] => {
  const rounds : string[][] = rawInput.split("\n").map((roundStr : String) => roundStr.split(" "));
  return rounds;
};

const scores : Object = {
  "r" : 1,
  "p" : 2,
  "s" : 3
};

const getScore = (move : String) => {
  switch(move) {
    case "r": return 1;
    case "p": return 2;
    default: return 3;
  }
}

const decodeMove = (code : String) => {
  switch(code) {
    case "A":
    case "X": return "r";
    case "B":
    case "Y": return "p";
    default: return "s";
  }
}

const resultScore = (myMove : string, oppMove : string) => {
  switch(myMove.concat(oppMove)) {
    case 'rr':
    case 'pp':
    case 'ss': return draw;
    case 'rs':
    case 'pr':
    case 'sp': return win;
    default: return loss;
  }
}

const win = 6;
const draw = 3;
const loss = 0;

const part1 = (rawInput: string) => {
  const guide : string[][] = parseInput(rawInput);

  let score : number = 0;
  for(let i = 0; i < guide.length; i++) {
    const round = guide[i];

    
    const oppMove : string = decodeMove(round[0]);
    const myMove : string = decodeMove(round[1]);

    // first add move score
    score += getScore(myMove);

    // then add W/L/D score
    score += resultScore(myMove, oppMove);
  }
  return score;
};

const moveFromOutcome = (oppMove : string, outcome : string) => {
  switch(outcome.concat(oppMove)) {
    case "Xr": return "s";
    case "Xp": return "r";
    case "Xs": return "p"; 

    case "Yr": return "r";
    case "Yp": return "p";
    case "Ys": return "s"; 

    case "Zr": return "p";
    case "Zp": return "s";
    default: return "r";
  }
};

const part2 = (rawInput: string) => {
  const guide : string[][] = parseInput(rawInput);

  let score : number = 0;
  for(let i = 0; i < guide.length; i++) {
    const round = guide[i];
    
    const outcome : string = round[1];

    const oppMove : string = decodeMove(round[0]);
    const myMove : string = moveFromOutcome(oppMove, outcome);

    // first add move score
    score += getScore(myMove);

    // then add W/L/D score
    score += resultScore(myMove, oppMove);
  }
  return score;
};

run({
  part1: {
    tests: [
      {
        input: `A X`,
        expected: 4,
      },
      {
        input: `A Y\nB X\nC Z`,
        expected: 15
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y\nB X\nC Z`,
        expected: 12
      },
      {
        input: `A X`,
        expected: 3,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
