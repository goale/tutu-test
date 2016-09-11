const Pager = Backbone.View.extend({
    className: 'pager',
    template: _.template($('#pager-template').html()),

    events: {
        'click .pager__item': 'changePage',
        'click .pager-count__item': 'changePerPageCount'
    },

    initialize() {
        this.listenTo(this.collection, "change reset sort", this.render, this);
    },

    render() {
        this.$el.html(this.template(this.getPagerData()));

        return this;
    },

    getPagerData() {
        return {
            perPage: this.collection.perPage,
            pages: Math.ceil(this.collection.length / this.collection.perPage),
            currentPage: this.collection.page,
            perPageOptions: [10, 50],
        };
    },


    changePage(e) {
        e.preventDefault();

        const $pageElement = $(e.currentTarget);

        this.collection.setPage($pageElement.data('page'));
    },

    changePerPageCount(e) {
        e.preventDefault();

        const $option = $(e.currentTarget);

        this.collection.setPerPage(parseInt($option.text()));
    }

});

export default Pager;
