'use strict';

/* Magic Mirror
 * Module: MMM-uber
 *
 * By Kyle Kelly
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');
var NodeGeocoder = require('node-geocoder');


module.exports = NodeHelper.create({

	start: function() {
		var self = this;
		console.log("Starting node helper for: " + this.name);

		this.config = null;
	},

	getData: function() {
		var self = this;
		self.getLocation("egl tech partk bangalore").then(function(res) {
			 res = res[0];
			 self.config.lat = res.latitude;
			 self.config.lng = res.longitude;

			 console.log(self.config);

			 request({
	 			url: "https://api.uber.com/v1/estimates/time?start_latitude=" + self.config.lat + "&start_longitude=" + self.config.lng,
	 			method: 'GET',
	 			headers: {
	 		        'Authorization': 'Token ' + self.config.uberServerToken,
	 		        'Accept-Language': 'en_US',
	 		        'Content-Type': 'application/json'
	 		    },
	 		}, function (error, response, body) {

	 			if (!error && response.statusCode == 200) {
	 				self.sendSocketNotification("TIME", body);
	 			}
	 			else {
	 				self.sendSocketNotification("TIME_ERROR", "In TIME request with status code: " + response.statusCode);
	 			}
	 		});

			 request({
	 			url: "https://api.uber.com/v1/estimates/price?start_latitude=" + self.config.startLat + "&start_longitude=" + self.config.startLng + "&end_latitude=" + self.config.lat + "&end_longitude=" + self.config.lng,
	 			method: 'GET',
	 			headers: {
	 				'Authorization': 'Token ' + self.config.uberServerToken,
	 		        'Accept-Language': 'en_US',
	 		        'Content-Type': 'application/json'
	 		    },
	 		}, function (error, response, body) {
	 			if (!error && response.statusCode == 200) {
	 				self.sendSocketNotification("PRICE", body);
	 			}
	 			else {
	 				self.sendSocketNotification("PRICE_ERROR", "In PRICE request with status code: " + response.statusCode);
	 			}
	 		});

		}).catch(function(error){
			console.log(error);
		});

	},

	getLocation: function(address) {
		var self = this;
		var options = {
			provider: self.config.provider,
			httpAdapter: self.config.httpAdapter,
			apiKey: self.config.apiKey,
			formatter: self.config.formatter
		};
		var geocoder = NodeGeocoder(options);
		return geocoder.geocode(address);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'CONFIG') {
			this.config = payload;
		}
		else if (notification === "DATA" && this.config !== null){
			this.getData();
		}
	}
});
