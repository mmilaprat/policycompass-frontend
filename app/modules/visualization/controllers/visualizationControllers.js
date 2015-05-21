
angular.module('pcApp.visualization.controllers.visualization', [
    'pcApp.visualization.services.visualization',
    'pcApp.references.services.reference',
    'pcApp.config'
])


.factory('GetRelatedData', ['dialogs', '$log', function(dialogs, $log) {
    return {
		
		baseGetRelatedDataController: function($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF) 
		{

			//console.log("factory baseGetRelatedDataController");
			
			$scope.getMetricData = function(posI, metricId, column, value, group) {
				//console.log("getMetricData metricId="+metricId);
				
				
				$scope.metric = Metric.get({id: metricId},
            	function(metric) {
            		//console.log("------>metric id="+metric.id);
            		//console.log("------>title="+metric.title);
            		
            		var data =  {
					id : metricId,
					title : metric.title,
					issued : metric.issued,
					};
				
            		$scope.meticsRelated.push(data);
            		
            	},
            	function(err) {
	                throw { message: JSON.stringify(err.data)};
    	        }
        		);
			}; 
			
			
			
			$scope.getHistoricalEventcData = function(eventId, colorevent) {
				//console.log("getHistoricalEventcData metricId="+eventId);
				//console.log("getHistoricalEventcData colorevent="+colorevent);
				var coloreventFinal = [];
				if (colorevent)
				{
					coloreventFinal[eventId] = colorevent;
				}
				else{
					coloreventFinal[eventId] = '#ffffff';
				}
				$scope.her = Event.get({id: eventId},
            	function(her) {
            		//console.log("------>her=");
            		//console.log(her);
            		//console.log("------>her id="+her.id);
            		//console.log("------>title="+her.title);
            		//console.log("------>color="+coloreventFinal[her.id]);
            		
            		var data =  {
					event_id : her.id,
					title : her.title,
					color: coloreventFinal[her.id],
					};
				
            		$scope.historicalEventsRelated.push(data);
            		//$scope.historicalEventsRelated[her.id]=data;
            		//console.log($scope.historicalEventsRelated);
           
            		
            	},
            	function(err) {
	                throw { message: JSON.stringify(err.data)};
    	        }
        		);
			}; 
			

			$scope.meticsRelated = [];
			$scope.historicalEventsRelated = [];
            					
							
			
   	
    	}
    	
    }
}])





.controller('controllercorrectmetriclist', [
	'$scope', 
	'$route',
	'$routeParams',	  
	'$location',
	'dialogs',
	'$log', 
	'API_CONF',
	function($scope, $route, $routeParams, $location, dialogs, $log, API_CONF) {
		
				
		if ($scope.numberrows==0)
		{
			$scope.correctmetrics = "";
		}
		else
		{
			$scope.correctmetrics = $scope.numberrows;
		}
		
		
	
}])

.controller('LoadCombosMetric', [
	'$scope', 
	'$route',
	'$routeParams',
	'$modal',  
	'Metric', 
	'$location', 
	'GetRelatedData',
	'dialogs',
	'$log', 
	'API_CONF',
	function($scope, $route, $routeParams, $modal, Metric, $location, helper, dialogs, $log, API_CONF) {


        	
		//console.log("LoadCombosMetric");
    	//helper.baseGetRelatedDataController($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF);
    	
    	$scope.loadDataCombos = function(idMetric, valueColumTemp, valueGroupTemp) {
    		//console.log("--loadDataCombos--idMetric="+idMetric+"---valueColumTemp="+valueColumTemp+"----valueGroupTemp="+valueGroupTemp+"-----");

			id = idMetric;
			$scope.metricSelectedArray[idMetric] = Metric.get({id: idMetric},
        			function(getMetric) {

//						console.log("idMetric="+idMetric);
        				$scope.correctmetrics = "1";
        				
        				//console.log("mode="+$scope.mode);
        				//console.log("------$scope.metricSelected--------");
        				var containerIndex = idMetric;
        				//console.log("id="+idMetric);
											
        				arrayExtraColumnsMetric = $scope.metricSelectedArray[idMetric].data['extra_columns'];
						
        				myText = "grouping column";
        				$arrayComboValues_yaxe = [];
						$arrayComboValues = [];

						//$arrayValores = {'id':'Value', 'title':'Value'};						
						//$arrayComboValues_yaxe.push($arrayValores);
						
						var posValue=-1;
						var posGroup=-1;
						for (x=0;x<arrayExtraColumnsMetric.length; x++) {
							//console.log("x="+arrayExtraColumnsMetric[x]);
							
							$arrayValores = {'id':arrayExtraColumnsMetric[x], 'title':arrayExtraColumnsMetric[x]};
							
							$arrayComboValues_yaxe.push($arrayValores);
							$arrayComboValues.push($arrayValores);
							//console.log("valueColumTemp="+valueColumTemp+"---arrayExtraColumnsMetric["+x+"]="+arrayExtraColumnsMetric[x]);
							//console.log(valueColumTemp);
							//console.log(valueGroupTemp);
							if (valueColumTemp==arrayExtraColumnsMetric[x])
							{
								//posValue = x+1;								
								posValue = x;
							}
							if (valueGroupTemp==arrayExtraColumnsMetric[x])
							{
								posGroup = x;
							}
							
						}
    					//console.log("posValue="+posValue);
    					//console.log("posGroup="+posGroup);
    					
    					//console.log($scope.metricSelectedArray[idMetric].data['table']);
    					
    					arrayIndividualListDataset = $scope.metricSelectedArray[idMetric].data['table'];
    					
    					//console.log("idMetric="+idMetric);
    					
    					if (idMetric==8)
    					{
    						arrayIndividualListDataset = [{"individual": {"id": 1,"title": "Spain"},"row": 1,"values": {"2000": 10,"2001": -20,"2002": 30,"2003": 40}},{"individual": {"id": 2,"title": "Germany"},"row": 2,"values": {"2000": -20,"2001": 30,"2002": 40,"2003": 50}}];
    					}
    					else if (idMetric==29)
    					{
    						arrayIndividualListDataset = [{"individual": {"id": 2,"title": "Germany"},"row": 1,"values": {"2002": 110.1,"2003": 220.2,"2004": 330.3,"2005": 440.4,"2006": 550.5,"2007": 660.6}},{"individual": {"id": 3,"title": "Portugal"},"row": 2,"values": {"2002": 440.4,"2003": 550.5,"2004": 660.6,"2005": 440.4,"2006": 760.4,"2007": 230.2}}];               
    					}
    					else if (idMetric==44)
    					{
    						arrayIndividualListDataset = [{"individual": {"id": 4,"title": "France"},"row": 1,"values": {"2002": 65.8,"2003": 345.2,"2004": 125.3,"2005": 4324.3}},{"individual": {"id": 5,"title": "Italy"},"row": 2,"values": {"2002": 44,"2003": 35.3,"2004": 24.2,"2005": 99.9}}];
    					}
    					else if (idMetric==15)
    					{
    						arrayIndividualListDataset = [{"individual": {"id": 2,"title": "Germany"},"row": 1,"values": {"2004": 33.3,"2005": 44.4,"2006": 55.5,"2007": 66.6}},{"individual": {"id": 3,"title": "Portugal"},"row": 2,"values": {"2004": 66.6,"2005": 44.4,"2006": 76.4,"2007": 23.2}}];
    					}
    					else
    					{
    						arrayIndividualListDataset = [{"individual": {"id": 1,"title": "Spain"},"row": 1,"values": {"2000": 2232.3,"2001": 4324.3}},{"individual": {"id": 2,"title": "Germany"},"row": 2,"values": {"2000": 3543.6,"2001": 3324.3}}];    						
    					}

            
           				//console.log(arrayIndividualListDataset);
    					$arrayComboValues_Individuals = [];    
    					$arrayComboValuesChecked = [];
    					for (x=0;x<arrayIndividualListDataset.length; x++) {
    						//console.log("x="+x);
    						if (arrayIndividualListDataset[x].individual)
    						{
	    						$arrayValores = arrayIndividualListDataset[x].individual;
	    						$arrayComboValues_Individuals.push($arrayValores);
	    						
	    						//console.log($arrayValores['id']);
	    						$arrayComboValuesChecked.push($arrayValores['id']);
	    						    							
    						}
    					}
    									
    					$scope.individualCombo_value_[containerIndex]=$arrayComboValues_Individuals;
    					$scope.IndividualDatasetCheckboxes_[containerIndex]=$arrayComboValuesChecked;
    					
    					//console.log("......................");
    					//$scope.IndividualSelectorLabelColumn_[containerIndex]=$arrayComboValues_Individuals;
    					
    					/*
    					$arrayComboValues_Units = [];
    					$arrayComboValues_Units[0]={'id':1, 'title':'Kg'};
    					$arrayComboValues_Units[1]={'id':2, 'title':'Gr'};
    					$scope.unitsCombo_value_[containerIndex]=$arrayComboValues_Units;
    					*/    					
    					
    					$scope.optionsCombo_value_[containerIndex]=$arrayComboValues_yaxe;    					
    					$scope.optionsCombo_[containerIndex]=$arrayComboValues;
    					
    					
    					
    					//console.log("optionsCombo_value_["+containerIndex+"]");
    					//console.log($scope.optionsCombo_value_[containerIndex]);
    					
    					//console.log("optionsCombo_["+containerIndex+"]");
    					//console.log($scope.optionsCombo_[containerIndex]);
    					
    					if (posValue>=0)
    					{
    						$scope.MetricSelectorDataColumn_[containerIndex] = $scope.optionsCombo_value_[containerIndex][posValue];	
    					}

   						if (posGroup>0)
   						{
   							$scope.MetricSelectorGroupingData_[containerIndex] = $scope.optionsCombo_[containerIndex][posGroup];
   						}
						
        			},
        			function(error) {
            		//alert(error.data.message);
            		throw { message: JSON.stringify(error.data.message)};
        			}
    			);   
    	};
    	
    	//console.log($scope.metric.id);
    	
    	//console.log($scope.MetricSelectorLabelColumn_[$scope.metric.id]);
    	var myText = "from";
    	if ($scope.MetricSelectorLabelColumn_[$scope.metric.id])
    	{
    		myText = $scope.MetricSelectorLabelColumn_[$scope.metric.id];
    	}
    	//console.log($scope.MetricSelectorLabelColumn_.length);
    	
		$scope.MetricSelectorLabelColumn_[$scope.metric.id]=myText;
		
		if ($scope.mode=='edit')
		{
			var id = $scope.metric.id;
			
			var myindex=0;
			var maxsize = $scope.visualization.metrics_in_visualization.length;
			
			for (xi=0;xi<maxsize;xi++)
			{
				if ($scope.visualization.metrics_in_visualization[xi].metric_id==$scope.metric.id)
				{
					myindex=xi;
				}
			}
			

			//console.log($scope.visualization.metrics_in_visualization[myindex].visualization_query);
			configurationMetricsFilters = $scope.visualization.metrics_in_visualization[myindex].visualization_query;
			
    		//console.log(configurationMetricsFilters)
    		var arrayConfigMetricsFilters = configurationMetricsFilters.split(",");
			
			var valueColumTemp = "";
    			var valueGroupTemp = "";
    			$scope.IndividualSelectorLabelColumn_[id] = [];
    			$scope.IndividualDatasetCheckboxes_[id] = [];
    			//console.log("def, dataset_color_palete_");
    			//$scope.dataset_color_palete_[id] = [];
    			
	    		for (x=0;x<arrayConfigMetricsFilters.length;x++)
	    		{
	    			//console.log("x="+x);
	    			var dataFilter = arrayConfigMetricsFilters[x].split(":");
	    			//console.log("dataFilter[0]="+dataFilter[0])
	    			//console.log("dataFilter[1]="+dataFilter[1])

					
					
	    			if (dataFilter[0]=='Label')
	    			{
	    				$scope.MetricSelectorLabelColumn_[id] = dataFilter[1];
	    			}
	    			
	    			else if (dataFilter[0]=='Column')
	    			{
	    				$scope.MetricSelectorDataColumn_[id] = dataFilter[1];	    				
	    				valueColumTemp = dataFilter[1];
	    				
	    			}
	    			else if (dataFilter[0]=='Grouping')
	    			{
	    				//console.log(dataFilter[1]);
	    				if (dataFilter[1]!="undefined")
	    				{
	    					$scope.MetricSelectorGroupingData_[id] = dataFilter[1];
	    					valueGroupTemp = dataFilter[1];	
	    				}
	    				else
	    				{
	    					$scope.MetricSelectorGroupingData_[id] = "";
	    					valueGroupTemp = "";
	    				}
	    				
	    			}
	    			else if (dataFilter[0]=='Individual')
	    			{
//	    				console.log(dataFilter[1]);
	    				var lisIndividuals = dataFilter[1].split(";");
	    			//	console.log(lisIndividuals);
	    				if (lisIndividuals)
	    				{
		    				for (xi=0;xi<lisIndividuals.length;xi++)
		    				{
		    					//console.log("a1 xi="+xi);
		    					varTmp = {'id': parseInt(lisIndividuals[xi]), 'title': ''};
		    					$scope.IndividualSelectorLabelColumn_[id].push(varTmp);
		    					
		    					//varTmp = {'id': parseInt(lisIndividuals[xi])};
		    					varTmp = parseInt(lisIndividuals[xi]);
		    					$scope.IndividualDatasetCheckboxes_[id].push(varTmp);
		    					//$scope.IndividualDatasetCheckboxes_[id]=$scope.IndividualSelectorLabelColumn_[id][0];
		    				}
	    				}
	    			}
	    			
	    			
	    			
	    		}			
			//console.log("a1");
			$scope.loadDataCombos($scope.metric.id, valueColumTemp, valueGroupTemp);
		}
		else
		{
			//console.log("a2");
			$scope.loadDataCombos($scope.metric.id, "", "");	
		}
    	
    	
    

}])


////////////
.factory('VisualizationsControllerHelper', ['$filter', 'dialogs', '$log', function($filter, dialogs, $log) {
    return {
    	
    	baseVisualizationsCreateController: function($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF) {


		$scope.colorScale = d3.scale.category20();
		//console.log($scope.colorScale);
					
		$scope.rangeDatesSliderMin = 0;
		$scope.rangeDatesSliderMax = 0;
		
		$scope.translateCountryDataValue = function(value)
		{
			//console.log("translateCountryDataValue - value="+value);
  			
  			var returnValue = 0;

			var arrayLabelsDataPie = [];
			var arrayValuesDataPie = [];
			var arrayUnitsDataPie = [];
			
			if (($scope.numbers2) && (parseInt(value)>=0))
			{   
				//console.log(value);		
				returnValue = $scope.numbers2[value]['Key'];
				//console.log("$scope.rangeDatesSliderMin="+$scope.rangeDatesSliderMin);
    			//console.log("$scope.rangeDatesSliderMax="+$scope.rangeDatesSliderMax);
    			var icnt = $scope.rangeDatesSliderMin;	
    			var maxRange = $scope.rangeDatesSliderMax;
    			var Key = "";
			}
			else
			{
				returnValue = value;	
			}
    		//$scope.plotMapChart();
			return returnValue;			
		}
		
		$scope.translateCountryValue = function(value)
		{
			//console.log("translateCountryValue - value="+value);
			return $scope.translateCountryDataValue(value);
		}

		$scope.translateCountrySlider = function(value)
  		{
  			if (value!=0)
  			{
//  				console.log("translateCountrySlider - value="+value);

				if ( ($scope.typeToPlot==='map_1') 
								|| ($scope.typeToPlot==='mercator') 
								|| ($scope.typeToPlot==='conicConformal')
								|| ($scope.typeToPlot==='equirectangular')
								|| ($scope.typeToPlot==='orthographic')
								|| ($scope.typeToPlot==='azimuthalEqualArea')
								)
				{
					//console.log(value+"----"+$scope.rangeDatesSliderMin);
					//console.log("before plotMapChart");
					if ($scope.rangeDatesSliderMin==value)
					{
						if (($scope.mode=='create') || ($scope.mode=='edit'))
						{
							$scope.plotMapChart();
						}
						
					}
  					//$scope.plotMapChart();
  				}	
  			}
			return $scope.translateCountryDataValue(value);
  		}
  				


		$scope.translatePieValue = function(value)
  		{  			
  			//console.log("translate - value="+value);  			
  			var returnValue = 0;
			if (($scope.numbers2) && (parseInt(value)>=0))
			{   
				returnValue = $scope.numbers2[value]['Key'];
			}
			else
			{
				returnValue = value;	
			}
			return returnValue;
  		}
  				
		//$scope.numbermaxSlider = 1;
		$scope.translate = function(value)
  		{  			
  			//console.log("translate - value="+value);
  			
  			var returnValue = 0;
			returnValue = $scope.translatePieValue(value);
			var arrayLabelsDataPie = [];
			var arrayValuesDataPie = [];
			var arrayUnitsDataPie = [];
			var plotChart = false;
			
			if (($scope.numbers2) && (parseInt(value)>=0))
			{   
				plotChart = true;	
				//console.log(value);		
				returnValue = $scope.numbers2[value]['Key'];
					
				//console.log("$scope.rangeDatesSliderMin="+$scope.rangeDatesSliderMin);
    			//console.log("$scope.rangeDatesSliderMax="+$scope.rangeDatesSliderMax);
    			var icnt = $scope.rangeDatesSliderMin;	
    			var maxRange = $scope.rangeDatesSliderMax;
    			var Key = "";
    			
    			//console.log("value="+value+"--icnt="+icnt+"---maxRange="+maxRange);
    			
    			//while (icnt<=$scope.rangeDatesSliderMax)
    			//while (icnt<=maxRange)
    			icnt = value;
    			if (1==1)
    			{

    				//console.log("********value="+value);
    				//console.log("icnt="+icnt);
    				//console.log("maxRange="+maxRange);
    			
    				//console.log("Key="+Key);
    				if (Key)
    				{
    					Key = Key + " and ";	
    				}
    				
    				//console.log("icnt="+icnt);
    				if (!icnt)
    				{
    					icnt=0;
    				}
    				Key = Key + $scope.numbers2[icnt]['Key'];
    				//console.log("Key="+Key);
    				
    				l = icnt;
    				for (var label in $scope.numbers2[l].Labels) 
					{
						//console.log($scope.numbers2[l].Labels[label]);
						var labelName = $scope.numbers2[l].Labels[label];
						var valueName = $scope.numbers2[l].Values[label];
						var unitsName = $scope.numbers2[l].Units[label];
						var a = arrayLabelsDataPie.indexOf(labelName);
										
						if (a>=0)
						{
							arrayValuesDataPie[a]=parseInt(arrayValuesDataPie[a])+parseInt(valueName);						
							var b = arrayUnitsDataPie.indexOf(unitsName);
							if (b>=0)
							{
								
							}
							else
							{
								arrayUnitsDataPie.push(unitsName);
							}
						}
						else
						{
							arrayLabelsDataPie.push(labelName);
							arrayValuesDataPie.push(valueName);
							arrayUnitsDataPie.push(unitsName);
						}
					}
    				
    				icnt = icnt +1;
    				//console.log("icnt="+icnt);
    			}	
    			
	
			}
			else
			{
				returnValue = value;	
			}
    		
    		if (plotChart)
    		{
    			$scope.change_slider_value = value;
    			//$scope.change_slider_function(value);
    		}

    		if (plotChart)
    		{
	    		//console.log("------------Key="+Key);
	
	
				var ObjectData = {
						'Key': Key, 
						'Labels': arrayLabelsDataPie,
						'Values': arrayValuesDataPie,
						'Units': arrayUnitsDataPie
				};	
					
				//console.log(ObjectData);
					
				$scope.dataset = [];
					
				$scope.dataset.push(ObjectData);
					
				if (($scope.mode=='create') || ($scope.mode=='edit'))
				{
					$scope.plotPieChart();
				}
				
				$scope.change_slider_value = value;  			
    		}



    			
    		
			return returnValue;
  		}
    
			
			$scope.resolutionoptions = [
    			{ label: 'Day', value: 'day' },
    			{ label: 'Month', value: 'month' },
    			{ label: 'Year', value: 'year' }
  			];
  			
  			$scope.arrayResolutions = [];
  			
  			$scope.arrayResolutions['day'] = [
    			{ label: 'Day', value: 'day' },
    			{ label: 'Month', value: 'month' },
    			{ label: 'Year', value: 'year' }
  			];
  			
  			$scope.arrayResolutions['month'] = [
    			{ label: 'Month', value: 'month' },
    			{ label: 'Year', value: 'year' }
  			];
  			
  			$scope.arrayResolutions['year'] = [
    			{ label: 'Year', value: 'year' }
  			];
  			  			
  			  			
  			  			
			$scope.resolution = $scope.resolutionoptions[$scope.resolutionoptions.length-1];
			
			$scope.FilterResolution = $scope.arrayResolutions['year'];
			
			//console.log($scope.resolution);
			
			$scope.checkAll = function () {
				
				
				if ($scope.mode=='view')
				{
	        		if ($scope.selectedAll) {            		
	            		selectionChecked = false;
	        		} else {
	        			selectionChecked = true;            		
	        		}					
				}
				else
				{
	        		if ($scope.selectedAll) {            		
	            		selectionChecked = true;
	        		} else {
	        			selectionChecked = false;            		
	        		}					
				}
        		$scope.selectedAll = selectionChecked;
        		
        		angular.forEach($scope.numbers2, function (item) {
        			//console.log(item.Key);
        			//console.log($scope.selection.Keys[item.Key]);
            		$scope.selection.Keys[item.Key] = selectionChecked;
            		
            		//console.log($scope.selection.Keys[item.Key]);
        		});
			};
    
    
    		$scope.plotMapChart = function() {

    			//console.log("---plotMapChart---");
    					
						if (document.getElementById("container_graph_"+$scope.visualization.id) !=null)
						{
							document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";	
						} 
						else
						{	
							document.getElementById("container_graph_").innerHTML = "";
						}
						
						var margin = {top: 20, right: 20, bottom: 55, left: 44},
						width = 980,
						height = 326,
						font_size = 11;
						
						var from_country = '';
						var to_country = '';

							
						if ($scope.list)
						{
								margin.top = margin.top / 5;
								margin.right = margin.right / 5;
								margin.bottom = margin.bottom / 5;
								margin.left = margin.left / 5;
								width = width / 5;
								height = height / 5;
								font_size = font_size / 5;
								$scope.showLegend = false;	
								$scope.showZoom = false;
								$scope.showMovement = false;					
						}
						else
						{
							from_country = $scope.translateCountryValue($scope.rangeDatesSliderMin);
							//to_country = $scope.translateCountryValue($scope.rangeDatesSliderMax);
							to_country = $scope.translateCountryValue($scope.rangeDatesSliderMin);
						}
						//console.log("-----------------------------");
						//console.log($scope.rangeDatesSliderMin);						
						//console.log($scope.translateCountryValue($scope.rangeDatesSliderMin));
						//console.log("-----------------------------");
						//var mapObj = policycompass.viz.mapW(
						var mapObj = policycompass.viz.mapW_datamaps(
						{
							'idName':"container_graph_"+$scope.visualization.id,
							'width': width,
							'height': height,
							'margin': margin,
							'font_size': font_size,
							'legend': $scope.showLegend,
							'projection': $scope.typeToPlot,
							'showZoom': $scope.showZoom,
							'showMovement': $scope.showMovement,
							'data': $scope.datasetToSendMap,
							'from_country': from_country,
							'to_country': to_country	
												
						});    			
    			
    		}
    
    
			$scope.plotPieChart = function () {
				if ($scope.typeToPlot==='graph_pie')
				{
//				console.log("$scope.plotPieChart");
				//var width = 600,
				var margin = {top: 20, right: 20, bottom: 40, left: 20};
				
				var width = 980,
				height = 326,
				//radius = Math.min(width, height) / 2;
				radius = 180,
				
				innerRadious = 50,
				font_size = 11;
				
				var cntPies = 0;
				
				if ($scope.list)
				{
						radius = radius / 5;
						width = width / 5;
						height = height / 5;
						margin.top = margin.top / 5;
						margin.right = margin.right / 5;
						margin.bottom = margin.bottom / 5 + 3;
						margin.left = margin.left / 5;
						innerRadious = innerRadious / 5;
						font_size = font_size / 5;
						$scope.showLegend = false;						
				}
				
//				console.log($scope.dataset);
				//document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";
				
				if (($scope.mode=='create') || ($scope.mode=='edit'))
				{
					if ($scope.visualization.id)
					{
						document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";
						//document.getElementById("container_graph_edit").innerHTML = "";
					}
					else
					{
						document.getElementById("container_graph_").innerHTML = "";
					}
				}
				

				

					$scope.dataset.forEach(function(d,i) {
						//console.log("1er foreach i="+i);
						if (i==0)
						{
							$style='';
						}
						else
						{
							$style='style="display: none;"';
						}

				
						if (($scope.mode=='create') || ($scope.mode=='edit'))
						{
							if (document.getElementById("container_graph_"+$scope.visualization.id) !=null)
							{
								document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = document.getElementById("container_graph_"+$scope.visualization.id).innerHTML + "<div class='pie_"+$scope.visualization.id+"' id='pie_"+$scope.visualization.id+"_"+i+"' "+$style+"></div>"	
							} 
							else
							{	
								document.getElementById("container_graph_").innerHTML = document.getElementById("container_graph_").innerHTML + "<div class='pie_' id='pie__"+i+"' "+$style+"></div>"
							}
						}
				
					});
				
				
				$scope.dataset.forEach(function(d,i) {
					//console.log("2n foreach i="+i);
					
					//datasetToSend = d.values;
					//if (cntPies>0)
					if (1==1)					
					{
						var datasetToSend = d;
						//console.log(labelYAxe);
						
						//console.log($scope.visualization.id);
						if (($scope.mode=='create') || ($scope.mode=='edit'))
						{
							var pieObj = policycompass.viz.pie(
							{
							'idName':"pie_"+$scope.visualization.id+"_"+i,
							'visualizationid':$scope.visualization,
							'idPie': cntPies,
							'width': width,
							'height':height,
							'margin': margin,
							'radius':radius,
							'innerRadious': innerRadious,
							'font_size': font_size,
							'showLegend': $scope.showLegend,
							'showLines': $scope.showLines,
							'showAreas': $scope.showAreas,							
							'showPoints': $scope.showPoints,
							'showLabels': $scope.showLabels,
							'showGrid': $scope.showGrid
							});
		
			        	pieObj.render(datasetToSend);
						}
						
			        	
					}
					
					cntPies = cntPies +1;
	
				});
				
				}
			}
			
			$scope.angularpiechartdisplaybycheckbox  = function() {
				
				//console.log($scope.selection);
				//console.log("numbers2");
				//console.log($scope.numbers2);
				
				var arrayTemp = [];
				var arrayLabelsDataPie = [];
				var arrayValuesDataPie = [];
				var arrayUnitsDataPie = [];
				var position = ""
				//$scope.selection.forEach(function(d,i) {
				for (var k in $scope.selection.Keys) {
					//console.log($scope.selection.Keys[k]);
					//$scope.selection[k]=true;
					console.log("k="+k);
					console.log("$scope.selection.Keys[k]="+$scope.selection.Keys[k]);
					if ($scope.selection.Keys[k])
					{
						for (var l in $scope.numbers2) {	
							console.log("l="+l);
							if (k==$scope.numbers2[l].Key)
							{
								if (position=="")
								{
									position = k;
								}
								else
								{
									position = position +" and "+ k;	
								}
								
								//console.log("--->"+$scope.numbers2[l].Key);
								//console.log($scope.numbers2[l]);
									
								for (var label in $scope.numbers2[l].Labels) {
									//console.log($scope.numbers2[l].Labels[label]);
									var labelName = $scope.numbers2[l].Labels[label];
									var valueName = $scope.numbers2[l].Values[label];
									var unitsName = $scope.numbers2[l].Units[label];
									var a = arrayLabelsDataPie.indexOf(labelName);
									
									if (a>=0)
									{
										arrayValuesDataPie[a]=parseInt(arrayValuesDataPie[a])+parseInt(valueName);
										
										var b = arrayUnitsDataPie.indexOf(unitsName);
										if (b>=0)
										{
											
										}
										else
										{
											arrayUnitsDataPie.push(unitsName);
										}
									}
									else
									{
										arrayLabelsDataPie.push(labelName);
										arrayValuesDataPie.push(valueName);
										arrayUnitsDataPie.push(unitsName);
									}
								}
								
							}
						}
					}
					//console.log("arrayLabelsDataPie");
					//console.log(arrayLabelsDataPie);
					//console.log("arrayValuesDataPie");
					//console.log(arrayValuesDataPie);
					//console.log("arrayUnitsDataPie");
					//console.log(arrayUnitsDataPie);
					
				};
				var ObjectData = {
					'Key':position, 
					'Labels': arrayLabelsDataPie,
					'Values': arrayValuesDataPie,
					'Units': arrayUnitsDataPie
				};	
				
				console.log(ObjectData);
				
				$scope.dataset = [];
				
				$scope.dataset.push(ObjectData);
				
				if (($scope.mode=='create') || ($scope.mode=='edit'))
				{
					$scope.plotPieChart();	
				}
				
				
				
				//console.log("dataset");
				//console.log($scope.dataset);
				
				
				
			};
			
			$scope.angularpiechartdisplay  = function() {
				var selectedValue = "";
				
				//alert($('#dateselector option:selected').val());
				selectedValue = $('#dateselector option:selected').val();

				if (isNaN(selectedValue))
				{
					$('.pie').show();
				}
				else
				{
					$('.pie').hide();	
					$('#pie_'+selectedValue).show();		
				}
				
			};


			$scope.meticsRelated = [];
			
            					
			$scope.getMetricData = function(posI, metricId, column, value, group) {
				//console.log("getMetricData metricId="+metricId);
				
				
				$scope.metric = Metric.get({id: metricId},
            	function(metric) {
            		//console.log("------>metric id="+metric.id);
            		//console.log("------>title="+metric.title);
            		
            		
            		var data =  {
					id : metric.id,
					title : metric.title,
					issued : metric.issued,
					};
				
            		$scope.meticsRelated.push(data);
            		console.log($scope.meticsRelated);
           
            		
            	},
            	function(err) {
	                throw { message: JSON.stringify(err.data)};
    	        }
        		);
			}; 
			
		// Variable for storing the metrics filtered list
       
			tooltip =  d3.select("body").append("div")
    		.attr("id","tooltip")
    		.html("")
    		.attr("class", "tooltip")
    		.style("opacity", 0);

			tooltipLegend =  d3.select("body").append("div")
    		.attr("id","tooltipLegend")
    		.html("")
    		.attr("class", "tooltipLegend")
    		.style("opacity", 0);
    	
    		var openedLabels = 0;
 		
			mousemove = function() 
			{
					//console.log(d3.event.pageX);
				tooltip
					.style("left", (d3.event.pageX +20) + "px")
					.style("top", (d3.event.pageY - 12) + "px");
										
			};     

		
			$scope.metricSelectedArray = [];
		
			$scope.loadDataCombos = function(idMetric, valueColumTemp, valueGroupTemp) {
    		//console.log("--loadDataCombos--idMetric="+idMetric+"---valueColumTemp="+valueColumTemp+"----valueGroupTemp="+valueGroupTemp+"-----");
			id = idMetric;
			//$scope.metricSelectedArray[idMetric] = []; 
			var tmp = Metric.get({id: idMetric},
        			function(getMetric) {
        				
        				//console.log("mode="+$scope.mode);
        				//console.log("------$scope.metricSelected--------");
        				var containerIndex = idMetric;
        				//console.log("id="+idMetric);
						
						//console.log(tmp.data['extra_columns']);
						//console.log($scope.metricSelectedArray[idMetric]);
						
						$scope.metricSelectedArray[idMetric]=tmp;
						
        				arrayExtraColumnsMetric = $scope.metricSelectedArray[idMetric].data['extra_columns'];
						//arrayExtraColumnsMetric = tmp.data['extra_columns'];
        				
        				myText = "grouping column";
        				$arrayComboValues_yaxe = [];
						$arrayComboValues = [];

						//$arrayValores = {'id':'Value', 'title':'Value'};						
						//$arrayComboValues_yaxe.push($arrayValores);
						
						var posValue=-1;
						var posGroup=-1;
						for (x=0;x<arrayExtraColumnsMetric.length; x++) {
							//console.log("x="+arrayExtraColumnsMetric[x]);
							
							$arrayValores = {'id':arrayExtraColumnsMetric[x], 'title':arrayExtraColumnsMetric[x]};
							

							$arrayComboValues_yaxe.push($arrayValores);
							$arrayComboValues.push($arrayValores);
							//console.log("valueColumTemp="+valueColumTemp+"---arrayExtraColumnsMetric["+x+"]="+arrayExtraColumnsMetric[x]);
							
							if (valueColumTemp==arrayExtraColumnsMetric[x])
							{
								//posValue = x+1;								
								posValue = x;
							}
							if (valueGroupTemp==arrayExtraColumnsMetric[x])
							{
								posGroup = x;
							}
							
						}
    					//console.log("posValue="+posValue);
    					//console.log("posGroup="+posGroup);
    					
    					$scope.unitsCombo_value_[containerIndex]=$arrayComboValues_yaxe;
    					$scope.individualCombo_value_[containerIndex]=$arrayComboValues_yaxe;
    					
    					
    					$scope.optionsCombo_value_[containerIndex]=$arrayComboValues_yaxe;    					
    					$scope.optionsCombo_[containerIndex]=$arrayComboValues;
    					
    					//console.log("optionsCombo_value_["+containerIndex+"]");
    					//console.log($scope.optionsCombo_value_[containerIndex]);
    					
    					//console.log("optionsCombo_["+containerIndex+"]");
    					//console.log($scope.optionsCombo_[containerIndex]);
    					
    					if (posValue>=0)
    					{
    						$scope.MetricSelectorDataColumn_[containerIndex] = $scope.optionsCombo_value_[containerIndex][posValue];	
    					}

   						if (posGroup>0)
   						{
   							$scope.MetricSelectorGroupingData_[containerIndex] = $scope.optionsCombo_[containerIndex][posGroup];
   						}
						
        			},
        			function(error) {
            		//alert(error.data.message);
            		throw { message: JSON.stringify(error.data.message)};
        			}
    			);   
    	};


		//funtion to reset the form, used into the Revert button
		$scope.revertVisualization = function(idMetric, metrictitle) {
        	// Open a confirmation dialog
        	var dlg = dialogs.confirm(
            	"Are you sure?",
            	"Do you want to revert this visualization?");
        	dlg.result.then(function () {

				if ($scope.mode=='create')
				{
					$route.reload();
				}
				else{
					$location.path($scope.resetlocation);
				}
					            
        	});
    	};
        	

		//function to select the Map or graph button   
		$scope.selectTabParent = function(setTab) {
			$scope.tabParent = setTab;
			$scope.tabSon = 0;
		};
			
		//funtion used to check if a button is checked (butotns Map or graph)
		$scope.isSelectedParent = function(checkTab) {
			return $scope.tabParent === checkTab;
		};
			
		//function to select the type of graph (line, pie, chart) button 
		$scope.selectTabSon = function(setTab) {	
			$scope.typeToPlot=setTab;
			$scope.tabSon = setTab;
			//rePlotGraph();
		};

		//funtion to check if a type of graph is selected (line, pie, chart buttons)
		$scope.isSelectedSon = function(checkTab) {
			return $scope.tabSon === checkTab;			
		};
			
		//funtion used into the button "Add metric" (diply list of metrics availables
		$scope.addMetrictoList= function() {				
			$('#addmetricsbutton').toggleClass('active');
			//$('#filterMetrics').toggle('slow');
			
			$('#filterDatasets').toggle('slow');
			
        	$('#metrics-list').toggle('slow');	
        	$('#filterMetricsPaginationHeader').toggle('slow');
        	$('#filterMetricsPagination').toggle('slow');
		};

		//funtion used when a metic is selected. Add a metric into the list	
		$scope.addFilterMetric = function(idMetric, title, issued) {
			//console.log("---addFilterMetric--")
			//console.log("idMetric="+idMetric);
			//console.log("title="+title);
			//console.log("issued="+issued);
			
			var containerLink = document.getElementById("metric-list-item-item-"+idMetric);		
    		$(containerLink).addClass('active');
    		var str =  $(containerLink).attr("name");
    		$('#' + str + '').addClass('active');	
    		//var containerId = document.getElementById("MetricSelectediId_"+idMetric).value;	
    		//var containerIndex = document.getElementById("MetricSelectediIndex_"+idMetric).value;
			var containerId = idMetric;
			var containerIndex = idMetric;
				
			$scope.MetricSelectediId_[idMetric]=idMetric;
			$scope.MetricSelectediIndex_[idMetric]=idMetric;
							
			var myText = "from";
			$scope.MetricSelectorLabelColumn_[containerIndex]=myText;
				
			$scope.loadDataCombos(idMetric, "", "");
						
			selectedText = "---";
			var myObject = {
				'id':idMetric,
				'name':selectedText,
				'title':title,
				'issued': issued,
				'column':'from',
				'value':'value',
				'group':'grouping column'
			};
					
			$scope.ListMetricsFilter.push(myObject);	
				
			$scope.correctmetrics = 1;
						
			$scope.rePlotGraph();
		};

		//function used to display contetn of a metric
		$scope.displaycontentMetric = function(idMetric) {
			var containerLink = document.getElementById("edit-metric-button-"+idMetric);
			$(containerLink).parent().next().toggle(200);	 
		};


    	// Function for delete a metric from the list od metrics to plot
    	$scope.deleteMetricFromList = function(idMetric, metrictitle, metriclistIn, indexIn) {
        	// Open a confirmation dialog
        	var dlg = dialogs.confirm(
            	"Are you sure?",
            	"Do you want to delete '"+metrictitle+"' from the list of datasets?");
        	dlg.result.then(function () {
        		
        		//console.log(metriclistIn);
        		//console.log("indexIn="+indexIn);
        		metriclistIn.splice(indexIn, 1);
        		
        		//console.log(metriclistIn.length);
        		if (metriclistIn.length==0)
        		{
        			$scope.correctmetrics = "";
        		}
        		
					$scope.rePlotGraph();
					            
        	});
    	};	

		//funtion to delete an historical event of the array
   		$scope.deleteContainerHistoricalEvent = function(divNameIn, index, historicaleventtitle) {
       		// Open a confirmation dialog
       		var dlg = dialogs.confirm(
	           	"Are you sure?",
            	"Do you want to delete the event '"+historicaleventtitle+"' from the list of events to plot in this visualization?");
        		dlg.result.then(function () {

					$scope.idHE.splice((index), 1);
					$scope.eventsToPlot.splice((index-1), 1);
					$scope.rePlotGraph();
					            
        		});
    	};	
		
		$scope.name = 'Link an event';
      
   		$scope.showModal = function() {        
			//console.log("show modal");
			      
	   		var s= document.getElementById("startDatePosX");
	   		var e= document.getElementById("endDatePosX");
	   		
	   		//console.log("s.value="+s.value);        
	   		dateRec = s.value;
	   		dateRecEnd = e.value;
			//console.log("dateRec="+dateRec+"--now="+Date.now());
			if (dateRec)
			{
				//dateRec = '2014-01-01';
				//console.log("dateRec="+dateRec);
				dateRec = dateRec.replace(/-/g,"/");
				var res = dateRec.split("/");
				var newDate = res[2]+"-"+res[0]+"-"+res[1];
				//console.log("newDate="+newDate);
				$scope.startDate = (newDate);
			}
			else
			{
				//$scope.startDate = $filter("date")(Date.now(), 'yyyy-MM-dd');	
				$scope.startDate = "";
			}

			if (dateRecEnd)
			{
				//dateRec = '2014-01-01';
				//console.log("dateRec="+dateRec);
				dateRecEnd = dateRecEnd.replace(/-/g,"/");
				var res = dateRecEnd.split("/");
				var newDate = res[2]+"-"+res[0]+"-"+res[1];
				//console.log("newDate="+newDate);
				$scope.endDate = (newDate);
			}
			else
			{
				//$scope.startDate = $filter("date")(Date.now(), 'yyyy-MM-dd');	
				$scope.endDate = "";
			}
			
			//console.log("$scope.endDate="+$scope.endDate);
			
			var arrayIdsMetricsSelected = [];
			
			for (var i=0; i < $scope.ListMetricsFilter.length; i++) 
			{			
				arrayIdsMetricsSelected[i]=$scope.ListMetricsFilter[i].id;
			};
			
			
			//$scope.startDate = '01-01-2011';
			//$scope.startDate = s.value;
			//$scope.startDateToFilter = '2014-09-17';
			//$scope.startDateToFilter = $scope.startDate ;
			//$scope.startDateToFilter = "Mon Sep 15 2014 00:00:00 GMT+0200 (Romance Daylight Time)";
					
	        $scope.opts = {
				backdrop: true,
				backdropClick: false,
				dialogFade: true,
				keyboard: true,        
				templateUrl : 'modules/visualization/partials/addEvent.html',
		        controller : 'ModalInstanceCtrl',
				resolve: {}, // empty storage
				scope: $scope
	  		};
	
	        $scope.opts.resolve.item = function() {
	    		return angular.copy({name:$scope.name, startDate:$scope.startDate, endDate:$scope.endDate, metricsArray: arrayIdsMetricsSelected}); // pass name to Dialog
			}
	        
	  		var modalInstance = $modal.open($scope.opts);
	  
	  		modalInstance.result.then(function(){
	        	//on ok button press
	        	//console.log('on ok button press');
		    	//console.log($scope.eventsToPlot);
	    		//console.log(modalInstance);
	  			},function(){
	    		//on cancel button press
	    		//console.log("Modal Closed");
	  			});
		};  
      

		//funtion used in the select field. Onchenge value
		$scope.changeselectHE = function(idselected) 
		{
			//console.log("Factory. Id="+idselected);				
			$scope.historicalevent_id = idselected['id'];
			$scope.historicalevent_title = idselected['title'];
			$scope.historicalevent_startDate = idselected['startEventDate'];
			$scope.historicalevent_endDate = idselected['endEventDate'];
			$scope.historicalevent_description = idselected['description'];				
		};

		$scope.collapseFilter = function()
		{
			$scope.isOpened = !$scope.isOpened;
		}
		

		$scope.selectHE = function(idselected, source) 
		{
			//console.log(idselected);
			$scope.isOpened = false;
			if (source=='search')
			{				
				$scope.historicalevent_id = idselected['_source']['id'];
				$scope.historicalevent_title = idselected['_source']['title'];
				$scope.historicalevent_startDate = idselected['_source']['startEventDate'];
				$scope.historicalevent_endDate = idselected['_source']['endEventDate'];
				var string = idselected['_source']['description'];
			}
			else
			{
				$scope.historicalevent_id = idselected['id'];
				$scope.historicalevent_title = idselected['title'];
				$scope.historicalevent_startDate = idselected['startEventDate'];
				$scope.historicalevent_endDate = idselected['endEventDate'];
				var string = idselected['description'];
				
			}
			if(string.length > 150) {
 			   string = string.substring(0,150);
			}
			
			$scope.historicalevent_description = string;
			
		};	
	
			//funtion to add historical event to the array - uses in the modal window
			$scope.addAnotherHistoricalEvent = function(divName) {		
				var idRec = $scope.historicalevent_id;
				//console.log("idRec=>"+idRec);			
				var titleRec = $scope.historicalevent_title;	
				//console.log("titleRec=>"+titleRec);			
				var dateStartRec = $scope.historicalevent_startDate;
				//console.log("dateStartRec=>"+dateStartRec);			
				var dateEndRec = $scope.historicalevent_endDate;
				//console.log("dateEndRec=>"+dateEndRec);

				var colorRec = "grey";
				var element = document.getElementById('historicalevent_color');
				
	 			if (element != null) {
		 			colorRec = document.getElementById("historicalevent_color").value;
		 		}				
		 		if (!colorRec)
		 		{
		 			colorRec="#000000";
		 		}
				
				//console.log(colorRec);
			
				//var res = dateStartRec.split("-");
				var posI=0;
				if ($scope.idHE.length==0)
				{
					posI=1;
				}			
				else
				{
					posI=$scope.idHE.length;
				}
				//console.log("$scope.idHE.length="+$scope.idHE.length);
				
				dateStartRec = $filter('date')(dateStartRec, "yyyy-MM-dd");
				dateEndRec = $filter('date')(dateEndRec, "yyyy-MM-dd");
				
				$scope.idHE[posI] =idRec;
				$scope.titleHE[posI] =titleRec;
				$scope.startDateHE[posI] =dateStartRec;
				$scope.endDateHE[posI] =dateEndRec;
				$scope.colorHE[posI] =colorRec;
				
				$scope.descHE[posI] = $('#descriptionHEToAdd').val();
						
				var datosInT =  {
					id : idRec,
					title : titleRec,
					startDate : dateStartRec,
					endDate : dateEndRec,
					color: colorRec,
					desc : $('#descriptionHEToAdd').val()
				}
				//console.log("**********datosInT");
				//console.log(datosInT);
				$scope.eventsToPlot.push(datosInT);			
			
				$scope.historicalevent_id = '';
				$scope.historicalevent_title = '';
				$scope.historicalevent_startDate = '';
				$scope.historicalevent_endDate = '';
				$scope.historicalevent_description = '';
				$scope.historicalevent_color = '';
				
				//console.log("list events");
				//console.log($scope.eventsToPlot);
				//rePlotGraph();
				
			};				

		$scope.optionToPlot = [];
		
		
		$scope.validateCheckboxes = function(idIn) {
			
//			console.log("idIn="+idIn);
//			console.log($scope.individualCombo_value_[idIn]);
			
			console.log($scope.IndividualDatasetCheckboxes_[idIn].length);
			if ($scope.IndividualDatasetCheckboxes_[idIn].length==0)
			{
				for (j in $scope.individualCombo_value_[idIn]) 
				{
					//console.log("j=");
					//console.log($scope.individualCombo_value_[idIn][j].id);
					$scope.IndividualDatasetCheckboxes_[idIn].push($scope.individualCombo_value_[idIn][j].id);
				}
			}
			
			$scope.rePlotGraph();
		}
		
		$scope.updateDescriptionEvent = function(index) {
			$scope.eventsToPlot[index].desc=$scope.descHE[index+1];
		}
		
		$scope.updatecolorEvent = function(index) {
			$scope.eventsToPlot[index].color = $scope.colorHE[index+1];
		}

		$scope.rePlotGraph = function() {
									
			//console.log("--rePlotGraph--");		
			//console.log($scope.dataset_color_palete_)
			
			var arrayJsonFiles = [];
			var datosTemporales = new Object();
			//var elems = $scope.MetricSelectediId_;
			var elems = $scope.ListMetricsFilter;
			
//			console.log(elems);
			var elemsIndex = $scope.MetricSelectediIndex_;

			
//			console.log($scope.resolution);
//			console.log($scope.resolution.value);
//			console.log($scope.arrayResolutions);
			$scope.FilterResolution=$scope.arrayResolutions[$scope.resolution.value];
//			console.log($scope.FilterResolution);
			
    		var cntMetrics = 0;
    		var arrayJsonFiles = [];
    		var arrayKeys = [];
    		var arrayXAxis = [];
    		var arrayYAxis = [];
    		var arrayGrouping = [];
    		var arrayIdsIdentities = [];
    		var arrayColorIdsIdentities = [];
    		
    		var arrayColorsDatasets = [];
    		
    		
			//console.log(elems);
			$scope.canPlotGarph = true;
			for (j in elems) 
			{	
				//console.log(j);		
				i=elems[j]['id'];
				//console.log(i);		
				if (!isNaN(i))
				{
					//if (elems[i]>0)					
					if (i>0)
					{
						//var jsonFile = elems[i];
						var jsonFile = i;
						var jsonFileName = jsonFile;
						jsonFile = "json/"+jsonFile;
						//var resIdMetric = elems[i];
						var resIdMetric = i;
						
						var timeresolution = $scope.resolution.value;
//						console.log(timeresolution);
						
						//var identities = $scope.IndividualSelectorLabelColumn_[i];
						var identities =  "";
						var identityColors = [];
						
						
						if (($scope.mode=='create') || ($scope.mode=='edit'))
						{
//							console.log($scope.IndividualDatasetCheckboxes_[i]);
//							console.log($scope.individualCombo_value_);
							
							identities =  $scope.IndividualDatasetCheckboxes_[i];
							identityColors =  $scope.dataset_color_palete_[i];
							//console.log("i="+i);
							//console.log("identities");
							//console.log(identities);
							//console.log("identityColors");
							//console.log(identityColors);
							
						}
						else
						{
							identities = elems[j]['identities'];
							identityColors = elems[j]['identitiescolors'];
						}
						
						
						var strIdentities="";
						if (identities)
						{
							for (jIdentities in identities) 
							{
								if (strIdentities)
								{
									strIdentities = strIdentities+",";
								}							
								if (!isNaN(identities[jIdentities]))
								{
									strIdentities = strIdentities+identities[jIdentities];
								}
							}
							
						}
						
						if (strIdentities)
						{
							strIdentities = "&individuals="+strIdentities;
						}
						//console.log(strIdentities);
						
												
						jsonFile = API_CONF.METRICS_MANAGER_URL + "/metrics/"+resIdMetric+'?time_resolution='+timeresolution+strIdentities;
						
						//jsonFile = API_CONF.DATASETS_MANAGER_URL + "/datasets/"+resIdMetric+'?time_resolution='+timeresolution+strIdentities;
						
						
						
						//resIdMetric = cntMetrics+1;

						jsonFile = "/app/modules/visualization/json/dataset"+resIdMetric+"_"+timeresolution+".json?time_resolution="+timeresolution+strIdentities;
						console.log("jsonFile="+jsonFile);
						
						if (jsonFile)
						{
							//var str = elems[i];
							var str = i;
							//var puntero = elemsIndex[i];							
							var puntero = i;
							
							var res = $scope.MetricSelectorLabelColumn_[puntero];
							var valueXAxis = res;
							//console.log("valueXAxis="+valueXAxis);
																			
							res = $scope.MetricSelectorDataColumn_[puntero];										
							var valueYAxis = res;
							//console.log("valueYAxis="+valueYAxis);
							
							if (!valueYAxis)
							{
								valueYAxis = 'by row';
							}
							else {
								valueYAxis = $scope.MetricSelectorDataColumn_[puntero].id;
							}
							//$scope.MetricSelectorGroupingData_[puntero] ='Country';
							//console.log("valueYAxis="+valueYAxis);
							
							var identitiesvalues = "";
							//console.log(puntero);
							identitiesvalues = $scope.IndividualDatasetCheckboxes_[puntero];
							
							//console.log("$scope.IndividualDatasetCheckboxes_");
							//console.log($scope.IndividualDatasetCheckboxes_);
							//console.log("identitiesvalues");
							//console.log(identitiesvalues);
							
							res = $scope.MetricSelectorGroupingData_[puntero];
							var valueGroup = res;
							//console.log("puntero="+puntero);
							//console.log("------valueGroup="+valueGroup);
							
							
							if (!valueGroup)
							{
								valueGroup='grouping column';
							}
							
							
							if (valueGroup)
							{
								arrayKeys.push(jsonFileName);
								arrayXAxis.push(valueXAxis);
								arrayYAxis.push(valueYAxis);
								arrayGrouping.push(valueGroup);	
//								console.log(identitiesvalues);
								
								arrayIdsIdentities.push(identitiesvalues)	
								
								
//								console.log($scope.dataset_color_palete_);
//								console.log($scope.dataset_color_palete_[puntero]);
													
								var valueIdentityColor = $scope.dataset_color_palete_[puntero];
								
								//console.log("valueIdentityColor");
								//console.log(valueIdentityColor);
								arrayColorsDatasets.push(valueIdentityColor);


								arrayJsonFiles.push(jsonFile);
								cntMetrics = cntMetrics+1;
								
								$scope.optionToPlot[resIdMetric] = {
									'metricid':resIdMetric,
									'Label':valueXAxis,
									'Column':valueYAxis,
									'Grouping':valueGroup,
									'identities': identitiesvalues,
									'identitiescolors': valueIdentityColor,
									'json':jsonFile};
							}	
							else
							{
								$scope.canPlotGarph = false;
							}			

						}
						else {
							//console.log("jsonFile KO");
						}
					}
				}
			}
			
			var elemsHE_startDate = "";
			var elemsHE_endDate = "";
			var elemsHE_desc = "";
			var elemsHE_title = "";
			var elemsHE_color = "";
			
			var element = document.getElementsByName('startDateHE[]');
	 		if (element != null) {
	 			elemsHE_startDate = document.getElementsByName("startDateHE[]");
	 		}		

			var element = document.getElementsByName('endDateHE[]');
	 		if (element != null) {
	 			elemsHE_endDate = document.getElementsByName("endDateHE[]");	
	 		}			
			
			var element = document.getElementsByName('descHE[]');
	 		if (element != null) {
	 			elemsHE_desc = document.getElementsByName("descHE[]");	
	 		}			

			var element = document.getElementsByName('titleHE[]');
	 		if (element != null) {
	 			elemsHE_title = document.getElementsByName("titleHE[]");	
	 		}

			var element = document.getElementsByName('colorHE[]');
	 		if (element != null) {
	 			elemsHE_color = document.getElementsByName("colorHE[]");	
	 		}			
			
			
			//console.log("arrayJsonFiles="+arrayJsonFiles)
			//var q = queue();

			var q = queue();
  			arrayJsonFiles.forEach(function(d,i) 
  			{
//  				console.log("-- arrayJsonFiles.forEach -- i="+i+".d="+d);
  				
  				var pathToJson = d;
  				/*
  				if ($scope.resolution)
  				{
  					console.log($scope.resolution.value);
  					pathToJson =pathToJson+'?resolution='+$scope.resolution.value;	
  				}
  				*/
  				//console.log("pathToJson="+pathToJson);  				
  				//q = q.defer(d3.json, d);
  				q = q.defer(d3.json, pathToJson);
  				  		
	  		});
			
  			q.await($scope.plotGraphDatasets);
  			
			//q.await($scope.plotGraph);
		};


		$scope.plotGraphDatasets = function() {
			
//			console.log("plotGraphDatasets");
			
			var control=0;
			if ($scope.metricsFilter.length==0)
			{
				control=0;
			}
			else {
				control=1;
			}
			
			if (control==1)
			{			
				//console.log("arguments.length="+arguments.length);
				//console.log(arguments);
				var arrayDataset = [];
				var labelYAxe = [];
				
				var arrayDataByCounty = [];
				$scope.arrayDataByCounty = [];
				
				var arrayDatesInDataCountry = [];
				var arrayDatesInDataCountryEval = [];
				$scope.arrayDatesInDataCountryEval = [];
				
				for (var i=1; i<arguments.length; i++)
				{		
					//console.log("i="+i);
					if (!isNaN(i))
					{
						//console.log(arguments[i]);
						//console.log(arguments[i].time.resolution);
						//we fix de resolution combo with the values that the visualisation accepts
						$scope.resolutionoptions = $scope.arrayResolutions[arguments[i].time.resolution];
						$scope.resolution = $scope.resolutionoptions[$scope.resolutionoptions.length-1];
												
					 	var ejeX = "";
					 	var ejeY = "";
					 	ejeX = 'time';
					 	ejeY = $scope.optionToPlot[arguments[i].id].Column;
					 	
					 	
					 	//console.log("ejeX="+ejeX);
					 	//console.log("ejeY="+ejeY);					 	
					 	//console.log($scope.optionToPlot[arguments[i].id]);
					 	
					 	//console.log($scope.optionToPlot[arguments[i].id]);
					 	
					 	var colorsIdentities=$scope.optionToPlot[arguments[i].id].identitiescolors;
					 	//console.log("colorsIdentities="+colorsIdentities);
						//console.log("$scope.typeToPlot="+$scope.typeToPlot);
						
						if ( ($scope.typeToPlot==='map_1') 
								|| ($scope.typeToPlot==='mercator') 
								|| ($scope.typeToPlot==='conicConformal')
								|| ($scope.typeToPlot==='equirectangular')
								|| ($scope.typeToPlot==='orthographic')
								|| ($scope.typeToPlot==='azimuthalEqualArea')
								)
						{
							
							//console.log("plot map")
							//console.log(arguments[i]['spatial']);
							
							for (var j=0; j<arguments[i]['spatial'].length; j++)
							{
								var countryDatasetTitle = arguments[i]['spatial'][j]['title'];
								var countryDatasetId = arguments[i]['spatial'][j]['identifier'];
								//console.log(countryDatasetTitle+"---"+countryDatasetId);
								var arrayDataPerDate = [];
								
								for (var jj=0; jj<arguments[i]['data']['table'].length; jj++)
								{
									var obj = arguments[i]['data']['table'][jj].values;
									//console.log(obj);
									for (ii in obj)
									{
										//console.log("ii="+ii);
										//console.log("obj[ii]="+obj[ii]);
										if (isNaN(arrayDataPerDate[ii]))
										{
											arrayDataPerDate[ii]=0;
											arrayDatesInDataCountryEval[ii]=ii;
											$scope.arrayDatesInDataCountryEval[ii]=ii;
										}

										arrayDataPerDate[ii]=arrayDataPerDate[ii]+obj[ii];

										//console.log("arrayDataPerDate");
										//console.log(arrayDataPerDate);
									}

								}
								
								//console.log(arrayDataPerDate);
								
								//arrayDataByCounty.push({'Id':countryDatasetId, 'Data':arguments[i]['data']['table']});
								arrayDataByCounty.push({'Id':countryDatasetId, 'Data': arrayDataPerDate});
								$scope.arrayDataByCounty.push({'Id':countryDatasetId, 'Data': arrayDataPerDate});
							}
							
							//console.log(arrayDataByCounty);
							//console.log(arrayDatesInDataCountry);
							
						}
						else if (($scope.typeToPlot==='graph_line') || ($scope.typeToPlot==='graph_pie') || ($scope.typeToPlot==='graph_bars'))
						{
							var arrayValues = [];
							var arrayLabels  = [];
							var arrayValuesXY  = [];
							var arrayProcessedDates = [];
							var arrayColors = [];
							
							var numbers1T = {"Key":arguments[i].title};
							var cntPosArray=0;
							//console.log(arguments[i]);
							var labelTemporalYAxes = arguments[i]['unit']['title'];
							//console.log("--labelTemporalYAxes="+labelTemporalYAxes);
							
							//console.log("arguments[i]['data']['table']");
							//console.log(arguments[i]['data']['table']);
							var arrayLabels = [];
							var arrayValues = [];
							var arrayUnits = [];
							var arrayColors = [];
							for (var j=0; j<arguments[i]['data']['table'].length; j++)
							{
								//console.log(arguments[i]);
								var obj = arguments[i]['data']['table'][j].values;
								labelYAxe.push(labelTemporalYAxes);
													
								if ($scope.typeToPlot==='graph_line')
								{

									var key = "";
									key = arguments[i]['data']['table'][j].individual.title+"_"+j;
									var type = "metric";
									var arrayLabels = [];
									var arrayColors = [];
									var arrayValuesX = [];
									var arrayValuesY = [];
									
									for (value in obj) {
	    								//console.log("value="+value);
	    								//console.log(obj[value]);
	    								arrayLabels.push(value);
	    								arrayValuesX.push(value);
	    								arrayValuesY.push(obj[value]);
	    								
									}
									
									//console.log("colorsIdentities="+colorsIdentities[j+1]);
									var lineColor = '#000000';
									
									//console.log(colorsIdentities);
									if (colorsIdentities)
									{
										//console.log(colorsIdentities.length);
										//if (colorsIdentities.length>=(j+1))
										
										var cntObject=0;
										
										for(var index in colorsIdentities) {      										

      										if (j==cntObject)
      										{
      											
      										
      											if (colorsIdentities[index])
												{											
													lineColor = colorsIdentities[index];
												}
      										}
      										
      										cntObject=cntObject+1;
 										}
										/*
										if (colorsIdentities[j+1])
										{											
											lineColor = colorsIdentities[j+1];
										}
										*/
									}
									else
									{
										lineColor = $scope.colorScale(arguments[i]['data']['table'][j].individual.title)
									}
									//console.log("lineColor="+lineColor);
									
																				
									var arrayDatasetTmp = {
									'Key': key,
									'Labels': arrayLabels,
									'ValueX': arrayValuesX,
									'ValueY': arrayValuesY,
									'Color': lineColor,
									'Type': type
									}
									//console.log(arrayDatasetTmp);
									
									arrayDataset.push(arrayDatasetTmp);
								}
								else if ($scope.typeToPlot==='graph_pie')
								{
									//var label = arguments[i]['data']['table'][j].individual.title+"_"+j;
									var label = arguments[i]['data']['table'][j].individual.title;
									//console.log(label);
									for (value in obj) {
										//console.log(value+"---"+obj[value]);
										
										var pieColor = '#000000';

										var cntObject=0;
										
										for(var index in colorsIdentities) {      										

      										if (j==cntObject)
      										{
      											
      										
      											if (colorsIdentities[index])
												{											
													lineColor = colorsIdentities[index];
												}
      										}
      										
      										cntObject=cntObject+1;
 										}
 										/*
										if (colorsIdentities)
										{
											//if (colorsIdentities.length>=(j+1))
											if (colorsIdentities[j+1])
											{
												pieColor = colorsIdentities[j+1];
											}
										}	
										*/									
										pieColor = '';
										var arrayPieTmp = {
										'Key': value,
										'Label': label,
										'Value': obj[value],
										'Unit': labelTemporalYAxes,
										'Color': pieColor,
										};
										arrayDataset.push(arrayPieTmp);
										
										arrayLabels[value] = [];
										arrayValues[value] = [];
										arrayUnits[value] = [];
										arrayColors[value] = [];
									}
									
								}
								else if ($scope.typeToPlot==='graph_bars')
								{
									var label = arguments[i]['data']['table'][j].individual.title;
									key = arguments[i]['data']['table'][j].individual.title+"_"+i;
									
									for (value in obj) {
									
										
										arrayDatasetTmp = {
											'Category': 1,
											'From': obj[value],
											'Key': key,
											'To': value,
											'Value': obj[value],
											'ValueX': value,
											'ValueY': obj[value],
											'XY': value+"|"+obj[value],
											'labelY': labelTemporalYAxes
										};
										
										arrayDataset.push(arrayDatasetTmp);
									}
									
									//console.log(arrayDataset);
									
								}
								

							}
						}
					 	
					}	
				}
				
				
//				console.log(arrayDataset);

//				console.log("$scope.typeToPlot="+$scope.typeToPlot);

				if ( ($scope.typeToPlot==='map_1') 
				|| ($scope.typeToPlot==='mercator') 
				|| ($scope.typeToPlot==='conicConformal')
				|| ($scope.typeToPlot==='equirectangular')
				|| ($scope.typeToPlot==='orthographic')
				|| ($scope.typeToPlot==='azimuthalEqualArea')
				)
				{		
					//console.log("map");
					//console.log(arrayDatesInDataCountryEval);
					
					for (i in arrayDatesInDataCountryEval)
					{
						//console.log(arrayDatesInDataCountryEval[i]);
						arrayDatesInDataCountry.push({'Key':arrayDatesInDataCountryEval[i]});
					}
					//console.log(arrayDatesInDataCountry);
					$scope.numbers2=arrayDatesInDataCountry;
					//console.log($scope.numbers2);
					
					if (arrayDataByCounty.length>0)
					{
						$scope.datasetToSendMap = arrayDataByCounty;
					}
					else
					{
						$scope.datasetToSendMap = [{id:"",data:""}];
					}
					
					
					
					//$scope.showZoom = true;
					
					if (($scope.mode=='create') || ($scope.mode=='edit'))
					//if (1==1)
					{						
						//console.log("before plotMapChart");
						$scope.plotMapChart();
					}
					
				}
				else if ($scope.typeToPlot==='graph_line')
				{
					var numbers1 = arrayDataset;
					var legendsColumn = 0;
					if ($scope.showLegend)
					{
						legendsColumn = Math.ceil(numbers1.length/9);
					}
					else
					{
						legendsColumn = 0;
					}	
				 	
					if (numbers1)
					{					
				    
						//
						if ($scope.list) {
							legendsColumn = 0;
						}
					
						var margin = {top: 20, right: 20, bottom: 55+(legendsColumn)*20, left: 44},
						//width = 700,
						width = 980,
						//width = 1050,
						//height = 200;
						height = 326,
						font_size = 11,
						radiouspoint = 4,
						dymarging = 15,
						offsetYaxesR = 10,
						offsetYaxesL = -20,
						distanceXaxes = 45
						;
					
						if ($scope.list)
						{
							margin.top = margin.top / 5;
							margin.right = margin.right / 5;
							margin.bottom = margin.bottom / 5;
							margin.left = margin.left / 5;
							width = width / 5;
							height = height/ 5;
							font_size = font_size / 5;
							radiouspoint = radiouspoint / 5;
							dymarging = dymarging / 5;
							offsetYaxesR = offsetYaxesR / 5;
							offsetYaxesL = offsetYaxesL / 5;
							distanceXaxes = distanceXaxes / 5;
							$scope.showLegend = false;	
											
						}

					
						if (numbers1.length>0)
		                {
		                	$scope.numbers1=numbers1;
		                	$scope.labelYAxe= labelYAxe;
		                }
	                	
						if (($scope.mode=='create') || ($scope.mode=='edit'))
						{
							if (document.getElementById("container_graph_"+$scope.visualization.id) !=null)
							{
								document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";	
							} 
							else
							{	
								document.getElementById("container_graph_").innerHTML = "";
							}
						
							var barLine = policycompass.viz.line(
							{
		                		'idName':"container_graph_"+$scope.visualization.id,
		                		'width': width,
		                		'height': height,
		                		'margin': margin,
		                		'labelX': "label X",
		                		'labelY': labelYAxe,
		                		'radius': radiouspoint,
		                		'dymarging': dymarging,
		                		'offsetYaxesR': offsetYaxesR,
		                		'offsetYaxesL': offsetYaxesL,
		                		'distanceXaxes': distanceXaxes,
		                		'font_size': font_size,
								'showYAxesTogether': $scope.showYAxes,	                		
		                		'showLegend': $scope.showLegend,							
								'showLines': $scope.showLines,	
								'showAreas': $scope.showAreas,													
								'showPoints': $scope.showPoints,							
								'showLabels': $scope.showLabels,							
								'showGrid': $scope.showGrid,
								'showAsPercentatge': $scope.showAsPercentatge,
								'legendsColumn': legendsColumn
							});
						
						
							if (numbers1.length>0)							
	                		{
	                			
	                			//barLine.render(numbers1, $scope.eventsToPlot, $scope.mode);
	                			//console.log("$scope.firstLoad");
	                			//console.log($scope.firstLoad);
	                			
	                			if ($scope.firstLoad==true)
	                			{
	                				$scope.firstLoad=false;
	                				
	                				$scope.$watch('sem', function(sem) {
	                				
	                				//console.log("$scope.sem="+$scope.sem);
	                				//console.log("$scope.eventsToPlot.length="+$scope.eventsToPlot.length);	                				
	                				//console.log("$scope.visualization.historical_events_in_visualization.length="+$scope.visualization.historical_events_in_visualization.length)
	                				if ($scope.sem==$scope.visualization.historical_events_in_visualization.length)
	                				{
	                					//console.log("PINTAMOS!!!");
	                					//console.log($scope.eventsToPlot);
	                					barLine.render(numbers1, $scope.eventsToPlot, $scope.mode);	
	                				}
	                				
									
            						});
            					}
            					else
            					{
            						barLine.render(numbers1, $scope.eventsToPlot, $scope.mode);	
            					}
            					
            					
	                			
	                		}
						}
						
					}
				}
				else if ($scope.typeToPlot==='graph_pie')
				{				
					//console.log(arrayDataset.length);
					

					if (arrayDataset.length>0)
					{
						//console.log(arrayDataset);
							
						for (value in arrayDataset) {
						
							//console.log("value="+value);
							//console.log("arrayDataset["+value+"]=");
							//console.log(arrayDataset[value].Key);
							//console.log(arrayDataset[value].Value);
							//console.log(arrayDataset[value]);
							//console.log(arrayDataset[value].Label);
							//console.log(arrayLabels);
							
							if (!arrayLabels[arrayDataset[value].Key])
							{
								arrayLabels[arrayDataset[value].Key] = [];
								arrayValues[arrayDataset[value].Key] = [];
								arrayUnits[arrayDataset[value].Key] = [];	
								arrayColors[arrayDataset[value].Key] = [];
							}
							
							arrayLabels[arrayDataset[value].Key].push(arrayDataset[value].Label);
							arrayValues[arrayDataset[value].Key].push(arrayDataset[value].Value);
							arrayUnits[arrayDataset[value].Key].push(arrayDataset[value].Unit);
							arrayColors[arrayDataset[value].Key].push(arrayDataset[value].Color);
							
							//arrayLabels[arrayDataset[value].Key] = (arrayDataset[value].Label);
							//arrayValues[arrayDataset[value].Key] = (arrayDataset[value].Value);
							//arrayUnits[arrayDataset[value].Key] = (arrayDataset[value].Unit);
							
						}
						
						//console.log(arrayLabels);
						//console.log(arrayValues);
						//console.log(arrayUnits);
						var numbers2 =[];
						
						for (value in arrayLabels) {
						
							var dataRowTmpPie = {
								'Key': value,
								'Labels': arrayLabels[value],
								'Values': arrayValues[value],
								'Units': arrayUnits[value],
								'Colors': arrayColors[value]
							};
							
							numbers2.push(dataRowTmpPie);
						}
						
						//console.log(numbers2);
						
						numbers2.sort(function(a, b) {
								
								
									var dateA=new Date(a.Key), dateB=new Date(b.Key)
								
 								
 								return dateA-dateB //sort by date ascending
							}); 
  
  						//console.log(numbers2);
  						
  						
						$scope.dataset= numbers2;
						$scope.numbers2=numbers2;
						
						//console.log("$scope.numbers2.length="+$scope.numbers2.length);
						$scope.rangeDatesSliderMax=$scope.numbers2.length-1;
						
						
						
						
						//$scope.numbermaxSlider = $scope.numbers2.length-1;
  									
						$scope.selectedAll = false;
						//console.log($scope.selectedAll);
						//$scope.dateselector = $scope.numbers2[0].Key;
						//console.log($scope.numbers2.length);
						if ($scope.numbers2.length>0)
						{
					
							var $arrayTmp = {};
					
							for (var l in $scope.numbers2) 
							{						
								//console.log(l);
								if (l==0)
								{
									$arrayTmp[$scope.numbers2[l].Key]=true;							
								}
								else
								{
									$arrayTmp[$scope.numbers2[l].Key]=false;
								}
							}
					
							$scope.selection = {Keys: $arrayTmp};
						}

						$scope.plotPieChart();
						
					}
				}
				else if ($scope.typeToPlot==='graph_bars')
				{

					numbers1 = arrayDataset;
					
					var datasetToSend = numbers1;
					//console.log(numbers1);
					var legendsColumn = 0;
					if ($scope.showLegend)
					{
						legendsColumn = Math.ceil(numbers1.length/9);
					}
					else
					{
						legendsColumn = 0;
					}	
					//legendsColumn = 10;
					//console.log(datasetToSend);
		        	
		        	if ($scope.list)
		        	{
		        		legendsColumn = 0;
		        	}
		        	
					var margin = {top: 20, right: 20, bottom: 55+(legendsColumn)*20, left: 44};
					var width = 980;// - margin.left - margin.right;
		    		//var width = 400 - margin.left - margin.right;
		    		//var height = 300 - margin.top - margin.bottom;
					var height = 326;
					
					var font_size = 11;
					
					if ($scope.list)
					{
						width = width / 5;
						height = height / 5;
						margin.top = margin.top / 5;
						margin.right = margin.right / 5;
						margin.bottom = margin.bottom / 5;
						margin.left = margin.left / 5;
						font_size = font_size / 5;
						$scope.showLegend = false;	
					}
					
					if (datasetToSend.length>0)
					{
						var eventsArray = [];
						//barObj.render(datasetToSend, $scope.eventsToPlot);
						$scope.datasetToSend=datasetToSend;				
					}
					
					if (($scope.mode=='create') || ($scope.mode=='edit'))
					{
						if (document.getElementById("container_graph_"+$scope.visualization.id) !=null)
						{
							document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";	
						} 
						else
						{	
							document.getElementById("container_graph_").innerHTML = "";
						}
						
						var barObj = policycompass.viz.barsMultiple(
						{
		                'idName':"container_graph_"+$scope.visualization.id,
		            	'width': width,
		            	'height':height,
		            	'margin': margin,
		            	'labelX': "",
		            	'labelY': labelYAxe,
		            	'radius': 4,
		            	'font_size': font_size,
		            	'showLegend': $scope.showLegend,
						'showLines': $scope.showLines,
						'showAreas': $scope.showAreas,					
						'showPoints': $scope.showPoints,
						'showLabels': $scope.showLabels,
						'showGrid': $scope.showGrid,
						'legendsColumn': legendsColumn
		            	});
						//console.log(datasetToSend);
						barObj.render(datasetToSend, eventsArray);
					}
					
				
				}
				
				
			}
		}

    	
    	}
    	
    }
}])


            

.controller('VisualizationsDetailController', [
	'$scope', 
	'$route',
	'$routeParams',
	'$modal', 
	'Event', 
	'Metric', 	
	'Visualization', 
	'VisualizationByMetric',
	'VisualizationByEvent',
	'$location', 
	'GetRelatedData',
	'dialogs',
	'$log', 
	'API_CONF',
	function($scope, $route, $routeParams, $modal, Event, Metric, Visualization, VisualizationByMetric, VisualizationByEvent, $location, helper, dialogs, $log, API_CONF) {
	
	//this.message = "Hello VisualizationsDetailController";
	//console.log("Hello VisualizationsDetailController");
	//alert($routeParams.visualizationId);
    //$scope.test = "hallo---";
    
    helper.baseGetRelatedDataController($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF);
    			
    $scope.imageVisu = '/media/visualization_'+$routeParams.visualizationId+'.png';
    
	$scope.visualization = Visualization.get({id: $routeParams.visualizationId},
			function(visualizationList) {		
				var id_visu = $routeParams.visualizationId;
				//console.log("id_visu="+id_visu);
				$scope.relatedVisualizations = [];
				
				for (i in $scope.visualization.metrics_in_visualization)
				{
					id = $scope.visualization.metrics_in_visualization[i].metric_id;
					//console.log(id);
					$scope.getMetricData(i, id, "", "", "");
					
					$scope.visualizationByMetricList = VisualizationByMetric.get({id: id},
					function(visualizationByMetricList) {
						
						for (i in visualizationByMetricList.results)
						{							
							var Tmp = {"visualization_id": visualizationByMetricList.results[i]['visualization'], "title": visualizationByMetricList.results[i]['title']}
							
							found = false;
														
 							if (id_visu==visualizationByMetricList.results[i]['visualization'])
 							{
 								found = true;
 							}
 							else
 							{
								for(var j = 0; j < $scope.relatedVisualizations.length; j++) 
								{
    								if ($scope.relatedVisualizations[j].visualization_id == visualizationByMetricList.results[i]['visualization']) 
    								{
        								found = true;
        								break;
    								}
								} 								
 							}
 							
 							if (!found)
 							{ 							
 								$scope.relatedVisualizations.push(Tmp);	
 							}
							
							
						}
						
					});		
				
				}
							
				//console.log($scope.visualization.historical_events_in_visualization)
				var colorTmp =[];
				for (i in $scope.visualization.historical_events_in_visualization )
				{
					id = $scope.visualization.historical_events_in_visualization[i].historical_event_id;
					//console.log("event id="+id);
					
					colorTmp[id] =$scope.visualization.historical_events_in_visualization[i].color;
					
					
					//console.log("colorTmp[id]="+colorTmp[id]);
					
					$scope.getHistoricalEventcData(id, colorTmp[id]);
					
					

					$scope.visualizationByEventList = VisualizationByEvent.get({id: id},
					function(visualizationByEventList) {
						
						for (i in visualizationByEventList.results)
						{							
							var Tmp = {"visualization_id": visualizationByEventList.results[i]['visualization'], "title": visualizationByEventList.results[i]['title']}
							
							found = false;
							
 							if (id_visu==visualizationByEventList.results[i]['visualization'])
 							{
 								found = true;
 							}
 							else
 							{
								for(var j = 0; j < $scope.relatedVisualizations.length; j++) 
								{
    								if ($scope.relatedVisualizations[j].visualization_id == visualizationByEventList.results[i]['visualization']) 
    								{
        								found = true;
        								break;
    								}
								} 								
 							}
 							
 							if (!found)
 							{ 								
 								$scope.relatedVisualizations.push(Tmp);	
 							}
							
							
						}
						
					});	
					
				}
    	
			},
			function(error) {
				//alert(error.data.message);
				throw { message: JSON.stringify(error.data.message)};
			}
	);
	
	//$scope.visualization.views_count = $scope.visualization.views_count +1;
	
	

    // Function for deleting the visualization
    $scope.deleteVisualization = function(visualization) {
        // Open a confirmation dialog
        var dlg = dialogs.confirm(
            "Are you sure?",
            "Do you want to delete the visualization '" + visualization.title + "' permanently?");
        dlg.result.then(function () {
            // Delete the visualization via the API
            visualization.$delete(
                {},
                function(){
                    $location.path('/visualizations');
                }
            );
        });
    };	


}])

.controller('viewVisualizationCtrl', ['$scope',  
	'$log', 
	'$routeParams',
	function($scope, $log, $routeParams) {
	
	//console.log ('-->ExampleCtrlhhhhhhhh<---');
	
}])
	
//controler to list visualizations
.controller('VisualizationsController', [
	'$scope', 
	'Visualization', 
	'$log', 
	'$routeParams',
	function($scope, Visualization, $log, $routeParams) {
	                
		//console.log("VisualizationsController");	
		$scope.visualizations = Visualization.query(
			 {page: $routeParams.page
			 //, page_size: 12
			 },
			function(visualizationList) {
			},
			function(error) {
				//alert(error.data.message);
				throw { message: JSON.stringify(error.data.message)};
			}
		);

}])

//controler to view the detail of a visualization
.controller('VisualizationDetailController', [
	'$scope', 
	'$routeParams', 
	'$location', 
	'Visualization', 
	function($scope, $routeParams, $location, Visualization) {
	
	//this.message = "test visu";
    //$scope.test = "test visu";
    
	$scope.visualization = Visualization.get({id: $routeParams.visualizationId},
			function(visualizationList) {
			},
			function(error) {
				//alert(error.data.message);
				throw { message: JSON.stringify(error.data.message)};
			}
	);

    $scope.deleteVisualization = function(visualization) {
        visualization.$delete(
            {},
            function(){
                $location.path('/visualization');
            }
        );
    };


}])


.controller('VisualizationsEditController', [
	'$filter',
	'$scope', 
	'$route',
	'$routeParams',
	'$modal', 
	'Event', 
	'Metric', 
	'Visualization', 
	'$location', 
	'VisualizationsControllerHelper',	
	'$log', 
	'API_CONF',
	function($filter, $scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF) {

		
	//console.log("controller VisualizationsEditController");

	//console.log("-----------");
	//console.log($scope.idvisulist);
	$scope.list = false;
	$scope.firstLoad = true;
	
	if ($scope.idvisulist)
	{
		$routeParams.visualizationId = $scope.idvisulist;
		$scope.list = true;
	}
	//console.log("-----------");
	
	var locationURL = $location.path();
	
	if (locationURL.indexOf("edit") > -1)
	{
		$scope.mode = "edit";
		//$scope.isFirstOpen = false;
		$scope.isFirstOpen = true;
	}
	else
	{
		$scope.mode = "view";
	}
	

    
	//funtion to reset form
	
	$scope.resetlocation = '/visualizations/'+$routeParams.visualizationId+'/edit/';
	
	helper.baseVisualizationsCreateController($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF);
	
	$scope.ListMetricsFilter = [];
	
	$scope.visualization = Visualization.get({id: $routeParams.visualizationId},
        function(visualization) {
        	//console.log("---Visualization.get----");
			
			

							        	
        },
        function(error) {
            //alert(error.data.message);
            throw { message: JSON.stringify(error.data.message)};
        }
    );
    
    
	$scope.visualization.$promise.then(function(metric) {
//			console.log("DINS $scope.visualization.$promise.then")
//			console.log(metric);
            $scope.visualization.language = $scope.visualization.language.id;
			
    		var configurationFilter = $scope.visualization.filter_configuration;
    		var arrayConfigFilter = configurationFilter.split(",");
    		
    		for (x=0;x<arrayConfigFilter.length;x++)
    		{
    			var dataFilter = arrayConfigFilter[x].split("=");
    			//console.log(dataFilter[0]);
    			
    			if (dataFilter[0]=='graphSelected')
    			{
    				//$scope.tabParent = 2;
					//$scope.tabSon = 'graph_line';
					//$scope.typeToPlot= 'graph_line';
					//console.log("dataFilter[1]="+dataFilter[1]);
					if ((dataFilter[1]=='graph_line') || (dataFilter[1]=='graph_pie') || (dataFilter[1]=='graph_bars'))
					{
						$scope.tabParent = 2;	
					}
    				else if (dataFilter[1])
    				{
    					$scope.tabParent = 1;
    				}
    				else
    				{
    					$scope.tabParent = 2;
    				}
					$scope.tabSon = dataFilter[1];
					$scope.typeToPlot = dataFilter[1];
					
    			}
    			else if (dataFilter[0]=='resolution')
    			{
					//console.log(dataFilter[1]);
    				var endPos = $scope.resolutionoptions.length-1;
    				//console.log($scope.resolutionoptions);    				
    				for (var i=0; i < $scope.resolutionoptions.length; i++) 
    				{
						//console.log("i="+i);
						//console.log("dataFilter[1]="+dataFilter[1]);
						//console.log("$scope.resolutionoptions[i]="+$scope.resolutionoptions[i]);
						//onsole.log("$scope.resolutionoptions[i].value="+$scope.resolutionoptions[i].value);
						if (dataFilter[1]==$scope.resolutionoptions[i].value)
					  	{					  	
							endPos=i;
					  	}
					};    				
					$scope.resolution = $scope.resolutionoptions[endPos];
					
					$scope.FilterResolution = $scope.arrayResolutions[endPos];

    			}
    			else
    			{
    				eval("$scope."+dataFilter[0]+"="+dataFilter[1]);
    			}
    		}
    		
    		//console.log("$scope.visualization.historical_events_in_visualization")
    		//console.log($scope.visualization.historical_events_in_visualization)
    		$scope.idHE = [];
			$scope.titleHE = [];
			$scope.startDateHE = [];
			$scope.endDateHE = [];
			$scope.descHE = [];	
			$scope.colorHE = [];
			
   			$scope.eventsToPlot = [];
			
			//console.log($scope.visualization.historical_events_in_visualization);
			$scope.sem = 0;
			for (i in $scope.visualization.historical_events_in_visualization)
			{
				//console.log($scope.visualization.historical_events_in_visualization[i])
				$scope.idHE[(parseInt(i)+1)]=$scope.visualization.historical_events_in_visualization[i].historical_event_id;
				$scope.titleHE[(parseInt(i)+1)]=$scope.visualization.historical_events_in_visualization[i].title;
				$scope.startDateHE[(parseInt(i)+1)] = $scope.visualization.historical_events_in_visualization[i].startEventDate;
				$scope.endDateHE[(parseInt(i)+1)] = $scope.visualization.historical_events_in_visualization[i].endEventDate;
				$scope.descHE[(parseInt(i)+1)] = $scope.visualization.historical_events_in_visualization[i].description;
				$scope.colorHE[(parseInt(i)+1)] = $scope.visualization.historical_events_in_visualization[i].color;
				
				//console.log($scope.visualization.historical_events_in_visualization[i]);
				
				var datosInT =  {
					id : $scope.visualization.historical_events_in_visualization[i].historical_event_id,
					title : $scope.visualization.historical_events_in_visualization[i].title,
					startDate : $scope.visualization.historical_events_in_visualization[i].startEventDate,
					endDate : $scope.visualization.historical_events_in_visualization[i].endEventDate,
					desc :  $scope.visualization.historical_events_in_visualization[i].description,
					color : $scope.visualization.historical_events_in_visualization[i].color
				}
				
				$scope.eventsToPlot[i]=datosInT;

				//$scope.getEventDataDetail(i, $scope.visualization.historical_events_in_visualization[i]);
				
				$scope.getEventDataDetail(i, $scope.visualization.historical_events_in_visualization[i], function(resultado){
					//console.log("*****************resultado********************");
					//console.log(resultado);
					
   					//$scope.eventsToPlot[i]=resultado;
   					//console.log($scope.eventsToPlot[i]);
   					
   					$scope.sem = $scope.sem+1;
   					//console.log($scope.sem);
					//console.log($scope.eventsToPlot);
				});
				
				//$scope.eventsToPlot.push(datosInT);
				
				//$scope.eventsToPlot[i]=(datosInT);
				//console.log($scope.eventsToPlot);
				//$scope.sleep(1000);
			}
			

			
			
					
			//console.log("$scope.visualization.metrics_in_visualization")
    		//console.log($scope.visualization.metrics_in_visualization)

			$scope.ListMetricsFilter = [];
			$scope.metricsFilter = $scope.ListMetricsFilter;
	
			$scope.MetricSelectediId_ = [];
			$scope.MetricSelectediIndex_ = [];
			$scope.MetricSelectorLabelColumn_ = [];
			$scope.MetricSelectorDataColumn_ = [];
			$scope.MetricSelectorGroupingData_ = [];
			
			//$scope.Combo_MetricSelectorGroupingData_ = [];
			$scope.unitsCombo_value_ = [];
			$scope.UnitSelectorLabelColumn_ = [];
			$scope.IndividualSelectorLabelColumn_ = [];
			$scope.IndividualDatasetCheckboxes_ = [];
			
			$scope.ListIndividualDatasetCheckboxes_ = [];
			$scope.dataset_color_palete_ = [];
			
			
			$scope.individualCombo_value_ = [];
			
			$scope.optionsCombo_ = [];
			$scope.optionsCombo_value_ = [];
			
			  
			    	
			for (i in $scope.visualization.metrics_in_visualization)
			{
				//console.log("metrics_in_visualization i="+i);
				
				//var id = $scope.visualization.metrics_in_visualization[i].id;
				//console.log("------------->id="+$scope.visualization.metrics_in_visualization[i].id);
				//console.log("------------->metric_id="+$scope.visualization.metrics_in_visualization[i].metric_id);
				
				var id = $scope.visualization.metrics_in_visualization[i].metric_id;
				//console.log("------------->id="+id);	
					
									
				$scope.MetricSelectediId_[id]=id;
				//$scope.MetricSelectediIndex_[id]=(parseInt(i)+1);				
				$scope.MetricSelectediIndex_[id]=id;
				//console.log('visualization_query');
				//console.log($scope.visualization.metrics_in_visualization[i].visualization_query);			
				
				
				var configurationMetricsFilters = $scope.visualization.metrics_in_visualization[i].visualization_query;
    			//console.log(configurationMetricsFilters)
    			var arrayConfigMetricsFilters = configurationMetricsFilters.split(",");
    			
    			
    			var valueColumTemp = "";
    			var valueGroupTemp = "";
	    		for (x=0;x<arrayConfigMetricsFilters.length;x++)
	    		{
	    			//console.log("x="+x);
	    			var dataFilter = arrayConfigMetricsFilters[x].split(":");
	    			//console.log("dataFilter[0]="+dataFilter[0])
	    			//console.log("dataFilter[1]="+dataFilter[1])


	    			if (dataFilter[0]=='Label')
	    			{
	    				$scope.MetricSelectorLabelColumn_[id] = dataFilter[1];
	    			}
	    			
	    			else if (dataFilter[0]=='Column')
	    			{
	    				$scope.MetricSelectorDataColumn_[id] = dataFilter[1];	    				
	    				valueColumTemp = dataFilter[1];
	    				
	    			}
	    			else if (dataFilter[0]=='Grouping')
	    			{
	    				//console.log(dataFilter[1]);
	    				if (dataFilter[1]!="undefined")
	    				{
	    					$scope.MetricSelectorGroupingData_[id] = dataFilter[1];
	    					valueGroupTemp = dataFilter[1];	
	    				}
	    				else
	    				{
	    					$scope.MetricSelectorGroupingData_[id] = "";
	    					valueGroupTemp = "";
	    				}
	    				
	    			}
	    			else if (dataFilter[0]=='Individual')
	    			{
//	    				console.log(dataFilter[1]);
	    				//var lisIndividuals = dataFilter[1].split(";");
	    				
	    				//$scope.IndividualDatasetCheckboxes_[id] = lisIndividuals
	    				//var find = ';';
						//var re = new RegExp(find, ',');

						//$scope.ListIndividualDatasetCheckboxes_[id] = dataFilter[1].replace(/;/gi, ",");
						$scope.ListIndividualDatasetCheckboxes_[id] = dataFilter[1].split(";");	    			
	    			}
	    			else if (dataFilter[0]=='Colors')
	    			{
	    				var tmp = dataFilter[1].split(";");	
	    				//$scope.dataset_color_palete_[id] = tmp;
	    				$scope.dataset_color_palete_[id]=[];
	    				
	    				for (j in $scope.ListIndividualDatasetCheckboxes_[id])
	    				{
//	    					console.log(id);
	    					//console.log($scope.ListIndividualDatasetCheckboxes_[id][j]);
	    					var posj = $scope.ListIndividualDatasetCheckboxes_[id][j];
	    					//console.log(tmp[j]);
	    					$scope.dataset_color_palete_[id][posj]=tmp[j];
	    				}
	    				
	    			}
	    			
	    		}
	    		
				/////////////////
			//	$scope.loadDataCombos(id, valueColumTemp, valueGroupTemp);


			
				//////////////
				
				
				//$scope.MetricSelectorLabelColumn_[id]='from';
				//$scope.MetricSelectorDataColumn_[id] ='value';
				//$scope.MetricSelectorGroupingData_[id] = 'grouping column';

				selectedText = " ";
				
				var myObject = {
					'id': $scope.MetricSelectediId_[id],
					'name': $scope.visualization.metrics_in_visualization[i].title,
					'title': $scope.visualization.metrics_in_visualization[i].title,
					'issued': $scope.visualization.metrics_in_visualization[i].issued,
					'identities': $scope.ListIndividualDatasetCheckboxes_[id],
					'identitiescolors': $scope.dataset_color_palete_[id],
					'column': $scope.MetricSelectorLabelColumn_[id],
					'value': $scope.MetricSelectorDataColumn_[id],
					'group': $scope.MetricSelectorGroupingData_[id]				
				};
				
//				console.log(myObject);
				$scope.ListMetricsFilter[i]=myObject;
				
				
				$scope.getMetricDataDetail(i, id, $scope.MetricSelectorLabelColumn_[id], $scope.MetricSelectorDataColumn_[id], $scope.MetricSelectorGroupingData_[id], $scope.ListIndividualDatasetCheckboxes_[id], $scope.dataset_color_palete_[id]);				
									
				//$scope.ListMetricsFilter.push(myObject);
				
				$scope.correctmetrics = "1";
//				console.log($scope.ListMetricsFilter);
			}
			
				
			//console.log(".....");
			
			$scope.rePlotGraph();
    
    });
    

	$scope.getEventDataDetail = function(posI, datIn, callback) {
				//console.log("getMetricData eventId="+datIn.historical_event_id);
				
				$scope.her = Event.get({id: datIn.historical_event_id},
            	function(her) {
            		//console.log("------>event id="+her.id);
            		//console.log("------>title="+her.title);
            		
					var tmp_startDate = $filter('date')(her.startEventDate, "yyyy-MM-dd");
					//console.log("tmp_startDate="+tmp_startDate);
					
					var tmp_endDate = $filter('date')(her.endEventDate, "yyyy-MM-dd");
					//console.log("tmp_endDate="+tmp_endDate);
					
					//console.log("her.startEventDate="+{her.startEventDate | date:'longDate'});
					
					var myObject =  {
						id : her.id,
						title : her.title,
						//startDate : her.startEventDate,
						//endDate : her.endEventDate,
						startDate : tmp_startDate,
						endDate : tmp_endDate,
						desc :  datIn.description,
						color : datIn.color
					}
					//console.log("myObject");
					//console.log(myObject);
					$scope.titleHE[(parseInt(posI)+1)]=her.title;
					$scope.startDateHE[(parseInt(posI)+1)] = her.startEventDate;
					$scope.endDateHE[(parseInt(posI)+1)] = her.endEventDate;
					
					//console.log("posI");
					//console.log(posI);
					//console.log("myObject");
					//console.log(myObject);
					
					
					
					//console.log(myObject);
					$scope.eventsToPlot[posI]=myObject;
					callback(myObject);	
            		
            	},
            	function(err) {
	                throw { message: JSON.stringify(err.data)};
    	        }
        		);
        		
			};

	$scope.getMetricDataDetail = function(posI, metricId, column, value, group, identities, identitiescolors) {

				//console.log("getMetricData metricId="+metricId);
				
				$scope.metric = Metric.get({id: metricId},
            	function(metric) {
            		//console.log("------>metric id="+metric.id);
            		//console.log("------>title="+metric.title);
            		
 					var myObject = {
					'id': metric.id,
					'name': metric.title,
					'title': metric.title,
					'issued': metric.issued,
					'column': column,
					'value': value,
					'group': group,
					'identities': identities,
					'identitiescolors': identitiescolors	
					};
				
            		$scope.ListMetricsFilter[posI] = myObject;
            		
            	},
            	function(err) {
	                throw { message: JSON.stringify(err.data)};
    	        }
        		);
			}; 
				
			 
    
	$scope.createVisualization = function(metricListIn) {
		//console.log("createVisualization Edit controller")
		//alert("ssssssssssssssssss");
        $scope.visualization.user_id = 1;        				     
        $scope.visualization.views_count = 0;
        $scope.visualization.visualization_type_id = 1;
        
        if ($scope.typeToPlot=='graph_line')
        {
        	$scope.visualization.visualization_type_id = 1;
        }
        else if ($scope.typeToPlot=='graph_pie')
        {
        	$scope.visualization.visualization_type_id = 2;
        }
        else if ($scope.typeToPlot=='graph_bars')
        {
        	$scope.visualization.visualization_type_id = 3;
        }
        else
        {
        	$scope.visualization.visualization_type_id = 4;
        }
        
        $scope.visualization.status_flag_id = 0;
		       		
        var dataConfig = [];
        dataConfig['graphSelected'] = $scope.typeToPlot;
        dataConfig['showLegend'] = $scope.showLegend;
        dataConfig['showLines'] = $scope.showLines;
        dataConfig['showAreas'] = $scope.showAreas;        
        dataConfig['showPoints'] = $scope.showPoints;
        dataConfig['showLabels'] = $scope.showLabels;
        dataConfig['showGrid'] = $scope.showGrid;
        dataConfig['showYAxes'] = $scope.showYAxes;
        dataConfig['showZoom'] = $scope.showZoom;
        dataConfig['showMovement'] = $scope.showMovement;
        dataConfig['showAsPercentatge'] = $scope.showAsPercentatge;       
        dataConfig['resolution'] = $scope.resolution['value'];
        
        var dataMetrics = [];
        console.log(metricListIn);
        
		//for (i in $scope.MetricSelectediIndex_)
		for (j in metricListIn)
		{
			i=metricListIn[j].id;
			//console.log("i="+i);	
			//console.log("i="+i+"---$scope.MetricSelectediIndex_["+i+"]="+$scope.MetricSelectediIndex_[i])
			//console.log("MetricSelectediIndex_ i="+i);
			$scope.MetricSelectediId_[i] = i;
			
			if (!isNaN($scope.MetricSelectediId_[i]))
			{				
				var myindex = $scope.MetricSelectediIndex_[i];

				
				value='';
				/*
				for (var i=0; i < $scope.IndividualSelectorLabelColumn_[myindex].length; i++) {
					if (value)
					{
						value=value+';';
					}
					value = value+$scope.IndividualSelectorLabelColumn_[myindex][i].id;
				  
				};
				*/
				
				//console.log(myindex);
				//console.log($scope.IndividualDatasetCheckboxes_[myindex]);
				
				for (var i=0; i < $scope.IndividualDatasetCheckboxes_[myindex].length; i++) 
				{
					if (!isNaN(i))
					{
						if ($scope.IndividualDatasetCheckboxes_[myindex][i]>0)
						{
							if (value)
							{
								value=value+';';
							}
							value = value+$scope.IndividualDatasetCheckboxes_[myindex][i];
							//value = value+i;
						}
				  	}
				};
								
				var selectorIndividualData = value;				

				value = '';
				//for (var i=0; i < $scope.dataset_color_palete_[myindex].length; i++)
				for (var i in $scope.dataset_color_palete_[myindex]) 
				{
					//console.log("i="+i);
					//console.log($scope.dataset_color_palete_[myindex]);
					
					if($scope.dataset_color_palete_[myindex][i])
					{
							if (value)
							{
								value=value+';';
							}
							value = value+$scope.dataset_color_palete_[myindex][i];
							//console.log("value="+value);
							//value = value+i;
					}
				};
								
				var selectorIndividualColorData = value;					
				
				//console.log("selectorIndividualColorData");
				//console.log(selectorIndividualColorData);
				
				//var visualization_query_data = 'Label:'+selectorLabel+',Column:'+selectorDataColumn+',Grouping:'+selectorGroupingData;
				var visualization_query_data = 'Individual:'+selectorIndividualData+',Colors:'+selectorIndividualColorData;
				
				
				
				//console.log("visualization_query_data="+visualization_query_data);
				
				var rowMetric = {
                    metric: myindex,
                    visualization_query: visualization_query_data
                	};
             	
             	//console.log("rowMetric");
             	//console.log(rowMetric);
             	dataMetrics.push(rowMetric);   				
			}
		}
		
		//console.log(dataMetrics)
        
        //alert("sssssssssssssssssssss");
        var dataHE = [];
        
        for (i in $scope.idHE)
        {
			if (!isNaN($scope.idHE[i]))
			{
				var rowHE = {
                    historical_event: $scope.idHE[i],
                    description: $scope.descHE[i],
                    color: $scope.colorHE[i]
                };
				dataHE.push(rowHE);
			}
        }
          
        
		var string_filter_configuration = "";
		for (key in dataConfig) {
			if (!string_filter_configuration=="")
			{
				string_filter_configuration = string_filter_configuration + ",";
			}
			string_filter_configuration = string_filter_configuration + key +"="+dataConfig[key];
		}
		
		//console.log("string_filter_configuration="+string_filter_configuration);
		
		
		$scope.visualization.filter_configuration = string_filter_configuration;
		if (dataHE.length>0)
		{			
			$scope.visualization.historical_events_in_visualization = dataHE;
		}	
		else
		{
			var rowHE = {
                    historical_event: "",
                    description: "",
                    color: ""
            };
			dataHE.push(rowHE);
		
			$scope.visualization.historical_events_in_visualization = dataHE;
		}
		
		//console.log($scope.visualization.historical_events_in_visualization);
		$scope.visualization.metrics_in_visualization = dataMetrics;
		
		
		Visualization.update($scope.visualization,function(value, responseHeaders){
				$location.path('/visualizations/' + value.id);
			},
			function(err) {
	            throw { message: err.data};
	            //console.log(err.data)
			}
			); 
		/*
		var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var DOMURL = self.URL || self.webkitURL || self;
		var img = new Image();		
		var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
		var imgurl = DOMURL.createObjectURL(svg);
		//console.log(imgurl);

		img.onload = function() {
    		ctx.drawImage(img, 0, 0);
    		
    		var png = canvas.toDataURL("image/png");
    		//document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
    		//console.log(png);
    		$scope.visualization.imageurlpng = png;
    		
    		console.log($scope.visualization.imageurlpng);
    		DOMURL.revokeObjectURL(png);
			
			console.log($scope.visualization);
			
			Visualization.update($scope.visualization,function(value, responseHeaders){
				$location.path('/visualizations/' + value.id);
			},
			function(err) {
	            throw { message: err.data};
	            //console.log(err.data)
			}
			);    	
			
    		
		};
		img.src = imgurl;
		*/
	};

	
	
	
	
	/*
	$scope.eventsToPlot = [];
	
	var datosInT =  {
				id : 1,
				title : 'test',
				startDate : '2014-06-30T22:00:00Z',
				endDate : '2014-07-02T22:00:00Z',
				desc : 'hooola'
			}
	
	$scope.eventsToPlot.push(datosInT);		
	*/
/*	
	$scope.ListMetricsFilter = [];
	$scope.metricsFilter = $scope.ListMetricsFilter;
	
	$scope.MetricSelectediId_ = [];
	$scope.MetricSelectediIndex_ = [];
	$scope.MetricSelectorLabelColumn_ = [];
	$scope.MetricSelectorDataColumn_ = [];
	$scope.MetricSelectorGroupingData_ = [];
	*/
	/*
	$scope.idHE = [];
	$scope.titleHE = [];
	$scope.startDateHE = [];
	$scope.endDateHE = [];
	$scope.descHE = [];
	*/	
/*
	$scope.MetricSelectediId_[1]=1;
	$scope.MetricSelectediIndex_[1]=1;
	$scope.MetricSelectorLabelColumn_[1]='to';
	$scope.MetricSelectorDataColumn_[1] ='value';
	$scope.MetricSelectorGroupingData_[1] = 'grouping column';

	selectedText = " ";
	var myObject = {
		'id':1,
		'name':'test',
		'column':'to',
		'value':'value',
		'group':'grouping column'
	};
	
	//console.log("a1");					
	$scope.ListMetricsFilter.push(myObject);	
	*/

	
	//$scope.rePlotGraph();
	//$scope.rePlotGraph();
			
}])


//controler to view a graph
.controller('VisualizationsGraphController', [
	'$scope', 
	'$route',
	'$routeParams',
	'$modal', 
	'Event', 
	'Metric', 	
	'Visualization', 
	'$location', 
	'VisualizationsControllerHelper',
	'$log', 
	'API_CONF',
function($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF) {
	
	//console.log('VisualizationsGraphController');
	//this.message = "Hello VisualizationsDetailController";
	//alert("Hello VisualizationsDetailController");
	//alert($routeParams.visualizationId);
    //$scope.test = "hallo---";
/*    
    $scope.onLoadGraph = function(idVal) {
    	console.log('onLoadGraph() idVal='+idVal);
    	//$routeParams.visualizationId = idVal;    	
	}
*/
    
    
}])

//controler to create a new visualization
.controller('VisualizationsCreateController', [
	'$scope', 
	'$route',
	'$routeParams',
	'$modal', 
	'Event', 
	'Metric', 
	'Visualization', 
	'$location', 
	'VisualizationsControllerHelper',
	'$log', 
	'API_CONF',
function($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF) {
	
	//console.log('VisualizationsCreateController');
	
	$scope.mode = "create";
	$scope.isFirstOpen = true;
	$scope.firstLoad = false;
	$scope.resetlocation = "/visualizations/create/";


//	angular.element(document).ready(function () {
        //console.log('Hello World 1');
  //  });
    
	helper.baseVisualizationsCreateController($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF);
	
	//$scope.tabParent = 0;
	//$scope.tabSon = 0;
	
	$scope.tabParent = 2;
	$scope.tabSon = 'graph_line';
	$scope.typeToPlot= 'graph_line';


	$scope.eventsToPlot = [];		
		
	
	$scope.MetricSelectediId_ = [];
	$scope.MetricSelectediIndex_ = [];
	$scope.MetricSelectorLabelColumn_ = [];
	$scope.MetricSelectorDataColumn_ = [];
	$scope.MetricSelectorGroupingData_ = [];
	//$scope.Combo_MetricSelectorGroupingData_ = [];
	
	$scope.unitsCombo_value_ = [];
	$scope.UnitSelectorLabelColumn_ = [];
	$scope.IndividualSelectorLabelColumn_ = [];
	
	$scope.IndividualDatasetCheckboxes_ = [];
//	console.log("definiomos dataset_color_palete_")
	$scope.dataset_color_palete_ = [];
	
	$scope.individualCombo_value_ = [];
	
	$scope.optionsCombo_ = [];
	$scope.optionsCombo_value_ = [];
	
	
	$scope.idHE = [];
	$scope.titleHE = [];
	$scope.startDateHE = [];
	$scope.endDateHE = [];
	$scope.descHE = [];
	$scope.colorHE = [];
	
	//filters
	$scope.showLegend = true;
	$scope.showLines = true;
	$scope.showAreas = true;
	$scope.showPoints = true;
	$scope.showLabels = true;
	$scope.showGrid = true;
	//$scope.showYAxes = true;
	$scope.showYAxes = false;
	
	$scope.showZoom = false;
	$scope.showMovement = true;
	
	
	$scope.visualization = {};

	this.historicalevent_he_id = '';
	this.historicalevent_he_title = '';
	this.historicalevent_he_startdate = '';
	this.historicalevent_he_enddate = '';
	this.historicalevent_he_description = '';

/*
    var metricsURL = $routeParams.metrics;
    console.log("metricsURL="+metricsURL);
    
    if (metricsURL)
    {
    	var arrayMetricsURL = metricsURL.split(",");    		
    	for (x=0;x<arrayMetricsURL.length;x++)
    	{
    		//console.log("arrayMetricsURL[x]="+arrayMetricsURL[x])
    		if (arrayMetricsURL[x]>0)
    		{
	    		$scope.metric = Metric.get({id: arrayMetricsURL[x]},
	            function(metric) {
	            	//console.log("pppppppppppppppp");
	            	if (metric.id>0)
	            	{
	            		$scope.addFilterMetric(metric.id, metric.title, metric.issued);	
	            	}
	            	//$scope.rePlotGraph();
	            },
	            function(err) {
	                throw { message: JSON.stringify(err.data)};
	            }
	        	);
        	}
    	}    	
    }
*/
	var datasetsURL = $routeParams.datasets;
    console.log("datasetsURL="+datasetsURL);

    if (datasetsURL)
    {
    	var arrayMetricsURL = datasetsURL.split(",");    		
    	for (x=0;x<arrayMetricsURL.length;x++)
    	{
    		//console.log("arrayMetricsURL[x]="+arrayMetricsURL[x])
    		if (arrayMetricsURL[x]>0)
    		{
	    		$scope.metric = Metric.get({id: arrayMetricsURL[x]},
	            function(metric) {
	            	//console.log("pppppppppppppppp");
	            	if (metric.id>0)
	            	{
	            		$scope.addFilterMetric(metric.id, metric.title, metric.issued);	
	            	}
	            	//$scope.rePlotGraph();
	            },
	            function(err) {
	                throw { message: JSON.stringify(err.data)};
	            }
	        	);
        	}
    	}    	
    }

    var eventsURL = $routeParams.events;

    if (eventsURL)
    {
    	var arrayEventsURL = eventsURL.split(",");    		
    	for (x=0;x<arrayEventsURL.length;x++)
    	{    		
    		if (arrayEventsURL[x]>0)
    		{
	    		$scope.event = Event.get({id: arrayEventsURL[x]},
	    			
	            function(event) {
	
					if (event.id>0)
					{
		            	var datosInT =  {
							id : event.id,
							title : event.title,
							startDate : event.startEventDate,
							endDate : event.endEventDate,
							color: '#000000',
							desc : event.description
						}
			
						$scope.eventsToPlot.push(datosInT);	
						
					}
	
	            },
	            function(err) {
	                throw { message: JSON.stringify(err.data)};
	            }
	            );
            }
        	
    	}    	
    }

	
	$scope.createVisualization = function(metricListIn) {
		//console.log("$scope.createVisualization create controller")
		//console.log("createVisualization");
		
		//console.log(metricListIn);
		
        $scope.visualization.user_id = 1;        				     
        $scope.visualization.views_count = 0;
        $scope.visualization.visualization_type_id = 1;
        
        
        if ($scope.typeToPlot=='graph_line')
        {
        	$scope.visualization.visualization_type_id = 1;
        }
        else if ($scope.typeToPlot=='graph_pie')
        {
        	$scope.visualization.visualization_type_id = 2;
        }
        else if ($scope.typeToPlot=='graph_bars')
        {
        	$scope.visualization.visualization_type_id = 3;
        }
        else
        {
        	$scope.visualization.visualization_type_id = 4;
        }
        
        
        $scope.visualization.status_flag_id = 0;
    	
        var dataConfig = [];
        dataConfig['graphSelected'] = $scope.typeToPlot;
        dataConfig['showLegend'] = $scope.showLegend;
        dataConfig['showLines'] = $scope.showLines;
        dataConfig['showAreas'] = $scope.showAreas;        
        dataConfig['showPoints'] = $scope.showPoints;
        dataConfig['showLabels'] = $scope.showLabels;
        dataConfig['showGrid'] = $scope.showGrid;
        dataConfig['showYAxes'] = $scope.showYAxes;
        dataConfig['showZoom'] = $scope.showZoom;
        dataConfig['showMovement'] = $scope.showMovement;
        if (!$scope.showAsPercentatge)
        {
        	$scope.showAsPercentatge=false;
        }
        dataConfig['showAsPercentatge'] = $scope.showAsPercentatge;
        dataConfig['resolution'] = $scope.resolution['value'];
        
        var dataMetrics = [];

		//for (i in $scope.MetricSelectediIndex_)        
		for (j in metricListIn)
		{
			//console.log("j="+j);
			i=metricListIn[j].id;

			//console.log("i="+i+"---$scope.MetricSelectediIndex_["+i+"]="+$scope.MetricSelectediIndex_[i])
			//console.log("i="+i);
			//console.log("i="+i+"---$scope.MetricSelectediId_["+i+"]="+$scope.MetricSelectediId_[i])
						
			//if (!isNaN($scope.MetricSelectediId_[i]))
			if (!isNaN($scope.MetricSelectediIndex_[i]))
			{
				//console.log("$scope.MetricSelectediId_["+i+"]="+$scope.MetricSelectediId_[i]);
				//console.log("$scope.MetricSelectediIndex_["+i+"]="+$scope.MetricSelectediIndex_[i]);
				var myindex = $scope.MetricSelectediIndex_[i];
//				console.log(myindex);
//				console.log($scope.IndividualSelectorLabelColumn_);
				
				value='';
				
//				console.log("myindex="+myindex);
//				console.log("$scope.IndividualSelectorLabelColumn_");
//				console.log($scope.IndividualSelectorLabelColumn_);
				/*
				if ($scope.IndividualSelectorLabelColumn_.length>0)
				{
					for (var i=0; i < $scope.IndividualSelectorLabelColumn_[myindex].length; i++) {
						if (value)
						{
							value=value+';';
						}
						value = value+$scope.IndividualSelectorLabelColumn_[myindex][i].id
					  
					}
				}	
				*/
				if ($scope.IndividualDatasetCheckboxes_.length>0)
				{				
					for (var i=0; i < $scope.IndividualDatasetCheckboxes_[myindex].length; i++) 
					{
						if (!isNaN(i))
						{
							if ($scope.IndividualDatasetCheckboxes_[myindex][i]>0)
							{
								if (value)
								{
									value=value+';';
								}
								value = value+$scope.IndividualDatasetCheckboxes_[myindex][i];
								//value = value+i;
							}
					  	}
					};
				}

				
				var selectorIndividualData = value;				


				value = '';
				//console.log($scope.dataset_color_palete_);
				//console.log($scope.dataset_color_palete_[myindex]);
				//console.log($scope.dataset_color_palete_[myindex].length);
				
				//for (var i=0; i < $scope.dataset_color_palete_[myindex].length; i++) 
				for (var i in $scope.dataset_color_palete_[myindex])
				{
					//console.log(".......i="+i);
					//console.log($scope.dataset_color_palete_[myindex][i]);
					
					if($scope.dataset_color_palete_[myindex][i])
					{
							if (value)
							{
								value=value+';';
							}
							value = value+$scope.dataset_color_palete_[myindex][i];
							//console.log("value="+value);
							//value = value+i;
					}
				};
								
				var selectorIndividualColorData = value;					
				
				//console.log("selectorIndividualColorData");
				//console.log(selectorIndividualColorData);
																						
				//var visualization_query_data = 'Label:'+selectorLabel+',Column:'+selectorDataColumn+',Grouping:'+selectorGroupingData;
				var visualization_query_data = 'Individual:'+selectorIndividualData+',Colors:'+selectorIndividualColorData;
				
				var rowMetric = {
                    metric: myindex,
                    visualization_query: visualization_query_data
                	};
             	
             	dataMetrics.push(rowMetric);   	
		
			}
		}
		
		
        
        var dataHE = [];
        
        for (i in $scope.idHE)
        {
			if (!isNaN($scope.idHE[i]))
			{
				var rowHE = {
                    historical_event: $scope.idHE[i],
                    description: $scope.descHE[i],
                    color: $scope.colorHE[i]
                };
				dataHE.push(rowHE);
			}
        }
          
		
        var data = [];
        var extra = [];


		var string_filter_configuration = "";
		for (key in dataConfig) {
			if (!string_filter_configuration=="")
			{
				string_filter_configuration = string_filter_configuration + ",";
			}
			string_filter_configuration = string_filter_configuration + key +"="+dataConfig[key];
		}
		
		//console.log("string_filter_configuration="+string_filter_configuration);
		
		
		$scope.visualization.filter_configuration = string_filter_configuration;
		
		$scope.visualization.historical_events_in_visualization = dataHE;		
		//console.log($scope.visualization.historical_events_in_visualization);
		$scope.visualization.metrics_in_visualization = dataMetrics;
		
		/*
		var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var DOMURL = self.URL || self.webkitURL || self;
		var img = new Image();		
		var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
		var imgurl = DOMURL.createObjectURL(svg);
		//console.log(imgurl);

		img.onload = function() {
    		ctx.drawImage(img, 0, 0);
    		
    		var png = canvas.toDataURL("image/png");
    		//document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
    		//console.log(png);
    		$scope.visualization.imageurlpng = png;
    		DOMURL.revokeObjectURL(png);
    		
			Visualization.save($scope.visualization,function(value, responseHeaders){
				$location.path('/visualizations/' + value.id);
			},
			function(err) {
	            throw { message: err.data};
			}
			);    		
			
		};
		img.src = imgurl;		
		*/
		
		Visualization.save($scope.visualization,function(value, responseHeaders){
				$location.path('/visualizations/' + value.id);
			},
			function(err) {
	            throw { message: err.data};
			}
			);  
		
	};


	$scope.ListMetricsFilter = [];
	$scope.metricsFilter = $scope.ListMetricsFilter;

	//$scope.rePlotGraph();

}])


angular.module('pcApp.visualization').filter('pagination', function()
{
 return function(input, start)
 {
  start = +start;
  return input.slice(start);
 };
})


.controller('ModalInstanceCtrl', [
	'$scope', 
	'VisualizationByMetric',
	'Visualization',
	'Event',
	'$filter',
	'$route',
	'$routeParams',	
	'$modalInstance', 
	'$modal', 
	'item',
	'searchclient',
	'$location', 
	'$log',
	'API_CONF',
	function($scope, VisualizationByMetric, Visualization, Event, $filter, $route, $routeParams, $modalInstance, $modal, item, searchclient, $location, $log, API_CONF) {

	//console.log("ModalInstanceCtrl");
	
	$scope.idsEventsToPlot = [];
	$scope.showLoading=true;
	
	for (i in $scope.eventsToPlot)
	{
		//$scope.idsEventsToPlot.push($scope.eventsToPlot[i].id);
		$scope.idsEventsToPlot[$scope.eventsToPlot[i].id]=$scope.eventsToPlot[i].id;
	}
	
	$scope.historicalevent_color_palete='#f7941e';
	
	$scope.metricslist=item.metricsArray;
	$scope.recomendationevents = [];
	$scope.curPage = 0;
 	$scope.pageSize = 10;
	$scope.numberOfPages = function() 
 	{
 		return Math.ceil($scope.recomendationevents.length / $scope.pageSize);
 	};

	//console.log($scope.metricslist)
	
	// in controller		
	
	//console.log(item);
	
	$scope.startDateToFilter=item.startDate;
	//$scope.startDateToFilter="";
	$scope.endDateToFilter=item.endDate;
	
	//$scope.startDateToFilter='2014-05-28';
	
	$scope.paginationEvents = 1;
	$scope.filterEvents = "";
	//$scope.startDateToFilter = "";
	$scope.paginationEvents = "";
	
	for (var i=0; i < $scope.metricslist.length; i++) {
		//console.log($scope.metricslist[i]);
		var metricId =$scope.metricslist[i]

		var arrayHE=[];
		$scope.visualizationByMetricList = VisualizationByMetric.get({id: metricId},
		function(visualizationByMetricList) {
						
			for (i in visualizationByMetricList.results)
			{							
				
				//console.log(visualizationByMetricList.results[i]);
				var idVisu = visualizationByMetricList.results[i]['visualization'];
				//console.log(idVisu);
				
				$scope.visualizationRec = Visualization.get({id: idVisu},
				function(visualizationList) {
						
						//console.log(visualizationList.historical_events_in_visualization);
						//console.log(visualizationList.historical_events_in_visualization.length);
						if (visualizationList.historical_events_in_visualization.length>0)
						{
							
							for (var i=0; i < visualizationList.historical_events_in_visualization.length; i++) {
							  
							    //console.log(visualizationList.historical_events_in_visualization[i]);
							    //console.log(visualizationList.historical_events_in_visualization[i].historical_event_id);
							    //console.log(arrayHE);
								if(arrayHE.indexOf(visualizationList.historical_events_in_visualization[i].historical_event_id)==-1)
								{
  									//console.log("element doesn't exist");
  									arrayHE[visualizationList.historical_events_in_visualization[i].historical_event_id]=visualizationList.historical_events_in_visualization[i].historical_event_id;
  									
  									var eventId =visualizationList.historical_events_in_visualization[i].historical_event_id;

									$scope.herec = Event.get({id: eventId},
            						function(herec) {
            							
            							//console.log(herec);
            							var arrayDatos =[]
            							arrayDatos['_source']=herec;
            							//$scope.recomendationevents.push(arrayDatos);
            							$scope.recomendationevents.push(herec);
            							//$scope.showLoading = false;
            		
					            	},
            						function(err) {
	                					throw { message: JSON.stringify(err.data)};
    	        					}
        							);
  									
  									
  								}
								else
								{
  									//console.log("element found");
  								}
							  
							  
							  //console.log(arrayHE);
							  
							};
							
						}
				}
				,
				function(error) {
					//alert(error.data.message);
					throw { message: JSON.stringify(error.data.message)};
				}
				);	
				
			}
			
			$scope.showLoading = false;
					
		});		
	  
	  $scope.showLoading = false;
	}
	
	
	
	$scope.findEventsByFilter = function(pagIn, textIn, text_startDateToFilter, text_endDateToFilter) {
		//console.log("findEventsByFilter");
		//console.log("pagIn="+pagIn);
		//console.log("textIn="+textIn);
		//console.log("text_startDateToFilter="+text_startDateToFilter);
		//console.log("..text_endDateToFilter="+text_endDateToFilter);
		//console.log("$scope.endDateToFilter="+$scope.endDateToFilter);
		
		
		var endDateToSearch = "";
		var startDateToSearch = "";
		
		if (pagIn)
		{

			if (pagIn=='ini')
			{
				$scope.pagToSearch=1;
			}
			else if (pagIn=='next')
			{
				//pagToSearch = pagIn.replace('?page=','');
				$scope.pagToSearch= $scope.pagToSearch+1;
			}
			else if (pagIn=='prev')
			{
				//pagToSearch = pagIn.replace('?page=','');
				$scope.pagToSearch = $scope.pagToSearch-1;
			}
			else
			{
				$scope.pagToSearch = 1;
				pagToSearch = 1;
			}
			//$scope.pagToSearch=pagToSearch;
			
			$scope.itemsperpagesize = 10;
			$scope.itemssearchfrom = ($scope.pagToSearch-1)*$scope.itemsperpagesize;			
			
		}
		else
		{
			pagToSearch = 1;
			$scope.pagToSearch = 1;
			$scope.itemssearchfrom = 0;
		}
		$scope.filterEvents = "";
		if (textIn)
		{
			$scope.filterEvents= textIn;
		}
		
		
		if (text_startDateToFilter)
		{
			$scope.startDateToFilter=text_startDateToFilter;
			startDateToSearch = text_startDateToFilter;
			startDateToSearch = $filter('date')(text_startDateToFilter, "yyyy-MM-dd");
		}
		if (text_endDateToFilter)
		{
			$scope.text_endDateToFilter=text_endDateToFilter;
			endDateToSearch = text_endDateToFilter;
			endDateToSearch = $filter('date')(text_endDateToFilter, "yyyy-MM-dd");
		}
		
		if (!endDateToSearch)
		{
			var d = new Date();
			endDateToSearch = $filter('date')(d, "yyyy-MM-dd");	
		}

		//Build Sort
		//var sort = ["title"];
		var sort = ["title.lower_case_sort"];

		//Build query
		/*
		var query = {
			  match_all: {
			  },
			  
		};
		*/
		var query = 
			{
				"filtered" : {
        			"query" : {            
    					"match_all" : {
    					}
        			}
    			}		
			};		
		
		
		if (!startDateToSearch)
		{
			startDateToSearch = '0000-01-01';	
		}
		
		//console.log("startDateToSearch="+startDateToSearch);
		//console.log("endDateToSearch="+startDateToSearch);
		
		if ($scope.filterEvents)
		{	
			query = {};
			/*
			query = 
			{
				"filtered" : {
        			"query" : {            
    					"fuzzy_like_this" : {
        					"fields" : ["title","description"],
        					"like_text" : $scope.filterEvents
    					}
        			},
        			"filter" : {
            			"and" : [
                		{
                    		"range" : {
		    	                "startEventDate" : {"gte" : startDateToSearch,}
                			}
                		},
                		{
                    		"range" : {
	    	                	"endEventDate" : {"lte" : endDateToSearch,}
                			}
                		}
            			]
        			}
    			}		
			};*/		


			query = 
			{
				"filtered" : {
        			"query" : {            
    					"fuzzy_like_this" : {
        					"fields" : ["title","description"],
        					"like_text" : $scope.filterEvents
    					}
        			}
    			}		
			};	
				
		}


	if  (startDateToSearch || endDateToSearch) 
	{
	
		query.filtered['filter'] = {
            			"and" : [
                		{
                    		"range" : {
		    	                "startEventDate" : {"gte" : startDateToSearch,}
                			}
                		},
                		{
                    		"range" : {
	    	                	"endEventDate" : {"lte" : endDateToSearch,}
                			}
                		}
            			]
        		};
	}


	
	if ($scope.itemssearchfrom<0)
	{
		$scope.itemssearchfrom = 0;		
	}
	
    //console.log("fromValue="+fromvalue);

    //Perform search through client and get a search Promise
      searchclient.search({
        index: API_CONF.ELASTIC_INDEX_NAME,
        type: 'event',
      body: {
        //size: $scope.itemsperpagesize,
        from: $scope.itemssearchfrom,
        sort:  sort,
        query: query
      }
      }).then(function(resp) {
		//If search is successfull return results in searchResults objects
        $scope.searchResults = resp.hits.hits;
        $scope.searchResultsCount = resp.hits.total;
        $scope.totalItems = $scope.searchResultsCount;
        
        $scope.events = resp;
        
      }, function(err) {
        console.trace(err.message);
      });

    //};
    				
				/*
				var query = {
				  match_all: {
				  }
				}
				;
				*/
				


				
				//console.log("----");
				//console.log($scope.events);

				//console.log("......scope.filterEvents");
				//console.log($scope.filterEvents);
		
	};	
			    
			    
	$scope.findEventsByFilter('ini', "", $scope.startDateToFilter, $scope.endDateToFilter);
			
	$scope.item = item;
      
	$scope.ok = function () {
		$modalInstance.close();		
	};
      
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	
	
}])