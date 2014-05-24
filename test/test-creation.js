/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var shell   = require('shelljs');
var assert  = require("assert");
var testDirectory = path.join(__dirname, 'temp');


describe('jhipster generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(testDirectory, function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('jhipster:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  var defaultFiles = [
      '.jshintrc',
      '.editorconfig',
      'bower.json',
      'package.json',
      'pom.xml',
      '.bowerrc',
      '.gitignore',
      'README.md',
      '.yo-rc.json'
    ];

  var resourceDir = 'src/main/resources/';
  var testResourceDir = 'src/test/resources/';
  var webappDir = 'src/main/webapp/';
  var javaSrcDir = 'src/main/java/';
  var javaTestDir = 'src/test/java/';
  var javaPackageDir = javaSrcDir + 'com/mycompany/myapp/';

  it('creates expected files', function (done) {

    var expectedAdditionalFiles = [
      resourceDir + 'config/liquibase/changelog/db-changelog-001.xml',
      resourceDir + 'config/liquibase/master.xml',
      resourceDir + 'config/liquibase/users.csv',
      resourceDir + 'config/liquibase/authorities.csv',
      resourceDir + 'config/liquibase/users_authorities.csv',
      webappDir + 'images/glyphicons-halflings.png', 
      webappDir + 'images/glyphicons-halflings-white.png', 
      webappDir + 'styles/bootstrap.css', 
      webappDir + 'styles/main.css', 
      webappDir + 'fonts/glyphicons-halflings-regular.eot',
      webappDir + 'fonts/glyphicons-halflings-regular.svg',
      webappDir + 'fonts/glyphicons-halflings-regular.ttf',
      webappDir + 'fonts/glyphicons-halflings-regular.woff'
    ];

    var expected = defaultFiles.concat(expectedAdditionalFiles);

    helpers.mockPrompt(this.app, {
      'baseName': 'jhipster',
      'packageName': 'com.mycompany.myapp',
      'javaVersion': '7',
      'authenticationType': 'cookie',
      'databaseType': 'sql',
      'hibernateCache': 'no',
      'clusteredHttpSession': 'no',
      'websocket': 'no',
      'prodDatabaseType': 'mysql',
      'devDatabaseType': 'h2Memory',
      'frontendBuilder': 'grunt',
      'useCompass': false
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files with authenticationType "token"', function (done) {

    var expectedAdditionalFiles = [
      resourceDir + 'config/liquibase/changelog/db-changelog-001.xml',
      resourceDir + 'config/liquibase/master.xml',
      resourceDir + 'config/liquibase/users.csv',
      resourceDir + 'config/liquibase/authorities.csv',
      resourceDir + 'config/liquibase/users_authorities.csv',
      webappDir + 'images/glyphicons-halflings.png', 
      webappDir + 'images/glyphicons-halflings-white.png', 
      webappDir + 'styles/bootstrap.css', 
      webappDir + 'styles/main.css', 
      webappDir + 'fonts/glyphicons-halflings-regular.eot',
      webappDir + 'fonts/glyphicons-halflings-regular.svg',
      webappDir + 'fonts/glyphicons-halflings-regular.ttf',
      webappDir + 'fonts/glyphicons-halflings-regular.woff',
      javaPackageDir + 'config/OAuth2ServerConfiguration.java'
    ];

    var expected = defaultFiles.concat(expectedAdditionalFiles);

    helpers.mockPrompt(this.app, {
      'baseName': 'jhipster',
      'packageName': 'com.mycompany.myapp',
      'javaVersion': '7',
      'authenticationType': 'token',
      'databaseType': 'sql',
      'hibernateCache': 'no',
      'clusteredHttpSession': 'no',
      'websocket': 'no',
      'prodDatabaseType': 'mysql',
      'devDatabaseType': 'h2Memory',
      'frontendBuilder': 'grunt',
      'useCompass': false
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files with hibernateCache "ehcache"', function (done) {

    var expectedAdditionalFiles = [
      resourceDir + 'config/liquibase/changelog/db-changelog-001.xml',
      resourceDir + 'config/liquibase/master.xml',
      resourceDir + 'config/liquibase/users.csv',
      resourceDir + 'config/liquibase/authorities.csv',
      resourceDir + 'config/liquibase/users_authorities.csv',
      webappDir + 'images/glyphicons-halflings.png',
      webappDir + 'images/glyphicons-halflings-white.png',
      webappDir + 'styles/bootstrap.css',
      webappDir + 'styles/main.css',
      webappDir + 'fonts/glyphicons-halflings-regular.eot',
      webappDir + 'fonts/glyphicons-halflings-regular.svg',
      webappDir + 'fonts/glyphicons-halflings-regular.ttf',
      webappDir + 'fonts/glyphicons-halflings-regular.woff',
      resourceDir + 'ehcache.xml',
      testResourceDir + 'ehcache.xml'
    ];

    var expected = defaultFiles.concat(expectedAdditionalFiles);

    helpers.mockPrompt(this.app, {
      'baseName': 'jhipster',
      'packageName': 'com.mycompany.myapp',
      'javaVersion': '7',
      'authenticationType': 'token',
      'databaseType': 'sql',
      'hibernateCache': 'ehcache',
      'clusteredHttpSession': 'no',
      'websocket': 'no',
      'prodDatabaseType': 'mysql',
      'devDatabaseType': 'h2Memory',
      'frontendBuilder': 'grunt',
      'useCompass': false
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files with hibernateCache "hazelcast"', function (done) {

    var expectedAdditionalFiles = [
      resourceDir + 'config/liquibase/changelog/db-changelog-001.xml',
      resourceDir + 'config/liquibase/master.xml',
      resourceDir + 'config/liquibase/users.csv',
      resourceDir + 'config/liquibase/authorities.csv',
      resourceDir + 'config/liquibase/users_authorities.csv',
      webappDir + 'images/glyphicons-halflings.png',
      webappDir + 'images/glyphicons-halflings-white.png',
      webappDir + 'styles/bootstrap.css',
      webappDir + 'styles/main.css',
      webappDir + 'fonts/glyphicons-halflings-regular.eot',
      webappDir + 'fonts/glyphicons-halflings-regular.svg',
      webappDir + 'fonts/glyphicons-halflings-regular.ttf',
      webappDir + 'fonts/glyphicons-halflings-regular.woff',
      javaPackageDir + 'config/hazelcast/HazelcastCacheRegionFactory.java',
      javaPackageDir + 'config/hazelcast/package-info.java'
    ];

    var expected = defaultFiles.concat(expectedAdditionalFiles);

    helpers.mockPrompt(this.app, {
      'baseName': 'jhipster',
      'packageName': 'com.mycompany.myapp',
      'javaVersion': '7',
      'authenticationType': 'token',
      'databaseType': 'sql',
      'hibernateCache': 'hazelcast',
      'clusteredHttpSession': 'no',
      'websocket': 'no',
      'prodDatabaseType': 'mysql',
      'devDatabaseType': 'h2Memory',
      'frontendBuilder': 'grunt',
      'useCompass': false
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
