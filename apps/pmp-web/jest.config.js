module.exports = {
  name: 'pmp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pmp',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
