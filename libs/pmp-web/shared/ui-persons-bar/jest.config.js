module.exports = {
  name: 'pmp-web-shared-ui-persons-bar',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/pmp-web/shared/ui-persons-bar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
