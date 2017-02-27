var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

require('./../../stylesheets/layout/footer.scss');


var Footer = React.createClass({
  render: function() {
    return (
      <footer>
        <div className="login-footer">&copy; IRDB
		</div>
      </footer>
    );
  }
});

module.exports = Footer;
