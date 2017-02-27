var React = require('react');
var ReactRouter = require('react-router');
var axios = require('axios');
var lib = require('./../common/lib');
var Link = ReactRouter.Link;

var logoUrl = `${lib.assetRoot}images/logo.png`;
var iconUrl = `${lib.assetRoot}images/all-icon.png`;



require('./../../stylesheets/layout/header.scss');
var Header = React.createClass({
  showLogin: function () {
    this.props.showLoginFn(true);
  },
  componentDidMount: function() {
    var props = this.props,
        comp = this;
        
    if(props.loginType === 'google'){
      var profilePic = props.userProfile.profilePic;
      axios.get(profilePic, null,{
        withCredentials: true
      }).
      then(function(response2) {
        
         comp.setState({
          profilePic: response2.data.image.url
        });
      });
    }
  },
  logout: function() {
    var comp = this;
    console.log(comp);
    axios.post(`${lib.serverUrl}logout`, null, {
      withCredentials: true
    }).then(function() {
      comp.props.getLoginStatus();
    });
    comp.props.removeURL();
  },
  showDropDown: function (value) {
    this.setState({
      showDropDown: value
    });
  },
  getInitialState: function () {
    return {
      profileImage: ''
    };
  },
  render: function() {
    var header = this;
    var tipClassName = header.state.showDropDown ? 'tooltip-menu tip-show app-tip' : 'tooltip-menu ';
    return (
      <div className="header-container">
        <header className="clearfix header">

          <div className="home-title">
            <div>IRDB</div>
          </div>

          
            {(function(){
              if(header.props.loggedIn == true) {
               
               var userProfile = header.props.userProfile;
                return (
                        <ul className="right-nav">

                        <li className="profile-link"><span className="  logout-btn" onClick={header.logout}>
                        <span style={{backgroundImage: `url(${iconUrl})`}} className="cf-icon logout-icon"/>
                        </span></li>
                        <li className="profile-link">
                          <img src={header.state.profilePic || userProfile.profilePic} className="profile-image"/>
                          {userProfile.name}
                          
                          
                        </li>

                        </ul>
                        );
              }
              else {
                if(header.props.loggedIn == true){
                return (
                     <ul className="right-nav">
                     <li className="header-text-link"><a href="javascript:void(0)"  className="darkbtn login-link" onClick={header.showLogin}>Login</a></li>
                     </ul>
                  );
                }
              }
            })()}
            
           
        

         

        </header>
      </div>
    );
  }
});

module.exports = Header;