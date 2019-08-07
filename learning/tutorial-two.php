<?php include '../includes/header.php';?>
	
	<div id="container">
		<h3>Mouse Events</h3>
		<button id="btn1" class="btnClass">Button 1</button>
		<button id="btn2">Button 2</button>
		<p class="para1">Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).</p>
		<h1 id="coords"></h1>
		<hr>
		<form id="form">
			<label>Name</label><br>
			<input type="text" id="name" name="name"><br>
			<label>Email</label><br>
			<input type="email" id="email" name="email"><br>
			<label>Gender</label><br>
			<select id="gender" name="gender">
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
			<br>
			<input type="submit" value="Submit">
		</form>
	</div>

	<script>
		/* (document).ready - performs function once page is loaded */
		$(document).ready(function(){

			/*
			$('#btn1').click(function(){
				alert('button clicked!');
			});

			// the same as code above, just a longer version 
			
			$('#btn1').on('click', function(){
				alert('button clicked!');
			});
			
			//toggle switches between states 
			$('#btn1').on('click', function(){
				//$('.para1').hide();
				$('.para1').toggle();
			});

			$('#btn2').on('click', function(){
				$('.para1').show();
			});

			$('#btn1').dblclick(function(){
				$('.para1').toggle();
			});

			$('#btn1').hover(function(){
				$('.para1').toggle();
			});
			

			$('#btn1').on('mouseenter', function(){
				$('.para1').toggle();
			});

			$('#btn1').on('mouseleave', function(){
				$('.para1').toggle();
			});
			
			$('#btn1').on('mousemove', function(){
				$('.para1').toggle();
			});

			// mousedown is when mouse is being clicked 
			$('#btn1').on('mousedown', function(){
				$('.para1').toggle();
			});

			$('#btn1').on('mouseup', function(){
				$('.para1').toggle();
			});

			// e is shorthand for event object

			//clicking button brings up alert showing id, inner html or outer html (the whole button tag)
			$('#btn1').click(function(e){
				//alert(e.currentTarget.id);
				//alert(e.currentTarget.innerHTML);
				//alert(e.currentTarget.outerHTML);
				alert(e.currentTarget.className);
			});

			// .append inserts content after other elements - this code displays coordinates of mouse movements in text on the page - new coordinates keep getting added

			$(document).on('mousemove', function(e){
				$('#coords').append('Coords: Y: '+e.clientY+" X: "+e.clientX);
			});
			
			$(document).on('mousemove', function(e){
				$('#coords').html('Coords: Y: '+e.clientY+" X: "+e.clientX);
			});

			//changing .append to .html replaces old coordinates with new coordinates as the mouse moves around the page - this can be used for interactive applications that use animation

			// saying "this" applies the changes to whatever input you're currently in

			//focus is for when you click inside the input field and blur is when it's outside 

			$('input').focus(function(){
				//alert('focus');
				$(this).css('background', 'pink');
			});

			$('input').blur(function(){
				//alert('focus');
				$(this).css('background', '#f4f4f4');
			});

			//the following code logs the keys typed into the input field

			$('input').keyup(function(e){
				console.log(e.target.value);
			});

			*/

			$('select#gender').change(function(e){
				alert(e.target.value);
			});

			// e.preventDefault stops the page from refreshing when clicking submit 

			$('#form').submit(function(e){
				e.preventDefault();
				var name = $('input#name').val();
				console.log(name);
			});
		});
<?php include '../includes/footer.php';?>