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
        this.perPageOptions = options.perPageOptions || this.perPageOptions;

        this.listenTo(this.collection, "change reset sort", this.render, this);
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
            perPage: this.collection.perPage,
            pages: Math.ceil(this.collection.length / this.collection.perPage),
            currentPage: this.collection.page,
            perPageOptions: this.perPageOptions,
        };
    },

    changePage(e) {
        e.preventDefault();

        const page = $(e.currentTarget).data('page');

        this.collection.setPage(page);
    },

    changePerPageCount(e) {
        e.preventDefault();

        const perPage = parseInt($(e.currentTarget).text());

        this.collection.setPerPage(perPage);
    },
});

export default Pager;
