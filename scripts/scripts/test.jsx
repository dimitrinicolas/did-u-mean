
/**
 * scripts/test.jsx
 *
 * Test Script
 */

onload(function() {

	function onChange(input) {

		var words = input.value.split(" ");

		socket.emit("did i mean", { words: words }, function(result) {

			document.getElementById("result").value = result.join(" ")

		});

	}

	React.render(

		<div>
			<Input onChange={onChange} />
			<input className="input" type="text" id="result" />
		</div>,
		
		document.body

	);

});