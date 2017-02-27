var React = require('react');
require('./../../stylesheets/components/login.scss');
var lib = require('./../common/lib')
var serverUrl = lib.serverUrl;
var fbUrl = `${serverUrl}login/facebook`
var gpUrl = `${serverUrl}login/google`;
var fbIconUrl = require('./../../images/fb.svg');
var gpIconUrl = `${lib.assetRoot}images/gp-icon.png`;
var adobeLogo = `${lib.assetRoot}images/adobe-logo.png`;
var bgLogo = `${lib.assetRoot}images/bg3.jpg`;
var imageUrl = `${lib.assetRoot}images/`;
function target_popup(form) {
    window.open('', 'formpopup', 'width=400,height=400,resizeable,scrollbars');
    form.target = 'formpopup';
}
var showLogin = true;
// to be moved within css
const fiddleLogoStyle = {
	display: 'block',
	backgroundImage: 'url('+imageUrl+'fiddle-logo.png)',
	backgroundSize: 'contain',
	backgroundRepeat: 'no-repeat',
	height: '5%',
	zIndex: '7',
	position: 'absolute',
	width: '100%',
	top: '0px',
	backgroundColor: '#00445A'
};
var LoginModal = React.createClass({
	getInitialState: function(){
		return {
			showLoginUi: false
		}
	},
	connectLink: function (syntheticEvent) {
		var target = syntheticEvent.currentTarget;

		var formEl = target.parentElement;
		this.handleSubmit(formEl);
		formEl.submit();
	},
	hideLogin: function() {
		this.props.showLoginFn(false);
	},
	handleSubmit: function(form) {
	var w = 800, h = 600;
	// Credits stackoverflow: 4068373
		 // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
		 window.open('', 'formpopup', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    	form.target = 'formpopup';
	},
	setShowLoginUiState: function(value){
		this.setState({
			showLoginUi: value
		});
	},
	render: function() {
		var comp=this;
		var className = 'login-modal';

		if (this.props.showLogin) {
			className += ' show';
		}
		if(true == false){
		return (<div className={className} style={{backgroundImage: `url(${bgLogo})`}}> 
				
				<div className="login-container">
					<div className="adobe-logo" style={{backgroundImage: `url(${adobeLogo})`}} ></div>
					<h2>Welcome To ColdFusion Fiddle</h2>
					{()=>{
						if(showLogin){
							return (
								<div>Hi</div>
							)
						}
					}}
					<div className="connect-buttons">
						<div className="connect-button fb">
							 <form method="post" action={fbUrl}>
							<span className="login-tab "><img src={fbIconUrl} /></span><a href="javascript:void(0)" className="connect-link" onClick={this.connectLink}>Login with Facebook</a>
							</form>
						</div>
						<div className="connect-button gp">
							 <form method="post" action={gpUrl}>
							<span className="login-tab"><img src={gpIconUrl} /></span><a href="javascript:void(0)" className="connect-link" onClick={this.connectLink}>Login with Google</a>
							</form>
						</div>
					</div>
				</div>
			</div>);
		}
		else{
			return (
					
              						<div className="buttons-background" onClick={comp.context.showLoginFn.bind(comp, false)}>
              						<div className="buttons">
              							<div className="connect-buttons">
											<div className="connect-button fb">
												<form method="post" action={fbUrl}>
													<span className="login-tab "><img src={fbIconUrl} /></span>
													<a href="javascript:void(0)" className="connect-link" onClick={comp.connectLink}>Login with Facebook</a>
												</form>
											</div>
											<div className="connect-button gp">
												<form method="post" action={gpUrl}>
													<span className="login-tab"><img src={gpIconUrl} /></span>
													<a href="javascript:void(0)" className="connect-link" onClick={comp.connectLink}>Login with Google</a>
												</form>
											</div>
										</div>
									</div>
									</div>
              		
			)
		}
	}
});
LoginModal.contextTypes = {
	showLoginFn: React.PropTypes.func
};
module.exports = LoginModal;