var React = require('react');
var ReactRouter = require('react-router');
var axios = require('axios');
var Link = ReactRouter.Link;
var lib = require('./../../common/lib');



var iconUrl = `${lib.assetRoot}images/all-icon.png`;


require('./../../../stylesheets/page/recipe.scss');


var Recipe = React.createClass({
	componentDidMount: function(props) {
		this.initializeInputs();
	},
	getInitialState: function () {
		return {
			selectedTab: 'desc',
			stages: [
				[{
					type: 'Prep',
					name: 'Prep Stage 1',
					show: true
				}],
				[{
					type: 'Cooking',
					name: 'Cooking'
				}],
				[{
					type: 'Plating',
					name: 'Plating'
				}]
			]
		}
	},
	initializeInputs: function() {
		var recipeMain = document.querySelector('.recipe-main');

		recipeMain.addEventListener('click', function(e) {
			var target = e.target;

			if (target.className === 'ir-input-field') {
				target.parentElement.className += ' touched';
			}
		});
	},
	tabClick: function(e) {
		var target = e.target,
			className = target.className,
			comp = this;

		if (className.indexOf('tab-pill') > -1) {
			var tabName = target.dataset.tab;

			comp.setState({
				selectedTab: tabName
			});
		}

	},
	showStage: function(stageTypeIndex, stageIndex) {
		var comp = this;
		var stages = comp.state.stages;

		stages[stageTypeIndex][stageIndex].show = !stages[stageTypeIndex][stageIndex].show;

		comp.setState({
			stages: stages
		});
	},
	render: function() {
		var comp = this,
			selectedTab = this.state.selectedTab,
			stages = this.state.stages;
		return <div className="recipe-main">
			<div className="tab-headers" onClick={this.tabClick}>
				<div className={`tab-pill ${selectedTab === 'desc'? 'selected': ''}`} data-tab="desc">
					Description
				</div>
				<div className={`tab-pill ${selectedTab === 'inst'? 'selected': ''}`} data-tab="inst">
					Instructions
				</div>
				<div className={`tab-pill ${selectedTab === 'ingr'? 'selected': ''}`}  data-tab="ingr">
					Ingredients
				</div>
				<div className={`tab-pill ${selectedTab === 'med'? 'selected': ''}`} data-tab="med">
					Media
				</div>
			</div>
			<div className="tabs">
				<div name="desc" className={`tab ${selectedTab === 'desc'? 'show': ''}`}>
					<div className="ir-input single">
						<div className="ir-label">Name</div>
						<input type="text" placeholder="Name" className="ir-input-field"/>
					</div><div className="ir-input single">
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

					<fieldset className="field-set">
					<div className="more-details">Preparation Information</div>
					<div className="ir-input single">
						<div className="ir-label">Prep Time</div>
						<input type="text" placeholder="Prep Time(min)" className="ir-input-field"/>
					</div><div className="ir-input single">
						<div className="ir-label">Cook Time</div>
						<input type="text" placeholder="Cook Time(min)" className="ir-input-field"/>
					</div><div className="ir-input single">
						<div className="ir-label">Difficulty Level</div>
						<select type="text" value="Difficulty Level" className="ir-input-field"></select>
					</div><div className="ir-input single">
						<div className="ir-label">Preparation Style</div>
						<select type="text" value="Preparation Style" className="ir-input-field"></select>
					</div>
					</fieldset>
				</div>

				<div name="inst" className={`tab ${selectedTab === 'inst'? 'show': ''}`}>
					<div className="actions-bar clearfix">
						<div className="btn"> Add Prep Stage</div>
					</div>
					<div className="stages">
						{
							stages.map(function(stageTypes, stageTypeIndex) {
								return stageTypes.map(function(stage, stageIndex) {
									var stageCls = stage.show ? 'stage-body show': 'stage-body'
									return <div className="stage">
										<div className="stage-header" onClick={comp.showStage.bind(comp, stageTypeIndex, stageIndex)}>
										{stage.name}
										</div>
										<div className={stageCls}>
											<textarea className="instructions" rows="8" 
											placeholder="Enter instructions"></textarea>
										</div>

									</div>
								})
							})
						}
						
					</div>
					
				</div>
			</div>
			<div className="actions-bar clearfix">
				<div className="btn"> Next</div>
			</div>
		</div>;
	}
});
Recipe.contextTypes = {
  router: React.PropTypes.object

};
module.exports = Recipe;