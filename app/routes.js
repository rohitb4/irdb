var React = require('react');
  
var ReactRouter = require('react-router');
var axios = require('axios');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var Header = require('./components/layouts/Header');
var Footer = require('./components/layouts/Footer');
var lib = require('./components/common/lib');
var Loader = require('./components/common/Loader');
var HomeComponent = require('./components/pages/homepage/HomePage');





var LoginModal = require('./components/login/LoginModal');

require('./stylesheets/page/common.scss');



window.getLoginStatus = function ()  {
  axios.get(lib.serverUrl + 'login/status', {
      withCredentials: true
  }).
  then(function(response) {
    var apps = response.data.applications;

    mainComponent.setState({
      loggedIn: true,
      profile: response.data,
      showLoginModal: false,
      apps: apps,
      loginType: response.data.logintype
    });
   // debugger
    var app_id = apps.length ? apps[0].appid: 'new';
    // logic( if app_id is in apps, then push to router, else )
    //  // if (!mainComponent.props.app_id) {
       
    mainComponent.context.router.push(`/app/${app_id}`);


  
    
  }).catch(function(response) {
    if(response.status = 401 && response.message == "Full authentication is required to access this resource"){
      mainComponent.removeURL();
    }
    mainComponent.setState({
      loggedIn: false
    });
  });
};


window.addEventListener('message', function(event) {

    getLoginStatus();
});
var showLoader = false;

// var HomeComponent = React.createClass({
//   render: function(){
//     return (
//       <div>
//         Hi
//       </div>
//       )
//   }
// });

var MainComponent = React.createClass({
  showLogin: function (showValue) {
    this.setState({
      showLoginModal: showValue 
    });
  },
  showLoader: function (showValue) {
    showLoader = showValue;
  },
  componentDidMount: function() {
    var comp = window.mainComponent = this; // hack to get maincomponent instance, need to figure out a better way
    //getLoginStatus(this);
    axios.interceptors.response.use(function (response) {
      if(response.status = 401 && response.message == "Full authentication is required to access this resource"){
        comp.removeURL();
      }
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
    axios.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  },
  removeURL: function(){
    this.context.router.push(``);
  },
  getInitialState: function () {
    return {
      showLoginModal: false,
      loggedIn: undefined
    }
  },
  getChildContext: function () {
    return {
      loggedIn: this.state.loggedIn,
      showLoginFn: this.showLogin,
      shr: {
        showLoader: this.showLoader
      }
    }
  },
  render: function() {
    var comp = this;
        
    return (
      <div className="main-component">
        {(function(){
              return <div className="main-container">
              <Header showLoginFn={comp.showLogin} 
                      loggedIn={comp.state.loggedIn} 
                      userProfile={comp.state.profile} 
                      getLoginStatus={getLoginStatus}
                      apps={comp.state.apps}
                      removeURL={comp.removeURL}
                      loginType={comp.state.loginType}
                      />
              <div className="body-wrapper">
                  {comp.props.children}
                  {
                    (function() {
                      if (comp.state.showLoginModal == true) {
                        return <LoginModal showLogin={comp.state.showLoginModal} showLoginFn={comp.showLogin}/>
                      }
                      if(comp.state.loggedIn == false){
                        return <Footer />;
                      }
                    })()
                  }
                </div>
              </div>
          
        })()}
        {
          (function() {
            return showLoader ? <Loader /> : <div></div>
          })()
        }
        
      </div>
    );
  }
});
MainComponent.childContextTypes = {
  loggedIn: React.PropTypes.bool,
  showLoginFn: React.PropTypes.func,
  shr: React.PropTypes.object
};
MainComponent.contextTypes = {
  router: React.PropTypes.object

};




var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={MainComponent}>
      <IndexRoute component={HomeComponent}/>
      
       <Route path="recipe" getComponents={ (nextState, callback)=>{
  
          require.ensure([], function (component) {
            callback(null, require('./components/pages/recipe/Recipe'));
          })
        }}/>
      
    </Route>
    
    
  </Router>
);

module.exports = routes;

