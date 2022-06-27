const mongoose = require('mongoose');
require('../models/User');
require('../models/Item');
require('../models/Comment');
require('../config/passport');
const User = mongoose.model('User');
const Item = mongoose.model('Item');
const Comment = mongoose.model('Comment');

mongoose.connect(process.env.MONGODB_URI);

const users = [];
for (let i = 0; i < 100; i++) {
    const user = new User();

    user.username = `user${i}`;
    user.email = `user${i}@example.com`;
    user.setPassword('password');
    users.push(user);
}
User.collection.insert(users);

const items = [];
for (let i = 0; i < 100; i++) {
    const item = new Item();

    item.title = `Item ${i}`;
    item.slug = item.title.replace(' ', '-').toLowerCase();
    item.description = `Item ${i} description`;
    item.image = `https://picsum.photos/200/300?image=${i}`;
    item.seller = users[i];
    items.push(item);
}
Item.collection.insert(items);

const comments = [];
for (let i = 0; i < 100; i++) {
    const comment = new Comment();

    comment.body = `Comment ${i}`;
    comment.seller = users[i];
    comment.item = items[i];
    comments.push(comment);
}
Comment.collection.insert(comments);
