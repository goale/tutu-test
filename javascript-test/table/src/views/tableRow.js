const TableRowView = Backbone.View.extend({
    tagName: 'tr',

    events: {
        'click .item__link': 'showInfo'
    },

    initialize(options) {
        this.options = options || {};

    },

    render() {
        const model = this.model.toJSON();

        const { columns } = this.options;

        if (typeof columns !== 'undefined') {
            _.each(columns, (column, key) => {
                if (model.hasOwnProperty(column)) {
                    this.$el.append(this.buildItemCell(model[column], this.isClickable(column)));
                }
            });
        } else {
            _.mapObject(model, (value, field) => {
                this.$el.append(this.buildItemCell(value, this.isClickable(field)));
            });
        }

        return this;
    },

    buildItemCell(name, isLink = false) {
        let item;

        if (isLink) {
            item = `<td><a href="#" class="item__link">${name}</a></td>`;
        } else {
            item = `<td>${name}</td>`;
        }

        return $(item);
    },

    isClickable(column) {
        return typeof this.options.clickable !== 'undefined'
            && this.options.clickable.indexOf(column) !== -1;
    },

    showInfo(e) {
        e.preventDefault();
        this.collection.select(this.model);
    }
});

export default TableRowView;
