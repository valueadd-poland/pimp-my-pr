module.exports = {
  name: 'pmp-web-shared-ui-table',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/pmp-web/shared/ui/table',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
