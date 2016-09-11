const Pager = Backbone.View.extend({
    className: 'pager',
    template: _.template($('#pager-template').html()),
    page: 1,
    perPage: 10,
    perPageOptions: [10, 50],

    events: {
        'click .pager__item': 'changePage',
        'click .pager-count__item': 'changePerPageCount'
    },

    initialize(options) {
        this.perPage = options.perPage || this.perPage;
        this.perPageOptions = options.perPageOptions || this.perPageOptions;

        this.originalCollection = this.collection.clone();
        this.listenTo(this.collection, "change reset sort", this.render, this);

        const models = this.paginate(this.originalCollection, this.page, this.perPage);

        this.collection.reset(models);
    },

    render() {
        this.$el.html(this.template(this.getPagerData()));

        return this;
    },

    /**
     * Gather pagination info from collection and page options
     */
    getPagerData() {
        return {
            perPage: this.perPage,
            pages: Math.ceil(this.originalCollection.length / this.perPage),
            currentPage: this.page,
            perPageOptions: [10, 50],
        };
    },

    changePage(e) {
        e.preventDefault();

        this.page = $(e.currentTarget).data('page');

        this.refresh(this.originalCollection, this.page, this.perPage);
    },

    changePerPageCount(e) {
        e.preventDefault();

        this.page = 1;
        this.perPage = parseInt($(e.currentTarget).text());

        this.refresh(this.originalCollection, this.page, this.perPage);
    },

    /**
     * Get paginated chunk of collection
     */
    paginate(collection, page = 1, perPage = 10) {
        if (page === 1) {
            return collection.first(perPage);
        }

        const offset = (page - 1) * perPage;

        return _.first(collection.rest(offset), perPage);
    },

    /**
     * Filter models based on page options
     * and reset collection with selected models
     */
    refresh(collection, page, perPage) {
        const models = this.paginate(collection, page, perPage);

        this.collection.reset(models);
    }
});

export default Pager;
