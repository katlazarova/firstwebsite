<?php include '../includes/header.php';?>

	<header>
		<h1>jQuery Crash Course | DOM Manipulation</h1>
	</header>
	<div id="container">
	<button id="btn1">Button 1</button>
	<p class="para1">This is a paragraph</p>
	<p class="para2">This is another paragraph</p>
	<div id="myDiv"></div>
	<input type="text" id="newItem">
	<ul id="list">
		<li>List Item 1</li>
		<li>List Item 2</li>
		<li>List Item 3</li>
		<li>List Item 4</li>
	</ul>
	<a href="http://google.com">Google</a>
	<ul id="users"></ul>
	</div>

	<script>
		$(document).ready(function(){
			//$('p.para1').css('color', 'red');
			//$('p.para1').css({color:'red',background:'#ccc'});

			// .addClass adds an additional class to the element without removing the current attributes 


			//$('p.para2').addClass('myClass');

			//removes class from selected element
			//$('p.para2').removeClass('myClass');
			
			//$('#btn1').click(function(){
				//$('p.para2').toggleClass('myClass');
				//});
			/*

			//returns the text content of all matched elements and removes HTML markup - it overwrites the content of ALL matched elements
			$('#myDiv').text('Hello World');
			
			//$('#myDiv').html('<h3>Hello World</h3>');
			//alert($('#myDiv').text());
			$('ul').append('<li>Append List Item</li>');
			$('ul').prepend('<li>Prepend List Item</li>');
			$('.para1').appendTo('.para2');
			$('.para1').prependTo('.para2');
			
			// different to apprendTo/prependTo because it doesn't put content on the same line 
			$('ul').before('<h4>Hello</h4>');
			$('ul').after('<h4>World</h4>');
			
			// empty removes content from selected object
			$('ul').empty();

			// removes the selected element but it keeps data and events. Keeps a copy of the removed elements, so they can be reinserted

			$('ul').detach();

			// this opens the link in a new tab
			$('a').attr('target', '_blank');

			// the alert is the link but the link doesn't work
			alert($('a').attr('href'));
			$('a').removeAttr('target');
			*/

			//wraps h1 around the p
			//$('p').wrap('<h1>');
			//$('p').wrapAll('<h1>');
			
			// this code adds whatever is typed into the input to the ul - keyup is used to keep track of what is put into the input field. Variable is the key which is being pressed. code == 13 is the enter key. If enter key is pressed, the text in the input field is added to the ul
			$('#newItem').keyup(function(e){
				var keypressed = e.which; 
				if(code == 13){
					e.preventDefault();
					$('ul').append('<li>'+e.target.value+'</li>');
				}
			});
			/*

			//array of names and use of the each method to loop them - 
			var myArr = ['Brad', 'Kelley', 'Nate', 'Jose'];
			
			// adds the names of "users" to the ul 
			$.each(myArr, function(i, val){
				$('#users').append('<li>'+val+'</li>');
			});
			*/

			//logs the list item inner html in console
			var newArr = $('ul#list li').toArray();
			$.each(newArr, function(i, val){
				console.log(val.innerHTML);
			});
		});
	</script>
<?php include '../includes/footer.php';?>