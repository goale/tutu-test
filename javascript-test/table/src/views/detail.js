const DetailView = Backbone.View.extend({
    className: 'user-detail column',
    template: _.template($('#detail-view-template').html()),

    initialize() {
        this.listenTo(this.collection, 'reset change sort', this.render, this);
    },

    render() {
        if (this.collection.selected !== null) {
            this.$el.html(this.template(this.collection.selected.toJSON()));
        }

        return this;
    }
});

export default DetailView;
