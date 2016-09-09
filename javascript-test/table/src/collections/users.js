import User from '../models/user';

let UsersCollection = Backbone.Collection.extend({
    model: User,
    url: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
});

export default UsersCollection;
