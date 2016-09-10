import TableRowView from './tableRow';

const TableView = Backbone.View.extend({
    tagName: 'table',

    events: {
        'click .sortable': 'sortByField'
    },

    initialize(options) {
        this.options = options || {};

        if (typeof this.options.columns === 'undefined') {
            throw new Error('You should provide columns array');
        }
    },

    render() {
        let $table = this.createHeader();
        $table.insertAfter(this.populate());

        this.$el
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

        _.each(this.collection.paginate(), (model) => {
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

        const $field = $(e.currentTarget).data('field');

        this.collection.sortCollection($field);
    }
});

export default TableView;
