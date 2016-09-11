import UsersCollection from '../collections/users';
import ListView from './list';
import DetailView from './detail';
import Pager from './pager';

const AppView = Backbone.View.extend({
    el: '#app',

    initialize() {

        this.collection.fetch({
            success: () => {
                this.render();
            },
            error: () => {
                this.onError();
            },
            reset: true,
        });

        this.onLoading();
    },

    render() {
        const collection = this.collection;

        this.$el.html(new ListView({ collection }).render().el)
            .append(new Pager({ collection }).render().el)
            .append(new DetailView({ collection }).render().el);
    },

    onLoading() {
        this.$el.html('<h1>Loading...</h1>');
    },

    onError() {
        this.$el.html('<h1>Error Occured</h1>');
    }
});

export default AppView;
