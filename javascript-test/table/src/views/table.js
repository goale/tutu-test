import TableRowView from './tableRow';

const TableView = Backbone.View.extend({
    tagName: 'table',
    sortField: '',
    ascending: false,

    events: {
        'click .sortable': 'sortByField'
    },

    initialize(options) {
        this.options = options || {};

        this.listenTo(this.collection, 'reset change sort', this.render, this);

        if (typeof this.options.columns === 'undefined') {
            throw new Error('You should provide columns array');
        }
    },

    render() {
        this.$el.html('')
            .append(this.createHeader())
            .append(this.populate());

        return this;
    },

    createHeader() {
        var $header = $('<thead><tr></tr></thead>');
        _.each(this.options.columns, (column, key) => {
            if (column.sortable) {
                $header.append(`<th><a href="#" class="sortable" data-field="${key}">${column.label}</a></th>`);
            } else {
                $header.append(`<th>${column.label}</th>`);
            }
        });

        // TODO: add sortable classes

        return $header;
    },

    populate() {
        var $body = $('<tbody></tbody>');

        const fields = Object.keys(this.options.columns);

        _.each(this.collection.data(), (model) => {
            $body.append(new TableRowView({
                collection: this.collection,
                model,
                columns: fields,
                clickable: ['id']
            }).render().el);
        });

        return $body;
    },

    sortByField(e) {
        e.preventDefault();

        this.sortField = $(e.currentTarget).data('field');

        this.ascending = !this.ascending;

        this.collection.comparator = this.comparator(this.sortField, this.ascending);

        this.collection.sort();
    },

    comparator(field, ascending) {
        return (model, comparing) => {
            let sort = 0;

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

export default TableView;
