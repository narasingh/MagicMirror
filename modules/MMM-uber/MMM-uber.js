/* global Module */

/* Magic Mirror
 * Module: Uber
 *
 * Shows the time and surge pricing for UberX
 *
 * By Kyle Kelly
 * based on MagicMirror work by Michael Teeuw http://michaelteeuw.nl
 * and by derickson https://github.com/derickson/MMderickson/tree/master/uber
 * MIT Licensed.
 */

Module.register("MMM-uber",{

	// Default module config.
	defaults: {
		lat: null,
		lng: null,
		startLat: null,
		startLng: null,
		ride_type: "uberX",
		uberServerToken: null,

		updateInterval: 5 * 60 * 1000, // every 5 minutes
		animationSpeed: 1000,
		provider: 'google',
	  // Optional depending on the providers
	  httpAdapter: 'https', // Default
	  apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
	  formatter: null
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "https://code.jquery.com/jquery-2.2.3.min.js"];
	},

	// Define required styles.
	getStyles: function() {
		return ["MMM-uber.css"];
	},

	start: function() {
		var self = this;
		Log.info("Starting module: " + this.name);

		// Set locale.
		moment.locale(config.language);

		// variables that will be loaded from service
		this.uberTime = null;
		this.uberSurge = null;

		this.time_loaded = null;
		this.price_loaded = null;
		this.dataID = null;
		this.priceList = [];

		Log.log("Sending CONFIG to node_helper.js in " + this.name);
		Log.log("Payload: " + this.config);
		navigator.geolocation.getCurrentPosition(function (res) {
			self.config.startLat = res.coords.latitude;
			self.config.startLng = res.coords.longitude;
			self.sendSocketNotification("CONFIG", self.config);
			self.sendSocketNotification("DATA", null);
		});
		this.dataTimer();
	},

	// start interval timer to update data every 5 minutes
	dataTimer: function() {
		var self = this;
		this.dataID = setInterval(function() { self.sendSocketNotification("DATA", null); }, this.config.updateInterval);
	},

	// unload the results from uber services
	processUber: function(FLAG, result) {
		var self = this;
		Array.prototype

		Log.log("ProcessUber");

		// go through the time data to find the uberX product
		if (FLAG === "TIME"){
			Log.log("Time:");
			Log.log(result);
			for (var i = 0, count = result.times.length; i < count ; i++) {

				var rtime = result.times[i];
				this.priceList.push({
					cab_type: rtime.display_name,
					estimate_time: (rtime.estimate / 60)
				});
			}
		}

		// go through the price data to find the uberX product
		else if (FLAG === "PRICE"){
			Log.log("Price:");
			Log.log(result);
			for( var i=0, count = result.prices.length; i< count; i++) {
				var rprice = result.prices[i];

				//this.uberSurge = rprice.surge_multiplier;
				if(this.priceList[i] && this.priceList[i].cab_type === rprice.display_name) {
					this.priceList[i].estimate_cost = rprice.estimate;
					this.priceList[i].curency_code = rprice.curency_code;
					this.priceList[i].surge = rprice.surge_multiplier;
				}
			}
		}

	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		var uber = document.createElement("div");
		uber.className = "uberButton";

		var uberIcon = document.createElement("img");
		uberIcon.className = "badge";
		uberIcon.src = "modules/MMM-uber/UBER_API_Badges_1x_22px.png";

		if(this.time_loaded && this.price_loaded) {
			// create table to list uber details
			var table = document.createElement("table");
			table.className = "small";

			var row = document.createElement("tr");
			table.appendChild(row);

			for(i in this.priceList) {
				var row = document.createElement("tr");
				//row.className = "dimmed";
				table.appendChild(row);

				var cellCabType = document.createElement("td");
				cellCabType.className = "type";
				cellCabType.innerHTML = this.priceList[i].cab_type;
				row.appendChild(cellCabType);

				var cellEstimateTime = document.createElement("td");
				cellEstimateTime.className = "time";
				cellEstimateTime.innerHTML = this.priceList[i].estimate_time
				+ (~~this.priceList[i].estimate_time > 1 ? " mins" : " min");
				row.appendChild(cellEstimateTime);

				if(typeof this.priceList[i].surge !== "undefined" && this.priceList[i].surge > 1.0){
					 var cellEstimateCost = document.createElement("td");
					 cellEstimateCost.innerHTML = "X surge pricing : " + this.priceList[i].surge;
					 row.appendChild(cellEstimateCost);
				} else {
					var cellEstimateCost = document.createElement("td");
					cellEstimateCost.className = "cost";
					cellEstimateCost.innerHTML = this.priceList[i].estimate_cost;
					row.appendChild(cellEstimateCost);
				}
			}

			return table;

		} else {
			// Loading message
			var uberText = document.createElement("span");
			uberText.innerHTML = "Checking Uber status ...";
			uber.appendChild(uberIcon);
			uber.appendChild(uberText);
			wrapper.appendChild(uber);
			return wrapper;
		}
	},

	socketNotificationReceived: function(notification, payload) {
		//Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
		if (notification === "TIME") {
			this.priceList = [];
			this.processUber("TIME", JSON.parse(payload));
			this.time_loaded = true;
			this.updateDom(this.config.animationSpeed);
		}
		else if (notification === "PRICE") {
			this.processUber("PRICE", JSON.parse(payload));
			this.price_loaded = true;
			this.updateDom(this.config.animationSpeed);
		}
		else if (notification === "TIME_ERROR" || notification === "PRICE_ERROR") {
			// Stop update intervals, clear vars and wait 5 minutes to try and get another token
			clearInterval(this.dataID);
			this.dataID = null;
			this.time_loaded = false;
			this.price_loaded = false;
			this.updateDom(this.config.animationSpeed);
			this.dataTimer();
		}
	}

});
