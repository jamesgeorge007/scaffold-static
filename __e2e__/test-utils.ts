import execa from 'execa';
import path from 'path';

const CLI_PATH = path.join(__dirname, '..', 'bin');

export default (
  args: string[],
  options = {}
): execa.ExecaChildProcess<string> =>
  execa('node', [CLI_PATH].concat(args), options);
