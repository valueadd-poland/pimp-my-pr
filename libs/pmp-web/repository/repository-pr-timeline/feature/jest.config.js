module.exports = {
  name: 'pmp-web-repository-repository-pr-timeline-feature',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/pmp-web/repository/repository-pr-timeline/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
