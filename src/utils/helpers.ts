import * as execa from 'execa';

const hasYarn = (): boolean => {
  try {
    execa.commandSync('yarn --version');
    return true;
  } catch (err) {
    return false;
  }
};

export const getPackageManager = (useNpm: boolean): string => {
  if (!useNpm && hasYarn()) {
    return 'yarn';
  }
  return 'npm';
};
