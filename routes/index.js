exports.index = function(req, res) {
  console.log(req.session);

  if (!req || !req.session || !req.session.user) {
    res.render('signin.ejs', { message: 'Invalid username or password!' });
  } else {
    var userId = req.session.user.id;

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    // excute sql query
    db.query(sql, function(err, results) {
      console.log('error: ' + err);
      // if there was an error or result was empty return to login page
      if (err || !results || !results[0]) {
        res.render('signin.ejs', { message: 'Invalid username or password!' });
      } else {
        var user = {
          id: results[0].id,
          name: results[0].name,
          userName: results[0].user_name
        };
        console.log(user);
        res.render('home.ejs', { user: user });
      }
    });
  }
};
