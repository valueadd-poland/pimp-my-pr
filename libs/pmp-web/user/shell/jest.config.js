module.exports = {
  name: 'pmp-web-user-shell',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/pmp-web/user/shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
