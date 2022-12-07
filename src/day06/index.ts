import run from "aocrunner";

const isSignal = (snippet : string, packetLen : number) : boolean => {
  for(let i = 0; i < snippet.length; i++) {
    if(snippet.split(snippet[i]).join("").length < packetLen - 1) return false; 
  }
  return true;
}

const part1 = (signal: string) => {
  const lenPacket = 4;
  for(let ind = 0; ind < signal.length - lenPacket; ind++) {
    const snippet = signal.slice(ind, ind + lenPacket);
    if(isSignal(snippet, lenPacket)) return ind + lenPacket;
  }

  return -1;
};

const part2 = (signal: string) => {
  const lenPacket = 14;
  for(let ind = 0; ind < signal.length - lenPacket; ind++) {
    const snippet = signal.slice(ind, ind + lenPacket);
    if(isSignal(snippet, lenPacket)) return ind + lenPacket;
  }

  return -1;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
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
