import * as kleur from 'kleur';

export const error = (msg: string): void =>
  console.error(kleur.bold().red(msg));

export const info = (msg: string): void => console.info(kleur.bold().cyan(msg));

export const success = (msg: string): void =>
  console.log(kleur.bold().green(msg));
