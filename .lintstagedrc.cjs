const path = require('path');

// Only files to be committed are linted in husky.
module.exports = {
  '*.{js,jsx,ts,tsx}': (absolutePaths) => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths
      .map((file) => path.relative(cwd, file))
      .join(' ');
    return [
      `eslint ${relativePaths}`,
      `prettier --write ${relativePaths}`,
      `cspell ${relativePaths}`
    ];
  }
};
