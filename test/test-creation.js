/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var shell   = require('shelljs');
var assert  = require("assert");
var testDirectory = path.join(__dirname, 'temp');

var resourceDir = 'src/main/resources/';
var testResourceDir = 'src/test/resources/';
var webappDir = 'src/main/webapp/';
var javaSrcDir = 'src/main/java/';
var javaTestDir = 'src/test/java/';
var javaPackageDir = javaSrcDir + 'com/mycompany/myapp/';
var javaTestPackageDir = javaTestDir + 'com/mycompany/myapp/';
var testJsDir = 'src/test/javascript/';

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

var files = new Array();

files['ehcache'] = [
    resourceDir + 'ehcache.xml',
    testResourceDir + 'ehcache.xml'
];
files['grunt'] = [
    'Gruntfile.js'
];
files['gulp'] = [
    'gulpfile.js'
];
files['sql'] = [
    resourceDir + 'config/liquibase/changelog/db-changelog-001.xml',
    resourceDir + 'config/liquibase/master.xml',
    resourceDir + 'config/liquibase/users.csv',
    resourceDir + 'config/liquibase/authorities.csv',
    resourceDir + 'config/liquibase/users_authorities.csv'
];
files['nosql'] = [
    resourceDir + 'config/mongeez/master.xml',
    resourceDir + 'config/mongeez/users.xml',
    resourceDir + 'config/mongeez/authorities.xml',
    javaTestPackageDir + 'config/MongoConfiguration.java'
];
files['token'] = [
    javaPackageDir + 'config/OAuth2ServerConfiguration.java'
];
files['hazelcast'] = [
    javaPackageDir + 'config/hazelcast/HazelcastCacheRegionFactory.java',
    javaPackageDir + 'config/hazelcast/package-info.java'
];
files['atmosphere'] = [
    javaPackageDir + 'web/websocket/package-info.java',
    javaPackageDir + 'web/websocket/ActivityService.java',
    javaPackageDir + 'web/websocket/TrackerService.java',
    javaPackageDir + 'web/websocket/dto/package-info.java',
    javaPackageDir + 'web/websocket/dto/ActivityDTO.java',
    javaPackageDir + 'web/websocket/dto/ActivityDTOJacksonDecoder.java',
    webappDir + 'views/tracker.html',
    testJsDir + 'mock/atmosphere.mock.js'
];
files['css'] = [
    webappDir + 'images/glyphicons-halflings.png',
    webappDir + 'images/glyphicons-halflings-white.png',
    webappDir + 'styles/bootstrap.css',
    webappDir + 'styles/main.css',
    webappDir + 'fonts/glyphicons-halflings-regular.eot',
    webappDir + 'fonts/glyphicons-halflings-regular.svg',
    webappDir + 'fonts/glyphicons-halflings-regular.ttf',
    webappDir + 'fonts/glyphicons-halflings-regular.woff'
];
files['compass'] = [
    'src/main/scss/main.scss'
];

var configuration = new Array();
configuration['buildTool'] = {values:['maven'],rebuild:true}
configuration['javaVersion'] = {values:['7','8'],rebuild:true};
configuration['authenticationType'] = {values:['cookie','token'],rebuild:true};
configuration['hibernateCache'] = {values:['no','hazelcast','ehcache'],rebuild:true};
configuration['clusteredHttpSession'] = {values:['no','hazelcast'],rebuild:true};
configuration['websocket'] = {values:['no','atmosphere'],rebuild:true};
configuration['databaseType'] = {values:['sql','nosql'],rebuild:true};
configuration['devDatabaseType'] = {values:['h2Memory','mysql','postgresql','mongodb'],rebuild:false};
configuration['prodDatabaseType'] = {values:['mysql','postgresql','mongodb'],rebuild:false};
configuration['baseName'] = {values:['jhipster'],rebuild:false};
configuration['packageName'] = {values:['com.mycompany.myapp'],rebuild:false};
configuration['frontendBuilder'] = {values:['grunt'],rebuild:false};
configuration['useCompass'] = {values:[true,false],rebuild:false};

var key;
var keys = [];
for(key in configuration) {
    keys.push(key);
}

var buildKeys = [];
for(var i = 0; i < keys.length; i++) {
    key = keys[i];
    if(configuration[key].rebuild === true) {
        buildKeys.push(key);
    }
}

var buildConfigurations = new Array();

describe('jhipster configurations', function () {

  beforeEach(function (done) {
    helpers.testDirectory(testDirectory, function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('jhipster:app', [
        '../../app'
      ], null, {
        'skip-install': true,
        'skip-welcome-message': true,
        'skip-message': true
      });
      done();
    }.bind(this));
    });

  createConfigurations(keys,{},this.app);

  function createConfigurations(keysParameter, result, app) {
      var currentKeys = keysParameter.slice();
      if (currentKeys.length == 0) {

          if (validConfiguration(result)) {

              var buildConfiguration = "";
              var execMaven = false;
              for (var i = 0; i < buildKeys.length; i++) {
                  buildConfiguration += buildKeys[i] + ":" + result[buildKeys[i]] + ",";
              }
              if (buildConfigurations.indexOf(buildConfiguration) === -1) {
                  buildConfigurations.push(buildConfiguration);
                  execMaven = true;
              }

              var expectedFiles = defaultFiles.slice(0);
              var key;
              for (var i = 0; i < keys.length; i++) {
                  key = keys[i];
                  if (files[result[key]] !== undefined) {
                      expectedFiles = expectedFiles.concat(files[result[key]]);
                  }
              }

              it('creates expected files and package with maven if necessary', function (done) {
                  helpers.mockPrompt(this.app, result);
                    this.app.run({}, function () {
                      if (execMaven) {
                        var execResult = shell.exec("mvn package -f " + testDirectory + "/pom.xml", {silent: true});
                        if(execResult.code !== 0) {
                            console.log(execResult.output);
                        }
                        assert.equal(0, execResult.code, "Maven should return with exit code 0");
                      }
                      helpers.assertFiles(expectedFiles);
          done();
      });
  });

          }
      }
      var key;
      for (var i = 0; i < currentKeys.length; i++) {
          key = currentKeys[i];
          currentKeys.splice(i, 1);
          for (var j = 0; j < configuration[key].values.length; j++) {

              result[key] = configuration[key].values[j];
              createConfigurations(currentKeys, result, app);
          }
          break;
      }

  }

  function validConfiguration(configuration) {
      return (configuration.databaseType !== 'sql' || (configuration.prodDatabaseType !== 'mongodb' && configuration.devDatabaseType !== 'mongodb') ) &&
          ( configuration.databaseType !== 'nosql' || (configuration.prodDatabaseType === 'mongodb' && configuration.devDatabaseType === 'mongodb'));
  }

});
