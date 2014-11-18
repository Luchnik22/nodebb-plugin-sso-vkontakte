(function(module) {
	"use strict";

	var User = module.parent.require('./user'),
		meta = module.parent.require('./meta'),
		db = module.parent.require('../src/database'),
		passport = module.parent.require('passport'),
		VKontakteStrategy = require('passport-vkontakte').Strategy,
		fs = module.parent.require('fs'),
		path = module.parent.require('path'),
		nconf = module.parent.require('nconf');

	var constants = Object.freeze({
		'name': "Vkontakte",
		'admin': {
			'icon': 'fa-vk',
			'route': '/plugins/sso-vkontakte'
		}
	});

	var vkontakte = {};

	vkontakte.getStrategy = function(strategies, callback) {
		meta.settings.get('sso-vk', function(err, settings) {			
			if (!err && settings['id'] && settings['secret']) {				
				passport.use(new VKontakteStrategy({
					clientID: settings['id'],
					clientSecret: settings['secret'],
					callbackURL: nconf.get('url') + '/auth/vkontakte/callback'
				}, function(accessToken, refreshToken, profile, done) {
					vkontakte.login(profile.id, profile.displayName, function(err, user) {
						if (err) {							
							return done(err);
						}						
						done(null, user);
					});
				}));				
				
				strategies.push({
					name: 'vkontakte',
					url: '/auth/vkontakte/',
					callbackURL: '/auth/vkontakte/callback',
					icon: 'fa-vk'					
				});
			}
		});
	
		callback(null, strategies);
	};

	vkontakte.login = function(vkontakteID, username, callback) {
		var email = username + '@users.noreply.vkontakte.com';		
		
		vkontakte.getUidByvkontakteID(vkontakteID, function(err, uid) {
			if (err) {
				return callback(err);
			}

			if (uid) {
				// Existing User
				callback(null, {
					uid: uid
				});
				
			} else {
				// New User
				var success = function(uid) {
					User.setUserField(uid, 'vkontakteid', vkontakteID);
					db.setObjectField('vkontakteid:uid', vkontakteID, uid);

					callback(null, {
						uid: uid
					});
				};

				User.getUidByEmail(email, function(err, uid) {
					if (err) {
						return callback(err);
					}

					if (!uid) {
						User.create({username: username, email: email}, function(err, uid) {
							if (err !== null) {
								return callback(err);
							} else {
								success(uid);
							}
						});
					} else {
						success(uid); // Existing account -- merge
					}
				});
			}
		});
	};

	vkontakte.getUidByvkontakteID = function(vkontakteID, callback) {
		db.getObjectField('vkontakteid:uid', vkontakteID, function(err, uid) {
			if (err) {
				return callback(err);
			}
			callback(null, uid);			
		});
	};

	vkontakte.addMenuItem = function(custom_header, callback) {
		custom_header.authentication.push({
			"route": constants.admin.route,
			"icon": constants.admin.icon,
			"name": constants.name
		});

		callback(null, custom_header);
	};

	vkontakte.init = function(app, middleware, controllers, callback) {
		function render(req, res, next) {
			res.render('admin/plugins/sso-vkontakte', {});
		}

		// console.log(params);
		app.get('/admin/plugins/sso-vkontakte', middleware.admin.buildHeader, render);
		app.get('/api/admin/plugins/sso-vkontakte', render);

		app.get('/auth/vkontakte', passport.authenticate('vkontakte'));
		app.get('/auth/vkontakte/callback', 
			passport.authenticate('vkontakte', { failureRedirect: '/login' }),
			function(req, res) {				
    			res.redirect('/');
    		}
		);

		callback();
	};

	module.exports = vkontakte;
}(module));
