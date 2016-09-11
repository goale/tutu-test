import Router from './router';

$(document).ready(() => {
    new Router();
    Backbone.history.start();
});
