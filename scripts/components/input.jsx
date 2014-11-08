
/**
 * components/btn.jsx
 *
 * Button component
 */

var Input = React.createClass({

	onChange: function(event) {

		if (typeof this.props.onChange === "function") {

			this.props.onChange(event.target);

		}

	},

	render: function() {

		var className = "input";

		return (
			
			<input type="text" className={className} onChange={this.onChange} placeholder="Type here..." autoFocus autoComplete="off" autoCorrect="off" spellCheck="false" />

		);

	}

});