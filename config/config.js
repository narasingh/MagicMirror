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
	ipWhitelist: [], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert"
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "INDIAN Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check-o ",
						url: "webcal://www.calendarlabs.com/templates/ical/India-Holidays.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "currentweather",
			position: "top_right",
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
			config: {
				location: "Bangalore",
				locationID: "1277333",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "964a8264bff14bd502ba4e655712ac25"
			}
		},
        {
			module: "newsfeed",
			position: "bottom_bar",
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
            module: 'aiclient',
            position: 'middle_center'
        },
        {
            module: 'aiclientdebugger',
            position: 'bottom_right'
        },
        {
            module: 'MMM-Facial-Recognition',
            position: 'middle_center',
            classes: 'default everyone',
            config: {
                        // 1=LBPH | 2=Fisher | 3=Eigen
                        recognitionAlgorithm: 1,
                        // Threshold for the confidence of a recognized face before it's considered a
                        // positive match.  Confidence values below this threshold will be considered
                        // a positive match because the lower the confidence value, or distance, the
                        // more confident the algorithm is that the face was correctly detected.
                        lbphThreshold: 50,
                        fisherThreshold: 250,
                        eigenThreshold: 3000,
                        // force the use of a usb webcam on raspberry pi (on other platforms this is always true automatically)
                        useUSBCam: false,
                        // Path to your training xml
                        trainingFile: 'modules/MMM-Facial-Recognition/training.xml',
                        // recognition intervall in seconds (smaller number = faster but CPU intens!)
                        interval: 2,
                        // Logout delay after last recognition so that a user does not get instantly logged out if he turns away from the mirror for a few seconds
                        logoutDelay: 15,
                        // Array with usernames (copy and paste from training script)
                        users: [],
                        //Module set used for strangers and if no user is detected
                        defaultClass: "default",
                        //Set of modules which should be shown for every user
                        everyoneClass: "everyone",
                        // Boolean to toggle welcomeMessage
                        welcomeMessage: true
	               }
        }
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config; }
