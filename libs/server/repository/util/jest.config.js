module.exports = {
  name: 'server-repository-util',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/server/repository/util',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
