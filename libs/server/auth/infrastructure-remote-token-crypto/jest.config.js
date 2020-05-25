module.exports = {
  name: 'server-auth-infrastructure-remote-token-crypto',
  preset: '../../../../jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../../coverage/libs/server/auth/infrastructure-remote-token-crypto'
};
