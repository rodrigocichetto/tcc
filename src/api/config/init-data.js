module.exports = (app) => {
    const User = app.models.users;

    User.find({}, [], { sort: { name: 1 } })
        .exec()
        .then(users => {

            if (!users.length) {

                new User({
                    name: 'Demonstração',
                    username: 'demo',
                    password: 'demo',
                    mail: 'demo@demo.com',
                    city: 587
                }).save();

            }

        });

}