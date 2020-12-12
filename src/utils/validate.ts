import * as execa from 'execa';

export const hasYarn = (): boolean => {
    try {
        execa.commandSync('yarn --version');
        return true;
    } catch (err) {
        return false;
    }
};
