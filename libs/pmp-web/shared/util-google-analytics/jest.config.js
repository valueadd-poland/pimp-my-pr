module.exports = {
  name: 'pmp-web-shared-util-google-analytics',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/pmp-web/shared/util-google-analytics',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
