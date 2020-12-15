import fs from 'fs';
import path from 'path';

import run from '../test-utils';

jest.setTimeout(60000);

const testDirPath = path.join(__dirname, 'test-app');

beforeEach(() => {
  if (fs.existsSync(testDirPath)) {
    fs.rmdirSync(testDirPath, { recursive: true });
  }
});

afterAll(() => {
  fs.rmdirSync(testDirPath, { recursive: true });
});

const generatedFiles = [
  'css/style.css',
  'js/main.js',
  'index.html',
  'webpack.config.js',
  'package.json',
  'yarn.lock',
];

const deps = [
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
  'css-loader',
  'style-loader',
  'html-webpack-plugin',
];

describe('new command', () => {
  it('creates a new project based on the Bootstrap CSS framework', async () => {
    const { exitCode } = await run(['new', 'test-app'], {
      cwd: __dirname,
      input: '\n',
    });

    // Assertions
    expect(exitCode).toBe(0);
    generatedFiles.forEach(file =>
      expect(fs.existsSync(path.join(testDirPath, file))).toBeTruthy()
    );

    const pkgJson = JSON.parse(
      fs.readFileSync(path.join(testDirPath, 'package.json'))
    );

    // Assertion for the installed dependencies
    expect(pkgJson.dependencies).toBeFalsy();
    deps.forEach(dep => expect(pkgJson.devDependencies[dep]).toBeTruthy());

    // Assertion for the configured scripts
    expect(pkgJson.name).toBe('test-app');
    expect(pkgJson.scripts['build']).toBe('webpack');
    expect(pkgJson.scripts['serve']).toBe('webpack-dev-server --open');
  });

  it('uses npm on supplying --use-npm', async () => {
    const { exitCode } = await run(['new', 'test-app', '--use-npm'], {
      cwd: __dirname,
      input: '\n',
    });

    const generatedFilesWithNpm = [
      ...generatedFiles.filter(file => file !== 'yarn.lock'),
      'package-lock.json',
    ];

    // Assertions
    expect(exitCode).toBe(0);
    generatedFilesWithNpm.forEach(file =>
      expect(fs.existsSync(path.join(testDirPath, file))).toBeTruthy()
    );

    const pkgJson = JSON.parse(
      fs.readFileSync(path.join(testDirPath, 'package.json'))
    );

    // Assertion for the installed dependencies
    expect(pkgJson.dependencies).toBeFalsy();
    deps.forEach(dep => expect(pkgJson.devDependencies[dep]).toBeTruthy());

    // Assertion for the configured scripts
    expect(pkgJson.name).toBe('test-app');
    expect(pkgJson.scripts['build']).toBe('webpack');
    expect(pkgJson.scripts['serve']).toBe('webpack-dev-server --open');
  });
});
