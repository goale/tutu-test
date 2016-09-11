/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _router = __webpack_require__(1);
	
	var _router2 = _interopRequireDefault(_router);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(document).ready(function () {
	    new _router2.default();
	    Backbone.history.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _app = __webpack_require__(2);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _users = __webpack_require__(3);
	
	var _users2 = _interopRequireDefault(_users);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Router = Backbone.Router.extend({
	    routes: {
	        "": "index",
	        "!/small": "small",
	        "!/large": "large"
	    },
	
	    index: function index() {
	        return;
	    },
	    small: function small() {
	        var collection = new _users2.default();
	
	        new _app2.default({ collection: collection });
	    },
	    large: function large() {
	        var collection = new _users2.default([], { url: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}' });
	
	        new _app2.default({ collection: collection });
	    }
	});
	
	exports.default = Router;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _users = __webpack_require__(3);
	
	var _users2 = _interopRequireDefault(_users);
	
	var _list = __webpack_require__(5);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _detail = __webpack_require__(9);
	
	var _detail2 = _interopRequireDefault(_detail);
	
	var _pager = __webpack_require__(10);
	
	var _pager2 = _interopRequireDefault(_pager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AppView = Backbone.View.extend({
	    el: '#app',
	
	    initialize: function initialize() {
	        var _this = this;
	
	        this.collection.fetch({
	            success: function success() {
	                _this.render();
	            },
	            error: function error() {
	                _this.onError();
	            },
	            reset: true
	        });
	
	        this.onLoading();
	    },
	    render: function render() {
	        var collection = this.collection;
	
	        this.$el.html(new _list2.default({ collection: collection }).render().el).append(new _pager2.default({ collection: collection }).render().el).append(new _detail2.default({ collection: collection }).render().el);
	    },
	    onLoading: function onLoading() {
	        this.$el.html('<h1>Loading...</h1>');
	    },
	    onError: function onError() {
	        this.$el.html('<h1>Error Occured</h1>');
	    }
	});
	
	exports.default = AppView;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _user = __webpack_require__(4);
	
	var _user2 = _interopRequireDefault(_user);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UsersCollection = Backbone.Collection.extend({
	    model: _user2.default,
	    url: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
	    page: 1,
	    perPage: 10,
	    fetched: false,
	    selected: null,
	
	    initialize: function initialize(model, options) {
	        if (typeof options !== 'undefined') {
	            this.url = options.url || this.url;
	        }
	    },
	    paginate: function paginate() {
	        if (this.page === 1) {
	            return this.first(this.perPage);
	        }
	
	        return _.first(this.rest(this.perPage * (this.page - 1)), this.perPage);
	    },
	    data: function data() {
	        return this.paginate();
	    },
	    setPage: function setPage(page) {
	        this.page = page;
	        this.trigger("change", this, this.options);
	    },
	    setPerPage: function setPerPage(perPage) {
	        this.perPage = perPage;
	        this.page = 1;
	        this.trigger("change", this, this.options);
	    },
	    select: function select(model) {
	        this.selected = model;
	        this.trigger("change", this, this.options);
	    }
	});
	
	exports.default = UsersCollection;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var User = Backbone.Model.extend({});
	
	exports.default = User;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _table = __webpack_require__(6);
	
	var _table2 = _interopRequireDefault(_table);
	
	var _filter = __webpack_require__(8);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ListView = Backbone.View.extend({
	    className: 'user-list column',
	    render: function render() {
	        var collection = this.collection;
	
	        var table = new _table2.default({ columns: {
	                'id': {
	                    'label': 'ID',
	                    'sortable': true
	                },
	                'firstName': {
	                    'label': 'First Name',
	                    'sortable': true
	                },
	                'lastName': {
	                    'label': 'Last Name',
	                    'sortable': true
	                },
	                'email': {
	                    'label': 'Email',
	                    'sortable': true
	                },
	                'phone': {
	                    'label': 'Phone',
	                    'sortable': true
	                }
	            },
	            collection: collection
	        });
	
	        this.$el.html(new _filter2.default({ collection: collection }).render().el).append(table.render().el);
	
	        return this;
	    }
	});
	
	exports.default = ListView;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _tableRow = __webpack_require__(7);
	
	var _tableRow2 = _interopRequireDefault(_tableRow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TableView = Backbone.View.extend({
	    className: 'users-table',
	    sortField: '',
	    ascending: false,
	
	    events: {
	        'click .sortable': 'sortByField'
	    },
	
	    initialize: function initialize(options) {
	        this.options = options || {};
	
	        this.listenTo(this.collection, 'reset change sort', this.render, this);
	
	        if (typeof this.options.columns === 'undefined') {
	            throw new Error('You should provide columns array');
	        }
	    },
	    render: function render() {
	        var $table = $('<table />').append(this.createHeader()).append(this.populate());
	
	        this.$el.html($table);
	
	        return this;
	    },
	
	
	    /**
	     * Create table header based on provided set of columns
	     */
	    createHeader: function createHeader() {
	        var _this = this;
	
	        var $header = $('<thead><tr></tr></thead>');
	        _.each(this.options.columns, function (column, key) {
	            $header.append(_this.createHeaderItem(key, column));
	        });
	
	        return $header;
	    },
	
	
	    /**
	     * Build table header item
	     */
	    createHeaderItem: function createHeaderItem(field, options) {
	        if (options.sortable) {
	            var itemStyles = ['sortable'];
	            if (this.sortField === field) {
	                itemStyles.push(this.ascending ? 'asc' : 'desc');
	            }
	            return '<th><a href="#" class="' + itemStyles.join(' ') + '" data-field="' + field + '">' + options.label + '</a></th>';
	        }
	
	        return '<th>' + options.label + '</th>';
	    },
	
	
	    /**
	     * Table body with fetched data
	     */
	    populate: function populate() {
	        var _this2 = this;
	
	        var data = this.collection.data();
	
	        if (data.length === 0) {
	            return $('<p class="info">Нет записей</p>');
	        }
	
	        var $body = $('<tbody></tbody>');
	
	        var fields = Object.keys(this.options.columns);
	
	        _.each(this.collection.data(), function (model) {
	            $body.append(new _tableRow2.default({
	                collection: _this2.collection,
	                model: model,
	                columns: fields,
	                clickable: ['id']
	            }).render().el);
	        });
	
	        return $body;
	    },
	    sortByField: function sortByField(e) {
	        e.preventDefault();
	
	        this.sortField = $(e.currentTarget).data('field');
	
	        this.ascending = !this.ascending;
	
	        this.collection.comparator = this.comparator(this.sortField, this.ascending);
	
	        this.collection.sort();
	    },
	
	
	    /**
	     * Sort by string values function
	     */
	    comparator: function comparator(field, ascending) {
	        return function (model, comparing) {
	            var sort = 0;
	
	            if (model.get(field) > comparing.get(field)) {
	                sort = 1;
	            } else {
	                sort = -1;
	            }
	
	            if (ascending) {
	                return sort;
	            }
	
	            return -sort;
	        };
	    }
	});
	
	exports.default = TableView;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TableRowView = Backbone.View.extend({
	    tagName: 'tr',
	
	    events: {
	        'click .item__link': 'showInfo'
	    },
	
	    initialize: function initialize(options) {
	        this.options = options || {};
	    },
	    render: function render() {
	        var _this = this;
	
	        var model = this.model.toJSON();
	
	        var columns = this.options.columns;
	
	
	        if (typeof columns !== 'undefined') {
	            _.each(columns, function (column, key) {
	                if (model.hasOwnProperty(column)) {
	                    _this.$el.append(_this.buildItemCell(model[column], _this.isClickable(column)));
	                }
	            });
	        } else {
	            _.mapObject(model, function (value, field) {
	                _this.$el.append(_this.buildItemCell(value, _this.isClickable(field)));
	            });
	        }
	
	        return this;
	    },
	    buildItemCell: function buildItemCell(name) {
	        var isLink = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	        var item = void 0;
	
	        if (isLink) {
	            item = '<td><a href="#" class="item__link">' + name + '</a></td>';
	        } else {
	            item = '<td>' + name + '</td>';
	        }
	
	        return $(item);
	    },
	    isClickable: function isClickable(column) {
	        return typeof this.options.clickable !== 'undefined' && this.options.clickable.indexOf(column) !== -1;
	    },
	    showInfo: function showInfo(e) {
	        e.preventDefault();
	        this.collection.select(this.model);
	        $('html, body').animate({
	            scrollTop: $('.user-detail').offset().top
	        }, 500);
	    }
	});
	
	exports.default = TableRowView;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var FilterView = Backbone.View.extend({
	    className: 'table-filter',
	    events: {
	        'keyup input[name="search"]': 'filterItems'
	    },
	    query: '',
	
	    initialize: function initialize() {
	        var _this = this;
	
	        this.originalCollection = this.collection.clone();
	
	        this.listenTo(this.collection, "reset", function (models, options) {
	            var filter = options.filter || false;
	
	            if (!filter) {
	                _this.originalCollection.reset(_this.collection.models);
	            }
	        });
	    },
	    render: function render() {
	        this.$el.html('<input type="text" name="search" placeholder="Введите текст" value="' + this.query + '">');
	
	        return this;
	    },
	    filterItems: function filterItems(e) {
	        var _this2 = this;
	
	        this.query = $(e.currentTarget).val().toLowerCase();
	        clearTimeout(this.timer);
	
	        this.timer = setTimeout(function () {
	            _this2.filterCollection(_this2.query);
	        }, 500);
	    },
	    filterCollection: function filterCollection(query) {
	        if (query === '') {
	            this.collection.reset(this.originalCollection.models, { filter: true });
	        } else {
	            var items = this.originalCollection.filter(function (model) {
	                return _.any(model.values(), function (value) {
	                    return value.toString().toLowerCase().indexOf(query) !== -1;
	                });
	            });
	            this.collection.reset(items, { filter: true });
	        }
	    }
	});
	
	exports.default = FilterView;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var DetailView = Backbone.View.extend({
	    className: 'user-detail column',
	    template: _.template($('#detail-view-template').html()),
	
	    initialize: function initialize() {
	        this.listenTo(this.collection, 'reset change sort', this.render, this);
	    },
	    render: function render() {
	        if (this.collection.selected !== null) {
	            this.$el.html(this.template(this.collection.selected.toJSON()));
	        }
	
	        return this;
	    }
	});
	
	exports.default = DetailView;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Pager = Backbone.View.extend({
	    className: 'pager',
	    template: _.template($('#pager-template').html()),
	    page: 1,
	    perPage: 10,
	    perPageOptions: [10, 50],
	
	    events: {
	        'click .pager__item': 'changePage',
	        'click .pager-count__item': 'changePerPageCount'
	    },
	
	    initialize: function initialize(options) {
	        this.perPageOptions = options.perPageOptions || this.perPageOptions;
	
	        this.listenTo(this.collection, "change reset sort", this.render, this);
	    },
	    render: function render() {
	        this.$el.html(this.template(this.getPagerData()));
	
	        return this;
	    },
	
	
	    /**
	     * Gather pagination info from collection and page options
	     */
	    getPagerData: function getPagerData() {
	        return {
	            perPage: this.collection.perPage,
	            pages: Math.ceil(this.collection.length / this.collection.perPage),
	            currentPage: this.collection.page,
	            perPageOptions: this.perPageOptions
	        };
	    },
	    changePage: function changePage(e) {
	        e.preventDefault();
	
	        var page = $(e.currentTarget).data('page');
	
	        this.collection.setPage(page);
	    },
	    changePerPageCount: function changePerPageCount(e) {
	        e.preventDefault();
	
	        var perPage = parseInt($(e.currentTarget).text());
	
	        this.collection.setPerPage(perPage);
	    }
	});
	
	exports.default = Pager;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map