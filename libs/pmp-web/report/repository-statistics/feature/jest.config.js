module.exports = {
  name: 'pmp-web-report-repository-statistics-feature',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/pmp-web/report/repository-statistics/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
