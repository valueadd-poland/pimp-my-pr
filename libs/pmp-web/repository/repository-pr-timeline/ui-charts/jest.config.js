module.exports = {
  name: 'pmp-web-repository-repository-pr-timeline-ui-charts',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/pmp-web/repository/repository-pr-timeline/ui-charts',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
