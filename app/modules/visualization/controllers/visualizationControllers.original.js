
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

			var configurationMetricsFilters = $scope.visualization.metrics_in_visualization[myindex].visualization_query;
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
	    			
	    			
	    			
	    		}			
			//console.log("a1");
			$scope.loadDataCombos($scope.metric.id, valueColumTemp, valueGroupTemp);
		}
		else
		{
			//console.log("a2");
			$scope.loadDataCombos($scope.metric.id,"","");	
		}
    	
    	
    

}])


////////////
.factory('VisualizationsControllerHelper', ['$filter', 'dialogs', '$log', function($filter, dialogs, $log) {
    return {
    	
    	baseVisualizationsCreateController: function($scope, $route, $routeParams, $modal, Event, Metric, Visualization, $location, helper, $log, API_CONF) {
			
			$scope.resolutionoptions = [
    			{ label: 'Daily', value: 'Daily' },
    			{ label: 'Monthly', value: 'Monthly' },
    			{ label: 'Yearly', value: 'Yearly' }
  			];
			$scope.resolution = $scope.resolutionoptions[0];
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
    
			$scope.plotPieChart = function () {
				
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
						/*
						if ($scope.visualization.id)
						{ 
							document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = document.getElementById("container_graph_"+$scope.visualization.id).innerHTML + "<div class='pie_"+$scope.visualization.id+"' id='pie_"+$scope.visualization.id+"_"+i+"' "+$style+"></div>"
						}
						else
						{
							document.getElementById("container_graph_").innerHTML = document.getElementById("container_graph_").innerHTML + "<div class='pie_' id='pie__"+i+"' "+$style+"></div>"
						}
						*/
				
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
					if ($scope.selection.Keys[k])
					{
						for (var l in $scope.numbers2) {	
												
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
			$('#filterMetrics').toggle('slow');
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
            	"Do you want to delete '"+metrictitle+"' from the list of metrics?");
        	dlg.result.then(function () {
        		
        		//console.log(metriclistIn);
        		//console.log("indexIn="+indexIn);
        		metriclistIn.splice(indexIn, 1);
        		
        		//console.log(metriclistIn.length);
        		if (metriclistIn.length==0)
        		{
        			$scope.correctmetrics = "";
        		}
        		/*
				var containerLink = document.getElementById("delete-metric-button-"+idMetric);		
					$(containerLink).parent().parent().removeClass('active');
					var str =  $(containerLink).parent().parent().attr("id");
	    			$(".metric-list-item[name='"+ str +"']").removeClass('active');		
					$scope.MetricSelectediId_[idMetric]= "";
					
					var cntMetricsInArray=0;
					
					for (x=0;x<$scope.MetricSelectediId_.length; x++) {
						//console.log("x="+x);
						
						if (!isNaN($scope.MetricSelectediId_[x]) && ($scope.MetricSelectediId_[x]!=""))
						{
							cntMetricsInArray = cntMetricsInArray+1;
							//console.log("$scope.MetricSelectediId_[x]="+$scope.MetricSelectediId_[x]);
						}
					}
					//console.log("cntMetricsInArray="+cntMetricsInArray);
					
					if (cntMetricsInArray==0)
					{
						$scope.correctmetrics = "";
					}
					*/
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
	   		//console.log("s.value="+s.value);        
	   		dateRec = s.value;
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
	    		return angular.copy({name:$scope.name, startDate:$scope.startDate, metricsArray: arrayIdsMetricsSelected}); // pass name to Dialog
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
			
		$scope.rePlotGraph = function() {
			
			
			//console.log("--rePlotGraph--");		
			var arrayJsonFiles = [];
			var datosTemporales = new Object();
			//var elems = $scope.MetricSelectediId_;
			var elems = $scope.ListMetricsFilter;
			var elemsIndex = $scope.MetricSelectediIndex_;
					
    		var cntMetrics = 0;
    		var arrayJsonFiles = [];
    		var arrayKeys = [];
    		var arrayXAxis = [];
    		var arrayYAxis = [];
    		var arrayGrouping = [];
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
						jsonFile = API_CONF.METRICS_MANAGER_URL + "/metrics/"+resIdMetric;
						//console.log("jsonFile="+jsonFile);
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
								arrayJsonFiles.push(jsonFile);
								cntMetrics = cntMetrics+1;
								
								$scope.optionToPlot[resIdMetric] = {'metricid':resIdMetric,'Label':valueXAxis,'Column':valueYAxis,'Grouping':valueGroup,'json':jsonFile};
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
			
  			q.await($scope.plotGraph);

		};


	
		$scope.plotGraph = function() {
	
			//console.log($scope.optionToPlot);
			//console.log(arguments);
			//console.log("#############");
			var numbers1 = [];
			var labelYAxe = [];
			
			var cntNumbers =0;
			var control=0;
			if ($scope.metricsFilter.length==0)
			{
				control=0;
			}
			else {
				control=1;
			}
			
			//console.log("control="+control);
			var arrayKeyPie = [];
			
			if (control==1)
			{			
				//console.log("arguments.length="+arguments.length);
				//console.log(arguments);
				
				for (var i=1; i<arguments.length; i++)
				{
					//console.log("i="+i);
					if (!isNaN(i)) 
					{
						selectorLabel = $scope.MetricSelectorLabelColumn_[arguments[i].id]
						
						//console.log("visu");
						//console.log($scope.visualization.metrics_in_visualization);
						//console.log("arguments[i].id="+arguments[i].id);
						//console.log("selectorLabel="+selectorLabel);
						
					 	//selectorDataColumn = $scope.MetricSelectorDataColumn_[arguments[i].id];
					 	
					 	//console.log(">"+$scope.MetricSelectorDataColumn_[arguments[i].id]);
					 	var ejeX = "";
					 	var ejeY = "";
					 	var selectorGroupColumn = "";
					 	//console.log("mode="+$scope.mode);
					 	
					 	//var x=document.getElementById("MetricSelectorDataColumn_"+arguments[i].id);
					 	//console.log(x);
					 	
					 	/*
					 	if ($scope.mode=='edit')
					 	{
				 			ejeY = $scope.MetricSelectorDataColumn_[arguments[i].id];
					 	}
					 	else
					 	{
					 		ejeY = $scope.MetricSelectorDataColumn_[arguments[i].id].id;
					 	}
					 	*/
					 	
					 	//console.log("arguments[i].id="+arguments[i].id);					 	
					 	//console.log($scope.optionToPlot[arguments[i].id]);
					 	
					 	//ejeY = $scope.MetricSelectorDataColumn_[arguments[i].id].id;
					 	ejeX = $scope.optionToPlot[arguments[i].id].Label;
					 	ejeY = $scope.optionToPlot[arguments[i].id].Column;
					 	//console.log("---ejeY-A="+ejeY);
					 	
					 	if (!ejeY)
					 	{
					 		var visu_query = "";
					 		if ($scope.visualization.metrics_in_visualization)
					 		{
					 			
					 			$scope.visualization.metrics_in_visualization.forEach(function(d,i) {
					 				//console.log("i="+i);
					 				
									//console.log(d);
									//console.log(d.visualization_query);
									if (d.id==arguments[i].id)
									{
										visu_query = d.visualization_query;
										
										//console.log("visu_query="+visu_query);
										
										var array_visu_query = visu_query.split(",");
										
										//console.log("array_visu_query="+array_visu_query);
										
										
										for (x=0;x<array_visu_query.length;x++)
    									{
    										
    										var dataFilter = array_visu_query[x].split(":");
    										//console.log("--------");
    										//console.log(dataFilter);
    										//console.log(dataFilter[0]);
    										//console.log(dataFilter[1]);
    										if (dataFilter[0]=='Label')
    										{
    											//console.log("llllllll");
    											ejeX = dataFilter[1];
    										}
    										else if (dataFilter[0]=='Column')
    										{
    											//console.log("cccccccc");
    											ejeY = dataFilter[1];
    										} 
    										else if (dataFilter[0]=='Grouping')
    										{
    											//console.log("ggggggggggg");
    											selectorGroupColumn = dataFilter[1];
    										} 
    										
    										
    									}
										
									}
									
								});
					 			
					 				
					 		}
					 		
					 		
					 		
					 	}
					 	
					 	
					 	//console.log("---ejeY-B="+ejeY);
					 	
					 	selectorDataColumn = 'value';					 	
					 	//ejeY = 'value';
					 	
					 	//console.log("---selectorDataColumn="+selectorDataColumn);
					 	//console.log("---ejeY-C="+ejeY);
					 	
					 	var checkGroup = "";
					 	checkGroup = ejeY;
					 	var useGroup = 0;
					 	//console.log("selectorGroupColumn="+selectorGroupColumn);
					 	if (selectorGroupColumn)
					 	{
					 		useGroup = 1;					 		
					 	}
					 	else
					 	{
						 	//console.log($scope.MetricSelectorGroupingData_[arguments[i].id]);
							selectorGroupColumn = $scope.MetricSelectorGroupingData_[arguments[i].id];
							if (selectorGroupColumn)
							{
								selectorGroupColumn = $scope.MetricSelectorGroupingData_[arguments[i].id].id;
								useGroup = 1;
							}
							else
							{
								selectorGroupColumn = 'grouping column';	
							}
						}
						checkGroup = checkGroup+"-"+selectorGroupColumn;
						
						//selectorGroupColumn = 'grouping column';
						//console.log("---selectorGroupColumn="+selectorGroupColumn);
						//console.log("---checkGroup="+checkGroup);
						//console.log("---scope.typeToPlot="+$scope.typeToPlot);
	
						if (($scope.typeToPlot==='graph_line') || ($scope.typeToPlot==='graph_pie') || ($scope.typeToPlot==='graph_bars'))
						{
							//var arrayValues = [];
							//var arrayLabels = [];
							//var arrayValuesXY = [];
	
							var arrayValues = [];
							var arrayLabels  = [];
							var arrayValuesXY  = [];
							var arrayProcessedDates = [];
							
							var numbers1T = {"Key":arguments[i].title};
							var cntPosArray=0;
							//console.log(arguments[i]);
							var labelTemporalYAxes = arguments[i]['unit']['title'];
							//console.log("--labelTemporalYAxes="+labelTemporalYAxes);
							
							//console.log("arguments[i]['data']['table']");
							//console.log(arguments[i]['data']['table']);
							
							var arrayDataToReorder = arguments[i]['data']['table'];							
							//console.log('array content before order');
							//console.log(arrayDataToReorder);
							
							//console.log('ejeX='+ejeX);
							arrayDataToReorder.sort(function(a, b) {
								
								if (ejeX=='to')
								{
									var dateA=new Date(a.to), dateB=new Date(b.to)
								}
								else
								{
									var dateA=new Date(a.from), dateB=new Date(b.from)	
								}
 								
 								return dateA-dateB //sort by date ascending
							});
							
							//console.log('array content after order');
							//console.log(arrayDataToReorder);						
							arguments[i]['data']['table'] =arrayDataToReorder;
							
							//console.log("arguments[i]['data']['table']");
							//console.log(arguments[i]['data']['table']);
							
							for (var j=0; j<arguments[i]['data']['table'].length; j++)
							{
								//console.log("..i="+i+"----j="+j);
								var object_size = 0;
								the_object = arguments[i]['data']['table'][j];
								var indexRow = "";
								var indexGroup = "";
								for (key in the_object)	{
									//console.log("key=>"+key);
									//if ((key!='from') && (key!='to') && (key!='value') && (key!='row'))
									
									var temporalKey = key;
									var temporalejeY = ejeY;
									if (useGroup==1)
									{
										temporalKey = key;
										temporalejeY = checkGroup;
									}
									
									
									if ((key==ejeY))									
									//if ((temporalKey==temporalejeY))
									{
										indexRow = arguments[i]['data']['table'][j][key];
										//console.log("indexRow="+indexRow);
									}
									
									if ((key==selectorGroupColumn))
									{
										indexGroup = arguments[i]['data']['table'][j][key];
										//console.log("indexGroup="+indexGroup);
										if (indexRow=="")
										{
											indexRow = indexGroup;
										}
										else
										{
											indexRow = indexRow+"-"+indexGroup;	
										}
										
									}
									
									
		    						if (the_object.hasOwnProperty(key)) {
		      							object_size++;		      							
		    						}
		  						}
		  						
		  						if (indexRow=="")
		  						{
		  							indexRow = arguments[i].title;
		  						}
	
								if(typeof arrayValues[indexRow] == 'undefined') {
								    // does not exist
								    arrayValues[indexRow]= new Array();
								    arrayLabels[indexRow]= new Array();
								    arrayValuesXY[indexRow]= new Array();
								    arrayProcessedDates[indexRow]= new Array();
								}
								else {
		    						// does exist
								}
								
								//arrayProcessedDates
								
								var posDateInArray = arrayProcessedDates[indexRow].indexOf(arguments[i]['data']['table'][j][selectorLabel]);
								
								//console.log("array fechas procesadas="+arrayProcessedDates[indexRow]);
								//console.log("fecha a revisar="+arguments[i]['data']['table'][j][selectorLabel]);
								//console.log("pos in array="+posDateInArray);
								
								if (posDateInArray>=0)
								{
									//this date exist in array we must mix
									//console.log("arrayValues[indexRow][posDateInArray]="+arrayValues[indexRow][posDateInArray]);
									sumaDeValores = parseFloat(arrayValues[indexRow][posDateInArray]) + parseFloat(arguments[i]['data']['table'][j][selectorDataColumn]);
									//console.log("sumaDeValores="+sumaDeValores);
									arrayValues[indexRow][posDateInArray] = sumaDeValores;
									arrayValuesXY[indexRow][posDateInArray] = arguments[i]['data']['table'][j][selectorLabel]+"|"+sumaDeValores;
								}
								else
								{
									arrayValues[indexRow].push(arguments[i]['data']['table'][j][selectorDataColumn]);						
									arrayLabels[indexRow].push(arguments[i]['data']['table'][j][selectorLabel]);
									arrayValuesXY[indexRow].push(arguments[i]['data']['table'][j][selectorLabel]+"|"+arguments[i]['data']['table'][j][selectorDataColumn]);	
									arrayProcessedDates[indexRow].push(arguments[i]['data']['table'][j][selectorLabel]);						
								}
								
								//console.log(arrayValues[indexRow]);
								//console.log(arrayLabels[indexRow]);
								//console.log(arrayValuesXY[indexRow]);								
								//console.log(arrayProcessedDates[indexRow]);
								
								cntPosArray = cntPosArray +1;
	
							}

							the_object = arrayValues;
							
							
							for (key in the_object)	{
								//console.log("***key="+key);	
								
								labelYAxe.push(labelTemporalYAxes);
								//console.log("labelTemporalYAxes="+labelTemporalYAxes);
																	
								if ($scope.typeToPlot==='graph_bars')
								{
									for (var j=0; j<arrayValues[key].length; j++)
									{
										var ObjectData = {
										'Category': "1", 
										'From':arrayValues[key][j], 
										'Key':key, 
										'labelY': labelYAxe,
										"To":arrayLabels[key][j], 
										"Value":arrayValues[key][j],
										"ValueX":arrayLabels[key][j],
										"ValueY":arrayValues[key][j], 
										"XY":arrayValuesXY[key][j]
										};
										numbers1.push(ObjectData);
									}
								}
								else if ($scope.typeToPlot==='graph_pie')
								{
									
									for (var j=0; j<arrayValues[key].length; j++)
									{
										//console.log("j="+j+"---"+arrayLabels[key][j]+'----'+arrayValues[key][j]);
										var ObjectTemporal = new Object();	
										
										if( arrayLabels[key][j] in arrayKeyPie ) {
										}
										else
										{
											arrayKeyPie[arrayLabels[key][j]] = [];
										}
										
										arrayDatos = [];
										arrayDatos['Value'] = arrayValues[key][j];
										arrayDatos['Label'] = key;
										arrayDatos['Unit'] = labelTemporalYAxes;
										//arrayKeyPie[arrayLabels[key][j]].push(arrayValues[key][j]);
										arrayKeyPie[arrayLabels[key][j]].push(arrayDatos);
										
										
										
									}
									
									//console.log(arrayKeyPie);

									var ObjectTemporal = new Object();			
									//console.log("arrayValues[key]="+arrayValues[key]);
									ObjectTemporal['Key']=key+"_"+cntNumbers;
									ObjectTemporal['Values']=arrayValues[key];
									ObjectTemporal['Labels']=arrayLabels[key];
									ObjectTemporal['ValueX']=arrayLabels[key];
									ObjectTemporal['ValueY']=arrayValues[key];
									ObjectTemporal['XY']=arrayValuesXY[key];
									ObjectTemporal['Type']='metric';
									//console.log("ObjectTemporal="+ObjectTemporal);
									numbers1[cntNumbers]=ObjectTemporal;
									cntNumbers = cntNumbers+1;
									
								}						
								else
								{			
									var ObjectTemporal = new Object();			
									//console.log("arrayValues[key]="+arrayValues[key]);
									ObjectTemporal['Key']=key+"_"+cntNumbers;
									//ObjectTemporal['Values']=arrayValues[key];
									ObjectTemporal['Labels']=arrayLabels[key];
									ObjectTemporal['ValueX']=arrayLabels[key];
									ObjectTemporal['ValueY']=arrayValues[key];
									//ObjectTemporal['XY']=arrayValuesXY[key];
									ObjectTemporal['Type']='metric';
									//console.log("ObjectTemporal="+ObjectTemporal);
									numbers1[cntNumbers]=ObjectTemporal;
									cntNumbers = cntNumbers+1;
								}
	
							}
						}
		        	}
		       }
	
			} // end if control==1
			
			
			//console.log("-------");
			//console.log(arrayKeyPie);
			
			if ($scope.typeToPlot==='graph_pie')
			{
				var numbers2 = [];
				for (posArray in arrayKeyPie)	{
					//console.log(posArray);
					//console.log("---"+posArray+"---");
					var arrayLabelsDataPie = [];
					
					
					var arrayValuesDataPie = [];
					var arrayUnitsDataPie = [];
					//console.log(arrayKeyPie[posArray]);
					for (posInArray in arrayKeyPie[posArray])	{
						//console.log(arrayKeyPie[posArray][posInArray]['Value']);
						//console.log(arrayKeyPie[posArray][posInArray]['Label']);
						arrayLabelsDataPie.push(arrayKeyPie[posArray][posInArray]['Label']);
						arrayValuesDataPie.push(arrayKeyPie[posArray][posInArray]['Value']);
						arrayUnitsDataPie.push(arrayKeyPie[posArray][posInArray]['Unit']);
					}
					
			
				
					var ObjectData = {
										'Key':posArray, 
										'Labels': arrayLabelsDataPie,
										'Values': arrayValuesDataPie,
										'Units': arrayUnitsDataPie
										};
										numbers2.push(ObjectData);
					
				}
			}
			/*			
			if ($scope.visualization.id)
			{
				document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";
			}
			else
			{
				document.getElementById("container_graph_").innerHTML = "";
			}
			*/
			//var numbers1 = [];
	        		 
			//console.log(numbers1);	        		 
	        		 
			//console.log("######plotGraph########");
			//console.log("typeToPlot="+$scope.typeToPlot);
			
				var element = document.getElementById('showYAxes');
	 			//if (typeof (element) != undefined && typeof (element) != null && typeof (element) != 'undefined') {
	 			if (element != null) {
	     			$scope.showYAxes = document.getElementById("showYAxes").checked;
	 			}

				var element = document.getElementById('showLegend');
	 			if (element != null) {
	     			$scope.showLegend = document.getElementById("showLegend").checked;
	 			}
				
				var element = document.getElementById('showLines');
	 			if (element != null) {
	     			$scope.showLines = document.getElementById("showLines").checked;
	 			}
	 			
	 			var element = document.getElementById('showAreas');
	 			if (element != null) {
	     			$scope.showAreas = document.getElementById("showAreas").checked;
	 			}

				var element = document.getElementById('showPoints');
	 			if (element != null) {
	     			$scope.showPoints = document.getElementById("showPoints").checked;
	 			}				
				
				var element = document.getElementById('showLabels');
	 			if (element != null) {
	     			$scope.showLabels = document.getElementById("showLabels").checked;
	 			}	
	 							
				var element = document.getElementById('showGrid');
	 			if (element != null) {
	     			$scope.showGrid = document.getElementById("showGrid").checked;
	 			}	
	 							
				var element = document.getElementById('showZoom');
	 			if (element != null) {
	     			$scope.showZoom = document.getElementById("showZoom").checked;
	 			}
	 			
	 			var element = document.getElementById('showMovement');
	 			if (element != null) {
	     			$scope.showMovement = document.getElementById("showMovement").checked;
	 			}
							
			
			
			if ( ($scope.typeToPlot==='map_1') 
			|| ($scope.typeToPlot==='mercator') 
			|| ($scope.typeToPlot==='conicConformal')
			|| ($scope.typeToPlot==='equirectangular')
			|| ($scope.typeToPlot==='orthographic')
			|| ($scope.typeToPlot==='azimuthalEqualArea')
			)
			{				
				/*
				if ($scope.visualization.id)
				{
					document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";
				}
				else
				{
					document.getElementById("container_graph_").innerHTML = "";
				}
				*/
				var margin = {top: 20, right: 20, bottom: 55, left: 44},
				width = 980,
				height = 326,
				font_size = 11;
				
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
					
				var mapObj = policycompass.viz.mapW(
				//var mapObj = policycompass.viz.mapW_datamaps(
				{
					'idName':"container_graph_"+$scope.visualization.id,
					'width': width,
					'height': height,
					'margin': margin,
					'font_size': font_size,
					'legend': $scope.showLegend,
					'projection': $scope.typeToPlot,
					'showZoom': $scope.showZoom,
					'showMovement': $scope.showMovement
				})
	
			}
			else if ($scope.typeToPlot==='graph_line')
			{
				
				/*
				if ($scope.visualization.id)
				{
					document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";					
				}
				else
				{
					document.getElementById("container_graph_").innerHTML = "";
				}
				*/
				
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
					//console.log("height="+height);
					/*
					if (document.getElementById("directive_container_lineschart_"+$scope.visualization.id) !=null)
					{
						document.getElementById("directive_container_lineschart_"+$scope.visualization.id).innerHTML = "";	
					} 
					else
					{	
						document.getElementById("directive_container_lineschart_").innerHTML = "";
					}
					*/
					
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
	                		barLine.render(numbers1, $scope.eventsToPlot, $scope.mode);
	                	}
	                
					}
					
	                
	                
					
				}
			}				
			else if ($scope.typeToPlot==='graph_pie')
			{
				
				//var dataset = numbers1;
				///order array by data
				if (numbers2)
				{
					numbers2.sort(function(a, b) {
						var dateA=new Date(a.Key), dateB=new Date(b.Key)
 						return dateA-dateB //sort by date ascending
					});
				}
				//var dataset = numbers2;
				$scope.dataset= numbers2;
				$scope.numbers2=numbers2;
				
				$scope.selectedAll = false;
				//console.log($scope.selectedAll);
				//$scope.dateselector = $scope.numbers2[0].Key;
				//console.log($scope.numbers2.length);
				if ($scope.numbers2.length>0)
				{
					//console.log($scope.numbers2[0].Key);
					$scope.form = {dateselector : $scope.numbers2[0].Key};
					//$scope.selection = {Keys: {$scope.numbers2[0].Key: true}};
					
					var $arrayTmp = {};
					
					for (var l in $scope.numbers2) {						
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
					//console.log($scope.selection);
					//$scope.selection = {Keys: {"50d5ad": true}};
				}
				
				
				//console.log($scope.form.dateselector);
				//console.log(dataset)
			
				$scope.plotPieChart();
	
			} 
			else if ($scope.typeToPlot==='graph_bars')
			{
				/*
				if ($scope.visualization.id)
				{
					document.getElementById("container_graph_"+$scope.visualization.id).innerHTML = "";					
				}
				else
				{
					document.getElementById("container_graph_").innerHTML = "";
				}
				*/
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
					/*
					if (document.getElementById("directive_container_lineschart_"+$scope.visualization.id) !=null)
					{
						document.getElementById("directive_container_barschart_"+$scope.visualization.id).innerHTML = "";	
					} 
					else
					{	
						document.getElementById("directive_container_barschart_").innerHTML = "";
					}
					*/
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
					
					barObj.render(datasetToSend, eventsArray);
				}
					
				
				//console.log("----------------->>>>>datasetToSend");
				//console.log(datasetToSend.length);
				
				
			}
	
	
		};
    	
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


		var colors = d3.scale.category10();
		

		var chartParams = {
			"data": {
				"2011":
					[
						{'location':'ESP', "value":125},
						{'location':'ITA', "value":50},
						{'location':'FRA', "value":75}
					]
					,
				"2012":
					[
						{'location':'ESP', "value":45},
						{'location':'ITA', "value":30},
						{'location':'FRA', "value":25}
					]
					,
				"2013":
					[
						{'location':'ESP', "value":88},
						{'location':'ITA', "value":55},
						{'location':'FRA', "value":44}
					]
					,
				"2014":
					[
						{'location':'ESP', "value":12},
						{'location':'ITA', "value":43},
						{'location':'FRA', "value":44}
					]
			}			
		};
		
//		console.log("chartParams");
//		console.log(chartParams['data']['2011']);


		
		
		$scope.loadMapExample = function(){		
			//console.log("sss");
/*
var mapOptions = {
        panControl    : true,
        zoomControl   : true,
        scaleControl  : true,
        mapTypeControl: true,
        //mapTypeId     : google.maps.MapTypeId.SATELLITE,
        mapTypeId     : google.maps.MapTypeId.TERRAIN,
    };


$scope.map = {
    center: {
        latitude: 45,
        longitude: -73
    },
    zoom: 8,
    options: mapOptions,
};
*/
/*
			$scope.map = {
			  type: 'world',
			  data: [{
			  	values: chartParams['data']['2011']
			  }],			 
			  colors: [colors(125), colors(50), colors(70)],
			  //colors: ['red', 'green', 'blue'],
			  options: {
			    width: 1110,
			    legendHeight: 60, // optionally set the padding for the legend
			    legend: true,
			  }
			}			
*/



			//console.log("---------");
			//console.log($scope.map);
		};

		$scope.loadMapExample();



		//var app = angular.module("nvd3TestApp", ['nvd3ChartDirectives']);
		//$scope.exampleData = [];
		function ExampleCtrl($scope) {
			//$scope.exampleData = 1;
			Tmp = [
          {
              "key" : "Quantity" ,
              "bar": true,
              "area": true,
              "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
          },
          {
             "key" : "Price" ,
             "area": true,
             "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98] ]
         }
     ];
 			return Tmp;			
        }


$scope.xAxisTickFormatFunction = function(){
         return function(d){
             return d3.time.format('%x')(new Date(d));  //uncomment for date format
         }
     }

		var colorScale = d3.scale.category20();
		$scope.colorFunction = function() {
			return function(d, i) {
		    	//return '#E01B5D';
		    	return colorScale(i);
		    };
		}    


		$scope.xFunction = function(){
			return function(d){
				return d[0];
			};
		}	
		

		$scope.yFunction = function(){
			return function(d){
				return d[1];
			};
		}


		$scope.toolTipContentFunction = function(){
			return function(key, x, y, e, graph) {
    		return  'Super New Tooltip' +
        	'<h1>' + key + '</h1>' +
            '<p>' +  y + ' at ' + x + '</p>'
			}
		}

        $scope.exampleData = ExampleCtrl();
        


	
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
			
			for (i in $scope.visualization.historical_events_in_visualization)
			{
				//console.log($scope.visualization.historical_events_in_visualization[i])
				$scope.idHE[(parseInt(i)+1)]=$scope.visualization.historical_events_in_visualization[i].historical_event_id;
				$scope.titleHE[(parseInt(i)+1)]=$scope.visualization.historical_events_in_visualization[i].title;
				$scope.startDateHE[(parseInt(i)+1)] = $scope.visualization.historical_events_in_visualization[i].startEventDate;
				$scope.endDateHE[(parseInt(i)+1)] = $scope.visualization.historical_events_in_visualization[i].endEventDate;
				$scope.descHE[(parseInt(i)+1)] = $scope.visualization.historical_events_in_visualization[i].description;
				$scope.colorHE[(parseInt(i)+1)] = $scope.visualization.historical_events_in_visualization[i].color;
				
				var datosInT =  {
					id : $scope.visualization.historical_events_in_visualization[i].historical_event_id,
					title : $scope.visualization.historical_events_in_visualization[i].title,
					startDate : $scope.visualization.historical_events_in_visualization[i].startEventDate,
					endDate : $scope.visualization.historical_events_in_visualization[i].endEventDate,
					desc :  $scope.visualization.historical_events_in_visualization[i].description,
					color : $scope.visualization.historical_events_in_visualization[i].color
				}
				
				$scope.eventsToPlot[i]=datosInT;	
				
				$scope.getEventDataDetail(i, $scope.visualization.historical_events_in_visualization[i]);
				
				//$scope.eventsToPlot.push(datosInT);
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
					'column': $scope.MetricSelectorLabelColumn_[id],
					'value': $scope.MetricSelectorDataColumn_[id],
					'group': $scope.MetricSelectorGroupingData_[id]				
				};
				
				$scope.ListMetricsFilter[i]=myObject;
				
				$scope.getMetricDataDetail(i, id, $scope.MetricSelectorLabelColumn_[id], $scope.MetricSelectorDataColumn_[id], $scope.MetricSelectorGroupingData_[id]);
				//console.log(myObject);
					
				//$scope.ListMetricsFilter.push(myObject);
				
				
				
				$scope.correctmetrics = "1";
//				console.log($scope.ListMetricsFilter);
			}
			
				
			//console.log(".....");
			$scope.rePlotGraph();
    
    });
    

	$scope.getEventDataDetail = function(posI, datIn) {
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
				
					$scope.eventsToPlot[posI]=myObject;	
					
            		
            	},
            	function(err) {
	                throw { message: JSON.stringify(err.data)};
    	        }
        		);
        		
			};

	$scope.getMetricDataDetail = function(posI, metricId, column, value, group) {
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
					'group': group				
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
		
        		
		//$scope.showLegend = document.getElementById("showLegend").checked;
    	//$scope.showLines = document.getElementById("showLines").checked;    	
    	//$scope.showPoints = document.getElementById("showPoints").checked;
    	//$scope.showLabels = document.getElementById("showLabels").checked;  	
    	//$scope.showGrid = document.getElementById("showGrid").checked;    	
    	//$scope.showYAxes = document.getElementById("showYAxes").checked;
    	
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
        
        var dataMetrics = [];
        //console.log(metricListIn);
        
		//for (i in $scope.MetricSelectediIndex_)
		for (j in metricListIn)
		{
			i=metricListIn[j].id;
			//console.log("i="+i+"---$scope.MetricSelectediIndex_["+i+"]="+$scope.MetricSelectediIndex_[i])
			//console.log("MetricSelectediIndex_ i="+i);
			$scope.MetricSelectediId_[i] = i;
			
			if (!isNaN($scope.MetricSelectediId_[i]))
			{				
				var myindex = $scope.MetricSelectediIndex_[i];
				//console.log("myindex="+myindex);				
				var selectorLabel = $scope.MetricSelectorLabelColumn_[myindex];
				//console.log("selectorLabel="+selectorLabel);
				
				//var selectorDataColumn = $scope.MetricSelectorDataColumn_[myindex];
				//var selectorDataColumn = $scope.MetricSelectorDataColumn_[myindex].id;
				
				//console.log("myindex="+myindex)
				var value = eval('MetricSelectorDataColumn_'+myindex+'.options[MetricSelectorDataColumn_'+myindex+'.selectedIndex].value');
				selectorDataColumn = value;
				
				//console.log("selectorDataColumn="+selectorDataColumn);
				//var selectorGroupingData = $scope.MetricSelectorGroupingData_[myindex].id;
				
				//var selectorGroupingData = $scope.MetricSelectorGroupingData_[myindex].id;
				var value = eval('MetricSelectorGroupingData_'+myindex+'.options[MetricSelectorGroupingData_'+myindex+'.selectedIndex].value');
				var selectorGroupingData = value;
				
				//console.log("selectorGroupingData="+selectorGroupingData);
														
				var visualization_query_data = 'Label:'+selectorLabel+',Column:'+selectorDataColumn+',Grouping:'+selectorGroupingData;
				//console.log("visualization_query_data="+visualization_query_data);
				
				var rowMetric = {
                    metric: $scope.MetricSelectediId_[i],
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
		
		
		//console.log("------------------");
		//console.log($scope.visualization);
		//console.log("------------------");
		
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
    		//console.log($scope.visualization.imageurlpng);
    		DOMURL.revokeObjectURL(png);

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
		
		Visualization.update($scope.visualization,function(value, responseHeaders){
				$location.path('/visualizations/' + value.id);
		},
		function(err) {
	           throw { message: err.data};
	           //console.log(err.data)
		}	
		); 
		
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
	$scope.showYAxes = true;
	$scope.showZoom = true;
	$scope.showMovement = true;
	
	
	$scope.visualization = {};

	this.historicalevent_he_id = '';
	this.historicalevent_he_title = '';
	this.historicalevent_he_startdate = '';
	this.historicalevent_he_enddate = '';
	this.historicalevent_he_description = '';


    var metricsURL = $routeParams.metrics;
    
    //console.log("metricsURL="+metricsURL);
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
        dataConfig['showAsPercentatge'] = $scope.showAsPercentatge;
               
        
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
				
				//console.log("myindex="+myindex);				
				var selectorLabel = $scope.MetricSelectorLabelColumn_[myindex];
				//console.log("selectorLabel="+selectorLabel);
				
				//var selectorDataColumn = $scope.MetricSelectorDataColumn_[myindex];
				
				var value = eval('MetricSelectorDataColumn_'+myindex+'.options[MetricSelectorDataColumn_'+myindex+'.selectedIndex].value');
				
				//console.log("selectorDataColumn="+selectorDataColumn);
				//console.log("--->value="+value);
				selectorDataColumn=value;
				
				var selectorGroupingData = $scope.MetricSelectorGroupingData_[myindex];
				//console.log("selectorGroupingData="+selectorGroupingData);
														
				var visualization_query_data = 'Label:'+selectorLabel+',Column:'+selectorDataColumn+',Grouping:'+selectorGroupingData;
				//console.log("visualization_query_data="+visualization_query_data);
				
				var rowMetric = {
                    metric: myindex,
                    visualization_query: visualization_query_data
                	};
             	
             	dataMetrics.push(rowMetric);   	
		
			}
		}
		
		//alert("STOOPfffffffffffff");
        
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
		console.log("------------------");
		console.log($scope.visualization);		
		console.log("------------------");
		*/
		
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
	$scope.startDateToFilter=item.startDate;
	//$scope.startDateToFilter="";
	$scope.endDateToFilter="";
	
	//$scope.startDateToFilter='2014-05-28';
	
	$scope.paginationEvents = 1;
	$scope.filterEvents = "";
	//$scope.startDateToFilter = "";
	$scope.paginationEvents = "";
	
	for (var i=0; i < $scope.metricslist.length; i++) {
		console.log($scope.metricslist[i]);
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
			
			
					
		});		
	  
	  
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