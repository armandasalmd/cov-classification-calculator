## Unofficial Coventry Classification Calculator

Enter your module grades for each year and calculate final grade on your diploma using this app here: https://cov-classification-calculator.vercel.app

**Disclaimer**
This calculator has not been officially verified as accurate against Coventry University's internal systems. However, it does follow the algorithms correctly (to the best of our knowledge).

**Inspired by**
https://github.com/matthewchivers/coventry-university-classification-calculator

## Add new course template
1. Fork git repo
2. Create `.json` file with course name in `/public/templates/{name}.json`
	> For `{template-id}.json` file structure please refer any other template
3. Update `/utils/templates.js` `templateConfig.templates` list
	```js
	{
		displayName: "{Course name}",
		description: "{Course description}",
		key: "{File name without .json}",
	}
	```
4. You now should be able to see template in menu and use it for calculation
5. Create Pull Request to production branch

## Calculation strategies
**There are 3 strategies** that are included in final grade calculation. Calculation process evaluates all of them and then takes the best score to show your final classification/grade. 

> P.S. Strategies can be configured in `/utils/templates.js` 

1. First strategy includes top 100 worth of module credits from all 3 years
	- Top *100 credits* from Year 1
	- Top *100 credits* from Year 2
	- Top *100 credits* from Year 3
2. Second strategy includes top 100 worth of module credits from year 2 and 120 credits from year 3
	- Top *100 credits* from Year 2
	- All *120 credits* from Year 3
3. Third strategy includes top 120 worth of module credits from year 2 and 100 credits from year 3
	- All *120 credits* from Year 2
	- Top *100 credits* from Year 3 **_where some modules are mandatory included (i.e. Dissertation project)_**

## Contribute to this project
If you spotted any issue, please raise it under issues tab. You can fork, and create Pull Requests if you made any improvement.

##### Run the app
1. Clone/Fork git repo
2. Terminal: `yarn install` or `yarn`
3. Terminal: `yarn dev`
4. Open [http://localhost:3000](http://localhost:3000)
5. Create PR to production branch