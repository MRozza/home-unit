// Login
exports.login = function(req, res) {
  var message = '';
  if (req.session && req.session.user) {
    req.session.user = null;
  }

  if (req.method == 'POST') {
    var post = req.body;
    var userName = post.user_name;
    var password = post.password;

    var sql =
      "SELECT id, name, user_name FROM users WHERE user_name='$1' and password = '$2'";
    try {
      const results = db.query(sql, [userName, password]);
      console.log(JSON.stringify(results));
      if (results && results.length) {
        // create session for user
        req.session.user = results[0];
        console.log('id: ' + results[0].id);
        console.log('Logged in successfully!');
        res.redirect('/home');
      }
    } catch (error) {
      message = 'Invalid Username or Password!';
      res.render('signin.ejs', { message: message });
    }
  } else {
    message = 'Invalid Username or Password!';
    res.render('signin.ejs', { message: message });
  }
};
// Register
exports.register = function(req, res) {
  message = '';
  if (req.method == 'POST') {
    var post = req.body;
    var userName = post.user_name;
    var password = post.password;
    var name = post.name;
    console.log(userName);
    console.log(password);
    var sql =
      'INSERT INTO users(name,user_name, password) VALUES($1, $2, $3)      returning *';
    const values = [name, userName, password];
    try {
      const rows = db.query(sql, values);
      console.log(JSON.stringify(rows));

      message = 'Succesfully! Your account has been created.';
      res.redirect('/login');
    } catch (error) {
      message = 'Enter valid data!';
      res.render('signup.ejs', { message: message });
    }
  } else {
    res.render('signup');
  }
};
