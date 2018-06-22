Package.describe({
  name: 'eazover:fileload',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Simple file uploading for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1');
  api.use('ecmascript');
  api.mainModule('meteor-file.js');
  api.use(['ejson'], ['client', 'server']);
  api.use(['underscore'], ['client', 'server']);
  api.add_files(['meteor-file.js'], ['client', 'server']);

  api.export("MeteorFile", 'client');
  api.export("MeteorFile", 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('eazover:fileload');
  api.mainModule('meteor-file.js');
});
