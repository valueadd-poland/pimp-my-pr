module.exports = {
  name: 'pmp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pmp',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
