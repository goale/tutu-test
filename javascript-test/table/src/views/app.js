import UsersCollection from '../collections/users';
import TableView from './table';
import TableRowView from './tableRow';
import Pager from './pager';

const AppView = Backbone.View.extend({
    el: '.users-data',

    initialize() {
        this.collection = new UsersCollection();

        this.listenTo(this.collection, "reset change sort", this.render, this);

        this.collection.fetch({
            reset: true,
        });
    },

    render() {
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
            collection: this.collection
        });
        this.$el.html(table.render().el);
        this.$el.append(new Pager({ collection: this.collection }).el);
    }
});

export default AppView;
