<h1><i class="fa fa-vk"></i>Vkontakte Social Authentication</h1>
<hr />

<form class="sso-vk">
	<div class="alert alert-warning">
		<p>
			Register a new <strong>Vkontakte Application</strong> via 
			<a href="http://vk.com/dev">Application Development</a> and then paste
			your application details here.	
		</p>
		<br />
		<input type="text" data-field="id" title="Client ID" class="form-control input-lg" placeholder="Client ID"><br />
		<input type="text" data-field="secret" title="Client Secret" class="form-control" placeholder="Client Secret"><br />
		<p class="help-block">
			 Your callback URL is yourdomain.com/auth/vkontakte/callback
		</p>
	</div>
</form>

<button class="btn btn-lg btn-primary" id="save">Save</button>

<script>
	require(['settings'], function(Settings) {
		Settings.load('sso-vk', $('.sso-vk'));

		$('#save').on('click', function() {
			Settings.save('sso-vk', $('.sso-vk'));
		});
	});

</script>