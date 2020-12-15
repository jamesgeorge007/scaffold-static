import execa from 'execa';
import fs from 'fs';
import path from 'path';

const CLI_PATH = path.join(__dirname, '..', 'bin');

export const run = (
  args: string[],
  options = {}
): execa.ExecaChildProcess<string> =>
  execa('node', [CLI_PATH].concat(args), options);

export const rmTestDir = (testDirPath: string): void => {
  if (fs.existsSync(testDirPath)) {
    fs.rmdirSync(testDirPath, { recursive: true });
  }
};
