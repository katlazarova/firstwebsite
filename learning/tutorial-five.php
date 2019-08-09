<?php include '../includes/header.php';?>

	<header>
		<h1>jQuery Crash Course | Ajax</h1>
	</header>
	<div id="container">
		<div id="result"></div>
		<ul id="users"></ul>
		<h3>Add Post</h3>
		<form id="postForm" action="https://jsonplaceholder.typicode.com/posts">
		<input type="text" id="title" placeholder="Title"><br>
		<textarea placeholder="Body" id="body"></textarea><br>
		<input type="submit" value="Submit">
		</form>
	</div>

	<script>
		$(document).ready(function(){
			/*
			//loads data from server and puts it into the selected element
			$('#result').load('test.html', function(responseTxt, statusTxt, xhr){
				if(statusTxt == "success"){
					alert('It went fine');
				} else if(statusTxt == "error"){
					alert("Error: "+xhr.statusText);
				}
			});
			*/
			/*
			//loads data 
			$.get('test.html', function(data){
				$('#result').html(data);
			});
			*/
			//gets JSON encoded data 
			$.getJSON('users.json', function(data){
				$.each(data, function(i, user){
					$('ul#users').append('<li class="'+user.lastName+'">'+user.firstName+'</li>');
				});
			});
			/*
			//for asynchronous requests (not sure what this means)
			$.ajax({
				method:'GET',
				url: 'https://jsonplaceholder.typicode.com/posts',
				dataType: 'json'
			}).done(function(data){
				console.log(data);
				$.map(data, function(post, i){
					$('#result').append('<h3>'+post.title+'</h3><p>'+post.body+'</p>');
				});
			});
			*/
			//.submit is for submitting forms 
			$('#postForm').submit(function(e){
				e.preventDefault();
				var title = $('#title').val();
				var body = $('#body').val();
				var url = $(this).attr('action');
				$.post(url, {title:title, body:body}).done(function(data){
					console.log('Post Saved');
					console.log(data);
				});
			});
		});
	</script>
<?php include '../includes/footer.php';?>