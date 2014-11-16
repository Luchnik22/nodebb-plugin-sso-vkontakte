<h1><i class="fa fa-vk"></i> Vkontakte Social Authentication</h1>
<hr />

<form class="sso-vk">
	<div class="alert alert-warning">
		<p>
			Register a new <strong>Vkontakte Application</strong> via 
			<a href="http://vk.com/dev">Application Development</a> and then paste
			your application details here.	
		</p>
		<br />
		<input type="text" name="id" title="Client ID" class="form-control input-lg" placeholder="Client ID"><br />
		<input type="text" name="secret" title="Client Secret" class="form-control" placeholder="Client Secret"><br />
		<p class="help-block">
			 Your callback URL is yourdomain.com/auth/vkontakte/callback
		</p>
	</div>
	<button type="button" class="btn btn-lg btn-primary" id="save">Save</button>
</form>

<script>
	require(['settings'], function(Settings) {
		var wrapper = $('.sso-vk');
		Settings.load('sso-vk', wrapper);

		$('#save').on('click', function() {
			Settings.save('sso-vk', wrapper, function() {
				app.alert({
					type: 'success',
					alert_id: 'Vkontakte-settings',
					title: 'Reload Required',
					message: 'Please reload your NodeBB to have your changes take effect',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				})
			});
		});
	});
</script>