module.exports = {
  name: 'pmp-web-core',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/pmp-web/core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
