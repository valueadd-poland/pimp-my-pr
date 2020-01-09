module.exports = {
  name: 'pmp-web-shared-ui-sidebar',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/pmp-web/shared/ui-sidebar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
