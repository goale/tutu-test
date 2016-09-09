import UsersCollection from '../collections/users';
import TableRowView from './tableRow';

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
        this.collection.each((model) => {
            this.$el.append(new TableRowView({ model: model }).render().el);
        });
    }
});

export default AppView;
