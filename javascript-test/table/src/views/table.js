import TableRowView from './tableRow';

const TableView = Backbone.View.extend({
    className: 'users-table',
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
        let $table = $('<table />')
            .append(this.createHeader())
            .append(this.populate());

        this.$el.html($table);

        return this;
    },

    /**
     * Create table header based on provided set of columns
     */
    createHeader() {
        var $header = $('<thead><tr></tr></thead>');
        _.each(this.options.columns, (column, key) => {
            $header.append(this.createHeaderItem(key, column));
        });

        return $header;
    },

    /**
     * Build table header item
     */
    createHeaderItem(field, options) {
        if (options.sortable) {
            let itemStyles = ['sortable'];
            if (this.sortField === field) {
                itemStyles.push(this.ascending ? 'asc' : 'desc');
            }
            return `<th><a href="#" class="${itemStyles.join(' ')}" data-field="${field}">${options.label}</a></th>`;
        }

        return `<th>${options.label}</th>`;
    },

    /**
     * Table body with fetched data
     */
    populate() {
        const data = this.collection.data();

        if (data.length === 0) {
            return $(`<p class="info">Нет записей</p>`);
        }


        let $body = $('<tbody></tbody>');

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

    /**
     * Sort by string values function
     */
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
