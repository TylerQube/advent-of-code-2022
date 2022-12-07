import run from "aocrunner";
import { mainModule } from "process";

const parseInput = (rawInput: string) : string[] => rawInput.split("\n");

class Directory {
  name : string;
  parent : Directory;
  subs : Directory[] = [];
  files : ElfFile[] = [];

  constructor(name : string, parent : Directory) {
    this.name = name;
    this.parent = parent;
  }

  public getSubDir(dirName : string) : Directory {
    for(const sub of this.subs) {
      if(sub.name === dirName) return sub;
    }
    return null;
    // throw `Cannot find child directory '${dirName}'`;
  }
}

class ElfFile {
  name : string;
  size : number;

  constructor(name : string, size : number) {
    this.name = name;
    this.size = size;
  }
}

const generateTree = (cmds : string[]) : Directory => {
  const root = new Directory("/", null);

  let curDir = root;

  // loop through commands, handle each case 
  for(let i = 1; i < cmds.length; i++) {
    const cmd = cmds[i].split(" ");

    if(cmd[0] == '$') {
      if(cmd[1] == 'ls') continue;
      // handle command
      switch(cmd[2]) {
        // back out
        case '..':
          curDir = curDir.parent;
          break;
        // switch to root directory
        case '/':
          curDir = root;
          break;
        // enter subdirectory
        default:
          curDir = curDir.getSubDir(cmd[2]);
      }
    } else if(cmd[0] == "dir") {
      curDir.subs.push(new Directory(cmd[1], curDir));
    } else {
      curDir.files.push(new ElfFile(cmd[1], parseInt(cmd[0])));
    }
  }

  return root;
}

const sumSmallDirs = (dir : Directory) : number => {
  const max = 100000;

  let sum = 0;
  const rootSize = dirSize(dir);

  if(rootSize <= max) sum += rootSize;

  for(const sub of dir.subs) {
    
    sum += sumSmallDirs(sub);
  }

  return sum;
}

// produce the total size of contained files, direct and indirect
const dirSize = (dir : Directory) : number => {
  let size = 0;
  for(const file of dir.files) {
    size += file.size;
  }

  for(const sub of dir.subs) {
    size += dirSize(sub);
  }

  return size;
};

const part1 = (rawInput: string) => {
  const cmds = parseInput(rawInput);

  const root = generateTree(cmds);

  return sumSmallDirs(root);
};

const sizeToFreeSpace = (dir : Directory, remaining : number) : number => {
  let arr : number[] = [];
  for(const sub of dir.subs) {
    const size = dirSize(sub);

    if(size >= remaining) {
      arr.push(Math.min(size, sizeToFreeSpace(sub, remaining)));
    } 
  }
  return Math.min(...arr);
}

const part2 = (rawInput: string) => {
  const cmds = parseInput(rawInput);

  const root = generateTree(cmds);

  const needed = 30000000;
  const driveCapacity = 70000000;
  const used = dirSize(root);
  const available = driveCapacity - used;

  const remaining = needed - available;

  const result = sizeToFreeSpace(root, remaining);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /\n$ ls\n150 abc\n200 cde\n4000 nope`,
        expected: 4350,
      },
      {
        input: `$ cd /\n$ ls\n150 abc\n200 cde\ndir dir2\n$ cd dir2\n$ ls\n500 one\n600 two`,
        expected: 1100 + 1100 + 350,
      },
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
