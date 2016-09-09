const TableRowView = Backbone.View.extend({
    tagName: 'tr',

    template: _.template($('#table-row-template').html()),

    render() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});

export default TableRowView;
