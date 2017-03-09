var React = require('react');
var ReactRouter = require('react-router');
var axios = require('axios');
var Link = ReactRouter.Link;
var lib = require('./../../common/lib');
var Header = require('./../../layouts/Header');
var LoginModal = require('./../../login/LoginModal');

require('./../../../stylesheets/page/homepage.scss');
var imageUrl = `${lib.assetRoot}images/`;
var iconUrl = `${lib.assetRoot}images/fiddle-features.png`;
var HomeComponent = React.createClass({
	
	render: function(){

		var comp = this;
		return (
			<div className="home-component">
				<div className="show" style={{backgroundImage: `url(${imageUrl}header-image-without-text.png)`}}>
					<div className="first-line">Welcome To <span className="second-line">IRDB</span></div>
				</div>
				
				<div className="login-button"><Link to="/recipe" className="login-button-text">Upload Recipe</Link>
				</div>
				<div className="login-button"><Link to="/ingredient" className="login-button-text">Add Ingredient</Link>
				</div>
				
			</div>
		)
	}
});
HomeComponent.contextTypes = {
	showLoginFn: React.PropTypes.func
};
module.exports = HomeComponent;