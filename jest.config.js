module.exports = {
  // প্রতিটা test file চালানোর আগে এই file-টা load হবে
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // browser-এর মতো environment simulate করার জন্য
  testEnvironment: 'jest-environment-jsdom',

  // JSX/TSX files-কে transform করার জন্য
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // যদি tsconfig.json-এ "@/*" এর মতো path alias থাকে, সেটা এখানেও বলে দিতে হয়
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}