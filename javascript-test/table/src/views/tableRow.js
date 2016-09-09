const TableRowView = Backbone.View.extend({
    tagName: 'tr',

    initialize(options) {
        this.options = options || {};

    },

    render() {
        const model = this.model.toJSON();

        const { columns } = this.options;

        if (typeof columns !== 'undefined') {
            _.each(columns, (column) => {
                if (model.hasOwnProperty(column)) {
                    this.$el.append($(`<td>${model[column]}</td>`));
                }
            });
        } else {
            _.mapObject(model, (value, field) => {
                this.$el.append($(`<td>${value}</td>`));
            });
        }

        return this;
    }
});

export default TableRowView;
