var React = require('react');
var ReactRouter = require('react-router');
var axios = require('axios');
var Link = ReactRouter.Link;
var lib = require('./../../common/lib');



var iconUrl = `${lib.assetRoot}images/all-icon.png`;


require('./../../../stylesheets/page/recipe.scss');


var Ingredient = React.createClass({
	componentDidMount: function(props) {
		this.initializeInputs();
	},
	getInitialState: function () {
		return {
			ingData: {
				"title": "test3",
			      "category": "test",
			      "variety": "test",
			      "cuisine": "test",
			      "allergens": "test",
			      "measure": "test",
			      "boughtform": "test",
			      "prepform": "test"
			}
		}
	},
	initializeInputs: function() {
		var recipeMain = document.querySelector('.ingredient-main');

		recipeMain.addEventListener('click', function(e) {
			var target = e.target;

			if (target.className === 'ir-input-field') {
				target.parentElement.className += ' touched';
			}
		});
	},
	createIngredient: function() {
		axios.post(`${lib.serverUrl}ingredients`, {
		  "data": {
		  		    "type": "ingredients", 
		  		    "attributes": this.state.ingData
		  		}
		});
	},
	
	render: function() {
		var comp = this,
			selectedTab = this.state.selectedTab,
			stages = this.state.stages;
		return <div className="ingredient-main recipe-main">
			
			<div className="ir-input double">
				<div className="ir-label">Name</div>
				<input type="text" placeholder="Name" className="ir-input-field" value={this.state.title}/>
			</div><div className="ir-input double">
				<div className="ir-label">Generic Name</div>
				<input type="text" placeholder="Generic Name" className="ir-input-field"/>
			</div><div className="ir-input single">
				<div className="ir-label">Cuisine</div>
				<select type="text" placeholder="Cuisine" className="ir-input-field"></select>
			</div><div className="ir-input single">
				<div className="ir-label">Course</div>
				<select type="text" placeholder="Course" className="ir-input-field"></select>
			</div><div className="ir-input double">
				<div className="ir-label">Main Ingredients</div>
				<input type="text" placeholder="Main Ingredients" className="ir-input-field"/>
			</div>

			<div className="actions-bar clearfix">
				<div className="btn" onClick={this.createIngredient}> Create</div>
			</div>
		</div>;
	}
});
Ingredient.contextTypes = {
  router: React.PropTypes.object

};
module.exports = Ingredient;