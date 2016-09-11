import AppView from './views/app';
import UsersCollection from './collections/users';

const Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "!/small": "small",
        "!/large": "large",
    },

    index() {
        return;
    },

    small() {
        const collection = new UsersCollection();

        new AppView({ collection });
    },

    large() {
        const collection = new UsersCollection([], { url: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}'});

        new AppView({ collection });
    }
});

export default Router;
