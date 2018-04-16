/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	port: 8080,
	ipWhitelist: ["::fff:0.0.0.0/0", "::fff:0.0.0.0/1","::fff:128.0.0.0/2", "::fff:192.0.0.0/3", "::fff:224.0.0.0/4","127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
			classes: "default everyone"
		},
		{
			module: "updatenotification",
			position: "top_bar",
			classes: "default everyone"
		},
		{
			module: "clock",
			position: "top_left",
			classes: "default everyone"
		},
		{
			module: "calendar",
			header: "INDIAN Holidays",
			position: "top_left",
			classes: "default everyone",
			config: {
				calendars: [
					{
						symbol: "calendar-check-o ",
						url: "webcal://www.calendarlabs.com/templates/ical/India-Holidays.ics"
					}
				],
				maximumEntries: 5, // Total Maximum Entries
			}
		},
		{
			module: "compliments",
			position: "lower_third",
			classes: "default everyone",
			config: {
				compliments: {
					anytime: [
						"Hey {user} how are you doing?"
					],
					morning: [
						"Good morning {user}, how are you?",
						"Good morning {user} you looks awesome today!",
						"Hey {user} you looks nice!",
						"Hello {user} have a nice day"
					],
					afternoon: [
						"{user}, looking good today"
					],
					evening: [
						"Wow {user}, you looks hot today!",
						"Hey {user}, you looks nice!"
					]
				},
				enableRepeat: false,
				updateInterval: 15000,
				fadeSpeed: 10000
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			classes: "default everyone",
			config: {
				location: "Bangalore",
				locationID: "1277333",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "964a8264bff14bd502ba4e655712ac25"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			classes: "default everyone",
			config: {
				location: "Bangalore",
				locationID: "1277333",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "964a8264bff14bd502ba4e655712ac25"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			classes: "default everyone",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
		{
			module: "MMM-Facial-Recognition",
			position: "middle_center",
			classes: "hide",
			config: {
				// 1=LBPH | 2=Fisher | 3=Eigen
				recognitionAlgorithm: 1,
				// Threshold for the confidence of a recognized face before it"s considered a
				// positive match.  Confidence values below this threshold will be considered
				// a positive match because the lower the confidence value, or distance, the
				// more confident the algorithm is that the face was correctly detected.
				lbphThreshold: 80,
				fisherThreshold: 250,
				eigenThreshold: 3000,
				// force the use of a usb webcam on raspberry pi (on other platforms this is always true automatically)
				useUSBCam: true,
				// Path to your training xml
				trainingFile: "modules/MMM-Facial-Recognition/training.xml",
				// recognition intervall in seconds (smaller number = faster but CPU intens!)
				interval: 2,
				// Logout delay after last recognition so that a user does not get instantly logged out if he turns away from the mirror for a few seconds
				logoutDelay: 15,
				// Array with usernames (copy and paste from training script)
				users: ["aneesh", "joy", "narasingh", "rituraj", "umesh", "Varghese"],
				//Module set used for strangers and if no user is detected
				defaultClass: "default",
				//Set of modules which should be shown for every user
				everyoneClass: "everyone",
				// Boolean to toggle welcomeMessage
				welcomeMessage: true
			}
		},
		{
			module: "MMM-Modulebar",
			position: "bottom_center",
			classes: "default everyone",
			config: {
				showBorder: true,
				buttons: {
					"1": {
						module: "MMM-uber",
						symbol: "taxi"
					},
					"2": {
						module: "clock",
						symbol: "music"
					},
					"3": {
						module: "compliments",
						symbol: "youtube"
					},
					"4": {
						module: "MMM-googlemaps",
						symbol: "globe"
					}
				}
			}
		},
		/*{
			module: "MMM-voice",
			position: "bottom_bar",
			config: {
				microphone: 1,
				keyword: "MAGIC MIRROR"
			}
		},*/
		{
			module: "MMM-Traffic",
			position: "top_left",
			classes: "dimmed medium default everyone", //optional, default is "bright medium", only applies to commute info not route_name
			config: {
				api_key: "AIzaSyC69ABPDSem3TkIwm8YVnmW7_jotaqU2zA",
				mode: "driving",
				origin: "Murgeshpalya, H A L Old Airport Road, Ramagiri, Murgesh Pallya, Bengaluru, Karnataka",
				destination: "Embassy Golf Links Business Park, Challaghatta, Bengaluru, Karnataka, India",
				mon_destination: "Embassy Golf Links Business Park, Challaghatta, Bengaluru, Karnataka, India",
				fri_destination: "Manayata Tech Park, Bengaluru, Karnataka, India",
				arrival_time: "0930", //optional, but needs to be in 24 hour time if used.
				route_name: "Home to Work",
				changeColor: true,
				showGreen: false,
				limitYellow: 5, //Greater than 5% of journey time due to traffic
				limitRed: 20, //Greater than 20% of journey time due to traffic
				traffic_model: "optimistic",
				interval: 120000, //2 minutes
				showWeekend: false,
				allTime: true
			}
		},
		/*
		{
			module: "MMM-uber",
			position: "middle_center",
			header: "Uber (DC)",
			classes: "default everyone",
			config: {
				lat: 0,  // use your exact pickup loaction
				lng: 0, // use your exact pickup loaction
				uberServerToken: "FsYkd403qoqIertHWHSW0MOclZ7bcgOwa08aeDeJ",
				apiKey: "AIzaSyC0VU50MLRy2OB09SWX1FoeSNNCw4qC_xE" // google map api
			}
		},*/
		/*{
			module: "MMM-googlemaps",
			position: "top_center",
			classes: "default everyone",
			config: {
				apikey: "AIzaSyC69ABPDSem3TkIwm8YVnmW7_jotaqU2zA",
				origin: "wind ternal road bangalore",
				destination: "marathahalli bangalore",
				width: "600",
				height: "390"
   		}
		},*/
		{
			module: "MMM-Profilepicture",
			position: "middle_center",
			classes: "narasingh",
			config: {
				// See below for configurable options
				url: "https://scontent.fblr2-1.fna.fbcdn.net/v/t1.0-1/p320x320/13902597_10208366924025602_7537456289282947226_n.jpg?oh=d0e3354517356aaaf75f3354c3836298&oe=5A09364B",
				opacity: "0.1"
			}
		}/*,
		{
			module: "MMM-PIR-Sensor",
			config: {
				sensorPIN: 7,
				invertSensorValue: 10,
				powerSaving: true,
				powerSavingDelay: 0,
				relayOnState: 1
			}
		}*/
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config; }
