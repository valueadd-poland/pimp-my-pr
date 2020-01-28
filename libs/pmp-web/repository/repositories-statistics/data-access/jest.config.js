module.exports = {
  name: 'pmp-web-repository-repositories-statistics-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/pmp-web/repository/repositories-statistics/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
