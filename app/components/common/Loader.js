var React = require('react');
var lib = require('./lib');


var Loader = React.createClass({
	render: function() {
		return <img src={`${lib.assetRoot}images/loader.svg`} className="main-loader"/>
	}
});

module.exports = Loader;