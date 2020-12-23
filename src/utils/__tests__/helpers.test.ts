jest.mock('execa', () => ({
  commandSync: jest.fn(),
}));

import execa from 'execa';

import { getPackageManager } from '../helpers';

test('falls back to npm', () => {
  execa.commandSync.mockImplementation(() => {
    throw new Error();
  });
  expect(getPackageManager()).toBe('npm');
});

test('yarn is available', () => {
  execa.commandSync.mockReturnValue({ stdout: '1.0.0' });
  expect(getPackageManager()).toBe('yarn');
});

test('supplying --use-npm prefers npm', () => {
  const useNpm = true;
  expect(getPackageManager(useNpm)).toBe('npm');
});
