// jest.config.js
module.exports = {
    // Specify which files Jest should consider as tests
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(mjs|js)$',
    
    // Define the environment for tests (jsdom for simulating a DOM in Node.js)
    testEnvironment: 'node',
    
    // Setup file for any initialization or configuration before each test file runs
    setupFilesAfterEnv: ['src/setupTests.js'],
    
    // Transform files with Babel for ES6+ and React JSX support
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    
    // Module file extensions to resolve
    moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
    
    // Ignore patterns for transformations, you might want to include modules you're testing
    transformIgnorePatterns: [
        "node_modules/(?!(axios)/)",
    ],
    
    // Mock any modules that cause issues in a Node.js environment
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    },
    
    // Enable coverage collection if needed
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
    coverageDirectory: "coverage",
};