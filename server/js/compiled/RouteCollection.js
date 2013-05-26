// Generated by CoffeeScript 1.6.2
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.RouteCollection = (function(_super) {
    __extends(RouteCollection, _super);

    function RouteCollection() {
      this.createProductionVersion = __bind(this.createProductionVersion, this);
      this.getRouteCode = __bind(this.getRouteCode, this);
      this.findRouteForPath = __bind(this.findRouteForPath, this);
      this.comparator = __bind(this.comparator, this);      _ref = RouteCollection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RouteCollection.prototype.model = Route;

    RouteCollection.prototype.localStorage = new Backbone.LocalStorage("RouteCollection");

    RouteCollection.prototype.initialize = function(options) {
      return this.fetch();
    };

    RouteCollection.prototype.comparator = function(route) {
      return route.get("routePath");
    };

    RouteCollection.prototype.findRouteForPath = function(routePath) {
      var matchedRoute,
        _this = this;

      matchedRoute = this.find(function(route) {
        if (routePath.match(route.pathRegex)) {
          console.log("matched path: " + routePath + " with " + route.routePath);
        }
        return route.get("isProductionVersion") && routePath.match(route.pathRegex) !== null;
      });
      return matchedRoute;
    };

    RouteCollection.prototype.getRouteCode = function(routePath) {
      return this.findWhere({
        routePath: routePath
      }).get("routeCode");
    };

    RouteCollection.prototype.createProductionVersion = function() {
      var developmentFiles, productionFiles,
        _this = this;

      productionFiles = this.where({
        isProductionVersion: true
      });
      _.each(productionFiles, function(route) {
        return route.destroy();
      });
      developmentFiles = this.where({
        isProductionVersion: false
      });
      return _.each(developmentFiles, function(route) {
        var attrs, copy;

        attrs = _.clone(route.attributes);
        attrs.id = null;
        copy = new Route(attrs);
        copy.set("isProductionVersion", true);
        _this.add(copy);
        return copy.save();
      });
    };

    return RouteCollection;

  })(Backbone.Collection);

}).call(this);

/*
//@ sourceMappingURL=RouteCollection.map
*/
