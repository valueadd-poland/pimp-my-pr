module.exports = {
  name: 'pmp-web-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/pmp-web/shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
