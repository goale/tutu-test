import TableView from './table';
import FilterView from './filter';

const ListView = Backbone.View.extend({
    className: 'user-list column',
    render() {
        const collection = this.collection;

        const table = new TableView({ columns: {
            'id': {
                'label': 'ID',
                'sortable': true
            },
            'firstName': {
                'label': 'First Name',
                'sortable': true
            },
            'lastName': {
                'label': 'Last Name',
                'sortable': true
            },
            'email': {
                'label': 'Email',
                'sortable': true
            },
            'phone': {
                'label': 'Phone',
                'sortable': true
            }
        },
            collection
        });

        this.$el
            .html(new FilterView({ collection }).render().el)
            .append(table.render().el);

        return this;
    }
});

export default ListView;
