<?php include '../includes/header.php';?>

		<h1 id="heading1">Learning tutorials</h1>
		<p id="para1">Het is al geruime tijd een bekend gegeven dat een lezer, tijdens het bekijken van de layout van een pagina, afgeleid wordt door de<span>n het gebruik van Lorem Ipsum is dat het uit een min of meer normale verdeling van letters bestaat, in</span> tekstuele inhoud. Het belangrijke punt va tegenstelling tot "Hier uw tekst, hier uw tekst" wat het tot min of meer leesbaar nederlands maakt. Veel desktop publishing pakketten en web pagina editors g</p>

		<h1 class="heading2">Learning tutorials</h1>
		<p class="para2">Het is al geruime tijd een bekend gegeven dat een lezer, tijdens het bekijken van de layout van een pagina, afgeleid wordt door de <span>Het belangrijke punt van het gebruik van Lorem Ipsum is dat het uit een min of meer normale verdeling van letters bestaat, in tegenstelling tot "Hier uw tekst, hier uw tekst" wat het tot min of meer leesbaar nederlands maakt. Veel desktop publish</span>tekstuele inhoud. ing pakketten en web pagina editors g</p>

		<ul id="list">
			<li>List Item</li>
			<li>List Item</li>
			<li>List Item</li>
			<li>List Item</li>
			<li>List Item</li>
			<li>List Item</li>
		</ul>

		<input type="button" value="button 1">
		<input type="submit" value="button 1">
		<input type="text">

		<a href="http://google.com">Google</a>
		<a href="http://yahoo.com">Yahoo</a>
	</div>
	<script>
		//$('h1').hide();
		//$('.heading2').hide();

		//$('p span').css('color','red');

		$('ul#list li:first').css('color','red');
		$('ul#list li:last').css('color','green');
		$('ul#list li:even').css('background-color','yellow');
		$('ul#list li:odd').css('background-color','#cccccc');
		$('ul#list li:nth-child(3n)').css('list-style','none');
		$(':text').hide();
		$('[href]').css('color','red');
		$('a[href="http://yahoo.com"]').css('color','green');
		
		/* * used to denote everything */		

		//$('*').hide();
		
	</script>
<?php include '../includes/footer.php';?>