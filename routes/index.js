exports.index = function(req, res) {
  console.log(req.session);

  if (!req || !req.session || !req.session.user) {
    res.render('signin.ejs', { message: 'Invalid username or password!' });
  } else {
    var userId = req.session.user.id;

    var sql = 'SELECT * FROM users WHERE id= $1';
    try {
      const results = db.query(sql, [userId]);
      console.log(JSON.stringify(results));
      if (results && results.length) {
        var user = {
          id: results[0].id,
          name: results[0].name,
          userName: results[0].user_name
        };
        console.log(user);
        res.render('home.ejs', { user: user });
      }
    } catch (error) {
      res.render('signin.ejs', { message: 'Invalid username or password!' });
    }
  }
};
