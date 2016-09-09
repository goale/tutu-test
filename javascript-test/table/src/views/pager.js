const Pager = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#pager-template').html()),

    events: {
        'click .pager__item': 'changePage',
        'click .pager-count__item': 'changePerPageCount'
    },

    initialize() {
        this.pageData = {
            perPage: this.collection.perPage,
            pages: Math.ceil(this.collection.length / this.collection.perPage),
            currentPage: this.collection.page,
            perPageOptions: [10, 50],
        };

        this.render();
    },

    render() {
        this.$el.append(this.template(this.pageData));

        return this;
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
