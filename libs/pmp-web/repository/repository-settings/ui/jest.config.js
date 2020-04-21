module.exports = {
  name: 'pmp-web-repository-repository-settings-ui',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/pmp-web/repository/repository-settings/ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
