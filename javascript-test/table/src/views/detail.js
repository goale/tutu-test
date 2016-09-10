const DetailView = Backbone.View.extend({
    className: 'user-detail',
    template: _.template($('#detail-view-template').html()),

    render() {
        if (typeof this.collection.selected !== 'undefined') {
            this.$el.html(this.template(this.collection.selected.toJSON()));
        }

        return this;
    }
});

export default DetailView;
