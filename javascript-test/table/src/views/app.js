import UsersCollection from '../collections/users';
import ListView from './list';
import DetailView from './detail';
import Pager from './pager';

const AppView = Backbone.View.extend({
    el: '.users-data',

    initialize() {

        this.collection.fetch({
            success: () => {
                this.collection.fetched = true;
                this.render();
            },
            reset: true,
        });

        this.render();
    },

    render() {
        const collection = this.collection;

        if (collection.fetched) {
            this.$el.html(new ListView({ collection }).render().el)
                .after(new DetailView({ collection }).render().el)
                .after(new Pager({ collection }).render().el);
        } else {
            this.$el.html('<h1>Loading...</h1>');
        }
    }
});

export default AppView;
