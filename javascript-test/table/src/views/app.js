import UsersCollection from '../collections/users';
import TableRowView from './tableRow';
import Pager from './pager';

const AppView = Backbone.View.extend({
    el: '#users-table tbody',

    initialize() {
        this.collection = new UsersCollection();

        this.listenTo(this.collection, "reset", this.render, this);

        this.collection.fetch({
            reset: true,
        });
    },

    render() {
        this.$el.empty();
        _.each(this.collection.paginate(), (model) => {
            this.$el.append(new TableRowView({ model: model }).render().el);
        });

        this.$el.append(new Pager({ collection: this.collection }).el);
    }
});

export default AppView;
