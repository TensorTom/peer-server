// Generated by CoffeeScript 1.6.1
(function() {
  'Tracks user-uploaded files, and their edit/production state.';
  var _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.ServerFileCollection = (function(_super) {

    __extends(ServerFileCollection, _super);

    function ServerFileCollection() {
      var _this = this;
      this.forEachDevelopmentFile = function(fn) {
        return ServerFileCollection.prototype.forEachDevelopmentFile.apply(_this, arguments);
      };
      this.createProductionVersion = function() {
        return ServerFileCollection.prototype.createProductionVersion.apply(_this, arguments);
      };
      this.getContents = function(filename) {
        return ServerFileCollection.prototype.getContents.apply(_this, arguments);
      };
      this.getFileType = function(filename) {
        return ServerFileCollection.prototype.getFileType.apply(_this, arguments);
      };
      this.hasFile = function(filename) {
        return ServerFileCollection.prototype.hasFile.apply(_this, arguments);
      };
      this.comparator = function(serverFile) {
        return ServerFileCollection.prototype.comparator.apply(_this, arguments);
      };
      this.checkForNoFiles = function() {
        return ServerFileCollection.prototype.checkForNoFiles.apply(_this, arguments);
      };
      return ServerFileCollection.__super__.constructor.apply(this, arguments);
    }

    ServerFileCollection.prototype.model = ServerFile;

    ServerFileCollection.prototype.localStorage = new Backbone.LocalStorage("ServerFileCollection");

    ServerFileCollection.prototype.initialize = function() {
      localStorage.clear();
      return this.fetch({
        success: this.checkForNoFiles
      });
    };

    ServerFileCollection.prototype.checkForNoFiles = function() {
      var index, notFound;
      if (this.length > 0) {
        return;
      }
      index = new ServerFile({
        name: "index.html",
        size: 0,
        type: "text/html",
        contents: this.indexTemplate,
        isRequired: true
      });
      notFound = new ServerFile({
        name: "404.html",
        size: 0,
        type: "text/html",
        contents: this.notFoundTemplate,
        isRequired: true
      });
      this.add(index);
      return this.add(notFound);
    };

    ServerFileCollection.prototype.comparator = function(serverFile) {
      return serverFile.get("name");
    };

    ServerFileCollection.prototype.getLandingPage = function() {
      var data, landingPage;
      landingPage = this.find(function(serverFile) {
        return serverFile.get("name") === "index.html" && serverFile.get("isProductionVersion");
      });
      if (landingPage) {
        data = {
          fileContents: landingPage.get("contents"),
          filename: landingPage.get("name"),
          type: "text/html"
        };
      } else {
        data = {
          fileContents: this.indexTemplate,
          filename: "index.html",
          type: "text/html"
        };
      }
      return data;
    };

    ServerFileCollection.prototype.hasFile = function(filename) {
      return this.findWhere({
        name: filename
      });
    };

    ServerFileCollection.prototype.getFileType = function(filename) {
      var fileType, serverFile;
      serverFile = this.findWhere({
        name: filename,
        isProductionVersion: true
      });
      fileType = "";
      if (serverFile) {
        fileType = serverFile.get("fileType");
      }
      return fileType;
    };

    ServerFileCollection.prototype.getContents = function(filename) {
      var contents, serverFile;
      serverFile = this.findWhere({
        name: filename,
        isProductionVersion: true
      });
      contents = "";
      if (serverFile) {
        contents = serverFile.get("contents");
      }
      return contents;
    };

    ServerFileCollection.prototype.createProductionVersion = function() {
      var developmentFiles, productionFiles,
        _this = this;
      productionFiles = this.where({
        isProductionVersion: true
      });
      _.each(productionFiles, function(serverFile) {
        return serverFile.destroy();
      });
      developmentFiles = this.where({
        isProductionVersion: false
      });
      return _.each(developmentFiles, function(serverFile) {
        var attrs, copy;
        attrs = _.clone(serverFile.attributes);
        attrs.id = null;
        copy = new ServerFile(attrs);
        copy.set("isProductionVersion", true);
        return _this.add(copy);
      });
    };

    ServerFileCollection.prototype.forEachDevelopmentFile = function(fn) {
      return this.each(function(serverFile) {
        if (!serverFile.get("isProductionVersion")) {
          return fn(serverFile);
        }
      });
    };

    ServerFileCollection.prototype.indexTemplate = "<html>\n  <body>\n    Hello, world.\n  </body>\n</html>";

    ServerFileCollection.prototype.notFoundTemplate = "<html>\n  <body>\n    404 - page not found\n  </body>\n</html>";

    return ServerFileCollection;

  })(Backbone.Collection);

}).call(this);
