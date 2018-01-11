/*function add_fields() {
	console.log('test')
	var wrapper = document.getElementById('wrapper')
    wrapper.innerHTML += '<div class="form-group"><input type="text" name="name" placeholder="Friends Name" class="form-control"/></div><div class="form-group"><input type="text" name="to" placeholder="Friends Number" class="form-control"/></div>';
}*/

$('#more_fields').click(function(){
	$(this).before('<div class="form-group"><input type="text" name="name" placeholder="Naam" class="form-control"/></div><div class="form-group"><input type="text" name="to" value="+316" class="form-control"/></div>')
})