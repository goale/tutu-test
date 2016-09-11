import User from '../models/user';

let UsersCollection = Backbone.Collection.extend({
    model: User,
    url: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
    page: 1,
    perPage: 10,
    sortField: '',
    ascending: false,
    fetched: false,

    initialize(model, options) {
        this.url = options.url || this.url
    },

    paginate() {
        if (this.page === 1) {
            return this.first(this.perPage);
        }

        return _.first(this.rest(this.perPage * (this.page - 1)), this.perPage);
    },

    data() {
        return this.paginate();
    },

    setPage(page) {
        this.page = page;
        this.trigger("change", this, this.options);
    },

    sortCollection(field) {
        this.sortField = field;
        this.ascending = !this.ascending;

        this.sort();
    },

    comparator(model, comparing) {
        let sort = 0;

        if (model.get(this.sortField) > comparing.get(this.sortField)) {
            sort = 1;
        } else {
            sort = -1;
        }

        if (this.ascending) {
            return sort;
        }

        return -sort;
    },

    setPerPage(perPage) {
        this.perPage = perPage;
        this.page = 1;
        this.trigger("change", this, this.options);
    },

    select(model) {
        this.selected = model;
        this.trigger("change", this, this.options);
    }
});

export default UsersCollection;
