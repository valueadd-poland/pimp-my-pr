module.exports = {
  name: 'pmp-web-shared-ui-navbar',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/pmp-web/shared/ui-navbar',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
