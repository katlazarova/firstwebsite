<?php include '../includes/header.php';?>

	<header>
		<h1>jQuery Crash Course | Effects & Animate</h1>
	</header>
	<div id="container">
		<button id="btnFadeOut">Fade Out</button>
		<button id="btnFadeIn">Fade In</button>
		<button id="btnFadeTog">Fade Toggle</button>

		<hr>

		<button id="btnSlideUp">Slide Up</button>
		<button id="btnSlideDown">SlideDown</button>
		<button id="btnSlideTog">Slide Toggle</button>
		<button id="btnStop">Stop</button>
		<hr>

		<div id="box"><h1>Hello World</h1></div>

		<hr>

		<button id="moveLeft">Move Left</button>
		<button id="moveRight">Move Right</button>
		<button id="moveAround">Move Around</button>
		<div id="box2"></div>
	</div>

	<script>
		$(document).ready(function(){
			$('#btnFadeOut').click(function(){
				$('#box').fadeOut(3000, function(){
					$('#btnFadeOut').text('Its Gone');
				});
			});
			$('#btnFadeIn').click(function(){
				$('#box').fadeIn(3000);
			});
			$('#btnFadeTog').click(function(){
				$('#box').fadeToggle(1000);
			});
			$('#btnSlideDown').click(function(){
				$('#box').slideDown(3000);
			});
			$('#btnSlideUp').click(function(){
				$('#box').slideUp(3000);
			});
			$('#btnSlideTog').click(function(){
				$('#box').slideToggle(3000);
			});
			$('#btnStop').click(function(){
				$('#box').stop();
			});
			$('#moveRight').click(function(){
				$('#box2').animate({
					left: 500,
					height: '300px',
					width:'300px',
					opacity: '0.5'
				});
			});
			$('#moveLeft').click(function(){
				$('#box2').animate({
					left: 0,
					height: '100px',
					width: '100px',
					opacity:'1'
				});
			});
			$('#moveAround').click(function(){
				var box = $('#box2');
				box.animate({
					left: 300
				});
				box.animate({
					top: 300
				});
				box.animate({
					left:0,
					top: 300
				});
				box.animate({
					left: 0,
					top:0
				});
			});
		});
	</script>
<?php include '../includes/footer.php';?>