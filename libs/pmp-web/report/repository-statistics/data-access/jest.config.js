module.exports = {
  name: 'pmp-web-report-repository-statistics-data-access',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/pmp-web/report/repository-statistics/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
