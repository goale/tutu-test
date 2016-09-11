const FilterView = Backbone.View.extend({
    className: 'table-filter',
    events: {
        'keyup input[name="search"]' : 'filterItems'
    },
    query: '',

    initialize() {
        this.originalCollection = this.collection.clone();

        this.listenTo(this.collection, "reset", (models, options) => {
            const filter = options.filter || false;

            if (!filter) {
                this.originalCollection.reset(this.collection.models);
            }
        });
    },

    render() {
        this.$el.html(
            `<input type="text" name="search" placeholder="Введите текст" value="${this.query}">`
        );

        return this;
    },

    filterItems(e) {
        this.query = $(e.currentTarget).val().toLowerCase();
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.filterCollection(this.query);
        }, 500);
    },

    filterCollection(query) {
        if (query === '') {
            this.collection.reset(this.originalCollection.models, { filter: true });
        } else {
            const items = this.originalCollection.filter((model) => {
                return _.any(model.values(), (value) => {
                    return value.toString().toLowerCase().indexOf(query) !== -1;
                });
            });
            this.collection.reset(items, { filter: true });
        }
    }
});

export default FilterView;
