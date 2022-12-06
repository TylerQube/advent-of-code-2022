import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const rucksacks = rawInput.split("\n");

  const rucksackCompartments = rucksacks.map((rucksack : String) => {
    return [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)];
  });
  return rucksackCompartments;
};

const commonChar = (l : string, r : string) : string => {
  for(let i = 0; i < l.length; i++) {
    const char = l[i];
    if(r.includes(char)) return char;
  }
  return "";
}

const part1 = (rawInput: string) => {
  const rucksacks : string[][] = parseInput(rawInput);

  let totalPriority : number = 0;
  for(let i = 0; i < rucksacks.length; i++) {
    const rucksack = rucksacks[i];
    const l : string = rucksack[0];
    const r : string = rucksack[1];

    const item = commonChar(l, r);
    let priority : number = item.toLowerCase().charCodeAt(0) - 96;

    if(item.toUpperCase() == item) priority += + (item == item.toUpperCase() ? 26 : 0);

    totalPriority += priority;
  }
  return totalPriority;
};

const parseElfGroups = (rawInput: string) : string[][] => {
  const elves = rawInput.split("\n");

  let elfGroups : string[][] = [];
  let group : string[] = [];
  for(let i = 0; i < elves.length; i++) {
    group.push(elves[i]);
    if((i + 1) % 3 == 0) {
      elfGroups.push(group);
      group = [];
    }
  }
  return elfGroups;
};

const groupBadge = (group : string[]) => {
  for(let i = 0; i < group[0].length; i++) {
    const char = group[0][i];
    if(group[1].includes(char) && group[2].includes(char)) return char;
  }
  return "";
}

const part2 = (rawInput: string) => {
  const groups = parseElfGroups(rawInput);

  let totalPriority = 0;
  for(let i = 0; i < groups.length; i++) {
    const badge = groupBadge(groups[i]);

    let priority : number = badge.toLowerCase().charCodeAt(0) - 96;
    if(badge.toUpperCase() == badge) priority += + (badge == badge.toUpperCase() ? 26 : 0);

    totalPriority += priority;
  }


  return totalPriority;
};


run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
      {
        input: `abcdefga`,
        expected: 1
      },
      {
        input: `aAcdeAgz`,
        expected: 27
      },
      {
        input: `aAcdeAgz\nmnbvZpoiuZ`,
        expected: 52 + 27
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
