exports.index = function(req, res) {
  console.log(req.query.id);
  if (!req || !req.query || !req.query.id) {
    res.redirect(307, 'http://localhost:8091/login?error=401');
    return;
  }
  var userId = req.query.id;

  var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

  db.query(sql, function(err, results) {
    console.log(err);

    if (err || !results || !results[0]) {
      res.redirect(307, 'http://localhost:8091/login?error=401');
      return;
    }
    var user = {
      id: results[0].id,
      name: results[0].name,
      userName: results[0].user_name
    };
    console.log(user);
    res.render('home.ejs', { user: user });
  });
};
