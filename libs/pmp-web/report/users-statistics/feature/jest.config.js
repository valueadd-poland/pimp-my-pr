module.exports = {
  name: 'pmp-web-report-users-statistics-feature',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/pmp-web/report/users-statistics/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
