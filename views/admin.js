var db = require('../middleware/db'),
	session = require('express-session'),
	utils = require('../middleware/utils');

//   Administation's part

exports.login = function (req, res) {
	res.render('../template/login_page', {status: ""});
};

exports.check_login = function (req, res) {
    var login = req.body.login,
        password = req.body.password;

    login = utils.sanitize_info(login);
    password = utils.sanitize_info(password);

    db.getUserByLogin(login, function (user) {
        if (user.length == 0 || user[0].pass != password) {
            res.render('../template/login_page', {
                status: "error - wrong password or login"
            });
        } else {
            console.log(login, " has logged in");
            req.session.login = login;
            res.redirect('/admin/longreads');
        }
    });
};


//   Longread's part

exports.longreads = function (req, res) {
    //res.redirect('/admin/longread/edit/0');

    db.getUnpublicatedLongreads(function (longreads) {
        res.render('../template/longreads_list', {
            articles: longreads
        });
    });
};

exports.edit_longread = function (req, res) {
    var id = req.params.id,
        username = req.session.login;

    res.render('../template/longread_creation', {
        id: id,
        username: username,
        article: {
            title: "",
            lead: "",
            body: ""
        }
    });

    /*db.getLongread(id, function (longread) {
        res.render('../template/longreads_list', {
            id: id,
            username: username,
            article: longread
        });
    })*/
};

exports.save_longread = function (req, res) {

};