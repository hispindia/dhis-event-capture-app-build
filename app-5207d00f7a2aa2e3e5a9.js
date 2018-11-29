/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	var _leaflet = __webpack_require__(9);
	
	var _leaflet2 = _interopRequireDefault(_leaflet);
	
	__webpack_require__(10);
	
	__webpack_require__(11);
	
	__webpack_require__(12);
	
	__webpack_require__(18);
	
	__webpack_require__(19);
	
	__webpack_require__(24);
	
	__webpack_require__(26);
	
	__webpack_require__(27);
	
	__webpack_require__(28);
	
	__webpack_require__(29);
	
	__webpack_require__(30);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Tracker core
	delete _leaflet2.default.Icon.Default.prototype._getIconUrl;
	
	_leaflet2.default.Icon.Default.mergeOptions({
	    iconRetinaUrl: __webpack_require__(31),
	    iconUrl: __webpack_require__(23),
	    shadowUrl: __webpack_require__(32)
	});
	
	_leaflet2.default.Icon.Default.imagePath = '../dhis-web-commons/leaflet/images';
	
	/* App Module */
	
	var eventCapture = angular.module('eventCapture', ['ui.bootstrap', 'ngRoute', 'ngCookies', 'ngMessages', 'ngSanitize', 'eventCaptureDirectives', 'eventCaptureControllers', 'eventCaptureServices', 'eventCaptureFilters', 'd2Filters', 'd2Directives', 'd2Services', 'd2Controllers', 'd2Templates', 'ui.select', 'angularLocalStorage', 'pascalprecht.translate', 'leaflet-directive']).value('DHIS2URL', '../api/29').value('DHIS2COORDINATESIZE', 6).config(["$routeProvider", "$translateProvider", "$logProvider", function ($routeProvider, $translateProvider, $logProvider) {
	
	    $routeProvider.when('/', {
	        templateUrl: 'views/home.html',
	        controller: 'MainController',
	        reloadOnSearch: false
	    }).otherwise({
	        redirectTo: '/'
	    });
	
	    $translateProvider.preferredLanguage('en');
	    $translateProvider.useSanitizeValueStrategy('escaped');
	    $translateProvider.useLoader('i18nLoader');
	
	    $logProvider.debugEnabled(false);
	}]);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	/*
	 * Copyright (c) 2004-2014, University of Oslo
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are met:
	 * * Redistributions of source code must retain the above copyright notice, this
	 *   list of conditions and the following disclaimer.
	 * * Redistributions in binary form must reproduce the above copyright notice,
	 *   this list of conditions and the following disclaimer in the documentation
	 *   and/or other materials provided with the distribution.
	 * * Neither the name of the HISP project nor the names of its contributors may
	 *   be used to endorse or promote products derived from this software without
	 *   specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
	 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
	 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	
	dhis2.util.namespace('dhis2.tracker');
	
	dhis2.tracker.chunk = function( array, size ){
		if( !array.length || !size || size < 1 ){
			return []
		}
		
		var groups = [];
		var chunks = array.length / size;
		for (var i = 0, j = 0; i < chunks; i++, j += size) {
	        groups[i] = array.slice(j, j + size);
	    }
		
	    return groups;
	}
	
	dhis2.tracker.getTrackerMetaObjects = function( programs, objNames, url, filter )
	{
	    if( !programs || !programs.programIds || programs.programIds.length === 0 ){
	        return {programs: programs, programIds: programs ? programs.programIds : null};
	    }       
	
	    filter = filter + '[' + programs.programIds.toString() + ']';
	    
	    
	    return $.ajax(
	        {
	            url: url,
	            type: 'GET',
	            data:filter
	        })
	        .then( function(response) {
	            return {programs: programs, self: response[objNames], programIds: programs.programIds};
	        }, function(){
	            return null;
	        }); 
	};
	
	/*dhis2.tracker.checkAndGetTrackerObjects  = function( obj, store, url, filter, db )
	{
	    if( !obj || !obj.programs || !obj.programIds || !obj.self || !db ){
	        return;
	    }
	    
	    var mainDef = $.Deferred();
	    var mainPromise = mainDef.promise();
	
	    var def = $.Deferred();
	    var promise = def.promise();
	
	    var builder = $.Deferred();
	    var build = builder.promise();
	
	    var ids = [];
	    _.each( _.values( obj.self ), function ( obj) {
	        build = build.then(function() {
	            var d = $.Deferred();
	            var p = d.promise();
	            db.get(store, obj.id).done(function(o) {
	                //if(!o) {                    
	                    ids.push( obj.id );
	                //}
	                d.resolve();
	            });
	
	            return p;
	        });
	    });
	
	    build.done(function() {
	        def.resolve();
	        promise = promise.done( function () {
	            
	            if( ids && ids.length > 0 ){
	                var _ids = ids.toString();
	                _ids = '[' + _ids + ']';
	                filter = filter + '&filter=id:in:' + _ids + '&paging=false';
	                mainPromise = mainPromise.then( dhis2.tracker.getTrackerObjects( store, store, url, filter, 'idb', db ) );
	            }
	            
	            mainDef.resolve( obj.programs, obj.programIds );
	        } );
	    }).fail(function(){
	        mainDef.resolve( null );
	    });
	
	    builder.resolve();
	
	    return mainPromise;
	};*/
	
	dhis2.tracker.getTrackerObjects = function( store, objs, url, filter, storage, db )
	{
	
	    return $.ajax(
	        {
	            url: url,
	            type: 'GET',
	            data: filter
	        })
	        .then(function(response) {
	            if(response[objs]){
	                if(storage === 'idb'){
	                    db.setAll( store, response[objs] );                
	                }
	                if(storage === 'localStorage'){                
	                    localStorage[store] = JSON.stringify(response[objs]);
	                }            
	                if(storage === 'sessionStorage'){
	                    var SessionStorageService = angular.element('body').injector().get('SessionStorageService');
	                    SessionStorageService.set(store, response[objs]);
	                }
	                if(storage === 'temp'){
	                    return response[objs] || [];
	                }
	            }
	        });
	};
	
	dhis2.tracker.getTrackerObject = function( id, store, url, filter, storage, db )
	{
	    
	    if(id){
	        url = url + '/' + id + '.json';
	    }
	        
	    return $.ajax(
	        {
	            url: url,
	            type: 'GET',            
	            data: filter
	        })
	        .then( function( response ){
	            if(storage === 'idb'){
	                if( response && response.id) {
	                    db.set( store, response );
	                }
	            }
	            if(storage === 'localStorage'){
	                localStorage[store] = JSON.stringify(response);
	            }            
	            if(storage === 'sessionStorage'){
	                var SessionStorageService = angular.element('body').injector().get('SessionStorageService');
	                SessionStorageService.set(store, response);
	            }
	    });
	};
	
	dhis2.tracker.getBatches = function( ids, batchSize, data, store, objs, url, filter, storage, db )
	{
	    if( !ids || !ids.length || ids.length < 1){
	        
	        return data;
	    }
	    
	    var batches = dhis2.tracker.chunk( ids, batchSize );
	
	    var promises = batches.map(function(batch) { return dhis2.tracker.fetchBatchItems(batch,store, objs, url, filter, storage,db) });
	
	    return $.when.apply($, promises).then(function(){
	        return data;
	    });
	};
	
	dhis2.tracker.fetchBatchItems = function( batch, store, objs, url, filter, storage, db )
	{   
	    var ids = '[' + batch.toString() + ']';             
	    filter = filter + '&filter=id:in:' + ids;    
	    return dhis2.tracker.getTrackerObjects( store, objs, url, filter, storage, db );    
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/* Pagination service */
	/* global angular, dhis2, moment */
	
	var d2Services = angular.module('d2Services', ['ngResource'])
	
	/* Factory for loading translation strings */
	.factory('i18nLoader', function ($q, $http, SessionStorageService, DHIS2URL) {
	    
	    var getTranslationStrings = function (locale) {
	        var defaultUrl = 'i18n/i18n_app.properties';
	        var url = '';
	        if (locale === 'en' || !locale) {
	            url = defaultUrl;
	        }
	        else {
	            url = 'i18n/i18n_app_' + locale + '.properties';
	        }
	
	        var tx = {locale: locale};
	
	        var promise = $http.get(url).then(function (response) {
	            tx = {locale: locale, keys: dhis2.util.parseJavaProperties(response.data)};
	            return tx;
	        }, function () {
	
	            var p = $http.get(defaultUrl).then(function (response) {
	                tx = {locale: locale, keys: dhis2.util.parseJavaProperties(response.data)};
	                return tx;
	            });
	            return p;
	        });
	        return promise;
	    };
	
	    var getUserSetting = function () {
	        var locale = 'en';
	        
	        var promise = $http.get( DHIS2URL + '/userSettings.json?key=keyDbLocale&key=keyUiLocale&key=keyCurrentStyle&key=keyStyle').then(function (response) {
	            SessionStorageService.set('USER_SETTING', response.data);
	            if (response.data &&response.data.keyUiLocale) {
	                locale = response.data.keyUiLocale;
	            }
	            return locale;
	        }, function () {
	            return locale;
	        });
	
	        return promise;
	    };
	    return function () {
	        var deferred = $q.defer(), translations;
	        var userSetting = SessionStorageService.get('USER_SETTING');
	        if (userSetting && userSetting.keyUiLocale) {
	            getTranslationStrings(userSetting.keyUiLocale).then(function (response) {
	                translations = response.keys;
	                deferred.resolve(translations);
	            });
	            return deferred.promise;
	        }
	        else {
	            getUserSetting().then(function (locale) {
	                getTranslationStrings(locale).then(function (response) {
	                    translations = response.keys;
	                    deferred.resolve(translations);
	                });
	            });
	            return deferred.promise;
	        }
	    };
	})
	    
	.service('AuthorityService', function () {
	    var getAuthorities = function (roles) {
	        var authority = {};
	        if (roles && roles.userCredentials && roles.userCredentials.userRoles) {
	            angular.forEach(roles.userCredentials.userRoles, function (role) {
	                angular.forEach(role.authorities, function (auth) {
	                    authority[auth] = true;
	                });
	            });
	        }
	        return authority;
	    };
	
	    return {
	        getUserAuthorities: function (roles) {
	            var auth = getAuthorities(roles);
	            var authority = {};
	            var allAuth = auth['ALL'];
	            authority.ALL = allAuth;
	            authority.canCascadeDeleteTei = auth['F_TEI_CASCADE_DELETE'] || allAuth;
	            authority.canUncompleteEvent = auth['F_UNCOMPLETE_EVENT'] || allAuth;
	            authority.canCascadeDeleteEnrollment = auth['F_ENROLLMENT_CASCADE_DELETE'] || allAuth;
	            authority.canReopenDataSet = auth['F_DATASET_REOPEN'] || allAuth;
	            authority.canEditExpiredStuff = auth['F_EDIT_EXPIRED_STUFF'] || allAuth;
	            authority.canAdministerDashboard = auth['F_PROGRAM_DASHBOARD_CONFIG_ADMIN'] || allAuth;
	            return authority;
	        }
	    };
	})
	
	/* Factory for loading external data */
	.factory('ExternalDataFactory', function ($http) {
	
	    return {
	        get: function (fileName) {
	            var promise = $http.get(fileName).then(function (response) {
	                return response.data;
	            });
	            return promise;
	        }
	    };
	})
	
	/* service for wrapping sessionStorage '*/
	.service('SessionStorageService', function ($window) {
	    return {
	        get: function (key) {
	            return JSON.parse($window.sessionStorage.getItem(key));
	        },
	        set: function (key, obj) {
	            $window.sessionStorage.setItem(key, JSON.stringify(obj));
	        },
	        clearAll: function () {
	            for (var key in $window.sessionStorage) {
	                $window.sessionStorage.removeItem(key);
	            }
	        }
	    };
	})
	
	/* service for getting calendar setting */
	.service('CalendarService', function (storage, $rootScope) {
	
	    return {
	        getSetting: function () {
	
	            var dhis2CalendarFormat = {keyDateFormat: 'yyyy-MM-dd', keyCalendar: 'gregorian', momentFormat: 'YYYY-MM-DD'};
	            var storedFormat = storage.get('SYSTEM_SETTING');
	            
	            if (angular.isObject(storedFormat) && storedFormat.keyDateFormat && storedFormat.keyCalendar) {
	                if (storedFormat.keyCalendar === 'iso8601') {
	                    storedFormat.keyCalendar = 'gregorian';
	                }
	
	                if (storedFormat.keyDateFormat === 'dd-MM-yyyy') {
	                    dhis2CalendarFormat.momentFormat = 'DD-MM-YYYY';
	                }
	
	                dhis2CalendarFormat.keyCalendar = storedFormat.keyCalendar;
	                dhis2CalendarFormat.keyDateFormat = storedFormat.keyDateFormat;
	            }
	            $rootScope.dhis2CalendarFormat = dhis2CalendarFormat;
	            return dhis2CalendarFormat;
	        }
	    };
	})
	
	/* service for dealing with dates */
	.service('DateUtils', function ($filter, CalendarService, NotificationService, $translate) {
	    var formatDate = function(date){
	       return date.substring(6,10) + '-' + date.substring(3,5) + '-' + date.substring(0,2);
	    };
	    return {        
	        getDate: function (dateValue) {
	            if (!dateValue) {
	                return;
	            }
	            var calendarSetting = CalendarService.getSetting();
	            dateValue = moment(dateValue, calendarSetting.momentFormat)._d;
	            return Date.parse(dateValue);
	        },
	        format: function (dateValue) {
	            if (!dateValue) {
	                return;
	            }
	
	            var calendarSetting = CalendarService.getSetting();
	            dateValue = moment(dateValue, calendarSetting.momentFormat)._d;
	            dateValue = $filter('date')(dateValue, calendarSetting.keyDateFormat);
	            return dateValue;
	        },
	        formatToHrsMins: function (dateValue) {
	            var calendarSetting = CalendarService.getSetting();
	            var dateFormat = 'YYYY-MM-DD @ hh:mm A';
	            if (calendarSetting.keyDateFormat === 'dd-MM-yyyy') {
	                dateFormat = 'DD-MM-YYYY @ hh:mm A';
	            }
	            return moment(dateValue).format(dateFormat);
	        },
	        formatToHrsMinsSecs: function (dateValue) {
	            var calendarSetting = CalendarService.getSetting();
	            var dateFormat = 'YYYY-MM-DD @ hh:mm:ss A';
	            if (calendarSetting.keyDateFormat === 'dd-MM-yyyy') {
	                dateFormat = 'DD-MM-YYYY @ hh:mm:ss A';
	            }
	            return moment(dateValue).format(dateFormat);
	        },
	        getToday: function () {
	            var calendarSetting = CalendarService.getSetting();
	            var tdy = $.calendars.instance(calendarSetting.keyCalendar).newDate();
	            var today = moment(tdy._year + '-' + tdy._month + '-' + tdy._day, 'YYYY-MM-DD')._d;
	            today = Date.parse(today);
	            today = $filter('date')(today, calendarSetting.keyDateFormat);
	            return today;
	        },
	        isValid: function( dateValue ){
	            if( !dateValue ){
	                return false;
	            }
	            var convertedDate = this.format(angular.copy(dateValue));
	            return dateValue === convertedDate;
	        },
	        isBeforeToday: function (dateValue) {
	            if (!dateValue) {
	                return;
	            }
	            dateValue = moment(dateValue, "YYYY-MM-DD");
	            if (dateValue.isBefore(moment())) {
	                return true;
	            }
	            return false;
	        },
	        isAfterToday: function (dateValue) {
	            if (!dateValue) {
	                return;
	            }
	            dateValue = moment(dateValue, "YYYY-MM-DD");
	            if (dateValue.isAfter(moment())) {
	                return true;
	            }
	            return false;
	        },
	        formatFromUserToApi: function (dateValue) {
	            if (!dateValue) {
	                return;
	            }
	            var calendarSetting = CalendarService.getSetting();
	            dateValue = moment(dateValue, calendarSetting.momentFormat)._d;
	            dateValue = Date.parse(dateValue);
	            dateValue = $filter('date')(dateValue, 'yyyy-MM-dd');
	            return dateValue;
	        },
	        formatFromApiToUser: function (dateValue) {
	            if (!dateValue) {
	                return;
	            }
	            var calendarSetting = CalendarService.getSetting();
	            if (moment(dateValue, calendarSetting.momentFormat).format(calendarSetting.momentFormat) === dateValue) {
	                return dateValue;
	            }
	            dateValue = moment(dateValue, 'YYYY-MM-DD')._d;
	            return $filter('date')(dateValue, calendarSetting.keyDateFormat);
	        },
	        formatFromApiToUserCalendar: function (dateValue) {
	            if (!dateValue) {
	                return;
	            }
	
	            var calendarSetting = CalendarService.getSetting();
	
	            //A bit hacky way to check if format id dd-mm-yyyy.
	            if(dateValue.charAt(2) === '-') {
	                dateValue = moment(dateValue, calendarSetting.momentFormat)._d;
	                dateValue = Date.parse(dateValue);
	                dateValue = $filter('date')(dateValue, 'yyyy-MM-dd');
	            }
	
	            var splitDate = dateValue.split('-');
	
	            //Months are for some reason 0 based.
	            var date = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
	
	            if(calendarSetting.keyCalendar === 'ethiopian') {
	                date = date.toLocaleDateString('en-GB-u-ca-ethiopic');
	
	            } else if(calendarSetting.keyCalendar === 'coptic') {
	                date = date.toLocaleDateString('en-GB-u-ca-coptic');
	
	            } else if(calendarSetting.keyCalendar === 'gregorian') {
	                date = date.toLocaleDateString('en-GB-u-ca-gregory');
	
	            } else if(calendarSetting.keyCalendar === 'islamic') {
	                date = date.toLocaleDateString('en-GB-u-ca-islamic');
	                
	            } else if(calendarSetting.keyCalendar === 'iso8601') {
	                date = date.toLocaleDateString('en-GB-u-ca-iso8601');
	            
	            } else if(calendarSetting.keyCalendar === 'persian') {
	                date = date.toLocaleDateString('en-GB-u-ca-persian');
	                
	            } else if(calendarSetting.keyCalendar === 'thai') {
	                date = date.toLocaleDateString('en-GB-u-ca-buddhist');
	                
	            } else if(calendarSetting.keyCalendar === 'nepali') {
	                date = date.toLocaleDateString('en-GB-u-ca-ne');
	                
	            } else {
	                date = date.toLocaleDateString('en-GB-u-ca-iso8601');
	            
	            }
	            
	            date = formatDate(date);
	            return date;
	        },
	        getDateAfterOffsetDays: function (offSetDays) {
	            var date = new Date();
	            date.setDate(date.getDate()+offSetDays);
	            var calendarSetting = CalendarService.getSetting();
	            var tdy = $.calendars.instance(calendarSetting.keyCalendar).fromJSDate(date);
	            var dateAfterOffset = moment(tdy._year + '-' + tdy._month + '-' + tdy._day, 'YYYY-MM-DD')._d;
	            dateAfterOffset = Date.parse(dateAfterOffset);
	            dateAfterOffset = $filter('date')(dateAfterOffset, calendarSetting.keyDateFormat);
	            return dateAfterOffset;
	        },
	        verifyExpiryDate: function(date, expiryPeriodType, expiryDays, showNotifications){
	            var eventPeriodEndDate, eventDate, eventPeriod;
	            var isValid = true;
	            var calendarSetting, dateFormat, generator, today;
	            if(!date || !expiryPeriodType || !expiryDays) {
	                return isValid;
	            }
	            calendarSetting = CalendarService.getSetting();
	            dateFormat = calendarSetting.momentFormat;
	            generator = new dhis2.period.PeriodGenerator($.calendars.instance(calendarSetting.keyCalendar), dateFormat);
	            today = moment(this.getToday(), dateFormat);
	            eventDate = moment(date, dateFormat);
	            eventPeriod = generator.getPeriodForTheDate(eventDate.format("YYYY-MM-DD"), expiryPeriodType, true);
	            if (eventPeriod && eventPeriod.endDate) {
	                eventPeriodEndDate = moment(eventPeriod.endDate, "YYYY-MM-DD").add(expiryDays, "days");
	                if (today.isAfter(eventPeriodEndDate)) {
	                    if(showNotifications){
	                        NotificationService.showNotifcationDialog($translate.instant("error"), $translate.instant("event_date_out_of_range"));
	                    }
	                    isValid = false;
	                }
	            }
	            return isValid;
	        },
	        verifyOrgUnitPeriodDate: function(date, periodStartDate, periodEndDate) {
	            var isValid = true;
	            var dateFormat, startDate, endDate, eventDate, calendarSetting;
	            if(!date) {
	                hideHeaderMessage();
	                return isValid;
	            }
	            if (!periodStartDate && !periodEndDate) {
	                hideHeaderMessage();
	                return isValid;
	            } else {
	                calendarSetting = CalendarService.getSetting();
	                dateFormat = calendarSetting.momentFormat;
	                eventDate = moment(date, dateFormat);
	                if (!periodStartDate) {
	                    endDate = moment(periodEndDate, "YYYY-MM-DD");
	                    if (eventDate.isAfter(endDate)) {
	                        isValid = false;
	                    }
	                } else if (!periodEndDate) {
	                    startDate = moment(periodStartDate, "YYYY-MM-DD");
	                    if (eventDate.isBefore(startDate)) {
	                        isValid = false;
	                    }
	                } else {
	                    startDate = moment(periodStartDate, "YYYY-MM-DD");
	                    endDate = moment(periodEndDate, "YYYY-MM-DD");
	                    if (eventDate.isBefore(startDate) || eventDate.isAfter(endDate)) {
	                        isValid = false;
	                    }
	                }
	            }
	            if(!isValid) {
	                setHeaderDelayMessage($translate.instant("date_out_of_ou_period"));
	            } else {
	                hideHeaderMessage();
	            }
	            return isValid;
	        },
	        getAge: function( _dob ){
	            var calendarSetting = CalendarService.getSetting();
	
	            var tdy = $.calendars.instance(calendarSetting.keyCalendar).newDate();
	            var now = moment(tdy._year + '-' + tdy._month + '-' + tdy._day, 'YYYY-MM-DD')._d;
	            now = Date.parse(now);
	            now = $filter('date')(now, calendarSetting.keyDateFormat);
	            now = moment( now, calendarSetting.momentFormat);
	
	            var dob = moment( _dob, calendarSetting.momentFormat);
	            var age = {};
	            age.years = now.diff(dob, 'years');
	            dob.add(age.years, 'years');
	
	            age.months = now.diff(dob, 'months');
	            dob.add(age.months, 'months');
	
	            age.days = now.diff(dob, 'days');
	            
	            return age;
	        },
	        getDateFromUTCString: function(utcDateTimeString) {
	            var calendarSetting = CalendarService.getSetting();
	            return moment(utcDateTimeString).format(calendarSetting.momentFormat);
	        }
	    };
	})
	
	.service('UsersService', function( $http, $translate) {
	    return {
	        getAll: function(){
	            var promise = $http.get("../api/users?paging=false&fields=*").then(function (response) {
	                var users = [];
	                angular.forEach(response.data.users, function (user) {
	                    var userObj = {username: user.userCredentials.username, orgUnits: user.organisationUnits};
	                    users.push(userObj);
	                });
	                return users;
	            });
	            return promise;
	        }
	    };
	}) 
	
	/* Service for option name<->code conversion */
	.factory('OptionSetService', function() {
	    return {
	        getCode: function(options, key){
	            if(options){
	                for(var i=0; i<options.length; i++){
	                    if( key === options[i].displayName){
	                        return options[i].code;
	                    }
	                }
	            }
	            return key;
	        },
	        getName: function(options, key){
	            if(options){
	                for(var i=0; i<options.length; i++){
	                    if( key === options[i].code){
	                        return options[i].displayName;
	                    }
	                }
	            }
	            return key;
	        }
	    };
	})
	
	/* service for common utils */
	.service('CommonUtils', function($translate, DateUtils, OptionSetService, CurrentSelection, FileService, OrgUnitFactory, NotificationService, SessionStorageService, storage){
	    
	    var setFileName = function(event, valueId, dataElementId){
	        var fileNames = CurrentSelection.getFileNames() || {};
	        FileService.get(valueId).then(function(response){
	            if(response && response.displayName){
	                if(!fileNames[event.event]){
	                    fileNames[event.event] = {};
	                }
	                fileNames[event.event][dataElementId] = response.displayName;
	                CurrentSelection.setFileNames( fileNames );
	            }
	        });
	    };
	    
	    var setOrgUnitName = function( id ){
	        var orgUnitNames = CurrentSelection.getOrgUnitNames() || {};
	        if( !orgUnitNames[id] ){                
	            OrgUnitFactory.getFromStoreOrServer( id ).then(function (response) {
	                if(response && response.displayName) {                                                        
	                    orgUnitNames[id] = response.displayName;
	                    CurrentSelection.setOrgUnitNames( orgUnitNames );
	                }
	            });
	        }
	    };
	    
	    return {
	        formatDataValue: function(event, val, obj, optionSets, destination){
	            if(val && (
	                obj.valueType === 'NUMBER' ||
	                obj.valueType === 'PERCENTAGE' ||
	                obj.valueType === 'INTEGER' ||
	                obj.valueType === 'INTEGER_POSITIVE' ||
	                obj.valueType === 'INTEGER_NEGATIVE' ||
	                obj.valueType === 'INTEGER_ZERO_OR_POSITIVE')){
	                if( dhis2.validation.isNumber(val)){
	                    if(obj.valueType === 'NUMBER'){
	                        val = parseFloat(val);
	                    }else{
	                        val = parseInt(val);
	                    }
	                }
	            }
	            if((val || val === 0) && obj.optionSetValue && obj.optionSet && obj.optionSet.id && optionSets[obj.optionSet.id] && optionSets[obj.optionSet.id].options  ){
	                if(destination === 'USER'){
	                    val = OptionSetService.getName(optionSets[obj.optionSet.id].options, String(val));
	                }
	                else{
	                    val = OptionSetService.getCode(optionSets[obj.optionSet.id].options, val);
	                }
	
	            }
	            if(val && obj.valueType === 'DATE'){
	                if(destination === 'USER'){
	                    val = DateUtils.formatFromApiToUser(val);
	                }
	                else{
	                    val = DateUtils.formatFromUserToApi(val);
	                }
	            }
	            if(obj.valueType === 'TRUE_ONLY'){
	                if(destination === 'USER'){
	                    val = val === 'true' ? true : '';
	                }
	                else{
	                    val = val === true ? 'true' : '';
	                }
	            }
	            if( val && obj.valueType === 'ORGANISATION_UNIT' ){
	                if( destination === 'USER' ){                    
	                    setOrgUnitName( val );
	                }
	            }
	            if(event && val && destination === 'USER' && obj.valueType === 'FILE_RESOURCE'){                
	                setFileName(event, val, obj.id);
	            }
	            return val;
	        },
	        displayBooleanAsYesNo: function(value, dataElement){
	            if(angular.isUndefined(dataElement) || dataElement.valueType === "BOOLEAN"){
	                if(value === "true" || value === true){
	                    return "Yes";
	                }
	                else if(value === "false" || value === false){
	                    return "No";
	                }
	            }
	            return value;
	        },
	        userHasValidRole: function(obj, prop, userRoles){
	        	if( !obj || !prop || !userRoles){
	                return false;
	        	}
	        	for(var i=0; i < userRoles.length; i++){            
	                if( userRoles[i].authorities && userRoles[i].authorities.indexOf('ALL') !== -1 ){
	                    return true;
	                }
	                if( userRoles[i][prop] && userRoles[i][prop].length > 0 ){
	                    for( var j=0; j< userRoles[i][prop].length; j++){
	                        if( obj.id === userRoles[i][prop][j].id ){
	                            return true;
	                        }
	                    }
	                }
	            }
	            return false;            	
	        },        
	        checkAndSetOrgUnitName: function( id ){
	            setOrgUnitName( id );
	        },
	        checkAndSetFileName: function(event, valueId, dataElementId ){
	            setFileName(event, valueId, dataElementId);
	        },
	        getUsername: function(){            
	            var userProfile = SessionStorageService.get('USER_PROFILE');
	            var username = userProfile && userProfile.userCredentials && userProfile.userCredentials.username ? userProfile.userCredentials.username : '';
	            return username;
	        },
	        getSystemSetting: function(){
	            var settings = storage.get('SYSTEM_SETTING');            
	            return settings;
	        }
	    };
	})
	
	/* service for dealing with custom form */
	.service('CustomFormService', function ($translate, NotificationService) {
	
	    return {
	        getForProgramStage: function (programStage, programStageDataElements) {
	
	            var htmlCode = programStage.dataEntryForm ? programStage.dataEntryForm.htmlCode : null;
	            var timeFormat = "24h"
	
	            if (htmlCode) {
	                var inputRegex = /<input.*?\/>/g,
	                    match,
	                    inputFields = [],
	                    hasEventDate = false;
	
	                while (match = inputRegex.exec(htmlCode)) {
	                    inputFields.push(match[0]);
	                }
	
	                for (var i = 0; i < inputFields.length; i++) {
	                    var inputField = inputFields[i];
	                    
	                    var inputElement = $.parseHTML(inputField);
	                    var attributes = {};
	
	                    $(inputElement[0].attributes).each(function () {
	                        attributes[this.nodeName] = this.value;
	                    });
	
	                    var fieldId = '', newInputField;
	                    if (attributes.hasOwnProperty('id')) {
	
	                        if (attributes['id'] === 'executionDate') {
	                            fieldId = 'eventDate';
	                            hasEventDate = true;
	
	                            //name needs to be unique so that it can be used for validation in angularjs
	                            if (attributes.hasOwnProperty('name')) {
	                                attributes['name'] = fieldId;
	                            }
	
	                            newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><input type="text" ' +
	                                this.getAttributesAsString(attributes) +
	                                ' ng-model="currentEvent.' + fieldId + '"' +
	                                ' ng-disabled="model.editingDisabled"' +
	                                ' input-field-id="' + fieldId + '"' +
	                                ' d2-date ' +
	                                ' d2-date-validator ' +
	                                ' max-date="' + 0 + '"' +
	                                ' ng-attr-placeholder="{{dhis2CalendarFormat.keyDateFormat}}" ' +
	                                ' ng-change="verifyExpiryDate(currentEvent.' + fieldId + ')"'+
	                                ' ng-class="getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id,true)"' +
	                                ' blur-or-change="saveDatavalue(prStDes.' + fieldId + ')"' +
	                                ' ng-required="{{true}}"></span><span class="not-for-screen"><input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}></span>';
	                        }
	                        else {
	                            fieldId = attributes['id'].substring(4, attributes['id'].length - 1).split("-")[1];
	
	                            //name needs to be unique so that it can be used for validation in angularjs
	                            if (attributes.hasOwnProperty('name')) {
	                                attributes['name'] = fieldId;
	                            }
	
	                            var prStDe = programStageDataElements[fieldId];
	
	                            if (prStDe && prStDe.dataElement && prStDe.dataElement.valueType) {
	
	                                var disableInputField = '!dataElementEditable(prStDes.' + fieldId+')';
	                                var commonInputFieldProperty = this.getAttributesAsString(attributes) +
	                                    ' ng-model="currentEvent.' + fieldId + '" ' +
	                                    ' input-field-id="' + fieldId + '"' +
	                                    ' ng-disabled="' + disableInputField + '"' + 
	                                    ' ng-required="{{prStDes.' + fieldId + '.compulsory}}" ';
	
	                                
	                                //check if dataelement has optionset
	                                if (prStDe.dataElement.optionSetValue) {
	                                    var optionSetId = prStDe.dataElement.optionSet.id;
	                                    newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><ui-select theme="select2" ' + commonInputFieldProperty + ' ng-disabled="model.editingDisabled" on-select="saveDatavalue(prStDes.' + fieldId + ', outerForm.' + fieldId + ')" >' +
	                                        '<ui-select-match ng-class="getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id, true)" allow-clear="true" ng-attr-placeholder="' + $translate.instant('select_or_search') + '">{{$select.selected.displayName || $select.selected}}</ui-select-match>' +
	                                        '<ui-select-choices ' +
	                                        ' repeat="option.displayName as option in optionSets.' + optionSetId + '.options | filter: $select.search | limitTo:maxOptionSize">' +
	                                        '<span ng-bind-html="option.displayName | highlight: $select.search">' +
	                                        '</span>' +
	                                        '</ui-select-choices>' +
	                                        '</ui-select></span><span class="not-for-screen"><input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}></span>';
	                                }
	                                else {
	                                    //check data element type and generate corresponding angular input field
	                                    if (prStDe.dataElement.valueType === "NUMBER" ||
	                                        prStDe.dataElement.valueType === "PERCENTAGE" ||
	                                        prStDe.dataElement.valueType === "INTEGER" ||
	                                        prStDe.dataElement.valueType === "INTEGER_POSITIVE" ||
	                                        prStDe.dataElement.valueType === "INTEGER_NEGATIVE" ||
	                                        prStDe.dataElement.valueType === "INTEGER_ZERO_OR_POSITIVE") {
	                                        newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><input type="number" ' +
	                                            ' d2-number-validator ' +
	                                            //' ng-class="{{getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id, true)}}" ' +
	                                            ' ng-class="getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id, true)" ' +
	                                            ' number-type="' + prStDe.dataElement.valueType + '" ' +
	                                            ' ng-blur="saveDatavalue(prStDes.' + fieldId + ', outerForm.' + fieldId + ')"' +
	                                            commonInputFieldProperty + 'ng-disabled="model.editingDisabled"></span><span class="not-for-screen"><input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}></span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "BOOLEAN") {
	                                    	newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><d2-radio-button ' +
	                                                                    ' dh-required="prStDes.' + fieldId + '.compulsory" ' +
	                                                                    ' dh-disabled="' + disableInputField + '"' +
	                                                                    ' dh-value="currentEvent.' + fieldId + '" ' +
	                                                                    ' dh-name="' + fieldId + '" ' +
	                                                                    ' dh-current-element="currentElement" ' +
	                                                                    ' dh-event="currentEvent.event" ' +
	                                                                    ' dh-id="prStDes.' + fieldId + '.dataElement.id" ' +
	                                                                    ' dh-click="saveDataValueForRadio(prStDes.' + fieldId + ', currentEvent, value )">' +
	                                                            ' </d2-radio-button></span> ' +
	                                                            '<span class="not-for-screen">' +
	                                                            	'<label class="radio-inline"><input type="radio" ng-attr-value="true" ng-model="currentEvent.' + fieldId +'">{{\'yes\' | translate}}</label>' +
	                                                            	'<label class="radio-inline"><input type="radio" ng-attr-value="false" ng-model="currentEvent.' + fieldId + '">{{\'no\' | translate}}</label>' +
	                                                            '</span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "DATE") {
	                                        var maxDate = prStDe.allowFutureDate ? '' : 0;
	                                        newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><input type="text" ' +
	                                            ' ng-attr-placeholder="{{dhis2CalendarFormat.keyDateFormat}}" ' +
	                                            ' ng-class="getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id, true)" ' +
	                                            ' d2-date ' +
	                                            ' d2-date-validator ' +
	                                            ' max-date="' + maxDate + '"' +
	                                            ' blur-or-change="saveDatavalue(prStDes.' + fieldId + ', outerForm.' + fieldId + ')"' +
	                                            commonInputFieldProperty + ' ></span><span class="not-for-screen"><input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}></span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "TRUE_ONLY") {
	                                        newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><input type="checkbox" ' +
	                                            ' ng-class="getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id, true)" ' +
	                                            ' ng-change="saveDatavalue(prStDes.' + fieldId + ', outerForm.' + fieldId + ')"' +
	                                            commonInputFieldProperty + ' ></span><span class="not-for-screen"><input type="checkbox" ng-checked={{currentEvent.' + fieldId + '}}></span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "LONG_TEXT") {
	                                        newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><textarea row="3" ' +
	                                            ' ng-class="getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id, true)" ' +
	                                            ' ng-blur="saveDatavalue(prStDes.' + fieldId + ', outerForm.' + fieldId + ')"' +
	                                            commonInputFieldProperty + '></textarea></span><span class="not-for-screen"><textarea row="3" ng-attr-value={{currentEvent.' + fieldId + '}}></textarea></span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "FILE_RESOURCE") {
	                                        newInputField = '<span ng-disabled="' + disableInputField + '" class="input-group hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)">\n\
	                                                        <span ng-if="currentEvent.' + fieldId + '">\n\
	                                                            <a href ng-click="downloadFile(null, \'' + fieldId + '\', null)" ng-attr-title="fileNames[currentEvent.event][' + fieldId + ']" >{{fileNames[currentEvent.event][' + fieldId + '].length > 20 ? fileNames[currentEvent.event][' + fieldId + '].substring(0,20).concat(\'...\') : fileNames[currentEvent.event][' + fieldId + ']}}</a>\n\
	                                                        </span>\n\
	                                                        <span class="input-group-btn">\n\
	                                                            <span class="btn btn-grp btn-file">\n\
	                                                                <span ng-if="currentEvent.' + fieldId + '" ng-attr-title="{{\'delete\' | translate}}" d2-file-input-name="fileNames[currentEvent.event][' + fieldId + ']" d2-file-input-delete="currentEvent.' + fieldId + '">\n\
	                                                                    <a href ng-click="deleteFile(\'' + fieldId + '\')"><i class="fa fa-trash alert-danger"></i></a>\n\
	                                                                </span>\n\
	                                                                <span ng-if="!currentEvent.' + fieldId + '" ng-attr-title="{{\'upload\' | translate}}" >\n\
	                                                                    <i class="fa fa-upload"></i>\n\
	                                                                    <input  type="file" \n\
	                                                                            ' + this.getAttributesAsString(attributes) + '\n\
	                                                                            input-field-id="' + fieldId + '"\n\
	                                                                            d2-file-input-ps="currentStage"\n\
	                                                                            d2-file-input="currentEvent"\n\
	                                                                            d2-file-input-current-name="currentFileNames"\n\
	                                                                            d2-file-input-name="fileNames">\n\
	                                                                </span>\n\
	                                                            </span>\n\
	                                                        </span>\n\
	                                                    </span>' 
	                                                    '<span class="not-for-screen">' +
	                                                    	'<input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}' +
	                                                    '</span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "AGE") {
	                                    	newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><d2-age ' +
	                                    							' id=" ' + fieldId + '" ' +
							                                        ' d2-object="currentEvent" ' + 
							                                        ' d2-disabled="' + disableInputField + '"' +
	                                                                ' d2-required="prStDes.' + fieldId + '.compulsory" ' +
							                                        ' d2-function="saveDatavalue(arg1)" ' +						                                        
							                                        ' d2-function-param-text="prStDes.' + fieldId + '" >' +
							                                '</d2-age></span>' +
	                                                        '<span class="not-for-screen">' +
	                                                    		'<input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}' +
	                                                    	'</span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "COORDINATE") {
	                                    	newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><d2-map ' +
	                                    							' id=" ' + fieldId + '" ' +
							                                        ' d2-object="currentEvent" ' + 
							                                        ' d2-coordinate-format="\'TEXT\'" ' + 
							                                        ' d2-disabled="'+ disableInputField + '"' +
	                                                                ' d2-required="prStDes.' + fieldId + '.compulsory" ' +
							                                        ' d2-function="saveDatavalue(arg1)" ' +						                                        
							                                        ' d2-function-param-text="prStDes.' + fieldId + '" ' +
							                                        ' d2-function-param-coordinate="\'LATLNG\'" > ' +
							                                '</d2-map></span>' +
							                                '<span class="not-for-screen">' +
	                                                    		'<input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}' +
	                                                    	'</span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "ORGANISATION_UNIT") {
	                                    	newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><d2-org-unit-tree ' +
						                                            ' selected-org-unit-id="{{selectedOrgUnit.id}}" ' +
						                                            ' id="{{prStDes.' + fieldId + '.dataElement.id}}" ' +
						                                            ' d2-object="currentEvent" ' +
						                                            ' d2-value="currentEvent.' + fieldId + '" ' +
						                                            ' d2-disabled="'+ disableInputField + '"' +
						                                            ' d2-required="prStDes.' + fieldId + '.compulsory" ' +
	                                                                ' d2-orgunit-names="orgUnitNames" ' +
						                                            ' d2-function="saveDatavalue(prStDes.' + fieldId + ', currentEvent, value )" >' +
						                                    ' </d2-org-unit-tree></span>' +
						                                    '<span class="not-for-screen">' +
	                                                    		'<input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}' +
	                                                    	'</span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "PHONE_NUMBER") {
	                                        newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><input type="text" ' +
	                                            ' ng-class="getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id, true)" ' +
	                                            ' ng-blur="saveDatavalue(prStDes.' + fieldId + ', outerForm.' + fieldId + ')"' +
	                                            commonInputFieldProperty + '></span><span class="not-for-screen"><input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}></span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "EMAIL") {
	                                        newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><input style="width:100%;" type="email"' +
	                                            ' ng-blur="saveDatavalue(prStDes.' + fieldId + ', outerForm.' + fieldId + ')" ' +
	                                            commonInputFieldProperty +
	                                            ' ng-model="currentEvent.' + fieldId + '">' +
	                                            '<span class="not-for-screen"><input type="email" ng-attr-value={{currentEvent.' + fieldId + '}}></span>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "TIME") {
	                                        newInputField = '<d2-time time-model="currentEvent" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)" time-model-id="\'' + fieldId + '\'"' +
	                                            ' time-required="prStDes.' + fieldId + '.compulsory" time-save-methode="saveDatavalue"' +
	                                            ' time-element="currentElement" time-use-notification="true"' +
	                                            '  time-disabled="' + disableInputField + '" time-format="timeFormat" time-save-methode-parameter1="prStDes.' + fieldId + '" time-save-methode-parameter2="\'' + fieldId + '\'"></d2-time>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "DATETIME") {
	                                        newInputField = '<d2-date-time datetime-model="currentEvent" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)" datetime-model-id="\'' + fieldId + '\'"' +
	                                            ' datetime-required="prStDes.' + fieldId + '.compulsory" datetime-save-methode="saveDatavalue"' +
	                                            ' datetime-date-placeholder="{{dhis2CalendarFormat.keyDateFormat}}" datetime-use-notification="true"' +
	                                            '  datetime-disabled="' + disableInputField + '" datetime-save-methode-parameter1="prStDes.' + fieldId + '" datetime-save-methode-parameter2="\'' + fieldId + '\'"></d2-date-time>';
	                                    }
	                                    else if (prStDe.dataElement.valueType === "TEXT") {
	                                        newInputField = '<span class="hideInPrint" ng-if="!isHidden(prStDes.' + fieldId + '.dataElement.id, currentEvent)"><input type="text" ' +
	                                            ' ng-class="getInputNotifcationClass(prStDes.' + fieldId + '.dataElement.id, true)" ' +
	                                            ' ng-blur="saveDatavalue(prStDes.' + fieldId + ', outerForm.' + fieldId + ')"' +
	                                            commonInputFieldProperty + '></span><span class="not-for-screen"><input type="text" ng-attr-value={{currentEvent.' + fieldId + '}}></span>';
	                                    }
	                                    else{
	                                    	newInputField = ' {{"unsupported_value_type" | translate }}: ' + prStDe.dataElement.valueType;
	                                    }
	                                }
	                            }
	                            else{
	                                NotificationService.showNotifcationDialog($translate.instant("error"),
	                                    $translate.instant("custom_form_has_invalid_dataelement"));
	
	                                return;
	                            }
	                            
	                            
	                        }
	                        newInputField = newInputField + ' <span ng-messages="outerForm.' + fieldId + '.$error" class="required" ng-if="interacted(outerForm.' + fieldId + ')" ng-messages-include="./templates/error-messages.html"></span>';
	
	                        htmlCode = htmlCode.replace(inputField, newInputField);
	
	                    }
	                }
	                htmlCode = addPopOver(htmlCode, programStageDataElements);
	                return {htmlCode: htmlCode, hasEventDate: hasEventDate};
	            }
	            return null;
	        },
	        getForTrackedEntity: function (trackedEntityForm, target) {
	            if (!trackedEntityForm) {
	                return null;
	            }
	
	            var htmlCode = trackedEntityForm.htmlCode ? trackedEntityForm.htmlCode : null;
	            if (htmlCode) {
	
	                var trackedEntityFormAttributes = [];
	                angular.forEach(trackedEntityForm.attributes, function (att) {
	                    trackedEntityFormAttributes[att.id] = att;
	                });
	
	
	                var inputRegex = /<input.*?\/>/g, match, inputFields = [];
	                var hasProgramDate = false;
	                while (match = inputRegex.exec(htmlCode)) {
	                    inputFields.push(match[0]);
	                }
	
	                for (var i = 0; i < inputFields.length; i++) {
	                    var inputField = inputFields[i];
	                    var inputElement = $.parseHTML(inputField);
	                    var attributes = {};
	
	                    $(inputElement[0].attributes).each(function () {
	                        attributes[this.nodeName] = this.value;
	                    });
	                    var attId = '', fieldName = '', newInputField, programId;
	                    if (attributes.hasOwnProperty('attributeid')) {
	                        attId = attributes['attributeid'];
	                        fieldName = attId;
	                        var att = trackedEntityFormAttributes[attId];
	
	                        if (att) {
	                            var attMaxDate = att.allowFutureDate ? '' : 0;
	                            var isTrackerAssociate = att.valueType === 'TRACKER_ASSOCIATE';
	                            var disableInputField = 'attributeFieldDisabled(attributesById.'+attId+')';
	                            var commonInputFieldProperty = ' name="' + fieldName + '"' +
	                                ' element-id="' + i + '"' +
	                                this.getAttributesAsString(attributes) +
	                                ' d2-focus-next-on-enter' +
	                                ' ng-model="selectedTei.' + attId + '" ' +
	                                ' attribute-data={{attributesById.' + attId + '}} ' +
	                                ' selected-program-id={{selectedProgram.id}} ' +
	                                ' selected-tei-id={{selectedTei.trackedEntityInstance}} ' +
	                                ' ng-disabled="' + disableInputField + '"'+ 
	                                ' d2-attribute-validator ' +
	                                ' selected-tet={{trackedEntityTypes.selected.id}}' +
	                                ' ng-required=" ' + att.mandatory + '" ';
	
	                            //check if attribute has optionset
	                            if (att.optionSetValue) {
	                                var optionSetId = att.optionSet.id;
	                                newInputField = '<span class="hideInPrint"><ui-select style="width:100%;" theme="select2" ' + commonInputFieldProperty + '  on-select="teiValueUpdated(selectedTei,\'' + attId + '\')" >' +
	                                    '<ui-select-match allow-clear="true" ng-attr-placeholder="' + $translate.instant('select_or_search') + '">{{$select.selected.displayName || $select.selected}}</ui-select-match>' +
	                                    '<ui-select-choices ' +
	                                    'repeat="option.displayName as option in optionSets.' + optionSetId + '.options | filter: $select.search | limitTo:maxOptionSize">' +
	                                    '<span ng-bind-html="option.displayName | highlight: $select.search"></span>' +
	                                    '</ui-select-choices>' +
	                                    '</ui-select></span><span class="not-for-screen"><input type="text" ng-attr-value={{selectedTei.' + attId + '}}></span>';
	                            }
	                            else {
	                                //check attribute type and generate corresponding angular input field
	                                if (att.valueType === "NUMBER" ||
	                                    att.valueType === "PERCENTAGE" ||
	                                    att.valueType === "INTEGER" ||
	                                		att.valueType === "INTEGER_POSITIVE" ||
	                                		att.valueType === "INTEGER_NEGATIVE" ||
	                                		att.valueType === "INTEGER_ZERO_OR_POSITIVE" ) {
	                                    newInputField = '<span class="hideInPrint"><input style="width:100%;" type="number"' +
	                                        ' d2-number-validator ' +
	                                        ' number-type="' + att.valueType + '" ' +
	                                        ' ng-blur="teiValueUpdated(selectedTei,\'' + attId + '\')" ' +
	                                        commonInputFieldProperty + ' ></span><span class="not-for-screen"><input type="text" ng-attr-value={{selectedTei.' + attId + '}}></span>';
	                                }
	                                else if (att.valueType === "BOOLEAN") {
	                                	newInputField = '<span class="hideInPrint"><d2-radio-button ' +
	                                                            ' dh-required=" ' + (att.mandatory || att.unique) + '" ' +
	                                                            ' dh-disabled="'+ disableInputField + '"' +
	                                                            ' dh-value="selectedTei.' + attId + '" ' +
	                                                            ' dh-name="foo" ' +
	                                                            ' dh-current-element="currentElement" ' +
	                                                            ' dh-event="currentEvent.event" ' +
	                                                            ' dh-id="' + attId + '" >' +
	                                                    ' </d2-radio-button></span>' +
	                                                    '<span class="not-for-screen">' +
	                                                        '<label class="radio-inline"><input type="radio" ng-attr-value="true" ng-model="selectedTei.' + attId + '">{{\'yes\' | translate}}</label>' +
	                                                        '<label class="radio-inline"><input type="radio" ng-attr-value="false" ng-model="selectedTei.' + attId + '">{{\'no\' | translate}}</label>' +
	                                                    '</span>';
	                                }
	                                else if (att.valueType === "DATE") {
	                                    newInputField = '<span class="hideInPrint"><input  style="width:100%;" type="text"' +
	                                        ' ng-attr-placeholder="{{dhis2CalendarFormat.keyDateFormat}}" ' +
	                                        ' max-date=" ' + attMaxDate + ' " ' +
	                                        ' d2-date' +
	                                        ' ng-change="verifyExpiryDate(\'selectedTei.'+attId+'\')"'+
	                                        ' blur-or-change="teiValueUpdated(selectedTei,\'' + attId + '\')" ' +
	                                        commonInputFieldProperty + ' ></span>' +
	                                        '<span class="not-for-screen"><input type="text" ng-attr-value={{selectedTei.' + attId + '}}></span>';
	                                }
	                                else if (att.valueType === "TRUE_ONLY") {
	                                    newInputField = '<span class="hideInPrint"><input style="width:100%;" type="checkbox" ' +
	                                        ' ng-change="teiValueUpdated(selectedTei,\'' + attId + '\')" ' +
	                                        commonInputFieldProperty + ' ></span>' +
	                                        '<span class="not-for-screen"><input type="checkbox" ng-checked={{selectedTei.' + attId + '}}></span>';
	                                }
	                                else if (att.valueType === "EMAIL") {
	                                    newInputField = '<span class="hideInPrint"><input style="width:100%;" type="email"' +
	                                        ' ng-blur="teiValueUpdated(selectedTei,\'' + attId + '\')" ' +
	                                        commonInputFieldProperty + ' >' +
	                                        '<span class="not-for-screen"><input type="text" ng-attr-value={{selectedTei.' + attId + '}}></span>';
	                                }
	                                else if (att.valueType === "TRACKER_ASSOCIATE") {
	                                	newInputField = '<span class="input-group hideInPrint"> ' +
	                                                                        ' <input type="text" style="width:100%;"' +
	                                                                        ' ng-blur="teiValueUpdated(selectedTei,\'' + attId + '\')" ' +
	                                                                        commonInputFieldProperty + ' >' +
	                                                                        '<span class="input-group-btn input-group-btn-no-width"> ' +
	                                                            '<button class="btn btn-grp default-btn-height" type="button" ' + 
	                                                                ' ng-attr-title="{{\'add\' | translate}} {{attributesById.' + attId + '.displayName}}" ' +
	                                                                ' ng-if="!selectedTei.' + attId + '" ' +                                                                
	                                                                ' ng-class="{true: \'disable-clicks\'} [editingDisabled]" ' +
	                                                                ' ng-click="getTrackerAssociate(attributesById.' + attId + ', selectedTei.' + attId + ')" >' +
	                                                                '<i class="fa fa-external-link"></i> ' +
	                                                            '</button> ' + 
	                                                            '<button class="btn btn-grp default-btn-height" type="button" ' + 
	                                                                ' ng-attr-title="{{\'remove\' | translate}} {{attributesById.' + attId + '.displayName}}" ' +
	                                                                ' ng-if="selectedTei.' + attId + '" ' +
	                                                                ' ng-disabled="' + disableInputField + '"'+
	                                                                ' ng-class="{true: \'disable-clicks\'} [editingDisabled]" ' +
	                                                                ' ng-click="selectedTei.' + attId + ' = null" >' +
	                                                                '<i class="fa fa-trash-o"></i> ' +
	                                                            '</button> ' + 
	                                                        '</span>'+
	                                                    '</span>'+
	                                                    '<span class="not-for-screen"><input type="text" ng-attr-value={{selectedTei.' + attId + '}}></span>';
	                                }
	                                else if (att.valueType === "AGE") {
	                                	newInputField = '<span class="hideInPrint"><d2-age ' +
	                                                            ' id=" ' + attId + '" ' +
							                                    ' d2-object="selectedTei" ' +  						                                    
							                                    ' d2-required=" ' + (att.mandatory || att.unique) + '" ' +
	                                                            ' d2-disabled="'+ disableInputField +'" >' +
							                                '</d2-age></span>'+
	                                                    '<span class="not-for-screen"><input type="text" ng-attr-value={{selectedTei.' + attId + '}}></span>';
	                                }
	                                else if (att.valueType === "COORDINATE") {
	                                	newInputField = '<span class="hideInPrint"><d2-map ' +
	                                                            ' id=" ' + attId + '" ' +
							                                    ' d2-object="selectedTei" ' +  
							                                    ' d2-value="selectedTei.' + attId + '" ' +
							                                    ' d2-required=" ' + (att.mandatory || att.unique) + '" ' +
						                                        ' d2-disabled="'+ disableInputField + '"' +
							                                    ' d2-coordinate-format="\'TEXT\'" > ' +
							                            '</d2-map></span>'+
	                                                    '<span class="not-for-screen"><input type="text" ng-attr-value={{selectedTei.' + attId + '}}></span>';
	                                }
	                                else if (att.valueType === "ORGANISATION_UNIT") {
	                                	newInputField = '<span class="hideInPrint"><d2-org-unit-tree ' +
					                                            ' selected-org-unit-id="{{selectedOrgUnit.id}}" ' +
					                                            ' id=" ' + attId + '" ' +
					                                            ' d2-object="selectedTei" ' +  
							                                    ' d2-value="selectedTei.' + attId + '" ' +
							                                    ' d2-required=" ' + (att.mandatory || att.unique) + '" ' +
						                                        ' d2-disabled="'+ disableInputField + '"' +
	                                                            ' d2-orgunit-names="orgUnitNames" ' +
						                                        ' d2-function="teiValueUpdated()" >' +
					                                        ' </d2-org-unit-tree></span>'+
	                                                    '<span class="not-for-screen"><input type="text" ng-attr-value={{selectedTei.' + attId + '}}></span>';
	                                }
	                                else if (att.valueType === "LONG_TEXT") {
	                                    newInputField = '<span><textarea style="width:100%;" row ="3" ' +
	                                        ' ng-blur="teiValueUpdated(selectedTei,\'' + attId + '\')" ' +
	                                        commonInputFieldProperty + ' ></textarea></span>';
	                                }
	                                else if (att.valueType === "TEXT") {
	                                    newInputField = '<input type="text" style="width:100%;"' +
	                                        ' ng-blur="teiValueUpdated(selectedTei,\'' + attId + '\')" ' +
	                                        commonInputFieldProperty + '>';
	                                }
	                                else if (att.valueType === "PHONE_NUMBER") {
	                                    newInputField = '<input type="text" style="width:100%;"' +
	                                        ' ng-blur="teiValueUpdated(selectedTei,\'' + attId + '\')" ' +
	                                        commonInputFieldProperty + '>';
	                                }
	                                else {                                	
	                                    newInputField = ' {{"unsupported_value_type" | translate }} ' + att.valueType;
	                                }                                
	                            }
	                        }
	                        else{
	                            NotificationService.showNotifcationDialog($translate.instant("error"),
	                                $translate.instant("custom_form_has_invalid_attribute"));
	                            return;
	                        }
	                    }
	
	                    if (attributes.hasOwnProperty('programid')) {
	                        hasProgramDate = true;
	                        programId = attributes['programid'];
	                        if (programId === 'enrollmentDate') {
	                            fieldName = 'dateOfEnrollment';
	                            var enMaxDate = trackedEntityForm.selectEnrollmentDatesInFuture ? '' : 0;
	                            newInputField = '<input type="text" style="width:100%;"' +
	                                ' name="' + fieldName + '"' +
	                                ' element-id="' + i + '"' +
	                                this.getAttributesAsString(attributes) +
	                                ' d2-focus-next-on-enter' +
	                                ' ng-attr-placeholder="{{dhis2CalendarFormat.keyDateFormat}}" ' +
	                                ' ng-model="selectedEnrollment.dateOfEnrollment" ' +
	                                ' ng-change="verifyExpiryDate(\'selectedEnrollment.dateOfEnrollment\')"'+
	                                ' ng-disabled="\'' + target + '\' === \'PROFILE\' || selectedOrgUnit.closedStatus"' +
	                                ' d2-date' +
	                                ' max-date="' + enMaxDate + '"' +
	                                ' ng-required="true">';
	                        }
	                        if (programId === 'dateOfIncident' && trackedEntityForm.displayIncidentDate) {
	                            fieldName = 'dateOfIncident';
	                            var inMaxDate = trackedEntityForm.selectIncidentDatesInFuture ? '' : 0;
	                            newInputField = '<input type="text" style="width:100%;"' +
	                                ' name="' + fieldName + '"' +
	                                ' element-id="' + i + '"' +
	                                this.getAttributesAsString(attributes) +
	                                ' d2-focus-next-on-enter' +
	                                ' ng-attr-placeholder="{{dhis2CalendarFormat.keyDateFormat}}" ' +
	                                ' ng-model="selectedEnrollment.dateOfIncident" ' +
	                                ' ng-change="verifyExpiryDate(\'selectedEnrollment.dateOfIncident\')"'+
	                                ' ng-disabled="\'' + target + '\' === \'PROFILE\' || selectedOrgUnit.closedStatus"' +
	                                ' d2-date ' +
	                                ' max-date="' + inMaxDate + '">';
	                        }
	                    }
	
	                    newInputField = newInputField + ' <span ng-messages="outerForm.' + fieldName + '.$error" class="required" ng-if="interacted(outerForm.' + fieldName + ')" ng-messages-include="./templates/error-messages.html"></span>';
	
	                    htmlCode = htmlCode.replace(inputField, newInputField);
	                }
	                htmlCode = addPopOver(htmlCode, trackedEntityFormAttributes);
	                return {htmlCode: htmlCode, hasProgramDate: hasProgramDate};
	            }
	            return null;
	        },
	        getAttributesAsString: function (attributes) {
	            if (attributes) {
	                var attributesAsString = '';
	                for (var prop in attributes) {
	                    if (prop !== 'value') {
	                        attributesAsString += prop + '="' + attributes[prop] + '" ';
	                    }
	                }
	                return attributesAsString;
	            }
	            return null;
	        }
	    };
	    /* This function inserts the d2-pop-over attributes into the tags containing d2-input-label attribute to
	     * add description and url popover to those tags */
	    function addPopOver(htmlCodeToInsertPopOver, popOverContent) {
	
	        var inputRegex = /<span.*?\/span>/g;
	        var match, tagToInsertPopOver, tagWithPopOver;
	        var htmlCode = htmlCodeToInsertPopOver;
	        while (match = inputRegex.exec(htmlCodeToInsertPopOver)) {
	            if (match[0].indexOf("d2-input-label") > -1) {
	                tagToInsertPopOver = match[0];
	                tagWithPopOver = insertPopOverSpanToTag(tagToInsertPopOver, popOverContent);
	                htmlCode = htmlCode.replace(tagToInsertPopOver,tagWithPopOver);
	            }
	        }
	        return htmlCode;
	
	    }
	
	    function insertPopOverSpanToTag(tagToInsertPopOverSpan, popOverContent)  {
	
	        var attribute, attributes, fieldId, description, url, element, attValue;
	        var popOverSpanElement, tagWithPopOverSpan;
	
	        element = $(tagToInsertPopOverSpan);
	        attributes = element[0].attributes;
	
	        for (var index = 0; index < attributes.length; index++) {
	            if (attributes[index].name === "d2-input-label") {
	                attValue = attributes[index].value;
	                break;
	            }
	        }
	        if (attValue) {
	            popOverSpanElement = $('<span></span>');
	            popOverSpanElement.attr("d2-pop-over","");
	            popOverSpanElement.attr("details","{{'details'| translate}}");
	            popOverSpanElement.attr("trigger","click");
	            popOverSpanElement.attr("placement","right");
	            popOverSpanElement.attr("class","popover-label");
	
	            if (attValue.indexOf("attributeId.") > -1) {
	                fieldId = attValue.split(".")[1];
	                description = popOverContent[fieldId].description ? "'" + popOverContent[fieldId].description + "'" :
	                    "undefined";
	                popOverSpanElement.attr("content","{description: " + description + "}");
	                popOverSpanElement.attr("template","attribute-details.html");
	
	            } else {
	                fieldId = attValue.split("-")[1];
	                description = popOverContent[fieldId].dataElement.description ? "'" +
	                popOverContent[fieldId].dataElement.description + "'" : "undefined";
	                url = popOverContent[fieldId].dataElement.url ? "'" +
	                popOverContent[fieldId].dataElement.url + "'" : "undefined";
	                popOverSpanElement.attr("content","{description: " + description + ", url:" + url + "}");
	                popOverSpanElement.attr("template","dataelement-details.html");
	            }
	            popOverSpanElement.html("<a href ng-attr-title=\"{{'details'| translate}}\" class=\"wrap-text\" tabindex=\"-1\">" +element.html() + "</a>");
	            element.html(popOverSpanElement[0].outerHTML.replace('d2-pop-over=""','d2-pop-over'));
	            tagWithPopOverSpan = element[0].outerHTML;
	        }
	        return tagWithPopOverSpan;
	    }
	})
	
	/* Context menu for grid*/
	.service('ContextMenuSelectedItem', function () {
	    this.selectedItem = '';
	
	    this.setSelectedItem = function (selectedItem) {
	        this.selectedItem = selectedItem;
	    };
	
	    this.getSelectedItem = function () {
	        return this.selectedItem;
	    };
	})
	
	/* Modal service for user interaction */
	.service('ModalService', ['$modal', function ($modal) {
	
	    var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: 'views/modal.html'
	    };
	
	    var modalOptions = {
	        closeButtonText: 'Close',
	        actionButtonText: 'OK',
	        headerText: 'Proceed?',
	        bodyText: 'Perform this action?'
	    };
	
	    this.showModal = function (customModalDefaults, customModalOptions) {
	        if (!customModalDefaults)
	            customModalDefaults = {};
	        customModalDefaults.backdrop = 'static';
	        return this.show(customModalDefaults, customModalOptions);
	    };
	
	    this.show = function (customModalDefaults, customModalOptions) {
	        //Create temp objects to work with since we're in a singleton service
	        var tempModalDefaults = {};
	        var tempModalOptions = {};
	
	        //Map angular-ui modal custom defaults to modal defaults defined in service
	        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
	
	        //Map modal.html $scope custom properties to defaults defined in service
	        angular.extend(tempModalOptions, modalOptions, customModalOptions);
	
	        if (!tempModalDefaults.controller) {
	            tempModalDefaults.controller = ['$scope','$modalInstance', function ($scope, $modalInstance) {
	                $scope.modalOptions = tempModalOptions;
	                $scope.modalOptions.ok = function (result) {
	                    $modalInstance.close(result);
	                };
	                $scope.modalOptions.close = function (result) {
	                    $modalInstance.dismiss('cancel');
	                };
	            }];
	        }
	
	        return $modal.open(tempModalDefaults).result;
	    };
	
	}])
	
	/* Dialog service for user interaction */
	.service('DialogService', ['$modal', function ($modal) {
	
	    var dialogDefaults = {
	        backdrop: true,
	        keyboard: true,
	        backdropClick: true,
	        modalFade: true,
	        templateUrl: 'views/dialog.html'
	    };
	
	    var dialogOptions = {
	        closeButtonText: 'close',
	        actionButtonText: 'ok',
	        headerText: 'dhis2_tracker',
	        bodyText: 'Perform this action?'
	    };
	
	    this.showDialog = function (customDialogDefaults, customDialogOptions, summaries) {
	        if (!customDialogDefaults)
	            customDialogDefaults = {};
	        customDialogDefaults.backdropClick = false;
	        return this.show(customDialogDefaults, customDialogOptions, summaries);
	    };
	
	    this.show = function (customDialogDefaults, customDialogOptions, summaries) {
	        //Create temp objects to work with since we're in a singleton service
	        var tempDialogDefaults = {};
	        var tempDialogOptions = {};
	
	        //Map angular-ui modal custom defaults to modal defaults defined in service
	        angular.extend(tempDialogDefaults, dialogDefaults, customDialogDefaults);
	
	        //Map modal.html $scope custom properties to defaults defined in service
	        angular.extend(tempDialogOptions, dialogOptions, customDialogOptions);
	
	        if (!tempDialogDefaults.controller) {
	            tempDialogDefaults.controller = ['$scope','$modalInstance', function ($scope, $modalInstance) {
	                $scope.dialogOptions = tempDialogOptions;
	                $scope.dialogOptions.ok = function (result) {
	                    $modalInstance.close(result);
	                };
	                if(summaries) {
	                    $scope.summaries = summaries;
	                }
	            }];
	            
	        }
	
	        return $modal.open(tempDialogDefaults).result;
	    };
	
	}])
	.service('NotificationService', function (DialogService, $timeout) {
	    this.showNotifcationDialog = function(errorMsgheader, errorMsgBody, errorResponse){
	        var dialogOptions = {
	            headerText: errorMsgheader,
	            bodyText: errorMsgBody
	        };
	        var summaries = null;
	        if (errorResponse && errorResponse.data) {
	            if(errorResponse.data.message && (errorResponse.data.status === 'ERROR' || errorResponse.data.status === 'WARNING')) {
	                dialogOptions.bodyText += "<br/>"+errorResponse.data.message+"<br/>";
	            }
	            if( errorResponse.data.response && errorResponse.data.response.importSummaries && errorResponse.data.response.importSummaries.length > 0 ){
	                summaries = JSON.stringify(errorResponse.data.response.importSummaries);
	            }
	        }
	        DialogService.showDialog({}, dialogOptions, summaries);
	    };
	
	    this.showNotifcationWithOptions = function(dialogDefaults, dialogOptions){
	        DialogService.showDialog(dialogDefaults, dialogOptions);
	    };
	    
	    this.displayDelayedHeaderMessage = function( message ){
	        setHeaderDelayMessage( message );
	    };
	    
	    this.displayHeaderMessage = function( message ){
	        $timeout(function(){
	            setHeaderMessage( message );
	        }, 1000);
	    };
	    
	    this.removeHeaderMessage = function(){
	        hideHeaderMessage();
	    };
	})
	.service('Paginator', function () {
	    this.page = 1;
	    this.pageSize = 50;
	    this.itemCount = 0;
	    this.pageCount = 0;
	    this.toolBarDisplay = 5;
	
	    this.setPage = function (page) {
	        if (page > this.getPageCount()) {
	            return;
	        }
	
	        this.page = page;
	    };
	
	    this.getPage = function () {
	        return this.page;
	    };
	
	    this.setPageSize = function (pageSize) {
	        this.pageSize = pageSize;
	    };
	
	    this.getPageSize = function () {
	        return this.pageSize;
	    };
	
	    this.setItemCount = function (itemCount) {
	        this.itemCount = itemCount;
	    };
	
	    this.getItemCount = function () {
	        return this.itemCount;
	    };
	
	    this.setPageCount = function (pageCount) {
	        this.pageCount = pageCount;
	    };
	
	    this.getPageCount = function () {
	        return this.pageCount;
	    };
	
	    this.setToolBarDisplay = function (toolBarDisplay) {
	        this.toolBarDisplay = toolBarDisplay;
	    };
	
	    this.getToolBarDisplay = function () {
	        return this.toolBarDisplay;
	    };
	
	    this.lowerLimit = function () {
	        var pageCountLimitPerPageDiff = this.getPageCount() - this.getToolBarDisplay();
	
	        if (pageCountLimitPerPageDiff < 0) {
	            return 0;
	        }
	
	        if (this.getPage() > pageCountLimitPerPageDiff + 1) {
	            return pageCountLimitPerPageDiff;
	        }
	
	        var low = this.getPage() - (Math.ceil(this.getToolBarDisplay() / 2) - 1);
	
	        return Math.max(low, 0);
	    };
	})
	
	.service('GridColumnService', function ($http, $q, DHIS2URL, $translate, SessionStorageService, NotificationService) {
	    var GRIDCOLUMNS_URL = DHIS2URL+'/userDataStore/gridColumns/';
	    return {
	        columnExists: function (cols, id) {
	            var colExists = false;
	            if (!angular.isObject(cols) || !id || angular.isObject(cols) && !cols.length) {
	                return colExists;
	            }
	
	            for (var i = 0; i < cols.length && !colExists; i++) {
	                if (cols[i].id === id) {
	                    colExists = true;
	                }
	            }
	            return colExists;
	        },
	        set: function (gridColumns, name) {
	            var deferred = $q.defer();
	            var httpMessage = {
	                method: "put",
	                url: GRIDCOLUMNS_URL + name,
	                data: {"gridColumns": gridColumns},
	                headers: {'Content-Type': 'application/json;charset=UTF-8'}
	            };
	
	            $http(httpMessage).then(function (response) {
	                deferred.resolve(response.data);
	            },function (error) {
	                httpMessage.method = "post";
	                $http(httpMessage).then(function (response) {
	                    deferred.resolve(response.data);
	                }, function (error) {
	                    if (error && error.data) {
	                        deferred.resolve(error.data);
	                    } else {
	                        deferred.resolve(null);
	                    }
	                });
	            });
	            return deferred.promise;
	        },
	        get: function (name) {
	            var promise = $http.get(GRIDCOLUMNS_URL+name).then(function (response) {
	                if (response && response.data && response.data.gridColumns) {
	                    SessionStorageService.set(name, {id:name, columns:response.data.gridColumns});
	                    return response.data.gridColumns;
	                } else {
	                    NotificationService.showNotifcationDialog($translate.instant("error"), $translate.instant("gridColumns_invalid"));
	                    return null;
	                }
	            }, function (error) {
	                var gridColumnsFromSessionStore = SessionStorageService.get(name);
	                if (gridColumnsFromSessionStore && gridColumnsFromSessionStore.columns) {
	                    return gridColumnsFromSessionStore.columns;
	                }
	                return null;
	            });
	            return promise;
	        }
	    };
	})
	
	/* Service for uploading/downloading file */
	.service('FileService', function ($http, DHIS2URL) {
	
	    return {
	        get: function (uid) {
	            var promise = $http.get(DHIS2URL + '/fileResources/' + uid).then(function (response) {
	                return response.data;
	            } ,function(error) {
	                return null;
	            });
	            return promise;
	        },
	        download: function (fileName) {
	            var promise = $http.get(fileName).then(function (response) {
	                return response.data;
	            }, function(error) {
	                return null;
	            });
	            return promise;
	        },
	        upload: function(file){
	            var formData = new FormData();
	            formData.append('file', file);
	            var headers = {transformRequest: angular.identity, headers: {'Content-Type': undefined}};
	            var promise = $http.post(DHIS2URL + '/fileResources', formData, headers).then(function(response){
	                return response.data;
	            },function(error) {
	               return null;
	            });
	            return promise;
	        }
	    };
	})
	/* Returns a function for getting rules for a specific program */
	.factory('RulesFactory', function($q,MetaDataFactory,$filter){
	    var staticReplacements = 
	                        [{regExp:new RegExp("([^\\w\\d])(and)([^\\w\\d])","gi"), replacement:"$1&&$3"},
	                        {regExp:new RegExp("([^\\w\\d])(or)([^\\w\\d])","gi"), replacement:"$1||$3"},
	                        {regExp:new RegExp("V{execution_date}","g"), replacement:"V{event_date}"}];
	
	    var performStaticReplacements = function(expression) {
	        angular.forEach(staticReplacements, function(staticReplacement) {
	            expression = expression.replace(staticReplacement.regExp, staticReplacement.replacement);
	        });
	
	        return expression;
	    };
	
	    return{        
	        loadRules : function(programUid){            
	            var def = $q.defer();            
	            MetaDataFactory.getAll('constants').then(function(constants) {
	                MetaDataFactory.getByProgram('programIndicators',programUid).then(function(pis){                    
	                    var variables = [];
	                    var programRules = [];
	                    angular.forEach(pis, function(pi){
	                        if(pi.displayInForm){
	                            var newAction = {
	                                    id:pi.id,
	                                    content:pi.shortName ? pi.shortName : pi.displayName,
	                                    data:pi.expression,
	                                    programRuleActionType:'DISPLAYKEYVALUEPAIR',
	                                    location:'indicators'
	                                };
	                            var newRule = {
	                                    displayName:pi.displayName,
	                                    id: pi.id,
	                                    shortname:pi.shortname,
	                                    code:pi.code,
	                                    program:pi.program,
	                                    description:pi.description,
	                                    condition:pi.filter ? pi.filter : 'true',
	                                    programRuleActions: [newAction]
	                                };
	
	                            programRules.push(newRule);
	
	                            var variablesInCondition = newRule.condition.match(/[A#]{\w+.?\w*}/g);
	                            var variablesInData = newAction.data.match(/[A#]{\w+.?\w*}/g);
	                            var valueCountPresent = newRule.condition.indexOf("V{value_count}") >= 0 
	                                                            || newAction.data.indexOf("V{value_count}") >= 0;
	                            var positiveValueCountPresent = newRule.condition.indexOf("V{zero_pos_value_count}") >= 0
	                                                            || newAction.data.indexOf("V{zero_pos_value_count}") >= 0;
	                            var variableObjectsCurrentExpression = [];
	
	                            var pushDirectAddressedVariable = function(variableWithCurls) {
	                                var variableName = $filter('trimvariablequalifiers')(variableWithCurls);
	                                var variableNameParts = variableName.split('.');
	
	                                var newVariableObject;
	
	                                if(variableNameParts.length === 2) {
	                                    //this is a programstage and dataelement specification. translate to program variable:
	                                    newVariableObject = {
	                                        displayName:variableName,
	                                        programRuleVariableSourceType:'DATAELEMENT_CURRENT_EVENT',
	                                        dataElement:variableNameParts[1],
	                                        program:programUid,
	                                        useCodeForOptionSet:true
	                                    };
	                                }
	                                else if(variableNameParts.length === 1)
	                                {
	                                    //This is an attribute - let us translate to program variable:
	                                    newVariableObject = {
	                                        displayName:variableName,
	                                        programRuleVariableSourceType:'TEI_ATTRIBUTE',
	                                        trackedEntityAttribute:variableNameParts[0],
	                                        program:programUid,
	                                        useCodeForOptionSet:true
	                                    };
	                                }
	                                
	                                variables.push(newVariableObject);
	
	                                return newVariableObject;
	
	                            };
	
	                            angular.forEach(variablesInCondition, function(variableInCondition) {
	                                var pushed = pushDirectAddressedVariable(variableInCondition);
	                            });
	
	                            angular.forEach(variablesInData, function(variableInData) {
	                                var pushed = pushDirectAddressedVariable(variableInData);
	
	                                //We only count the number of values in the data part of the rule
	                                //(Called expression in program indicators)
	                                variableObjectsCurrentExpression.push(pushed);
	                            });
	
	                            //Change expression or data part of the rule to match the program rules execution model
	                            if(valueCountPresent) {
	                                var valueCountText;
	                                angular.forEach(variableObjectsCurrentExpression, function(variableCurrentRule) {
	                                   if(valueCountText) {
	                                       //This is not the first value in the value count part of the expression. 
	                                       valueCountText +=  ' + d2:count(\'' + variableCurrentRule.displayName + '\')';
	                                   }
	                                   else
	                                   {
	                                       //This is the first part value in the value count expression:
	                                       valueCountText = '(d2:count(\'' + variableCurrentRule.displayName + '\')';
	                                   }
	                                });
	                                //To finish the value count expression we need to close the paranthesis:
	                                valueCountText += ')';
	
	                                //Replace all occurrences of value counts in both the data and expression:
	                                newRule.condition = newRule.condition.replace(new RegExp("V{value_count}", 'g'),valueCountText);
	                                newAction.data = newAction.data.replace(new RegExp("V{value_count}", 'g'),valueCountText);
	                            }
	                            if(positiveValueCountPresent) {
	                                var zeroPosValueCountText;
	                                angular.forEach(variableObjectsCurrentExpression, function(variableCurrentRule) {
	                                   if(zeroPosValueCountText) {
	                                       //This is not the first value in the value count part of the expression. 
	                                       zeroPosValueCountText +=  '+ d2:countifzeropos(\'' + variableCurrentRule.displayName + '\')';
	                                   }
	                                   else
	                                   {
	                                       //This is the first part value in the value count expression:
	                                       zeroPosValueCountText = '(d2:countifzeropos(\'' + variableCurrentRule.displayName + '\')';
	                                   }
	                                });
	                                //To finish the value count expression we need to close the paranthesis:
	                                zeroPosValueCountText += ')';
	
	                                //Replace all occurrences of value counts in both the data and expression:
	                                newRule.condition = newRule.condition.replace(new RegExp("V{zero_pos_value_count}", 'g'),zeroPosValueCountText);
	                                newAction.data = newAction.data.replace(new RegExp("V{zero_pos_value_count}", 'g'),zeroPosValueCountText);
	                            }
	
	                            newAction.data = performStaticReplacements(newAction.data);
	                            newRule.condition = performStaticReplacements(newRule.condition);
	                        }
	                    });
	
	                    var programIndicators = {rules:programRules, variables:variables};
	                    
	                    MetaDataFactory.getByProgram('programRuleVariables',programUid).then(function(programVariables){                    
	                        MetaDataFactory.getByProgram('programRules',programUid).then(function(prs){
	                            var programRules = [];
	                            angular.forEach(prs, function(rule){
	                                rule.actions = [];
	                                rule.programStageId = rule.programStage && rule.programStage.id ? rule.programStage.id : null;
	                                programRules.push(rule);
	                            });                                
	                            def.resolve({constants: constants, programIndicators: programIndicators, programVariables: programVariables, programRules: programRules});
	                        });
	                    });
	                    
	                }); 
	            });                        
	            return def.promise;
	        }
	    };  
	})
	/* service for building variables based on the data in users fields */
	.service('VariableService', function(DateUtils,OptionSetService,OrgUnitFactory,$filter,$log,$q){
	    var processSingleValue = function(processedValue,valueType){
	        //First clean away single or double quotation marks at the start and end of the variable name.
	        processedValue = $filter('trimquotes')(processedValue);
	
	        //Append single quotation marks in case the variable is of text or date type:
	        if(valueType === 'LONG_TEXT' || valueType === 'TEXT' || valueType === 'DATE' || valueType === 'OPTION_SET' ||
	            valueType === 'URL' || valueType === 'DATETIME' || valueType === 'TIME' || valueType === 'PHONE_NUMBER' || 
	            valueType === 'ORGANISATION_UNIT' || valueType === 'USERNAME') {
	            if(processedValue) {
	                processedValue = "'" + processedValue + "'";
	            } else {
	                processedValue = "''";
	            }
	        }
	        else if(valueType === 'BOOLEAN' || valueType === 'TRUE_ONLY') {
	            if(processedValue === "Yes") {
	            processedValue = true;
	            }
	            else if(processedValue === "No") {
	                processedValue = false;
	            }
	            else if(processedValue && eval(processedValue)) {
	                processedValue = true;
	            }
	            else {
	                processedValue = false;
	            }
	        }
	        else if( valueType === "INTEGER" || valueType === "NUMBER" || valueType === "INTEGER_POSITIVE"
	             ||  valueType === "INTEGER_NEGATIVE" || valueType === "INTEGER_ZERO_OR_POSITIVE" ||
	                 valueType === "PERCENTAGE") {
	            if(processedValue) {
	                processedValue = Number(processedValue);
	            } else {
	                processedValue = 0;
	            }
	        }
	        else{
	            $log.warn("unknown datatype:" + valueType);
	        }
	
	        return processedValue;
	    };
	
	    var pushVariable = function(variables, variablename, varValue, allValues, varType, variablefound, variablePrefix, variableEventDate, useCodeForOptionSet) {
	
	        var processedValues = [];
	
	        angular.forEach(allValues, function(alternateValue) {
	            processedValues.push(processSingleValue(alternateValue,varType));
	        });
	
	        variables[variablename] = {
	            variableValue:processSingleValue(varValue, varType),
	            useCodeForOptionSet:useCodeForOptionSet,
	            variableType:varType,
	            hasValue:variablefound,
	            variableEventDate:variableEventDate,
	            variablePrefix:variablePrefix,
	            allValues:processedValues
	        };
	        return variables;
	    };
	    
	    var getDataElementValueOrCodeForValueInternal = function(useCodeForOptionSet, value, dataElementId, allDes, optionSets) {
	        return useCodeForOptionSet && allDes && allDes[dataElementId].dataElement.optionSet ? 
	                                            OptionSetService.getCode(optionSets[allDes[dataElementId].dataElement.optionSet.id].options, value)
	                                            : value;
	    };
	    
	    var geTrackedEntityAttributeValueOrCodeForValueInternal = function(useCodeForOptionSet, value, trackedEntityAttributeId, allTeis, optionSets) {
	        return useCodeForOptionSet && allTeis && allTeis[trackedEntityAttributeId].optionSet ? 
	                                            OptionSetService.getCode(optionSets[allTeis[trackedEntityAttributeId].optionSet.id].options, value)
	                                            : value;
	    };
	
	    return {
	        processValue: function(value, type) {
	            return processSingleValue(value,type);
	        },
	        getDataElementValueOrCode: function(useCodeForOptionSet, event, dataElementId, allDes, optionSets) {
	            return getDataElementValueOrCodeForValueInternal(useCodeForOptionSet, event[dataElementId], dataElementId, allDes, optionSets);
	        },
	        getDataElementValueOrCodeForValue: function(useCodeForOptionSet, value, dataElementId, allDes, optionSets) {
	            return getDataElementValueOrCodeForValueInternal(useCodeForOptionSet, value, dataElementId, allDes, optionSets);
	        },
	        getTrackedEntityValueOrCodeForValue: function(useCodeForOptionSet, value, trackedEntityAttributeId, allTeis, optionSets) {
	            return geTrackedEntityAttributeValueOrCodeForValueInternal(useCodeForOptionSet, value, trackedEntityAttributeId, allTeis, optionSets);
	        },
	        getVariables: function(allProgramRules, executingEvent, evs, allDes, allTeis, selectedEntity, selectedEnrollment, optionSets) {
	
	            var variables = {};
	
	            var programVariables = allProgramRules.programVariables;
	
	            programVariables = programVariables.concat(allProgramRules.programIndicators.variables);
	
	            angular.forEach(programVariables, function(programVariable) {
	                var dataElementId = programVariable.dataElement;
	                if(programVariable.dataElement && programVariable.dataElement.id) {
	                    dataElementId = programVariable.dataElement.id;
	                }
	
	                var trackedEntityAttributeId = programVariable.trackedEntityAttribute;
	                if(programVariable.trackedEntityAttribute && programVariable.trackedEntityAttribute.id) {
	                    trackedEntityAttributeId = programVariable.trackedEntityAttribute.id;
	                }
	
	                var programStageId = programVariable.programStage;
	                if(programVariable.programStage && programVariable.programStage.id) {
	                    programStageId = programVariable.programStage.id;
	                }
	
	                var valueFound = false;
	                //If variable evs is not defined, it means the rules is run before any events is registered, skip the types that require an event
	                if(programVariable.programRuleVariableSourceType === "DATAELEMENT_NEWEST_EVENT_PROGRAM_STAGE" && evs && evs.byStage){
	                    if(programStageId) {
	                        var allValues = [];
	                        angular.forEach(evs.byStage[programStageId], function(event) {
	                            if(event[dataElementId] !== null) {
	                                if(angular.isDefined(event[dataElementId])
	                                        && event[dataElementId] !== ""){
	                                    var value = getDataElementValueOrCodeForValueInternal(programVariable.useCodeForOptionSet, event[dataElementId], dataElementId, allDes, optionSets);
	                                            
	                                    allValues.push(value);
	                                    valueFound = true;
	                                    variables = pushVariable(variables, programVariable.displayName, value, allValues, allDes[dataElementId].dataElement.valueType, valueFound, '#', event.eventDate, programVariable.useCodeForOptionSet);
	                                }
	                            }
	                        });
	                    } else {
	                        $log.warn("Variable id:'" + programVariable.id + "' name:'" + programVariable.displayName
	                            + "' does not have a programstage defined,"
	                            + " despite that the variable has sourcetype DATAELEMENT_NEWEST_EVENT_PROGRAM_STAGE" );
	                    }
	                }
	                else if(programVariable.programRuleVariableSourceType === "DATAELEMENT_NEWEST_EVENT_PROGRAM" && evs){
	                    var allValues = [];
	                    angular.forEach(evs.all, function(event) {
	                        if(angular.isDefined(event[dataElementId])
	                            && event[dataElementId] !== null 
	                            && event[dataElementId] !== ""){
	                            var value = getDataElementValueOrCodeForValueInternal(programVariable.useCodeForOptionSet, event[dataElementId], dataElementId, allDes, optionSets);
	                                    
	                            allValues.push(value);
	                            valueFound = true;
	                            variables = pushVariable(variables, programVariable.displayName, value, allValues, allDes[dataElementId].dataElement.valueType, valueFound, '#', event.eventDate, programVariable.useCodeForOptionSet);
	                        }
	                    });
	                }
	                else if(programVariable.programRuleVariableSourceType === "DATAELEMENT_CURRENT_EVENT" && evs){
	                    if(angular.isDefined(executingEvent[dataElementId])
	                        && executingEvent[dataElementId] !== null 
	                        && executingEvent[dataElementId] !== ""){
	                        var value = getDataElementValueOrCodeForValueInternal(programVariable.useCodeForOptionSet, executingEvent[dataElementId], dataElementId, allDes, optionSets);
	                            
	                        valueFound = true;
	                        variables = pushVariable(variables, programVariable.displayName, value, null, allDes[dataElementId].dataElement.valueType, valueFound, '#', executingEvent.eventDate, programVariable.useCodeForOptionSet );
	                    }
	                }
	                else if(programVariable.programRuleVariableSourceType === "DATAELEMENT_PREVIOUS_EVENT" && evs){
	                    //Only continue checking for a value if there is more than one event.
	                    if(evs.all && evs.all.length > 1) {
	                        var allValues = [];
	                        var previousvalue = null;
	                        var previousEventDate = null;
	                        var currentEventPassed = false;
	                        for(var i = 0; i < evs.all.length; i++) {
	                            //Store the values as we iterate through the stages
	                            //If the event[i] is not the current event, it is older(previous). Store the previous value if it exists
	                            if(!currentEventPassed && evs.all[i] !== executingEvent &&
	                                angular.isDefined(evs.all[i][dataElementId])
	                                && evs.all[i][dataElementId] !== "") {
	                                previousvalue = getDataElementValueOrCodeForValueInternal(programVariable.useCodeForOptionSet, evs.all[i][dataElementId], dataElementId, allDes, optionSets);
	                                previousEventDate = evs.all[i].eventDate;
	                                allValues.push(value);
	                                valueFound = true;
	                            }
	                            else if(evs.all[i] === executingEvent) {
	                                //We have iterated to the newest event - store the last collected variable value - if any is found:
	                                if(valueFound) {
	                                    variables = pushVariable(variables, programVariable.displayName, previousvalue, allValues, allDes[dataElementId].dataElement.valueType, valueFound, '#', previousEventDate, programVariable.useCodeForOptionSet);
	                                }
	                                //Set currentEventPassed, ending the iteration:
	                                currentEventPassed = true;
	                            }
	                        }
	                    }
	                }
	                else if(programVariable.programRuleVariableSourceType === "TEI_ATTRIBUTE"){
	                    angular.forEach(selectedEntity.attributes , function(attribute) {
	                        if(!valueFound) {
	                            if(attribute.attribute === trackedEntityAttributeId
	                                    && angular.isDefined(attribute.value)
	                                    && attribute.value !== null
	                                    && attribute.value !== "") {
	                                valueFound = true;
	                                //In registration, the attribute type is found in .type, while in data entry the same data is found in .valueType.
	                                //Handling here, but planning refactor in registration so it will always be .valueType
	                                variables = pushVariable(variables, 
	                                    programVariable.displayName, 
	                                    geTrackedEntityAttributeValueOrCodeForValueInternal(programVariable.useCodeForOptionSet,attribute.value, trackedEntityAttributeId, allTeis, optionSets),
	                                    null, 
	                                    attribute.type ? attribute.type : attribute.valueType, valueFound, 
	                                    'A', 
	                                    '',
	                                    programVariable.useCodeForOptionSet);
	                            }
	                        }
	                    });
	                }
	                else if(programVariable.programRuleVariableSourceType === "CALCULATED_VALUE"){
	                    //We won't assign the calculated variables at this step. The rules execution will calculate and assign the variable.
	                }
	                else {
	                    //If the rules was executed without events, we ended up in this else clause as expected, as most of the variables require an event to be mapped
	                    if(evs)
	                    {
	                        //If the rules was executed and events was supplied, we should have found an if clause for the the source type, and not ended up in this dead end else.
	                        $log.warn("Unknown programRuleVariableSourceType:" + programVariable.programRuleVariableSourceType);
	                    }
	                }
	
	
	                if(!valueFound){
	                    //If there is still no value found, assign default value:
	                    if(dataElementId && allDes) {
	                        var dataElement = allDes[dataElementId];
	                        if( dataElement ) {
	                            variables = pushVariable(variables, programVariable.displayName, "", null, dataElement.dataElement.valueType, false, '#', '', programVariable.useCodeForOptionSet );
	                        }
	                        else {
	                            variables = pushVariable(variables, programVariable.displayName, "", null, "TEXT",false, '#', '', programVariable.useCodeForOptionSet );
	                        }
	                    }
	                    else if (programVariable.trackedEntityAttribute) {
	                        //The variable is an attribute, set correct prefix and a blank value
	                        variables = pushVariable(variables, programVariable.displayName, "", null, "TEXT",false, 'A', '', programVariable.useCodeForOptionSet );
	                    }
	                    else {
	                        //Fallback for calculated(assigned) values:
	                        variables = pushVariable(variables, programVariable.displayName, "", null, "TEXT",false, '#', '', programVariable.useCodeForOptionSet );
	                    }
	                }
	            });
	
	            //add context variables:
	            //last parameter "valuefound" is always true for event date
	            variables = pushVariable(variables, 'current_date', DateUtils.getToday(), null, 'DATE', true, 'V', '', false );
	
	            variables = pushVariable(variables, 'event_date', executingEvent.eventDate, null, 'DATE', true, 'V', '', false );
	            variables = pushVariable(variables, 'due_date', executingEvent.dueDate, null, 'DATE', true, 'V', '' );
	            variables = pushVariable(variables, 'event_count', evs ? evs.all.length : 0, null, 'INTEGER', true, 'V', '', false );
	
	            variables = pushVariable(variables, 'enrollment_date', selectedEnrollment ? selectedEnrollment.enrollmentDate : '', null, 'DATE', selectedEnrollment ? selectedEnrollment.enrollmentDate ? true : false : false, 'V', '', false );
	            variables = pushVariable(variables, 'enrollment_id', selectedEnrollment ? selectedEnrollment.enrollment : '', null, 'TEXT',  selectedEnrollment ? true : false, 'V', '', false );
	            variables = pushVariable(variables, 'event_id', executingEvent ? executingEvent.event : '', null, 'TEXT',  executingEvent ? true : false, 'V', executingEvent ? executingEvent.eventDate : false, false);
	
	            variables = pushVariable(variables, 'incident_date', selectedEnrollment ? selectedEnrollment.incidentDate : '', null, 'DATE',  selectedEnrollment ? true : false, 'V', '', false);
	            variables = pushVariable(variables, 'enrollment_count', selectedEnrollment ? 1 : 0, null, 'INTEGER', true, 'V', '', false);
	            variables = pushVariable(variables, 'tei_count', selectedEnrollment ? 1 : 0, null, 'INTEGER', true, 'V', '', false);
	            
	            //Push all constant values:
	            angular.forEach(allProgramRules.constants, function(constant){
	                variables = pushVariable(variables, constant.id, constant.value, null, 'INTEGER', true, 'C', '', false);
	            });
	
	            var orgUnitUid = selectedEnrollment ? selectedEnrollment.orgUnit : executingEvent.orgUnit;
	            var orgUnitCode = '';
	            var def = $q.defer();
	            if(orgUnitUid){
	                OrgUnitFactory.getFromStoreOrServer( orgUnitUid ).then(function (response) {
	                    orgUnitCode = response.code;
	                    variables = pushVariable(variables, 'orgunit_code', orgUnitCode, null, 'TEXT', orgUnitCode ? true : false, 'V', '', false);
	                    def.resolve(variables);
	                });
	            }else{
	                def.resolve(variables);
	            }
	            return def.promise;
	        }
	    };
	})
	
	/* service for executing tracker rules and broadcasting results */
	.service('TrackerRulesExecutionService', function($translate, VariableService, DateUtils, NotificationService, DHIS2EventFactory, RulesFactory, CalendarService, OptionSetService, $rootScope, $q, $log, $filter, orderByFilter){
	    var NUMBER_OF_EVENTS_IN_SCOPE = 10;
	
	    //Variables for storing scope and rules in memory from rules execution to rules execution:
	    var allProgramRules = false; 
	    var crossEventRulesExist = false;
	    var lastEventId = null;
	    var lastEventDate = null;
	    var lastProgramId = null;
	    var eventScopeExceptCurrent = false;
	
	    var replaceVariables = function(expression, variablesHash){
	        //replaces the variables in an expression with actual variable values.
	
	        //Check if the expression contains program rule variables at all(any curly braces):
	        if(expression.indexOf('{') !== -1) {
	            //Find every variable name in the expression;
	            var variablespresent = expression.match(/[A#CV]\{[\w -_.]+}/g);
	            //Replace each matched variable:
	            angular.forEach(variablespresent, function(variablepresent) {
	                //First strip away any prefix and postfix signs from the variable name:
	                variablepresent = variablepresent.replace("#{","").replace("A{","").replace("C{","").replace("V{","").replace("}","");
	
	                if(angular.isDefined(variablesHash[variablepresent])) {
	                    //Replace all occurrences of the variable name(hence using regex replacement):
	                    expression = expression.replace(new RegExp( variablesHash[variablepresent].variablePrefix + "\\{" + variablepresent + "\\}", 'g'),
	                        variablesHash[variablepresent].variableValue);
	                }
	                else {
	                    $log.warn("Expression " + expression + " contains variable " + variablepresent
	                        + " - but this variable is not defined." );
	                }
	            });
	        }
	
	        //Check if the expression contains environment  variables
	        if(expression.indexOf('V{') !== -1) {
	            //Find every variable name in the expression;
	            var variablespresent = expression.match(/V{\w+.?\w*}/g);
	            //Replace each matched variable:
	            angular.forEach(variablespresent, function(variablepresent) {
	                //First strip away any prefix and postfix signs from the variable name:
	                variablepresent = variablepresent.replace("V{","").replace("}","");
	
	                if(angular.isDefined(variablesHash[variablepresent]) &&
	                    variablesHash[variablepresent].variablePrefix === 'V') {
	                    //Replace all occurrences of the variable name(hence using regex replacement):
	                    expression = expression.replace(new RegExp("V{" + variablepresent + "}", 'g'),
	                        variablesHash[variablepresent].variableValue);
	                }
	                else {
	                    $log.warn("Expression " + expression + " conains context variable " + variablepresent
	                        + " - but this variable is not defined." );
	                }
	            });
	        }
	
	        //Check if the expression contains attribute variables:
	        if(expression.indexOf('A{') !== -1) {
	            //Find every attribute in the expression;
	            var variablespresent = expression.match(/A{\w+.?\w*}/g);
	            //Replace each matched variable:
	            angular.forEach(variablespresent, function(variablepresent) {
	                //First strip away any prefix and postfix signs from the variable name:
	                variablepresent = variablepresent.replace("A{","").replace("}","");
	
	                if(angular.isDefined(variablesHash[variablepresent]) &&
	                    variablesHash[variablepresent].variablePrefix === 'A') {
	                    //Replace all occurrences of the variable name(hence using regex replacement):
	                    expression = expression.replace(new RegExp("A{" + variablepresent + "}", 'g'),
	                        variablesHash[variablepresent].variableValue);
	                }
	                else {
	                    $log.warn("Expression " + expression + " conains attribute " + variablepresent
	                        + " - but this attribute is not defined." );
	                }
	            });
	        }
	
	        //Check if the expression contains constants
	        if(expression.indexOf('C{') !== -1) {
	            //Find every constant in the expression;
	            var variablespresent = expression.match(/C{\w+.?\w*}/g);
	            //Replace each matched variable:
	            angular.forEach(variablespresent, function(variablepresent) {
	                //First strip away any prefix and postfix signs from the variable name:
	                variablepresent = variablepresent.replace("C{","").replace("}","");
	
	                if(angular.isDefined(variablesHash[variablepresent]) &&
	                    variablesHash[variablepresent].variablePrefix === 'C') {
	                    //Replace all occurrences of the variable name(hence using regex replacement):
	                    expression = expression.replace(new RegExp("C{" + variablepresent + "}", 'g'),
	                        variablesHash[variablepresent].variableValue);
	                }
	                else {
	                    $log.warn("Expression " + expression + " conains constant " + variablepresent
	                        + " - but this constant is not defined." );
	                }
	            });
	        }
	
	        return expression;
	    };
	
	    var runDhisFunctions = function(expression, variablesHash, flag){
	        //Called from "runExpression". Only proceed with this logic in case there seems to be dhis function calls: "d2:" is present.
	        if(angular.isDefined(expression) && expression.indexOf("d2:") !== -1){
	            var dhisFunctions = [{name:"d2:daysBetween",parameters:2},
	                {name:"d2:weeksBetween",parameters:2},
	                {name:"d2:monthsBetween",parameters:2},
	                {name:"d2:yearsBetween",parameters:2},
	                {name:"d2:floor",parameters:1},
	                {name:"d2:modulus",parameters:2},
	                {name:"d2:concatenate"},
	                {name:"d2:addDays",parameters:2},
	                {name:"d2:zing",parameters:1},
	                {name:"d2:oizp",parameters:1},
	                {name:"d2:count",parameters:1},
	                {name:"d2:countIfZeroPos",parameters:1},
	                {name:"d2:countIfValue",parameters:2},
	                {name:"d2:ceil",parameters:1},
	                {name:"d2:round",parameters:1},
	                {name:"d2:hasValue",parameters:1},
	                {name:"d2:lastEventDate",parameters:1},
	                {name:"d2:validatePattern",parameters:2},
	                {name:"d2:addControlDigits",parameters:1},
	                {name:"d2:checkControlDigits",parameters:1},
	                {name:"d2:left",parameters:2},
	                {name:"d2:right",parameters:2},
	                {name:"d2:substring",parameters:3},
	                {name:"d2:split",parameters:3},
	                {name:"d2:length",parameters:1},
	                {name:"d2:condition",parameters:3}];
	            var continueLooping = true;
	            //Safety harness on 10 loops, in case of unanticipated syntax causing unintencontinued looping
	            for(var i = 0; i < 10 && continueLooping; i++ ) {
	                var expressionUpdated = false;
	                var brokenExecution = false;
	                angular.forEach(dhisFunctions, function(dhisFunction){
	                    //Select the function call, with any number of parameters inside single quotations, or number parameters witout quotations
	                    var regularExFunctionCall = new RegExp(dhisFunction.name + "\\( *(([\\d/\\*\\+\\-%\.]+)|( *'[^']*'))*( *, *(([\\d/\\*\\+\\-%\.]+)|'[^']*'))* *\\)",'g');
	                    var callsToThisFunction = expression.match(regularExFunctionCall);
	                    angular.forEach(callsToThisFunction, function(callToThisFunction){
	                        //Remove the function name and paranthesis:
	                        var justparameters = callToThisFunction.replace(/(^[^\(]+\()|\)$/g,"");
	                        //Remove white spaces before and after parameters:
	                        justparameters = justparameters.trim();
	                        //Then split into single parameters:
	                        var parameters = justparameters.match(/(('[^']+')|([^,]+))/g);
	
	                        //Show error if no parameters is given and the function requires parameters,
	                        //or if the number of parameters is wrong.
	                        if(angular.isDefined(dhisFunction.parameters)){
	                            //But we are only checking parameters where the dhisFunction actually has a defined set of parameters(concatenate, for example, does not have a fixed number);
	                            var numParameters = parameters ? parameters.length : 0;
	                            
	                            if(numParameters !== dhisFunction.parameters){
	                                $log.warn(dhisFunction.name + " was called with the incorrect number of parameters");
	                                
	                                //Mark this function call as broken:
	                                brokenExecution = true;
	                            }
	                        }
	
	                        //In case the function call is nested, the parameter itself contains an expression, run the expression.
	                        if(!brokenExecution && angular.isDefined(parameters) && parameters !== null) {
	                            for (var i = 0; i < parameters.length; i++) {
	                                parameters[i] = runExpression(parameters[i],dhisFunction.name,"parameter:" + i, flag, variablesHash);
	                            }
	                        }
	
	                        //Special block for d2:weeksBetween(*,*) - add such a block for all other dhis functions.
	                        if(brokenExecution) {
	                            //Function call is not possible to evaluate, remove the call:
	                            expression = expression.replace(callToThisFunction, "false");
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:daysBetween") {
	                            var firstdate = $filter('trimquotes')(parameters[0]);
	                            var seconddate = $filter('trimquotes')(parameters[1]);
	                            firstdate = moment(firstdate, CalendarService.getSetting().momentFormat);
	                            seconddate = moment(seconddate, CalendarService.getSetting().momentFormat);
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, seconddate.diff(firstdate,'days'));
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:weeksBetween") {
	                            var firstdate = $filter('trimquotes')(parameters[0]);
	                            var seconddate = $filter('trimquotes')(parameters[1]);
	                            firstdate = moment(firstdate, CalendarService.getSetting().momentFormat);
	                            seconddate = moment(seconddate, CalendarService.getSetting().momentFormat);
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, seconddate.diff(firstdate,'weeks'));
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:monthsBetween") {
	                            var firstdate = $filter('trimquotes')(parameters[0]);
	                            var seconddate = $filter('trimquotes')(parameters[1]);
	                            firstdate = moment(firstdate, CalendarService.getSetting().momentFormat);
	                            seconddate = moment(seconddate, CalendarService.getSetting().momentFormat);
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, seconddate.diff(firstdate,'months'));
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:yearsBetween") {
	                            var firstdate = $filter('trimquotes')(parameters[0]);
	                            var seconddate = $filter('trimquotes')(parameters[1]);
	                            firstdate = moment(firstdate, CalendarService.getSetting().momentFormat);
	                            seconddate = moment(seconddate, CalendarService.getSetting().momentFormat);
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, seconddate.diff(firstdate,'years'));
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:floor") {
	                            var floored = Math.floor(parameters[0]);
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, floored);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:modulus") {
	                            var dividend = Number(parameters[0]);
	                            var divisor = Number(parameters[1]);
	                            var rest = dividend % divisor;
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, rest);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:concatenate") {
	                            var returnString = "'";
	                            for (var i = 0; i < parameters.length; i++) {
	                                returnString += parameters[i];
	                            }
	                            returnString += "'";
	                            expression = expression.replace(callToThisFunction, returnString);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:addDays") {
	                            var date = $filter('trimquotes')(parameters[0]);
	                            var daystoadd = $filter('trimquotes')(parameters[1]);
	                            var newdate = DateUtils.format( moment(date, CalendarService.getSetting().momentFormat).add(daystoadd, 'days') );
	                            var newdatestring = "'" + newdate + "'";
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, newdatestring);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:zing") {
	                            var number = parameters[0];
	                            if( number < 0 ) {
	                                number = 0;
	                            }
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, number);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:oizp") {
	                            var number = parameters[0];
	                            var output = 1;
	                            if( number < 0 ) {
	                                output = 0;
	                            }
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, output);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:count") {
	                            var variableName = parameters[0];
	                            var variableObject = variablesHash[variableName];
	                            var count = 0;
	                            if(variableObject)
	                            {
	                                if(variableObject.hasValue){
	                                    if(variableObject.allValues && variableObject.allValues.length > 0)
	                                    {
	                                        count = variableObject.allValues.length;
	                                    } else {
	                                        //If there is a value found for the variable, the count is 1 even if there is no list of alternate values
	                                        //This happens for variables of "DATAELEMENT_CURRENT_STAGE" and "TEI_ATTRIBUTE"
	                                        count = 1;
	                                    }
	                                }
	                            }
	                            else
	                            {
	                                $log.warn("could not find variable to count: " + variableName);
	                            }
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, count);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:countIfZeroPos") {
	                            var variableName = $filter('trimvariablequalifiers') (parameters[0]);
	                            var variableObject = variablesHash[variableName];
	
	                            var count = 0;
	                            if(variableObject)
	                            {
	                                if( variableObject.hasValue ) {
	                                    if(variableObject.allValues && variableObject.allValues.length > 0)
	                                    {
	                                        for(var i = 0; i < variableObject.allValues.length; i++)
	                                        {
	                                            if(variableObject.allValues[i] >= 0) {
	                                                count++;
	                                            }
	                                        }
	                                    }
	                                    else {
	                                        //The variable has a value, but no list of alternates. This means we only compare the elements real value
	                                        if(variableObject.variableValue >= 0) {
	                                            count = 1;
	                                        }
	                                    }
	                                }
	                            }
	                            else
	                            {
	                                $log.warn("could not find variable to countifzeropos: " + variableName);
	                            }
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, count);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:countIfValue") {
	                            var variableName = parameters[0];
	                            var variableObject = variablesHash[variableName];
	
	                            var valueToCompare = VariableService.processValue(parameters[1],variableObject.variableType);
	
	                            var count = 0;
	                            if(variableObject)
	                            {
	                                if( variableObject.hasValue )
	                                {
	                                    if( variableObject.allValues && variableObject.allValues.length > 0 )
	                                    {
	                                        for(var i = 0; i < variableObject.allValues.length; i++)
	                                        {
	                                            if(valueToCompare === variableObject.allValues[i]) {
	                                                count++;
	                                            }
	                                        }
	                                    } else {
	                                        //The variable has a value, but no list of alternates. This means we compare the standard variablevalue
	                                        if(valueToCompare === variableObject.variableValue) {
	                                            count = 1;
	                                        }
	                                    }
	
	                                }
	                            }
	                            else
	                            {
	                                $log.warn("could not find variable to countifvalue: " + variableName);
	                            }
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, count);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:ceil") {
	                            var ceiled = Math.ceil(parameters[0]);
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, ceiled);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:round") {
	                            var rounded = Math.round(parameters[0]);
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, rounded);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:hasValue") {
	                            var variableName = parameters[0];
	                            var variableObject = variablesHash[variableName];
	                            var valueFound = false;
	                            if(variableObject)
	                            {
	                                if(variableObject.hasValue){
	                                    valueFound = true;
	                                }
	                            }
	                            else
	                            {
	                                $log.warn("could not find variable to check if has value: " + variableName);
	                            }
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, valueFound);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:lastEventDate") {
	                            var variableName = parameters[0];
	                            var variableObject = variablesHash[variableName];
	                            var valueFound = "''";
	                            if(variableObject)
	                            {
	                                if(variableObject.variableEventDate){
	                                    valueFound = VariableService.processValue(variableObject.variableEventDate, 'DATE');
	                                }
	                                else {
	                                    $log.warn("no last event date found for variable: " + variableName);
	                                }
	                            }
	                            else
	                            {
	                                $log.warn("could not find variable to check last event date: " + variableName);
	                            }
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, valueFound);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:validatePattern") {
	                            var inputToValidate = parameters[0].toString();
	                            var pattern = parameters[1];
	                            var regEx = new RegExp(pattern,'g');
	                            var match = inputToValidate.match(regEx);
	                            
	                            var matchFound = false;
	                            if(match !== null && inputToValidate === match[0]) {
	                                matchFound = true;
	                            }
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, matchFound);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:addControlDigits") {
	
	                            var baseNumber = parameters[0];
	                            var baseDigits = baseNumber.split('');
	                            var error = false;
	
	                            var firstDigit = 0;
	                            var secondDigit = 0;
	
	                            if(baseDigits && baseDigits.length < 10 ) {
	                                var firstSum = 0;
	                                var baseNumberLength = baseDigits.length;
	                                //weights support up to 9 base digits:
	                                var firstWeights = [3,7,6,1,8,9,4,5,2];
	                                for(var i = 0; i < baseNumberLength && !error; i++) {
	                                    firstSum += parseInt(baseDigits[i]) * firstWeights[i];
	                                }
	                                firstDigit = firstSum % 11;
	
	                                //Push the first digit to the array before continuing, as the second digit is a result of the
	                                //base digits and the first control digit.
	                                baseDigits.push(firstDigit);
	                                //Weights support up to 9 base digits plus first control digit:
	                                var secondWeights = [5,4,3,2,7,6,5,4,3,2];
	                                var secondSum = 0;
	                                for(var i = 0; i < baseNumberLength + 1 && !error; i++) {
	                                    secondSum += parseInt(baseDigits[i]) * secondWeights[i];
	                                }
	                                secondDigit = secondSum % 11;
	
	                                if(firstDigit === 10) {
	                                    $log.warn("First control digit became 10, replacing with 0");
	                                    firstDigit = 0;
	                                }
	                                if(secondDigit === 10) {
	                                    $log.warn("Second control digit became 10, replacing with 0");
	                                    secondDigit = 0;
	                                }
	                            }
	                            else
	                            {
	                                $log.warn("Base nuber not well formed(" + baseNumberLength + " digits): " + baseNumber);
	                            }
	
	                            if(!error) {
	                                //Replace the end evaluation of the dhis function:
	                                expression = expression.replace(callToThisFunction, baseNumber + firstDigit + secondDigit);
	                                expressionUpdated = true;
	                            }
	                            else
	                            {
	                                //Replace the end evaluation of the dhis function:
	                                expression = expression.replace(callToThisFunction, baseNumber);
	                                expressionUpdated = true;
	                            }
	                        }
	                        else if(dhisFunction.name === "d2:checkControlDigits") {
	                            $log.warn("checkControlDigits not implemented yet");
	
	                            //Replace the end evaluation of the dhis function:
	                            expression = expression.replace(callToThisFunction, parameters[0]);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:left") {
	                            var string = String(parameters[0]);
	                            var numChars = string.length < parameters[1] ? string.length : parameters[1];
	                            var returnString =  string.substring(0,numChars);
	                            returnString = VariableService.processValue(returnString, 'TEXT');
	                            expression = expression.replace(callToThisFunction, returnString);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:right") {
	                            var string = String(parameters[0]);
	                            var numChars = string.length < parameters[1] ? string.length : parameters[1];
	                            var returnString =  string.substring(string.length - numChars, string.length);
	                            returnString = VariableService.processValue(returnString, 'TEXT');
	                            expression = expression.replace(callToThisFunction, returnString);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:substring") {
	                            var string = String(parameters[0]);
	                            var startChar = string.length < parameters[1] - 1 ? -1 : parameters[1];
	                            var endChar = string.length < parameters[2] ? -1 : parameters[2];
	                            if(startChar < 0 || endChar < 0) {
	                                expression = expression.replace(callToThisFunction, "''");
	                                expressionUpdated = true;
	                            } else {
	                                var returnString =  string.substring(startChar, endChar);
	                                returnString = VariableService.processValue(returnString, 'TEXT');
	                                expression = expression.replace(callToThisFunction, returnString);
	                                expressionUpdated = true;
	                            }
	                        }
	                        else if(dhisFunction.name === "d2:split") {
	                            var string = String(parameters[0]);
	                            var splitArray = string.split(parameters[1]);
	                            var returnPart = "";
	                            if (splitArray.length >= parameters[2]) {
	                                returnPart = splitArray[parameters[2]];
	                            }
	                            returnPart = VariableService.processValue(returnPart, 'TEXT');
	                            expression = expression.replace(callToThisFunction, returnPart);
	                            expressionUpdated = true;
	                        }
	                        else if(dhisFunction.name === "d2:length") {
	                            expression = expression.replace(callToThisFunction, String(parameters[0]).length);
	                            expressionUpdated = true;
	                        }else if(dhisFunction.name === "d2:condition"){
	                            var toEvaluate = parameters[0]+"? "+parameters[1]+" : "+parameters[2];
	                            var result = eval(toEvaluate);
	                            expression = expression.replace(callsToThisFunction,result);
	                            expressionUpdated = true;
	                        }
	                    });
	                });
	
	                //We only want to continue looping until we made a successful replacement,
	                //and there is still occurrences of "d2:" in the code. In cases where d2: occur outside
	                //the expected d2: function calls, one unneccesary iteration will be done and the
	                //successfulExecution will be false coming back here, ending the loop. The last iteration
	                //should be zero to marginal performancewise.
	                if(expressionUpdated && expression.indexOf("d2:") !== -1) {
	                    continueLooping = true;
	                } else {
	                    continueLooping = false;
	                }
	            }
	        }
	
	        return expression;
	    };
	
	    var runExpression = function(expression, beforereplacement, identifier, flag, variablesHash ){
	        //determine if expression is true, and actions should be effectuated
	        //If DEBUG mode, use try catch and report errors. If not, omit the heavy try-catch loop.:
	        var answer = false;
	        if(flag && flag.debug) {
	            try{
	
	                var dhisfunctionsevaluated = runDhisFunctions(expression, variablesHash, flag);
	                answer = eval(dhisfunctionsevaluated);
	
	                if(flag.verbose)
	                {
	                    $log.info("Expression with id " + identifier + " was successfully run. Original condition was: " + beforereplacement + " - Evaluation ended up as:" + expression + " - Result of evaluation was:" + answer);
	                }
	            }
	            catch(e)
	            {
	                $log.warn("Expression with id " + identifier + " could not be run. Original condition was: " + beforereplacement + " - Evaluation ended up as:" + expression + " - error message:" + e);
	            }
	        }
	        else {
	            //Just run the expression. This is much faster than the debug route: http://jsperf.com/try-catch-block-loop-performance-comparison
	            var dhisfunctionsevaluated = runDhisFunctions(expression, variablesHash, flag);
	            answer = eval(dhisfunctionsevaluated);
	        }
	        return answer;
	    };
	
	    var determineValueType = function(value) {
	        var valueType = 'TEXT';
	        if(value === 'true' || value === 'false') {
	            valueType = 'BOOLEAN';
	        }
	        else if(angular.isNumber(value) || !isNaN(value)) {
	            if(value % 1 !== 0) {
	                valueType = 'NUMBER';
	            }
	            else {
	                valueType = 'INTEGER';
	            }
	        }
	        return valueType;
	    };
	
	    var performCreateEventAction = function(effect, selectedEntity, selectedEnrollment, currentEvents,executingEvent, programStage){
	        var valArray = [];
	        if(effect.data) {
	            valArray = effect.data.split(',');
	            var newEventDataValues = [];
	            var idList = {active:false};
	
	            angular.forEach(valArray, function(value) {
	                var valParts = value.split(':');                
	                if(valParts && valParts.length >= 1) {
	                    var valId = valParts[0];
	
	                    //Check wether one or more fields is marked as the id to use for comparison purposes:
	                    if(valId.trim().substring(0, 4) === "[id]") {
	                        valId = valId.substring(4,valId.length);
	                        idList[valId] = true;
	                        idList.active = true;
	                    }
	
	                    var valVal = "";
	                    if(valParts.length > 1) {
	                        valVal = valParts[1];
	                    }
	                    var valueType = determineValueType(valVal);
	
	                    var processedValue = VariableService.processValue(valVal, valueType);
	                    processedValue = $filter('trimquotes')(processedValue);
	                    newEventDataValues.push({dataElement:valId,value:processedValue});
	                    newEventDataValues[valId] = processedValue;
	                }
	            });
	
	            var valuesAlreadyExists = false;
	            angular.forEach(currentEvents, function(currentEvent) {
	                var misMatch = false;
	                angular.forEach(newEventDataValues, function(value) {
	                    var valueFound = false;
	                    angular.forEach(currentEvent.dataValues, function(currentDataValue) {
	                        //Only count as mismatch if there is no particular ID to use, or the current field is part of the same ID
	                        if(!idList.active || idList[currentDataValue.dataElement]){
	                            if(currentDataValue.dataElement === value.dataElement) {
	                                valueFound = true;
	                                //Truthy comparison is needed to avoid false negatives for differing variable types:
	                                if( currentDataValue.value != newEventDataValues[value.dataElement] ) {
	                                    misMatch = true;
	                                }
	                            }
	                        }
	                    });
	                    //Also treat no value found as a mismatch, but when ID fields is set, only concider ID fields
	                    if((!idList.active || idList[value.dataElement] ) && !valueFound) {
	                        misMatch = true;
	                    }
	                });
	                if(!misMatch) {
	                    //if no mismatches on this point, the exact same event already exists, and we dont create it.
	                    valuesAlreadyExists = true;
	                }
	            });
	
	            if(!valuesAlreadyExists) {
	                var eventDate = DateUtils.getToday();
	                var dueDate = DateUtils.getToday();
	
	                var newEvent = {
	                    trackedEntityInstance: selectedEnrollment.trackedEntityInstance,
	                    program: selectedEnrollment.program,
	                    programStage: effect.programStage.id,
	                    enrollment: selectedEnrollment.enrollment,
	                    orgUnit: selectedEnrollment.orgUnit,
	                    dueDate: dueDate,
	                    eventDate: eventDate,
	                    notes: [],
	                    dataValues: newEventDataValues,
	                    status: 'ACTIVE',
	                    event: dhis2.util.uid()
	                };
	
	                if(programStage && programStage.dontPersistOnCreate){
	                    newEvent.notPersisted = true;
	                    newEvent.executingEvent = executingEvent;
	                    $rootScope.$broadcast("eventcreated", { event:newEvent });
	                }
	                else{
	                    DHIS2EventFactory.create(newEvent).then(function(result){
	                       $rootScope.$broadcast("eventcreated", { event:newEvent });
	                    }); 
	                }
	                //1 event created
	                return 1;
	            }
	            else
	            {
	                //no events created
	                return 0;
	            }
	        } else {
	            $log.warn("Cannot create event with empty content.");
	        }
	    };
	    /**
	     * 
	     * @param {*} allProgramRules all program rules for the program
	     * @param {*} executingEvent the event context for the program
	     * @param {*} evs all events in the enrollment
	     * @param {*} allDataElements all data elements(metadata)
	     * @param {*} allTrackedEntityAttributes all tracked entity attributes(metadata)
	     * @param {*} selectedEntity the selected tracked entity instance
	     * @param {*} selectedEnrollment the selected enrollment
	     * @param {*} optionSets all optionsets(matedata)
	     * @param {*} flag execution flags
	     */
	    var internalExecuteRules = function(allProgramRules, executingEvent, evs, allDataElements, allTrackedEntityAttributes, selectedEntity, selectedEnrollment, optionSets, flag) {
	        if(allProgramRules) {
	            var variablesHash = {};
	
	            //Concatenate rules produced by indicator definitions into the other rules:
	            var rules = $filter('filter')(allProgramRules.programRules, {programStageId: null});
	
	            if(executingEvent && executingEvent.programStage){
	                if(!rules) {
	                    rules = [];
	                }
	                rules = rules.concat($filter('filter')(allProgramRules.programRules, {programStageId: executingEvent.programStage}));
	            }
	            if(!rules) {
	                rules = [];
	            }
	            rules = rules.concat(allProgramRules.programIndicators.rules);
	
	            //Run rules in priority - lowest number first(priority null is last)
	            rules = orderByFilter(rules, 'priority');
	
	            return VariableService.getVariables(allProgramRules, executingEvent, evs, allDataElements,
	                allTrackedEntityAttributes, selectedEntity, selectedEnrollment, optionSets).then( function(variablesHash) {
	                if(angular.isObject(rules) && angular.isArray(rules)){
	                    //The program has rules, and we want to run them.
	                    //Prepare repository unless it is already prepared:
	                    if(angular.isUndefined( $rootScope.ruleeffects ) ) {
	                        $rootScope.ruleeffects = {};
	                    }
	
	                    var ruleEffectKey = executingEvent.event ? executingEvent.event : executingEvent;
	                    if( executingEvent.event && angular.isUndefined( $rootScope.ruleeffects[ruleEffectKey] )){
	                        $rootScope.ruleeffects[ruleEffectKey] = {};
	                    }
	
	                    if(!angular.isObject(executingEvent) && angular.isUndefined( $rootScope.ruleeffects[ruleEffectKey] )){
	                        $rootScope.ruleeffects[ruleEffectKey] = {};
	                    }
	
	                    var updatedEffectsExits = false;
	                    var eventsCreated = 0;
	
	                    angular.forEach(rules, function(rule) {
	                        var ruleEffective = false;
	
	                        var expression = rule.condition;
	                        //Go through and populate variables with actual values, but only if there actually is any replacements to be made(one or more "$" is present)
	                        if(expression) {
	                            if(expression.indexOf('{') !== -1) {
	                                expression = replaceVariables(expression, variablesHash);
	                            }
	
	                            //run expression:
	                            if( runExpression(expression, rule.condition, "rule:" + rule.id, flag, variablesHash) ){
	                                ruleEffective = true;
	                            }
	                        } else {
	                            $log.warn("Rule id:'" + rule.id + "'' and name:'" + rule.name + "' had no condition specified. Please check rule configuration.");
	                        }
	
	                        angular.forEach(rule.programRuleActions, function(action){
	                            //In case the effect-hash is not populated, add entries
	                            if(angular.isUndefined( $rootScope.ruleeffects[ruleEffectKey][action.id] )){
	                                $rootScope.ruleeffects[ruleEffectKey][action.id] =  {
	                                    id:action.id,
	                                    location:action.location,
	                                    action:action.programRuleActionType,
	                                    dataElement:action.dataElement,
	                                    trackedEntityAttribute:action.trackedEntityAttribute,
	                                    programStage: action.programStage,
	                                    programIndicator: action.programIndicator,
	                                    programStageSection: action.programStageSection && action.programStageSection.id ? action.programStageSection.id : null,
	                                    content:action.content,
	                                    data:action.data,
	                                    ineffect:undefined
	                                };
	                            }
	
	                            //In case the rule is effective and contains specific data,
	                            //the effect be refreshed from the variables list.
	                            //If the rule is not effective we can skip this step
	                            if(ruleEffective && action.data)
	                            {
	                                //Preserve old data for comparison:
	                                var oldData = $rootScope.ruleeffects[ruleEffectKey][action.id].data;
	
	                                //The key data might be containing a dollar sign denoting that the key data is a variable.
	                                //To make a lookup in variables hash, we must make a lookup without the dollar sign in the variable name
	                                //The first strategy is to make a direct lookup. In case the "data" expression is more complex, we have to do more replacement and evaluation.
	
	                                var nameWithoutBrackets = action.data.replace('#{','').replace('}','');
	                                if(angular.isDefined(variablesHash[nameWithoutBrackets]))
	                                {
	                                    //The variable exists, and is replaced with its corresponding value
	                                    $rootScope.ruleeffects[ruleEffectKey][action.id].data =
	                                        variablesHash[nameWithoutBrackets].variableValue;
	                                }
	                                else if(action.data.indexOf('{') !== -1 || action.data.indexOf('d2:') !== -1)
	                                {
	                                    //Since the value couldnt be looked up directly, and contains a curly brace or a dhis function call,
	                                    //the expression was more complex than replacing a single variable value.
	                                    //Now we will have to make a thorough replacement and separate evaluation to find the correct value:
	                                    $rootScope.ruleeffects[ruleEffectKey][action.id].data = replaceVariables(action.data, variablesHash);
	                                    //In a scenario where the data contains a complex expression, evaluate the expression to compile(calculate) the result:
	                                    $rootScope.ruleeffects[ruleEffectKey][action.id].data = runExpression($rootScope.ruleeffects[ruleEffectKey][action.id].data, action.data, "action:" + action.id, flag, variablesHash);
	                                }
	
	                                if(oldData !== $rootScope.ruleeffects[ruleEffectKey][action.id].data) {
	                                    updatedEffectsExits = true;
	                                }
	                            }
	
	                            //Update the rule effectiveness if it changed in this evaluation;
	                            if($rootScope.ruleeffects[ruleEffectKey][action.id].ineffect !== ruleEffective)
	                            {
	                                //There is a change in the rule outcome, we need to update the effect object.
	                                updatedEffectsExits = true;
	                                $rootScope.ruleeffects[ruleEffectKey][action.id].ineffect = ruleEffective;
	                            }
	
	                            //In case the rule is of type CREATEEVENT, run event creation:
	                            if($rootScope.ruleeffects[ruleEffectKey][action.id].action === "CREATEEVENT" && $rootScope.ruleeffects[ruleEffectKey][action.id].ineffect){
	                                if(evs && evs.byStage){
	                                    if($rootScope.ruleeffects[ruleEffectKey][action.id].programStage) {
	                                        var createdNow = performCreateEventAction($rootScope.ruleeffects[ruleEffectKey][action.id], selectedEntity, selectedEnrollment, evs.byStage[$rootScope.ruleeffects[ruleEffectKey][action.id].programStage.id]);
	                                        eventsCreated += createdNow;
	                                    } else {
	                                        $log.warn("No programstage defined for CREATEEVENT action: " + action.id);
	                                    }
	                                } else {
	                                    $log.warn("Events to evaluate for CREATEEVENT action: " + action.id + ". Could it have been triggered at the wrong time or during registration?");
	                                }
	                            }
	                            //In case the rule is of type "assign variable" and the rule is effective,
	                            //the variable data result needs to be applied to the correct variable:
	                            else if($rootScope.ruleeffects[ruleEffectKey][action.id].action === "ASSIGN" && $rootScope.ruleeffects[ruleEffectKey][action.id].ineffect){
	                                //from earlier evaluation, the data portion of the ruleeffect now contains the value of the variable to be assigned.
	                                //the content portion of the ruleeffect defines the name for the variable, when the qualidisers are removed:
	                                var variabletoassign = $rootScope.ruleeffects[ruleEffectKey][action.id].content ?
	                                    $rootScope.ruleeffects[ruleEffectKey][action.id].content.replace("#{","").replace("A{","").replace("}","") : null;
	
	                                if(variabletoassign && !angular.isDefined(variablesHash[variabletoassign])){
	                                    //If a variable is mentioned in the content of the rule, but does not exist in the variables hash, show a warning:
	                                    $log.warn("Variable " + variabletoassign + " was not defined.");
	                                }
	
	                                if(variablesHash[variabletoassign]){
	                                    var updatedValue = $rootScope.ruleeffects[ruleEffectKey][action.id].data;
	
	                                    var valueType = determineValueType(updatedValue);
	
	                                    if($rootScope.ruleeffects[ruleEffectKey][action.id].dataElement) {
	                                        updatedValue = VariableService.getDataElementValueOrCodeForValue(variablesHash[variabletoassign].useCodeForOptionSet, updatedValue, $rootScope.ruleeffects[ruleEffectKey][action.id].dataElement.id, allDataElements, optionSets);
	                                    }
	                                    updatedValue = VariableService.processValue(updatedValue, valueType);
	
	                                    variablesHash[variabletoassign] = {
	                                        variableValue:updatedValue,
	                                        variableType:valueType,
	                                        hasValue:true,
	                                        variableEventDate:'',
	                                        variablePrefix:variablesHash[variabletoassign].variablePrefix ? variablesHash[variabletoassign].variablePrefix : '#',
	                                        allValues:[updatedValue]
	                                    };
	
	                                    if(variablesHash[variabletoassign].variableValue !== updatedValue) {
	                                        //If the variable was actually updated, we assume that there is an updated ruleeffect somewhere:
	                                        updatedEffectsExits = true;
	                                    }
	                                }
	                            }
	                        });
	                    });
	                    var result = { event: ruleEffectKey, callerId:flag.callerId, eventsCreated:eventsCreated };
	                    //Broadcast rules finished if there was any actual changes to the event.
	                    if(updatedEffectsExits){
	                        $rootScope.$broadcast("ruleeffectsupdated", result);
	                    }
	                    return result;
	                }
	                return null;
	            });
	        }
	        var def = $q.defer();
	        def.resolve();
	        return def.promise;
	    };
	    
	    var internalProcessEventGrid = function( eventGrid ){
	    	var events = [];
	    	if( eventGrid && eventGrid.rows && eventGrid.headers ){    		
	    		angular.forEach(eventGrid.rows, function(row) {
	    			var ev = {};
	    			var i = 0;
	        		angular.forEach(eventGrid.headers, function(h){
	        			ev[h] = row[i];
	        			i++;
	        		});                            
	            });
	    	}
	    	return events;
	    };
	
	    var internalGetOrLoadScope = function(currentEvent,programStageId,orgUnitId) {        
	        if(crossEventRulesExist) {
	            //If crossEventRulesExist, we need to get a scope that contains more than the current event.
	            if(lastEventId !== currentEvent.event 
	                    || lastEventDate !== currentEvent.eventDate 
	                    || !eventScopeExceptCurrent) {
	                //The scope might need updates, as the parameters of the event has changed
	
	                lastEventId = currentEvent.event;
	                lastEventDate = currentEvent.eventDate;
	
	                
	                var pager = {pageSize: NUMBER_OF_EVENTS_IN_SCOPE};                
	                var ordering = {id:"eventDate",direction:"desc"};
	                
	                return DHIS2EventFactory.getByStage(orgUnitId, programStageId, null, pager, true, null, null, ordering).then(function(events) {                	
	                	var allEventsWithPossibleDuplicates = internalProcessEventGrid( events );                	
	                    var filterUrl = '&dueDateStart=' + DateUtils.formatFromUserToApi(lastEventDate) + '&dueDateEnd=' + DateUtils.formatFromUserToApi(lastEventDate); 
	                    return DHIS2EventFactory.getByStage(orgUnitId, programStageId, null, pager, true, null, filterUrl, ordering).then(function(events) {
	                    	allEventsWithPossibleDuplicates = allEventsWithPossibleDuplicates.concat( internalProcessEventGrid( events ) );
	                        eventScopeExceptCurrent = [];
	                        var eventIdDictionary = {};
	                        angular.forEach(allEventsWithPossibleDuplicates, function(eventInScope) {
	                            if(currentEvent.event !== eventInScope.event 
	                                    && !eventIdDictionary[eventInScope.event]) {
	                                //Add event and update dictionary to avoid duplicates:                                
	                                eventIdDictionary[eventInScope.event] = true;
	                            }
	                        });
	
	                        //make a sorted list of all events to pass to rules execution service:
	                        var allEventsInScope = eventScopeExceptCurrent.concat([currentEvent]);
	                        allEventsInScope = orderByFilter(allEventsInScope, '-eventDate').reverse();
	                        var byStage = {};
	                        byStage[currentEvent.programStage] = allEventsInScope;
	                        return {all: allEventsInScope, byStage:byStage};
	                    });
	                });   
	            }
	            else
	            {
	                //make a sorted list of all events to pass to rules execution service:
	                var allEvents = eventScopeExceptCurrent.concat([currentEvent]);
	                allEvents = orderByFilter(allEvents, '-eventDate').reverse();
	                var byStage = {};
	                byStage[currentEvent.programStage] = allEvents;
	                return $q.when({all: allEvents, byStage:byStage});
	            }
	        }
	        else
	        {
	            //return a scope containing only the current event
	            var byStage = {};
	            byStage[currentEvent.programStage] = [currentEvent];
	            return $q.when({all: [currentEvent], byStage:byStage});
	        }
	    };
	    var internalGetOrLoadRules = function(programId) {
	        //If no rules is stored in memory, or this service is being called in the context of a different program, get the rules again:
	        if(allProgramRules === false || lastProgramId !== programId)
	        {
	            return RulesFactory.loadRules(programId).then(function(rules){                    
	                allProgramRules = rules;
	                lastProgramId = programId;
	
	                //Check if any of the rules is using any source type thar requires a bigger event scope
	                crossEventRulesExist = false;
	                if(rules.programVariables && rules.programVariables.length) {
	                    for(var i = 0; i < rules.programVariables.length; i ++) {
	                        if( rules.programVariables[i].programRuleVariableSourceType ===
	                                "DATAELEMENT_NEWEST_EVENT_PROGRAM" ||
	                            rules.programVariables[i].programRuleVariableSourceType ===
	                                "DATAELEMENT_NEWEST_EVENT_PROGRAM_STAGE" ||
	                            rules.programVariables[i].programRuleVariableSourceType ===
	                                "DATAELEMENT_PREVIOUS_EVENT")
	                        {
	                            crossEventRulesExist = true;
	                        }
	                    }
	                }
	
	                return rules;
	            });  
	        }
	        else
	        {
	            return $q.when(allProgramRules);
	        }
	    };
	    return {
	        executeRules: function(allProgramRules, executingEvent, evs, allDataElements, allTrackedEntityAttributes, selectedEntity, selectedEnrollment, optionSets, flags) {
	            return internalExecuteRules(allProgramRules, executingEvent, evs, allDataElements, allTrackedEntityAttributes, selectedEntity, selectedEnrollment, optionSets, flags);
	        },
	        loadAndExecuteRulesScope: function(currentEvent, programId, programStageId, programStageDataElements, allTrackedEntityAttributes, optionSets, orgUnitId, flags){
	            return internalGetOrLoadRules(programId).then(function(rules) {
	                return internalGetOrLoadScope(currentEvent,programStageId,orgUnitId).then(function(scope) {
	                    return internalExecuteRules(rules, currentEvent, scope, programStageDataElements, allTrackedEntityAttributes, null, null, optionSets, flags);
	                });
	            });
	        },
	        processRuleEffectsForTrackedEntityAttributes: function(context, currentTei, teiOriginalValues, attributesById, optionSets ) {
	            var hiddenFields = {};
	            var assignedFields = {};
	            var hiddenSections = {};
	            var mandatoryFields = {};
	            var warningMessages = [];
	            
	            angular.forEach($rootScope.ruleeffects[context], function (effect) {
	                if (effect.ineffect) {
	                    if (effect.action === "HIDEFIELD" && effect.trackedEntityAttribute) {
	                        if (currentTei[effect.trackedEntityAttribute.id]) {
	                            //If a field is going to be hidden, but contains a value, we need to take action;
	                            if (effect.content) {
	                                //TODO: Alerts is going to be replaced with a proper display mecanism.
	                                alert(effect.content);
	                            }
	                            else {
	                                //TODO: Alerts is going to be replaced with a proper display mecanism.
	                                alert(attributesById[effect.trackedEntityAttribute.id].displayName + " - was blanked out and hidden by your last action");
	                            }
	
	                            //Blank out the value:
	                            currentTei[effect.trackedEntityAttribute.id] = "";
	                        }
	
	                        hiddenFields[effect.trackedEntityAttribute.id] = true;
	                    } else if (effect.action === "SHOWERROR" && effect.trackedEntityAttribute) {
	                        if(effect.ineffect) {
	                            var headerText =  $translate.instant('validation_error');
	                            var bodyText = effect.content + (effect.data ? effect.data : "");
	
	                            NotificationService.showNotifcationDialog(headerText, bodyText);
	                            if( effect.trackedEntityAttribute ) {
	                                currentTei[effect.trackedEntityAttribute.id] = teiOriginalValues[effect.trackedEntityAttribute.id];
	                            }
	                        }
	                    } else if (effect.action === "SHOWWARNING" && effect.trackedEntityAttribute) {
	                        if(effect.ineffect) {
	                            var message = effect.content + (angular.isDefined(effect.data) ? effect.data : "");
	                            
	                            if( effect.trackedEntityAttribute ) {
	                                warningMessages[effect.trackedEntityAttribute.id] = message;
	                            }
	                            else
	                            {
	                                warningMessages.push(message);
	                            }
	                        }
	                    }
	                    else if (effect.action === "ASSIGN" && effect.trackedEntityAttribute) {
	                        var processedValue = $filter('trimquotes')(effect.data);
	
	                        if(attributesById[effect.trackedEntityAttribute.id]
	                                && attributesById[effect.trackedEntityAttribute.id].optionSet) {
	                            processedValue = OptionSetService.getName(
	                                    optionSets[attributesById[effect.trackedEntityAttribute.id].optionSet.id].options, processedValue)
	                        }
	
	                        processedValue = processedValue === "true" ? true : processedValue;
	                        processedValue = processedValue === "false" ? false : processedValue;
	
	                        //For "ASSIGN" actions where we have a dataelement, we save the calculated value to the dataelement:
	                        currentTei[effect.trackedEntityAttribute.id] = processedValue;
	                        assignedFields[effect.trackedEntityAttribute.id] = true;
	                    }else if(effect.action === "SETMANDATORYFIELD" && effect.trackedEntityAttribute){
	                        mandatoryFields[effect.trackedEntityAttribute.id] = effect.ineffect;
	                    }
	                }
	            });
	            return {currentTei: currentTei, hiddenFields: hiddenFields, hiddenSections: hiddenSections, warningMessages: warningMessages, assignedFields: assignedFields, mandatoryFields: mandatoryFields};
	        },
	        processRuleEffectsForEvent: function(eventId, currentEvent, currentEventOriginalValues, prStDes, optionSets ) {
	            var hiddenFields = {};
	            var assignedFields = {};
	            var mandatoryFields = {};
	            var hiddenSections = {};
	            var warningMessages = [];
	            
	            angular.forEach($rootScope.ruleeffects[eventId], function (effect) {
	                if (effect.ineffect) {
	                    if (effect.action === "HIDEFIELD" && effect.dataElement) {
	                        if(currentEvent[effect.dataElement.id]) {
	                            //If a field is going to be hidden, but contains a value, we need to take action;
	                            if(effect.content) {
	                                //TODO: Alerts is going to be replaced with a proper display mecanism.
	                                alert(effect.content);
	                            }
	                            else {
	                                //TODO: Alerts is going to be replaced with a proper display mecanism.
	                                alert(prStDes[effect.dataElement.id].dataElement.displayFormName + " - was blanked out and hidden by your last action");
	                            }
	
	                        }
	                        currentEvent[effect.dataElement.id] = "";
	                        hiddenFields[effect.dataElement.id] = true;
	                    }
	                    else if(effect.action === "HIDESECTION") {
	                        if(effect.programStageSection){
	                            hiddenSections[effect.programStageSection] = effect.programStageSection;
	                        }
	                    }
	                    else if(effect.action === "SHOWERROR" && effect.dataElement.id){
	                        var headerTxt =  $translate.instant('validation_error');
	                        var bodyTxt = effect.content + (effect.data ? effect.data : "");
	                        NotificationService.showNotifcationDialog(headerTxt, bodyTxt);
	
	                        currentEvent[effect.dataElement.id] = currentEventOriginalValues[effect.dataElement.id];
	                    }
	                    else if(effect.action === "SHOWWARNING"){
	                        warningMessages.push(effect.content + (effect.data ? effect.data : ""));
	                    }
	                    else if (effect.action === "ASSIGN" && effect.dataElement) {
	                        var processedValue = $filter('trimquotes')(effect.data);
	
	                        if(prStDes[effect.dataElement.id] 
	                                && prStDes[effect.dataElement.id].dataElement.optionSet) {
	                            processedValue = OptionSetService.getName(
	                                    optionSets[prStDes[effect.dataElement.id].dataElement.optionSet.id].options, processedValue)
	                        }
	
	                        processedValue = processedValue === "true" ? true : processedValue;
	                        processedValue = processedValue === "false" ? false : processedValue;
	
	                        currentEvent[effect.dataElement.id] = processedValue;
	                        assignedFields[effect.dataElement.id] = true;
	                    }
	                    else if (effect.action === "SETMANDATORYFIELD" && effect.dataElement) {
	                        mandatoryFields[effect.dataElement.id] = effect.ineffect;
	                    }
	                }
	            });
	        
	            return {currentEvent: currentEvent, hiddenFields: hiddenFields, hiddenSections: hiddenSections, warningMessages: warningMessages, assignedFields: assignedFields, mandatoryFields: mandatoryFields};
	        },
	        processRuleEffectAttribute: function(context, selectedTei, tei, currentEvent, currentEventOriginialValue, affectedEvent, attributesById, prStDes, hiddenFields, hiddenSections, warningMessages, assignedFields, optionSets, mandatoryFields){
	            //Function used from registration controller to process effects for the tracked entity instance and for the events in the same operation
	            var teiAttributesEffects = this.processRuleEffectsForTrackedEntityAttributes(context, selectedTei, tei, attributesById, optionSets );
	            teiAttributesEffects.selectedTei = teiAttributesEffects.currentTei;
	            
	            if(context === "SINGLE_EVENT" && currentEvent && prStDes ) {
	                var eventEffects = this.processRuleEffectsForEvent("SINGLE_EVENT", currentEvent, currentEventOriginialValue, prStDes, optionSets);
	                teiAttributesEffects.warningMessages = angular.extend(teiAttributesEffects.warningMessages,eventEffects.warningMessages);
	                teiAttributesEffects.hiddenFields[context] = eventEffects.hiddenFields;
	                teiAttributesEffects.hiddenSections[context] = eventEffects.hiddenSections;
	                teiAttributesEffects.assignedFields[context] = eventEffects.assignedFields;
	                teiAttributesEffects.mandatoryFields[context] = eventEffects.mandatoryFields;
	                teiAttributesEffects.currentEvent = eventEffects.currentEvent;
	            }
	            
	            return teiAttributesEffects;
	        }
	    };
	})
	
	/* service for dealing with events */
	.service('DHIS2EventService', function(DateUtils){
	    return {
	        //for simplicity of grid display, events were changed from
	        //event.datavalues = [{dataElement: dataElement, value: value}] to
	        //event[dataElement] = value
	        //now they are changed back for the purpose of storage.
	        reconstructEvent: function(event, programStageDataElements){
	            var e = {};
	
	            e.event         = event.event;
	            e.status        = event.status;
	            e.program       = event.program;
	            e.programStage  = event.programStage;
	            e.orgUnit       = event.orgUnit;
	            e.eventDate     = event.eventDate;
	
	            var dvs = [];
	            angular.forEach(programStageDataElements, function(prStDe){
	                if(event.hasOwnProperty(prStDe.dataElement.id)){
	                    dvs.push({dataElement: prStDe.dataElement.id, value: event[prStDe.dataElement.id]});
	                }
	            });
	
	            e.dataValues = dvs;
	
	            if(event.coordinate){
	                e.coordinate = {latitude: event.coordinate.latitude ? event.coordinate.latitude : '',
	                    longitude: event.coordinate.longitude ? event.coordinate.longitude : ''};
	            }
	
	            return e;
	        },
	        refreshList: function(eventList, currentEvent){
	            if(!eventList || !eventList.length){
	                return;
	            }
	            var continueLoop = true;
	            for(var i=0; i< eventList.length && continueLoop; i++){
	                if(eventList[i].event === currentEvent.event ){
	                    eventList[i] = currentEvent;
	                    continueLoop = false;
	                }
	            }
	            return eventList;
	        },
	        getEventExpiryStatus : function (event, program, selectedOrgUnit) {
	            var completedDate, today, daysAfterCompletion;
	
	            if ((event.orgUnit !== selectedOrgUnit) || ( program.completeEventsExpiryDays === 0) ||
	                !event.status) {
	                return false;
	            }
	
	            completedDate = moment(event.completedDate,'YYYY-MM-DD');
	            today = moment(DateUtils.getToday(),'YYYY-MM-DD');
	            daysAfterCompletion = today.diff(completedDate, 'days');
	            if (daysAfterCompletion < program.completeEventsExpiryDays) {
	                return false;
	            }
	            return true;
	        }
	    };
	})
	
	/* current selections */
	.service('CurrentSelection', function(){
	    this.currentSelection = {};
	    this.relationshipInfo = {};
	    this.optionSets = null;
	    this.attributesById = null;
	    this.ouLevels = null;
	    this.sortedTeiIds = [];
	    this.selectedTeiEvents = null;
	    this.relationshipOwner = {};
	    this.selectedTeiEvents = [];
	    this.fileNames = {};
	    this.orgUnitNames = {};
	    this.frontPageData = {};
	    this.location = null;
	    this.advancedSearchOptions = null;
	    this.frontPageData = null;
		this.trackedEntityTypes = null;
	
	    this.set = function(currentSelection){
	        this.currentSelection = currentSelection;
	    };
	    this.get = function(){
	        return this.currentSelection;
	    };
	
	    this.setRelationshipInfo = function(relationshipInfo){
	        this.relationshipInfo = relationshipInfo;
	    };
	    this.getRelationshipInfo = function(){
	        return this.relationshipInfo;
	    };
	
	    this.setOptionSets = function(optionSets){
	        this.optionSets = optionSets;
	    };
	    this.getOptionSets = function(){
	        return this.optionSets;
	    };
	
	    this.setAttributesById = function(attributesById){
	        this.attributesById = attributesById;
	    };
	    this.getAttributesById = function(){
	        return this.attributesById;
	    };
	
	    this.setOuLevels = function(ouLevels){
	        this.ouLevels = ouLevels;
	    };
	    this.getOuLevels = function(){
	        return this.ouLevels;
	    };
	
	    this.setSortedTeiIds = function(sortedTeiIds){
	        this.sortedTeiIds = sortedTeiIds;
	    };
	    this.getSortedTeiIds = function(){
	        return this.sortedTeiIds;
	    };
	
	    this.setSelectedTeiEvents = function(selectedTeiEvents){
	        this.selectedTeiEvents = selectedTeiEvents;
	    };
	    this.getSelectedTeiEvents = function(){
	        return this.selectedTeiEvents;
	    };
	
	    this.setRelationshipOwner = function(relationshipOwner){
	        this.relationshipOwner = relationshipOwner;
	    };
	    this.getRelationshipOwner = function(){
	        return this.relationshipOwner;
	    };
	
	    this.setFileNames = function(fileNames){
	        this.fileNames = fileNames;
	    };
	    this.getFileNames = function(){
	        return this.fileNames;
	    };
	    
	    this.setOrgUnitNames = function(orgUnitNames){
	        this.orgUnitNames = orgUnitNames;
	    };
	    this.getOrgUnitNames = function(){
	        return this.orgUnitNames;
	    };
	    
	    this.setLocation = function(location){
	        this.location = location;
	    };
	    this.getLocation = function(){
	        return this.location;
	    };
	    this.setTrackedEntityTypes = function (trackedEntityTypes) {
	        this.trackedEntityTypes = trackedEntityTypes;
	        if(this.frontPageData && this.frontPageData.trackedEntityList){
	            this.frontPageData.trackedEntityList.data = this.trackedEntityTypes;
	        }
	    };
	    this.getTrackedEntityTypes = function () {
	        return this.trackedEntityTypes;
	    };
	
	    this.setFrontPageData = function(frontPageData){
	        this.frontPageData = frontPageData;
	        if(this.frontPageData && this.frontPageData.trackedEntityList && this.frontPageData.trackedEntityList.data){
	            this.setTrackedEntityTypes(this.frontPageData.trackedEntityList.data);
	        }
	    }
	    this.getFrontPageData = function(){
	        return this.frontPageData;
	    }
	    this.setFrontPageRefresh = function(refresh){
	        if(this.frontPageData && this.frontPageData.trackedEntityList){
	            this.frontPageData.trackedEntityList.refresh = refresh;
	        }
	    }
	})
	
	.service('AuditHistoryDataService', function( $http, $translate, NotificationService, DHIS2URL ) {
	    this.getAuditHistoryData = function(dataId, dataType ) {
	        var url="";
	        if (dataType === "attribute") {
	            url="/audits/trackedEntityAttributeValue?tei="+dataId+"&skipPaging=true";
	            
	        } else {
	            url="/audits/trackedEntityDataValue?psi="+dataId+"&skipPaging=true";
	        }
	
	        var promise = $http.get(DHIS2URL + url).then(function( response ) {
	            return response.data;
	        }, function( response ) {
	            if( response && response.data && response.data.status === 'ERROR' ) {
	                var headerText = response.data.status;
	                var bodyText = response.data.message ? response.data.message : $translate.instant('unable_to_fetch_data_from_server');
	                NotificationService.showNotifcationDialog(headerText, bodyText);
	            }
	        });
	        return promise;
	    }
	})
	
	
	
	/* Factory for fetching OrgUnit */
	.factory('OrgUnitFactory', function($http, DHIS2URL, $q, $window, $translate, SessionStorageService, DateUtils, CurrentSelection) {
	    var orgUnit, orgUnitPromise, rootOrgUnitPromise,orgUnitTreePromise;
	    var indexedDB = $window.indexedDB;
	    var db = null;
	    function openStore(){
	        var deferred = $q.defer();
	        var request = indexedDB.open("dhis2ou");
	
	        request.onsuccess = function(e) {
	            db = e.target.result;
	            deferred.resolve();
	        };
	
	        request.onerror = function(){
	            deferred.reject();
	        };
	
	        return deferred.promise;
	    }
	    return {
	        getChildren: function(uid){
	            if( orgUnit !== uid ){
	                orgUnitPromise = $http.get( DHIS2URL + '/organisationUnits/'+ uid + '.json?fields=id,path,programs[id],level,children[id,displayName,programs[id],level,children[id]]&paging=false' ).then(function(response){
	                    orgUnit = uid;
	                    return response.data;
	                });
	            }
	            return orgUnitPromise;
	        },
	        get: function(uid){
	            if( orgUnit !== uid ){
	                orgUnitPromise = $http.get( DHIS2URL + '/organisationUnits/'+ uid + '.json?fields=id,displayName,programs[id],level,path' ).then(function(response){
	                    orgUnit = uid;
	                    return response.data;
	                });
	            }
	            return orgUnitPromise;
	        },
	        getByName: function(name){            
	            var promise = $http.get( DHIS2URL + '/organisationUnits.json?paging=false&fields=id,displayName,path,level,children[id,displayName,path,level,children[id]]&filter=displayName:ilike:' + name ).then(function(response){
	                return response.data;
	            });
	            return promise;        
	        },
	        getViewTreeRoot: function(){
	            var def = $q.defer();            
	            var settings = SessionStorageService.get('USER_PROFILE');            
	            if( settings && settings.organisationUnits ){
	                var ous = {};
	                ous.organisationUnits = settings && settings.dataViewOrganisationUnits && settings.dataViewOrganisationUnits.length > 0 ? settings.dataViewOrganisationUnits : settings && settings.organisationUnits ? settings.organisationUnits : [];                
	                def.resolve( ous );
	            }
	            else{
	                var url = DHIS2URL + '/me.json?fields=organisationUnits[id,displayName,level,path,children[id,displayName,level,children[id]]],dataViewOrganisationUnits[id,displayName,level,path,children[id,displayName,level,children[id]]]&paging=false';
	                $http.get( url ).then(function(response){
	                    response.data.organisationUnits = response.data.dataViewOrganisationUnits && response.data.dataViewOrganisationUnits.length > 0 ? response.data.dataViewOrganisationUnits : response.data.organisationUnits;
	                    delete response.data.dataViewOrganisationUnits;
	                    def.resolve( response.data );
	                });
	            }            
	            return def.promise;
	        },
	        getSearchTreeRoot: function(){
	            var def = $q.defer();            
	            var settings = SessionStorageService.get('USER_PROFILE');            
	            if( settings && settings.organisationUnits ){
	                var ous = {};
	                ous.organisationUnits = settings && settings.teiSearchOrganisationUnits && settings.teiSearchOrganisationUnits.length > 0 ? settings.teiSearchOrganisationUnits : settings && settings.organisationUnits ? settings.organisationUnits : [];
	                def.resolve( ous );
	            }
	            else{
	                var url = DHIS2URL + '/me.json?fields=organisationUnits[id,displayName,programs[id],level,path,children[id,displayName,programs[id],level,children[id]]],teiSearchOrganisationUnits[id,displayName,programs[id],level,path,children[id,displayName,programs[id],level,children[id]]]&paging=false';
	                $http.get( url ).then(function(response){
	                    response.data.organisationUnits = response.data.teiSearchOrganisationUnits && response.data.teiSearchOrganisationUnits.length > 0 ? response.data.teiSearchOrganisationUnits : response.data.organisationUnits;
	                    delete response.data.teiSearchOrganisationUnits;
	                    def.resolve( response.data );
	                });
	            }            
	            return def.promise;
	        },
	        getOrgUnits: function(uid,fieldUrl){
	            var url = DHIS2URL + '/organisationUnits.json?filter=id:eq:'+uid+'&'+fieldUrl+'&paging=false';
	            orgUnitTreePromise = $http.get(url).then(function(response){
	                return response.data;
	            });
	            return orgUnitTreePromise;
	        },
	        getOrgUnit: function(uid) {
	            var def = $q.defer();
	            var selectedOrgUnit = CurrentSelection.get()["orgUnit"];//SessionStorageService.get('SELECTED_OU');
	            if (selectedOrgUnit && selectedOrgUnit.id === uid ) {
	                def.resolve( selectedOrgUnit );
	            }
	            else if(uid){
	                this.get(uid).then(function (response) {
	                    def.resolve( response ? response : null );
	                });
	            }
	            else {
	                def.resolve(null);
	            }
	            return def.promise;
	        },
	        getOrgUnitReportDateRange: function(orgUnit) {
	            var reportDateRange = { maxDate: DateUtils.getToday(), minDate: ''};
	            var cdate = orgUnit.cdate ? orgUnit.cdate : orgUnit.closedDate ? DateUtils.getDateFromUTCString(orgUnit.closedDate) : null;
	            var odate = orgUnit.odate ? orgUnit.odate : orgUnit.openingDate ? DateUtils.getDateFromUTCString(orgUnit.openingDate) : null;
	            if (odate) {
	                /*If the orgunit has an opening date, then it is taken as the min-date otherwise the min-date is open*/
	                reportDateRange.minDate = DateUtils.formatFromApiToUser(odate);
	            }
	            if (cdate) {
	                /*If closed date of the org-unit is later than today then today's date is taken as the max-date otherwise
	                * the closed date of the org-unit is taken as the max-date*/
	                if (DateUtils.isBeforeToday(cdate)) {
	                    reportDateRange.maxDate = DateUtils.formatFromApiToUser(cdate);
	                }
	            }
	            return reportDateRange;
	        },
	        getFromStoreOrServer: function(uid){
	            var deferred = $q.defer();
	            var orgUnitFactory = this;
	            if (db === null) {
	                openStore().then(getOu, function () {
	                    deferred.reject("DB not opened");
	                });
	            }
	            else {                
	                getOu();                
	            }
	
	            function getOu() {
	                var tx = db.transaction(["ou"]);
	                var store = tx.objectStore("ou");
	                var query = store.get(uid);
	
	                query.onsuccess = function(e){
	                    if(e.target.result){
	                        e.target.result.closedStatus = getOrgUnitClosedStatus(e.target.result);
	                        e.target.result.reportDateRange = orgUnitFactory.getOrgUnitReportDateRange(e.target.result);
	                        e.target.result.id = uid;
	                        e.target.result.displayName = e.target.result.n;
	                        delete(e.target.result.n);
	                        deferred.resolve(e.target.result);
	                    }
	                    else{
	                        var t = db.transaction(["ouPartial"]);
	                        var s = t.objectStore("ouPartial");
	                        var q = s.get(uid);
	                        q.onsuccess = function(e){
	                            if( e.target.result ){
	                                e.target.result.closedStatus = getOrgUnitClosedStatus(e.target.result);
	                                e.target.result.reportDateRange = orgUnitFactory.getOrgUnitReportDateRange(e.target.result);
	                                e.target.result.id = uid;
	                                e.target.result.displayName = e.target.result.n;
	                                delete(e.target.result.n);
	                                deferred.resolve(e.target.result);
	                            }
	                            else{
	                                $http.get( DHIS2URL + '/organisationUnits/'+ uid + '.json?fields=id,displayName,code,closedDate,openingDate' ).then(function(response){
	                                    if( response && response.data ){
	                                        deferred.resolve({
	                                            id: response.data.id,
	                                            displayName: response.data.displayName,
	                                            cdate: response.data.closedDate,
	                                            odate: response.data.openingDate,
	                                            code: response.data.code,
	                                            closedStatus: getOrgUnitClosedStatus(response.data),
	                                            reportDateRange: orgUnitFactory.getOrgUnitReportDateRange(response.data)
	                                        });
	                                    }
	                                });
	                            }
	                        };
	                        q.onerror = function(e){                            
	                            deferred.reject();
	                        };
	                    }
	                };
	                query.onerror = function(e){
	                    deferred.reject();
	                };
	            }
	
	
	
	            function getOrgUnitClosedStatus(ou){
	                var closed = false;
	                if( ou ){
	                    if( ou.cdate ){
	                        closed = DateUtils.isBeforeToday( ou.cdate ) ? true : false;
	                    }
	                    if(!closed && ou.odate ){
	                        closed = DateUtils.isAfterToday( ou.odate ) ? true : false;
	                    }
	                }
	                if(closed) {
	                    setHeaderDelayMessage($translate.instant("orgunit_closed"));
	                } else {
	                    hideHeaderMessage();
	                }
	                return closed;
	            }
	            return deferred.promise;
	        }
	    };
	})
	.service('UserDataStoreService', function ($http, $q, DHIS2URL, $translate, SessionStorageService, NotificationService) {
	    var baseUrl = DHIS2URL+'/userDataStore';
	    var cached = {};
	    var getUrl = function(container, name){
	        return baseUrl + "/" + container + "/" + name;
	    }
	
	    var setCached = function(container, name, data){
	        if(!cached[container]) cached[container] = {};
	        cached[container][name] = data;
	    }
	    return {
	        set: function (data, container, name) {
	            var deferred = $q.defer();
	            var httpMessage = {
	                method: "put",
	                url: getUrl(container, name),
	                data: data,
	                headers: {'Content-Type': 'application/json;charset=UTF-8'}
	            };
	
	            $http(httpMessage).then(function (response) {
	                setCached(data);
	                deferred.resolve(response.data);
	            },function (error) {
	                httpMessage.method = "post";
	                $http(httpMessage).then(function (response) {
	                    setCached(data);
	                    deferred.resolve(response.data);
	                }, function (error) {
	                    if (error && error.data) {
	                        deferred.reject(error.data);
	                    } else {
	                        deferred.reject(null);
	                    }
	                });
	            });
	            return deferred.promise;
	        },
	        get: function (container, name) {
	            var deferred = $q.defer();
	
	            if(cached[container] && angular.isDefined(cached[container][name])){
	                deferred.resolve(cached[container][name]);
	            }else{
	                $http.get(getUrl(container,name)).then(function (response) {
	                    if (response && response.data) {
	                        setCached(container, name, response.data);
	                        deferred.resolve(response.data);
	                    } else {
	                        deferred.resolve(null);
	                    }
	                }, function (error) {
	                    setCached(container,name, null);
	                    deferred.resolve(null);
	                });
	                
	            }
	
	            return deferred.promise;
	        }
	    };
	})
	.factory("AttributeUtils", function($http,DHIS2URL){
	    var getValueUrl = function(valueToSet, selectedTei, program, orgUnit, required){
	        var valueUrlBase = valueToSet+"=";
	        var valueUrl = null;
	        switch(valueToSet){
	            case "ORG_UNIT_CODE":
	                if(orgUnit && orgUnit.code) valueUrl = valueUrlBase+orgUnit.code;
	                break;
	            default:
	                return null;
	        }
	        if(required && !valueUrl) throw "value "+valueToSet+ "not found";
	        return valueUrl;
	    }
	    return {
	        generateUniqueValue: function(attribute, selectedTei, program, orgUnit) {
	            var getValueUrl = function(valueToSet, selectedTei, program, orgUnit, required){
	                var valueUrlBase = valueToSet+"=";
	                var valueUrl = null;
	                switch(valueToSet){
	                    case "ORG_UNIT_CODE":
	                        if(orgUnit && orgUnit.code) valueUrl = valueUrlBase+orgUnit.code;
	                        break;
	                    default:
	                        return null;
	                }
	                if(required && !valueUrl) throw "value "+valueToSet+ "not found";
	                return valueUrl;
	            }
	    
	            return $http.get(DHIS2URL + '/trackedEntityAttributes/'+attribute+'/requiredValues').then(function(response){
	                var paramsUrl = "?";
	                if(response && response.data){
	                    if(response.data.REQUIRED){
	                        angular.forEach(response.data.REQUIRED, function(requiredValue){
	                            var valueUrl = getValueUrl(requiredValue, selectedTei, program, orgUnit,true);
	                            paramsUrl+="&"+valueUrl;
	                        });
	                    }
	                    if(response.data.OPTIONAL){
	                        angular.forEach(response.data.OPTIONAL, function(optionalValue){
	                            var valueUrl = getValueUrl(optionalValue, selectedTei, program, orgUnit,false);
	                            if(valueUrl) paramsUrl += "&"+valueUrl;
	                        });
	                    }
	                }
	                if(paramsUrl.length >= 2 && paramsUrl.charAt(1) === "&") paramsUrl = paramsUrl.slice(0,1)+paramsUrl.slice(2);
	                return $http.get(DHIS2URL + '/trackedEntityAttributes/' + attribute + '/generate'+paramsUrl).then(function (response) {
	                    if (response && response.data && response.data.value) {
	                        return response.data.value;
	                    }
	                    return null;
	                }, function (response) {
	                    return response.data;
	                });
	            });
	        }
	    }
	
	});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/* global moment, angular, directive, dhis2, selection */
	
	'use strict';
	
	/* Directives */
	
	var d2Directives = angular.module('d2Directives', [])
	
	
	.directive('selectedOrgUnit', function ($timeout, $location) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            var orgUnitFromUrl;
	            window.onhashchange = function(a,b,c,d){
	                selection.load();
	            }
	            
	            $("#orgUnitTree").on("ouwtLoaded", function(event, ids, names){
	                console.log("on outree");
	            });
	            $("#orgUnitTree").one("ouwtLoaded", function (event, ids, names) {
	                if (dhis2.tc && dhis2.tc.metaDataCached) {
	                    $timeout(function () {
	                        scope.treeLoaded = true;
	                        scope.$apply();
	                    });
	                    selection.responseReceived();
	                }
	                else {
	                    console.log('Finished loading orgunit tree');
	                    orgUnitFromUrl = ($location.search()).ou;
	                    $("#orgUnitTree").addClass("disable-clicks"); //Disable ou selection until meta-data has downloaded
	                    $timeout(function () {
	                        scope.treeLoaded = true;
	                        scope.$apply();
	                    });
	                    downloadMetaData();
	                }
	            });
	
	            //listen to user selection, and inform angular
	            selection.setListenerFunction(setSelectedOu, true);
	            function setSelectedOu(ids, names) {
	                var ou = {id: ids[0], displayName: names[0]};
	                if(orgUnitFromUrl && ou.id !== orgUnitFromUrl) {
	                    selection.setOrgUnitFromURL(orgUnitFromUrl);
	                    orgUnitFromUrl = null;
	                } else {
	                    $timeout(function () {
	                        scope.selectedOrgUnit = ou;
	                        scope.$apply();
	                    });
	                }
	            }
	        }
	    };
	})
	
	.directive('d2SetFocus', function ($timeout) {
	
	    return {
	        scope: { trigger: '@d2SetFocus' },
	        link: function(scope, element) {
	            scope.$watch('trigger', function(value) {
	                if(value === "true") {
	                    $timeout(function() {
	                        element[0].focus();
	                    });
	                }
	            });
	        }
	    };
	})
	
	.directive('d2LeftBar', function () {
	
	    return {
	        restrict: 'E',
	        templateUrl: 'views/left-bar.html',
	        link: function (scope, element, attrs) {
	
	            $("#searchIcon").click(function () {
	                $("#searchSpan").toggle();
	                $("#searchField").focus();
	            });
	
	            $("#searchField").autocomplete({
	                source: "../dhis-web-commons/ouwt/getOrganisationUnitsByName.action",
	                select: function (event, ui) {
	                    $("#searchField").val(ui.item.value);
	                    selection.findByName();
	                }
	            });
	        }
	    };
	})
	
	.directive('d2OnBlurChange', function ($parse) {
	    return function (scope, element, attr) {
	        var fn = $parse(attr['d2OnBlurChange']);
	        var hasChanged = false;
	        element.on('change', function (event) {
	            hasChanged = true;
	        });
	        
	        element.on('blur', function (event) {
	            if (hasChanged) {
	                scope.$apply(function () {
	                    fn(scope, {$event: event});
	                });
	                hasChanged = false;
	            }
	        });
	    };
	})
	
	.directive('d2OnEnterBlur', function() {  
	    return function(scope, element, attrs) {
	        element.bind("keydown keypress", function(event) {
	            if(event.which === 13) {
	                element.blur();
	                event.preventDefault();
	            }
	        });
	    };
	})
	
	.directive('blurOrChange', function () {
	
	    return function (scope, elem, attrs) {
	        elem.calendarsPicker({
	            onSelect: function () {
	                scope.$apply(attrs.blurOrChange);
	                $(this).change();
	            }
	        }).change(function () {
	            scope.$apply(attrs.blurOrChange);
	        });
	    };
	})
	
	.directive('d2Enter', function () {
	    return function (scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if (event.which === 13) {
	                scope.$apply(function () {
	                    scope.$eval(attrs.d2Enter);
	                });
	                event.preventDefault();
	            }
	        });
	    };
	})
	
	.directive('d2PopOver', function ($compile, $templateCache, $translate) {
	
	    return {
	        restrict: 'EA',
	        scope: {
	            content: '=',
	            program: '=',
	            title: '@details',
	            template: "@template",
	            placement: "@placement",
	            trigger: "@trigger"
	        },
	        link: function (scope, element) {
	            var content, program;
	            if (scope.content) {
	                content = $templateCache.get(scope.template);
	                content = $compile(content)(scope);
	                if( scope.program ){
	                    program = $templateCache.get(scope.template);
	                    program = $compile(program)(scope);
	                }
	                var options = {
	                    content: content,
	                    program: program,
	                    placement: scope.placement ? scope.placement : 'auto',
	                    trigger: scope.trigger ? scope.trigger : 'hover',
	                    html: true,
	                    title: $translate.instant('_details')
	                };
	                element.popover(options);
	
	                $('body').on('click', function (e) {
	                    if (!element[0].contains(e.target)) {
	                        element.popover('hide');
	                        //Fix for bootstrap 3.0.2. This is fixed in 3.1.0
	                        var popover = element.siblings('.popover.fade.right');
	                        if(popover) popover.remove();
	                    }
	                });
	            }
	        }
	    };
	})
	
	.directive('d2Sortable', function ($timeout) {
	
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            element.sortable({
	                connectWith: ".connectedSortable",
	                placeholder: "ui-state-highlight",
	                tolerance: "pointer",
	                handle: '.handle',
	                change: function (event, ui) {
	                    getSortedItems(ui);
	                },
	                receive: function (event, ui) {
	                    getSortedItems(ui);
	                }
	            });
	
	            var getSortedItems = function (ui) {
	                var biggerWidgets = $("#biggerWidget").sortable("toArray");
	                var smallerWidgets = $("#smallerWidget").sortable("toArray");
	                var movedIsIdentifeid = false;
	
	                //look for the moved item in the bigger block
	                for (var i = 0; i < biggerWidgets.length && !movedIsIdentifeid; i++) {
	                    if (biggerWidgets[i] === "") {
	                        biggerWidgets[i] = ui.item[0].id;
	                        movedIsIdentifeid = true;
	                    }
	                }
	
	                //look for the moved item in the smaller block
	                for (var i = 0; i < smallerWidgets.length && !movedIsIdentifeid; i++) {
	                    if (smallerWidgets[i] === "") {
	                        smallerWidgets[i] = ui.item[0].id;
	                        movedIsIdentifeid = true;
	                    }
	                }
	                var layout = {smallerWidgets: smallerWidgets, biggerWidgets: biggerWidgets};
	                scope.applyWidgetsOrderChange( layout );
	            };
	        }
	    };
	})
	
	.directive('serversidePaginator', function factory() {
	
	    return {
	        restrict: 'E',
	        controller: function ($scope, Paginator) {
	            $scope.paginator = Paginator;
	        },
	        templateUrl: './templates/serverside-pagination.html'
	    };
	})
	
	.directive('d2CustomDataEntryForm', function ($compile) {
	    return{
	        restrict: 'E',
	        link: function (scope, elm, attrs) {
	            scope.$watch('customDataEntryForm', function () {
	                if (angular.isObject(scope.customDataEntryForm)) {
	                    elm.html(scope.customDataEntryForm.htmlCode);
	                    $compile(elm.contents())(scope);
	                }
	            });
	        }
	    };
	})
	
	.directive('d2CustomRegistrationForm', function ($compile) {
	    return{
	        restrict: 'E',
	        link: function (scope, elm, attrs) {
	            scope.$watch('customRegistrationForm', function () {
	                if (angular.isObject(scope.customRegistrationForm)) {
	                    elm.html(scope.customRegistrationForm.htmlCode);
	                    $compile(elm.contents())(scope);
	                }
	            });
	        }
	    };
	})
	
	/* TODO: this directive access an element #contextMenu somewhere in the document. Looks like it has to be rewritten */
	.directive('d2ContextMenu', function () {
	
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            var contextMenu = $("#contextMenu");
	
	            element.click(function (e) {
	                var menuHeight = contextMenu.height();
	                var menuWidth = contextMenu.width();
	                var winHeight = $(window).height();
	                var winWidth = $(window).width();
	
	                var pageX = e.pageX;
	                var pageY = e.pageY;
	
	                contextMenu.show();
	
	                if ((menuWidth + pageX) > winWidth) {
	                    pageX -= menuWidth;
	                }
	
	                if ((menuHeight + pageY) > winHeight) {
	                    pageY -= menuHeight;
	
	                    if (pageY < 0) {
	                        pageY = e.pageY;
	                    }
	                }
	
	                contextMenu.css({
	                    left: pageX,
	                    top: pageY
	                });
	
	                return false;
	            });
	
	            contextMenu.on("click", "a", function () {
	                contextMenu.hide();
	            });
	
	            $(document).click(function () {
	                contextMenu.hide();
	            });
	        }
	    };
	})
	
	.directive('d2Date', function (CalendarService, $parse) {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function (scope, element, attrs, ctrl) {
	            var calendarSetting = CalendarService.getSetting();
	            var dateFormat = 'yyyy-mm-dd';
	            if (calendarSetting.keyDateFormat === 'dd-MM-yyyy') {
	                dateFormat = 'dd-mm-yyyy';
	            }
	
	            var minDate = $parse(attrs.minDate)(scope);
	            var maxDate = $parse(attrs.maxDate)(scope);
	            var calendar = $.calendars.instance(calendarSetting.keyCalendar);
	            var pickerClass = attrs.pickerClass;
	
	            var initializeDatePicker = function( sDate, eDate ){
	                element.calendarsPicker({
	                    pickerClass: pickerClass,
	                    changeMonth: true,
	                    dateFormat: dateFormat,
	                    yearRange: '-120:+30',
	                    minDate: sDate,
	                    maxDate: eDate,
	                    calendar: calendar,
	                    duration: "fast",
	                    showAnim: "",
	                    renderer: $.calendars.picker.themeRollerRenderer,
	                    onSelect: function () {
	                        $(this).change();
	                    },
	                    onClose:function(){
	                        $(this).blur();
	                    }
	                }).change(function () {
	                    ctrl.$setViewValue(this.value);
	                    this.focus();
	                    scope.$apply();
	                });
	            };
	
	            initializeDatePicker(minDate, maxDate);
	
	            scope.$watch(attrs.minDate, function(value){
	                element.calendarsPicker('destroy');
	                initializeDatePicker( value, $parse(attrs.maxDate)(scope));
	            });
	
	            scope.$watch(attrs.maxDate, function(value){
	                element.calendarsPicker('destroy');
	                initializeDatePicker( $parse(attrs.minDate)(scope), value);
	            });
	        }
	    };
	})
	
	.directive('d2FileInput', function($translate, DHIS2EventService, DHIS2EventFactory, FileService, NotificationService){
	
	    return {
	        restrict: "A",
	        scope: {
	            d2FileInputList: '=',
	            d2FileInput: '=',
	            d2FileInputName: '=',
	            d2FileInputCurrentName: '=',
	            d2FileInputPs: '='
	        },
	        link: function (scope, element, attrs) {
	
	            var de = attrs.inputFieldId;
	
	            var updateModel = function () {
	
	                var update = scope.d2FileInput.event &&  scope.d2FileInput.event !== 'SINGLE_EVENT' ? true : false;
	
	                FileService.upload(element[0].files[0]).then(function(data){
	                    if(data && data.status === 'OK' && data.response && data.response.fileResource && data.response.fileResource.id && data.response.fileResource.name){
	                        scope.d2FileInput[de] = data.response.fileResource.id;
	                        scope.d2FileInputCurrentName[de] = data.response.fileResource.name;
	                        if(!scope.d2FileInputName[scope.d2FileInput.event]){
	                            scope.d2FileInputName[scope.d2FileInput.event] = {};
	                        }
	                        scope.d2FileInputName[scope.d2FileInput.event][de] = data.response.fileResource.name;
	                        if( update ){
	                            var updatedSingleValueEvent = {event: scope.d2FileInput.event, dataValues: [{value: data.response.fileResource.id, dataElement:  de}]};
	                            var updatedFullValueEvent = DHIS2EventService.reconstructEvent(scope.d2FileInput, scope.d2FileInputPs.programStageDataElements);
	                            DHIS2EventFactory.updateForSingleValue(updatedSingleValueEvent, updatedFullValueEvent).then(function(data){
	                                scope.d2FileInputList = DHIS2EventService.refreshList(scope.d2FileInputList, scope.d2FileInput);
	                            });
	                        }
	                    }
	                    else{
	                        NotificationService.showNotifcationDialog($translate.instant("error"),
	                            $translate.instant("file_upload_failed"));
	                    }
	
	                });
	            };
	            element.bind('change', updateModel);
	        }
	    };
	})
	
	.directive('d2FileInputDelete', function($parse, $timeout, $translate, FileService, NotificationService){
	
	    return {
	        restrict: "A",
	        link: function (scope, element, attrs) {
	            var valueGetter = $parse(attrs.d2FileInputDelete);
	            var nameGetter = $parse(attrs.d2FileInputName);
	            var nameSetter = nameGetter.assign;
	
	            if(valueGetter(scope)) {
	                FileService.get(valueGetter(scope)).then(function(data){
	                    if(data && data.name && data.id){
	                        $timeout(function(){
	                            nameSetter(scope, data.name);
	                            scope.$apply();
	                        });
	                    }
	                    else{
	                        NotificationService.showNotifcationDialog($translate.instant("error"),
	                            $translate.instant("file_missing"));
	                    }
	                });
	            }
	        }
	    };
	})
	
	.directive('d2TrackerAssociate', function($parse, $timeout, $translate, CurrentSelection, TEIService){
	
	    return {
	        restrict: "E",
	        templateUrl: "./templates/tracker-associate-input.html",
	        scope: {
	            d2SelectedTei: '=',
	            d2Attribute: '=',
	            d2SelectedProgram: '=',
	            d2BlurMethode: '=',
	            d2SelectedOrgunit: '=',
	            d2GetTaPromise: "="
	        },
	        link: function (scope, element, attrs) {
	            var attributes = CurrentSelection.getAttributesById();
	            scope.userDetailsName = [];
	            scope.userDetailsData = [];
	
	            if(scope.d2SelectedTei[scope.d2Attribute.id]) {
	                TEIService.get(scope.d2SelectedTei[scope.d2Attribute.id], null, attributes).then(function (response) {
	                    for(var i = 0; i < response.attributes.length; i++) {
	                        scope.userDetailsName.push(response.attributes[i].displayName);
	                        scope.userDetailsData.push(response.attributes[i].value);
	                    }
	                });
	            }
	
	            scope.getTa = function() {
	                scope.userDetailsName = [];
	                scope.userDetailsData = [];
	
	                scope.d2GetTaPromise(scope.d2Attribute, scope.d2SelectedTei[scope.d2Attribute.id]).then(function(data) {
	                    TEIService.get(scope.d2SelectedTei[scope.d2Attribute.id], null, attributes).then(function (response) {
	                        for(var i = 0; i < response.attributes.length; i++) {
	                            scope.userDetailsName.push(response.attributes[i].displayName);
	                            scope.userDetailsData.push(response.attributes[i].value);
	                        }
	                    });
	                });
	            }
	
	            scope.delete = function() {
	                scope.d2SelectedTei[scope.d2Attribute.id] = null
	                scope.userDetailsName = [];
	                scope.userDetailsData = [];
	            }
	        }
	    };
	})
	
	.directive('d2UsersInput', function(){
	    return {
	        restrict: 'E',
	        templateUrl: './templates/users-input.html',
	        scope: {
	            d2Model: '=',
	            d2ModelId: '=',
	            d2Required: '=',
	            d2Disabled: '=',
	            d2SaveMethode: '&',
	            d2SaveMethodeParameter1: '=',
	            d2SaveMethodeParameter2: '=',
	            d2MaxOptionSize: '=',
	            d2UseNotification: '=',
	            d2Element: '='
	            
	        },
	        link: function (scope, element, attrs) {
	
	        },
	        controller: function($scope, UsersService, OrgUnitFactory) {
	            $scope.allUsers = [];        
	            $scope.temp = UsersService.getAll().then(function(users){
	                $scope.allUsers = users;
	            });
	
	            $scope.saveOption = function() {
	                $scope.d2SaveMethode()($scope.d2SaveMethodeParameter1, $scope.d2SaveMethodeParameter2);
	            };
	
	            $scope.getInputNotifcationClass = function(id) {
					event = $scope.d2Model;
					
					if($scope.d2Element && $scope.d2Element.id === id && $scope.d2Element.event && $scope.d2Element.event === event.event) {
						if($scope.d2Element.pending) {
							return 'input-pending';
						}
						
						if($scope.d2Element.saved) {
							return 'input-success';
						} else {
							return 'input-error';
						}            
					}  
					return '';
				};
	        }
	
	    };
	})
	
	.directive('d2Audit', function (CurrentSelection, MetaDataFactory ) {
	    return {
	        restrict: 'E',
	        template: '<span class="hideInPrint audit-icon" ng-attr-title="{{\'audit_history\' | translate}}" data-ng-click="showAuditHistory()">' +
	        '<i class="glyphicon glyphicon-user""></i>' +
	        '</span>',
	        scope: {
	            eventId: '@',
	            type: '@',
	            nameIdMap: '='
	        },
	        controller: function ($scope, $modal) {
	            $scope.showAuditHistory = function () {
	
	                var openModal = function( ops ){
	                    $modal.open({
	                        templateUrl: "./templates/audit-history.html",
	                        controller: "AuditHistoryController",
	                        resolve: {
	                            eventId: function () {
	                                return $scope.eventId;
	                            },
	                            dataType: function () {
	                                return $scope.type;
	                            },
	                            nameIdMap: function () {
	                                return $scope.nameIdMap;
	                            },
	                            optionSets: function(){
	                                return ops;
	                            }
	                        }
	                    });
	                };
	
	                var optionSets = CurrentSelection.getOptionSets();
	                if(!optionSets){
	                    optionSets = [];
	                    MetaDataFactory.getAll('optionSets').then(function(optionSets){
	                        angular.forEach(optionSets, function(optionSet){
	                            optionSets[optionSet.id] = optionSet;
	                        });
	                        CurrentSelection.setOptionSets(optionSets);
	                        openModal(optionSets);
	                    });
	                }
	                else{
	                    openModal(optionSets);
	                }
	            };
	        }
	    };
	})
	
	.directive("d2Image",function($http, $compile, DHIS2URL, CurrentSelection){
	    return {
	        restrict : 'E',
	        scope : {
	            d2Disabled: "=",
	            d2Required: "=",
	            d2DisplayOpen: "=",
	            d2IsAttribute: "=",
	            d2CanEdit: "=",
	            d2HideImage: "=",
	            d2Event: "=",
	            d2Tei: "=",
	            d2DataElementId: "=",
	            d2FileNames: "=",
	            d2CurrentImageName: "=",
	            d2Ps: "=",
	            d2DeleteMethode: "=",
	            d2DownloadMethode: "="
	        },
	        templateUrl: "./templates/img-input.html",
	        link : function(scope,elem,attrs){
	            if(scope.d2IsAttribute && scope.d2FileNames['undefined'] && scope.d2Tei && !scope.d2Tei.trackedEntityInstance) {
	                scope.d2FileNames['undefined'] = null;
	            } else if(!scope.d2IsAttribute && scope.d2FileNames['SINGLE_EVENT'] && scope.d2Event && scope.d2Event.event === 'SINGLE_EVENT') {
	                scope.d2FileNames['SINGLE_EVENT'] = null;
	            }
	            
	            if(scope.d2IsAttribute && scope.d2Tei) {
	                scope.path = DHIS2URL + "/trackedEntityInstances/" + scope.d2Tei.trackedEntityInstance + "/" + scope.d2DataElementId + "/image";
	            } else if(!scope.d2IsAttribute && scope.d2Event) {
	                scope.path = DHIS2URL + "/events/files?eventUid=" + scope.d2Event.event + "&dataElementUid=" + scope.d2DataElementId;
	            }
	            
	
	            scope.fetch = function() {
	                if(!scope.d2IsAttribute) {
	                    scope.path = scope.path + "&" + new Date().getTime();
	                } else {
	                    scope.path = scope.path + "?" + new Date().getTime();
	                }
	            };
	
	            scope.delete = function() {
	                scope.d2DeleteMethode(scope.d2Event, scope.d2DataElementId);
	            };
	        }
	    }
	})
	
	.directive("d2ImageInList",function($http, $compile, DHIS2URL){
	    return {
	        restrict : 'E',
	        scope : {
	            d2Tei: "=",
	            d2AttributeId: "=",
	            d2EventId: "=",
	            d2DeId: "="
	        },
	        template: '<img ng-if="path" ng-src="{{path}}" onerror="this.onerror=null;this.src=\'\';" style="display: block; margin: auto; max-height: 150px; max-width: 100%;">',
	        link : function(scope,elem,attrs){
	            if(!scope.d2Tei && scope.d2EventId && scope.d2DeId) {
	                scope.path = DHIS2URL + "/events/files?eventUid=" + scope.d2EventId + "&dataElementUid=" + scope.d2DeId;
	            } else if(scope.d2Tei && scope.d2AttributeId) {
	                scope.path = DHIS2URL + "/trackedEntityInstances/" + scope.d2Tei.id  + "/" + scope.d2AttributeId + "/image?height=100&width=100";
	            }
	        }
	    }
	})
	
	.directive('d2RadioButton', function (){
	    return {
	        restrict: 'E',
	        templateUrl: './templates/radio-button.html',
	        scope: {
	            required: '=dhRequired',
	            value: '=dhValue',
	            disabled: '=dhDisabled',
	            name: '@dhName',
	            customOnClick: '&dhClick',
	            currentElement: '=dhCurrentElement',
	            event: '=dhEvent',
	            id: '=dhId'
	        },
	        controller: [
	            '$scope',
	            '$element',
	            '$attrs',
	            '$q',
	            'CommonUtils',
	            function($scope, $element, $attrs, $q, CommonUtils){
	
	                $scope.status = "";
	                $scope.clickedButton = "";
	
	                $scope.valueClicked = function (buttonValue){
	
	                    $scope.clickedButton = buttonValue;
	
	                    var originalValue = $scope.value;
	                    var tempValue = buttonValue;
	                    if($scope.value === buttonValue){
	                        tempValue = "";
	                    }
	
	                    if(angular.isDefined($scope.customOnClick)){
	                        var promise = $scope.customOnClick({value: tempValue});
	                        if(angular.isDefined(promise) && angular.isDefined(promise.then)){
	                            promise.then(function(status){
	                                if(angular.isUndefined(status) || status !== "notSaved"){
	                                    $scope.status = "saved";
	                                }
	                                $scope.value = tempValue;
	                            }, function(){
	                                $scope.status = "error";
	                                $scope.value = originalValue;
	                            });
	                        }
	                        else if(angular.isDefined(promise)){
	                            if(promise === false){
	                                $scope.value = originalValue;
	                            }
	                            else {
	                                $scope.value = tempValue;
	                            }
	                        }
	                        else{
	                            $scope.value = tempValue;
	                        }
	                    }
	                    else{
	                        $scope.value = tempValue;
	                    }
	                };
	
	                $scope.getDisabledValue = function(inValue){
	                    return CommonUtils.displayBooleanAsYesNo(inValue);
	                };
	
	                $scope.getDisabledIcon = function(inValue){
	                    if(inValue === true || inValue === "true"){
	                        return "fa fa-check";
	                    }
	                    else if(inValue === false || inValue === "false"){
	                        return "fa fa-times";
	                    }
	                    return '';
	                }
	
	            }],
	        link: function (scope, element, attrs) {
	
	            scope.radioButtonColor = function(buttonValue){
	
	                if(scope.value !== ""){
	                    if(scope.status === "saved"){
	                        if(angular.isUndefined(scope.currentElement) || (scope.currentElement.id === scope.id && scope.currentElement.event === scope.event)){
	                            if(scope.clickedButton === buttonValue){
	                                return 'radio-save-success';
	                            }
	                        }
	                        //different solution with text chosen
	                        /*else if(scope.status === "error"){
	                         if(scope.clickedButton === buttonValue){
	                         return 'radio-save-error';
	                         }
	                         }*/
	                    }
	                }
	                return 'radio-white';
	            };
	
	            scope.errorStatus = function(){
	
	                if(scope.status === 'error'){
	                    if(angular.isUndefined(scope.currentElement) || (scope.currentElement.id === scope.id && scope.currentElement.event === scope.event)){
	                        return true;
	                    }
	                }
	                return false;
	            };
	
	            scope.radioButtonImage = function(buttonValue){
	
	                if(angular.isDefined(scope.value)){
	                    if(scope.value === buttonValue && buttonValue === "true"){
	                        return 'fa fa-stack-1x fa-check';
	                    }
	                    else if(scope.value === buttonValue && buttonValue === "false"){
	                        return 'fa fa-stack-1x fa-times';
	                    }
	                }
	                return 'fa fa-stack-1x';
	            };
	        }
	    };
	})
	
	.directive('d2Radio', function(  DateUtils ){
	    return {
	        restrict: 'EA',            
	        templateUrl: "./templates/radio-input.html",
	        scope: {            
	            id: '=',
	            name: '@d2Name',
	            d2Object: '=',
	            d2ValueSaved: '=',
	            d2Disabled: '=',
	            d2Required: '=',
	            d2Options: '=',
	            d2CallbackFunction: '&d2Function'
	        },
	        link: function (scope, element, attrs) {
	            
	        },
	        controller: function($scope){
	            
	            $scope.$watch('d2Object',function(newObj, oldObj){
	                if( angular.isObject(newObj) ){
	                    $scope.d2Object = newObj;
	                    $scope.model = {radio: $scope.d2Object[$scope.id] ? $scope.d2Object[$scope.id] : null};
	                }                
	            });
	
	            //In cases where the value is assigned with a program rule we need to set model.radio so that the UI updates.
	            $scope.$watch('d2Object[id]',function(){
	                $scope.model = {radio: $scope.d2Object[$scope.id] ? $scope.d2Object[$scope.id] : null};         
	            });
	
	            $scope.model = {radio: $scope.d2Object[$scope.id] ? $scope.d2Object[$scope.id] : null};
	            
	            $scope.saveValue = function( value ){
	                $scope.model.radio = value;
	                if( $scope.model.radio === $scope.d2Object[$scope.id] ){
	                    $scope.model.radio = null;
	                }
	                
	                $scope.d2Object[$scope.id] = $scope.model.radio;
	                if( angular.isDefined( $scope.d2CallbackFunction ) ){
	                    $scope.d2CallbackFunction({value: $scope.model.radio});
	                }
	            };
	        }
	    };
	})
	
	.directive('dhis2Deselect', function ($document) {
	    return {
	        restrict: 'A',
	        scope: {
	            onDeselected: '&dhOnDeselected',
	            id: '@dhId',
	            preSelected: '=dhPreSelected',
	            abortDeselect: '&dhAbortDeselect'
	        },
	        controller: [
	            '$scope',
	            '$element',
	            '$attrs',
	            '$q',
	            function($scope, $element, $attrs, $q){
	
	                $scope.documentEventListenerSet = false;
	                $scope.elementClicked = false;
	
	                $element.on('click', function(event) {
	
	                    $scope.elementClicked = true;
	                    if($scope.documentEventListenerSet === false){
	                        $document.on('click', $scope.documentClick);
	                        $scope.documentEventListenerSet = true;
	                    }
	                });
	
	                $scope.documentClick = function(event){
	                    var modalPresent = $(".modal-backdrop").length > 0;
	                    var calendarPresent = $(".calendars-popup").length > 0;
	                    var calendarPresentInEvent = $(event.target).parents(".calendars-popup").length > 0;
	                    if($scope.abortDeselect()){
	                        $document.off('click', $scope.documentClick);
	                        $scope.documentEventListenerSet = false;
	                    }else if($scope.elementClicked === false &&
	                        modalPresent === false &&
	                        calendarPresent === false &&
	                        calendarPresentInEvent === false){
	                        $scope.onDeselected({id:$scope.id});
	                        $scope.$apply();
	                        $document.off('click', $scope.documentClick);
	                        $scope.documentEventListenerSet = false;
	                    }
	                    $scope.elementClicked = false;
	                };
	
	                if(angular.isDefined($scope.preSelected) && $scope.preSelected === true){
	                    $document.on('click', $scope.documentClick);
	                    $scope.documentEventListenerSet = true;
	                }
	
	            }],
	        link: function (scope, element, attrs) {
	        }
	    };
	})
	
	.directive('d2OrgUnitTree', function(OrgUnitFactory){
	    return {
	        restrict: 'EA',            
	        templateUrl: "./templates/orgunit-input.html",
	        scope: {            
	            selectedOrgUnitId: '@',
	            id: '@',
	            d2Object: '=',
	            d2Disabled: '=',
	            d2Required: '=',
	            d2CallbackFunction: '&d2Function',
	            d2OrgunitNames: '='
	        },
	        link: function (scope, element, attrs) {
	        },
	        controller: function($scope, $modal){
	            
	            if( !$scope.d2OrgUnitNames ){
	                $scope.d2OrgUnitNames = {};
	            }
	
	            $scope.$watch('d2Object',function(newObj, oldObj){
	                if( angular.isObject(newObj) ){
	                    $scope.d2Object = newObj;
	                    fetchOu();
	                }
	            });
	            
	            function fetchOu(){
	                if( $scope.id && $scope.d2Object[$scope.id] ){                
	                    OrgUnitFactory.getFromStoreOrServer($scope.d2Object[$scope.id]).then(function (response) {
	                        if(response && response.n) {
	                            $scope.d2OrgunitNames[$scope.d2Object[$scope.id]] = response.n;
	                        }
	                    });
	                }
	            }
	            
	            fetchOu();
	
	            $scope.showOrgUnitTree = function( dataElementId ){
	                
	                var modalInstance = $modal.open({
	                    templateUrl: "./templates/orgunit-tree.html",
	                    controller: 'OrgUnitTreeController',
	                    resolve: {
	                        orgUnitId: function(){
	                            return $scope.d2Object[dataElementId];
	                        },
	                        orgUnitNames: function(){
	                            return $scope.d2OrgunitNames;
	                        }
	                    }
	                });
	
	                modalInstance.result.then(function ( res ) {
	                    if( res && res.selected && res.selected.id ){
	                        $scope.d2Object[dataElementId] = res.selected.id;
	                        $scope.d2OrgunitNames = res.names;
	                        if( angular.isDefined( $scope.d2CallbackFunction ) ){
	                            $scope.d2CallbackFunction($scope.d2Object, dataElementId);
	                        }                            
	                    }                    
	                }, function () {
	                });
	            };
	            
	            $scope.removeSelectedOrgUnit = function( dataElementId ){
	                delete $scope.d2Object[dataElementId];
	                if( angular.isDefined( $scope.d2CallbackFunction ) ){
	                    $scope.d2CallbackFunction($scope.d2Object, dataElementId);
	                }
	            };
	        }
	        
	    };
	})
	
	.directive('d2Map', function(){
	    return {
	        restrict: 'E',            
	        templateUrl: "./templates/coordinate-input.html",
	        scope: {
	            id: '@',            
	            d2Object: '=',            
	            d2CallbackFunction: '&d2Function',
	            d2CallbackFunctionParamText: '=d2FunctionParamText',
	            d2CallbackFunctionParamCoordinate: '=d2FunctionParamCoordinate',
	            d2Disabled: '=',
	            d2Required: '=',
	            d2LatSaved: '=',
	            d2LngSaved: '=',
	            d2CoordinateFormat: '='
	        },
	        controller: function($scope, $modal, $filter, $translate, DHIS2COORDINATESIZE, NotificationService){
	
	            $scope.$watch('d2Object',function(newObj, oldObj){
	                if( angular.isObject(newObj) ){
	                    $scope.d2Object = newObj;
	                    $scope.coordinateObject = angular.copy( $scope.d2Object );
	                    processCoordinate();
	                }
	            });
	
	            $scope.coordinateObject = angular.copy( $scope.d2Object );
	            
	            function processCoordinate(){
	            	if( $scope.d2CoordinateFormat === 'TEXT' ){        
	                    if( $scope.d2Object[$scope.id] && $scope.d2Object[$scope.id] !== ''){                        
	                        var coordinatePattern = /^\[-?\d+\.?\d+\,-?\d+\.?\d+\]$/;
	                        if( !coordinatePattern.test( $scope.d2Object[$scope.id] ) ){
	                            NotificationService.showNotifcationDialog($translate.instant('error'), $translate.instant('invalid_coordinate_format') + ":  " + $scope.d2Object[$scope.id] );
	                        }
	                        
	                    	var coordinates = $scope.d2Object[$scope.id].slice(1,-1).split( ",");                        
	                    	if( !dhis2.validation.isNumber( coordinates[0] ) || !dhis2.validation.isNumber( coordinates[0] ) ){
	                            NotificationService.showNotifcationDialog($translate.instant('error'), $translate.instant('invalid_coordinate_format') + ":  " + $scope.d2Object[$scope.id] );
	                    	}
	                        $scope.coordinateObject.coordinate = {latitude: parseFloat(coordinates[1]), longitude: parseFloat(coordinates[0])};
	                    }
	                    else{
	                        $scope.coordinateObject.coordinate = {};
	                    }
	                }            
	                if( !$scope.coordinateObject.coordinate ){
	                    $scope.coordinateObject.coordinate = {};
	                }
	            };
	            
	            processCoordinate();
	            
	            $scope.showMap = function(){                
	                
	            	processCoordinate();            	
	                            
	                var modalInstance = $modal.open({
	                    templateUrl: './templates/map.html',
	                    controller: 'MapController',
	                    windowClass: 'modal-map-window',
	                    resolve: {
	                        location: function () {
	                            return {lat: $scope.coordinateObject.coordinate.latitude, lng:  $scope.coordinateObject.coordinate.longitude};
	                        }
	                    }
	                });
	                
	                modalInstance.result.then(function (location) {                    
	                    if(angular.isObject(location)){
	                    	
	                    	if( dhis2.validation.isNumber( location.lat ) ){
	                    		location.lat = parseFloat( $filter('number')(location.lat, DHIS2COORDINATESIZE) );
	                    	}
	                    	
	                    	if( dhis2.validation.isNumber( location.lng ) ){
	                    		location.lng = parseFloat( $filter('number')(location.lng, DHIS2COORDINATESIZE) );
	                    	}
	                    	
	                        $scope.coordinateObject.coordinate.latitude = location.lat;
	                        $scope.coordinateObject.coordinate.longitude = location.lng;                        
	
	                        if( $scope.d2CoordinateFormat === 'TEXT' ){                        
	                            $scope.d2Object[$scope.id] = '[' + location.lng + ',' + location.lat + ']';
	                            if( angular.isDefined( $scope.d2CallbackFunction ) ){
	                                $scope.d2CallbackFunction( {arg1: $scope.d2CallbackFunctionParamText} );
	                            }
	                        }
	                        else{
	                            $scope.d2Object.coordinate.latitude = location.lat;
	                            $scope.d2Object.coordinate.longitude = location.lng;
	                            if( angular.isDefined( $scope.d2CallbackFunction ) ){
	                                $scope.d2CallbackFunction( {arg1: $scope.d2CallbackFunctionParamCoordinate} );
	                            }
	                        }                                                
	                    }
	                }, function () {
	                });
	            };
	            
	            $scope.coordinateInteracted = function (field, form) {        
	                var status = false;
	                if (field) {
	                    if(angular.isDefined(form)){
	                        status = form.$submitted || field.$dirty;
	                    }
	                    else {
	                        status = $scope.coordinateForm.$submitted || field.$dirty;
	                    }            
	                }
	                return status;
	            };
	            
	            $scope.saveD2Coordinate = function(){
	                
	                var saveCoordinate = function( format, param ){
	                    if( !$scope.coordinateObject.coordinate.longitude && !$scope.coordinateObject.coordinate.latitude ){
	                        if( format === 'COORDINATE' ){
	                            $scope.d2Object.coordinate = {latitude: "", longitude: ""};
	                        }
	                        else{
	                            $scope.d2Object[$scope.id] = '';
	                        }
	                        $scope.d2CallbackFunction( {arg1: param} );                            
	                    }
	                    else{
	                        if( $scope.coordinateObject.coordinate.longitude && $scope.coordinateObject.coordinate.latitude ){
	                            $scope.d2CallbackFunction( {arg1: param} );
	                        }
	                    }                    
	                };
	                
	                if( angular.isDefined( $scope.d2CallbackFunction ) ){
	                	
	                	if( dhis2.validation.isNumber( $scope.coordinateObject.coordinate.latitude ) ){
	                		$scope.coordinateObject.coordinate.latitude = parseFloat( $filter('number')($scope.coordinateObject.coordinate.latitude, DHIS2COORDINATESIZE) );
	                	}
	                	
	                	if( dhis2.validation.isNumber( $scope.coordinateObject.coordinate.longitude ) ){
	                		$scope.coordinateObject.coordinate.longitude = parseFloat( $filter('number')($scope.coordinateObject.coordinate.longitude, DHIS2COORDINATESIZE) );
	                	}
	                	
	                    if( $scope.d2CoordinateFormat === 'TEXT' ){                    
	                        $scope.d2Object[$scope.id] = '[' + $scope.coordinateObject.coordinate.longitude + ',' + $scope.coordinateObject.coordinate.latitude + ']';                        
	                        saveCoordinate( 'TEXT',  $scope.prStDe);
	                    }
	                    else{
	                        $scope.d2Object.coordinate.latitude = $scope.coordinateObject.coordinate.latitude;
	                        $scope.d2Object.coordinate.longitude = $scope.coordinateObject.coordinate.longitude;
	                        
	                        saveCoordinate( 'COORDINATE',  $scope.d2CallbackFunctionParam );                        
	                    }
	                }
	            };    
	        },
	        link: function (scope, element, attrs) {
	            
	        }
	    };
	})
	
	.directive('d2DateTime', function() {
	    return {
	        restrict: 'E',            
	        templateUrl: "./templates/date-time-input.html",       
	        scope: {      
	            datetimeModel: '=',      
	            datetimeRequired: '=',
	            datetimeDisabled: '=',
	            datetimeDatePlaceholder: '@',
	            datetimeModelId: '=',
	            datetimeMaxDate: '@',
	            datetimeSaveMethode: '&',
	            datetimeSaveMethodeParameter1: '=',
	            datetimeSaveMethodeParameter2: '=',
	            datetimeField: '=',
	            datetimeDisablePopup: '=',
	            datetimeUseNotification: "=",
	            datetimeElement: '=',
	            datetimeOuterform: '='
	
	        },
	        link: function (scope, element, attrs) {
	           
	        },
	        controller: function($scope, ModalService, DateUtils) {
				$scope.firstInput = true;
	            $scope.dateTimeInit = function() {
	                $scope.dateTime = { date: null, time: null};        
	                if(!$scope.datetimeModel[$scope.datetimeModelId]) {
	                    return;
	                }
	                var values = $scope.datetimeModel[$scope.datetimeModelId].split('T');
	                $scope.dateTime.date = DateUtils.formatFromApiToUser(values[0]);
	                $scope.dateTime.time = values[1];
	            };
	
	            $scope.interacted = function (field, form) {
	                if(field || form) {
	                    var status = false;                
	                    status = form.$submitted || field.$touched;                 
	                    return status;
	                }
	            };           
	
	            $scope.saveDateTime = function(isDate) {
	                var splitDateTime = '';
	
	                if($scope.datetimeModel[$scope.datetimeModelId]) {
	                    splitDateTime = $scope.datetimeModel[$scope.datetimeModelId].split("T");
	                }
	        
	                if(isDate) {
	                    $scope.datetimeModel[$scope.datetimeModelId] = DateUtils.formatFromUserToApi($scope.dateTime.date) + "T" + splitDateTime[1];
	                } else {
	                    $scope.datetimeModel[$scope.datetimeModelId] = splitDateTime[0] + "T" + $scope.dateTime.time;
	                }
	                
	                if($scope.dateTime.date && $scope.dateTime.time && $scope.datetimeSaveMethode() && $scope.datetimeModel[$scope.datetimeModelId].match(/^(\d\d\d\d-\d\d-\d\dT\d\d:\d\d)$/)) {
	                    if(isDate && $scope.datetimeField) {
	                        $scope.datetimeSaveMethode()($scope.datetimeSaveMethodeParameter1, $scope.datetimeField.foo);
	                    } else if($scope.datetimeField) {
	                        $scope.datetimeSaveMethode()($scope.datetimeSaveMethodeParameter1, $scope.datetimeField.foo2);
	                    } else {
	                        $scope.datetimeSaveMethode()($scope.datetimeSaveMethodeParameter1, $scope.datetimeSaveMethodeParameter2);                        
	                    }
	                } else if(!$scope.dateTime.date && !$scope.dateTime.time && $scope.datetimeSaveMethode()) {
	                    $scope.datetimeModel[$scope.datetimeModelId] = null;
	                    $scope.datetimeSaveMethode()($scope.datetimeSaveMethodeParameter1);
	
	                } else if(!$scope.datetimeDisablePopup) {
						if($scope.firstInput) {
							$scope.firstInput = false;
							return;
						}
	                    var modalOptions = {
	                        headerText: 'warning',
	                        bodyText: 'both_date_and_time'
	                    };
	                    
	                    ModalService.showModal({},modalOptions);
	                    return;
	                }
	            };
	
	            $scope.getInputNotifcationClass = function(id, event){
	                if($scope.dateTime.time && !$scope.dateTime.time.match(/^(\d\d:\d\d)$/)) {
	                    return 'form-control input-pending';
	                }
	
	                if(!$scope.dateTime.date !== !$scope.dateTime.time) {
	                    return 'form-control input-pending';
	                }
	
	                if($scope.datetimeElement && $scope.datetimeElement.id === id && $scope.datetimeElement.event && $scope.datetimeElement.event === event.event) {
	                    if($scope.datetimeElement.pending) {
	                        return 'form-control input-pending';
	                    }
	                    
	                    if($scope.datetimeElement.saved) {
	                        return 'form-control input-success';
	                    } else if($scope.datetimeElement.updated) {
	                        return 'form-control input-success';
	                    } else {
	                        return 'form-control input-error';
	                    }            
	                }  
	                return 'form-control';
				};
				
				$scope.clearDateTime = function() {
					$scope.dateTime.date = null;
	                $scope.dateTime.time = null;
					if($scope.datetimeSaveMethode()) {
						$scope.saveDateTime();
					}
				};
	        }
	    };
	})
	
	.directive('d2Time', function() {
	    return {
	        restrict: 'E',            
	        templateUrl: "./templates/time-input.html",
	        scope: {      
	            timeModel: '=',
	            timeModelId: '=',     
	            timeRequired: '=',
	            timeDisabled: '=',
	            timeSaveMethode: '&',
	            timeSaveMethodeParameter1: '=',
	            timeSaveMethodeParameter2: '=',
	            timeDisablePopup: '=',
	            timeUseNotification: '=',
	            timeElement: '=',
	            timeFormat: '='
	
	        },
	        link: function (scope, element, attrs) {
	            
	        },
	        controller: function($scope, ModalService) {
	            $scope.use24 = $scope.timeFormat === '24h';
	            $scope.base = {};      
	                        
	            $scope.saveTime = function() {
	                if(!$scope.timeModel[$scope.timeModelId] || $scope.timeModel[$scope.timeModelId].match(/^(\d\d:\d\d)$/)) {
	                    $scope.timeSaveMethode()($scope.timeSaveMethodeParameter1, $scope.timeSaveMethodeParameter2);
	                } else if (!$scope.timeDisablePopup) {
	                    var modalOptions = {
	                        headerText: 'warning',
	                        bodyText: 'wrong_time_format'
	                    };
	                    
	                    ModalService.showModal({},modalOptions);
	                    return;
	                }
	               
	            };
	
	            $scope.save12hTime = function(){
	                $scope.timeModel[$scope.timeModelId] = $scope.convertTo24h($scope.base.temp12hTime);
	                $scope.saveTime();
	
	            }
	            
	            $scope.setFormat = function (format) {
	                if(format === 'AM') {
	                    $scope.timeFormat = 'AM';
	                } else if(format === 'PM') {
	                    $scope.timeFormat = 'PM';
	                } else if(format === '24h') {
	                    $scope.timeFormat = '24h';
	                }
	            };
	
	            $scope.convertTo24h = function(time) {
	                if(!time) {
	                    return;
	                }
	                var timeSplit = time.split(':');
	                
	                if($scope.timeFormat === 'PM') {
	                    timeSplit[0] = parseInt(timeSplit[0]) + 12 + '';
	                }
	
	                if($scope.timeFormat === 'AM' && timeSplit[0] === '12') {
	                    timeSplit[0] = '00';
	                }
	
	                if($scope.timeFormat === 'PM' && timeSplit[0] === '24') {
	                    timeSplit[0] = '12';
	                }
	                return timeSplit[0] + ':' + timeSplit[1];
	            };
	
	            $scope.convertFrom24h = function(time) {
	                if(!time) {
	                    $scope.setFormat('AM');
	                    return;
	                }
	                var timeSplit = time.split(':');
	                if(timeSplit[0] > 12) {
	                    $scope.setFormat('PM');
	                    var addZero = timeSplit[0]%12 < 10 ? '0' : '';
	                    return addZero + timeSplit[0]%12 + ':' + timeSplit[1];
	                } else if(timeSplit[0] === '12') {
	                    $scope.setFormat('PM');
	                    return time;
	                } else {
	                    if(timeSplit[0] === '00') {
	                        timeSplit[0] = '12';
	                    }
	                    $scope.setFormat('AM');
	                    return timeSplit[0] + ':' + timeSplit[1];
	                }
	            };
	
	            $scope.getInputNotifcationClass = function(id, event){
	                if($scope.timeModel[$scope.timeModelId] && !$scope.timeModel[$scope.timeModelId].match(/^(\d\d:\d\d)$/)) {
	                    return 'form-control input-pending';
	                }
	
	                if($scope.timeElement && $scope.timeElement.id === id && $scope.timeElement.event && $scope.timeElement.event === event.event) {
	                    if($scope.timeElement.pending) {
	                        return 'form-control input-pending';
	                    }
	                    
	                    if($scope.timeElement.saved || $scope.timeElement.updated) {
	                        return 'form-control input-success';
	                    } else {
	                        return 'form-control input-error';
	                    }            
	                }  
	                return 'form-control';
	            };
	
	            $scope.base.temp12hTime = $scope.convertFrom24h($scope.timeModel[$scope.timeModelId]);
	        }
	    };
	})
	
	.directive("d2TimeParser", function() {
	    return {
	        restrict: "A",         
	        require: "ngModel",         
	        link: function(scope, element, attrs, ngModel) {
	            ngModel.$parsers.push(function(value){
	                if( /^(\d\d\d)$/.test(value)){
	                    var convertedValue = value.substring(0, 2) + ":" + value.charAt(2);
	                    ngModel.$setViewValue(convertedValue);
	                    ngModel.$commitViewValue();
	                    ngModel.$render();
	                    return convertedValue;
	                }
	
	                if(value.length > 5){
	                    var convertedValue = value.substring(0, 5);
	                    ngModel.$setViewValue(convertedValue);
	                    ngModel.$commitViewValue();
	                    ngModel.$render();
	                    return convertedValue;
	                }
	
	                return value;                
	            });
	        }
	    };
	})
	
	.directive('d2Age', function( CalendarService, DateUtils ){
	    return {
	        restrict: 'EA',            
	        templateUrl: "./templates/age-input.html",
	        scope: {
	            id: '@',
	            d2Object: '=',
	            d2AgeSaved: '=',
	            d2Disabled: '=',
	            d2Required: '=',
	            d2CallbackFunction: '&d2Function'
	        },
	        link: function (scope, element, attrs) {
	            
	        },
	        controller: function($scope){            
	            
	            $scope.age = {};
	            
	            var setDate = function(){
	                if( $scope.id && $scope.d2Object && $scope.d2Object[$scope.id] ){
	                    $scope.age.dob = $scope.d2Object[$scope.id];
	                    formatAge();
	                }
	            }
	
	            setDate();
	
	            
	            function formatAge(){
	                if( $scope.age && $scope.age.dob !== "" ){
	                    var _age = DateUtils.getAge( $scope.age.dob );                    
	                    $scope.age.years = _age.years;
	                    $scope.age.months = _age.months;
	                    $scope.age.days = _age.days;
	                }
	            }
	            
	            $scope.$watch('age.dob', function( newValue, oldValue ){
	                if( newValue !== oldValue ){
	                    $scope.d2Object[$scope.id] = $scope.age.dob;
	                    if( angular.isDefined( $scope.d2CallbackFunction ) ){
	                        $scope.d2CallbackFunction($scope.d2Object, $scope.id);
	                    }
	                }
	            });
	
	            //In cases where the value is assigned with a program rule we need to set model.radio so that the UI updates.
	            $scope.$watch('d2Object[id]',function(newValue, oldValue){
	                if( newValue !== oldValue ){
	                    $scope.age = {};
	                    setDate();
	                }        
	            });
	
	            $scope.saveDOB = function(){                
	                formatAge();                
	            };
	            
	            $scope.saveAge = function(){
	                var dob = moment().subtract({days: $scope.age.days ? $scope.age.days : 0, months: $scope.age.months ? $scope.age.months : 0, years: $scope.age.years ? $scope.age.years : 0});
	                $scope.age.dob = DateUtils.format( dob );
	                formatAge();
	            };
	            
	            $scope.removeAge = function(){
	                $scope.age = {};
	            };
	            
	            $scope.ageInteracted = function (field, form) {        
	                var status = false;
	                if (field) {
	                    if(angular.isDefined(form)){
	                        status = form.$submitted || field.$dirty;
	                    }
	                    else {
	                        status = $scope.ageForm.$submitted || field.$dirty;
	                    }            
	                }
	                return status;
	            };
	        }
	    };
	})
	
	.directive('d2OptionList', function() {
	    return {
	        restrict: 'E',            
	        templateUrl: "./templates/more-options-list.html",
	        scope: {
				d2Model: '=',
				d2ModelId: '=',
	            d2Required: '=',
	            d2Disabled: '=',
				d2SaveMethode: '&',
				d2SaveMethodeParameter1: '=',
				d2SaveMethodeParameter2: '=',
				d2AllOptions: '=',
				d2MaxOptionSize: '=',
				d2UseNotification: '=',
				d2Element: '='
			},
			link: function (scope, element, attrs) {
	            
	        },
	        controller: function($scope) {
	            $scope.showMore = function($select, $event) {
	                if($event){
	                    $event.stopPropagation();
	                    $event.preventDefault();
	                    $scope.d2MaxOptionSize = $scope.d2MaxOptionSize + 10;
	                }
	                
				};
	
				$scope.saveOption = function() {
					$scope.d2SaveMethode()($scope.d2SaveMethodeParameter1, $scope.d2SaveMethodeParameter2);
				};
	
				$scope.getInputNotifcationClass = function(id) {
					event = $scope.d2Model;
					
					if($scope.d2Element && $scope.d2Element.id === id && $scope.d2Element.event && $scope.d2Element.event === event.event) {
						if($scope.d2Element.pending) {
							return 'input-pending';
						}
						
						if($scope.d2Element.saved) {
							return 'input-success';
						} else {
							return 'input-error';
						}            
					}  
					return '';
				};
			}
	    };
	});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	angular.module("d2Directives")
	.directive('d2NumberValidator', function() {
	    return {
	        require: 'ngModel',
	        restrict: 'A',
	        link: function (scope, element, attrs, ngModel) {
	            
	            function setValidity(numberType, isRequired){
	                if(numberType === 'NUMBER'){
	                    ngModel.$validators.number = function(value) {
	                    	value = value === 0 ? value.toString(): value; 
	                        return value === 'null' || !value ? !isRequired : dhis2.validation.isNumber(value);
	                    };
	                }
	                else if(numberType === 'INTEGER_POSITIVE'){
	                    ngModel.$validators.posInt = function(value) {
	                    	value = value === 0 ? value.toString(): value; 
	                        return value === 'null' || !value ? !isRequired : dhis2.validation.isPositiveInt(value);
	                    };
	                }
	                else if(numberType === 'INTEGER_NEGATIVE'){
	                    ngModel.$validators.negInt = function(value) {
	                    	value = value === 0 ? value.toString(): value;
	                        return value === 'null' || !value ? !isRequired : dhis2.validation.isNegativeInt(value);
	                    };
	                }
	                else if(numberType === 'INTEGER_ZERO_OR_POSITIVE'){
	                    ngModel.$validators.zeroPositiveInt = function(value) {
	                    	value = value === 0 ? value.toString(): value; 
	                        return value === 'null' || !value ? !isRequired : dhis2.validation.isZeroOrPositiveInt(value);
	                    };
	                }
	                else if(numberType === 'INTEGER'){
	                    ngModel.$validators.integer = function(value) {
	                    	value = value === 0 ? value.toString(): value;
	                        return value === 'null' || !value ? !isRequired : dhis2.validation.isInt(value);
	                    };
	                }
	                if(numberType === 'PERCENTAGE'){
	                    ngModel.$validators.percentValue = function(value) {
	                        if (value < 0 || value > 100) {
	                            return false;
	                        }
	                        value = value === 0 ? value.toString(): value;
	                        return value === 'null' || !value ? !isRequired : dhis2.validation.isNumber(value);
	                    };
	                }
	            }
	
	            var numberType = attrs.numberType;
	            var isRequired = attrs.ngRequired === 'true';            
	            setValidity(numberType, isRequired);
	        }
	    };
	})
	
	.directive("d2DateValidator", function(DateUtils, CalendarService, $parse) {
	    return {
	        restrict: "A",         
	        require: "ngModel",         
	        link: function(scope, element, attrs, ngModel) {
	        	
	            var calendarSetting = CalendarService.getSetting();
	            var isRequired = attrs.ngRequired === 'true';
	        	
	            ngModel.$validators.dateValidator = function(value) {
	                if(!value){
	                    return !isRequired;
	                }                
	                var convertedDate = DateUtils.format(angular.copy(value));
	                var isValid = value === convertedDate;
	                return isValid;
	            };
	            
	            ngModel.$validators.futureDateValidator = function(value) {
	                if(!value){
	                    return !isRequired;
	                }
	                var maxDate = $parse(attrs.maxDate)(scope);
	                var convertedDate = DateUtils.format(angular.copy(value));
	                var isValid = value === convertedDate;
	                if(isValid){
	                    isValid = maxDate === 0 ? !moment(convertedDate, calendarSetting.momentFormat).isAfter(moment(DateUtils.getToday(), calendarSetting.momentFormat)) : isValid;
	                }
	                return isValid;
	            };
	        }
	    };
	})
	
	.directive("d2TimeValidator", function() {
	    return {
	        restrict: "A",         
	        require: "ngModel",         
	        link: function(scope, element, attrs, ngModel) {        	
	           
	            var isRequired = attrs.ngRequired === 'true';
	        	
	            ngModel.$validators.timeValidator = function(value) {
	                if(!value){
	                    return !isRequired;
	                }
	                return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);                
	            };
	        }
	    };
	})
	
	.directive("d2TimeAmPmValidator", function() {
	    return {
	        restrict: "A",         
	        require: "ngModel",         
	        link: function(scope, element, attrs, ngModel) {        	
	           
	            var isRequired = attrs.ngRequired === 'true';
	
	            ngModel.$validators.timeValidator = function(value) {
	                if(!value){
	                    return !isRequired;
	                }
	                return /^(0[1-9]|1[0-2]):[0-5][0-9]$/.test(value);                
	            };
	        }
	    };
	})
	
	.directive("d2UrlValidator", function() {
	    return {
	        restrict: "A",         
	        require: "ngModel",         
	        link: function(scope, element, attrs, ngModel) {
	        	
	            var isRequired = attrs.ngRequired === 'true';
	        	
	            ngModel.$validators.urlValidator = function(value) {
	                if(!value){
	                    return !isRequired;
	                }
	                if(value.match(/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/)) {
	                    return true;
	                }
	                return false;
	            };
	        }
	    };
	})
	
	.directive("d2CustomCoordinateValidator", function() {
	    return {
	        restrict: "A",         
	        require: "ngModel",         
	        link: function(scope, element, attrs, ngModel) {
	            
	            var isRequired = attrs.ngRequired === 'true';
	            
	            ngModel.$validators.customCoordinateValidator = function(value) {
	                if(!value){
	                    return !isRequired;
	                }
	                
	                var coordinate = value.split(",");
	                
	                if( !coordinate || coordinate.length !== 2 ){
	                    return false;
	                }
	
	                if( !dhis2.validation.isNumber(coordinate[0]) ){
	                    return false;
	                }
	                
	                if( !dhis2.validation.isNumber(coordinate[1]) ){
	                    return false;
	                }
	                
	                return coordinate[0] >= -180 && coordinate[0] <= 180 && coordinate[1] >= -90 && coordinate[1] <= 90;
	            };           
	        }
	    };
	})
	
	.directive("d2CoordinateValidator", function() {
	    return {
	        restrict: "A",         
	        require: "ngModel",         
	        link: function(scope, element, attrs, ngModel) {
	            
	            var isRequired = attrs.ngRequired === 'true';
	            
	            if(attrs.name === 'latitude'){
	                ngModel.$validators.latitudeValidator = function(value) {
	                    if(!value){
	                        return !isRequired;
	                    }
	
	                    if(!dhis2.validation.isNumber(value)){
	                        return false;
	                    }
	                    return value >= -90 && value <= 90;
	                };
	            }
	            
	            if(attrs.name === 'longitude'){
	                ngModel.$validators.longitudeValidator = function(value) {
	                    if(!value){
	                        return !isRequired;
	                    }
	
	                    if(!dhis2.validation.isNumber(value)){
	                        return false;
	                    }
	                    return value >= -180 && value <= 180;
	                };
	            }            
	        }
	    };
	})
	
	.directive("d2OptionValidator", function($translate, NotificationService) {
	    return {
	        restrict: "A",         
	        require: "ngModel",         
	        link: function(scope, element, attrs, ngModel) {
	        	
	            var isRequired = attrs.ngRequired === 'true';
	            
	            ngModel.$validators.optionValidator = function(value) {               
	                
	                var res = !value ? !isRequired : true;
	                
	                if(!res){
	                    var headerText = $translate.instant("validation_error");
	                    var bodyText = $translate.instant("option_required");
	                    NotificationService.showNotifcationDialog(headerText, bodyText);
	                }
	                return res;
	            };
	        }
	    };
	})
	
	.directive("d2AttributeValidator", function($q, TEIService, SessionStorageService) {
	    return {
	        restrict: "A",         
	        require: "ngModel",
	        link: function(scope, element, attrs, ngModel) {            
	            
	            function uniqunessValidatior(attributeData){
	                
	                ngModel.$asyncValidators.uniqunessValidator = function (modelValue, viewValue) {
	                    var pager = {pageSize: 1, page: 1, toolBarDisplay: 5};
	                    var deferred = $q.defer(), currentValue = modelValue || viewValue, programOrTetUrl = null, ouMode = 'ACCESSIBLE';
	                    
	                    if (currentValue) {
	                        
	                        attributeData.value = currentValue;                        
	                        var attUrl = 'filter=' + attributeData.id + ':EQ:' + attributeData.value;
	                        var ouId = SessionStorageService.get('ouSelected');
	                        
	                        if(attrs.selectedProgramId){
	                            programOrTetUrl = 'program=' + attrs.selectedProgramId;
	                        }else{
	                            programOrTetUrl = "trackedEntityType="+attrs.selectedTet;
	                        }
	                        
	                        if(attributeData.orgunitScope){
	                            ouMode = 'SELECTED';
	                        }                        
	
	                        TEIService.search(ouId, ouMode, null, programOrTetUrl, attUrl, pager, true).then(function(data) {
	                            if(attrs.selectedTeiId){
	                                if(data && data.rows && data.rows.length && data.rows[0] && data.rows[0].length && data.rows[0][0] !== attrs.selectedTeiId){
	                                    deferred.reject();
	                                }
	                            }
	                            else{
	                                if (data.rows.length > 0) {    
	                                    deferred.reject();
	                                }
	                            }                            
	                            deferred.resolve();
	                        });
	                    }
	                    else {
	                        deferred.resolve();
	                    }
	
	                    return deferred.promise;
	                };
	            }                      
	            
	            scope.$watch(attrs.ngDisabled, function(value){
	                var attributeData = scope.$eval(attrs.attributeData);
	                if(!value){
	                    if( attributeData && attributeData.unique && !value ){
	                        uniqunessValidatior(attributeData);
	                    }
	                }              
	            });     
	        }
	    };
	});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	/* Filters */
	
	var d2Filters = angular.module('d2Filters', [])
	
	.filter('gridFilter', function($filter, CalendarService){
	    
	    return function(data, filters, filterTypes){
	
	        if(!data ){
	            return;
	        }
	        
	        if(!filters){
	            return data;
	        }        
	        else{            
	            
	            var dateFilter = {}, 
	                textFilter = {}, 
	                numberFilter = {},
	                filteredData = data;
	            
	            for(var key in filters){
	                
	                if(filterTypes[key] === 'DATE'){
	                    if(filters[key].start || filters[key].end){
	                        dateFilter[key] = filters[key];
	                    }
	                }
	                else if(filterTypes[key] === 'NUMBER' || 
	                			filterTypes[key] === 'INTEGER' ||
	                			filterTypes[key] === 'INTEGER_POSITIVE' || 
	                			filterTypes[key] === 'INTEGER_NEGATIVE' || 
	                			filterTypes[key] === 'INTEGER_ZERO_OR_POSITIVE'){
	                    if(filters[key].start || filters[key].end){
	                        numberFilter[key] = filters[key];
	                    }
	                }
	                else{
	                    textFilter[key] = filters[key];
	                }
	            }
	            
	            filteredData = $filter('filter')(filteredData, textFilter); 
	            filteredData = $filter('filter')(filteredData, dateFilter, dateComparator);            
	            filteredData = $filter('filter')(filteredData, numberFilter, numberComparator);
	                        
	            return filteredData;
	        } 
	    }; 
	    
	    function dateComparator(data,filter){
	    	var calendarSetting = CalendarService.getSetting(); 
	        var start = moment(filter.start, calendarSetting.momentFormat);
	        var end = moment(filter.end, calendarSetting.momentFormat);  
	        var date = moment(data, calendarSetting.momentFormat); 
	        
	        if(filter.start && filter.end){
	            return ( Date.parse(date) <= Date.parse(end) ) && (Date.parse(date) >= Date.parse(start));
	        }        
	        return ( Date.parse(date) <= Date.parse(end) ) || (Date.parse(date) >= Date.parse(start));
	    }
	    
	    function numberComparator(data,filter){
	        var start = filter.start;
	        var end = filter.end;
	        
	        if(filter.start && filter.end){
	            return ( data <= end ) && ( data >= start );
	        }        
	        return ( data <= end ) || ( data >= start );
	    }
	})
	
	.filter('paginate', function(Paginator) {
	    return function(input, rowsPerPage) {
	        if (!input) {
	            return input;
	        }
	
	        if (rowsPerPage) {
	            Paginator.rowsPerPage = rowsPerPage;
	        }       
	        
	        Paginator.itemCount = input.length;
	
	        return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
	    };
	})
	
	/* trim away all single and double quotes in the start and end of a string*/
	.filter('trimquotes', function() {
	    return function(input) {
	        if (!input || (typeof input !== 'string' && !(input instanceof String))) {
	            return input;
	        }
	        
	        var beingTrimmed = input;
	        var trimmingComplete = false;
	        //Trim until no more quotes can be removed.
	        while(!trimmingComplete) {
	            var beforeTrimming = beingTrimmed;
	            beingTrimmed = input.replace(/^'/,"").replace(/'$/,"");
	            beingTrimmed = beingTrimmed.replace(/^"/,"").replace(/"$/,"");
	            
	            if(beforeTrimming.length === beingTrimmed.length) {
	                trimmingComplete = true;
	            }
	        }
	        
	        
	        return beingTrimmed;
	    };
	})
	
	/* filter out confidential attributes from a list */
	.filter('nonConfidential', function() {
	  return function( items ) {
	    var filtered = [];
	    angular.forEach(items, function(item) {
	      if(!item.confidential) {
	        filtered.push(item);
	      }
	    });
	    return filtered;
	  };
	})
	
	/* trim away the qualifiers before and after a variable name */
	.filter('trimvariablequalifiers', function() {
	    return function(input) {
	        if (!input || (typeof input !== 'string' && !(input instanceof String))) {
	            return input;
	        }
	        
	        var trimmed = input.replace(/^[#VCAvca]{/,"").replace(/}$/,"");
	        
	        return trimmed;
	    };
	})
	
	.filter('forLoop', function() {
	    return function(input, start, end) {
	        input = new Array(end - start);
	        for (var i = 0; start < end; start++, i++) {
	            input[i] = start;
	        }
	        return input;
	    };
	})
	
	.filter('parseAge', function(DateUtils){
	    return function(input){        
	        if( DateUtils.isValid( input ) ){            
	            var age = DateUtils.getAge( input );
	            return '[' + age.years + 'y, ' + age.months + 'm, ' + age.days + 'd]';
	        }
	        return input;
	    };
	})
	
	.filter('categoryOptionFilter', function(){
	    
	    return function( categoryOptions, selectedOrgUnit ){
	        
	        var _categoryOptions = [];
	        
	        if( categoryOptions && selectedOrgUnit && selectedOrgUnit.id ){
	            
	            angular.forEach(categoryOptions, function(co){                
	                if( co.organisationUnits && co.organisationUnits.length > 0 ){                    
	                    if( co.organisationUnits.indexOf( selectedOrgUnit.id ) !== -1){
	                        _categoryOptions.push( co );
	                    }
	                }
	                else{
	                    _categoryOptions.push( co );
	                }
	            });          
	        }
	        else{
	            _categoryOptions = categoryOptions;
	        }
	        
	        return _categoryOptions;
	    };
	})
	


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	/* Controllers */
	var d2Controllers = angular.module('d2Controllers', [])
	
	//Controller for column show/hide
	.controller('ColumnDisplayController', 
	    function($scope, 
	            $modalInstance,
	            hiddenGridColumns,
	            gridColumns,
	            gridColumnDomainKey,
	            gridColumnKey,
	            gridColumnsInUserStore,
	            GridColumnService){
	    
	    $scope.gridColumns = gridColumns;
	    $scope.hiddenGridColumns = hiddenGridColumns;
	    
	    $scope.close = function () {
	        $modalInstance.close($scope.gridColumns);
	    };
	    
	    $scope.showHideColumns = function(gridColumn){
	       
	        if(gridColumn.show){                
	            $scope.hiddenGridColumns--;            
	        }
	        else{
	            $scope.hiddenGridColumns++;            
	        }
	        
	        if(gridColumnKey) {
	            gridColumnsInUserStore[gridColumnKey] = angular.copy($scope.gridColumns);
	        }
	        GridColumnService.set(gridColumnsInUserStore, gridColumnDomainKey);
	    };    
	})
	
	//controller for dealing with google map
	.controller('MapController',
	        function($scope, 
	                $modalInstance,                
	                $translate,
	                $http,
	                $window,
	                $q,
	                CommonUtils,
	                leafletData,
	                CurrentSelection,
	                DHIS2URL,
	                NotificationService,
	                location) {
	
	                    
	    $scope.tilesDictionary = {
	        openstreetmap: {
	            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	            options: {
	                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	            }
	        },
	        googlemap: {
	            layers: {
	                baselayers: {
	                    googleRoadmap: {
	                        name: 'Google Streets',
	                        layerType: 'ROADMAP',
	                        type: 'google'
	                    },
	                    googleHybrid: {
	                        name: 'Google Hybrid',
	                        layerType: 'HYBRID',
	                        type: 'google'
	                    },
	                    googleTerrain: {
	                        name: 'Google Terrain',
	                        layerType: 'TERRAIN',
	                        type: 'google'
	                    }
	                }
	            }
	        }
	    };
	    
	    $scope.tilesDictionaryKeys = ['openstreetmap', 'googlemap'];    
	    
	    $scope.selectedTileKey = 'openstreetmap';
	    
	    $scope.location = location;
	    
	    var currentLevel = 0, ouLevels = CurrentSelection.getOuLevels();
	    
	    $scope.maxZoom = 8;
	    
	    $scope.center = {lat: 8.88, lng: -11.55, zoom: $scope.maxZoom};    
	    
	    var systemSetting = CommonUtils.getSystemSetting();
	    
	    if( !systemSetting.keyGoogleMapsApiKey || systemSetting.keyGoogleMapsApiKey === '' ){
	        NotificationService.showNotifcationDialog($translate.instant("warning"), $translate.instant("missing_google_maps_api_key"));
	        systemSetting.keyGoogleMapsApiKey = 'AIzaSyBjlDmwuON9lJbPMDlh_LI3zGpGtpK9erc';
	    }
	    
	    var setCoordinateLabel = '<i class="fa fa-map-marker fa-2x"></i><span class="small-horizontal-spacing">' + $translate.instant('set_coordinate') + '</span>';
	    var zoomInLabel = '<i class="fa fa-search-plus fa-2x"></i><span class="small-horizontal-spacing">' + $translate.instant('zoom_in') + '</span>';
	    var zoomOutLabel = '<i class="fa fa-search-minus fa-2x"></i><span class="small-horizontal-spacing">' + $translate.instant('zoom_out') + '</span>';
	    var centerMapLabel = '<i class="fa fa-crosshairs fa-2x"></i><span class="small-horizontal-spacing">' + $translate.instant('center_map') + '</span>';
	    
	    var contextmenuItems = [{
	                        text: setCoordinateLabel,
	                        callback: setCoordinate,
	                        index: 0
	                    },
	                    {
	                        separator: true,
	                        index: 1
	                    },
	                    {
	                        text: zoomInLabel,
	                        callback: zoomIn,
	                        index: 2
	                    },
	                    {
	                        text: zoomOutLabel,
	                        callback: zoomOut,
	                        index: 3
	                    },
	                    {
	                        separator: true,
	                        index: 4
	                    },
	                    {
	                        text: centerMapLabel,
	                        callback: centerMap,
	                        index: 5
	                    }];
	                        
	    $scope.mapDefaults = {map: {
	                            contextmenu: true,
	                            contextmenuWidth: 180,
	                            contextmenuItems: contextmenuItems
	                        }};
	    
	    var geojsonMarkerOptions = {
				    radius: 15,
				    fillColor: '#ff7800',
				    color: '#000',
				    weight: 1,
				    opacity: 1,
				    fillOpacity: 0.8
				};
	                        
	    var style = {fillColor: "green",
	                    weight: 1,
	                    opacity: 0.8,
	                    color: 'black',
	                    fillOpacity: 0
	                };
	
	    $scope.marker = $scope.location && $scope.location.lat && $scope.location.lng ? {m1: {lat: $scope.location.lat, lng: $scope.location.lng, draggable: true}} : {};
	    
	    function pointToLayer( feature, latlng ){
	        return L.circleMarker(latlng, geojsonMarkerOptions);
	    };
	    
	    function onEachFeature(feature, layer) {
	        
	        layer.on("mouseover",function(e){            
	            $("#polygon-label").text( feature.properties.name );
	        });
	        layer.on("mouseout",function(e){
	            $("#polygon-label").text('');
	        });        
	        
	        if( layer._layers ){
	            layer.eachLayer(function (l) {
	                l.bindContextMenu({
	                    contextmenu: true,
	                    contextmenuWidth: 180,                
	                    contextmenuItems: [{
	                                    text: setCoordinateLabel,
	                                    callback: function(e){
	                                        setCoordinate(e, feature);
	                                    },
	                                    index: 0
	                                },
	                                {
	                                    separator: true,
	                                    index: 1
	                                },
	                                {
	                                    text: zoomInLabel,
	                                    callback: function(e){
	                                        zoomIn(e, feature);
	                                    },
	                                    index: 2
	                                },
	                                {
	                                    text: zoomOutLabel,
	                                    callback: function(e){
	                                        zoomOut(e, feature);
	                                    },
	                                    index: 3,
	                                    disabled: currentLevel < 1
	                                },
	                                {
	                                    separator: true,
	                                    index: 4
	                                },
	                                {
	                                    text: centerMapLabel,
	                                    callback: function(e){
	                                        centerMap(e, feature);
	                                    },
	                                    index: 5
	                                }]
	                });
	            });
	        }
	        else{
	            layer.bindContextMenu({
	                    contextmenu: true,
	                    contextmenuWidth: 180,
	                    contextmenuInheritItems: false,
	                    contextmenuItems: [{
	                                    text: setCoordinateLabel,
	                                    callback: function(e){
	                                        setCoordinate(e, feature, layer);
	                                    },
	                                    index: 0
	                                },
	                                {
	                                    separator: true,
	                                    index: 1
	                                },
	                                {
	                                    text: zoomInLabel,
	                                    callback: function(e){
	                                        zoomIn(e, feature);
	                                    },
	                                    disabled: true,
	                                    index: 2
	                                },
	                                {
	                                    text: zoomOutLabel,
	                                    callback: function(e){
	                                        zoomOut(e, feature);
	                                    },
	                                    index: 3
	                                },
	                                {
	                                    separator: true,
	                                    index: 4
	                                },
	                                {
	                                    text: centerMapLabel,
	                                    callback: function(e){
	                                        centerMap(e, feature);
	                                    },
	                                    index: 5
	                                }]
	                });
	        }        
	    }    
	            
	    function getGeoJsonByOuLevel(initialize, event, mode) {                    
	        var url = null, parent = null;
	        if (initialize) {
	            currentLevel = 0;
	            url = DHIS2URL + '/organisationUnits.geojson?level=' + ouLevels[currentLevel].level;
	        }
	        else {
	            if (mode === 'IN') {
	                currentLevel++;
	                parent = event.id;
	            }
	            if (mode === 'OUT') {
	                currentLevel--;                
	                var parents = event.properties.parentGraph.substring(1, event.properties.parentGraph.length - 1).split('/');
	                parent = parents[parents.length - 2];
	            }
	            
	            if( ouLevels[currentLevel] && ouLevels[currentLevel].level && parent && !initialize ){
	                url = url = DHIS2URL + '/organisationUnits.geojson?level=' + ouLevels[currentLevel].level + '&parent=' + parent;
	            }
	        }
	
	        if( url ){
	            
	            $http.get(url).success(function (data) {
	
	                $scope.currentGeojson = {data: data, style: style, onEachFeature: onEachFeature, pointToLayer: pointToLayer};
	                
	                leafletData.getMap().then(function( map ){
	                    var latlngs = [];
	                    angular.forEach($scope.currentGeojson.data.features, function(feature){                
	                        if( feature.geometry.type === "Point"){
	                            //latlngs.push( L.latLng( $scope.currentGeojson.data.features[0].geometry.coordinates) );
	                            //isPoints = true;
	                        }
	                        else{
	                            for (var i in feature.geometry.coordinates) {                        
	                                var coord = feature.geometry.coordinates[i];                    
	                                for (var j in coord) {
	                                    var points = coord[j];
	                                    for (var k in points) {
	                                        latlngs.push(L.GeoJSON.coordsToLatLng(points[k]));
	                                    }
	                                }
	                            }                        
	                        }
	                    });
	                    
	                    if( $scope.location && $scope.location.lat && $scope.location.lng ){
	                        map.setView([$scope.location.lat, $scope.location.lng], $scope.maxZoom);
	                    } 
	                    else{
	                        if( latlngs.length > 0 ){                            
	                            map.fitBounds(latlngs, {maxZoom: $scope.maxZoom});
	                        }
	                    }
	                });
	            });
	        }
	    }
	    
	    function zoomMap(event, mode) {
	        if(ouLevels && ouLevels.length > 0){
	            getGeoJsonByOuLevel(false, event, mode);
	        }                    
	    }
	    
	    function setCoordinate(e, feature, layer){
	        if( feature && feature.geometry && feature.geometry.type === 'Point'){
	            var m = feature.geometry.coordinates;            
	            $scope.marker = {m1: {lat: m[1], lng: m[0], draggable: true}};
	        }
	        else{
	            $scope.marker = {m1: {lat: e.latlng.lat, lng: e.latlng.lng, draggable: true}};
	        }
	        
	        $scope.location = {lat: $scope.marker.m1.lat, lng: $scope.marker.m1.lng};
	    };
	    
	    function zoomIn(e, feature){
	        $scope.maxZoom += 2; 
	        if( feature && feature.id ){            
	            zoomMap( feature, 'IN');
	        }
	        else{            
	            $scope.center = angular.copy(e.latlng);            
	            $scope.center.zoom = $scope.maxZoom;
	        }        
	    };
	    
	    function zoomOut(e, feature){
	        $scope.maxZoom -= 2;
	        if( feature && feature.id ){             
	            zoomMap( feature, 'OUT');
	        }
	        else{
	            $scope.center = angular.copy(e.latlng);            
	            $scope.center.zoom = $scope.maxZoom;
	        }
	    };
	    
	    function centerMap(e, feature){
	        $scope.maxZoom += 2;
	        $scope.center.lat = e.latlng.lat;
	        $scope.center.lng = e.latlng.lng;
	    };
	    
	    function integrateGeoCoder(){
	        
	        leafletData.getMap($scope.selectedTileKey).then(function( map ){
	                        
	            if( $scope.marker && $scope.marker.m1 && $scope.marker.m1.lat && $scope.marker.m1.lng ){
	                map.setView([$scope.marker.m1.lat, $scope.marker.m1.lng], $scope.maxZoom);
	            }
	            
	            $scope.geocoder = L.Control.geocoder({
	                defaultMarkGeocode: false
	            }).addTo(map);
	
	            $scope.geocoder.on('markgeocode', function(e) {
	                $scope.marker = {m1: {lat: e.geocode.center.lat, lng: e.geocode.center.lng, draggable: true}};
	                $scope.location = {lat: e.geocode.center.lat, lng: e.geocode.center.lng};
	                map.setView([$scope.marker.m1.lat, $scope.marker.m1.lng], 16);
	            })
	            .addTo(map);
	        
	        });
	    }
	    
	    function loadGoogleMapApi() {
	        
	        var deferred = $q.defer();
	        $window.initMap = function() {
	            deferred.resolve();
	        };
	        
	        var script = document.createElement('script'); 
	        script.src = 'https://maps.google.com/maps/api/js?callback=initMap&key=' + systemSetting.keyGoogleMapsApiKey;
	        document.body.appendChild(script);
	        return deferred.promise;
	    }
	    
	    getGeoJsonByOuLevel(true);
	    
	    integrateGeoCoder();
	            
	    $scope.setTile = function( tileKey ){        
	        if( tileKey === $scope.selectedTileKey ){
	            return;
	        }        
	        if( tileKey ){
	            if( tileKey === 'openstreetmap' ){
	                $scope.googleMapLayers = null;
	                $scope.selectedTileKey = tileKey;
	                integrateGeoCoder();
	            }
	            else if( tileKey === 'googlemap' ){
	                if ($window.google && $window.google.maps) {
	                    $scope.selectedTileKey = tileKey;
	                    integrateGeoCoder();
	                    
	                }else {
	                    loadGoogleMapApi().then(function () {
	                        $scope.selectedTileKey = tileKey;
	                        integrateGeoCoder();
	                    }, function () {
	                        console.log('Google map loading failed.');
	                    });
	                }
	            }            
	        }
	    };        
	    
	    $scope.close = function () {
	        $modalInstance.close();
	    };
	    
	    $scope.captureCoordinate = function(){
	        if( $scope.location && $scope.location.lng && $scope.location.lat ){
	            $modalInstance.close( $scope.location );
	    	}
	    	else{
	            //notify user
	            NotificationService.showNotifcationDialog($translate.instant("error"), $translate.instant("nothing_captured"));
	            return;
	    	}
	    };
	    
	    function setLocation( args ){
	        if( args ){
	            $scope.marker.m1.lng = args.model.lng;
	            $scope.marker.m1.lat = args.model.lat;
	
	            $scope.location = {lng: args.model.lng, lat: args.model.lat};
	        }
	    }
	    
	    $scope.$on('leafletDirectiveMarker.googlemap.dragend', function (e, args) {
	        setLocation( args );
	    });
	    
	    $scope.$on('leafletDirectiveMarker.openstreetmap.dragend', function (e, args) {
	        setLocation( args );
	    });
	})
	
	//Controller for audit history
	.controller('AuditHistoryController', 
	    function ($scope, 
	            $modalInstance,
	            $translate,
	            AuditHistoryDataService, 
	            DateUtils, 
	            eventId, 
	            dataType, 
	            nameIdMap,
	            optionSets,
	            CommonUtils) {
	
	
	    $scope.model = {type: dataType, 
	    				name: dataType === 'dataElement' ? $translate.instant('data_element') : $translate.instant('attribute'),
	    				searchPlaceholder: dataType === 'dataElement' ? $translate.instant('search_by_data_element') : $translate.instant('search_by_attribute'),
	                    auditColumns: ['name', 'auditType', 'value', 'modifiedBy', 'created'], itemList:[], uniqueRows:[]};
	
	    $scope.close = function () {
	        $modalInstance.close();
	    };
	    $scope.model.showStatus="waiting";
	    AuditHistoryDataService.getAuditHistoryData(eventId, dataType).then(function (data) {
	
	        $scope.model.itemList = [];
	        $scope.model.uniqueRows = [];
	        
	        var reponseData = data.trackedEntityDataValueAudits ? data.trackedEntityDataValueAudits :
	            data.trackedEntityAttributeValueAudits ? data.trackedEntityAttributeValueAudits : null;
	
	        if (reponseData) {
	            for (var index = 0; index < reponseData.length; index++) {                
	                var dataValue = reponseData[index];                
	                var audit = {}, obj = {};
	                if (dataType === "attribute") {
	                    if (nameIdMap[dataValue.trackedEntityAttribute.id]) {
	                        obj = nameIdMap[dataValue.trackedEntityAttribute.id];
	                        audit.name = obj.displayName;
	                        audit.valueType = obj.valueType;
	                    }
	                } else if (dataType === "dataElement") {
	                    if (nameIdMap[dataValue.dataElement.id] && nameIdMap[dataValue.dataElement.id].dataElement) {
	                        obj = nameIdMap[dataValue.dataElement.id].dataElement;
	                        audit.name = obj.displayFormName;
	                        audit.valueType = obj.valueType;
	                    }
	                }
	                
	                dataValue.value = CommonUtils.formatDataValue(null, dataValue.value, obj, optionSets, 'USER');
	                audit.auditType = dataValue.auditType;                
	                audit.value = dataValue.value;
	                audit.modifiedBy = dataValue.modifiedBy;
	                audit.created = DateUtils.formatToHrsMinsSecs(dataValue.created);                
	                
	                $scope.model.itemList.push(audit);
	                if( $scope.model.uniqueRows.indexOf(audit.name) === -1){
	                	$scope.model.uniqueRows.push(audit.name);
	                }
	                
	                if($scope.model.uniqueRows.length > 0){
	                	$scope.model.uniqueRows = $scope.model.uniqueRows.sort();
	                }
	            }
	        }
	        if ($scope.model.itemList.length === 0) {
	            $scope.model.showStatus="data_unavailable";
	        } else {
	            $scope.model.showStatus="data_available";
	        }
	    },function(){
	        $scope.model.showStatus="data_unavailable";
	    });
	})
	
	.controller('OrgUnitTreeController', function($scope, $modalInstance, OrgUnitFactory, orgUnitId, orgUnitNames) {
	    
	    $scope.model = {selectedOrgUnitId: orgUnitId ? orgUnitId : null};
	    $scope.orgUnitNames = orgUnitNames;
	
	    function expandOrgUnit( orgUnit, ou ){
	        if( ou.path.indexOf( orgUnit.path ) !== -1 ){
	            orgUnit.show = true;
	        }
	
	        orgUnit.hasChildren = orgUnit.children && orgUnit.children.length > 0 ? true : false;
	        if( orgUnit.hasChildren ){
	            for( var i=0; i< orgUnit.children.length; i++){
	                if( ou.path.indexOf( orgUnit.children[i].path ) !== -1 ){
	                    orgUnit.children[i].show = true;
	                    expandOrgUnit( orgUnit.children[i], ou );
	                }
	            }
	        }
	        return orgUnit;
	    };
	
	    function attachOrgUnit( orgUnits, orgUnit ){
	        for( var i=0; i< orgUnits.length; i++){
	            if( orgUnits[i].id === orgUnit.id ){
	                orgUnits[i] = orgUnit;
	                orgUnits[i].show = true;
	                orgUnits[i].hasChildren = orgUnits[i].children && orgUnits[i].children.length > 0 ? true : false;
	                return;
	            }
	            if( orgUnits[i].children && orgUnits[i].children.length > 0 ){
	                attachOrgUnit(orgUnits[i].children, orgUnit);
	            }
	        }
	        return orgUnits;
	    };
	
	    //Get orgunits for the logged in user
	    OrgUnitFactory.getViewTreeRoot().then(function(response) {
	        $scope.orgUnits = response.organisationUnits;
	        var selectedOuFetched = false;
	        var levelsFetched = 0;
	        angular.forEach($scope.orgUnits, function(ou){
	            ou.show = true;
	            levelsFetched = ou.level;
	            if( orgUnitId && orgUnitId === ou.id ){
	                selectedOuFetched = true;
	            }
	            angular.forEach(ou.children, function(o){
	                levelsFetched = o.level;
	                o.hasChildren = o.children && o.children.length > 0 ? true : false;
	                if( orgUnitId && !selectedOuFetched && orgUnitId === ou.id ){
	                    selectedOuFetched = true;
	                }
	            });
	        });
	
	        levelsFetched = levelsFetched > 0 ? levelsFetched - 1 : levelsFetched;
	
	        if( orgUnitId && !selectedOuFetched ){
	            var parents = null;
	            OrgUnitFactory.get( orgUnitId ).then(function( ou ){
	                if( ou && ou.path ){
	                    parents = ou.path.substring(1, ou.path.length);
	                    parents = parents.split("/");
	                    if( parents && parents.length > 0 ){
	                        var url = "fields=id,displayName,path,level,";
	                        for( var i=levelsFetched; i<ou.level; i++){
	                            url = url + "children[id,displayName,level,path,";
	                        }
	
	                        url = url.substring(0, url.length-1);
	                        for( var i=levelsFetched; i<ou.level; i++){
	                            url = url + "]";
	                        }
	
	                        OrgUnitFactory.getOrgUnits(parents[levelsFetched], url).then(function(response){
	                            if( response && response.organisationUnits && response.organisationUnits[0] ){
	                                response.organisationUnits[0].show = true;
	                                response.organisationUnits[0].hasChildren = response.organisationUnits[0].children && response.organisationUnits[0].children.length > 0 ? true : false;
	                                response.organisationUnits[0] = expandOrgUnit(response.organisationUnits[0], ou );
	                                $scope.orgUnits = attachOrgUnit( $scope.orgUnits, response.organisationUnits[0] );
	                            }
	                        });
	                    }
	                }
	            });
	        }
	    });
	
	    //This methode is used to fetch all "search orgUnits" a user has.
	    OrgUnitFactory.getSearchTreeRoot().then(function(response) {
	        $scope.orgUnitsDataElement = response.organisationUnits;
	        var selectedOuFetched = false;
	        var levelsFetched = 0;
	        angular.forEach($scope.orgUnitsDataElement, function(ou){
	            levelsFetched = ou.level;
	            if( orgUnitId && orgUnitId === ou.id ){
	                selectedOuFetched = true;
	            }
	            angular.forEach(ou.children, function(o){
	                levelsFetched = o.level;
	                o.hasChildren = o.children && o.children.length > 0 ? true : false;
	                if( orgUnitId && !selectedOuFetched && orgUnitId === ou.id ){
	                    selectedOuFetched = true;
	                }
	            });
	        });
	
	        levelsFetched = levelsFetched > 0 ? levelsFetched - 1 : levelsFetched;
	
	        if( orgUnitId && !selectedOuFetched ){
	            var parents = null;
	            OrgUnitFactory.get( orgUnitId ).then(function( ou ){
	                if( ou && ou.path ){
	                    parents = ou.path.substring(1, ou.path.length);
	                    parents = parents.split("/");
	                    if( parents && parents.length > 0 ){
	                        var url = "fields=id,displayName,path,level,";
	                        for( var i=levelsFetched; i<ou.level; i++){
	                            url = url + "children[id,displayName,level,path,";
	                        }
	
	                        url = url.substring(0, url.length-1);
	                        for( var i=levelsFetched; i<ou.level; i++){
	                            url = url + "]";
	                        }
	
	                        OrgUnitFactory.getOrgUnits(parents[levelsFetched], url).then(function(response){
	                            if( response && response.organisationUnits && response.organisationUnits[0] ){
	                                response.organisationUnits[0].show = true;
	                                response.organisationUnits[0].hasChildren = response.organisationUnits[0].children && response.organisationUnits[0].children.length > 0 ? true : false;
	                                response.organisationUnits[0] = expandOrgUnit(response.organisationUnits[0], ou );
	                                $scope.orgUnitsDataElement = attachOrgUnit( $scope.orgUnitsDataElement, response.organisationUnits[0] );
	                            }
	                        });
	
	                        openPath($scope.orgUnitsDataElement);
	
	                        //Recurtsive methode for expanding all orgUnits that contain the selected orgUnit.
	                        function openPath(orgUnits) {
	                            angular.forEach(orgUnits, function(orgUnit){
	                                if(parents.indexOf(orgUnit.id) > -1) {
	                                    $scope.expandCollapse(orgUnit);
	                                    openPath(orgUnit.children);
	                                }
	                            });
	                        }
	                    }
	                }
	            });
	        }
	    });
	
	    //filter orgunits
	    $scope.filterOrgUnits = function( clear ){
	        if( !$scope.orgUnitFilterText || clear ){
	            $scope.orgUnits = angular.copy( $scope.orgUnitsCopy );
	            $scope.orgUnitFilterText = undefined;
	            return;
	        }
	        
	        OrgUnitFactory.getByName( $scope.orgUnitFilterText ).then(function( response ){            
	            $scope.orgUnitsDataElement = response.organisationUnits;
	        });
	    };
	
	    //expand/collapse of search orgunit tree
	    $scope.expandCollapse = function(orgUnit) {
	        if( orgUnit.hasChildren ){
	            //Get children for the selected orgUnit
	            OrgUnitFactory.getChildren(orgUnit.id).then(function(ou) {
	                orgUnit.show = !orgUnit.show;
	                orgUnit.hasChildren = false;
	                orgUnit.children = ou.children;
	                angular.forEach(orgUnit.children, function(ou){
	                    ou.hasChildren = ou.children && ou.children.length > 0 ? true : false;
	                });
	            });
	        }
	        else{
	            orgUnit.show = !orgUnit.show;
	        }
	    };
	
	    $scope.setSelectedOrgUnit = function( orgUnit ){
	    	$scope.model.selectedOrgUnit = {id: orgUnit.id, displayName: orgUnit.displayName};
	        $scope.model.selectedOrgUnitId = orgUnit.id;
	        $scope.orgUnitNames[orgUnit.id] = orgUnit.displayName;
	    };
	
	    $scope.select = function () {
	        $modalInstance.close( {selected: $scope.model.selectedOrgUnit, names: $scope.orgUnitNames} );
	    };
	
	    $scope.close = function(){        
	        $modalInstance.close();
	    };
	});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	angular.module('d2Templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./templates/age-input.html','<div ng-form="ageForm">\n    <div class="input-group" style="width: 100%; padding-top: 5px;">\n        <input type="text" \n               d2-date name="dob" \n               d2-date-validator\n               ng-model="age.dob"\n               blur-or-change="saveDOB()"\n               ng-required="d2Required"\n               ng-disabled="d2Disabled"\n               ng-attr-placeholder="{{\'dob\'| translate}}" \n               ng-attr-title="{{\'dob\'| translate}}" \n               class="form-control no-right-radius"\n               ng-class="{\'input-success\': d2AgeSaved}"/>\n        <span class="input-group-btn empty-span"></span>\n        <span class="has-float-label">\n            <input type="number" \n                   name="years"\n                   ng-model="age.years" \n                   ng-model-options="{updateOn: \'blur\'}"\n                   ng-change="saveAge()"\n                   ng-disabled="d2Disabled"\n                   d2-number-validator\n                   number-type="INTEGER_ZERO_OR_POSITIVE"\n                   ng-attr-placeholder="{{\'years\'| translate}}"\n                   ng-attr-title="{{\'years\'| translate}}" \n                   class="form-control no-right-radius no-left-radius"\n                   ng-class="{\'input-success\': d2AgeSaved}"\n                   id="year"/>\n            <label for="year">{{\'years\'| translate}}</label>\n        </span>\n        <span class="input-group-btn empty-span"></span>\n        <span class="has-float-label">\n            <input type="number" \n                   name="months"\n                   ng-model="age.months" \n                   ng-model-options="{updateOn: \'blur\'}"\n                   ng-change="saveAge()"\n                   ng-disabled="d2Disabled"\n                   d2-number-validator\n                   number-type="INTEGER_ZERO_OR_POSITIVE"\n                   ng-attr-placeholder="{{\'months\'| translate}}"\n                   ng-attr-title="{{\'months\'| translate}}" \n                   class="form-control no-right-radius no-left-radius"\n                   ng-class="{\'input-success\': d2AgeSaved}"\n                   id="month"/>\n            <label for="month">{{\'months\'| translate}}</label>\n        </span>\n        <span class="input-group-btn empty-span"></span>\n        <span class="has-float-label">\n            <input type="number" \n                   name="days"\n                   ng-model="age.days" \n                   ng-model-options="{updateOn: \'blur\'}"\n                   ng-change="saveAge()"\n                   ng-disabled="d2Disabled"\n                   d2-number-validator\n                   number-type="INTEGER_ZERO_OR_POSITIVE"\n                   ng-attr-placeholder="{{\'days\'| translate}}"\n                   ng-attr-title="{{\'days\'| translate}}" \n                   class="form-control no-left-radius no-right-radius"\n                   ng-class="{\'input-success\': d2AgeSaved}"\n                   id="day"/>\n            <label for="day">{{\'days\'| translate}}</label>\n        </span>\n        <span class="input-group-btn"> \n            <button class="btn btn-danger hideInPrint trim" type="button" ng-attr-title="{{\'remove\'| translate}}" ng-click="removeAge()" ng-disabled="!age.dob || d2Disabled"> \n                <i class="fa fa-trash-o"></i> \n            </button>\n        </span>\n    </div>\n    <div ng-messages="ageForm.years.$error" ng-if="ageInteracted(ageForm.years)" class="required" ng-messages-include="./templates/error-messages.html"></div>\n    <div ng-messages="ageForm.months.$error" ng-if="ageInteracted(ageForm.months)" class="required" ng-messages-include="./templates/error-messages.html"></div>\n    <div ng-messages="ageForm.months.$error" ng-if="ageInteracted(ageForm.days)" class="required" ng-messages-include="./templates/error-messages.html"></div>\n</div>\n\n<style>\n    .has-float-label {\n    position: relative;\n    }\n    .has-float-label label {\n        position: absolute;\n        cursor: text;\n        font-size: 75%;\n        opacity: 1;\n        -webkit-transition: all .2s;\n        transition: all .2s;\n        top: -.5em;\n        left: 5px;\n        z-index: 3;\n        line-height: 1;\n        padding: 0 1px;\n    }\n    .has-float-label label::after {\n        content: " ";\n        display: block;\n        position: absolute;\n        height: 2px;\n        top: 50%;\n        left: -.2em;\n        right: -.2em;\n        z-index: -1;\n    }\n    .has-float-label .form-control::-webkit-input-placeholder {\n        opacity: 1;\n        -webkit-transition: all .2s;\n        transition: all .2s;\n    }\n    .has-float-label .form-control:placeholder-shown:not(:focus)::-webkit-input-placeholder {\n        opacity: 1;\n    }\n    .has-float-label .form-control:placeholder-shown:not(:focus)+label {\n        pointer-events: none;\n        font-size: 14px;\n        opacity: 0;\n        top: 1em;\n        font-weight: 400;\n    }\n    .input-group .has-float-label {\n        display: table-cell;\n    }\n    .input-group .has-float-label .form-control {\n        border-radius: 4px;\n    }\n    .input-group .has-float-label:not(:last-child) .form-control {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0;\n    }\n    .input-group .has-float-label:not(:first-child) .form-control {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0;\n        margin-left: -1px;\n    }\n</style>');
	$templateCache.put('./templates/audit-history.html','<div class="modal-header">\n    <h2>{{\'audit_history\'| translate}}</h2>\n</div>\n<div class="modal-body page" ng-class="{\'waiting-box\':model.showStatus === \'waiting\'}">\n    <div ng-if="model.showStatus === \'data_available\'">\n        <span class="row">\n            <input class="form-control col-md-7" ng-model="model.searchText" ng-attr-placeholder="{{model.searchPlaceholder}}" type="search" />\n        </span>\n        <div class="scroll">\n            <table class="listTable dhis2-table-striped-border">\n                <thead>\n                    <tr>\n                        <th ng-repeat="col in model.auditColumns">\n                            <span ng-switch="col">\n                                <span ng-switch-when="name">\n                                    {{model.name}}\n                                </span>\n                                <span ng-switch-default>\n                                \t{{col | translate}}\n                                </span>                                    \n                            </span>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody ng-repeat="row in model.uniqueRows">\n                    <tr ng-repeat="item in model.itemList | orderBy: \'created\':reverse | filter: {name: row} | filter: {name: model.searchText}" ng-init="rowIndex = $index">\n                        <td ng-repeat="col in model.auditColumns"\n                            rowspan="{{(model.itemList | filter: {name: row} | filter: model.searchText).length}}"\n                            ng-if="col === \'name\' && rowIndex === 0">\n                            {{item[col]}}\n                        </td>\n                        <td class="wrap-text" ng-repeat="col in model.auditColumns" ng-if="col !== \'name\'">\n                        \t<span ng-if="col === \'value\'">\n                        \t\t<span ng-switch="item.valueType">\n\t\t\t\t                    <span ng-switch-when="BOOLEAN">\n\t\t\t\t                        <span ng-if="item[col] === \'true\'">{{\'yes\'| translate}}</span>\n\t\t\t\t                        <span ng-if="item[col] === \'false\'">{{ \'no\' | translate}}</span>\n\t\t\t\t                    </span>\n\t\t\t\t                    <span ng-switch-when="TRUE_ONLY">\n\t\t\t\t                        <span ng-if="item[col]">\n\t\t\t\t                            <i class="fa fa-check"></i>\n\t\t\t\t                        </span>\n\t\t\t\t                    </span>\n\t\t\t\t                    <span ng-switch-default>{{item[col]}}</span>\n\t\t\t\t                </span>\n                        \t</span>\n                        \t<span ng-if="col !== \'value\'">\n                        \t\t{{item[col]}}\n                        \t</span>\n                        \t                            \n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n    <div ng-if="model.showStatus === \'data_unavailable\'">\n        <div class="alert alert-warning">{{\'audit_history_unavailable\'| translate}}</div>\n    </div>\n    <div ng-if="model.showStatus === \'waiting\'">\n        <i class="fa fa-spinner fa-spin audit-spinner"></i>\n        <div class="loading-audit-data">{{\'loading-audit-data\' | translate}}</div>\n    </div>\n</div>\n<div class="modal-footer" ng-if="model.showStatus !== \'waiting\'">\n    <button type="button" class="btn btn-default" data-ng-click="close()">{{\'close\'| translate}}</button>\n</div>');
	$templateCache.put('./templates/coordinate-input.html','<div  ng-form="coordinateForm">\n    <div class="input-group">\n        <input type="number" \n               ng-model="coordinateObject.coordinate.latitude" \n               ng-attr-placeholder="{{\'latitude\'| translate}}"\n               ng-class="{\'input-success\': d2LatSaved}"\n               name="latitude" \n               d2-coordinate-validator\n               ng-required="d2Required"\n               ng-disabled="d2Disabled"\n               ng-blur="saveD2Coordinate()"\n               class="form-control no-right-radius"/>\n        <span class="input-group-btn empty-span"></span>\n        <input type="number" \n               ng-model="coordinateObject.coordinate.longitude" \n               ng-attr-placeholder="{{\'longitude\'| translate}}"\n               ng-class="{\'input-success\': d2LngSaved}"\n               name="longitude" \n               d2-coordinate-validator\n               ng-required="d2Required"\n               ng-disabled="d2Disabled"\n               ng-blur="saveD2Coordinate()"\n               class="form-control no-left-radius no-right-radius"/>\n        <span class="input-group-btn hideInPrint">\n            <button class="btn btn-grp trim hideInPrint" \n                    type="button"\n                    ng-disabled="{{d2Disabled}}"\n                    ng-attr-title="{{\'get_from_map\'| translate}}"\n                    ng-click="showMap(coordinateObject)"> \n                <i class="fa fa-map-marker"></i>                             \n            </button>\n        </span>    \n    </div>\n    <div ng-messages="coordinateForm.latitude.$error" ng-if="coordinateInteracted(coordinateForm.latitude)" class="required" ng-messages-include="./templates/error-messages.html"></div>\n    <div ng-messages="coordinateForm.longitude.$error" ng-if="coordinateInteracted(coordinateForm.longitude)" class="required" ng-messages-include="./templates/error-messages.html"></div>\n</div>');
	$templateCache.put('./templates/custom-dataentry-form.html','<d2-custom-data-entry-form custom-data-entry-form="customDataEntryForm"></d2-custom-data-entry-form>');
	$templateCache.put('./templates/custom-registration-form.html','<d2-custom-registration-form custom-registration-form="customRegistrationForm"></d2-custom-registration-form>');
	$templateCache.put('./templates/date-time-input.html','<div class="hideInPrint input-group" ng-init="dateTimeInit()">\n        <input type="text"\n               ng-attr-placeholder="{{datetimeDatePlaceholder}}"\n               class="form-control no-right-radius ng-valid-date-validator"\n               ng-class="datetimeUseNotification ? getInputNotifcationClass(datetimeModelId, datetimeModel) : \'\'"\n               d2-date\n               d2-date-validator\n               max-date="datetimeMaxDate"\n               ng-model="dateTime.date"\n               ng-required="datetimeRequired"\n               ng-disabled="datetimeDisabled"\n               blur-or-change="saveDateTime(true, \'foo\')"\n               name="foo">\n        <span class="input-group-btn empty-span"></span>\n        <input type="text"\n               ng-attr-placeholder="{{\'hours_and_minutes\' | translate}}"\n               class="form-control no-left-radius no-right-radius"\n               ng-class="datetimeUseNotification ? getInputNotifcationClass(datetimeModelId, datetimeModel) : \'\'"\n               d2-time-validator\n               d2-time-parser\n               ng-model="dateTime.time"\n               ng-required="datetimeRequired"\n               ng-disabled="datetimeDisabled"\n               ng-change="autoTimeFormat()"\n               ng-blur="saveDateTime(false, \'foo2\')"\n               name="foo2">\n        <span class="input-group-btn hideInPrint">\n            <button class="btn btn-danger hideInPrint trim" type="button" ng-disabled="datetimeDisabled" ng-attr-title="Clear" ng-click="clearDateTime()"> \n                <i class="fa fa-trash-o"></i>                             \n            </button>\n        </span>\n</div>\n\n<div class="not-for-screen">\n    <input type="text" class="form-control" ng-attr-value={{datetimeModel[datetimeModelId]}}>\n</div>\n\n<div ng-messages="datetimeField.foo2.$error" ng-if="interacted(datetimeField.foo2, datetimeOuterform)" class="required">\n    <span ng-message="timeValidator">{{\'time_error\' | translate}}</span>\n</div>');
	$templateCache.put('./templates/error-messages.html','<span ng-message="required">{{\'required\' | translate}}</span>\n<span ng-message="number">{{\'value_must_be_number\' | translate}}</span>\n<span ng-message="percentValue">{{\'value_must_be_valid_percentValue\' | translate}}</span>\n<span ng-message="posInt">{{\'value_must_be_posInt\' | translate}}</span>\n<span ng-message="negInt">{{\'value_must_be_negInt\' | translate}}</span>\n<span ng-message="zeroPositiveInt">{{\'value_must_be_zeroPositiveInt\' | translate}}</span>\n<span ng-message="integer">{{\'value_must_be_int\' | translate}}</span>\n<span ng-message="dateValidator">{{\'date_required\' | translate}} ({{dhis2CalendarFormat.keyDateFormat}})</span>\n<span ng-message="futureDateValidator">{{\'future_date_not_allowed\' | translate}}</span>\n<span ng-message="timeValidator">{{\'wrong_time_format\' | translate}}</span>\n<span ng-message="optionValidator">{{\'option_required\' | translate}}</span>\n<span ng-message="latitudeValidator">{{\'latitude_required\' | translate}}</span>\n<span ng-message="longitudeValidator">{{\'longitude_required\' | translate}}</span>\n<span ng-message="customCoordinateValidator">{{\'latitude_longitude_required\' | translate}}</span>\n<span ng-message="uniqunessValidator">{{\'value_not_unique\' | translate}}</span>\n<span ng-message="email">{{\'value_must_be_email\' | translate}}</span>\n<span ng-message="urlValidator">{{\'url_error\' | translate}}</span>\n');
	$templateCache.put('./templates/img-input.html','<div style="margin-top: 5px; margin-bottom: 5px;">\n    <accordion>\n        <accordion-group is-open="d2DisplayOpen">\n            <accordion-heading>\n                <span ng-if="!d2Event[d2DataElementId]"> {{\'please_select_an_image\'| translate}} <i class="pull-right" ng-class="{\'fa fa-chevron-up vertical-center\': d2DisplayOpen, \'fa fa-chevron-down vertical-center\': !d2DisplayOpen}"></i></span>\n                <span ng-if="d2Event[d2DataElementId]"> {{d2FileNames[d2Event.event][d2DataElementId].length > 20 ? d2FileNames[d2Event.event][d2DataElementId].substring(0,20).concat(\'...\') : d2FileNames[d2Event.event][d2DataElementId]}} <i class="pull-right" ng-class="{\'fa fa-chevron-up vertical-center\': d2DisplayOpen, \'fa fa-chevron-down vertical-center\': !d2DisplayOpen}"></i></span>\n            </accordion-heading>\n            <div class="preview clearfix" ng-if="d2Event[d2DataElementId]">\n                <div class="previewData clearfix" ng-init="fetch()">\n                    <img ng-if="!d2HideImage" class="img" ng-src={{path}} style="max-width:100%;"></img>\n                </div>\t\n            </div>\n            <div ng-if="!d2Event[d2DataElementId]">\n                <div class="form-group inputDnD">\n                    <input type="file"\n                           name="foo"\n                           ng-disabled="d2Disabled"\n                           input-field-id={{d2DataElementId}}\n                           d2-file-input-ps="d2Ps"\n                           d2-file-input="d2Event"\n                           d2-file-input-current-name="d2CurrentImageName"\n                           d2-file-input-name="d2FileNames"\n                           accept="image/*"\n                           class="form-control-file text-primary font-weight-bold"\n                           id="inputFile"\n                           data-title="{{\'drop_image\'| translate}}">\n                </div>\n            </div>\n            <div class="input-group" ng-show="d2CanEdit" style="margin-top: 5px;">\n                <div class="form-control">\n                    <a href ng-click="d2IsAttribute ? d2DownloadMethode(d2Tei, d2DataElementId) : d2DownloadMethode(d2Event.event, d2DataElementId)" ng-attr-title="{{d2FileNames[d2Event.event][d2DataElementId]}}">{{d2FileNames[d2Event.event][d2DataElementId].length > 20 ? d2FileNames[d2Event.event][d2DataElementId].substring(0,20).concat(\'...\') : d2FileNames[d2Event.event][d2DataElementId]}}</a>\n                </div>\n                <span class="input-group-btn">\n                    <span class="btn btn-grp btn-file" ng-click="delete()" ng-disabled="d2Disabled" ng-if="d2Event[d2DataElementId]" style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;">\n                        <span ng-attr-title="{{\'delete\' | translate}}"\n                              d2-file-input-name="d2FileNames[d2Event.event][d2DataElementId]"\n                              d2-file-input-delete="d2Event[d2DataElementId]">\n                            <i class="fa fa-trash"></i>\n                        </span>\n                    </span>\n                    <span class="btn btn-grp btn-file" ng-if="!d2Event[d2DataElementId]" style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;">\n                        <span ng-attr-title="{{\'upload\' | translate}}">\n                            <i class="fa fa-upload"></i>\n                            <input type="file"\n                                    ng-required="d2Required"\n                                    ng-disabled="d2Disabled"\n                                    name="foo"\n                                    input-field-id={{d2DataElementId}}\n                                    d2-file-input-ps="d2Ps"\n                                    d2-file-input="d2Event"\n                                    d2-file-input-current-name="d2CurrentImageName"\n                                    d2-file-input-name="d2FileNames"\n                                    accept="image/*">\n                        </span>\n                    </span>\n                </span>\n                <span class="input-group-btn">\n                    <button type="button" class="btn btn-default" ng-disabled="!d2Event[d2DataElementId]" ng-click="fetch()" style="border-radius: 4px; margin-left: 10px;">\n                        <i class="fa fa-refresh" aria-hidden="true"></i>\n                    </button>\n                </span>\n            </div>               \n        </accordion-group> \n    </accordion>\n</div>\n\n<style>\n    .inputDnD .form-control-file {\n        position: relative;\n        width: 100%;\n        height: 100%;\n        min-height: 6em;\n        outline: none;\n        visibility: hidden;\n        cursor: pointer;\n        background-color: #c61c23;\n        box-shadow: 0 0 5px solid currentColor;\n    }\n    .inputDnD .form-control-file:before {\n        content: attr(data-title);\n        position: absolute;\n        top: 0.5em;\n        left: 0;\n        width: 100%;\n        min-height: 6em;\n        line-height: 2em;\n        padding-top: 1.5em;\n        opacity: 1;\n        visibility: visible;\n        text-align: center;\n        border: 0.15em dashed currentColor;\n        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n        overflow: hidden;\n        border-top-left-radius: 15px;\n        border-top-right-radius: 15px;\n        border-bottom-left-radius: 15px;\n        border-bottom-right-radius: 15px;\n    }\n    .inputDnD .form-control-file:hover:before {\n        border-style: solid;\n        box-shadow: inset 0px 0px 0px 0.05em currentColor;\n        border-bottom-right-radius: 15px;\n        border-top-right-radius: 15px;\n        border-bottom-left-radius: 15px;\n        border-top-left-radius: 15px;\n    }\n</style>');
	$templateCache.put('./templates/map.html','<div class="modal-header">\n    <h2>\n        {{\'point_and_click_for_coordinate\'| translate}}        \n    </h2>\n    <div class="align-center">\n        <span id=\'polygon-label\'></span>\n    </div>\n</div>\n<div class="modal-body map-area">\n    <span ng-switch="selectedTileKey">        \n        <span ng-switch-when="openstreetmap">\n            <leaflet id="openstreetmap" lf-center="center" geojson="currentGeojson" defaults="mapDefaults" markers="marker" tiles="tilesDictionary[selectedTileKey]"></leaflet>\n        </span>\n        <span ng-switch-when="googlemap">\n            <leaflet id="googlemap" lf-center="center" geojson="currentGeojson" defaults="mapDefaults" markers="marker" layers="tilesDictionary[selectedTileKey].layers"></leaflet>\n        </span>\n    </span>\n</div>\n<div class="modal-footer">\n    \n    <div class="pull-left">\n        <ul class="nav nav-pills">\n            <li ng-class="{true: \'active\'} [selectedTileKey === key]" ng-repeat="key in tilesDictionaryKeys">\n                <a href ng-click="setTile(key)">{{key | translate}}</a>\n            </li>\n        </ul>\n    </div>\n    \n    <button class="btn btn-primary" data-ng-click="captureCoordinate()">{{\'capture\'| translate}}</button>\n    <button class="btn btn-default" data-ng-click="close()">{{\'cancel\'| translate}}</button>        \n</div>');
	$templateCache.put('./templates/more-options-list.html','    <ui-select ng-model="d2Model[d2ModelId]"\n               theme="select2"\n               ng-required="d2Required"\n               ng-disabled="d2Disabled"\n               name="foo"\n               on-select="saveOption()"\n               class="ui-select-style">\n        <ui-select-match allow-clear="true" ng-class="d2UseNotification ? getInputNotifcationClass(d2ModelId) : \'\'"  class="form-control-ui-select"  ng-attr-placeholder="{{\'select_or_search\' | translate}}">{{$select.selected.displayName  || $select.selected}}</ui-select-match>\n        <ui-select-choices repeat="option.displayName as option in d2AllOptions | filter: $select.search | limitTo: (d2MaxOptionSize + 1)" ui-disable-choice="$index >= d2MaxOptionSize">\n            <span ng-if="$index < d2MaxOptionSize" ng-bind-html="option.displayName | highlight: $select.search"></span>\n            <div ng-if="$index >= d2MaxOptionSize">\n                <button class="btn btn-xs btn-default" \n                        style="width: 100%; margin-top: 5px;" \n                        ng-click="showMore($select, $event);"\n                        ng-disabled="loading">{{\'show_more\' | translate}}</button>                              \n              </div>\n        </ui-select-choices>\n    </ui-select>');
	$templateCache.put('./templates/orgunit-input.html','<div class="input-group">    \n    <input type="text" name="foo" ng-disabled="true" class="form-control" ng-attr-placeholder="{{\'please_select\' | translate}}" ng-model="d2OrgunitNames[d2Object[id]]" ng-disabled="{{d2Disabled}}" ng-required="{{d2Required}}"> \n    <span class="input-group-btn"> \n        <button class="btn btn-danger hideInPrint trim" type="button" ng-attr-title="{{\'remove\' | translate}}" ng-disabled="d2Disabled" ng-click="removeSelectedOrgUnit(id)" ng-if="d2Object[id]"> \n            <i class="fa fa-trash-o"></i> \n        </button> \n        <button class="btn btn-default hideInPrint trim" type="button" ng-attr-title="{{\'get_from_tree\' | translate}}" ng-disabled="d2Disabled" ng-click="showOrgUnitTree(id)"> \n            <i class="fa fa-plus-square-o"></i> \n        </button> \n    </span> \n</div>');
	$templateCache.put('./templates/orgunit-tree.html','<div class="modal-header page">\n    <h3>{{\'org_unit\'| translate}}</h3>\n</div>\n<div class="modal-body page">\n    <div class="input-group">    \n        <input type="text" \n            name="orgUnitFilterText" \n            d2-on-enter-blur\n            d2-on-blur-change="filterOrgUnits()"\n            ng-model="orgUnitFilterText" \n            class="form-control" ng-attr-placeholder="{{\'search\' | translate}}"> \n        <span class="input-group-btn"> \n            <button class="btn btn-success hideInPrint trim" type="button" ng-attr-title="{{\'search\' | translate}}" ng-disabled="!orgUnitFilterText" ng-click="filterOrgUnits()"> \n                <i class="fa fa-search"></i> \n            </button> \n            <button class="btn btn-danger hideInPrint trim" type="button" ng-attr-title="{{\'clear\' | translate}}" ng-disabled="!orgUnitFilterText" ng-click="filterOrgUnits(true)"> \n                <i class="fa fa-trash-o"></i>\n            </button> \n        </span> \n    </div>\n    <div class="org-unit-tree" data-stop-propagation="true">\n        <script type="text/ng-template" id="orgUnitTree.html">\n            <span class="org-unit-tree-button" ng-click="expandCollapse(orgUnit)" ng-show="orgUnit.show && orgUnit.children.length > 0"><i class="fa fa-minus-square-o"></i></span>\n            <span class="org-unit-tree-button" ng-click="expandCollapse(orgUnit)" ng-show="(!orgUnit.show && orgUnit.children.length > 0) || (!orgUnit.show && orgUnit.hasChildren)"><i class="fa fa-plus-square-o"></i></span>\n            <span class="org-unit-tree-button" ng-click="setSelectedOrgUnit(orgUnit)" ng-class="{\'selected-org-unit\' : orgUnit.id === model.selectedOrgUnitId}">{{orgUnit.displayName}}</span>\n            <ul class="tree" id="tree" ng-show="orgUnit.show">\n                <li ng-repeat="orgUnit in orgUnit.children | orderBy:[\'level\',\'displayName\']" ng-include="\'orgUnitTree.html\'"></li>\n            </ul>\n        </script>\n        <ul class="tree" id="tree">\n            <li ng-repeat="orgUnit in orgUnitsDataElement | orderBy:[\'level\',\'displayName\']" ng-include="\'orgUnitTree.html\'"></li>\n        </ul>\n    </div>\n</div>\n<div class="modal-footer page">\n    <button class="btn btn-primary" data-ng-click="select()">{{\'select\'| translate}}</button>\n    <button class="btn btn-default" data-ng-click="close()">{{\'close\'| translate}}</button>\n</div>');
	$templateCache.put('./templates/radio-button.html','<!--\nCopyright (c) 2015, UiO\nAll rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are met:\n\n* Redistributions of source code must retain the above copyright notice, this\n  list of conditions and the following disclaimer.\n* Redistributions in binary form must reproduce the above copyright notice,\n  this list of conditions and the following disclaimer in the documentation\n  and/or other materials provided with the distribution.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"\nAND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\nIMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE\nARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE\nLIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR\nCONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\nSUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS\nINTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN\nCONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)\nARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE\nPOSSIBILITY OF SUCH DAMAGE.\n-->\n \n\n<div tabindex="0" ng-if="!disabled" class="custom-radio-group custom-radio-container">\n    <span ng-click="valueClicked(\'true\')" class="cursor-pointer">\n        <span class="fa-stack">                                                                                                        \n            <span class=\'fa fa-stack-1x fa-circle radio-default fa-stack-custom-large\' ng-class=\'radioButtonColor("true")\'></span>        \n            <span class="fa fa-stack-1x fa-circle-thin fa-stack-custom-large"></span>\n            <span class="fa-stack-custom-small" ng-class="radioButtonImage(\'true\')"></span>\n        </span>\n        <span class="custom-radio-text">\n            {{\'Yes\' | translate }}\n        </span>\n    </span>\n    &nbsp;&nbsp;    \n    <span ng-click="valueClicked(\'false\')" class="cursor-pointer">\n        <span class="fa-stack">                                                                                                        \n            <span class=\'fa fa-stack-1x fa-circle fa-stack-custom-large\' ng-class=\'radioButtonColor("false")\'></span>                                                    \n            <span class="fa fa-stack-1x fa-circle-thin fa-stack-custom-large"></span>\n            <span class="fa-stack-custom-small" ng-class="radioButtonImage(\'false\')"></span>\n        </span>\n        <span class="custom-radio-text">\n            {{\'No\' | translate }}\n        </span>        \n    </span>\n    <div ng-if="status === \'error\'" class="custom-radio-error input-error"><span>{{\'save failed\' | translate}}</span></div>\n    \n    \n    <div ng-show="false">\n        <label class="radio-inline">                                                    \n            <input class="radio-display-none" ng-required="required" style=\'margin-top: 1px\' type="radio" ng-model="value" ng-disabled="disabled" name="{{name}}" ng-attr-value="true">                                                    \n        </label>                                                \n        <label class="radio-inline">\n            <input class="radio-display-none" ng-required="required" style=\'margin-top: 1px\' type="radio" ng-model="value" ng-disabled="disabled" name="{{name}}" ng-attr-value="false">\n        </label>\n    </div>\n</div>\n<div ng-if="disabled" class="custom-radio-container">\n    <span class="fa-icon-width" ng-class="getDisabledIcon(value)"></span>\n    <span>{{getDisabledValue(value) | translate}}</span>         \n</div>');
	$templateCache.put('./templates/radio-input.html','<span ng-repeat="option in d2Options" \n      class="col-sm-12 form-control cursor-pointer" \n      ng-disabled="d2Disabled"\n      ng-class="{\'input-success\': d2ValueSaved && model.radio === option.displayName}"\n      ng-click="saveValue(option.displayName)">\n    <span class="fa fa-circle-thin fa-stack-custom-large" ng-if="option.displayName !== model.radio"></span> \n    <span class="fa fa-dot-circle-o fa-stack-custom-large" ng-if="option.displayName === model.radio"></span> \n    {{option.displayName}}\n</span>\n\n\n<span ng-show="false">\n    <label ng-repeat="option in d2Options" class="radio-display-none">\n    <input type="radio" \n           name="{{name}}"\n           ng-required="d2Required"\n           ng-disabled="d2Disabled"\n           ng-model="model.radio"\n           ng-attr-value="{{option.displayName}}"> {{option.displayName}}\n    </label>    \n</span>');
	$templateCache.put('./templates/serverside-pagination.html','<div class="paging-container">\n    <table style="background-color: #ebf0f6;" width=\'100%\'>\n        <tr>\n            <td>\n                {{\'total_number_of_pages\'| translate}}: {{pager.pageCount}}\n            </td>\n            <td>\n                <span>{{\'rows_per_page\'| translate}}:</span> <input type="text" min="1" style="width:50px;" ng-model="pager.pageSize" d2-enter="resetPageSize()" ng-blur="resetPageSize()"> \n            </td>\n            <td>\n                <span>{{\'jump_to_page\'| translate}}:</span> <input type="text" min="1" style="width:50px;" ng-model="pager.page" d2-enter="jumpToPage()" ng-blur="jumpToPage()"> \n            </td>\n        </tr>\n        <tr>\n            <td colspan="3"><hr/></td>\n        </tr>\n        <tr>\n            <td colspan="3">\n                <div class="paging">\n                    <span ng-show="pager.page > 1">\n                        <a href ng-click="getPage(1)" ng-attr-title="{{\'first\'| translate}}"> \n                            &laquo;&laquo;\n                        </a>\n                        <a href ng-click="getPage(pager.page - 1)" ng-attr-title="{{\'previous\'| translate}}"> \n                            &laquo;\n                        </a>                    \n                    </span>\n                    <span ng-hide="pager.page > 1">\n                        <span ng-attr-title="{{\'first\'| translate}}">&laquo;&laquo;</span>\n                        <span ng-attr-title="{{\'previous\'| translate}}">&laquo;</span>\n                    </span>\n                    <a href ng-click="getPage(i+1)" ng-attr-title="{{\'page\'| translate}} {{i + 1}}" ng-repeat="i in []| forLoop:paginator.lowerLimit():pager.pageCount | limitTo : pager.toolBarDisplay" ng-class="pager.page == i + 1 && \'active\'">\n                        {{i + 1}}\n                    </a>\n\n                    <span ng-show="pager.page < pager.pageCount">\n                        <a href ng-click="getPage(pager.page + 1)" ng-attr-title="{{\'next\'| translate}}" > \n                            &raquo;\n                        </a>\n                        <a href ng-click="getPage(pager.pageCount)" ng-attr-title="{{\'last\'| translate}}"> \n                            &raquo;&raquo;\n                        </a>\n                    </span>\n                    <span ng-hide="pager.page < pager.pageCount">\n                        <span class="next" ng-attr-title="{{\'next\'| translate}}">&raquo; </span>\n                        <span class="last" ng-attr-title="{{\'last\'| translate}}">&raquo;&raquo;</span>\n                    </span>\n                </div>\n            </td>\n        </tr>\n    </table>   \n</div>');
	$templateCache.put('./templates/time-input.html','<div class="hideInPrint" ng-if="use24">\n    <input type="text"\n        ng-model="timeModel[timeModelId]"\n        ng-attr-placeholder="{{\'hours_and_minutes\' | translate}}"\n        class="form-control"\n        ng-class="timeUseNotification ? getInputNotifcationClass(timeModelId, timeModel) : \'\'"\n        d2-time-validator\n        d2-time-parser\n        ng-required="timeRequired"\n        ng-disabled="timeDisabled"\n        ng-blur="saveTime()"\n        name="foo"/>\n</div>\n<div class="hideInPrint" ng-if="!use24">\n    <div class="input-group" style="padding-bottom: 5px;">\n        <input type="text"\n            ng-model="base.temp12hTime"\n            ng-attr-placeholder="{{\'hours_and_minutes\' | translate}}"\n            class="form-control"\n            ng-class="timeUseNotification ? getInputNotifcationClass(timeModelId, timeModel) : \'\'"\n            d2-time-am-pm-validator\n            d2-time-parser\n            ng-required="timeRequired"\n            ng-disabled="timeDisabled"\n            ng-blur="save12hTime()"\n            name="foo"/>\n        <div class="input-group-btn" style="padding-top: 5px;">\n            <button type="button" class="btn btn-default dropdown-toggle" ng-disabled="timeDisabled" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-color: #aaaaaa;">{{timeFormat}} <span class="caret"></span></button>\n            <ul class="dropdown-menu">\n                <li><a ng-click="setFormat(\'AM\'); save12hTime()">AM</a></li>\n                <li><a ng-click="setFormat(\'PM\'); save12hTime()">PM</a></li>\n            </ul>\n        </div>\n    </div>\n</div>\n<div class="not-for-screen">\n    <input type="text" class="form-control" ng-attr-value={{timeModel[timeModelId]}}>\n</div>');
	$templateCache.put('./templates/tracker-associate-input.html','<div class="panel panel-default" style="margin-top: 5px; margin-bottom: 5px;">\n    <div class="panel-heading">\n        <span class="input-group">                            \n            <input type="text"\n                name="foo" \n                class="form-control"\n                ng-model="d2SelectedTei[d2Attribute.id]" \n                ng-model-options="{ updateOn: \'default blur\', allowInvalid: true }"\n                attribute-data={{d2Attribute}}\n                selected-program-id={{d2SelectedProgram.id}}  \n                selected-tei-id={{d2SelectedTei.trackedEntityInstance}}\n                ng-disabled="true" \n                ng-blur="d2BlurMethode(d2SelectedTei, d2Attribute.id)"\n                ng-required="d2Attribute.mandatory"/>\n            <span class="input-group-btn">\n                <button class="btn btn-success hideInPrint trim"\n                        ng-if="!d2SelectedTei[d2Attribute.id] " \n                        ng-class="{true: \'disable-clicks\'} [editingDisabled]"\n                        ng-disabled="d2SelectedOrgunit.closedStatus"\n                        type="button" \n                        ng-attr-title="{{\'add\'| translate}} {{d2Attribute.displayName}}"\n                        ng-click="getTa()">\n                        <i class="fa fa-external-link"></i>                             \n                </button>\n                <button class="btn btn-danger hideInPrint trim"\n                        ng-if="d2SelectedTei[d2Attribute.id]" \n                        ng-class="{true: \'disable-clicks\'} [editingDisabled]"\n                        ng-disabled="d2SelectedOrgunit.closedStatus"\n                        type="button" \n                        ng-attr-title="{{\'remove\'| translate}} {{d2Attribute.displayName}}"\n                        ng-click="delete()">\n                        <i class="fa fa-trash-o"></i>                             \n                </button>\n            </span>\n        </span>\n    </div>\n    <div class="panel-body" style="max-height: 75px; overflow-y: scroll; padding: 0px;" ng-if="userDetailsName.length > 0">\n        <table class="table table-striped" style="margin-bottom: 0px;">\n            <tbody>\n                <tr ng-repeat="name in userDetailsName">\n                    <th scope="row">{{name}}</th>\n                    <td style="border-bottom: 1px solid #ddd;">{{userDetailsData[$index]}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>');
	$templateCache.put('./templates/users-input.html','<ui-select ng-model="d2Model[d2ModelId]"\n           theme="select2"\n           ng-required="d2Required"                                  \n           ng-disabled="d2Disabled" \n           on-select="saveOption()"\n           ng-style="{\'width\': \'100%\'}"\n           name="foo">\n    <ui-select-match allow-clear="true" ng-class="d2UseNotification ? getInputNotifcationClass(d2ModelId) : \'\'"  class="form-control-ui-select"  ng-attr-placeholder="{{\'select_or_search\' | translate}}">{{$select.selected.displayName  || $select.selected.username ||  $select.selected}}</ui-select-match>\n    <ui-select-choices  repeat="user.username as user in allUsers | filter: $select.search | limitTo:d2MaxOptionSize">\n        <span ng-bind-html="user.username | highlight: $select.search"></span>\n    </ui-select-choices>\n</ui-select>');}]);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* @preserve
	 * Leaflet 1.3.1, a JS library for interactive maps. http://leafletjs.com
	 * (c) 2010-2017 Vladimir Agafonkin, (c) 2010-2011 CloudMade
	 */
	
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.L = {})));
	}(this, (function (exports) { 'use strict';
	
	var version = "1.3.1";
	
	/*
	 * @namespace Util
	 *
	 * Various utility functions, used by Leaflet internally.
	 */
	
	var freeze = Object.freeze;
	Object.freeze = function (obj) { return obj; };
	
	// @function extend(dest: Object, src?: Object): Object
	// Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
	function extend(dest) {
		var i, j, len, src;
	
		for (j = 1, len = arguments.length; j < len; j++) {
			src = arguments[j];
			for (i in src) {
				dest[i] = src[i];
			}
		}
		return dest;
	}
	
	// @function create(proto: Object, properties?: Object): Object
	// Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
	var create = Object.create || (function () {
		function F() {}
		return function (proto) {
			F.prototype = proto;
			return new F();
		};
	})();
	
	// @function bind(fn: Function, …): Function
	// Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	// Has a `L.bind()` shortcut.
	function bind(fn, obj) {
		var slice = Array.prototype.slice;
	
		if (fn.bind) {
			return fn.bind.apply(fn, slice.call(arguments, 1));
		}
	
		var args = slice.call(arguments, 2);
	
		return function () {
			return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
		};
	}
	
	// @property lastId: Number
	// Last unique ID used by [`stamp()`](#util-stamp)
	var lastId = 0;
	
	// @function stamp(obj: Object): Number
	// Returns the unique ID of an object, assigning it one if it doesn't have it.
	function stamp(obj) {
		/*eslint-disable */
		obj._leaflet_id = obj._leaflet_id || ++lastId;
		return obj._leaflet_id;
		/* eslint-enable */
	}
	
	// @function throttle(fn: Function, time: Number, context: Object): Function
	// Returns a function which executes function `fn` with the given scope `context`
	// (so that the `this` keyword refers to `context` inside `fn`'s code). The function
	// `fn` will be called no more than one time per given amount of `time`. The arguments
	// received by the bound function will be any arguments passed when binding the
	// function, followed by any arguments passed when invoking the bound function.
	// Has an `L.throttle` shortcut.
	function throttle(fn, time, context) {
		var lock, args, wrapperFn, later;
	
		later = function () {
			// reset lock and call if queued
			lock = false;
			if (args) {
				wrapperFn.apply(context, args);
				args = false;
			}
		};
	
		wrapperFn = function () {
			if (lock) {
				// called too soon, queue to call later
				args = arguments;
	
			} else {
				// call and lock until later
				fn.apply(context, arguments);
				setTimeout(later, time);
				lock = true;
			}
		};
	
		return wrapperFn;
	}
	
	// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
	// Returns the number `num` modulo `range` in such a way so it lies within
	// `range[0]` and `range[1]`. The returned value will be always smaller than
	// `range[1]` unless `includeMax` is set to `true`.
	function wrapNum(x, range, includeMax) {
		var max = range[1],
		    min = range[0],
		    d = max - min;
		return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
	}
	
	// @function falseFn(): Function
	// Returns a function which always returns `false`.
	function falseFn() { return false; }
	
	// @function formatNum(num: Number, digits?: Number): Number
	// Returns the number `num` rounded to `digits` decimals, or to 6 decimals by default.
	function formatNum(num, digits) {
		var pow = Math.pow(10, (digits === undefined ? 6 : digits));
		return Math.round(num * pow) / pow;
	}
	
	// @function trim(str: String): String
	// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
	function trim(str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	}
	
	// @function splitWords(str: String): String[]
	// Trims and splits the string on whitespace and returns the array of parts.
	function splitWords(str) {
		return trim(str).split(/\s+/);
	}
	
	// @function setOptions(obj: Object, options: Object): Object
	// Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
	function setOptions(obj, options) {
		if (!obj.hasOwnProperty('options')) {
			obj.options = obj.options ? create(obj.options) : {};
		}
		for (var i in options) {
			obj.options[i] = options[i];
		}
		return obj.options;
	}
	
	// @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
	// Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
	// translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
	// be appended at the end. If `uppercase` is `true`, the parameter names will
	// be uppercased (e.g. `'?A=foo&B=bar'`)
	function getParamString(obj, existingUrl, uppercase) {
		var params = [];
		for (var i in obj) {
			params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
		}
		return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	}
	
	var templateRe = /\{ *([\w_-]+) *\}/g;
	
	// @function template(str: String, data: Object): String
	// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
	// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
	// `('Hello foo, bar')`. You can also specify functions instead of strings for
	// data values — they will be evaluated passing `data` as an argument.
	function template(str, data) {
		return str.replace(templateRe, function (str, key) {
			var value = data[key];
	
			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);
	
			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});
	}
	
	// @function isArray(obj): Boolean
	// Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
	var isArray = Array.isArray || function (obj) {
		return (Object.prototype.toString.call(obj) === '[object Array]');
	};
	
	// @function indexOf(array: Array, el: Object): Number
	// Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
	function indexOf(array, el) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === el) { return i; }
		}
		return -1;
	}
	
	// @property emptyImageUrl: String
	// Data URI string containing a base64-encoded empty GIF image.
	// Used as a hack to free memory from unused images on WebKit-powered
	// mobile devices (by setting image `src` to this string).
	var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
	
	// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	
	function getPrefixed(name) {
		return window['webkit' + name] || window['moz' + name] || window['ms' + name];
	}
	
	var lastTime = 0;
	
	// fallback for IE 7-8
	function timeoutDefer(fn) {
		var time = +new Date(),
		    timeToCall = Math.max(0, 16 - (time - lastTime));
	
		lastTime = time + timeToCall;
		return window.setTimeout(fn, timeToCall);
	}
	
	var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
	var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
			getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };
	
	// @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
	// Schedules `fn` to be executed when the browser repaints. `fn` is bound to
	// `context` if given. When `immediate` is set, `fn` is called immediately if
	// the browser doesn't have native support for
	// [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
	// otherwise it's delayed. Returns a request ID that can be used to cancel the request.
	function requestAnimFrame(fn, context, immediate) {
		if (immediate && requestFn === timeoutDefer) {
			fn.call(context);
		} else {
			return requestFn.call(window, bind(fn, context));
		}
	}
	
	// @function cancelAnimFrame(id: Number): undefined
	// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
	function cancelAnimFrame(id) {
		if (id) {
			cancelFn.call(window, id);
		}
	}
	
	
	var Util = (Object.freeze || Object)({
		freeze: freeze,
		extend: extend,
		create: create,
		bind: bind,
		lastId: lastId,
		stamp: stamp,
		throttle: throttle,
		wrapNum: wrapNum,
		falseFn: falseFn,
		formatNum: formatNum,
		trim: trim,
		splitWords: splitWords,
		setOptions: setOptions,
		getParamString: getParamString,
		template: template,
		isArray: isArray,
		indexOf: indexOf,
		emptyImageUrl: emptyImageUrl,
		requestFn: requestFn,
		cancelFn: cancelFn,
		requestAnimFrame: requestAnimFrame,
		cancelAnimFrame: cancelAnimFrame
	});
	
	// @class Class
	// @aka L.Class
	
	// @section
	// @uninheritable
	
	// Thanks to John Resig and Dean Edwards for inspiration!
	
	function Class() {}
	
	Class.extend = function (props) {
	
		// @function extend(props: Object): Function
		// [Extends the current class](#class-inheritance) given the properties to be included.
		// Returns a Javascript function that is a class constructor (to be called with `new`).
		var NewClass = function () {
	
			// call the constructor
			if (this.initialize) {
				this.initialize.apply(this, arguments);
			}
	
			// call all constructor hooks
			this.callInitHooks();
		};
	
		var parentProto = NewClass.__super__ = this.prototype;
	
		var proto = create(parentProto);
		proto.constructor = NewClass;
	
		NewClass.prototype = proto;
	
		// inherit parent's statics
		for (var i in this) {
			if (this.hasOwnProperty(i) && i !== 'prototype' && i !== '__super__') {
				NewClass[i] = this[i];
			}
		}
	
		// mix static properties into the class
		if (props.statics) {
			extend(NewClass, props.statics);
			delete props.statics;
		}
	
		// mix includes into the prototype
		if (props.includes) {
			checkDeprecatedMixinEvents(props.includes);
			extend.apply(null, [proto].concat(props.includes));
			delete props.includes;
		}
	
		// merge options
		if (proto.options) {
			props.options = extend(create(proto.options), props.options);
		}
	
		// mix given properties into the prototype
		extend(proto, props);
	
		proto._initHooks = [];
	
		// add method for calling all hooks
		proto.callInitHooks = function () {
	
			if (this._initHooksCalled) { return; }
	
			if (parentProto.callInitHooks) {
				parentProto.callInitHooks.call(this);
			}
	
			this._initHooksCalled = true;
	
			for (var i = 0, len = proto._initHooks.length; i < len; i++) {
				proto._initHooks[i].call(this);
			}
		};
	
		return NewClass;
	};
	
	
	// @function include(properties: Object): this
	// [Includes a mixin](#class-includes) into the current class.
	Class.include = function (props) {
		extend(this.prototype, props);
		return this;
	};
	
	// @function mergeOptions(options: Object): this
	// [Merges `options`](#class-options) into the defaults of the class.
	Class.mergeOptions = function (options) {
		extend(this.prototype.options, options);
		return this;
	};
	
	// @function addInitHook(fn: Function): this
	// Adds a [constructor hook](#class-constructor-hooks) to the class.
	Class.addInitHook = function (fn) { // (Function) || (String, args...)
		var args = Array.prototype.slice.call(arguments, 1);
	
		var init = typeof fn === 'function' ? fn : function () {
			this[fn].apply(this, args);
		};
	
		this.prototype._initHooks = this.prototype._initHooks || [];
		this.prototype._initHooks.push(init);
		return this;
	};
	
	function checkDeprecatedMixinEvents(includes) {
		if (typeof L === 'undefined' || !L || !L.Mixin) { return; }
	
		includes = isArray(includes) ? includes : [includes];
	
		for (var i = 0; i < includes.length; i++) {
			if (includes[i] === L.Mixin.Events) {
				console.warn('Deprecated include of L.Mixin.Events: ' +
					'this property will be removed in future releases, ' +
					'please inherit from L.Evented instead.', new Error().stack);
			}
		}
	}
	
	/*
	 * @class Evented
	 * @aka L.Evented
	 * @inherits Class
	 *
	 * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
	 *
	 * @example
	 *
	 * ```js
	 * map.on('click', function(e) {
	 * 	alert(e.latlng);
	 * } );
	 * ```
	 *
	 * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
	 *
	 * ```js
	 * function onClick(e) { ... }
	 *
	 * map.on('click', onClick);
	 * map.off('click', onClick);
	 * ```
	 */
	
	var Events = {
		/* @method on(type: String, fn: Function, context?: Object): this
		 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
		 *
		 * @alternative
		 * @method on(eventMap: Object): this
		 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
		 */
		on: function (types, fn, context) {
	
			// types can be a map of types/handlers
			if (typeof types === 'object') {
				for (var type in types) {
					// we don't process space-separated events here for performance;
					// it's a hot path since Layer uses the on(obj) syntax
					this._on(type, types[type], fn);
				}
	
			} else {
				// types can be a string of space-separated words
				types = splitWords(types);
	
				for (var i = 0, len = types.length; i < len; i++) {
					this._on(types[i], fn, context);
				}
			}
	
			return this;
		},
	
		/* @method off(type: String, fn?: Function, context?: Object): this
		 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
		 *
		 * @alternative
		 * @method off(eventMap: Object): this
		 * Removes a set of type/listener pairs.
		 *
		 * @alternative
		 * @method off: this
		 * Removes all listeners to all events on the object.
		 */
		off: function (types, fn, context) {
	
			if (!types) {
				// clear all listeners if called without arguments
				delete this._events;
	
			} else if (typeof types === 'object') {
				for (var type in types) {
					this._off(type, types[type], fn);
				}
	
			} else {
				types = splitWords(types);
	
				for (var i = 0, len = types.length; i < len; i++) {
					this._off(types[i], fn, context);
				}
			}
	
			return this;
		},
	
		// attach listener (without syntactic sugar now)
		_on: function (type, fn, context) {
			this._events = this._events || {};
	
			/* get/init listeners for type */
			var typeListeners = this._events[type];
			if (!typeListeners) {
				typeListeners = [];
				this._events[type] = typeListeners;
			}
	
			if (context === this) {
				// Less memory footprint.
				context = undefined;
			}
			var newListener = {fn: fn, ctx: context},
			    listeners = typeListeners;
	
			// check if fn already there
			for (var i = 0, len = listeners.length; i < len; i++) {
				if (listeners[i].fn === fn && listeners[i].ctx === context) {
					return;
				}
			}
	
			listeners.push(newListener);
		},
	
		_off: function (type, fn, context) {
			var listeners,
			    i,
			    len;
	
			if (!this._events) { return; }
	
			listeners = this._events[type];
	
			if (!listeners) {
				return;
			}
	
			if (!fn) {
				// Set all removed listeners to noop so they are not called if remove happens in fire
				for (i = 0, len = listeners.length; i < len; i++) {
					listeners[i].fn = falseFn;
				}
				// clear all listeners for a type if function isn't specified
				delete this._events[type];
				return;
			}
	
			if (context === this) {
				context = undefined;
			}
	
			if (listeners) {
	
				// find fn and remove it
				for (i = 0, len = listeners.length; i < len; i++) {
					var l = listeners[i];
					if (l.ctx !== context) { continue; }
					if (l.fn === fn) {
	
						// set the removed listener to noop so that's not called if remove happens in fire
						l.fn = falseFn;
	
						if (this._firingCount) {
							/* copy array in case events are being fired */
							this._events[type] = listeners = listeners.slice();
						}
						listeners.splice(i, 1);
	
						return;
					}
				}
			}
		},
	
		// @method fire(type: String, data?: Object, propagate?: Boolean): this
		// Fires an event of the specified type. You can optionally provide an data
		// object — the first argument of the listener function will contain its
		// properties. The event can optionally be propagated to event parents.
		fire: function (type, data, propagate) {
			if (!this.listens(type, propagate)) { return this; }
	
			var event = extend({}, data, {
				type: type,
				target: this,
				sourceTarget: data && data.sourceTarget || this
			});
	
			if (this._events) {
				var listeners = this._events[type];
	
				if (listeners) {
					this._firingCount = (this._firingCount + 1) || 1;
					for (var i = 0, len = listeners.length; i < len; i++) {
						var l = listeners[i];
						l.fn.call(l.ctx || this, event);
					}
	
					this._firingCount--;
				}
			}
	
			if (propagate) {
				// propagate the event to parents (set with addEventParent)
				this._propagateEvent(event);
			}
	
			return this;
		},
	
		// @method listens(type: String): Boolean
		// Returns `true` if a particular event type has any listeners attached to it.
		listens: function (type, propagate) {
			var listeners = this._events && this._events[type];
			if (listeners && listeners.length) { return true; }
	
			if (propagate) {
				// also check parents for listeners if event propagates
				for (var id in this._eventParents) {
					if (this._eventParents[id].listens(type, propagate)) { return true; }
				}
			}
			return false;
		},
	
		// @method once(…): this
		// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
		once: function (types, fn, context) {
	
			if (typeof types === 'object') {
				for (var type in types) {
					this.once(type, types[type], fn);
				}
				return this;
			}
	
			var handler = bind(function () {
				this
				    .off(types, fn, context)
				    .off(types, handler, context);
			}, this);
	
			// add a listener that's executed once and removed after that
			return this
			    .on(types, fn, context)
			    .on(types, handler, context);
		},
	
		// @method addEventParent(obj: Evented): this
		// Adds an event parent - an `Evented` that will receive propagated events
		addEventParent: function (obj) {
			this._eventParents = this._eventParents || {};
			this._eventParents[stamp(obj)] = obj;
			return this;
		},
	
		// @method removeEventParent(obj: Evented): this
		// Removes an event parent, so it will stop receiving propagated events
		removeEventParent: function (obj) {
			if (this._eventParents) {
				delete this._eventParents[stamp(obj)];
			}
			return this;
		},
	
		_propagateEvent: function (e) {
			for (var id in this._eventParents) {
				this._eventParents[id].fire(e.type, extend({
					layer: e.target,
					propagatedFrom: e.target
				}, e), true);
			}
		}
	};
	
	// aliases; we should ditch those eventually
	
	// @method addEventListener(…): this
	// Alias to [`on(…)`](#evented-on)
	Events.addEventListener = Events.on;
	
	// @method removeEventListener(…): this
	// Alias to [`off(…)`](#evented-off)
	
	// @method clearAllEventListeners(…): this
	// Alias to [`off()`](#evented-off)
	Events.removeEventListener = Events.clearAllEventListeners = Events.off;
	
	// @method addOneTimeEventListener(…): this
	// Alias to [`once(…)`](#evented-once)
	Events.addOneTimeEventListener = Events.once;
	
	// @method fireEvent(…): this
	// Alias to [`fire(…)`](#evented-fire)
	Events.fireEvent = Events.fire;
	
	// @method hasEventListeners(…): Boolean
	// Alias to [`listens(…)`](#evented-listens)
	Events.hasEventListeners = Events.listens;
	
	var Evented = Class.extend(Events);
	
	/*
	 * @class Point
	 * @aka L.Point
	 *
	 * Represents a point with `x` and `y` coordinates in pixels.
	 *
	 * @example
	 *
	 * ```js
	 * var point = L.point(200, 300);
	 * ```
	 *
	 * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
	 *
	 * ```js
	 * map.panBy([200, 300]);
	 * map.panBy(L.point(200, 300));
	 * ```
	 *
	 * Note that `Point` does not inherit from Leafet's `Class` object,
	 * which means new classes can't inherit from it, and new methods
	 * can't be added to it with the `include` function.
	 */
	
	function Point(x, y, round) {
		// @property x: Number; The `x` coordinate of the point
		this.x = (round ? Math.round(x) : x);
		// @property y: Number; The `y` coordinate of the point
		this.y = (round ? Math.round(y) : y);
	}
	
	var trunc = Math.trunc || function (v) {
		return v > 0 ? Math.floor(v) : Math.ceil(v);
	};
	
	Point.prototype = {
	
		// @method clone(): Point
		// Returns a copy of the current point.
		clone: function () {
			return new Point(this.x, this.y);
		},
	
		// @method add(otherPoint: Point): Point
		// Returns the result of addition of the current and the given points.
		add: function (point) {
			// non-destructive, returns a new point
			return this.clone()._add(toPoint(point));
		},
	
		_add: function (point) {
			// destructive, used directly for performance in situations where it's safe to modify existing point
			this.x += point.x;
			this.y += point.y;
			return this;
		},
	
		// @method subtract(otherPoint: Point): Point
		// Returns the result of subtraction of the given point from the current.
		subtract: function (point) {
			return this.clone()._subtract(toPoint(point));
		},
	
		_subtract: function (point) {
			this.x -= point.x;
			this.y -= point.y;
			return this;
		},
	
		// @method divideBy(num: Number): Point
		// Returns the result of division of the current point by the given number.
		divideBy: function (num) {
			return this.clone()._divideBy(num);
		},
	
		_divideBy: function (num) {
			this.x /= num;
			this.y /= num;
			return this;
		},
	
		// @method multiplyBy(num: Number): Point
		// Returns the result of multiplication of the current point by the given number.
		multiplyBy: function (num) {
			return this.clone()._multiplyBy(num);
		},
	
		_multiplyBy: function (num) {
			this.x *= num;
			this.y *= num;
			return this;
		},
	
		// @method scaleBy(scale: Point): Point
		// Multiply each coordinate of the current point by each coordinate of
		// `scale`. In linear algebra terms, multiply the point by the
		// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
		// defined by `scale`.
		scaleBy: function (point) {
			return new Point(this.x * point.x, this.y * point.y);
		},
	
		// @method unscaleBy(scale: Point): Point
		// Inverse of `scaleBy`. Divide each coordinate of the current point by
		// each coordinate of `scale`.
		unscaleBy: function (point) {
			return new Point(this.x / point.x, this.y / point.y);
		},
	
		// @method round(): Point
		// Returns a copy of the current point with rounded coordinates.
		round: function () {
			return this.clone()._round();
		},
	
		_round: function () {
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
			return this;
		},
	
		// @method floor(): Point
		// Returns a copy of the current point with floored coordinates (rounded down).
		floor: function () {
			return this.clone()._floor();
		},
	
		_floor: function () {
			this.x = Math.floor(this.x);
			this.y = Math.floor(this.y);
			return this;
		},
	
		// @method ceil(): Point
		// Returns a copy of the current point with ceiled coordinates (rounded up).
		ceil: function () {
			return this.clone()._ceil();
		},
	
		_ceil: function () {
			this.x = Math.ceil(this.x);
			this.y = Math.ceil(this.y);
			return this;
		},
	
		// @method trunc(): Point
		// Returns a copy of the current point with truncated coordinates (rounded towards zero).
		trunc: function () {
			return this.clone()._trunc();
		},
	
		_trunc: function () {
			this.x = trunc(this.x);
			this.y = trunc(this.y);
			return this;
		},
	
		// @method distanceTo(otherPoint: Point): Number
		// Returns the cartesian distance between the current and the given points.
		distanceTo: function (point) {
			point = toPoint(point);
	
			var x = point.x - this.x,
			    y = point.y - this.y;
	
			return Math.sqrt(x * x + y * y);
		},
	
		// @method equals(otherPoint: Point): Boolean
		// Returns `true` if the given point has the same coordinates.
		equals: function (point) {
			point = toPoint(point);
	
			return point.x === this.x &&
			       point.y === this.y;
		},
	
		// @method contains(otherPoint: Point): Boolean
		// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
		contains: function (point) {
			point = toPoint(point);
	
			return Math.abs(point.x) <= Math.abs(this.x) &&
			       Math.abs(point.y) <= Math.abs(this.y);
		},
	
		// @method toString(): String
		// Returns a string representation of the point for debugging purposes.
		toString: function () {
			return 'Point(' +
			        formatNum(this.x) + ', ' +
			        formatNum(this.y) + ')';
		}
	};
	
	// @factory L.point(x: Number, y: Number, round?: Boolean)
	// Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.
	
	// @alternative
	// @factory L.point(coords: Number[])
	// Expects an array of the form `[x, y]` instead.
	
	// @alternative
	// @factory L.point(coords: Object)
	// Expects a plain object of the form `{x: Number, y: Number}` instead.
	function toPoint(x, y, round) {
		if (x instanceof Point) {
			return x;
		}
		if (isArray(x)) {
			return new Point(x[0], x[1]);
		}
		if (x === undefined || x === null) {
			return x;
		}
		if (typeof x === 'object' && 'x' in x && 'y' in x) {
			return new Point(x.x, x.y);
		}
		return new Point(x, y, round);
	}
	
	/*
	 * @class Bounds
	 * @aka L.Bounds
	 *
	 * Represents a rectangular area in pixel coordinates.
	 *
	 * @example
	 *
	 * ```js
	 * var p1 = L.point(10, 10),
	 * p2 = L.point(40, 60),
	 * bounds = L.bounds(p1, p2);
	 * ```
	 *
	 * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
	 *
	 * ```js
	 * otherBounds.intersects([[10, 10], [40, 60]]);
	 * ```
	 *
	 * Note that `Bounds` does not inherit from Leafet's `Class` object,
	 * which means new classes can't inherit from it, and new methods
	 * can't be added to it with the `include` function.
	 */
	
	function Bounds(a, b) {
		if (!a) { return; }
	
		var points = b ? [a, b] : a;
	
		for (var i = 0, len = points.length; i < len; i++) {
			this.extend(points[i]);
		}
	}
	
	Bounds.prototype = {
		// @method extend(point: Point): this
		// Extends the bounds to contain the given point.
		extend: function (point) { // (Point)
			point = toPoint(point);
	
			// @property min: Point
			// The top left corner of the rectangle.
			// @property max: Point
			// The bottom right corner of the rectangle.
			if (!this.min && !this.max) {
				this.min = point.clone();
				this.max = point.clone();
			} else {
				this.min.x = Math.min(point.x, this.min.x);
				this.max.x = Math.max(point.x, this.max.x);
				this.min.y = Math.min(point.y, this.min.y);
				this.max.y = Math.max(point.y, this.max.y);
			}
			return this;
		},
	
		// @method getCenter(round?: Boolean): Point
		// Returns the center point of the bounds.
		getCenter: function (round) {
			return new Point(
			        (this.min.x + this.max.x) / 2,
			        (this.min.y + this.max.y) / 2, round);
		},
	
		// @method getBottomLeft(): Point
		// Returns the bottom-left point of the bounds.
		getBottomLeft: function () {
			return new Point(this.min.x, this.max.y);
		},
	
		// @method getTopRight(): Point
		// Returns the top-right point of the bounds.
		getTopRight: function () { // -> Point
			return new Point(this.max.x, this.min.y);
		},
	
		// @method getTopLeft(): Point
		// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
		getTopLeft: function () {
			return this.min; // left, top
		},
	
		// @method getBottomRight(): Point
		// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
		getBottomRight: function () {
			return this.max; // right, bottom
		},
	
		// @method getSize(): Point
		// Returns the size of the given bounds
		getSize: function () {
			return this.max.subtract(this.min);
		},
	
		// @method contains(otherBounds: Bounds): Boolean
		// Returns `true` if the rectangle contains the given one.
		// @alternative
		// @method contains(point: Point): Boolean
		// Returns `true` if the rectangle contains the given point.
		contains: function (obj) {
			var min, max;
	
			if (typeof obj[0] === 'number' || obj instanceof Point) {
				obj = toPoint(obj);
			} else {
				obj = toBounds(obj);
			}
	
			if (obj instanceof Bounds) {
				min = obj.min;
				max = obj.max;
			} else {
				min = max = obj;
			}
	
			return (min.x >= this.min.x) &&
			       (max.x <= this.max.x) &&
			       (min.y >= this.min.y) &&
			       (max.y <= this.max.y);
		},
	
		// @method intersects(otherBounds: Bounds): Boolean
		// Returns `true` if the rectangle intersects the given bounds. Two bounds
		// intersect if they have at least one point in common.
		intersects: function (bounds) { // (Bounds) -> Boolean
			bounds = toBounds(bounds);
	
			var min = this.min,
			    max = this.max,
			    min2 = bounds.min,
			    max2 = bounds.max,
			    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
			    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);
	
			return xIntersects && yIntersects;
		},
	
		// @method overlaps(otherBounds: Bounds): Boolean
		// Returns `true` if the rectangle overlaps the given bounds. Two bounds
		// overlap if their intersection is an area.
		overlaps: function (bounds) { // (Bounds) -> Boolean
			bounds = toBounds(bounds);
	
			var min = this.min,
			    max = this.max,
			    min2 = bounds.min,
			    max2 = bounds.max,
			    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
			    yOverlaps = (max2.y > min.y) && (min2.y < max.y);
	
			return xOverlaps && yOverlaps;
		},
	
		isValid: function () {
			return !!(this.min && this.max);
		}
	};
	
	
	// @factory L.bounds(corner1: Point, corner2: Point)
	// Creates a Bounds object from two corners coordinate pairs.
	// @alternative
	// @factory L.bounds(points: Point[])
	// Creates a Bounds object from the given array of points.
	function toBounds(a, b) {
		if (!a || a instanceof Bounds) {
			return a;
		}
		return new Bounds(a, b);
	}
	
	/*
	 * @class LatLngBounds
	 * @aka L.LatLngBounds
	 *
	 * Represents a rectangular geographical area on a map.
	 *
	 * @example
	 *
	 * ```js
	 * var corner1 = L.latLng(40.712, -74.227),
	 * corner2 = L.latLng(40.774, -74.125),
	 * bounds = L.latLngBounds(corner1, corner2);
	 * ```
	 *
	 * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
	 *
	 * ```js
	 * map.fitBounds([
	 * 	[40.712, -74.227],
	 * 	[40.774, -74.125]
	 * ]);
	 * ```
	 *
	 * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
	 *
	 * Note that `LatLngBounds` does not inherit from Leafet's `Class` object,
	 * which means new classes can't inherit from it, and new methods
	 * can't be added to it with the `include` function.
	 */
	
	function LatLngBounds(corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
		if (!corner1) { return; }
	
		var latlngs = corner2 ? [corner1, corner2] : corner1;
	
		for (var i = 0, len = latlngs.length; i < len; i++) {
			this.extend(latlngs[i]);
		}
	}
	
	LatLngBounds.prototype = {
	
		// @method extend(latlng: LatLng): this
		// Extend the bounds to contain the given point
	
		// @alternative
		// @method extend(otherBounds: LatLngBounds): this
		// Extend the bounds to contain the given bounds
		extend: function (obj) {
			var sw = this._southWest,
			    ne = this._northEast,
			    sw2, ne2;
	
			if (obj instanceof LatLng) {
				sw2 = obj;
				ne2 = obj;
	
			} else if (obj instanceof LatLngBounds) {
				sw2 = obj._southWest;
				ne2 = obj._northEast;
	
				if (!sw2 || !ne2) { return this; }
	
			} else {
				return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
			}
	
			if (!sw && !ne) {
				this._southWest = new LatLng(sw2.lat, sw2.lng);
				this._northEast = new LatLng(ne2.lat, ne2.lng);
			} else {
				sw.lat = Math.min(sw2.lat, sw.lat);
				sw.lng = Math.min(sw2.lng, sw.lng);
				ne.lat = Math.max(ne2.lat, ne.lat);
				ne.lng = Math.max(ne2.lng, ne.lng);
			}
	
			return this;
		},
	
		// @method pad(bufferRatio: Number): LatLngBounds
		// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
		// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
		// Negative values will retract the bounds.
		pad: function (bufferRatio) {
			var sw = this._southWest,
			    ne = this._northEast,
			    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
			    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
	
			return new LatLngBounds(
			        new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
			        new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
		},
	
		// @method getCenter(): LatLng
		// Returns the center point of the bounds.
		getCenter: function () {
			return new LatLng(
			        (this._southWest.lat + this._northEast.lat) / 2,
			        (this._southWest.lng + this._northEast.lng) / 2);
		},
	
		// @method getSouthWest(): LatLng
		// Returns the south-west point of the bounds.
		getSouthWest: function () {
			return this._southWest;
		},
	
		// @method getNorthEast(): LatLng
		// Returns the north-east point of the bounds.
		getNorthEast: function () {
			return this._northEast;
		},
	
		// @method getNorthWest(): LatLng
		// Returns the north-west point of the bounds.
		getNorthWest: function () {
			return new LatLng(this.getNorth(), this.getWest());
		},
	
		// @method getSouthEast(): LatLng
		// Returns the south-east point of the bounds.
		getSouthEast: function () {
			return new LatLng(this.getSouth(), this.getEast());
		},
	
		// @method getWest(): Number
		// Returns the west longitude of the bounds
		getWest: function () {
			return this._southWest.lng;
		},
	
		// @method getSouth(): Number
		// Returns the south latitude of the bounds
		getSouth: function () {
			return this._southWest.lat;
		},
	
		// @method getEast(): Number
		// Returns the east longitude of the bounds
		getEast: function () {
			return this._northEast.lng;
		},
	
		// @method getNorth(): Number
		// Returns the north latitude of the bounds
		getNorth: function () {
			return this._northEast.lat;
		},
	
		// @method contains(otherBounds: LatLngBounds): Boolean
		// Returns `true` if the rectangle contains the given one.
	
		// @alternative
		// @method contains (latlng: LatLng): Boolean
		// Returns `true` if the rectangle contains the given point.
		contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
			if (typeof obj[0] === 'number' || obj instanceof LatLng || 'lat' in obj) {
				obj = toLatLng(obj);
			} else {
				obj = toLatLngBounds(obj);
			}
	
			var sw = this._southWest,
			    ne = this._northEast,
			    sw2, ne2;
	
			if (obj instanceof LatLngBounds) {
				sw2 = obj.getSouthWest();
				ne2 = obj.getNorthEast();
			} else {
				sw2 = ne2 = obj;
			}
	
			return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
			       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
		},
	
		// @method intersects(otherBounds: LatLngBounds): Boolean
		// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
		intersects: function (bounds) {
			bounds = toLatLngBounds(bounds);
	
			var sw = this._southWest,
			    ne = this._northEast,
			    sw2 = bounds.getSouthWest(),
			    ne2 = bounds.getNorthEast(),
	
			    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
			    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);
	
			return latIntersects && lngIntersects;
		},
	
		// @method overlaps(otherBounds: Bounds): Boolean
		// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
		overlaps: function (bounds) {
			bounds = toLatLngBounds(bounds);
	
			var sw = this._southWest,
			    ne = this._northEast,
			    sw2 = bounds.getSouthWest(),
			    ne2 = bounds.getNorthEast(),
	
			    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
			    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);
	
			return latOverlaps && lngOverlaps;
		},
	
		// @method toBBoxString(): String
		// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
		toBBoxString: function () {
			return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
		},
	
		// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
		// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
		equals: function (bounds, maxMargin) {
			if (!bounds) { return false; }
	
			bounds = toLatLngBounds(bounds);
	
			return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
			       this._northEast.equals(bounds.getNorthEast(), maxMargin);
		},
	
		// @method isValid(): Boolean
		// Returns `true` if the bounds are properly initialized.
		isValid: function () {
			return !!(this._southWest && this._northEast);
		}
	};
	
	// TODO International date line?
	
	// @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
	// Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.
	
	// @alternative
	// @factory L.latLngBounds(latlngs: LatLng[])
	// Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
	function toLatLngBounds(a, b) {
		if (a instanceof LatLngBounds) {
			return a;
		}
		return new LatLngBounds(a, b);
	}
	
	/* @class LatLng
	 * @aka L.LatLng
	 *
	 * Represents a geographical point with a certain latitude and longitude.
	 *
	 * @example
	 *
	 * ```
	 * var latlng = L.latLng(50.5, 30.5);
	 * ```
	 *
	 * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
	 *
	 * ```
	 * map.panTo([50, 30]);
	 * map.panTo({lon: 30, lat: 50});
	 * map.panTo({lat: 50, lng: 30});
	 * map.panTo(L.latLng(50, 30));
	 * ```
	 *
	 * Note that `LatLng` does not inherit from Leafet's `Class` object,
	 * which means new classes can't inherit from it, and new methods
	 * can't be added to it with the `include` function.
	 */
	
	function LatLng(lat, lng, alt) {
		if (isNaN(lat) || isNaN(lng)) {
			throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
		}
	
		// @property lat: Number
		// Latitude in degrees
		this.lat = +lat;
	
		// @property lng: Number
		// Longitude in degrees
		this.lng = +lng;
	
		// @property alt: Number
		// Altitude in meters (optional)
		if (alt !== undefined) {
			this.alt = +alt;
		}
	}
	
	LatLng.prototype = {
		// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
		// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
		equals: function (obj, maxMargin) {
			if (!obj) { return false; }
	
			obj = toLatLng(obj);
	
			var margin = Math.max(
			        Math.abs(this.lat - obj.lat),
			        Math.abs(this.lng - obj.lng));
	
			return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
		},
	
		// @method toString(): String
		// Returns a string representation of the point (for debugging purposes).
		toString: function (precision) {
			return 'LatLng(' +
			        formatNum(this.lat, precision) + ', ' +
			        formatNum(this.lng, precision) + ')';
		},
	
		// @method distanceTo(otherLatLng: LatLng): Number
		// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
		distanceTo: function (other) {
			return Earth.distance(this, toLatLng(other));
		},
	
		// @method wrap(): LatLng
		// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
		wrap: function () {
			return Earth.wrapLatLng(this);
		},
	
		// @method toBounds(sizeInMeters: Number): LatLngBounds
		// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
		toBounds: function (sizeInMeters) {
			var latAccuracy = 180 * sizeInMeters / 40075017,
			    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);
	
			return toLatLngBounds(
			        [this.lat - latAccuracy, this.lng - lngAccuracy],
			        [this.lat + latAccuracy, this.lng + lngAccuracy]);
		},
	
		clone: function () {
			return new LatLng(this.lat, this.lng, this.alt);
		}
	};
	
	
	
	// @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
	// Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).
	
	// @alternative
	// @factory L.latLng(coords: Array): LatLng
	// Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.
	
	// @alternative
	// @factory L.latLng(coords: Object): LatLng
	// Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.
	
	function toLatLng(a, b, c) {
		if (a instanceof LatLng) {
			return a;
		}
		if (isArray(a) && typeof a[0] !== 'object') {
			if (a.length === 3) {
				return new LatLng(a[0], a[1], a[2]);
			}
			if (a.length === 2) {
				return new LatLng(a[0], a[1]);
			}
			return null;
		}
		if (a === undefined || a === null) {
			return a;
		}
		if (typeof a === 'object' && 'lat' in a) {
			return new LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
		}
		if (b === undefined) {
			return null;
		}
		return new LatLng(a, b, c);
	}
	
	/*
	 * @namespace CRS
	 * @crs L.CRS.Base
	 * Object that defines coordinate reference systems for projecting
	 * geographical points into pixel (screen) coordinates and back (and to
	 * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
	 * [spatial reference system](http://en.wikipedia.org/wiki/Coordinate_reference_system).
	 *
	 * Leaflet defines the most usual CRSs by default. If you want to use a
	 * CRS not defined by default, take a look at the
	 * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
	 *
	 * Note that the CRS instances do not inherit from Leafet's `Class` object,
	 * and can't be instantiated. Also, new classes can't inherit from them,
	 * and methods can't be added to them with the `include` function.
	 */
	
	var CRS = {
		// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
		// Projects geographical coordinates into pixel coordinates for a given zoom.
		latLngToPoint: function (latlng, zoom) {
			var projectedPoint = this.projection.project(latlng),
			    scale = this.scale(zoom);
	
			return this.transformation._transform(projectedPoint, scale);
		},
	
		// @method pointToLatLng(point: Point, zoom: Number): LatLng
		// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
		// zoom into geographical coordinates.
		pointToLatLng: function (point, zoom) {
			var scale = this.scale(zoom),
			    untransformedPoint = this.transformation.untransform(point, scale);
	
			return this.projection.unproject(untransformedPoint);
		},
	
		// @method project(latlng: LatLng): Point
		// Projects geographical coordinates into coordinates in units accepted for
		// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
		project: function (latlng) {
			return this.projection.project(latlng);
		},
	
		// @method unproject(point: Point): LatLng
		// Given a projected coordinate returns the corresponding LatLng.
		// The inverse of `project`.
		unproject: function (point) {
			return this.projection.unproject(point);
		},
	
		// @method scale(zoom: Number): Number
		// Returns the scale used when transforming projected coordinates into
		// pixel coordinates for a particular zoom. For example, it returns
		// `256 * 2^zoom` for Mercator-based CRS.
		scale: function (zoom) {
			return 256 * Math.pow(2, zoom);
		},
	
		// @method zoom(scale: Number): Number
		// Inverse of `scale()`, returns the zoom level corresponding to a scale
		// factor of `scale`.
		zoom: function (scale) {
			return Math.log(scale / 256) / Math.LN2;
		},
	
		// @method getProjectedBounds(zoom: Number): Bounds
		// Returns the projection's bounds scaled and transformed for the provided `zoom`.
		getProjectedBounds: function (zoom) {
			if (this.infinite) { return null; }
	
			var b = this.projection.bounds,
			    s = this.scale(zoom),
			    min = this.transformation.transform(b.min, s),
			    max = this.transformation.transform(b.max, s);
	
			return new Bounds(min, max);
		},
	
		// @method distance(latlng1: LatLng, latlng2: LatLng): Number
		// Returns the distance between two geographical coordinates.
	
		// @property code: String
		// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
		//
		// @property wrapLng: Number[]
		// An array of two numbers defining whether the longitude (horizontal) coordinate
		// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
		// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
		//
		// @property wrapLat: Number[]
		// Like `wrapLng`, but for the latitude (vertical) axis.
	
		// wrapLng: [min, max],
		// wrapLat: [min, max],
	
		// @property infinite: Boolean
		// If true, the coordinate space will be unbounded (infinite in both axes)
		infinite: false,
	
		// @method wrapLatLng(latlng: LatLng): LatLng
		// Returns a `LatLng` where lat and lng has been wrapped according to the
		// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
		wrapLatLng: function (latlng) {
			var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
			    lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
			    alt = latlng.alt;
	
			return new LatLng(lat, lng, alt);
		},
	
		// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
		// Returns a `LatLngBounds` with the same size as the given one, ensuring
		// that its center is within the CRS's bounds.
		// Only accepts actual `L.LatLngBounds` instances, not arrays.
		wrapLatLngBounds: function (bounds) {
			var center = bounds.getCenter(),
			    newCenter = this.wrapLatLng(center),
			    latShift = center.lat - newCenter.lat,
			    lngShift = center.lng - newCenter.lng;
	
			if (latShift === 0 && lngShift === 0) {
				return bounds;
			}
	
			var sw = bounds.getSouthWest(),
			    ne = bounds.getNorthEast(),
			    newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift),
			    newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);
	
			return new LatLngBounds(newSw, newNe);
		}
	};
	
	/*
	 * @namespace CRS
	 * @crs L.CRS.Earth
	 *
	 * Serves as the base for CRS that are global such that they cover the earth.
	 * Can only be used as the base for other CRS and cannot be used directly,
	 * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
	 * meters.
	 */
	
	var Earth = extend({}, CRS, {
		wrapLng: [-180, 180],
	
		// Mean Earth Radius, as recommended for use by
		// the International Union of Geodesy and Geophysics,
		// see http://rosettacode.org/wiki/Haversine_formula
		R: 6371000,
	
		// distance between two geographical points using spherical law of cosines approximation
		distance: function (latlng1, latlng2) {
			var rad = Math.PI / 180,
			    lat1 = latlng1.lat * rad,
			    lat2 = latlng2.lat * rad,
			    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
			    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
			    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
			    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			return this.R * c;
		}
	});
	
	/*
	 * @namespace Projection
	 * @projection L.Projection.SphericalMercator
	 *
	 * Spherical Mercator projection — the most common projection for online maps,
	 * used by almost all free and commercial tile providers. Assumes that Earth is
	 * a sphere. Used by the `EPSG:3857` CRS.
	 */
	
	var SphericalMercator = {
	
		R: 6378137,
		MAX_LATITUDE: 85.0511287798,
	
		project: function (latlng) {
			var d = Math.PI / 180,
			    max = this.MAX_LATITUDE,
			    lat = Math.max(Math.min(max, latlng.lat), -max),
			    sin = Math.sin(lat * d);
	
			return new Point(
				this.R * latlng.lng * d,
				this.R * Math.log((1 + sin) / (1 - sin)) / 2);
		},
	
		unproject: function (point) {
			var d = 180 / Math.PI;
	
			return new LatLng(
				(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
				point.x * d / this.R);
		},
	
		bounds: (function () {
			var d = 6378137 * Math.PI;
			return new Bounds([-d, -d], [d, d]);
		})()
	};
	
	/*
	 * @class Transformation
	 * @aka L.Transformation
	 *
	 * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
	 * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
	 * the reverse. Used by Leaflet in its projections code.
	 *
	 * @example
	 *
	 * ```js
	 * var transformation = L.transformation(2, 5, -1, 10),
	 * 	p = L.point(1, 2),
	 * 	p2 = transformation.transform(p), //  L.point(7, 8)
	 * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
	 * ```
	 */
	
	
	// factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
	// Creates a `Transformation` object with the given coefficients.
	function Transformation(a, b, c, d) {
		if (isArray(a)) {
			// use array properties
			this._a = a[0];
			this._b = a[1];
			this._c = a[2];
			this._d = a[3];
			return;
		}
		this._a = a;
		this._b = b;
		this._c = c;
		this._d = d;
	}
	
	Transformation.prototype = {
		// @method transform(point: Point, scale?: Number): Point
		// Returns a transformed point, optionally multiplied by the given scale.
		// Only accepts actual `L.Point` instances, not arrays.
		transform: function (point, scale) { // (Point, Number) -> Point
			return this._transform(point.clone(), scale);
		},
	
		// destructive transform (faster)
		_transform: function (point, scale) {
			scale = scale || 1;
			point.x = scale * (this._a * point.x + this._b);
			point.y = scale * (this._c * point.y + this._d);
			return point;
		},
	
		// @method untransform(point: Point, scale?: Number): Point
		// Returns the reverse transformation of the given point, optionally divided
		// by the given scale. Only accepts actual `L.Point` instances, not arrays.
		untransform: function (point, scale) {
			scale = scale || 1;
			return new Point(
			        (point.x / scale - this._b) / this._a,
			        (point.y / scale - this._d) / this._c);
		}
	};
	
	// factory L.transformation(a: Number, b: Number, c: Number, d: Number)
	
	// @factory L.transformation(a: Number, b: Number, c: Number, d: Number)
	// Instantiates a Transformation object with the given coefficients.
	
	// @alternative
	// @factory L.transformation(coefficients: Array): Transformation
	// Expects an coefficients array of the form
	// `[a: Number, b: Number, c: Number, d: Number]`.
	
	function toTransformation(a, b, c, d) {
		return new Transformation(a, b, c, d);
	}
	
	/*
	 * @namespace CRS
	 * @crs L.CRS.EPSG3857
	 *
	 * The most common CRS for online maps, used by almost all free and commercial
	 * tile providers. Uses Spherical Mercator projection. Set in by default in
	 * Map's `crs` option.
	 */
	
	var EPSG3857 = extend({}, Earth, {
		code: 'EPSG:3857',
		projection: SphericalMercator,
	
		transformation: (function () {
			var scale = 0.5 / (Math.PI * SphericalMercator.R);
			return toTransformation(scale, 0.5, -scale, 0.5);
		}())
	});
	
	var EPSG900913 = extend({}, EPSG3857, {
		code: 'EPSG:900913'
	});
	
	// @namespace SVG; @section
	// There are several static functions which can be called without instantiating L.SVG:
	
	// @function create(name: String): SVGElement
	// Returns a instance of [SVGElement](https://developer.mozilla.org/docs/Web/API/SVGElement),
	// corresponding to the class name passed. For example, using 'line' will return
	// an instance of [SVGLineElement](https://developer.mozilla.org/docs/Web/API/SVGLineElement).
	function svgCreate(name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	}
	
	// @function pointsToPath(rings: Point[], closed: Boolean): String
	// Generates a SVG path string for multiple rings, with each ring turning
	// into "M..L..L.." instructions
	function pointsToPath(rings, closed) {
		var str = '',
		i, j, len, len2, points, p;
	
		for (i = 0, len = rings.length; i < len; i++) {
			points = rings[i];
	
			for (j = 0, len2 = points.length; j < len2; j++) {
				p = points[j];
				str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
			}
	
			// closes the ring for polygons; "x" is VML syntax
			str += closed ? (svg ? 'z' : 'x') : '';
		}
	
		// SVG complains about empty path strings
		return str || 'M0 0';
	}
	
	/*
	 * @namespace Browser
	 * @aka L.Browser
	 *
	 * A namespace with static properties for browser/feature detection used by Leaflet internally.
	 *
	 * @example
	 *
	 * ```js
	 * if (L.Browser.ielt9) {
	 *   alert('Upgrade your browser, dude!');
	 * }
	 * ```
	 */
	
	var style$1 = document.documentElement.style;
	
	// @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
	var ie = 'ActiveXObject' in window;
	
	// @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
	var ielt9 = ie && !document.addEventListener;
	
	// @property edge: Boolean; `true` for the Edge web browser.
	var edge = 'msLaunchUri' in navigator && !('documentMode' in document);
	
	// @property webkit: Boolean;
	// `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
	var webkit = userAgentContains('webkit');
	
	// @property android: Boolean
	// `true` for any browser running on an Android platform.
	var android = userAgentContains('android');
	
	// @property android23: Boolean; `true` for browsers running on Android 2 or Android 3.
	var android23 = userAgentContains('android 2') || userAgentContains('android 3');
	
	/* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
	var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10); // also matches AppleWebKit
	// @property androidStock: Boolean; `true` for the Android stock browser (i.e. not Chrome)
	var androidStock = android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window);
	
	// @property opera: Boolean; `true` for the Opera browser
	var opera = !!window.opera;
	
	// @property chrome: Boolean; `true` for the Chrome browser.
	var chrome = userAgentContains('chrome');
	
	// @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
	var gecko = userAgentContains('gecko') && !webkit && !opera && !ie;
	
	// @property safari: Boolean; `true` for the Safari browser.
	var safari = !chrome && userAgentContains('safari');
	
	var phantom = userAgentContains('phantom');
	
	// @property opera12: Boolean
	// `true` for the Opera browser supporting CSS transforms (version 12 or later).
	var opera12 = 'OTransition' in style$1;
	
	// @property win: Boolean; `true` when the browser is running in a Windows platform
	var win = navigator.platform.indexOf('Win') === 0;
	
	// @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
	var ie3d = ie && ('transition' in style$1);
	
	// @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
	var webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23;
	
	// @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
	var gecko3d = 'MozPerspective' in style$1;
	
	// @property any3d: Boolean
	// `true` for all browsers supporting CSS transforms.
	var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
	
	// @property mobile: Boolean; `true` for all browsers running in a mobile device.
	var mobile = typeof orientation !== 'undefined' || userAgentContains('mobile');
	
	// @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
	var mobileWebkit = mobile && webkit;
	
	// @property mobileWebkit3d: Boolean
	// `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
	var mobileWebkit3d = mobile && webkit3d;
	
	// @property msPointer: Boolean
	// `true` for browsers implementing the Microsoft touch events model (notably IE10).
	var msPointer = !window.PointerEvent && window.MSPointerEvent;
	
	// @property pointer: Boolean
	// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
	var pointer = !!(window.PointerEvent || msPointer);
	
	// @property touch: Boolean
	// `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
	// This does not necessarily mean that the browser is running in a computer with
	// a touchscreen, it only means that the browser is capable of understanding
	// touch events.
	var touch = !window.L_NO_TOUCH && (pointer || 'ontouchstart' in window ||
			(window.DocumentTouch && document instanceof window.DocumentTouch));
	
	// @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
	var mobileOpera = mobile && opera;
	
	// @property mobileGecko: Boolean
	// `true` for gecko-based browsers running in a mobile device.
	var mobileGecko = mobile && gecko;
	
	// @property retina: Boolean
	// `true` for browsers on a high-resolution "retina" screen.
	var retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;
	
	
	// @property canvas: Boolean
	// `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
	var canvas = (function () {
		return !!document.createElement('canvas').getContext;
	}());
	
	// @property svg: Boolean
	// `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
	var svg = !!(document.createElementNS && svgCreate('svg').createSVGRect);
	
	// @property vml: Boolean
	// `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
	var vml = !svg && (function () {
		try {
			var div = document.createElement('div');
			div.innerHTML = '<v:shape adj="1"/>';
	
			var shape = div.firstChild;
			shape.style.behavior = 'url(#default#VML)';
	
			return shape && (typeof shape.adj === 'object');
	
		} catch (e) {
			return false;
		}
	}());
	
	
	function userAgentContains(str) {
		return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
	}
	
	
	var Browser = (Object.freeze || Object)({
		ie: ie,
		ielt9: ielt9,
		edge: edge,
		webkit: webkit,
		android: android,
		android23: android23,
		androidStock: androidStock,
		opera: opera,
		chrome: chrome,
		gecko: gecko,
		safari: safari,
		phantom: phantom,
		opera12: opera12,
		win: win,
		ie3d: ie3d,
		webkit3d: webkit3d,
		gecko3d: gecko3d,
		any3d: any3d,
		mobile: mobile,
		mobileWebkit: mobileWebkit,
		mobileWebkit3d: mobileWebkit3d,
		msPointer: msPointer,
		pointer: pointer,
		touch: touch,
		mobileOpera: mobileOpera,
		mobileGecko: mobileGecko,
		retina: retina,
		canvas: canvas,
		svg: svg,
		vml: vml
	});
	
	/*
	 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
	 */
	
	
	var POINTER_DOWN =   msPointer ? 'MSPointerDown'   : 'pointerdown';
	var POINTER_MOVE =   msPointer ? 'MSPointerMove'   : 'pointermove';
	var POINTER_UP =     msPointer ? 'MSPointerUp'     : 'pointerup';
	var POINTER_CANCEL = msPointer ? 'MSPointerCancel' : 'pointercancel';
	var TAG_WHITE_LIST = ['INPUT', 'SELECT', 'OPTION'];
	
	var _pointers = {};
	var _pointerDocListener = false;
	
	// DomEvent.DoubleTap needs to know about this
	var _pointersCount = 0;
	
	// Provides a touch events wrapper for (ms)pointer events.
	// ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890
	
	function addPointerListener(obj, type, handler, id) {
		if (type === 'touchstart') {
			_addPointerStart(obj, handler, id);
	
		} else if (type === 'touchmove') {
			_addPointerMove(obj, handler, id);
	
		} else if (type === 'touchend') {
			_addPointerEnd(obj, handler, id);
		}
	
		return this;
	}
	
	function removePointerListener(obj, type, id) {
		var handler = obj['_leaflet_' + type + id];
	
		if (type === 'touchstart') {
			obj.removeEventListener(POINTER_DOWN, handler, false);
	
		} else if (type === 'touchmove') {
			obj.removeEventListener(POINTER_MOVE, handler, false);
	
		} else if (type === 'touchend') {
			obj.removeEventListener(POINTER_UP, handler, false);
			obj.removeEventListener(POINTER_CANCEL, handler, false);
		}
	
		return this;
	}
	
	function _addPointerStart(obj, handler, id) {
		var onDown = bind(function (e) {
			if (e.pointerType !== 'mouse' && e.MSPOINTER_TYPE_MOUSE && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
				// In IE11, some touch events needs to fire for form controls, or
				// the controls will stop working. We keep a whitelist of tag names that
				// need these events. For other target tags, we prevent default on the event.
				if (TAG_WHITE_LIST.indexOf(e.target.tagName) < 0) {
					preventDefault(e);
				} else {
					return;
				}
			}
	
			_handlePointer(e, handler);
		});
	
		obj['_leaflet_touchstart' + id] = onDown;
		obj.addEventListener(POINTER_DOWN, onDown, false);
	
		// need to keep track of what pointers and how many are active to provide e.touches emulation
		if (!_pointerDocListener) {
			// we listen documentElement as any drags that end by moving the touch off the screen get fired there
			document.documentElement.addEventListener(POINTER_DOWN, _globalPointerDown, true);
			document.documentElement.addEventListener(POINTER_MOVE, _globalPointerMove, true);
			document.documentElement.addEventListener(POINTER_UP, _globalPointerUp, true);
			document.documentElement.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
	
			_pointerDocListener = true;
		}
	}
	
	function _globalPointerDown(e) {
		_pointers[e.pointerId] = e;
		_pointersCount++;
	}
	
	function _globalPointerMove(e) {
		if (_pointers[e.pointerId]) {
			_pointers[e.pointerId] = e;
		}
	}
	
	function _globalPointerUp(e) {
		delete _pointers[e.pointerId];
		_pointersCount--;
	}
	
	function _handlePointer(e, handler) {
		e.touches = [];
		for (var i in _pointers) {
			e.touches.push(_pointers[i]);
		}
		e.changedTouches = [e];
	
		handler(e);
	}
	
	function _addPointerMove(obj, handler, id) {
		var onMove = function (e) {
			// don't fire touch moves when mouse isn't down
			if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }
	
			_handlePointer(e, handler);
		};
	
		obj['_leaflet_touchmove' + id] = onMove;
		obj.addEventListener(POINTER_MOVE, onMove, false);
	}
	
	function _addPointerEnd(obj, handler, id) {
		var onUp = function (e) {
			_handlePointer(e, handler);
		};
	
		obj['_leaflet_touchend' + id] = onUp;
		obj.addEventListener(POINTER_UP, onUp, false);
		obj.addEventListener(POINTER_CANCEL, onUp, false);
	}
	
	/*
	 * Extends the event handling code with double tap support for mobile browsers.
	 */
	
	var _touchstart = msPointer ? 'MSPointerDown' : pointer ? 'pointerdown' : 'touchstart';
	var _touchend = msPointer ? 'MSPointerUp' : pointer ? 'pointerup' : 'touchend';
	var _pre = '_leaflet_';
	
	// inspired by Zepto touch code by Thomas Fuchs
	function addDoubleTapListener(obj, handler, id) {
		var last, touch$$1,
		    doubleTap = false,
		    delay = 250;
	
		function onTouchStart(e) {
			var count;
	
			if (pointer) {
				if ((!edge) || e.pointerType === 'mouse') { return; }
				count = _pointersCount;
			} else {
				count = e.touches.length;
			}
	
			if (count > 1) { return; }
	
			var now = Date.now(),
			    delta = now - (last || now);
	
			touch$$1 = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}
	
		function onTouchEnd(e) {
			if (doubleTap && !touch$$1.cancelBubble) {
				if (pointer) {
					if ((!edge) || e.pointerType === 'mouse') { return; }
					// work around .type being readonly with MSPointer* events
					var newTouch = {},
					    prop, i;
	
					for (i in touch$$1) {
						prop = touch$$1[i];
						newTouch[i] = prop && prop.bind ? prop.bind(touch$$1) : prop;
					}
					touch$$1 = newTouch;
				}
				touch$$1.type = 'dblclick';
				handler(touch$$1);
				last = null;
			}
		}
	
		obj[_pre + _touchstart + id] = onTouchStart;
		obj[_pre + _touchend + id] = onTouchEnd;
		obj[_pre + 'dblclick' + id] = handler;
	
		obj.addEventListener(_touchstart, onTouchStart, false);
		obj.addEventListener(_touchend, onTouchEnd, false);
	
		// On some platforms (notably, chrome<55 on win10 + touchscreen + mouse),
		// the browser doesn't fire touchend/pointerup events but does fire
		// native dblclicks. See #4127.
		// Edge 14 also fires native dblclicks, but only for pointerType mouse, see #5180.
		obj.addEventListener('dblclick', handler, false);
	
		return this;
	}
	
	function removeDoubleTapListener(obj, id) {
		var touchstart = obj[_pre + _touchstart + id],
		    touchend = obj[_pre + _touchend + id],
		    dblclick = obj[_pre + 'dblclick' + id];
	
		obj.removeEventListener(_touchstart, touchstart, false);
		obj.removeEventListener(_touchend, touchend, false);
		if (!edge) {
			obj.removeEventListener('dblclick', dblclick, false);
		}
	
		return this;
	}
	
	/*
	 * @namespace DomEvent
	 * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
	 */
	
	// Inspired by John Resig, Dean Edwards and YUI addEvent implementations.
	
	// @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
	// Adds a listener function (`fn`) to a particular DOM event type of the
	// element `el`. You can optionally specify the context of the listener
	// (object the `this` keyword will point to). You can also pass several
	// space-separated types (e.g. `'click dblclick'`).
	
	// @alternative
	// @function on(el: HTMLElement, eventMap: Object, context?: Object): this
	// Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	function on(obj, types, fn, context) {
	
		if (typeof types === 'object') {
			for (var type in types) {
				addOne(obj, type, types[type], fn);
			}
		} else {
			types = splitWords(types);
	
			for (var i = 0, len = types.length; i < len; i++) {
				addOne(obj, types[i], fn, context);
			}
		}
	
		return this;
	}
	
	var eventsKey = '_leaflet_events';
	
	// @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
	// Removes a previously added listener function.
	// Note that if you passed a custom context to on, you must pass the same
	// context to `off` in order to remove the listener.
	
	// @alternative
	// @function off(el: HTMLElement, eventMap: Object, context?: Object): this
	// Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	function off(obj, types, fn, context) {
	
		if (typeof types === 'object') {
			for (var type in types) {
				removeOne(obj, type, types[type], fn);
			}
		} else if (types) {
			types = splitWords(types);
	
			for (var i = 0, len = types.length; i < len; i++) {
				removeOne(obj, types[i], fn, context);
			}
		} else {
			for (var j in obj[eventsKey]) {
				removeOne(obj, j, obj[eventsKey][j]);
			}
			delete obj[eventsKey];
		}
	
		return this;
	}
	
	function addOne(obj, type, fn, context) {
		var id = type + stamp(fn) + (context ? '_' + stamp(context) : '');
	
		if (obj[eventsKey] && obj[eventsKey][id]) { return this; }
	
		var handler = function (e) {
			return fn.call(context || obj, e || window.event);
		};
	
		var originalHandler = handler;
	
		if (pointer && type.indexOf('touch') === 0) {
			// Needs DomEvent.Pointer.js
			addPointerListener(obj, type, handler, id);
	
		} else if (touch && (type === 'dblclick') && addDoubleTapListener &&
		           !(pointer && chrome)) {
			// Chrome >55 does not need the synthetic dblclicks from addDoubleTapListener
			// See #5180
			addDoubleTapListener(obj, handler, id);
	
		} else if ('addEventListener' in obj) {
	
			if (type === 'mousewheel') {
				obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, false);
	
			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				handler = function (e) {
					e = e || window.event;
					if (isExternalTarget(obj, e)) {
						originalHandler(e);
					}
				};
				obj.addEventListener(type === 'mouseenter' ? 'mouseover' : 'mouseout', handler, false);
	
			} else {
				if (type === 'click' && android) {
					handler = function (e) {
						filterClick(e, originalHandler);
					};
				}
				obj.addEventListener(type, handler, false);
			}
	
		} else if ('attachEvent' in obj) {
			obj.attachEvent('on' + type, handler);
		}
	
		obj[eventsKey] = obj[eventsKey] || {};
		obj[eventsKey][id] = handler;
	}
	
	function removeOne(obj, type, fn, context) {
	
		var id = type + stamp(fn) + (context ? '_' + stamp(context) : ''),
		    handler = obj[eventsKey] && obj[eventsKey][id];
	
		if (!handler) { return this; }
	
		if (pointer && type.indexOf('touch') === 0) {
			removePointerListener(obj, type, id);
	
		} else if (touch && (type === 'dblclick') && removeDoubleTapListener &&
		           !(pointer && chrome)) {
			removeDoubleTapListener(obj, id);
	
		} else if ('removeEventListener' in obj) {
	
			if (type === 'mousewheel') {
				obj.removeEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, false);
	
			} else {
				obj.removeEventListener(
					type === 'mouseenter' ? 'mouseover' :
					type === 'mouseleave' ? 'mouseout' : type, handler, false);
			}
	
		} else if ('detachEvent' in obj) {
			obj.detachEvent('on' + type, handler);
		}
	
		obj[eventsKey][id] = null;
	}
	
	// @function stopPropagation(ev: DOMEvent): this
	// Stop the given event from propagation to parent elements. Used inside the listener functions:
	// ```js
	// L.DomEvent.on(div, 'click', function (ev) {
	// 	L.DomEvent.stopPropagation(ev);
	// });
	// ```
	function stopPropagation(e) {
	
		if (e.stopPropagation) {
			e.stopPropagation();
		} else if (e.originalEvent) {  // In case of Leaflet event.
			e.originalEvent._stopped = true;
		} else {
			e.cancelBubble = true;
		}
		skipped(e);
	
		return this;
	}
	
	// @function disableScrollPropagation(el: HTMLElement): this
	// Adds `stopPropagation` to the element's `'mousewheel'` events (plus browser variants).
	function disableScrollPropagation(el) {
		addOne(el, 'mousewheel', stopPropagation);
		return this;
	}
	
	// @function disableClickPropagation(el: HTMLElement): this
	// Adds `stopPropagation` to the element's `'click'`, `'doubleclick'`,
	// `'mousedown'` and `'touchstart'` events (plus browser variants).
	function disableClickPropagation(el) {
		on(el, 'mousedown touchstart dblclick', stopPropagation);
		addOne(el, 'click', fakeStop);
		return this;
	}
	
	// @function preventDefault(ev: DOMEvent): this
	// Prevents the default action of the DOM Event `ev` from happening (such as
	// following a link in the href of the a element, or doing a POST request
	// with page reload when a `<form>` is submitted).
	// Use it inside listener functions.
	function preventDefault(e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		return this;
	}
	
	// @function stop(ev: DOMEvent): this
	// Does `stopPropagation` and `preventDefault` at the same time.
	function stop(e) {
		preventDefault(e);
		stopPropagation(e);
		return this;
	}
	
	// @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
	// Gets normalized mouse position from a DOM event relative to the
	// `container` or to the whole page if not specified.
	function getMousePosition(e, container) {
		if (!container) {
			return new Point(e.clientX, e.clientY);
		}
	
		var rect = container.getBoundingClientRect();
	
		var scaleX = rect.width / container.offsetWidth || 1;
		var scaleY = rect.height / container.offsetHeight || 1;
		return new Point(
			e.clientX / scaleX - rect.left - container.clientLeft,
			e.clientY / scaleY - rect.top - container.clientTop);
	}
	
	// Chrome on Win scrolls double the pixels as in other platforms (see #4538),
	// and Firefox scrolls device pixels, not CSS pixels
	var wheelPxFactor =
		(win && chrome) ? 2 * window.devicePixelRatio :
		gecko ? window.devicePixelRatio : 1;
	
	// @function getWheelDelta(ev: DOMEvent): Number
	// Gets normalized wheel delta from a mousewheel DOM event, in vertical
	// pixels scrolled (negative if scrolling down).
	// Events from pointing devices without precise scrolling are mapped to
	// a best guess of 60 pixels.
	function getWheelDelta(e) {
		return (edge) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
		       (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor : // Pixels
		       (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
		       (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
		       (e.deltaX || e.deltaZ) ? 0 :	// Skip horizontal/depth wheel events
		       e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
		       (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
		       e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
		       0;
	}
	
	var skipEvents = {};
	
	function fakeStop(e) {
		// fakes stopPropagation by setting a special event flag, checked/reset with skipped(e)
		skipEvents[e.type] = true;
	}
	
	function skipped(e) {
		var events = skipEvents[e.type];
		// reset when checking, as it's only used in map container and propagates outside of the map
		skipEvents[e.type] = false;
		return events;
	}
	
	// check if element really left/entered the event target (for mouseenter/mouseleave)
	function isExternalTarget(el, e) {
	
		var related = e.relatedTarget;
	
		if (!related) { return true; }
	
		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}
		return (related !== el);
	}
	
	var lastClick;
	
	// this is a horrible workaround for a bug in Android where a single touch triggers two click events
	function filterClick(e, handler) {
		var timeStamp = (e.timeStamp || (e.originalEvent && e.originalEvent.timeStamp)),
		    elapsed = lastClick && (timeStamp - lastClick);
	
		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events
	
		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			stop(e);
			return;
		}
		lastClick = timeStamp;
	
		handler(e);
	}
	
	
	
	
	var DomEvent = (Object.freeze || Object)({
		on: on,
		off: off,
		stopPropagation: stopPropagation,
		disableScrollPropagation: disableScrollPropagation,
		disableClickPropagation: disableClickPropagation,
		preventDefault: preventDefault,
		stop: stop,
		getMousePosition: getMousePosition,
		getWheelDelta: getWheelDelta,
		fakeStop: fakeStop,
		skipped: skipped,
		isExternalTarget: isExternalTarget,
		addListener: on,
		removeListener: off
	});
	
	/*
	 * @namespace DomUtil
	 *
	 * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
	 * tree, used by Leaflet internally.
	 *
	 * Most functions expecting or returning a `HTMLElement` also work for
	 * SVG elements. The only difference is that classes refer to CSS classes
	 * in HTML and SVG classes in SVG.
	 */
	
	
	// @property TRANSFORM: String
	// Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
	var TRANSFORM = testProp(
		['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);
	
	// webkitTransition comes first because some browser versions that drop vendor prefix don't do
	// the same for the transitionend event, in particular the Android 4.1 stock browser
	
	// @property TRANSITION: String
	// Vendor-prefixed transition style name.
	var TRANSITION = testProp(
		['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);
	
	// @property TRANSITION_END: String
	// Vendor-prefixed transitionend event name.
	var TRANSITION_END =
		TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';
	
	
	// @function get(id: String|HTMLElement): HTMLElement
	// Returns an element given its DOM id, or returns the element itself
	// if it was passed directly.
	function get(id) {
		return typeof id === 'string' ? document.getElementById(id) : id;
	}
	
	// @function getStyle(el: HTMLElement, styleAttrib: String): String
	// Returns the value for a certain style attribute on an element,
	// including computed values or values set through CSS.
	function getStyle(el, style) {
		var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);
	
		if ((!value || value === 'auto') && document.defaultView) {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}
		return value === 'auto' ? null : value;
	}
	
	// @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
	// Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
	function create$1(tagName, className, container) {
		var el = document.createElement(tagName);
		el.className = className || '';
	
		if (container) {
			container.appendChild(el);
		}
		return el;
	}
	
	// @function remove(el: HTMLElement)
	// Removes `el` from its parent element
	function remove(el) {
		var parent = el.parentNode;
		if (parent) {
			parent.removeChild(el);
		}
	}
	
	// @function empty(el: HTMLElement)
	// Removes all of `el`'s children elements from `el`
	function empty(el) {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	}
	
	// @function toFront(el: HTMLElement)
	// Makes `el` the last child of its parent, so it renders in front of the other children.
	function toFront(el) {
		var parent = el.parentNode;
		if (parent.lastChild !== el) {
			parent.appendChild(el);
		}
	}
	
	// @function toBack(el: HTMLElement)
	// Makes `el` the first child of its parent, so it renders behind the other children.
	function toBack(el) {
		var parent = el.parentNode;
		if (parent.firstChild !== el) {
			parent.insertBefore(el, parent.firstChild);
		}
	}
	
	// @function hasClass(el: HTMLElement, name: String): Boolean
	// Returns `true` if the element's class attribute contains `name`.
	function hasClass(el, name) {
		if (el.classList !== undefined) {
			return el.classList.contains(name);
		}
		var className = getClass(el);
		return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	}
	
	// @function addClass(el: HTMLElement, name: String)
	// Adds `name` to the element's class attribute.
	function addClass(el, name) {
		if (el.classList !== undefined) {
			var classes = splitWords(name);
			for (var i = 0, len = classes.length; i < len; i++) {
				el.classList.add(classes[i]);
			}
		} else if (!hasClass(el, name)) {
			var className = getClass(el);
			setClass(el, (className ? className + ' ' : '') + name);
		}
	}
	
	// @function removeClass(el: HTMLElement, name: String)
	// Removes `name` from the element's class attribute.
	function removeClass(el, name) {
		if (el.classList !== undefined) {
			el.classList.remove(name);
		} else {
			setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
		}
	}
	
	// @function setClass(el: HTMLElement, name: String)
	// Sets the element's class.
	function setClass(el, name) {
		if (el.className.baseVal === undefined) {
			el.className = name;
		} else {
			// in case of SVG element
			el.className.baseVal = name;
		}
	}
	
	// @function getClass(el: HTMLElement): String
	// Returns the element's class.
	function getClass(el) {
		return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	}
	
	// @function setOpacity(el: HTMLElement, opacity: Number)
	// Set the opacity of an element (including old IE support).
	// `opacity` must be a number from `0` to `1`.
	function setOpacity(el, value) {
		if ('opacity' in el.style) {
			el.style.opacity = value;
		} else if ('filter' in el.style) {
			_setOpacityIE(el, value);
		}
	}
	
	function _setOpacityIE(el, value) {
		var filter = false,
		    filterName = 'DXImageTransform.Microsoft.Alpha';
	
		// filters collection throws an error if we try to retrieve a filter that doesn't exist
		try {
			filter = el.filters.item(filterName);
		} catch (e) {
			// don't set opacity to 1 if we haven't already set an opacity,
			// it isn't needed and breaks transparent pngs.
			if (value === 1) { return; }
		}
	
		value = Math.round(value * 100);
	
		if (filter) {
			filter.Enabled = (value !== 100);
			filter.Opacity = value;
		} else {
			el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
		}
	}
	
	// @function testProp(props: String[]): String|false
	// Goes through the array of style names and returns the first name
	// that is a valid style name for an element. If no such name is found,
	// it returns false. Useful for vendor-prefixed styles like `transform`.
	function testProp(props) {
		var style = document.documentElement.style;
	
		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	}
	
	// @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
	// Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
	// and optionally scaled by `scale`. Does not have an effect if the
	// browser doesn't support 3D CSS transforms.
	function setTransform(el, offset, scale) {
		var pos = offset || new Point(0, 0);
	
		el.style[TRANSFORM] =
			(ie3d ?
				'translate(' + pos.x + 'px,' + pos.y + 'px)' :
				'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
			(scale ? ' scale(' + scale + ')' : '');
	}
	
	// @function setPosition(el: HTMLElement, position: Point)
	// Sets the position of `el` to coordinates specified by `position`,
	// using CSS translate or top/left positioning depending on the browser
	// (used by Leaflet internally to position its layers).
	function setPosition(el, point) {
	
		/*eslint-disable */
		el._leaflet_pos = point;
		/* eslint-enable */
	
		if (any3d) {
			setTransform(el, point);
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	}
	
	// @function getPosition(el: HTMLElement): Point
	// Returns the coordinates of an element previously positioned with setPosition.
	function getPosition(el) {
		// this method is only used for elements previously positioned using setPosition,
		// so it's safe to cache the position for performance
	
		return el._leaflet_pos || new Point(0, 0);
	}
	
	// @function disableTextSelection()
	// Prevents the user from generating `selectstart` DOM events, usually generated
	// when the user drags the mouse through a page with text. Used internally
	// by Leaflet to override the behaviour of any click-and-drag interaction on
	// the map. Affects drag interactions on the whole document.
	
	// @function enableTextSelection()
	// Cancels the effects of a previous [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection).
	var disableTextSelection;
	var enableTextSelection;
	var _userSelect;
	if ('onselectstart' in document) {
		disableTextSelection = function () {
			on(window, 'selectstart', preventDefault);
		};
		enableTextSelection = function () {
			off(window, 'selectstart', preventDefault);
		};
	} else {
		var userSelectProperty = testProp(
			['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);
	
		disableTextSelection = function () {
			if (userSelectProperty) {
				var style = document.documentElement.style;
				_userSelect = style[userSelectProperty];
				style[userSelectProperty] = 'none';
			}
		};
		enableTextSelection = function () {
			if (userSelectProperty) {
				document.documentElement.style[userSelectProperty] = _userSelect;
				_userSelect = undefined;
			}
		};
	}
	
	// @function disableImageDrag()
	// As [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection), but
	// for `dragstart` DOM events, usually generated when the user drags an image.
	function disableImageDrag() {
		on(window, 'dragstart', preventDefault);
	}
	
	// @function enableImageDrag()
	// Cancels the effects of a previous [`L.DomUtil.disableImageDrag`](#domutil-disabletextselection).
	function enableImageDrag() {
		off(window, 'dragstart', preventDefault);
	}
	
	var _outlineElement;
	var _outlineStyle;
	// @function preventOutline(el: HTMLElement)
	// Makes the [outline](https://developer.mozilla.org/docs/Web/CSS/outline)
	// of the element `el` invisible. Used internally by Leaflet to prevent
	// focusable elements from displaying an outline when the user performs a
	// drag interaction on them.
	function preventOutline(element) {
		while (element.tabIndex === -1) {
			element = element.parentNode;
		}
		if (!element.style) { return; }
		restoreOutline();
		_outlineElement = element;
		_outlineStyle = element.style.outline;
		element.style.outline = 'none';
		on(window, 'keydown', restoreOutline);
	}
	
	// @function restoreOutline()
	// Cancels the effects of a previous [`L.DomUtil.preventOutline`]().
	function restoreOutline() {
		if (!_outlineElement) { return; }
		_outlineElement.style.outline = _outlineStyle;
		_outlineElement = undefined;
		_outlineStyle = undefined;
		off(window, 'keydown', restoreOutline);
	}
	
	
	var DomUtil = (Object.freeze || Object)({
		TRANSFORM: TRANSFORM,
		TRANSITION: TRANSITION,
		TRANSITION_END: TRANSITION_END,
		get: get,
		getStyle: getStyle,
		create: create$1,
		remove: remove,
		empty: empty,
		toFront: toFront,
		toBack: toBack,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		setClass: setClass,
		getClass: getClass,
		setOpacity: setOpacity,
		testProp: testProp,
		setTransform: setTransform,
		setPosition: setPosition,
		getPosition: getPosition,
		disableTextSelection: disableTextSelection,
		enableTextSelection: enableTextSelection,
		disableImageDrag: disableImageDrag,
		enableImageDrag: enableImageDrag,
		preventOutline: preventOutline,
		restoreOutline: restoreOutline
	});
	
	/*
	 * @class PosAnimation
	 * @aka L.PosAnimation
	 * @inherits Evented
	 * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
	 *
	 * @example
	 * ```js
	 * var fx = new L.PosAnimation();
	 * fx.run(el, [300, 500], 0.5);
	 * ```
	 *
	 * @constructor L.PosAnimation()
	 * Creates a `PosAnimation` object.
	 *
	 */
	
	var PosAnimation = Evented.extend({
	
		// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
		// Run an animation of a given element to a new position, optionally setting
		// duration in seconds (`0.25` by default) and easing linearity factor (3rd
		// argument of the [cubic bezier curve](http://cubic-bezier.com/#0,0,.5,1),
		// `0.5` by default).
		run: function (el, newPos, duration, easeLinearity) {
			this.stop();
	
			this._el = el;
			this._inProgress = true;
			this._duration = duration || 0.25;
			this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
	
			this._startPos = getPosition(el);
			this._offset = newPos.subtract(this._startPos);
			this._startTime = +new Date();
	
			// @event start: Event
			// Fired when the animation starts
			this.fire('start');
	
			this._animate();
		},
	
		// @method stop()
		// Stops the animation (if currently running).
		stop: function () {
			if (!this._inProgress) { return; }
	
			this._step(true);
			this._complete();
		},
	
		_animate: function () {
			// animation loop
			this._animId = requestAnimFrame(this._animate, this);
			this._step();
		},
	
		_step: function (round) {
			var elapsed = (+new Date()) - this._startTime,
			    duration = this._duration * 1000;
	
			if (elapsed < duration) {
				this._runFrame(this._easeOut(elapsed / duration), round);
			} else {
				this._runFrame(1);
				this._complete();
			}
		},
	
		_runFrame: function (progress, round) {
			var pos = this._startPos.add(this._offset.multiplyBy(progress));
			if (round) {
				pos._round();
			}
			setPosition(this._el, pos);
	
			// @event step: Event
			// Fired continuously during the animation.
			this.fire('step');
		},
	
		_complete: function () {
			cancelAnimFrame(this._animId);
	
			this._inProgress = false;
			// @event end: Event
			// Fired when the animation ends.
			this.fire('end');
		},
	
		_easeOut: function (t) {
			return 1 - Math.pow(1 - t, this._easeOutPower);
		}
	});
	
	/*
	 * @class Map
	 * @aka L.Map
	 * @inherits Evented
	 *
	 * The central class of the API — it is used to create a map on a page and manipulate it.
	 *
	 * @example
	 *
	 * ```js
	 * // initialize the map on the "map" div with a given center and zoom
	 * var map = L.map('map', {
	 * 	center: [51.505, -0.09],
	 * 	zoom: 13
	 * });
	 * ```
	 *
	 */
	
	var Map = Evented.extend({
	
		options: {
			// @section Map State Options
			// @option crs: CRS = L.CRS.EPSG3857
			// The [Coordinate Reference System](#crs) to use. Don't change this if you're not
			// sure what it means.
			crs: EPSG3857,
	
			// @option center: LatLng = undefined
			// Initial geographic center of the map
			center: undefined,
	
			// @option zoom: Number = undefined
			// Initial map zoom level
			zoom: undefined,
	
			// @option minZoom: Number = *
			// Minimum zoom level of the map.
			// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
			// the lowest of their `minZoom` options will be used instead.
			minZoom: undefined,
	
			// @option maxZoom: Number = *
			// Maximum zoom level of the map.
			// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
			// the highest of their `maxZoom` options will be used instead.
			maxZoom: undefined,
	
			// @option layers: Layer[] = []
			// Array of layers that will be added to the map initially
			layers: [],
	
			// @option maxBounds: LatLngBounds = null
			// When this option is set, the map restricts the view to the given
			// geographical bounds, bouncing the user back if the user tries to pan
			// outside the view. To set the restriction dynamically, use
			// [`setMaxBounds`](#map-setmaxbounds) method.
			maxBounds: undefined,
	
			// @option renderer: Renderer = *
			// The default method for drawing vector layers on the map. `L.SVG`
			// or `L.Canvas` by default depending on browser support.
			renderer: undefined,
	
	
			// @section Animation Options
			// @option zoomAnimation: Boolean = true
			// Whether the map zoom animation is enabled. By default it's enabled
			// in all browsers that support CSS3 Transitions except Android.
			zoomAnimation: true,
	
			// @option zoomAnimationThreshold: Number = 4
			// Won't animate zoom if the zoom difference exceeds this value.
			zoomAnimationThreshold: 4,
	
			// @option fadeAnimation: Boolean = true
			// Whether the tile fade animation is enabled. By default it's enabled
			// in all browsers that support CSS3 Transitions except Android.
			fadeAnimation: true,
	
			// @option markerZoomAnimation: Boolean = true
			// Whether markers animate their zoom with the zoom animation, if disabled
			// they will disappear for the length of the animation. By default it's
			// enabled in all browsers that support CSS3 Transitions except Android.
			markerZoomAnimation: true,
	
			// @option transform3DLimit: Number = 2^23
			// Defines the maximum size of a CSS translation transform. The default
			// value should not be changed unless a web browser positions layers in
			// the wrong place after doing a large `panBy`.
			transform3DLimit: 8388608, // Precision limit of a 32-bit float
	
			// @section Interaction Options
			// @option zoomSnap: Number = 1
			// Forces the map's zoom level to always be a multiple of this, particularly
			// right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
			// By default, the zoom level snaps to the nearest integer; lower values
			// (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
			// means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
			zoomSnap: 1,
	
			// @option zoomDelta: Number = 1
			// Controls how much the map's zoom level will change after a
			// [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
			// or `-` on the keyboard, or using the [zoom controls](#control-zoom).
			// Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
			zoomDelta: 1,
	
			// @option trackResize: Boolean = true
			// Whether the map automatically handles browser window resize to update itself.
			trackResize: true
		},
	
		initialize: function (id, options) { // (HTMLElement or String, Object)
			options = setOptions(this, options);
	
			this._initContainer(id);
			this._initLayout();
	
			// hack for https://github.com/Leaflet/Leaflet/issues/1980
			this._onResize = bind(this._onResize, this);
	
			this._initEvents();
	
			if (options.maxBounds) {
				this.setMaxBounds(options.maxBounds);
			}
	
			if (options.zoom !== undefined) {
				this._zoom = this._limitZoom(options.zoom);
			}
	
			if (options.center && options.zoom !== undefined) {
				this.setView(toLatLng(options.center), options.zoom, {reset: true});
			}
	
			this._handlers = [];
			this._layers = {};
			this._zoomBoundLayers = {};
			this._sizeChanged = true;
	
			this.callInitHooks();
	
			// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
			this._zoomAnimated = TRANSITION && any3d && !mobileOpera &&
					this.options.zoomAnimation;
	
			// zoom transitions run with the same duration for all layers, so if one of transitionend events
			// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
			if (this._zoomAnimated) {
				this._createAnimProxy();
				on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
			}
	
			this._addLayers(this.options.layers);
		},
	
	
		// @section Methods for modifying map state
	
		// @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
		// Sets the view of the map (geographical center and zoom) with the given
		// animation options.
		setView: function (center, zoom, options) {
	
			zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
			center = this._limitCenter(toLatLng(center), zoom, this.options.maxBounds);
			options = options || {};
	
			this._stop();
	
			if (this._loaded && !options.reset && options !== true) {
	
				if (options.animate !== undefined) {
					options.zoom = extend({animate: options.animate}, options.zoom);
					options.pan = extend({animate: options.animate, duration: options.duration}, options.pan);
				}
	
				// try animating pan or zoom
				var moved = (this._zoom !== zoom) ?
					this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
					this._tryAnimatedPan(center, options.pan);
	
				if (moved) {
					// prevent resize handler call, the view will refresh after animation anyway
					clearTimeout(this._sizeTimer);
					return this;
				}
			}
	
			// animation didn't start, just reset the map view
			this._resetView(center, zoom);
	
			return this;
		},
	
		// @method setZoom(zoom: Number, options?: Zoom/pan options): this
		// Sets the zoom of the map.
		setZoom: function (zoom, options) {
			if (!this._loaded) {
				this._zoom = zoom;
				return this;
			}
			return this.setView(this.getCenter(), zoom, {zoom: options});
		},
	
		// @method zoomIn(delta?: Number, options?: Zoom options): this
		// Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
		zoomIn: function (delta, options) {
			delta = delta || (any3d ? this.options.zoomDelta : 1);
			return this.setZoom(this._zoom + delta, options);
		},
	
		// @method zoomOut(delta?: Number, options?: Zoom options): this
		// Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
		zoomOut: function (delta, options) {
			delta = delta || (any3d ? this.options.zoomDelta : 1);
			return this.setZoom(this._zoom - delta, options);
		},
	
		// @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
		// Zooms the map while keeping a specified geographical point on the map
		// stationary (e.g. used internally for scroll zoom and double-click zoom).
		// @alternative
		// @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
		// Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
		setZoomAround: function (latlng, zoom, options) {
			var scale = this.getZoomScale(zoom),
			    viewHalf = this.getSize().divideBy(2),
			    containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng),
	
			    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
			    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
	
			return this.setView(newCenter, zoom, {zoom: options});
		},
	
		_getBoundsCenterZoom: function (bounds, options) {
	
			options = options || {};
			bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
	
			var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
			    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),
	
			    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
	
			zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;
	
			if (zoom === Infinity) {
				return {
					center: bounds.getCenter(),
					zoom: zoom
				};
			}
	
			var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),
	
			    swPoint = this.project(bounds.getSouthWest(), zoom),
			    nePoint = this.project(bounds.getNorthEast(), zoom),
			    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);
	
			return {
				center: center,
				zoom: zoom
			};
		},
	
		// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
		// Sets a map view that contains the given geographical bounds with the
		// maximum zoom level possible.
		fitBounds: function (bounds, options) {
	
			bounds = toLatLngBounds(bounds);
	
			if (!bounds.isValid()) {
				throw new Error('Bounds are not valid.');
			}
	
			var target = this._getBoundsCenterZoom(bounds, options);
			return this.setView(target.center, target.zoom, options);
		},
	
		// @method fitWorld(options?: fitBounds options): this
		// Sets a map view that mostly contains the whole world with the maximum
		// zoom level possible.
		fitWorld: function (options) {
			return this.fitBounds([[-90, -180], [90, 180]], options);
		},
	
		// @method panTo(latlng: LatLng, options?: Pan options): this
		// Pans the map to a given center.
		panTo: function (center, options) { // (LatLng)
			return this.setView(center, this._zoom, {pan: options});
		},
	
		// @method panBy(offset: Point, options?: Pan options): this
		// Pans the map by a given number of pixels (animated).
		panBy: function (offset, options) {
			offset = toPoint(offset).round();
			options = options || {};
	
			if (!offset.x && !offset.y) {
				return this.fire('moveend');
			}
			// If we pan too far, Chrome gets issues with tiles
			// and makes them disappear or appear in the wrong place (slightly offset) #2602
			if (options.animate !== true && !this.getSize().contains(offset)) {
				this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
				return this;
			}
	
			if (!this._panAnim) {
				this._panAnim = new PosAnimation();
	
				this._panAnim.on({
					'step': this._onPanTransitionStep,
					'end': this._onPanTransitionEnd
				}, this);
			}
	
			// don't fire movestart if animating inertia
			if (!options.noMoveStart) {
				this.fire('movestart');
			}
	
			// animate pan unless animate: false specified
			if (options.animate !== false) {
				addClass(this._mapPane, 'leaflet-pan-anim');
	
				var newPos = this._getMapPanePos().subtract(offset).round();
				this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
			} else {
				this._rawPanBy(offset);
				this.fire('move').fire('moveend');
			}
	
			return this;
		},
	
		// @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
		// Sets the view of the map (geographical center and zoom) performing a smooth
		// pan-zoom animation.
		flyTo: function (targetCenter, targetZoom, options) {
	
			options = options || {};
			if (options.animate === false || !any3d) {
				return this.setView(targetCenter, targetZoom, options);
			}
	
			this._stop();
	
			var from = this.project(this.getCenter()),
			    to = this.project(targetCenter),
			    size = this.getSize(),
			    startZoom = this._zoom;
	
			targetCenter = toLatLng(targetCenter);
			targetZoom = targetZoom === undefined ? startZoom : targetZoom;
	
			var w0 = Math.max(size.x, size.y),
			    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
			    u1 = (to.distanceTo(from)) || 1,
			    rho = 1.42,
			    rho2 = rho * rho;
	
			function r(i) {
				var s1 = i ? -1 : 1,
				    s2 = i ? w1 : w0,
				    t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
				    b1 = 2 * s2 * rho2 * u1,
				    b = t1 / b1,
				    sq = Math.sqrt(b * b + 1) - b;
	
				    // workaround for floating point precision bug when sq = 0, log = -Infinite,
				    // thus triggering an infinite loop in flyTo
				    var log = sq < 0.000000001 ? -18 : Math.log(sq);
	
				return log;
			}
	
			function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
			function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
			function tanh(n) { return sinh(n) / cosh(n); }
	
			var r0 = r(0);
	
			function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
			function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }
	
			function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }
	
			var start = Date.now(),
			    S = (r(1) - r0) / rho,
			    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;
	
			function frame() {
				var t = (Date.now() - start) / duration,
				    s = easeOut(t) * S;
	
				if (t <= 1) {
					this._flyToFrame = requestAnimFrame(frame, this);
	
					this._move(
						this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
						this.getScaleZoom(w0 / w(s), startZoom),
						{flyTo: true});
	
				} else {
					this
						._move(targetCenter, targetZoom)
						._moveEnd(true);
				}
			}
	
			this._moveStart(true, options.noMoveStart);
	
			frame.call(this);
			return this;
		},
	
		// @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
		// Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
		// but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
		flyToBounds: function (bounds, options) {
			var target = this._getBoundsCenterZoom(bounds, options);
			return this.flyTo(target.center, target.zoom, options);
		},
	
		// @method setMaxBounds(bounds: Bounds): this
		// Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
		setMaxBounds: function (bounds) {
			bounds = toLatLngBounds(bounds);
	
			if (!bounds.isValid()) {
				this.options.maxBounds = null;
				return this.off('moveend', this._panInsideMaxBounds);
			} else if (this.options.maxBounds) {
				this.off('moveend', this._panInsideMaxBounds);
			}
	
			this.options.maxBounds = bounds;
	
			if (this._loaded) {
				this._panInsideMaxBounds();
			}
	
			return this.on('moveend', this._panInsideMaxBounds);
		},
	
		// @method setMinZoom(zoom: Number): this
		// Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
		setMinZoom: function (zoom) {
			var oldZoom = this.options.minZoom;
			this.options.minZoom = zoom;
	
			if (this._loaded && oldZoom !== zoom) {
				this.fire('zoomlevelschange');
	
				if (this.getZoom() < this.options.minZoom) {
					return this.setZoom(zoom);
				}
			}
	
			return this;
		},
	
		// @method setMaxZoom(zoom: Number): this
		// Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
		setMaxZoom: function (zoom) {
			var oldZoom = this.options.maxZoom;
			this.options.maxZoom = zoom;
	
			if (this._loaded && oldZoom !== zoom) {
				this.fire('zoomlevelschange');
	
				if (this.getZoom() > this.options.maxZoom) {
					return this.setZoom(zoom);
				}
			}
	
			return this;
		},
	
		// @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
		// Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
		panInsideBounds: function (bounds, options) {
			this._enforcingBounds = true;
			var center = this.getCenter(),
			    newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
	
			if (!center.equals(newCenter)) {
				this.panTo(newCenter, options);
			}
	
			this._enforcingBounds = false;
			return this;
		},
	
		// @method invalidateSize(options: Zoom/pan options): this
		// Checks if the map container size changed and updates the map if so —
		// call it after you've changed the map size dynamically, also animating
		// pan by default. If `options.pan` is `false`, panning will not occur.
		// If `options.debounceMoveend` is `true`, it will delay `moveend` event so
		// that it doesn't happen often even if the method is called many
		// times in a row.
	
		// @alternative
		// @method invalidateSize(animate: Boolean): this
		// Checks if the map container size changed and updates the map if so —
		// call it after you've changed the map size dynamically, also animating
		// pan by default.
		invalidateSize: function (options) {
			if (!this._loaded) { return this; }
	
			options = extend({
				animate: false,
				pan: true
			}, options === true ? {animate: true} : options);
	
			var oldSize = this.getSize();
			this._sizeChanged = true;
			this._lastCenter = null;
	
			var newSize = this.getSize(),
			    oldCenter = oldSize.divideBy(2).round(),
			    newCenter = newSize.divideBy(2).round(),
			    offset = oldCenter.subtract(newCenter);
	
			if (!offset.x && !offset.y) { return this; }
	
			if (options.animate && options.pan) {
				this.panBy(offset);
	
			} else {
				if (options.pan) {
					this._rawPanBy(offset);
				}
	
				this.fire('move');
	
				if (options.debounceMoveend) {
					clearTimeout(this._sizeTimer);
					this._sizeTimer = setTimeout(bind(this.fire, this, 'moveend'), 200);
				} else {
					this.fire('moveend');
				}
			}
	
			// @section Map state change events
			// @event resize: ResizeEvent
			// Fired when the map is resized.
			return this.fire('resize', {
				oldSize: oldSize,
				newSize: newSize
			});
		},
	
		// @section Methods for modifying map state
		// @method stop(): this
		// Stops the currently running `panTo` or `flyTo` animation, if any.
		stop: function () {
			this.setZoom(this._limitZoom(this._zoom));
			if (!this.options.zoomSnap) {
				this.fire('viewreset');
			}
			return this._stop();
		},
	
		// @section Geolocation methods
		// @method locate(options?: Locate options): this
		// Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
		// event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
		// and optionally sets the map view to the user's location with respect to
		// detection accuracy (or to the world view if geolocation failed).
		// Note that, if your page doesn't use HTTPS, this method will fail in
		// modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
		// See `Locate options` for more details.
		locate: function (options) {
	
			options = this._locateOptions = extend({
				timeout: 10000,
				watch: false
				// setView: false
				// maxZoom: <Number>
				// maximumAge: 0
				// enableHighAccuracy: false
			}, options);
	
			if (!('geolocation' in navigator)) {
				this._handleGeolocationError({
					code: 0,
					message: 'Geolocation not supported.'
				});
				return this;
			}
	
			var onResponse = bind(this._handleGeolocationResponse, this),
			    onError = bind(this._handleGeolocationError, this);
	
			if (options.watch) {
				this._locationWatchId =
				        navigator.geolocation.watchPosition(onResponse, onError, options);
			} else {
				navigator.geolocation.getCurrentPosition(onResponse, onError, options);
			}
			return this;
		},
	
		// @method stopLocate(): this
		// Stops watching location previously initiated by `map.locate({watch: true})`
		// and aborts resetting the map view if map.locate was called with
		// `{setView: true}`.
		stopLocate: function () {
			if (navigator.geolocation && navigator.geolocation.clearWatch) {
				navigator.geolocation.clearWatch(this._locationWatchId);
			}
			if (this._locateOptions) {
				this._locateOptions.setView = false;
			}
			return this;
		},
	
		_handleGeolocationError: function (error) {
			var c = error.code,
			    message = error.message ||
			            (c === 1 ? 'permission denied' :
			            (c === 2 ? 'position unavailable' : 'timeout'));
	
			if (this._locateOptions.setView && !this._loaded) {
				this.fitWorld();
			}
	
			// @section Location events
			// @event locationerror: ErrorEvent
			// Fired when geolocation (using the [`locate`](#map-locate) method) failed.
			this.fire('locationerror', {
				code: c,
				message: 'Geolocation error: ' + message + '.'
			});
		},
	
		_handleGeolocationResponse: function (pos) {
			var lat = pos.coords.latitude,
			    lng = pos.coords.longitude,
			    latlng = new LatLng(lat, lng),
			    bounds = latlng.toBounds(pos.coords.accuracy),
			    options = this._locateOptions;
	
			if (options.setView) {
				var zoom = this.getBoundsZoom(bounds);
				this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
			}
	
			var data = {
				latlng: latlng,
				bounds: bounds,
				timestamp: pos.timestamp
			};
	
			for (var i in pos.coords) {
				if (typeof pos.coords[i] === 'number') {
					data[i] = pos.coords[i];
				}
			}
	
			// @event locationfound: LocationEvent
			// Fired when geolocation (using the [`locate`](#map-locate) method)
			// went successfully.
			this.fire('locationfound', data);
		},
	
		// TODO Appropriate docs section?
		// @section Other Methods
		// @method addHandler(name: String, HandlerClass: Function): this
		// Adds a new `Handler` to the map, given its name and constructor function.
		addHandler: function (name, HandlerClass) {
			if (!HandlerClass) { return this; }
	
			var handler = this[name] = new HandlerClass(this);
	
			this._handlers.push(handler);
	
			if (this.options[name]) {
				handler.enable();
			}
	
			return this;
		},
	
		// @method remove(): this
		// Destroys the map and clears all related event listeners.
		remove: function () {
	
			this._initEvents(true);
	
			if (this._containerId !== this._container._leaflet_id) {
				throw new Error('Map container is being reused by another instance');
			}
	
			try {
				// throws error in IE6-8
				delete this._container._leaflet_id;
				delete this._containerId;
			} catch (e) {
				/*eslint-disable */
				this._container._leaflet_id = undefined;
				/* eslint-enable */
				this._containerId = undefined;
			}
	
			if (this._locationWatchId !== undefined) {
				this.stopLocate();
			}
	
			this._stop();
	
			remove(this._mapPane);
	
			if (this._clearControlPos) {
				this._clearControlPos();
			}
	
			this._clearHandlers();
	
			if (this._loaded) {
				// @section Map state change events
				// @event unload: Event
				// Fired when the map is destroyed with [remove](#map-remove) method.
				this.fire('unload');
			}
	
			var i;
			for (i in this._layers) {
				this._layers[i].remove();
			}
			for (i in this._panes) {
				remove(this._panes[i]);
			}
	
			this._layers = [];
			this._panes = [];
			delete this._mapPane;
			delete this._renderer;
	
			return this;
		},
	
		// @section Other Methods
		// @method createPane(name: String, container?: HTMLElement): HTMLElement
		// Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
		// then returns it. The pane is created as a child of `container`, or
		// as a child of the main map pane if not set.
		createPane: function (name, container) {
			var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
			    pane = create$1('div', className, container || this._mapPane);
	
			if (name) {
				this._panes[name] = pane;
			}
			return pane;
		},
	
		// @section Methods for Getting Map State
	
		// @method getCenter(): LatLng
		// Returns the geographical center of the map view
		getCenter: function () {
			this._checkIfLoaded();
	
			if (this._lastCenter && !this._moved()) {
				return this._lastCenter;
			}
			return this.layerPointToLatLng(this._getCenterLayerPoint());
		},
	
		// @method getZoom(): Number
		// Returns the current zoom level of the map view
		getZoom: function () {
			return this._zoom;
		},
	
		// @method getBounds(): LatLngBounds
		// Returns the geographical bounds visible in the current map view
		getBounds: function () {
			var bounds = this.getPixelBounds(),
			    sw = this.unproject(bounds.getBottomLeft()),
			    ne = this.unproject(bounds.getTopRight());
	
			return new LatLngBounds(sw, ne);
		},
	
		// @method getMinZoom(): Number
		// Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
		getMinZoom: function () {
			return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
		},
	
		// @method getMaxZoom(): Number
		// Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
		getMaxZoom: function () {
			return this.options.maxZoom === undefined ?
				(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
				this.options.maxZoom;
		},
	
		// @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean): Number
		// Returns the maximum zoom level on which the given bounds fit to the map
		// view in its entirety. If `inside` (optional) is set to `true`, the method
		// instead returns the minimum zoom level on which the map view fits into
		// the given bounds in its entirety.
		getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
			bounds = toLatLngBounds(bounds);
			padding = toPoint(padding || [0, 0]);
	
			var zoom = this.getZoom() || 0,
			    min = this.getMinZoom(),
			    max = this.getMaxZoom(),
			    nw = bounds.getNorthWest(),
			    se = bounds.getSouthEast(),
			    size = this.getSize().subtract(padding),
			    boundsSize = toBounds(this.project(se, zoom), this.project(nw, zoom)).getSize(),
			    snap = any3d ? this.options.zoomSnap : 1,
			    scalex = size.x / boundsSize.x,
			    scaley = size.y / boundsSize.y,
			    scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
	
			zoom = this.getScaleZoom(scale, zoom);
	
			if (snap) {
				zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
				zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
			}
	
			return Math.max(min, Math.min(max, zoom));
		},
	
		// @method getSize(): Point
		// Returns the current size of the map container (in pixels).
		getSize: function () {
			if (!this._size || this._sizeChanged) {
				this._size = new Point(
					this._container.clientWidth || 0,
					this._container.clientHeight || 0);
	
				this._sizeChanged = false;
			}
			return this._size.clone();
		},
	
		// @method getPixelBounds(): Bounds
		// Returns the bounds of the current map view in projected pixel
		// coordinates (sometimes useful in layer and overlay implementations).
		getPixelBounds: function (center, zoom) {
			var topLeftPoint = this._getTopLeftPoint(center, zoom);
			return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
		},
	
		// TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
		// the map pane? "left point of the map layer" can be confusing, specially
		// since there can be negative offsets.
		// @method getPixelOrigin(): Point
		// Returns the projected pixel coordinates of the top left point of
		// the map layer (useful in custom layer and overlay implementations).
		getPixelOrigin: function () {
			this._checkIfLoaded();
			return this._pixelOrigin;
		},
	
		// @method getPixelWorldBounds(zoom?: Number): Bounds
		// Returns the world's bounds in pixel coordinates for zoom level `zoom`.
		// If `zoom` is omitted, the map's current zoom level is used.
		getPixelWorldBounds: function (zoom) {
			return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
		},
	
		// @section Other Methods
	
		// @method getPane(pane: String|HTMLElement): HTMLElement
		// Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
		getPane: function (pane) {
			return typeof pane === 'string' ? this._panes[pane] : pane;
		},
	
		// @method getPanes(): Object
		// Returns a plain object containing the names of all [panes](#map-pane) as keys and
		// the panes as values.
		getPanes: function () {
			return this._panes;
		},
	
		// @method getContainer: HTMLElement
		// Returns the HTML element that contains the map.
		getContainer: function () {
			return this._container;
		},
	
	
		// @section Conversion Methods
	
		// @method getZoomScale(toZoom: Number, fromZoom: Number): Number
		// Returns the scale factor to be applied to a map transition from zoom level
		// `fromZoom` to `toZoom`. Used internally to help with zoom animations.
		getZoomScale: function (toZoom, fromZoom) {
			// TODO replace with universal implementation after refactoring projections
			var crs = this.options.crs;
			fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
			return crs.scale(toZoom) / crs.scale(fromZoom);
		},
	
		// @method getScaleZoom(scale: Number, fromZoom: Number): Number
		// Returns the zoom level that the map would end up at, if it is at `fromZoom`
		// level and everything is scaled by a factor of `scale`. Inverse of
		// [`getZoomScale`](#map-getZoomScale).
		getScaleZoom: function (scale, fromZoom) {
			var crs = this.options.crs;
			fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
			var zoom = crs.zoom(scale * crs.scale(fromZoom));
			return isNaN(zoom) ? Infinity : zoom;
		},
	
		// @method project(latlng: LatLng, zoom: Number): Point
		// Projects a geographical coordinate `LatLng` according to the projection
		// of the map's CRS, then scales it according to `zoom` and the CRS's
		// `Transformation`. The result is pixel coordinate relative to
		// the CRS origin.
		project: function (latlng, zoom) {
			zoom = zoom === undefined ? this._zoom : zoom;
			return this.options.crs.latLngToPoint(toLatLng(latlng), zoom);
		},
	
		// @method unproject(point: Point, zoom: Number): LatLng
		// Inverse of [`project`](#map-project).
		unproject: function (point, zoom) {
			zoom = zoom === undefined ? this._zoom : zoom;
			return this.options.crs.pointToLatLng(toPoint(point), zoom);
		},
	
		// @method layerPointToLatLng(point: Point): LatLng
		// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
		// returns the corresponding geographical coordinate (for the current zoom level).
		layerPointToLatLng: function (point) {
			var projectedPoint = toPoint(point).add(this.getPixelOrigin());
			return this.unproject(projectedPoint);
		},
	
		// @method latLngToLayerPoint(latlng: LatLng): Point
		// Given a geographical coordinate, returns the corresponding pixel coordinate
		// relative to the [origin pixel](#map-getpixelorigin).
		latLngToLayerPoint: function (latlng) {
			var projectedPoint = this.project(toLatLng(latlng))._round();
			return projectedPoint._subtract(this.getPixelOrigin());
		},
	
		// @method wrapLatLng(latlng: LatLng): LatLng
		// Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
		// map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
		// CRS's bounds.
		// By default this means longitude is wrapped around the dateline so its
		// value is between -180 and +180 degrees.
		wrapLatLng: function (latlng) {
			return this.options.crs.wrapLatLng(toLatLng(latlng));
		},
	
		// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
		// Returns a `LatLngBounds` with the same size as the given one, ensuring that
		// its center is within the CRS's bounds.
		// By default this means the center longitude is wrapped around the dateline so its
		// value is between -180 and +180 degrees, and the majority of the bounds
		// overlaps the CRS's bounds.
		wrapLatLngBounds: function (latlng) {
			return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
		},
	
		// @method distance(latlng1: LatLng, latlng2: LatLng): Number
		// Returns the distance between two geographical coordinates according to
		// the map's CRS. By default this measures distance in meters.
		distance: function (latlng1, latlng2) {
			return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
		},
	
		// @method containerPointToLayerPoint(point: Point): Point
		// Given a pixel coordinate relative to the map container, returns the corresponding
		// pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
		containerPointToLayerPoint: function (point) { // (Point)
			return toPoint(point).subtract(this._getMapPanePos());
		},
	
		// @method layerPointToContainerPoint(point: Point): Point
		// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
		// returns the corresponding pixel coordinate relative to the map container.
		layerPointToContainerPoint: function (point) { // (Point)
			return toPoint(point).add(this._getMapPanePos());
		},
	
		// @method containerPointToLatLng(point: Point): LatLng
		// Given a pixel coordinate relative to the map container, returns
		// the corresponding geographical coordinate (for the current zoom level).
		containerPointToLatLng: function (point) {
			var layerPoint = this.containerPointToLayerPoint(toPoint(point));
			return this.layerPointToLatLng(layerPoint);
		},
	
		// @method latLngToContainerPoint(latlng: LatLng): Point
		// Given a geographical coordinate, returns the corresponding pixel coordinate
		// relative to the map container.
		latLngToContainerPoint: function (latlng) {
			return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
		},
	
		// @method mouseEventToContainerPoint(ev: MouseEvent): Point
		// Given a MouseEvent object, returns the pixel coordinate relative to the
		// map container where the event took place.
		mouseEventToContainerPoint: function (e) {
			return getMousePosition(e, this._container);
		},
	
		// @method mouseEventToLayerPoint(ev: MouseEvent): Point
		// Given a MouseEvent object, returns the pixel coordinate relative to
		// the [origin pixel](#map-getpixelorigin) where the event took place.
		mouseEventToLayerPoint: function (e) {
			return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
		},
	
		// @method mouseEventToLatLng(ev: MouseEvent): LatLng
		// Given a MouseEvent object, returns geographical coordinate where the
		// event took place.
		mouseEventToLatLng: function (e) { // (MouseEvent)
			return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
		},
	
	
		// map initialization methods
	
		_initContainer: function (id) {
			var container = this._container = get(id);
	
			if (!container) {
				throw new Error('Map container not found.');
			} else if (container._leaflet_id) {
				throw new Error('Map container is already initialized.');
			}
	
			on(container, 'scroll', this._onScroll, this);
			this._containerId = stamp(container);
		},
	
		_initLayout: function () {
			var container = this._container;
	
			this._fadeAnimated = this.options.fadeAnimation && any3d;
	
			addClass(container, 'leaflet-container' +
				(touch ? ' leaflet-touch' : '') +
				(retina ? ' leaflet-retina' : '') +
				(ielt9 ? ' leaflet-oldie' : '') +
				(safari ? ' leaflet-safari' : '') +
				(this._fadeAnimated ? ' leaflet-fade-anim' : ''));
	
			var position = getStyle(container, 'position');
	
			if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
				container.style.position = 'relative';
			}
	
			this._initPanes();
	
			if (this._initControlPos) {
				this._initControlPos();
			}
		},
	
		_initPanes: function () {
			var panes = this._panes = {};
			this._paneRenderers = {};
	
			// @section
			//
			// Panes are DOM elements used to control the ordering of layers on the map. You
			// can access panes with [`map.getPane`](#map-getpane) or
			// [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
			// [`map.createPane`](#map-createpane) method.
			//
			// Every map has the following default panes that differ only in zIndex.
			//
			// @pane mapPane: HTMLElement = 'auto'
			// Pane that contains all other map panes
	
			this._mapPane = this.createPane('mapPane', this._container);
			setPosition(this._mapPane, new Point(0, 0));
	
			// @pane tilePane: HTMLElement = 200
			// Pane for `GridLayer`s and `TileLayer`s
			this.createPane('tilePane');
			// @pane overlayPane: HTMLElement = 400
			// Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
			this.createPane('shadowPane');
			// @pane shadowPane: HTMLElement = 500
			// Pane for overlay shadows (e.g. `Marker` shadows)
			this.createPane('overlayPane');
			// @pane markerPane: HTMLElement = 600
			// Pane for `Icon`s of `Marker`s
			this.createPane('markerPane');
			// @pane tooltipPane: HTMLElement = 650
			// Pane for `Tooltip`s.
			this.createPane('tooltipPane');
			// @pane popupPane: HTMLElement = 700
			// Pane for `Popup`s.
			this.createPane('popupPane');
	
			if (!this.options.markerZoomAnimation) {
				addClass(panes.markerPane, 'leaflet-zoom-hide');
				addClass(panes.shadowPane, 'leaflet-zoom-hide');
			}
		},
	
	
		// private methods that modify map state
	
		// @section Map state change events
		_resetView: function (center, zoom) {
			setPosition(this._mapPane, new Point(0, 0));
	
			var loading = !this._loaded;
			this._loaded = true;
			zoom = this._limitZoom(zoom);
	
			this.fire('viewprereset');
	
			var zoomChanged = this._zoom !== zoom;
			this
				._moveStart(zoomChanged, false)
				._move(center, zoom)
				._moveEnd(zoomChanged);
	
			// @event viewreset: Event
			// Fired when the map needs to redraw its content (this usually happens
			// on map zoom or load). Very useful for creating custom overlays.
			this.fire('viewreset');
	
			// @event load: Event
			// Fired when the map is initialized (when its center and zoom are set
			// for the first time).
			if (loading) {
				this.fire('load');
			}
		},
	
		_moveStart: function (zoomChanged, noMoveStart) {
			// @event zoomstart: Event
			// Fired when the map zoom is about to change (e.g. before zoom animation).
			// @event movestart: Event
			// Fired when the view of the map starts changing (e.g. user starts dragging the map).
			if (zoomChanged) {
				this.fire('zoomstart');
			}
			if (!noMoveStart) {
				this.fire('movestart');
			}
			return this;
		},
	
		_move: function (center, zoom, data) {
			if (zoom === undefined) {
				zoom = this._zoom;
			}
			var zoomChanged = this._zoom !== zoom;
	
			this._zoom = zoom;
			this._lastCenter = center;
			this._pixelOrigin = this._getNewPixelOrigin(center);
	
			// @event zoom: Event
			// Fired repeatedly during any change in zoom level, including zoom
			// and fly animations.
			if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
				this.fire('zoom', data);
			}
	
			// @event move: Event
			// Fired repeatedly during any movement of the map, including pan and
			// fly animations.
			return this.fire('move', data);
		},
	
		_moveEnd: function (zoomChanged) {
			// @event zoomend: Event
			// Fired when the map has changed, after any animations.
			if (zoomChanged) {
				this.fire('zoomend');
			}
	
			// @event moveend: Event
			// Fired when the center of the map stops changing (e.g. user stopped
			// dragging the map).
			return this.fire('moveend');
		},
	
		_stop: function () {
			cancelAnimFrame(this._flyToFrame);
			if (this._panAnim) {
				this._panAnim.stop();
			}
			return this;
		},
	
		_rawPanBy: function (offset) {
			setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
		},
	
		_getZoomSpan: function () {
			return this.getMaxZoom() - this.getMinZoom();
		},
	
		_panInsideMaxBounds: function () {
			if (!this._enforcingBounds) {
				this.panInsideBounds(this.options.maxBounds);
			}
		},
	
		_checkIfLoaded: function () {
			if (!this._loaded) {
				throw new Error('Set map center and zoom first.');
			}
		},
	
		// DOM event handling
	
		// @section Interaction events
		_initEvents: function (remove$$1) {
			this._targets = {};
			this._targets[stamp(this._container)] = this;
	
			var onOff = remove$$1 ? off : on;
	
			// @event click: MouseEvent
			// Fired when the user clicks (or taps) the map.
			// @event dblclick: MouseEvent
			// Fired when the user double-clicks (or double-taps) the map.
			// @event mousedown: MouseEvent
			// Fired when the user pushes the mouse button on the map.
			// @event mouseup: MouseEvent
			// Fired when the user releases the mouse button on the map.
			// @event mouseover: MouseEvent
			// Fired when the mouse enters the map.
			// @event mouseout: MouseEvent
			// Fired when the mouse leaves the map.
			// @event mousemove: MouseEvent
			// Fired while the mouse moves over the map.
			// @event contextmenu: MouseEvent
			// Fired when the user pushes the right mouse button on the map, prevents
			// default browser context menu from showing if there are listeners on
			// this event. Also fired on mobile when the user holds a single touch
			// for a second (also called long press).
			// @event keypress: KeyboardEvent
			// Fired when the user presses a key from the keyboard while the map is focused.
			onOff(this._container, 'click dblclick mousedown mouseup ' +
				'mouseover mouseout mousemove contextmenu keypress', this._handleDOMEvent, this);
	
			if (this.options.trackResize) {
				onOff(window, 'resize', this._onResize, this);
			}
	
			if (any3d && this.options.transform3DLimit) {
				(remove$$1 ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
			}
		},
	
		_onResize: function () {
			cancelAnimFrame(this._resizeRequest);
			this._resizeRequest = requestAnimFrame(
			        function () { this.invalidateSize({debounceMoveend: true}); }, this);
		},
	
		_onScroll: function () {
			this._container.scrollTop  = 0;
			this._container.scrollLeft = 0;
		},
	
		_onMoveEnd: function () {
			var pos = this._getMapPanePos();
			if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
				// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
				// a pixel offset on very high values, see: http://jsfiddle.net/dg6r5hhb/
				this._resetView(this.getCenter(), this.getZoom());
			}
		},
	
		_findEventTargets: function (e, type) {
			var targets = [],
			    target,
			    isHover = type === 'mouseout' || type === 'mouseover',
			    src = e.target || e.srcElement,
			    dragging = false;
	
			while (src) {
				target = this._targets[stamp(src)];
				if (target && (type === 'click' || type === 'preclick') && !e._simulated && this._draggableMoved(target)) {
					// Prevent firing click after you just dragged an object.
					dragging = true;
					break;
				}
				if (target && target.listens(type, true)) {
					if (isHover && !isExternalTarget(src, e)) { break; }
					targets.push(target);
					if (isHover) { break; }
				}
				if (src === this._container) { break; }
				src = src.parentNode;
			}
			if (!targets.length && !dragging && !isHover && isExternalTarget(src, e)) {
				targets = [this];
			}
			return targets;
		},
	
		_handleDOMEvent: function (e) {
			if (!this._loaded || skipped(e)) { return; }
	
			var type = e.type;
	
			if (type === 'mousedown' || type === 'keypress') {
				// prevents outline when clicking on keyboard-focusable element
				preventOutline(e.target || e.srcElement);
			}
	
			this._fireDOMEvent(e, type);
		},
	
		_mouseEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],
	
		_fireDOMEvent: function (e, type, targets) {
	
			if (e.type === 'click') {
				// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
				// @event preclick: MouseEvent
				// Fired before mouse click on the map (sometimes useful when you
				// want something to happen on click before any existing click
				// handlers start running).
				var synth = extend({}, e);
				synth.type = 'preclick';
				this._fireDOMEvent(synth, synth.type, targets);
			}
	
			if (e._stopped) { return; }
	
			// Find the layer the event is propagating from and its parents.
			targets = (targets || []).concat(this._findEventTargets(e, type));
	
			if (!targets.length) { return; }
	
			var target = targets[0];
			if (type === 'contextmenu' && target.listens(type, true)) {
				preventDefault(e);
			}
	
			var data = {
				originalEvent: e
			};
	
			if (e.type !== 'keypress') {
				var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
				data.containerPoint = isMarker ?
					this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
				data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
				data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
			}
	
			for (var i = 0; i < targets.length; i++) {
				targets[i].fire(type, data, true);
				if (data.originalEvent._stopped ||
					(targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1)) { return; }
			}
		},
	
		_draggableMoved: function (obj) {
			obj = obj.dragging && obj.dragging.enabled() ? obj : this;
			return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
		},
	
		_clearHandlers: function () {
			for (var i = 0, len = this._handlers.length; i < len; i++) {
				this._handlers[i].disable();
			}
		},
	
		// @section Other Methods
	
		// @method whenReady(fn: Function, context?: Object): this
		// Runs the given function `fn` when the map gets initialized with
		// a view (center and zoom) and at least one layer, or immediately
		// if it's already initialized, optionally passing a function context.
		whenReady: function (callback, context) {
			if (this._loaded) {
				callback.call(context || this, {target: this});
			} else {
				this.on('load', callback, context);
			}
			return this;
		},
	
	
		// private methods for getting map state
	
		_getMapPanePos: function () {
			return getPosition(this._mapPane) || new Point(0, 0);
		},
	
		_moved: function () {
			var pos = this._getMapPanePos();
			return pos && !pos.equals([0, 0]);
		},
	
		_getTopLeftPoint: function (center, zoom) {
			var pixelOrigin = center && zoom !== undefined ?
				this._getNewPixelOrigin(center, zoom) :
				this.getPixelOrigin();
			return pixelOrigin.subtract(this._getMapPanePos());
		},
	
		_getNewPixelOrigin: function (center, zoom) {
			var viewHalf = this.getSize()._divideBy(2);
			return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
		},
	
		_latLngToNewLayerPoint: function (latlng, zoom, center) {
			var topLeft = this._getNewPixelOrigin(center, zoom);
			return this.project(latlng, zoom)._subtract(topLeft);
		},
	
		_latLngBoundsToNewLayerBounds: function (latLngBounds, zoom, center) {
			var topLeft = this._getNewPixelOrigin(center, zoom);
			return toBounds([
				this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
				this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
				this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
				this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
			]);
		},
	
		// layer point of the current center
		_getCenterLayerPoint: function () {
			return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
		},
	
		// offset of the specified place to the current center in pixels
		_getCenterOffset: function (latlng) {
			return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
		},
	
		// adjust center for view to get inside bounds
		_limitCenter: function (center, zoom, bounds) {
	
			if (!bounds) { return center; }
	
			var centerPoint = this.project(center, zoom),
			    viewHalf = this.getSize().divideBy(2),
			    viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
			    offset = this._getBoundsOffset(viewBounds, bounds, zoom);
	
			// If offset is less than a pixel, ignore.
			// This prevents unstable projections from getting into
			// an infinite loop of tiny offsets.
			if (offset.round().equals([0, 0])) {
				return center;
			}
	
			return this.unproject(centerPoint.add(offset), zoom);
		},
	
		// adjust offset for view to get inside bounds
		_limitOffset: function (offset, bounds) {
			if (!bounds) { return offset; }
	
			var viewBounds = this.getPixelBounds(),
			    newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
	
			return offset.add(this._getBoundsOffset(newBounds, bounds));
		},
	
		// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
		_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
			var projectedMaxBounds = toBounds(
			        this.project(maxBounds.getNorthEast(), zoom),
			        this.project(maxBounds.getSouthWest(), zoom)
			    ),
			    minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
			    maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),
	
			    dx = this._rebound(minOffset.x, -maxOffset.x),
			    dy = this._rebound(minOffset.y, -maxOffset.y);
	
			return new Point(dx, dy);
		},
	
		_rebound: function (left, right) {
			return left + right > 0 ?
				Math.round(left - right) / 2 :
				Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
		},
	
		_limitZoom: function (zoom) {
			var min = this.getMinZoom(),
			    max = this.getMaxZoom(),
			    snap = any3d ? this.options.zoomSnap : 1;
			if (snap) {
				zoom = Math.round(zoom / snap) * snap;
			}
			return Math.max(min, Math.min(max, zoom));
		},
	
		_onPanTransitionStep: function () {
			this.fire('move');
		},
	
		_onPanTransitionEnd: function () {
			removeClass(this._mapPane, 'leaflet-pan-anim');
			this.fire('moveend');
		},
	
		_tryAnimatedPan: function (center, options) {
			// difference between the new and current centers in pixels
			var offset = this._getCenterOffset(center)._trunc();
	
			// don't animate too far unless animate: true specified in options
			if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }
	
			this.panBy(offset, options);
	
			return true;
		},
	
		_createAnimProxy: function () {
	
			var proxy = this._proxy = create$1('div', 'leaflet-proxy leaflet-zoom-animated');
			this._panes.mapPane.appendChild(proxy);
	
			this.on('zoomanim', function (e) {
				var prop = TRANSFORM,
				    transform = this._proxy.style[prop];
	
				setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
	
				// workaround for case when transform is the same and so transitionend event is not fired
				if (transform === this._proxy.style[prop] && this._animatingZoom) {
					this._onZoomTransitionEnd();
				}
			}, this);
	
			this.on('load moveend', function () {
				var c = this.getCenter(),
				    z = this.getZoom();
				setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
			}, this);
	
			this._on('unload', this._destroyAnimProxy, this);
		},
	
		_destroyAnimProxy: function () {
			remove(this._proxy);
			delete this._proxy;
		},
	
		_catchTransitionEnd: function (e) {
			if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
				this._onZoomTransitionEnd();
			}
		},
	
		_nothingToAnimate: function () {
			return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
		},
	
		_tryAnimatedZoom: function (center, zoom, options) {
	
			if (this._animatingZoom) { return true; }
	
			options = options || {};
	
			// don't animate if disabled, not supported or zoom difference is too large
			if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
			        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }
	
			// offset is the pixel coords of the zoom origin relative to the current center
			var scale = this.getZoomScale(zoom),
			    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);
	
			// don't animate if the zoom origin isn't within one screen from the current center, unless forced
			if (options.animate !== true && !this.getSize().contains(offset)) { return false; }
	
			requestAnimFrame(function () {
				this
				    ._moveStart(true, false)
				    ._animateZoom(center, zoom, true);
			}, this);
	
			return true;
		},
	
		_animateZoom: function (center, zoom, startAnim, noUpdate) {
			if (!this._mapPane) { return; }
	
			if (startAnim) {
				this._animatingZoom = true;
	
				// remember what center/zoom to set after animation
				this._animateToCenter = center;
				this._animateToZoom = zoom;
	
				addClass(this._mapPane, 'leaflet-zoom-anim');
			}
	
			// @event zoomanim: ZoomAnimEvent
			// Fired on every frame of a zoom animation
			this.fire('zoomanim', {
				center: center,
				zoom: zoom,
				noUpdate: noUpdate
			});
	
			// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
			setTimeout(bind(this._onZoomTransitionEnd, this), 250);
		},
	
		_onZoomTransitionEnd: function () {
			if (!this._animatingZoom) { return; }
	
			if (this._mapPane) {
				removeClass(this._mapPane, 'leaflet-zoom-anim');
			}
	
			this._animatingZoom = false;
	
			this._move(this._animateToCenter, this._animateToZoom);
	
			// This anim frame should prevent an obscure iOS webkit tile loading race condition.
			requestAnimFrame(function () {
				this._moveEnd(true);
			}, this);
		}
	});
	
	// @section
	
	// @factory L.map(id: String, options?: Map options)
	// Instantiates a map object given the DOM ID of a `<div>` element
	// and optionally an object literal with `Map options`.
	//
	// @alternative
	// @factory L.map(el: HTMLElement, options?: Map options)
	// Instantiates a map object given an instance of a `<div>` HTML element
	// and optionally an object literal with `Map options`.
	function createMap(id, options) {
		return new Map(id, options);
	}
	
	/*
	 * @class Control
	 * @aka L.Control
	 * @inherits Class
	 *
	 * L.Control is a base class for implementing map controls. Handles positioning.
	 * All other controls extend from this class.
	 */
	
	var Control = Class.extend({
		// @section
		// @aka Control options
		options: {
			// @option position: String = 'topright'
			// The position of the control (one of the map corners). Possible values are `'topleft'`,
			// `'topright'`, `'bottomleft'` or `'bottomright'`
			position: 'topright'
		},
	
		initialize: function (options) {
			setOptions(this, options);
		},
	
		/* @section
		 * Classes extending L.Control will inherit the following methods:
		 *
		 * @method getPosition: string
		 * Returns the position of the control.
		 */
		getPosition: function () {
			return this.options.position;
		},
	
		// @method setPosition(position: string): this
		// Sets the position of the control.
		setPosition: function (position) {
			var map = this._map;
	
			if (map) {
				map.removeControl(this);
			}
	
			this.options.position = position;
	
			if (map) {
				map.addControl(this);
			}
	
			return this;
		},
	
		// @method getContainer: HTMLElement
		// Returns the HTMLElement that contains the control.
		getContainer: function () {
			return this._container;
		},
	
		// @method addTo(map: Map): this
		// Adds the control to the given map.
		addTo: function (map) {
			this.remove();
			this._map = map;
	
			var container = this._container = this.onAdd(map),
			    pos = this.getPosition(),
			    corner = map._controlCorners[pos];
	
			addClass(container, 'leaflet-control');
	
			if (pos.indexOf('bottom') !== -1) {
				corner.insertBefore(container, corner.firstChild);
			} else {
				corner.appendChild(container);
			}
	
			return this;
		},
	
		// @method remove: this
		// Removes the control from the map it is currently active on.
		remove: function () {
			if (!this._map) {
				return this;
			}
	
			remove(this._container);
	
			if (this.onRemove) {
				this.onRemove(this._map);
			}
	
			this._map = null;
	
			return this;
		},
	
		_refocusOnMap: function (e) {
			// if map exists and event is not a keyboard event
			if (this._map && e && e.screenX > 0 && e.screenY > 0) {
				this._map.getContainer().focus();
			}
		}
	});
	
	var control = function (options) {
		return new Control(options);
	};
	
	/* @section Extension methods
	 * @uninheritable
	 *
	 * Every control should extend from `L.Control` and (re-)implement the following methods.
	 *
	 * @method onAdd(map: Map): HTMLElement
	 * Should return the container DOM element for the control and add listeners on relevant map events. Called on [`control.addTo(map)`](#control-addTo).
	 *
	 * @method onRemove(map: Map)
	 * Optional method. Should contain all clean up code that removes the listeners previously added in [`onAdd`](#control-onadd). Called on [`control.remove()`](#control-remove).
	 */
	
	/* @namespace Map
	 * @section Methods for Layers and Controls
	 */
	Map.include({
		// @method addControl(control: Control): this
		// Adds the given control to the map
		addControl: function (control) {
			control.addTo(this);
			return this;
		},
	
		// @method removeControl(control: Control): this
		// Removes the given control from the map
		removeControl: function (control) {
			control.remove();
			return this;
		},
	
		_initControlPos: function () {
			var corners = this._controlCorners = {},
			    l = 'leaflet-',
			    container = this._controlContainer =
			            create$1('div', l + 'control-container', this._container);
	
			function createCorner(vSide, hSide) {
				var className = l + vSide + ' ' + l + hSide;
	
				corners[vSide + hSide] = create$1('div', className, container);
			}
	
			createCorner('top', 'left');
			createCorner('top', 'right');
			createCorner('bottom', 'left');
			createCorner('bottom', 'right');
		},
	
		_clearControlPos: function () {
			for (var i in this._controlCorners) {
				remove(this._controlCorners[i]);
			}
			remove(this._controlContainer);
			delete this._controlCorners;
			delete this._controlContainer;
		}
	});
	
	/*
	 * @class Control.Layers
	 * @aka L.Control.Layers
	 * @inherits Control
	 *
	 * The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out the [detailed example](http://leafletjs.com/examples/layers-control/)). Extends `Control`.
	 *
	 * @example
	 *
	 * ```js
	 * var baseLayers = {
	 * 	"Mapbox": mapbox,
	 * 	"OpenStreetMap": osm
	 * };
	 *
	 * var overlays = {
	 * 	"Marker": marker,
	 * 	"Roads": roadsLayer
	 * };
	 *
	 * L.control.layers(baseLayers, overlays).addTo(map);
	 * ```
	 *
	 * The `baseLayers` and `overlays` parameters are object literals with layer names as keys and `Layer` objects as values:
	 *
	 * ```js
	 * {
	 *     "<someName1>": layer1,
	 *     "<someName2>": layer2
	 * }
	 * ```
	 *
	 * The layer names can contain HTML, which allows you to add additional styling to the items:
	 *
	 * ```js
	 * {"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}
	 * ```
	 */
	
	var Layers = Control.extend({
		// @section
		// @aka Control.Layers options
		options: {
			// @option collapsed: Boolean = true
			// If `true`, the control will be collapsed into an icon and expanded on mouse hover or touch.
			collapsed: true,
			position: 'topright',
	
			// @option autoZIndex: Boolean = true
			// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
			autoZIndex: true,
	
			// @option hideSingleBase: Boolean = false
			// If `true`, the base layers in the control will be hidden when there is only one.
			hideSingleBase: false,
	
			// @option sortLayers: Boolean = false
			// Whether to sort the layers. When `false`, layers will keep the order
			// in which they were added to the control.
			sortLayers: false,
	
			// @option sortFunction: Function = *
			// A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
			// that will be used for sorting the layers, when `sortLayers` is `true`.
			// The function receives both the `L.Layer` instances and their names, as in
			// `sortFunction(layerA, layerB, nameA, nameB)`.
			// By default, it sorts layers alphabetically by their name.
			sortFunction: function (layerA, layerB, nameA, nameB) {
				return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
			}
		},
	
		initialize: function (baseLayers, overlays, options) {
			setOptions(this, options);
	
			this._layerControlInputs = [];
			this._layers = [];
			this._lastZIndex = 0;
			this._handlingClick = false;
	
			for (var i in baseLayers) {
				this._addLayer(baseLayers[i], i);
			}
	
			for (i in overlays) {
				this._addLayer(overlays[i], i, true);
			}
		},
	
		onAdd: function (map) {
			this._initLayout();
			this._update();
	
			this._map = map;
			map.on('zoomend', this._checkDisabledLayers, this);
	
			for (var i = 0; i < this._layers.length; i++) {
				this._layers[i].layer.on('add remove', this._onLayerChange, this);
			}
	
			return this._container;
		},
	
		addTo: function (map) {
			Control.prototype.addTo.call(this, map);
			// Trigger expand after Layers Control has been inserted into DOM so that is now has an actual height.
			return this._expandIfNotCollapsed();
		},
	
		onRemove: function () {
			this._map.off('zoomend', this._checkDisabledLayers, this);
	
			for (var i = 0; i < this._layers.length; i++) {
				this._layers[i].layer.off('add remove', this._onLayerChange, this);
			}
		},
	
		// @method addBaseLayer(layer: Layer, name: String): this
		// Adds a base layer (radio button entry) with the given name to the control.
		addBaseLayer: function (layer, name) {
			this._addLayer(layer, name);
			return (this._map) ? this._update() : this;
		},
	
		// @method addOverlay(layer: Layer, name: String): this
		// Adds an overlay (checkbox entry) with the given name to the control.
		addOverlay: function (layer, name) {
			this._addLayer(layer, name, true);
			return (this._map) ? this._update() : this;
		},
	
		// @method removeLayer(layer: Layer): this
		// Remove the given layer from the control.
		removeLayer: function (layer) {
			layer.off('add remove', this._onLayerChange, this);
	
			var obj = this._getLayer(stamp(layer));
			if (obj) {
				this._layers.splice(this._layers.indexOf(obj), 1);
			}
			return (this._map) ? this._update() : this;
		},
	
		// @method expand(): this
		// Expand the control container if collapsed.
		expand: function () {
			addClass(this._container, 'leaflet-control-layers-expanded');
			this._form.style.height = null;
			var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
			if (acceptableHeight < this._form.clientHeight) {
				addClass(this._form, 'leaflet-control-layers-scrollbar');
				this._form.style.height = acceptableHeight + 'px';
			} else {
				removeClass(this._form, 'leaflet-control-layers-scrollbar');
			}
			this._checkDisabledLayers();
			return this;
		},
	
		// @method collapse(): this
		// Collapse the control container if expanded.
		collapse: function () {
			removeClass(this._container, 'leaflet-control-layers-expanded');
			return this;
		},
	
		_initLayout: function () {
			var className = 'leaflet-control-layers',
			    container = this._container = create$1('div', className),
			    collapsed = this.options.collapsed;
	
			// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
			container.setAttribute('aria-haspopup', true);
	
			disableClickPropagation(container);
			disableScrollPropagation(container);
	
			var form = this._form = create$1('form', className + '-list');
	
			if (collapsed) {
				this._map.on('click', this.collapse, this);
	
				if (!android) {
					on(container, {
						mouseenter: this.expand,
						mouseleave: this.collapse
					}, this);
				}
			}
	
			var link = this._layersLink = create$1('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Layers';
	
			if (touch) {
				on(link, 'click', stop);
				on(link, 'click', this.expand, this);
			} else {
				on(link, 'focus', this.expand, this);
			}
	
			if (!collapsed) {
				this.expand();
			}
	
			this._baseLayersList = create$1('div', className + '-base', form);
			this._separator = create$1('div', className + '-separator', form);
			this._overlaysList = create$1('div', className + '-overlays', form);
	
			container.appendChild(form);
		},
	
		_getLayer: function (id) {
			for (var i = 0; i < this._layers.length; i++) {
	
				if (this._layers[i] && stamp(this._layers[i].layer) === id) {
					return this._layers[i];
				}
			}
		},
	
		_addLayer: function (layer, name, overlay) {
			if (this._map) {
				layer.on('add remove', this._onLayerChange, this);
			}
	
			this._layers.push({
				layer: layer,
				name: name,
				overlay: overlay
			});
	
			if (this.options.sortLayers) {
				this._layers.sort(bind(function (a, b) {
					return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
				}, this));
			}
	
			if (this.options.autoZIndex && layer.setZIndex) {
				this._lastZIndex++;
				layer.setZIndex(this._lastZIndex);
			}
	
			this._expandIfNotCollapsed();
		},
	
		_update: function () {
			if (!this._container) { return this; }
	
			empty(this._baseLayersList);
			empty(this._overlaysList);
	
			this._layerControlInputs = [];
			var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
	
			for (i = 0; i < this._layers.length; i++) {
				obj = this._layers[i];
				this._addItem(obj);
				overlaysPresent = overlaysPresent || obj.overlay;
				baseLayersPresent = baseLayersPresent || !obj.overlay;
				baseLayersCount += !obj.overlay ? 1 : 0;
			}
	
			// Hide base layers section if there's only one layer.
			if (this.options.hideSingleBase) {
				baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
				this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
			}
	
			this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
	
			return this;
		},
	
		_onLayerChange: function (e) {
			if (!this._handlingClick) {
				this._update();
			}
	
			var obj = this._getLayer(stamp(e.target));
	
			// @namespace Map
			// @section Layer events
			// @event baselayerchange: LayersControlEvent
			// Fired when the base layer is changed through the [layer control](#control-layers).
			// @event overlayadd: LayersControlEvent
			// Fired when an overlay is selected through the [layer control](#control-layers).
			// @event overlayremove: LayersControlEvent
			// Fired when an overlay is deselected through the [layer control](#control-layers).
			// @namespace Control.Layers
			var type = obj.overlay ?
				(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
				(e.type === 'add' ? 'baselayerchange' : null);
	
			if (type) {
				this._map.fire(type, obj);
			}
		},
	
		// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
		_createRadioElement: function (name, checked) {
	
			var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
					name + '"' + (checked ? ' checked="checked"' : '') + '/>';
	
			var radioFragment = document.createElement('div');
			radioFragment.innerHTML = radioHtml;
	
			return radioFragment.firstChild;
		},
	
		_addItem: function (obj) {
			var label = document.createElement('label'),
			    checked = this._map.hasLayer(obj.layer),
			    input;
	
			if (obj.overlay) {
				input = document.createElement('input');
				input.type = 'checkbox';
				input.className = 'leaflet-control-layers-selector';
				input.defaultChecked = checked;
			} else {
				input = this._createRadioElement('leaflet-base-layers', checked);
			}
	
			this._layerControlInputs.push(input);
			input.layerId = stamp(obj.layer);
	
			on(input, 'click', this._onInputClick, this);
	
			var name = document.createElement('span');
			name.innerHTML = ' ' + obj.name;
	
			// Helps from preventing layer control flicker when checkboxes are disabled
			// https://github.com/Leaflet/Leaflet/issues/2771
			var holder = document.createElement('div');
	
			label.appendChild(holder);
			holder.appendChild(input);
			holder.appendChild(name);
	
			var container = obj.overlay ? this._overlaysList : this._baseLayersList;
			container.appendChild(label);
	
			this._checkDisabledLayers();
			return label;
		},
	
		_onInputClick: function () {
			var inputs = this._layerControlInputs,
			    input, layer;
			var addedLayers = [],
			    removedLayers = [];
	
			this._handlingClick = true;
	
			for (var i = inputs.length - 1; i >= 0; i--) {
				input = inputs[i];
				layer = this._getLayer(input.layerId).layer;
	
				if (input.checked) {
					addedLayers.push(layer);
				} else if (!input.checked) {
					removedLayers.push(layer);
				}
			}
	
			// Bugfix issue 2318: Should remove all old layers before readding new ones
			for (i = 0; i < removedLayers.length; i++) {
				if (this._map.hasLayer(removedLayers[i])) {
					this._map.removeLayer(removedLayers[i]);
				}
			}
			for (i = 0; i < addedLayers.length; i++) {
				if (!this._map.hasLayer(addedLayers[i])) {
					this._map.addLayer(addedLayers[i]);
				}
			}
	
			this._handlingClick = false;
	
			this._refocusOnMap();
		},
	
		_checkDisabledLayers: function () {
			var inputs = this._layerControlInputs,
			    input,
			    layer,
			    zoom = this._map.getZoom();
	
			for (var i = inputs.length - 1; i >= 0; i--) {
				input = inputs[i];
				layer = this._getLayer(input.layerId).layer;
				input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
				                 (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);
	
			}
		},
	
		_expandIfNotCollapsed: function () {
			if (this._map && !this.options.collapsed) {
				this.expand();
			}
			return this;
		},
	
		_expand: function () {
			// Backward compatibility, remove me in 1.1.
			return this.expand();
		},
	
		_collapse: function () {
			// Backward compatibility, remove me in 1.1.
			return this.collapse();
		}
	
	});
	
	
	// @factory L.control.layers(baselayers?: Object, overlays?: Object, options?: Control.Layers options)
	// Creates an attribution control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation.
	var layers = function (baseLayers, overlays, options) {
		return new Layers(baseLayers, overlays, options);
	};
	
	/*
	 * @class Control.Zoom
	 * @aka L.Control.Zoom
	 * @inherits Control
	 *
	 * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its [`zoomControl` option](#map-zoomcontrol) to `false`. Extends `Control`.
	 */
	
	var Zoom = Control.extend({
		// @section
		// @aka Control.Zoom options
		options: {
			position: 'topleft',
	
			// @option zoomInText: String = '+'
			// The text set on the 'zoom in' button.
			zoomInText: '+',
	
			// @option zoomInTitle: String = 'Zoom in'
			// The title set on the 'zoom in' button.
			zoomInTitle: 'Zoom in',
	
			// @option zoomOutText: String = '&#x2212;'
			// The text set on the 'zoom out' button.
			zoomOutText: '&#x2212;',
	
			// @option zoomOutTitle: String = 'Zoom out'
			// The title set on the 'zoom out' button.
			zoomOutTitle: 'Zoom out'
		},
	
		onAdd: function (map) {
			var zoomName = 'leaflet-control-zoom',
			    container = create$1('div', zoomName + ' leaflet-bar'),
			    options = this.options;
	
			this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
			        zoomName + '-in',  container, this._zoomIn);
			this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
			        zoomName + '-out', container, this._zoomOut);
	
			this._updateDisabled();
			map.on('zoomend zoomlevelschange', this._updateDisabled, this);
	
			return container;
		},
	
		onRemove: function (map) {
			map.off('zoomend zoomlevelschange', this._updateDisabled, this);
		},
	
		disable: function () {
			this._disabled = true;
			this._updateDisabled();
			return this;
		},
	
		enable: function () {
			this._disabled = false;
			this._updateDisabled();
			return this;
		},
	
		_zoomIn: function (e) {
			if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
				this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			}
		},
	
		_zoomOut: function (e) {
			if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
				this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			}
		},
	
		_createButton: function (html, title, className, container, fn) {
			var link = create$1('a', className, container);
			link.innerHTML = html;
			link.href = '#';
			link.title = title;
	
			/*
			 * Will force screen readers like VoiceOver to read this as "Zoom in - button"
			 */
			link.setAttribute('role', 'button');
			link.setAttribute('aria-label', title);
	
			disableClickPropagation(link);
			on(link, 'click', stop);
			on(link, 'click', fn, this);
			on(link, 'click', this._refocusOnMap, this);
	
			return link;
		},
	
		_updateDisabled: function () {
			var map = this._map,
			    className = 'leaflet-disabled';
	
			removeClass(this._zoomInButton, className);
			removeClass(this._zoomOutButton, className);
	
			if (this._disabled || map._zoom === map.getMinZoom()) {
				addClass(this._zoomOutButton, className);
			}
			if (this._disabled || map._zoom === map.getMaxZoom()) {
				addClass(this._zoomInButton, className);
			}
		}
	});
	
	// @namespace Map
	// @section Control options
	// @option zoomControl: Boolean = true
	// Whether a [zoom control](#control-zoom) is added to the map by default.
	Map.mergeOptions({
		zoomControl: true
	});
	
	Map.addInitHook(function () {
		if (this.options.zoomControl) {
			this.zoomControl = new Zoom();
			this.addControl(this.zoomControl);
		}
	});
	
	// @namespace Control.Zoom
	// @factory L.control.zoom(options: Control.Zoom options)
	// Creates a zoom control
	var zoom = function (options) {
		return new Zoom(options);
	};
	
	/*
	 * @class Control.Scale
	 * @aka L.Control.Scale
	 * @inherits Control
	 *
	 * A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends `Control`.
	 *
	 * @example
	 *
	 * ```js
	 * L.control.scale().addTo(map);
	 * ```
	 */
	
	var Scale = Control.extend({
		// @section
		// @aka Control.Scale options
		options: {
			position: 'bottomleft',
	
			// @option maxWidth: Number = 100
			// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
			maxWidth: 100,
	
			// @option metric: Boolean = True
			// Whether to show the metric scale line (m/km).
			metric: true,
	
			// @option imperial: Boolean = True
			// Whether to show the imperial scale line (mi/ft).
			imperial: true
	
			// @option updateWhenIdle: Boolean = false
			// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
		},
	
		onAdd: function (map) {
			var className = 'leaflet-control-scale',
			    container = create$1('div', className),
			    options = this.options;
	
			this._addScales(options, className + '-line', container);
	
			map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
			map.whenReady(this._update, this);
	
			return container;
		},
	
		onRemove: function (map) {
			map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		},
	
		_addScales: function (options, className, container) {
			if (options.metric) {
				this._mScale = create$1('div', className, container);
			}
			if (options.imperial) {
				this._iScale = create$1('div', className, container);
			}
		},
	
		_update: function () {
			var map = this._map,
			    y = map.getSize().y / 2;
	
			var maxMeters = map.distance(
				map.containerPointToLatLng([0, y]),
				map.containerPointToLatLng([this.options.maxWidth, y]));
	
			this._updateScales(maxMeters);
		},
	
		_updateScales: function (maxMeters) {
			if (this.options.metric && maxMeters) {
				this._updateMetric(maxMeters);
			}
			if (this.options.imperial && maxMeters) {
				this._updateImperial(maxMeters);
			}
		},
	
		_updateMetric: function (maxMeters) {
			var meters = this._getRoundNum(maxMeters),
			    label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
	
			this._updateScale(this._mScale, label, meters / maxMeters);
		},
	
		_updateImperial: function (maxMeters) {
			var maxFeet = maxMeters * 3.2808399,
			    maxMiles, miles, feet;
	
			if (maxFeet > 5280) {
				maxMiles = maxFeet / 5280;
				miles = this._getRoundNum(maxMiles);
				this._updateScale(this._iScale, miles + ' mi', miles / maxMiles);
	
			} else {
				feet = this._getRoundNum(maxFeet);
				this._updateScale(this._iScale, feet + ' ft', feet / maxFeet);
			}
		},
	
		_updateScale: function (scale, text, ratio) {
			scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
			scale.innerHTML = text;
		},
	
		_getRoundNum: function (num) {
			var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
			    d = num / pow10;
	
			d = d >= 10 ? 10 :
			    d >= 5 ? 5 :
			    d >= 3 ? 3 :
			    d >= 2 ? 2 : 1;
	
			return pow10 * d;
		}
	});
	
	
	// @factory L.control.scale(options?: Control.Scale options)
	// Creates an scale control with the given options.
	var scale = function (options) {
		return new Scale(options);
	};
	
	/*
	 * @class Control.Attribution
	 * @aka L.Control.Attribution
	 * @inherits Control
	 *
	 * The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its [`attributionControl` option](#map-attributioncontrol) to `false`, and it fetches attribution texts from layers with the [`getAttribution` method](#layer-getattribution) automatically. Extends Control.
	 */
	
	var Attribution = Control.extend({
		// @section
		// @aka Control.Attribution options
		options: {
			position: 'bottomright',
	
			// @option prefix: String = 'Leaflet'
			// The HTML text shown before the attributions. Pass `false` to disable.
			prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
		},
	
		initialize: function (options) {
			setOptions(this, options);
	
			this._attributions = {};
		},
	
		onAdd: function (map) {
			map.attributionControl = this;
			this._container = create$1('div', 'leaflet-control-attribution');
			disableClickPropagation(this._container);
	
			// TODO ugly, refactor
			for (var i in map._layers) {
				if (map._layers[i].getAttribution) {
					this.addAttribution(map._layers[i].getAttribution());
				}
			}
	
			this._update();
	
			return this._container;
		},
	
		// @method setPrefix(prefix: String): this
		// Sets the text before the attributions.
		setPrefix: function (prefix) {
			this.options.prefix = prefix;
			this._update();
			return this;
		},
	
		// @method addAttribution(text: String): this
		// Adds an attribution text (e.g. `'Vector data &copy; Mapbox'`).
		addAttribution: function (text) {
			if (!text) { return this; }
	
			if (!this._attributions[text]) {
				this._attributions[text] = 0;
			}
			this._attributions[text]++;
	
			this._update();
	
			return this;
		},
	
		// @method removeAttribution(text: String): this
		// Removes an attribution text.
		removeAttribution: function (text) {
			if (!text) { return this; }
	
			if (this._attributions[text]) {
				this._attributions[text]--;
				this._update();
			}
	
			return this;
		},
	
		_update: function () {
			if (!this._map) { return; }
	
			var attribs = [];
	
			for (var i in this._attributions) {
				if (this._attributions[i]) {
					attribs.push(i);
				}
			}
	
			var prefixAndAttribs = [];
	
			if (this.options.prefix) {
				prefixAndAttribs.push(this.options.prefix);
			}
			if (attribs.length) {
				prefixAndAttribs.push(attribs.join(', '));
			}
	
			this._container.innerHTML = prefixAndAttribs.join(' | ');
		}
	});
	
	// @namespace Map
	// @section Control options
	// @option attributionControl: Boolean = true
	// Whether a [attribution control](#control-attribution) is added to the map by default.
	Map.mergeOptions({
		attributionControl: true
	});
	
	Map.addInitHook(function () {
		if (this.options.attributionControl) {
			new Attribution().addTo(this);
		}
	});
	
	// @namespace Control.Attribution
	// @factory L.control.attribution(options: Control.Attribution options)
	// Creates an attribution control.
	var attribution = function (options) {
		return new Attribution(options);
	};
	
	Control.Layers = Layers;
	Control.Zoom = Zoom;
	Control.Scale = Scale;
	Control.Attribution = Attribution;
	
	control.layers = layers;
	control.zoom = zoom;
	control.scale = scale;
	control.attribution = attribution;
	
	/*
		L.Handler is a base class for handler classes that are used internally to inject
		interaction features like dragging to classes like Map and Marker.
	*/
	
	// @class Handler
	// @aka L.Handler
	// Abstract class for map interaction handlers
	
	var Handler = Class.extend({
		initialize: function (map) {
			this._map = map;
		},
	
		// @method enable(): this
		// Enables the handler
		enable: function () {
			if (this._enabled) { return this; }
	
			this._enabled = true;
			this.addHooks();
			return this;
		},
	
		// @method disable(): this
		// Disables the handler
		disable: function () {
			if (!this._enabled) { return this; }
	
			this._enabled = false;
			this.removeHooks();
			return this;
		},
	
		// @method enabled(): Boolean
		// Returns `true` if the handler is enabled
		enabled: function () {
			return !!this._enabled;
		}
	
		// @section Extension methods
		// Classes inheriting from `Handler` must implement the two following methods:
		// @method addHooks()
		// Called when the handler is enabled, should add event hooks.
		// @method removeHooks()
		// Called when the handler is disabled, should remove the event hooks added previously.
	});
	
	// @section There is static function which can be called without instantiating L.Handler:
	// @function addTo(map: Map, name: String): this
	// Adds a new Handler to the given map with the given name.
	Handler.addTo = function (map, name) {
		map.addHandler(name, this);
		return this;
	};
	
	var Mixin = {Events: Events};
	
	/*
	 * @class Draggable
	 * @aka L.Draggable
	 * @inherits Evented
	 *
	 * A class for making DOM elements draggable (including touch support).
	 * Used internally for map and marker dragging. Only works for elements
	 * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
	 *
	 * @example
	 * ```js
	 * var draggable = new L.Draggable(elementToDrag);
	 * draggable.enable();
	 * ```
	 */
	
	var START = touch ? 'touchstart mousedown' : 'mousedown';
	var END = {
		mousedown: 'mouseup',
		touchstart: 'touchend',
		pointerdown: 'touchend',
		MSPointerDown: 'touchend'
	};
	var MOVE = {
		mousedown: 'mousemove',
		touchstart: 'touchmove',
		pointerdown: 'touchmove',
		MSPointerDown: 'touchmove'
	};
	
	
	var Draggable = Evented.extend({
	
		options: {
			// @section
			// @aka Draggable options
			// @option clickTolerance: Number = 3
			// The max number of pixels a user can shift the mouse pointer during a click
			// for it to be considered a valid click (as opposed to a mouse drag).
			clickTolerance: 3
		},
	
		// @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
		// Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
		initialize: function (element, dragStartTarget, preventOutline$$1, options) {
			setOptions(this, options);
	
			this._element = element;
			this._dragStartTarget = dragStartTarget || element;
			this._preventOutline = preventOutline$$1;
		},
	
		// @method enable()
		// Enables the dragging ability
		enable: function () {
			if (this._enabled) { return; }
	
			on(this._dragStartTarget, START, this._onDown, this);
	
			this._enabled = true;
		},
	
		// @method disable()
		// Disables the dragging ability
		disable: function () {
			if (!this._enabled) { return; }
	
			// If we're currently dragging this draggable,
			// disabling it counts as first ending the drag.
			if (Draggable._dragging === this) {
				this.finishDrag();
			}
	
			off(this._dragStartTarget, START, this._onDown, this);
	
			this._enabled = false;
			this._moved = false;
		},
	
		_onDown: function (e) {
			// Ignore simulated events, since we handle both touch and
			// mouse explicitly; otherwise we risk getting duplicates of
			// touch events, see #4315.
			// Also ignore the event if disabled; this happens in IE11
			// under some circumstances, see #3666.
			if (e._simulated || !this._enabled) { return; }
	
			this._moved = false;
	
			if (hasClass(this._element, 'leaflet-zoom-anim')) { return; }
	
			if (Draggable._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
			Draggable._dragging = this;  // Prevent dragging multiple objects at once.
	
			if (this._preventOutline) {
				preventOutline(this._element);
			}
	
			disableImageDrag();
			disableTextSelection();
	
			if (this._moving) { return; }
	
			// @event down: Event
			// Fired when a drag is about to start.
			this.fire('down');
	
			var first = e.touches ? e.touches[0] : e;
	
			this._startPoint = new Point(first.clientX, first.clientY);
	
			on(document, MOVE[e.type], this._onMove, this);
			on(document, END[e.type], this._onUp, this);
		},
	
		_onMove: function (e) {
			// Ignore simulated events, since we handle both touch and
			// mouse explicitly; otherwise we risk getting duplicates of
			// touch events, see #4315.
			// Also ignore the event if disabled; this happens in IE11
			// under some circumstances, see #3666.
			if (e._simulated || !this._enabled) { return; }
	
			if (e.touches && e.touches.length > 1) {
				this._moved = true;
				return;
			}
	
			var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
			    newPoint = new Point(first.clientX, first.clientY),
			    offset = newPoint.subtract(this._startPoint);
	
			if (!offset.x && !offset.y) { return; }
			if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }
	
			preventDefault(e);
	
			if (!this._moved) {
				// @event dragstart: Event
				// Fired when a drag starts
				this.fire('dragstart');
	
				this._moved = true;
				this._startPos = getPosition(this._element).subtract(offset);
	
				addClass(document.body, 'leaflet-dragging');
	
				this._lastTarget = e.target || e.srcElement;
				// IE and Edge do not give the <use> element, so fetch it
				// if necessary
				if ((window.SVGElementInstance) && (this._lastTarget instanceof SVGElementInstance)) {
					this._lastTarget = this._lastTarget.correspondingUseElement;
				}
				addClass(this._lastTarget, 'leaflet-drag-target');
			}
	
			this._newPos = this._startPos.add(offset);
			this._moving = true;
	
			cancelAnimFrame(this._animRequest);
			this._lastEvent = e;
			this._animRequest = requestAnimFrame(this._updatePosition, this, true);
		},
	
		_updatePosition: function () {
			var e = {originalEvent: this._lastEvent};
	
			// @event predrag: Event
			// Fired continuously during dragging *before* each corresponding
			// update of the element's position.
			this.fire('predrag', e);
			setPosition(this._element, this._newPos);
	
			// @event drag: Event
			// Fired continuously during dragging.
			this.fire('drag', e);
		},
	
		_onUp: function (e) {
			// Ignore simulated events, since we handle both touch and
			// mouse explicitly; otherwise we risk getting duplicates of
			// touch events, see #4315.
			// Also ignore the event if disabled; this happens in IE11
			// under some circumstances, see #3666.
			if (e._simulated || !this._enabled) { return; }
			this.finishDrag();
		},
	
		finishDrag: function () {
			removeClass(document.body, 'leaflet-dragging');
	
			if (this._lastTarget) {
				removeClass(this._lastTarget, 'leaflet-drag-target');
				this._lastTarget = null;
			}
	
			for (var i in MOVE) {
				off(document, MOVE[i], this._onMove, this);
				off(document, END[i], this._onUp, this);
			}
	
			enableImageDrag();
			enableTextSelection();
	
			if (this._moved && this._moving) {
				// ensure drag is not fired after dragend
				cancelAnimFrame(this._animRequest);
	
				// @event dragend: DragEndEvent
				// Fired when the drag ends.
				this.fire('dragend', {
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
	
			this._moving = false;
			Draggable._dragging = false;
		}
	
	});
	
	/*
	 * @namespace LineUtil
	 *
	 * Various utility functions for polyline points processing, used by Leaflet internally to make polylines lightning-fast.
	 */
	
	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.
	
	// @function simplify(points: Point[], tolerance: Number): Point[]
	// Dramatically reduces the number of points in a polyline while retaining
	// its shape and returns a new array of simplified points, using the
	// [Douglas-Peucker algorithm](http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm).
	// Used for a huge performance boost when processing/displaying Leaflet polylines for
	// each zoom level and also reducing visual noise. tolerance affects the amount of
	// simplification (lesser value means higher quality but slower and with more points).
	// Also released as a separated micro-library [Simplify.js](http://mourner.github.com/simplify-js/).
	function simplify(points, tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}
	
		var sqTolerance = tolerance * tolerance;
	
		    // stage 1: vertex reduction
		    points = _reducePoints(points, sqTolerance);
	
		    // stage 2: Douglas-Peucker simplification
		    points = _simplifyDP(points, sqTolerance);
	
		return points;
	}
	
	// @function pointToSegmentDistance(p: Point, p1: Point, p2: Point): Number
	// Returns the distance between point `p` and segment `p1` to `p2`.
	function pointToSegmentDistance(p, p1, p2) {
		return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
	}
	
	// @function closestPointOnSegment(p: Point, p1: Point, p2: Point): Number
	// Returns the closest point from a point `p` on a segment `p1` to `p2`.
	function closestPointOnSegment(p, p1, p2) {
		return _sqClosestPointOnSegment(p, p1, p2);
	}
	
	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	function _simplifyDP(points, sqTolerance) {
	
		var len = points.length,
		    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
		    markers = new ArrayConstructor(len);
	
		    markers[0] = markers[len - 1] = 1;
	
		_simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
	
		var i,
		    newPoints = [];
	
		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}
	
		return newPoints;
	}
	
	function _simplifyDPStep(points, markers, sqTolerance, first, last) {
	
		var maxSqDist = 0,
		index, i, sqDist;
	
		for (i = first + 1; i <= last - 1; i++) {
			sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
	
			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}
	
		if (maxSqDist > sqTolerance) {
			markers[index] = 1;
	
			_simplifyDPStep(points, markers, sqTolerance, first, index);
			_simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	}
	
	// reduce points that are too close to each other to a single point
	function _reducePoints(points, sqTolerance) {
		var reducedPoints = [points[0]];
	
		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (_sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	}
	
	var _lastCode;
	
	// @function clipSegment(a: Point, b: Point, bounds: Bounds, useLastCode?: Boolean, round?: Boolean): Point[]|Boolean
	// Clips the segment a to b by rectangular bounds with the
	// [Cohen-Sutherland algorithm](https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm)
	// (modifying the segment points directly!). Used by Leaflet to only show polyline
	// points that are on the screen or near, increasing performance.
	function clipSegment(a, b, bounds, useLastCode, round) {
		var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds),
		    codeB = _getBitCode(b, bounds),
	
		    codeOut, p, newCode;
	
		    // save 2nd code to avoid calculating it on the next segment
		    _lastCode = codeB;
	
		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) {
				return [a, b];
			}
	
			// if a,b is outside the clip window (trivial reject)
			if (codeA & codeB) {
				return false;
			}
	
			// other cases
			codeOut = codeA || codeB;
			p = _getEdgeIntersection(a, b, codeOut, bounds, round);
			newCode = _getBitCode(p, bounds);
	
			if (codeOut === codeA) {
				a = p;
				codeA = newCode;
			} else {
				b = p;
				codeB = newCode;
			}
		}
	}
	
	function _getEdgeIntersection(a, b, code, bounds, round) {
		var dx = b.x - a.x,
		    dy = b.y - a.y,
		    min = bounds.min,
		    max = bounds.max,
		    x, y;
	
		if (code & 8) { // top
			x = a.x + dx * (max.y - a.y) / dy;
			y = max.y;
	
		} else if (code & 4) { // bottom
			x = a.x + dx * (min.y - a.y) / dy;
			y = min.y;
	
		} else if (code & 2) { // right
			x = max.x;
			y = a.y + dy * (max.x - a.x) / dx;
	
		} else if (code & 1) { // left
			x = min.x;
			y = a.y + dy * (min.x - a.x) / dx;
		}
	
		return new Point(x, y, round);
	}
	
	function _getBitCode(p, bounds) {
		var code = 0;
	
		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}
	
		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}
	
		return code;
	}
	
	// square distance (to avoid unnecessary Math.sqrt calls)
	function _sqDist(p1, p2) {
		var dx = p2.x - p1.x,
		    dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	}
	
	// return closest point on segment or distance to that point
	function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
		var x = p1.x,
		    y = p1.y,
		    dx = p2.x - x,
		    dy = p2.y - y,
		    dot = dx * dx + dy * dy,
		    t;
	
		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
	
			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}
	
		dx = p.x - x;
		dy = p.y - y;
	
		return sqDist ? dx * dx + dy * dy : new Point(x, y);
	}
	
	
	// @function isFlat(latlngs: LatLng[]): Boolean
	// Returns true if `latlngs` is a flat array, false is nested.
	function isFlat(latlngs) {
		return !isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
	}
	
	function _flat(latlngs) {
		console.warn('Deprecated use of _flat, please use L.LineUtil.isFlat instead.');
		return isFlat(latlngs);
	}
	
	
	var LineUtil = (Object.freeze || Object)({
		simplify: simplify,
		pointToSegmentDistance: pointToSegmentDistance,
		closestPointOnSegment: closestPointOnSegment,
		clipSegment: clipSegment,
		_getEdgeIntersection: _getEdgeIntersection,
		_getBitCode: _getBitCode,
		_sqClosestPointOnSegment: _sqClosestPointOnSegment,
		isFlat: isFlat,
		_flat: _flat
	});
	
	/*
	 * @namespace PolyUtil
	 * Various utility functions for polygon geometries.
	 */
	
	/* @function clipPolygon(points: Point[], bounds: Bounds, round?: Boolean): Point[]
	 * Clips the polygon geometry defined by the given `points` by the given bounds (using the [Sutherland-Hodgman algorithm](https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm)).
	 * Used by Leaflet to only show polygon points that are on the screen or near, increasing
	 * performance. Note that polygon points needs different algorithm for clipping
	 * than polyline, so there's a separate method for it.
	 */
	function clipPolygon(points, bounds, round) {
		var clippedPoints,
		    edges = [1, 4, 2, 8],
		    i, j, k,
		    a, b,
		    len, edge, p;
	
		for (i = 0, len = points.length; i < len; i++) {
			points[i]._code = _getBitCode(points[i], bounds);
		}
	
		// for each edge (left, bottom, right, top)
		for (k = 0; k < 4; k++) {
			edge = edges[k];
			clippedPoints = [];
	
			for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
				a = points[i];
				b = points[j];
	
				// if a is inside the clip window
				if (!(a._code & edge)) {
					// if b is outside the clip window (a->b goes out of screen)
					if (b._code & edge) {
						p = _getEdgeIntersection(b, a, edge, bounds, round);
						p._code = _getBitCode(p, bounds);
						clippedPoints.push(p);
					}
					clippedPoints.push(a);
	
				// else if b is inside the clip window (a->b enters the screen)
				} else if (!(b._code & edge)) {
					p = _getEdgeIntersection(b, a, edge, bounds, round);
					p._code = _getBitCode(p, bounds);
					clippedPoints.push(p);
				}
			}
			points = clippedPoints;
		}
	
		return points;
	}
	
	
	var PolyUtil = (Object.freeze || Object)({
		clipPolygon: clipPolygon
	});
	
	/*
	 * @namespace Projection
	 * @section
	 * Leaflet comes with a set of already defined Projections out of the box:
	 *
	 * @projection L.Projection.LonLat
	 *
	 * Equirectangular, or Plate Carree projection — the most simple projection,
	 * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
	 * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
	 * `EPSG:4326` and `Simple` CRS.
	 */
	
	var LonLat = {
		project: function (latlng) {
			return new Point(latlng.lng, latlng.lat);
		},
	
		unproject: function (point) {
			return new LatLng(point.y, point.x);
		},
	
		bounds: new Bounds([-180, -90], [180, 90])
	};
	
	/*
	 * @namespace Projection
	 * @projection L.Projection.Mercator
	 *
	 * Elliptical Mercator projection — more complex than Spherical Mercator. Takes into account that Earth is a geoid, not a perfect sphere. Used by the EPSG:3395 CRS.
	 */
	
	var Mercator = {
		R: 6378137,
		R_MINOR: 6356752.314245179,
	
		bounds: new Bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
	
		project: function (latlng) {
			var d = Math.PI / 180,
			    r = this.R,
			    y = latlng.lat * d,
			    tmp = this.R_MINOR / r,
			    e = Math.sqrt(1 - tmp * tmp),
			    con = e * Math.sin(y);
	
			var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
			y = -r * Math.log(Math.max(ts, 1E-10));
	
			return new Point(latlng.lng * d * r, y);
		},
	
		unproject: function (point) {
			var d = 180 / Math.PI,
			    r = this.R,
			    tmp = this.R_MINOR / r,
			    e = Math.sqrt(1 - tmp * tmp),
			    ts = Math.exp(-point.y / r),
			    phi = Math.PI / 2 - 2 * Math.atan(ts);
	
			for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
				con = e * Math.sin(phi);
				con = Math.pow((1 - con) / (1 + con), e / 2);
				dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
				phi += dphi;
			}
	
			return new LatLng(phi * d, point.x * d / r);
		}
	};
	
	/*
	 * @class Projection
	
	 * An object with methods for projecting geographical coordinates of the world onto
	 * a flat surface (and back). See [Map projection](http://en.wikipedia.org/wiki/Map_projection).
	
	 * @property bounds: Bounds
	 * The bounds (specified in CRS units) where the projection is valid
	
	 * @method project(latlng: LatLng): Point
	 * Projects geographical coordinates into a 2D point.
	 * Only accepts actual `L.LatLng` instances, not arrays.
	
	 * @method unproject(point: Point): LatLng
	 * The inverse of `project`. Projects a 2D point into a geographical location.
	 * Only accepts actual `L.Point` instances, not arrays.
	
	 * Note that the projection instances do not inherit from Leafet's `Class` object,
	 * and can't be instantiated. Also, new classes can't inherit from them,
	 * and methods can't be added to them with the `include` function.
	
	 */
	
	
	
	
	var index = (Object.freeze || Object)({
		LonLat: LonLat,
		Mercator: Mercator,
		SphericalMercator: SphericalMercator
	});
	
	/*
	 * @namespace CRS
	 * @crs L.CRS.EPSG3395
	 *
	 * Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.
	 */
	var EPSG3395 = extend({}, Earth, {
		code: 'EPSG:3395',
		projection: Mercator,
	
		transformation: (function () {
			var scale = 0.5 / (Math.PI * Mercator.R);
			return toTransformation(scale, 0.5, -scale, 0.5);
		}())
	});
	
	/*
	 * @namespace CRS
	 * @crs L.CRS.EPSG4326
	 *
	 * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
	 *
	 * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
	 * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
	 * with this CRS, ensure that there are two 256x256 pixel tiles covering the
	 * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
	 * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
	 */
	
	var EPSG4326 = extend({}, Earth, {
		code: 'EPSG:4326',
		projection: LonLat,
		transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
	});
	
	/*
	 * @namespace CRS
	 * @crs L.CRS.Simple
	 *
	 * A simple CRS that maps longitude and latitude into `x` and `y` directly.
	 * May be used for maps of flat surfaces (e.g. game maps). Note that the `y`
	 * axis should still be inverted (going from bottom to top). `distance()` returns
	 * simple euclidean distance.
	 */
	
	var Simple = extend({}, CRS, {
		projection: LonLat,
		transformation: toTransformation(1, 0, -1, 0),
	
		scale: function (zoom) {
			return Math.pow(2, zoom);
		},
	
		zoom: function (scale) {
			return Math.log(scale) / Math.LN2;
		},
	
		distance: function (latlng1, latlng2) {
			var dx = latlng2.lng - latlng1.lng,
			    dy = latlng2.lat - latlng1.lat;
	
			return Math.sqrt(dx * dx + dy * dy);
		},
	
		infinite: true
	});
	
	CRS.Earth = Earth;
	CRS.EPSG3395 = EPSG3395;
	CRS.EPSG3857 = EPSG3857;
	CRS.EPSG900913 = EPSG900913;
	CRS.EPSG4326 = EPSG4326;
	CRS.Simple = Simple;
	
	/*
	 * @class Layer
	 * @inherits Evented
	 * @aka L.Layer
	 * @aka ILayer
	 *
	 * A set of methods from the Layer base class that all Leaflet layers use.
	 * Inherits all methods, options and events from `L.Evented`.
	 *
	 * @example
	 *
	 * ```js
	 * var layer = L.Marker(latlng).addTo(map);
	 * layer.addTo(map);
	 * layer.remove();
	 * ```
	 *
	 * @event add: Event
	 * Fired after the layer is added to a map
	 *
	 * @event remove: Event
	 * Fired after the layer is removed from a map
	 */
	
	
	var Layer = Evented.extend({
	
		// Classes extending `L.Layer` will inherit the following options:
		options: {
			// @option pane: String = 'overlayPane'
			// By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
			pane: 'overlayPane',
	
			// @option attribution: String = null
			// String to be shown in the attribution control, describes the layer data, e.g. "© Mapbox".
			attribution: null,
	
			bubblingMouseEvents: true
		},
	
		/* @section
		 * Classes extending `L.Layer` will inherit the following methods:
		 *
		 * @method addTo(map: Map|LayerGroup): this
		 * Adds the layer to the given map or layer group.
		 */
		addTo: function (map) {
			map.addLayer(this);
			return this;
		},
	
		// @method remove: this
		// Removes the layer from the map it is currently active on.
		remove: function () {
			return this.removeFrom(this._map || this._mapToAdd);
		},
	
		// @method removeFrom(map: Map): this
		// Removes the layer from the given map
		removeFrom: function (obj) {
			if (obj) {
				obj.removeLayer(this);
			}
			return this;
		},
	
		// @method getPane(name? : String): HTMLElement
		// Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
		getPane: function (name) {
			return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
		},
	
		addInteractiveTarget: function (targetEl) {
			this._map._targets[stamp(targetEl)] = this;
			return this;
		},
	
		removeInteractiveTarget: function (targetEl) {
			delete this._map._targets[stamp(targetEl)];
			return this;
		},
	
		// @method getAttribution: String
		// Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
		getAttribution: function () {
			return this.options.attribution;
		},
	
		_layerAdd: function (e) {
			var map = e.target;
	
			// check in case layer gets added and then removed before the map is ready
			if (!map.hasLayer(this)) { return; }
	
			this._map = map;
			this._zoomAnimated = map._zoomAnimated;
	
			if (this.getEvents) {
				var events = this.getEvents();
				map.on(events, this);
				this.once('remove', function () {
					map.off(events, this);
				}, this);
			}
	
			this.onAdd(map);
	
			if (this.getAttribution && map.attributionControl) {
				map.attributionControl.addAttribution(this.getAttribution());
			}
	
			this.fire('add');
			map.fire('layeradd', {layer: this});
		}
	});
	
	/* @section Extension methods
	 * @uninheritable
	 *
	 * Every layer should extend from `L.Layer` and (re-)implement the following methods.
	 *
	 * @method onAdd(map: Map): this
	 * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
	 *
	 * @method onRemove(map: Map): this
	 * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
	 *
	 * @method getEvents(): Object
	 * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
	 *
	 * @method getAttribution(): String
	 * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
	 *
	 * @method beforeAdd(map: Map): this
	 * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
	 */
	
	
	/* @namespace Map
	 * @section Layer events
	 *
	 * @event layeradd: LayerEvent
	 * Fired when a new layer is added to the map.
	 *
	 * @event layerremove: LayerEvent
	 * Fired when some layer is removed from the map
	 *
	 * @section Methods for Layers and Controls
	 */
	Map.include({
		// @method addLayer(layer: Layer): this
		// Adds the given layer to the map
		addLayer: function (layer) {
			if (!layer._layerAdd) {
				throw new Error('The provided object is not a Layer.');
			}
	
			var id = stamp(layer);
			if (this._layers[id]) { return this; }
			this._layers[id] = layer;
	
			layer._mapToAdd = this;
	
			if (layer.beforeAdd) {
				layer.beforeAdd(this);
			}
	
			this.whenReady(layer._layerAdd, layer);
	
			return this;
		},
	
		// @method removeLayer(layer: Layer): this
		// Removes the given layer from the map.
		removeLayer: function (layer) {
			var id = stamp(layer);
	
			if (!this._layers[id]) { return this; }
	
			if (this._loaded) {
				layer.onRemove(this);
			}
	
			if (layer.getAttribution && this.attributionControl) {
				this.attributionControl.removeAttribution(layer.getAttribution());
			}
	
			delete this._layers[id];
	
			if (this._loaded) {
				this.fire('layerremove', {layer: layer});
				layer.fire('remove');
			}
	
			layer._map = layer._mapToAdd = null;
	
			return this;
		},
	
		// @method hasLayer(layer: Layer): Boolean
		// Returns `true` if the given layer is currently added to the map
		hasLayer: function (layer) {
			return !!layer && (stamp(layer) in this._layers);
		},
	
		/* @method eachLayer(fn: Function, context?: Object): this
		 * Iterates over the layers of the map, optionally specifying context of the iterator function.
		 * ```
		 * map.eachLayer(function(layer){
		 *     layer.bindPopup('Hello');
		 * });
		 * ```
		 */
		eachLayer: function (method, context) {
			for (var i in this._layers) {
				method.call(context, this._layers[i]);
			}
			return this;
		},
	
		_addLayers: function (layers) {
			layers = layers ? (isArray(layers) ? layers : [layers]) : [];
	
			for (var i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		},
	
		_addZoomLimit: function (layer) {
			if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
				this._zoomBoundLayers[stamp(layer)] = layer;
				this._updateZoomLevels();
			}
		},
	
		_removeZoomLimit: function (layer) {
			var id = stamp(layer);
	
			if (this._zoomBoundLayers[id]) {
				delete this._zoomBoundLayers[id];
				this._updateZoomLevels();
			}
		},
	
		_updateZoomLevels: function () {
			var minZoom = Infinity,
			    maxZoom = -Infinity,
			    oldZoomSpan = this._getZoomSpan();
	
			for (var i in this._zoomBoundLayers) {
				var options = this._zoomBoundLayers[i].options;
	
				minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
				maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
			}
	
			this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
			this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;
	
			// @section Map state change events
			// @event zoomlevelschange: Event
			// Fired when the number of zoomlevels on the map is changed due
			// to adding or removing a layer.
			if (oldZoomSpan !== this._getZoomSpan()) {
				this.fire('zoomlevelschange');
			}
	
			if (this.options.maxZoom === undefined && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
				this.setZoom(this._layersMaxZoom);
			}
			if (this.options.minZoom === undefined && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
				this.setZoom(this._layersMinZoom);
			}
		}
	});
	
	/*
	 * @class LayerGroup
	 * @aka L.LayerGroup
	 * @inherits Layer
	 *
	 * Used to group several layers and handle them as one. If you add it to the map,
	 * any layers added or removed from the group will be added/removed on the map as
	 * well. Extends `Layer`.
	 *
	 * @example
	 *
	 * ```js
	 * L.layerGroup([marker1, marker2])
	 * 	.addLayer(polyline)
	 * 	.addTo(map);
	 * ```
	 */
	
	var LayerGroup = Layer.extend({
	
		initialize: function (layers, options) {
			setOptions(this, options);
	
			this._layers = {};
	
			var i, len;
	
			if (layers) {
				for (i = 0, len = layers.length; i < len; i++) {
					this.addLayer(layers[i]);
				}
			}
		},
	
		// @method addLayer(layer: Layer): this
		// Adds the given layer to the group.
		addLayer: function (layer) {
			var id = this.getLayerId(layer);
	
			this._layers[id] = layer;
	
			if (this._map) {
				this._map.addLayer(layer);
			}
	
			return this;
		},
	
		// @method removeLayer(layer: Layer): this
		// Removes the given layer from the group.
		// @alternative
		// @method removeLayer(id: Number): this
		// Removes the layer with the given internal ID from the group.
		removeLayer: function (layer) {
			var id = layer in this._layers ? layer : this.getLayerId(layer);
	
			if (this._map && this._layers[id]) {
				this._map.removeLayer(this._layers[id]);
			}
	
			delete this._layers[id];
	
			return this;
		},
	
		// @method hasLayer(layer: Layer): Boolean
		// Returns `true` if the given layer is currently added to the group.
		// @alternative
		// @method hasLayer(id: Number): Boolean
		// Returns `true` if the given internal ID is currently added to the group.
		hasLayer: function (layer) {
			return !!layer && (layer in this._layers || this.getLayerId(layer) in this._layers);
		},
	
		// @method clearLayers(): this
		// Removes all the layers from the group.
		clearLayers: function () {
			return this.eachLayer(this.removeLayer, this);
		},
	
		// @method invoke(methodName: String, …): this
		// Calls `methodName` on every layer contained in this group, passing any
		// additional parameters. Has no effect if the layers contained do not
		// implement `methodName`.
		invoke: function (methodName) {
			var args = Array.prototype.slice.call(arguments, 1),
			    i, layer;
	
			for (i in this._layers) {
				layer = this._layers[i];
	
				if (layer[methodName]) {
					layer[methodName].apply(layer, args);
				}
			}
	
			return this;
		},
	
		onAdd: function (map) {
			this.eachLayer(map.addLayer, map);
		},
	
		onRemove: function (map) {
			this.eachLayer(map.removeLayer, map);
		},
	
		// @method eachLayer(fn: Function, context?: Object): this
		// Iterates over the layers of the group, optionally specifying context of the iterator function.
		// ```js
		// group.eachLayer(function (layer) {
		// 	layer.bindPopup('Hello');
		// });
		// ```
		eachLayer: function (method, context) {
			for (var i in this._layers) {
				method.call(context, this._layers[i]);
			}
			return this;
		},
	
		// @method getLayer(id: Number): Layer
		// Returns the layer with the given internal ID.
		getLayer: function (id) {
			return this._layers[id];
		},
	
		// @method getLayers(): Layer[]
		// Returns an array of all the layers added to the group.
		getLayers: function () {
			var layers = [];
			this.eachLayer(layers.push, layers);
			return layers;
		},
	
		// @method setZIndex(zIndex: Number): this
		// Calls `setZIndex` on every layer contained in this group, passing the z-index.
		setZIndex: function (zIndex) {
			return this.invoke('setZIndex', zIndex);
		},
	
		// @method getLayerId(layer: Layer): Number
		// Returns the internal ID for a layer
		getLayerId: function (layer) {
			return stamp(layer);
		}
	});
	
	
	// @factory L.layerGroup(layers?: Layer[], options?: Object)
	// Create a layer group, optionally given an initial set of layers and an `options` object.
	var layerGroup = function (layers, options) {
		return new LayerGroup(layers, options);
	};
	
	/*
	 * @class FeatureGroup
	 * @aka L.FeatureGroup
	 * @inherits LayerGroup
	 *
	 * Extended `LayerGroup` that makes it easier to do the same thing to all its member layers:
	 *  * [`bindPopup`](#layer-bindpopup) binds a popup to all of the layers at once (likewise with [`bindTooltip`](#layer-bindtooltip))
	 *  * Events are propagated to the `FeatureGroup`, so if the group has an event
	 * handler, it will handle events from any of the layers. This includes mouse events
	 * and custom events.
	 *  * Has `layeradd` and `layerremove` events
	 *
	 * @example
	 *
	 * ```js
	 * L.featureGroup([marker1, marker2, polyline])
	 * 	.bindPopup('Hello world!')
	 * 	.on('click', function() { alert('Clicked on a member of the group!'); })
	 * 	.addTo(map);
	 * ```
	 */
	
	var FeatureGroup = LayerGroup.extend({
	
		addLayer: function (layer) {
			if (this.hasLayer(layer)) {
				return this;
			}
	
			layer.addEventParent(this);
	
			LayerGroup.prototype.addLayer.call(this, layer);
	
			// @event layeradd: LayerEvent
			// Fired when a layer is added to this `FeatureGroup`
			return this.fire('layeradd', {layer: layer});
		},
	
		removeLayer: function (layer) {
			if (!this.hasLayer(layer)) {
				return this;
			}
			if (layer in this._layers) {
				layer = this._layers[layer];
			}
	
			layer.removeEventParent(this);
	
			LayerGroup.prototype.removeLayer.call(this, layer);
	
			// @event layerremove: LayerEvent
			// Fired when a layer is removed from this `FeatureGroup`
			return this.fire('layerremove', {layer: layer});
		},
	
		// @method setStyle(style: Path options): this
		// Sets the given path options to each layer of the group that has a `setStyle` method.
		setStyle: function (style) {
			return this.invoke('setStyle', style);
		},
	
		// @method bringToFront(): this
		// Brings the layer group to the top of all other layers
		bringToFront: function () {
			return this.invoke('bringToFront');
		},
	
		// @method bringToBack(): this
		// Brings the layer group to the back of all other layers
		bringToBack: function () {
			return this.invoke('bringToBack');
		},
	
		// @method getBounds(): LatLngBounds
		// Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
		getBounds: function () {
			var bounds = new LatLngBounds();
	
			for (var id in this._layers) {
				var layer = this._layers[id];
				bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
			}
			return bounds;
		}
	});
	
	// @factory L.featureGroup(layers: Layer[])
	// Create a feature group, optionally given an initial set of layers.
	var featureGroup = function (layers) {
		return new FeatureGroup(layers);
	};
	
	/*
	 * @class Icon
	 * @aka L.Icon
	 *
	 * Represents an icon to provide when creating a marker.
	 *
	 * @example
	 *
	 * ```js
	 * var myIcon = L.icon({
	 *     iconUrl: 'my-icon.png',
	 *     iconRetinaUrl: 'my-icon@2x.png',
	 *     iconSize: [38, 95],
	 *     iconAnchor: [22, 94],
	 *     popupAnchor: [-3, -76],
	 *     shadowUrl: 'my-icon-shadow.png',
	 *     shadowRetinaUrl: 'my-icon-shadow@2x.png',
	 *     shadowSize: [68, 95],
	 *     shadowAnchor: [22, 94]
	 * });
	 *
	 * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
	 * ```
	 *
	 * `L.Icon.Default` extends `L.Icon` and is the blue icon Leaflet uses for markers by default.
	 *
	 */
	
	var Icon = Class.extend({
	
		/* @section
		 * @aka Icon options
		 *
		 * @option iconUrl: String = null
		 * **(required)** The URL to the icon image (absolute or relative to your script path).
		 *
		 * @option iconRetinaUrl: String = null
		 * The URL to a retina sized version of the icon image (absolute or relative to your
		 * script path). Used for Retina screen devices.
		 *
		 * @option iconSize: Point = null
		 * Size of the icon image in pixels.
		 *
		 * @option iconAnchor: Point = null
		 * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
		 * will be aligned so that this point is at the marker's geographical location. Centered
		 * by default if size is specified, also can be set in CSS with negative margins.
		 *
		 * @option popupAnchor: Point = [0, 0]
		 * The coordinates of the point from which popups will "open", relative to the icon anchor.
		 *
		 * @option tooltipAnchor: Point = [0, 0]
		 * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
		 *
		 * @option shadowUrl: String = null
		 * The URL to the icon shadow image. If not specified, no shadow image will be created.
		 *
		 * @option shadowRetinaUrl: String = null
		 *
		 * @option shadowSize: Point = null
		 * Size of the shadow image in pixels.
		 *
		 * @option shadowAnchor: Point = null
		 * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
		 * as iconAnchor if not specified).
		 *
		 * @option className: String = ''
		 * A custom class name to assign to both icon and shadow images. Empty by default.
		 */
	
		options: {
			popupAnchor: [0, 0],
			tooltipAnchor: [0, 0],
		},
	
		initialize: function (options) {
			setOptions(this, options);
		},
	
		// @method createIcon(oldIcon?: HTMLElement): HTMLElement
		// Called internally when the icon has to be shown, returns a `<img>` HTML element
		// styled according to the options.
		createIcon: function (oldIcon) {
			return this._createIcon('icon', oldIcon);
		},
	
		// @method createShadow(oldIcon?: HTMLElement): HTMLElement
		// As `createIcon`, but for the shadow beneath it.
		createShadow: function (oldIcon) {
			return this._createIcon('shadow', oldIcon);
		},
	
		_createIcon: function (name, oldIcon) {
			var src = this._getIconUrl(name);
	
			if (!src) {
				if (name === 'icon') {
					throw new Error('iconUrl not set in Icon options (see the docs).');
				}
				return null;
			}
	
			var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
			this._setIconStyles(img, name);
	
			return img;
		},
	
		_setIconStyles: function (img, name) {
			var options = this.options;
			var sizeOption = options[name + 'Size'];
	
			if (typeof sizeOption === 'number') {
				sizeOption = [sizeOption, sizeOption];
			}
	
			var size = toPoint(sizeOption),
			    anchor = toPoint(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
			            size && size.divideBy(2, true));
	
			img.className = 'leaflet-marker-' + name + ' ' + (options.className || '');
	
			if (anchor) {
				img.style.marginLeft = (-anchor.x) + 'px';
				img.style.marginTop  = (-anchor.y) + 'px';
			}
	
			if (size) {
				img.style.width  = size.x + 'px';
				img.style.height = size.y + 'px';
			}
		},
	
		_createImg: function (src, el) {
			el = el || document.createElement('img');
			el.src = src;
			return el;
		},
	
		_getIconUrl: function (name) {
			return retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
		}
	});
	
	
	// @factory L.icon(options: Icon options)
	// Creates an icon instance with the given options.
	function icon(options) {
		return new Icon(options);
	}
	
	/*
	 * @miniclass Icon.Default (Icon)
	 * @aka L.Icon.Default
	 * @section
	 *
	 * A trivial subclass of `Icon`, represents the icon to use in `Marker`s when
	 * no icon is specified. Points to the blue marker image distributed with Leaflet
	 * releases.
	 *
	 * In order to customize the default icon, just change the properties of `L.Icon.Default.prototype.options`
	 * (which is a set of `Icon options`).
	 *
	 * If you want to _completely_ replace the default icon, override the
	 * `L.Marker.prototype.options.icon` with your own icon instead.
	 */
	
	var IconDefault = Icon.extend({
	
		options: {
			iconUrl:       'marker-icon.png',
			iconRetinaUrl: 'marker-icon-2x.png',
			shadowUrl:     'marker-shadow.png',
			iconSize:    [25, 41],
			iconAnchor:  [12, 41],
			popupAnchor: [1, -34],
			tooltipAnchor: [16, -28],
			shadowSize:  [41, 41]
		},
	
		_getIconUrl: function (name) {
			if (!IconDefault.imagePath) {	// Deprecated, backwards-compatibility only
				IconDefault.imagePath = this._detectIconPath();
			}
	
			// @option imagePath: String
			// `Icon.Default` will try to auto-detect the location of the
			// blue icon images. If you are placing these images in a non-standard
			// way, set this option to point to the right path.
			return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
		},
	
		_detectIconPath: function () {
			var el = create$1('div',  'leaflet-default-icon-path', document.body);
			var path = getStyle(el, 'background-image') ||
			           getStyle(el, 'backgroundImage');	// IE8
	
			document.body.removeChild(el);
	
			if (path === null || path.indexOf('url') !== 0) {
				path = '';
			} else {
				path = path.replace(/^url\(["']?/, '').replace(/marker-icon\.png["']?\)$/, '');
			}
	
			return path;
		}
	});
	
	/*
	 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
	 */
	
	
	/* @namespace Marker
	 * @section Interaction handlers
	 *
	 * Interaction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see `Handler` methods). Example:
	 *
	 * ```js
	 * marker.dragging.disable();
	 * ```
	 *
	 * @property dragging: Handler
	 * Marker dragging handler (by both mouse and touch). Only valid when the marker is on the map (Otherwise set [`marker.options.draggable`](#marker-draggable)).
	 */
	
	var MarkerDrag = Handler.extend({
		initialize: function (marker) {
			this._marker = marker;
		},
	
		addHooks: function () {
			var icon = this._marker._icon;
	
			if (!this._draggable) {
				this._draggable = new Draggable(icon, icon, true);
			}
	
			this._draggable.on({
				dragstart: this._onDragStart,
				predrag: this._onPreDrag,
				drag: this._onDrag,
				dragend: this._onDragEnd
			}, this).enable();
	
			addClass(icon, 'leaflet-marker-draggable');
		},
	
		removeHooks: function () {
			this._draggable.off({
				dragstart: this._onDragStart,
				predrag: this._onPreDrag,
				drag: this._onDrag,
				dragend: this._onDragEnd
			}, this).disable();
	
			if (this._marker._icon) {
				removeClass(this._marker._icon, 'leaflet-marker-draggable');
			}
		},
	
		moved: function () {
			return this._draggable && this._draggable._moved;
		},
	
		_adjustPan: function (e) {
			var marker = this._marker,
			    map = marker._map,
			    speed = this._marker.options.autoPanSpeed,
			    padding = this._marker.options.autoPanPadding,
			    iconPos = L.DomUtil.getPosition(marker._icon),
			    bounds = map.getPixelBounds(),
			    origin = map.getPixelOrigin();
	
			var panBounds = toBounds(
				bounds.min._subtract(origin).add(padding),
				bounds.max._subtract(origin).subtract(padding)
			);
	
			if (!panBounds.contains(iconPos)) {
				// Compute incremental movement
				var movement = toPoint(
					(Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) -
					(Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
	
					(Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) -
					(Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
				).multiplyBy(speed);
	
				map.panBy(movement, {animate: false});
	
				this._draggable._newPos._add(movement);
				this._draggable._startPos._add(movement);
	
				L.DomUtil.setPosition(marker._icon, this._draggable._newPos);
				this._onDrag(e);
	
				this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
			}
		},
	
		_onDragStart: function () {
			// @section Dragging events
			// @event dragstart: Event
			// Fired when the user starts dragging the marker.
	
			// @event movestart: Event
			// Fired when the marker starts moving (because of dragging).
	
			this._oldLatLng = this._marker.getLatLng();
			this._marker
			    .closePopup()
			    .fire('movestart')
			    .fire('dragstart');
		},
	
		_onPreDrag: function (e) {
			if (this._marker.options.autoPan) {
				cancelAnimFrame(this._panRequest);
				this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
			}
		},
	
		_onDrag: function (e) {
			var marker = this._marker,
			    shadow = marker._shadow,
			iconPos = getPosition(marker._icon),
			    latlng = marker._map.layerPointToLatLng(iconPos);
	
			// update shadow position
			if (shadow) {
				setPosition(shadow, iconPos);
			}
	
			marker._latlng = latlng;
			e.latlng = latlng;
			e.oldLatLng = this._oldLatLng;
	
			// @event drag: Event
			// Fired repeatedly while the user drags the marker.
			marker
			    .fire('move', e)
			    .fire('drag', e);
		},
	
		_onDragEnd: function (e) {
			// @event dragend: DragEndEvent
			// Fired when the user stops dragging the marker.
	
			 cancelAnimFrame(this._panRequest);
	
			// @event moveend: Event
			// Fired when the marker stops moving (because of dragging).
			delete this._oldLatLng;
			this._marker
			    .fire('moveend')
			    .fire('dragend', e);
		}
	});
	
	/*
	 * @class Marker
	 * @inherits Interactive layer
	 * @aka L.Marker
	 * L.Marker is used to display clickable/draggable icons on the map. Extends `Layer`.
	 *
	 * @example
	 *
	 * ```js
	 * L.marker([50.5, 30.5]).addTo(map);
	 * ```
	 */
	
	var Marker = Layer.extend({
	
		// @section
		// @aka Marker options
		options: {
			// @option icon: Icon = *
			// Icon instance to use for rendering the marker.
			// See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
			// If not specified, a common instance of `L.Icon.Default` is used.
			icon: new IconDefault(),
	
			// Option inherited from "Interactive layer" abstract class
			interactive: true,
	
			// @option draggable: Boolean = false
			// Whether the marker is draggable with mouse/touch or not.
			draggable: false,
	
			// @option autoPan: Boolean = false
			// Set it to `true` if you want the map to do panning animation when marker hits the edges.
			autoPan: false,
	
			// @option autoPanPadding: Point = Point(50, 50)
			// Equivalent of setting both top left and bottom right autopan padding to the same value.
			autoPanPadding: [50, 50],
	
			// @option autoPanSpeed: Number = 10
			// Number of pixels the map should move by.
			autoPanSpeed: 10,
	
			// @option keyboard: Boolean = true
			// Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
			keyboard: true,
	
			// @option title: String = ''
			// Text for the browser tooltip that appear on marker hover (no tooltip by default).
			title: '',
	
			// @option alt: String = ''
			// Text for the `alt` attribute of the icon image (useful for accessibility).
			alt: '',
	
			// @option zIndexOffset: Number = 0
			// By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
			zIndexOffset: 0,
	
			// @option opacity: Number = 1.0
			// The opacity of the marker.
			opacity: 1,
	
			// @option riseOnHover: Boolean = false
			// If `true`, the marker will get on top of others when you hover the mouse over it.
			riseOnHover: false,
	
			// @option riseOffset: Number = 250
			// The z-index offset used for the `riseOnHover` feature.
			riseOffset: 250,
	
			// @option pane: String = 'markerPane'
			// `Map pane` where the markers icon will be added.
			pane: 'markerPane',
	
			// @option bubblingMouseEvents: Boolean = false
			// When `true`, a mouse event on this marker will trigger the same event on the map
			// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
			bubblingMouseEvents: false
		},
	
		/* @section
		 *
		 * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
		 */
	
		initialize: function (latlng, options) {
			setOptions(this, options);
			this._latlng = toLatLng(latlng);
		},
	
		onAdd: function (map) {
			this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;
	
			if (this._zoomAnimated) {
				map.on('zoomanim', this._animateZoom, this);
			}
	
			this._initIcon();
			this.update();
		},
	
		onRemove: function (map) {
			if (this.dragging && this.dragging.enabled()) {
				this.options.draggable = true;
				this.dragging.removeHooks();
			}
			delete this.dragging;
	
			if (this._zoomAnimated) {
				map.off('zoomanim', this._animateZoom, this);
			}
	
			this._removeIcon();
			this._removeShadow();
		},
	
		getEvents: function () {
			return {
				zoom: this.update,
				viewreset: this.update
			};
		},
	
		// @method getLatLng: LatLng
		// Returns the current geographical position of the marker.
		getLatLng: function () {
			return this._latlng;
		},
	
		// @method setLatLng(latlng: LatLng): this
		// Changes the marker position to the given point.
		setLatLng: function (latlng) {
			var oldLatLng = this._latlng;
			this._latlng = toLatLng(latlng);
			this.update();
	
			// @event move: Event
			// Fired when the marker is moved via [`setLatLng`](#marker-setlatlng) or by [dragging](#marker-dragging). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
			return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
		},
	
		// @method setZIndexOffset(offset: Number): this
		// Changes the [zIndex offset](#marker-zindexoffset) of the marker.
		setZIndexOffset: function (offset) {
			this.options.zIndexOffset = offset;
			return this.update();
		},
	
		// @method setIcon(icon: Icon): this
		// Changes the marker icon.
		setIcon: function (icon) {
	
			this.options.icon = icon;
	
			if (this._map) {
				this._initIcon();
				this.update();
			}
	
			if (this._popup) {
				this.bindPopup(this._popup, this._popup.options);
			}
	
			return this;
		},
	
		getElement: function () {
			return this._icon;
		},
	
		update: function () {
	
			if (this._icon && this._map) {
				var pos = this._map.latLngToLayerPoint(this._latlng).round();
				this._setPos(pos);
			}
	
			return this;
		},
	
		_initIcon: function () {
			var options = this.options,
			    classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');
	
			var icon = options.icon.createIcon(this._icon),
			    addIcon = false;
	
			// if we're not reusing the icon, remove the old one and init new one
			if (icon !== this._icon) {
				if (this._icon) {
					this._removeIcon();
				}
				addIcon = true;
	
				if (options.title) {
					icon.title = options.title;
				}
	
				if (icon.tagName === 'IMG') {
					icon.alt = options.alt || '';
				}
			}
	
			addClass(icon, classToAdd);
	
			if (options.keyboard) {
				icon.tabIndex = '0';
			}
	
			this._icon = icon;
	
			if (options.riseOnHover) {
				this.on({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				});
			}
	
			var newShadow = options.icon.createShadow(this._shadow),
			    addShadow = false;
	
			if (newShadow !== this._shadow) {
				this._removeShadow();
				addShadow = true;
			}
	
			if (newShadow) {
				addClass(newShadow, classToAdd);
				newShadow.alt = '';
			}
			this._shadow = newShadow;
	
	
			if (options.opacity < 1) {
				this._updateOpacity();
			}
	
	
			if (addIcon) {
				this.getPane().appendChild(this._icon);
			}
			this._initInteraction();
			if (newShadow && addShadow) {
				this.getPane('shadowPane').appendChild(this._shadow);
			}
		},
	
		_removeIcon: function () {
			if (this.options.riseOnHover) {
				this.off({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				});
			}
	
			remove(this._icon);
			this.removeInteractiveTarget(this._icon);
	
			this._icon = null;
		},
	
		_removeShadow: function () {
			if (this._shadow) {
				remove(this._shadow);
			}
			this._shadow = null;
		},
	
		_setPos: function (pos) {
			setPosition(this._icon, pos);
	
			if (this._shadow) {
				setPosition(this._shadow, pos);
			}
	
			this._zIndex = pos.y + this.options.zIndexOffset;
	
			this._resetZIndex();
		},
	
		_updateZIndex: function (offset) {
			this._icon.style.zIndex = this._zIndex + offset;
		},
	
		_animateZoom: function (opt) {
			var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
	
			this._setPos(pos);
		},
	
		_initInteraction: function () {
	
			if (!this.options.interactive) { return; }
	
			addClass(this._icon, 'leaflet-interactive');
	
			this.addInteractiveTarget(this._icon);
	
			if (MarkerDrag) {
				var draggable = this.options.draggable;
				if (this.dragging) {
					draggable = this.dragging.enabled();
					this.dragging.disable();
				}
	
				this.dragging = new MarkerDrag(this);
	
				if (draggable) {
					this.dragging.enable();
				}
			}
		},
	
		// @method setOpacity(opacity: Number): this
		// Changes the opacity of the marker.
		setOpacity: function (opacity) {
			this.options.opacity = opacity;
			if (this._map) {
				this._updateOpacity();
			}
	
			return this;
		},
	
		_updateOpacity: function () {
			var opacity = this.options.opacity;
	
			setOpacity(this._icon, opacity);
	
			if (this._shadow) {
				setOpacity(this._shadow, opacity);
			}
		},
	
		_bringToFront: function () {
			this._updateZIndex(this.options.riseOffset);
		},
	
		_resetZIndex: function () {
			this._updateZIndex(0);
		},
	
		_getPopupAnchor: function () {
			return this.options.icon.options.popupAnchor;
		},
	
		_getTooltipAnchor: function () {
			return this.options.icon.options.tooltipAnchor;
		}
	});
	
	
	// factory L.marker(latlng: LatLng, options? : Marker options)
	
	// @factory L.marker(latlng: LatLng, options? : Marker options)
	// Instantiates a Marker object given a geographical point and optionally an options object.
	function marker(latlng, options) {
		return new Marker(latlng, options);
	}
	
	/*
	 * @class Path
	 * @aka L.Path
	 * @inherits Interactive layer
	 *
	 * An abstract class that contains options and constants shared between vector
	 * overlays (Polygon, Polyline, Circle). Do not use it directly. Extends `Layer`.
	 */
	
	var Path = Layer.extend({
	
		// @section
		// @aka Path options
		options: {
			// @option stroke: Boolean = true
			// Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
			stroke: true,
	
			// @option color: String = '#3388ff'
			// Stroke color
			color: '#3388ff',
	
			// @option weight: Number = 3
			// Stroke width in pixels
			weight: 3,
	
			// @option opacity: Number = 1.0
			// Stroke opacity
			opacity: 1,
	
			// @option lineCap: String= 'round'
			// A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
			lineCap: 'round',
	
			// @option lineJoin: String = 'round'
			// A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
			lineJoin: 'round',
	
			// @option dashArray: String = null
			// A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
			dashArray: null,
	
			// @option dashOffset: String = null
			// A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
			dashOffset: null,
	
			// @option fill: Boolean = depends
			// Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
			fill: false,
	
			// @option fillColor: String = *
			// Fill color. Defaults to the value of the [`color`](#path-color) option
			fillColor: null,
	
			// @option fillOpacity: Number = 0.2
			// Fill opacity.
			fillOpacity: 0.2,
	
			// @option fillRule: String = 'evenodd'
			// A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
			fillRule: 'evenodd',
	
			// className: '',
	
			// Option inherited from "Interactive layer" abstract class
			interactive: true,
	
			// @option bubblingMouseEvents: Boolean = true
			// When `true`, a mouse event on this path will trigger the same event on the map
			// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
			bubblingMouseEvents: true
		},
	
		beforeAdd: function (map) {
			// Renderer is set here because we need to call renderer.getEvents
			// before this.getEvents.
			this._renderer = map.getRenderer(this);
		},
	
		onAdd: function () {
			this._renderer._initPath(this);
			this._reset();
			this._renderer._addPath(this);
		},
	
		onRemove: function () {
			this._renderer._removePath(this);
		},
	
		// @method redraw(): this
		// Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
		redraw: function () {
			if (this._map) {
				this._renderer._updatePath(this);
			}
			return this;
		},
	
		// @method setStyle(style: Path options): this
		// Changes the appearance of a Path based on the options in the `Path options` object.
		setStyle: function (style) {
			setOptions(this, style);
			if (this._renderer) {
				this._renderer._updateStyle(this);
			}
			return this;
		},
	
		// @method bringToFront(): this
		// Brings the layer to the top of all path layers.
		bringToFront: function () {
			if (this._renderer) {
				this._renderer._bringToFront(this);
			}
			return this;
		},
	
		// @method bringToBack(): this
		// Brings the layer to the bottom of all path layers.
		bringToBack: function () {
			if (this._renderer) {
				this._renderer._bringToBack(this);
			}
			return this;
		},
	
		getElement: function () {
			return this._path;
		},
	
		_reset: function () {
			// defined in child classes
			this._project();
			this._update();
		},
	
		_clickTolerance: function () {
			// used when doing hit detection for Canvas layers
			return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance;
		}
	});
	
	/*
	 * @class CircleMarker
	 * @aka L.CircleMarker
	 * @inherits Path
	 *
	 * A circle of a fixed size with radius specified in pixels. Extends `Path`.
	 */
	
	var CircleMarker = Path.extend({
	
		// @section
		// @aka CircleMarker options
		options: {
			fill: true,
	
			// @option radius: Number = 10
			// Radius of the circle marker, in pixels
			radius: 10
		},
	
		initialize: function (latlng, options) {
			setOptions(this, options);
			this._latlng = toLatLng(latlng);
			this._radius = this.options.radius;
		},
	
		// @method setLatLng(latLng: LatLng): this
		// Sets the position of a circle marker to a new location.
		setLatLng: function (latlng) {
			this._latlng = toLatLng(latlng);
			this.redraw();
			return this.fire('move', {latlng: this._latlng});
		},
	
		// @method getLatLng(): LatLng
		// Returns the current geographical position of the circle marker
		getLatLng: function () {
			return this._latlng;
		},
	
		// @method setRadius(radius: Number): this
		// Sets the radius of a circle marker. Units are in pixels.
		setRadius: function (radius) {
			this.options.radius = this._radius = radius;
			return this.redraw();
		},
	
		// @method getRadius(): Number
		// Returns the current radius of the circle
		getRadius: function () {
			return this._radius;
		},
	
		setStyle : function (options) {
			var radius = options && options.radius || this._radius;
			Path.prototype.setStyle.call(this, options);
			this.setRadius(radius);
			return this;
		},
	
		_project: function () {
			this._point = this._map.latLngToLayerPoint(this._latlng);
			this._updateBounds();
		},
	
		_updateBounds: function () {
			var r = this._radius,
			    r2 = this._radiusY || r,
			    w = this._clickTolerance(),
			    p = [r + w, r2 + w];
			this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
		},
	
		_update: function () {
			if (this._map) {
				this._updatePath();
			}
		},
	
		_updatePath: function () {
			this._renderer._updateCircle(this);
		},
	
		_empty: function () {
			return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
		},
	
		// Needed by the `Canvas` renderer for interactivity
		_containsPoint: function (p) {
			return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
		}
	});
	
	
	// @factory L.circleMarker(latlng: LatLng, options?: CircleMarker options)
	// Instantiates a circle marker object given a geographical point, and an optional options object.
	function circleMarker(latlng, options) {
		return new CircleMarker(latlng, options);
	}
	
	/*
	 * @class Circle
	 * @aka L.Circle
	 * @inherits CircleMarker
	 *
	 * A class for drawing circle overlays on a map. Extends `CircleMarker`.
	 *
	 * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).
	 *
	 * @example
	 *
	 * ```js
	 * L.circle([50.5, 30.5], {radius: 200}).addTo(map);
	 * ```
	 */
	
	var Circle = CircleMarker.extend({
	
		initialize: function (latlng, options, legacyOptions) {
			if (typeof options === 'number') {
				// Backwards compatibility with 0.7.x factory (latlng, radius, options?)
				options = extend({}, legacyOptions, {radius: options});
			}
			setOptions(this, options);
			this._latlng = toLatLng(latlng);
	
			if (isNaN(this.options.radius)) { throw new Error('Circle radius cannot be NaN'); }
	
			// @section
			// @aka Circle options
			// @option radius: Number; Radius of the circle, in meters.
			this._mRadius = this.options.radius;
		},
	
		// @method setRadius(radius: Number): this
		// Sets the radius of a circle. Units are in meters.
		setRadius: function (radius) {
			this._mRadius = radius;
			return this.redraw();
		},
	
		// @method getRadius(): Number
		// Returns the current radius of a circle. Units are in meters.
		getRadius: function () {
			return this._mRadius;
		},
	
		// @method getBounds(): LatLngBounds
		// Returns the `LatLngBounds` of the path.
		getBounds: function () {
			var half = [this._radius, this._radiusY || this._radius];
	
			return new LatLngBounds(
				this._map.layerPointToLatLng(this._point.subtract(half)),
				this._map.layerPointToLatLng(this._point.add(half)));
		},
	
		setStyle: Path.prototype.setStyle,
	
		_project: function () {
	
			var lng = this._latlng.lng,
			    lat = this._latlng.lat,
			    map = this._map,
			    crs = map.options.crs;
	
			if (crs.distance === Earth.distance) {
				var d = Math.PI / 180,
				    latR = (this._mRadius / Earth.R) / d,
				    top = map.project([lat + latR, lng]),
				    bottom = map.project([lat - latR, lng]),
				    p = top.add(bottom).divideBy(2),
				    lat2 = map.unproject(p).lat,
				    lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
				            (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
	
				if (isNaN(lngR) || lngR === 0) {
					lngR = latR / Math.cos(Math.PI / 180 * lat); // Fallback for edge case, #2425
				}
	
				this._point = p.subtract(map.getPixelOrigin());
				this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
				this._radiusY = p.y - top.y;
	
			} else {
				var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
	
				this._point = map.latLngToLayerPoint(this._latlng);
				this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
			}
	
			this._updateBounds();
		}
	});
	
	// @factory L.circle(latlng: LatLng, options?: Circle options)
	// Instantiates a circle object given a geographical point, and an options object
	// which contains the circle radius.
	// @alternative
	// @factory L.circle(latlng: LatLng, radius: Number, options?: Circle options)
	// Obsolete way of instantiating a circle, for compatibility with 0.7.x code.
	// Do not use in new applications or plugins.
	function circle(latlng, options, legacyOptions) {
		return new Circle(latlng, options, legacyOptions);
	}
	
	/*
	 * @class Polyline
	 * @aka L.Polyline
	 * @inherits Path
	 *
	 * A class for drawing polyline overlays on a map. Extends `Path`.
	 *
	 * @example
	 *
	 * ```js
	 * // create a red polyline from an array of LatLng points
	 * var latlngs = [
	 * 	[45.51, -122.68],
	 * 	[37.77, -122.43],
	 * 	[34.04, -118.2]
	 * ];
	 *
	 * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
	 *
	 * // zoom the map to the polyline
	 * map.fitBounds(polyline.getBounds());
	 * ```
	 *
	 * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
	 *
	 * ```js
	 * // create a red polyline from an array of arrays of LatLng points
	 * var latlngs = [
	 * 	[[45.51, -122.68],
	 * 	 [37.77, -122.43],
	 * 	 [34.04, -118.2]],
	 * 	[[40.78, -73.91],
	 * 	 [41.83, -87.62],
	 * 	 [32.76, -96.72]]
	 * ];
	 * ```
	 */
	
	
	var Polyline = Path.extend({
	
		// @section
		// @aka Polyline options
		options: {
			// @option smoothFactor: Number = 1.0
			// How much to simplify the polyline on each zoom level. More means
			// better performance and smoother look, and less means more accurate representation.
			smoothFactor: 1.0,
	
			// @option noClip: Boolean = false
			// Disable polyline clipping.
			noClip: false
		},
	
		initialize: function (latlngs, options) {
			setOptions(this, options);
			this._setLatLngs(latlngs);
		},
	
		// @method getLatLngs(): LatLng[]
		// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
		getLatLngs: function () {
			return this._latlngs;
		},
	
		// @method setLatLngs(latlngs: LatLng[]): this
		// Replaces all the points in the polyline with the given array of geographical points.
		setLatLngs: function (latlngs) {
			this._setLatLngs(latlngs);
			return this.redraw();
		},
	
		// @method isEmpty(): Boolean
		// Returns `true` if the Polyline has no LatLngs.
		isEmpty: function () {
			return !this._latlngs.length;
		},
	
		// @method closestLayerPoint: Point
		// Returns the point closest to `p` on the Polyline.
		closestLayerPoint: function (p) {
			var minDistance = Infinity,
			    minPoint = null,
			    closest = _sqClosestPointOnSegment,
			    p1, p2;
	
			for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
				var points = this._parts[j];
	
				for (var i = 1, len = points.length; i < len; i++) {
					p1 = points[i - 1];
					p2 = points[i];
	
					var sqDist = closest(p, p1, p2, true);
	
					if (sqDist < minDistance) {
						minDistance = sqDist;
						minPoint = closest(p, p1, p2);
					}
				}
			}
			if (minPoint) {
				minPoint.distance = Math.sqrt(minDistance);
			}
			return minPoint;
		},
	
		// @method getCenter(): LatLng
		// Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the polyline.
		getCenter: function () {
			// throws error when not yet added to map as this center calculation requires projected coordinates
			if (!this._map) {
				throw new Error('Must add layer to map before using getCenter()');
			}
	
			var i, halfDist, segDist, dist, p1, p2, ratio,
			    points = this._rings[0],
			    len = points.length;
	
			if (!len) { return null; }
	
			// polyline centroid algorithm; only uses the first ring if there are multiple
	
			for (i = 0, halfDist = 0; i < len - 1; i++) {
				halfDist += points[i].distanceTo(points[i + 1]) / 2;
			}
	
			// The line is so small in the current view that all points are on the same pixel.
			if (halfDist === 0) {
				return this._map.layerPointToLatLng(points[0]);
			}
	
			for (i = 0, dist = 0; i < len - 1; i++) {
				p1 = points[i];
				p2 = points[i + 1];
				segDist = p1.distanceTo(p2);
				dist += segDist;
	
				if (dist > halfDist) {
					ratio = (dist - halfDist) / segDist;
					return this._map.layerPointToLatLng([
						p2.x - ratio * (p2.x - p1.x),
						p2.y - ratio * (p2.y - p1.y)
					]);
				}
			}
		},
	
		// @method getBounds(): LatLngBounds
		// Returns the `LatLngBounds` of the path.
		getBounds: function () {
			return this._bounds;
		},
	
		// @method addLatLng(latlng: LatLng, latlngs? LatLng[]): this
		// Adds a given point to the polyline. By default, adds to the first ring of
		// the polyline in case of a multi-polyline, but can be overridden by passing
		// a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
		addLatLng: function (latlng, latlngs) {
			latlngs = latlngs || this._defaultShape();
			latlng = toLatLng(latlng);
			latlngs.push(latlng);
			this._bounds.extend(latlng);
			return this.redraw();
		},
	
		_setLatLngs: function (latlngs) {
			this._bounds = new LatLngBounds();
			this._latlngs = this._convertLatLngs(latlngs);
		},
	
		_defaultShape: function () {
			return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
		},
	
		// recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
		_convertLatLngs: function (latlngs) {
			var result = [],
			    flat = isFlat(latlngs);
	
			for (var i = 0, len = latlngs.length; i < len; i++) {
				if (flat) {
					result[i] = toLatLng(latlngs[i]);
					this._bounds.extend(result[i]);
				} else {
					result[i] = this._convertLatLngs(latlngs[i]);
				}
			}
	
			return result;
		},
	
		_project: function () {
			var pxBounds = new Bounds();
			this._rings = [];
			this._projectLatlngs(this._latlngs, this._rings, pxBounds);
	
			var w = this._clickTolerance(),
			    p = new Point(w, w);
	
			if (this._bounds.isValid() && pxBounds.isValid()) {
				pxBounds.min._subtract(p);
				pxBounds.max._add(p);
				this._pxBounds = pxBounds;
			}
		},
	
		// recursively turns latlngs into a set of rings with projected coordinates
		_projectLatlngs: function (latlngs, result, projectedBounds) {
			var flat = latlngs[0] instanceof LatLng,
			    len = latlngs.length,
			    i, ring;
	
			if (flat) {
				ring = [];
				for (i = 0; i < len; i++) {
					ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
					projectedBounds.extend(ring[i]);
				}
				result.push(ring);
			} else {
				for (i = 0; i < len; i++) {
					this._projectLatlngs(latlngs[i], result, projectedBounds);
				}
			}
		},
	
		// clip polyline by renderer bounds so that we have less to render for performance
		_clipPoints: function () {
			var bounds = this._renderer._bounds;
	
			this._parts = [];
			if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
				return;
			}
	
			if (this.options.noClip) {
				this._parts = this._rings;
				return;
			}
	
			var parts = this._parts,
			    i, j, k, len, len2, segment, points;
	
			for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
				points = this._rings[i];
	
				for (j = 0, len2 = points.length; j < len2 - 1; j++) {
					segment = clipSegment(points[j], points[j + 1], bounds, j, true);
	
					if (!segment) { continue; }
	
					parts[k] = parts[k] || [];
					parts[k].push(segment[0]);
	
					// if segment goes out of screen, or it's the last one, it's the end of the line part
					if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
						parts[k].push(segment[1]);
						k++;
					}
				}
			}
		},
	
		// simplify each clipped part of the polyline for performance
		_simplifyPoints: function () {
			var parts = this._parts,
			    tolerance = this.options.smoothFactor;
	
			for (var i = 0, len = parts.length; i < len; i++) {
				parts[i] = simplify(parts[i], tolerance);
			}
		},
	
		_update: function () {
			if (!this._map) { return; }
	
			this._clipPoints();
			this._simplifyPoints();
			this._updatePath();
		},
	
		_updatePath: function () {
			this._renderer._updatePoly(this);
		},
	
		// Needed by the `Canvas` renderer for interactivity
		_containsPoint: function (p, closed) {
			var i, j, k, len, len2, part,
			    w = this._clickTolerance();
	
			if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }
	
			// hit detection for polylines
			for (i = 0, len = this._parts.length; i < len; i++) {
				part = this._parts[i];
	
				for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
					if (!closed && (j === 0)) { continue; }
	
					if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
						return true;
					}
				}
			}
			return false;
		}
	});
	
	// @factory L.polyline(latlngs: LatLng[], options?: Polyline options)
	// Instantiates a polyline object given an array of geographical points and
	// optionally an options object. You can create a `Polyline` object with
	// multiple separate lines (`MultiPolyline`) by passing an array of arrays
	// of geographic points.
	function polyline(latlngs, options) {
		return new Polyline(latlngs, options);
	}
	
	// Retrocompat. Allow plugins to support Leaflet versions before and after 1.1.
	Polyline._flat = _flat;
	
	/*
	 * @class Polygon
	 * @aka L.Polygon
	 * @inherits Polyline
	 *
	 * A class for drawing polygon overlays on a map. Extends `Polyline`.
	 *
	 * Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.
	 *
	 *
	 * @example
	 *
	 * ```js
	 * // create a red polygon from an array of LatLng points
	 * var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
	 *
	 * var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
	 *
	 * // zoom the map to the polygon
	 * map.fitBounds(polygon.getBounds());
	 * ```
	 *
	 * You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape:
	 *
	 * ```js
	 * var latlngs = [
	 *   [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
	 *   [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
	 * ];
	 * ```
	 *
	 * Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.
	 *
	 * ```js
	 * var latlngs = [
	 *   [ // first polygon
	 *     [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
	 *     [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
	 *   ],
	 *   [ // second polygon
	 *     [[41, -111.03],[45, -111.04],[45, -104.05],[41, -104.05]]
	 *   ]
	 * ];
	 * ```
	 */
	
	var Polygon = Polyline.extend({
	
		options: {
			fill: true
		},
	
		isEmpty: function () {
			return !this._latlngs.length || !this._latlngs[0].length;
		},
	
		getCenter: function () {
			// throws error when not yet added to map as this center calculation requires projected coordinates
			if (!this._map) {
				throw new Error('Must add layer to map before using getCenter()');
			}
	
			var i, j, p1, p2, f, area, x, y, center,
			    points = this._rings[0],
			    len = points.length;
	
			if (!len) { return null; }
	
			// polygon centroid algorithm; only uses the first ring if there are multiple
	
			area = x = y = 0;
	
			for (i = 0, j = len - 1; i < len; j = i++) {
				p1 = points[i];
				p2 = points[j];
	
				f = p1.y * p2.x - p2.y * p1.x;
				x += (p1.x + p2.x) * f;
				y += (p1.y + p2.y) * f;
				area += f * 3;
			}
	
			if (area === 0) {
				// Polygon is so small that all points are on same pixel.
				center = points[0];
			} else {
				center = [x / area, y / area];
			}
			return this._map.layerPointToLatLng(center);
		},
	
		_convertLatLngs: function (latlngs) {
			var result = Polyline.prototype._convertLatLngs.call(this, latlngs),
			    len = result.length;
	
			// remove last point if it equals first one
			if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
				result.pop();
			}
			return result;
		},
	
		_setLatLngs: function (latlngs) {
			Polyline.prototype._setLatLngs.call(this, latlngs);
			if (isFlat(this._latlngs)) {
				this._latlngs = [this._latlngs];
			}
		},
	
		_defaultShape: function () {
			return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
		},
	
		_clipPoints: function () {
			// polygons need a different clipping algorithm so we redefine that
	
			var bounds = this._renderer._bounds,
			    w = this.options.weight,
			    p = new Point(w, w);
	
			// increase clip padding by stroke width to avoid stroke on clip edges
			bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
	
			this._parts = [];
			if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
				return;
			}
	
			if (this.options.noClip) {
				this._parts = this._rings;
				return;
			}
	
			for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
				clipped = clipPolygon(this._rings[i], bounds, true);
				if (clipped.length) {
					this._parts.push(clipped);
				}
			}
		},
	
		_updatePath: function () {
			this._renderer._updatePoly(this, true);
		},
	
		// Needed by the `Canvas` renderer for interactivity
		_containsPoint: function (p) {
			var inside = false,
			    part, p1, p2, i, j, k, len, len2;
	
			if (!this._pxBounds.contains(p)) { return false; }
	
			// ray casting algorithm for detecting if point is in polygon
			for (i = 0, len = this._parts.length; i < len; i++) {
				part = this._parts[i];
	
				for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
					p1 = part[j];
					p2 = part[k];
	
					if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
						inside = !inside;
					}
				}
			}
	
			// also check if it's on polygon stroke
			return inside || Polyline.prototype._containsPoint.call(this, p, true);
		}
	
	});
	
	
	// @factory L.polygon(latlngs: LatLng[], options?: Polyline options)
	function polygon(latlngs, options) {
		return new Polygon(latlngs, options);
	}
	
	/*
	 * @class GeoJSON
	 * @aka L.GeoJSON
	 * @inherits FeatureGroup
	 *
	 * Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse
	 * GeoJSON data and display it on the map. Extends `FeatureGroup`.
	 *
	 * @example
	 *
	 * ```js
	 * L.geoJSON(data, {
	 * 	style: function (feature) {
	 * 		return {color: feature.properties.color};
	 * 	}
	 * }).bindPopup(function (layer) {
	 * 	return layer.feature.properties.description;
	 * }).addTo(map);
	 * ```
	 */
	
	var GeoJSON = FeatureGroup.extend({
	
		/* @section
		 * @aka GeoJSON options
		 *
		 * @option pointToLayer: Function = *
		 * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
		 * called when data is added, passing the GeoJSON point feature and its `LatLng`.
		 * The default is to spawn a default `Marker`:
		 * ```js
		 * function(geoJsonPoint, latlng) {
		 * 	return L.marker(latlng);
		 * }
		 * ```
		 *
		 * @option style: Function = *
		 * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
		 * called internally when data is added.
		 * The default value is to not override any defaults:
		 * ```js
		 * function (geoJsonFeature) {
		 * 	return {}
		 * }
		 * ```
		 *
		 * @option onEachFeature: Function = *
		 * A `Function` that will be called once for each created `Feature`, after it has
		 * been created and styled. Useful for attaching events and popups to features.
		 * The default is to do nothing with the newly created layers:
		 * ```js
		 * function (feature, layer) {}
		 * ```
		 *
		 * @option filter: Function = *
		 * A `Function` that will be used to decide whether to include a feature or not.
		 * The default is to include all features:
		 * ```js
		 * function (geoJsonFeature) {
		 * 	return true;
		 * }
		 * ```
		 * Note: dynamically changing the `filter` option will have effect only on newly
		 * added data. It will _not_ re-evaluate already included features.
		 *
		 * @option coordsToLatLng: Function = *
		 * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
		 * The default is the `coordsToLatLng` static method.
		 */
	
		initialize: function (geojson, options) {
			setOptions(this, options);
	
			this._layers = {};
	
			if (geojson) {
				this.addData(geojson);
			}
		},
	
		// @method addData( <GeoJSON> data ): this
		// Adds a GeoJSON object to the layer.
		addData: function (geojson) {
			var features = isArray(geojson) ? geojson : geojson.features,
			    i, len, feature;
	
			if (features) {
				for (i = 0, len = features.length; i < len; i++) {
					// only add this if geometry or geometries are set and not null
					feature = features[i];
					if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
						this.addData(feature);
					}
				}
				return this;
			}
	
			var options = this.options;
	
			if (options.filter && !options.filter(geojson)) { return this; }
	
			var layer = geometryToLayer(geojson, options);
			if (!layer) {
				return this;
			}
			layer.feature = asFeature(geojson);
	
			layer.defaultOptions = layer.options;
			this.resetStyle(layer);
	
			if (options.onEachFeature) {
				options.onEachFeature(geojson, layer);
			}
	
			return this.addLayer(layer);
		},
	
		// @method resetStyle( <Path> layer ): this
		// Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
		resetStyle: function (layer) {
			// reset any custom styles
			layer.options = extend({}, layer.defaultOptions);
			this._setLayerStyle(layer, this.options.style);
			return this;
		},
	
		// @method setStyle( <Function> style ): this
		// Changes styles of GeoJSON vector layers with the given style function.
		setStyle: function (style) {
			return this.eachLayer(function (layer) {
				this._setLayerStyle(layer, style);
			}, this);
		},
	
		_setLayerStyle: function (layer, style) {
			if (typeof style === 'function') {
				style = style(layer.feature);
			}
			if (layer.setStyle) {
				layer.setStyle(style);
			}
		}
	});
	
	// @section
	// There are several static functions which can be called without instantiating L.GeoJSON:
	
	// @function geometryToLayer(featureData: Object, options?: GeoJSON options): Layer
	// Creates a `Layer` from a given GeoJSON feature. Can use a custom
	// [`pointToLayer`](#geojson-pointtolayer) and/or [`coordsToLatLng`](#geojson-coordstolatlng)
	// functions if provided as options.
	function geometryToLayer(geojson, options) {
	
		var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
		    coords = geometry ? geometry.coordinates : null,
		    layers = [],
		    pointToLayer = options && options.pointToLayer,
		    _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng,
		    latlng, latlngs, i, len;
	
		if (!coords && !geometry) {
			return null;
		}
	
		switch (geometry.type) {
		case 'Point':
			latlng = _coordsToLatLng(coords);
			return pointToLayer ? pointToLayer(geojson, latlng) : new Marker(latlng);
	
		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = _coordsToLatLng(coords[i]);
				layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new Marker(latlng));
			}
			return new FeatureGroup(layers);
	
		case 'LineString':
		case 'MultiLineString':
			latlngs = coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, _coordsToLatLng);
			return new Polyline(latlngs, options);
	
		case 'Polygon':
		case 'MultiPolygon':
			latlngs = coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, _coordsToLatLng);
			return new Polygon(latlngs, options);
	
		case 'GeometryCollection':
			for (i = 0, len = geometry.geometries.length; i < len; i++) {
				var layer = geometryToLayer({
					geometry: geometry.geometries[i],
					type: 'Feature',
					properties: geojson.properties
				}, options);
	
				if (layer) {
					layers.push(layer);
				}
			}
			return new FeatureGroup(layers);
	
		default:
			throw new Error('Invalid GeoJSON object.');
		}
	}
	
	// @function coordsToLatLng(coords: Array): LatLng
	// Creates a `LatLng` object from an array of 2 numbers (longitude, latitude)
	// or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.
	function coordsToLatLng(coords) {
		return new LatLng(coords[1], coords[0], coords[2]);
	}
	
	// @function coordsToLatLngs(coords: Array, levelsDeep?: Number, coordsToLatLng?: Function): Array
	// Creates a multidimensional array of `LatLng`s from a GeoJSON coordinates array.
	// `levelsDeep` specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default).
	// Can use a custom [`coordsToLatLng`](#geojson-coordstolatlng) function.
	function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
		var latlngs = [];
	
		for (var i = 0, len = coords.length, latlng; i < len; i++) {
			latlng = levelsDeep ?
				coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) :
				(_coordsToLatLng || coordsToLatLng)(coords[i]);
	
			latlngs.push(latlng);
		}
	
		return latlngs;
	}
	
	// @function latLngToCoords(latlng: LatLng, precision?: Number): Array
	// Reverse of [`coordsToLatLng`](#geojson-coordstolatlng)
	function latLngToCoords(latlng, precision) {
		precision = typeof precision === 'number' ? precision : 6;
		return latlng.alt !== undefined ?
			[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] :
			[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
	}
	
	// @function latLngsToCoords(latlngs: Array, levelsDeep?: Number, closed?: Boolean): Array
	// Reverse of [`coordsToLatLngs`](#geojson-coordstolatlngs)
	// `closed` determines whether the first point should be appended to the end of the array to close the feature, only used when `levelsDeep` is 0. False by default.
	function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
		var coords = [];
	
		for (var i = 0, len = latlngs.length; i < len; i++) {
			coords.push(levelsDeep ?
				latLngsToCoords(latlngs[i], levelsDeep - 1, closed, precision) :
				latLngToCoords(latlngs[i], precision));
		}
	
		if (!levelsDeep && closed) {
			coords.push(coords[0]);
		}
	
		return coords;
	}
	
	function getFeature(layer, newGeometry) {
		return layer.feature ?
			extend({}, layer.feature, {geometry: newGeometry}) :
			asFeature(newGeometry);
	}
	
	// @function asFeature(geojson: Object): Object
	// Normalize GeoJSON geometries/features into GeoJSON features.
	function asFeature(geojson) {
		if (geojson.type === 'Feature' || geojson.type === 'FeatureCollection') {
			return geojson;
		}
	
		return {
			type: 'Feature',
			properties: {},
			geometry: geojson
		};
	}
	
	var PointToGeoJSON = {
		toGeoJSON: function (precision) {
			return getFeature(this, {
				type: 'Point',
				coordinates: latLngToCoords(this.getLatLng(), precision)
			});
		}
	};
	
	// @namespace Marker
	// @method toGeoJSON(): Object
	// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the marker (as a GeoJSON `Point` Feature).
	Marker.include(PointToGeoJSON);
	
	// @namespace CircleMarker
	// @method toGeoJSON(): Object
	// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the circle marker (as a GeoJSON `Point` Feature).
	Circle.include(PointToGeoJSON);
	CircleMarker.include(PointToGeoJSON);
	
	
	// @namespace Polyline
	// @method toGeoJSON(): Object
	// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the polyline (as a GeoJSON `LineString` or `MultiLineString` Feature).
	Polyline.include({
		toGeoJSON: function (precision) {
			var multi = !isFlat(this._latlngs);
	
			var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
	
			return getFeature(this, {
				type: (multi ? 'Multi' : '') + 'LineString',
				coordinates: coords
			});
		}
	});
	
	// @namespace Polygon
	// @method toGeoJSON(): Object
	// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the polygon (as a GeoJSON `Polygon` or `MultiPolygon` Feature).
	Polygon.include({
		toGeoJSON: function (precision) {
			var holes = !isFlat(this._latlngs),
			    multi = holes && !isFlat(this._latlngs[0]);
	
			var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
	
			if (!holes) {
				coords = [coords];
			}
	
			return getFeature(this, {
				type: (multi ? 'Multi' : '') + 'Polygon',
				coordinates: coords
			});
		}
	});
	
	
	// @namespace LayerGroup
	LayerGroup.include({
		toMultiPoint: function (precision) {
			var coords = [];
	
			this.eachLayer(function (layer) {
				coords.push(layer.toGeoJSON(precision).geometry.coordinates);
			});
	
			return getFeature(this, {
				type: 'MultiPoint',
				coordinates: coords
			});
		},
	
		// @method toGeoJSON(): Object
		// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
		toGeoJSON: function (precision) {
	
			var type = this.feature && this.feature.geometry && this.feature.geometry.type;
	
			if (type === 'MultiPoint') {
				return this.toMultiPoint(precision);
			}
	
			var isGeometryCollection = type === 'GeometryCollection',
			    jsons = [];
	
			this.eachLayer(function (layer) {
				if (layer.toGeoJSON) {
					var json = layer.toGeoJSON(precision);
					if (isGeometryCollection) {
						jsons.push(json.geometry);
					} else {
						var feature = asFeature(json);
						// Squash nested feature collections
						if (feature.type === 'FeatureCollection') {
							jsons.push.apply(jsons, feature.features);
						} else {
							jsons.push(feature);
						}
					}
				}
			});
	
			if (isGeometryCollection) {
				return getFeature(this, {
					geometries: jsons,
					type: 'GeometryCollection'
				});
			}
	
			return {
				type: 'FeatureCollection',
				features: jsons
			};
		}
	});
	
	// @namespace GeoJSON
	// @factory L.geoJSON(geojson?: Object, options?: GeoJSON options)
	// Creates a GeoJSON layer. Optionally accepts an object in
	// [GeoJSON format](http://geojson.org/geojson-spec.html) to display on the map
	// (you can alternatively add it later with `addData` method) and an `options` object.
	function geoJSON(geojson, options) {
		return new GeoJSON(geojson, options);
	}
	
	// Backward compatibility.
	var geoJson = geoJSON;
	
	/*
	 * @class ImageOverlay
	 * @aka L.ImageOverlay
	 * @inherits Interactive layer
	 *
	 * Used to load and display a single image over specific bounds of the map. Extends `Layer`.
	 *
	 * @example
	 *
	 * ```js
	 * var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
	 * 	imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
	 * L.imageOverlay(imageUrl, imageBounds).addTo(map);
	 * ```
	 */
	
	var ImageOverlay = Layer.extend({
	
		// @section
		// @aka ImageOverlay options
		options: {
			// @option opacity: Number = 1.0
			// The opacity of the image overlay.
			opacity: 1,
	
			// @option alt: String = ''
			// Text for the `alt` attribute of the image (useful for accessibility).
			alt: '',
	
			// @option interactive: Boolean = false
			// If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
			interactive: false,
	
			// @option crossOrigin: Boolean = false
			// If true, the image will have its crossOrigin attribute set to ''. This is needed if you want to access image pixel data.
			crossOrigin: false,
	
			// @option errorOverlayUrl: String = ''
			// URL to the overlay image to show in place of the overlay that failed to load.
			errorOverlayUrl: '',
	
			// @option zIndex: Number = 1
			// The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the tile layer.
			zIndex: 1,
	
			// @option className: String = ''
			// A custom class name to assign to the image. Empty by default.
			className: '',
		},
	
		initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
			this._url = url;
			this._bounds = toLatLngBounds(bounds);
	
			setOptions(this, options);
		},
	
		onAdd: function () {
			if (!this._image) {
				this._initImage();
	
				if (this.options.opacity < 1) {
					this._updateOpacity();
				}
			}
	
			if (this.options.interactive) {
				addClass(this._image, 'leaflet-interactive');
				this.addInteractiveTarget(this._image);
			}
	
			this.getPane().appendChild(this._image);
			this._reset();
		},
	
		onRemove: function () {
			remove(this._image);
			if (this.options.interactive) {
				this.removeInteractiveTarget(this._image);
			}
		},
	
		// @method setOpacity(opacity: Number): this
		// Sets the opacity of the overlay.
		setOpacity: function (opacity) {
			this.options.opacity = opacity;
	
			if (this._image) {
				this._updateOpacity();
			}
			return this;
		},
	
		setStyle: function (styleOpts) {
			if (styleOpts.opacity) {
				this.setOpacity(styleOpts.opacity);
			}
			return this;
		},
	
		// @method bringToFront(): this
		// Brings the layer to the top of all overlays.
		bringToFront: function () {
			if (this._map) {
				toFront(this._image);
			}
			return this;
		},
	
		// @method bringToBack(): this
		// Brings the layer to the bottom of all overlays.
		bringToBack: function () {
			if (this._map) {
				toBack(this._image);
			}
			return this;
		},
	
		// @method setUrl(url: String): this
		// Changes the URL of the image.
		setUrl: function (url) {
			this._url = url;
	
			if (this._image) {
				this._image.src = url;
			}
			return this;
		},
	
		// @method setBounds(bounds: LatLngBounds): this
		// Update the bounds that this ImageOverlay covers
		setBounds: function (bounds) {
			this._bounds = toLatLngBounds(bounds);
	
			if (this._map) {
				this._reset();
			}
			return this;
		},
	
		getEvents: function () {
			var events = {
				zoom: this._reset,
				viewreset: this._reset
			};
	
			if (this._zoomAnimated) {
				events.zoomanim = this._animateZoom;
			}
	
			return events;
		},
	
		// @method: setZIndex(value: Number) : this
		// Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
		setZIndex: function (value) {
			this.options.zIndex = value;
			this._updateZIndex();
			return this;
		},
	
		// @method getBounds(): LatLngBounds
		// Get the bounds that this ImageOverlay covers
		getBounds: function () {
			return this._bounds;
		},
	
		// @method getElement(): HTMLElement
		// Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
		// used by this overlay.
		getElement: function () {
			return this._image;
		},
	
		_initImage: function () {
			var wasElementSupplied = this._url.tagName === 'IMG';
			var img = this._image = wasElementSupplied ? this._url : create$1('img');
	
			addClass(img, 'leaflet-image-layer');
			if (this._zoomAnimated) { addClass(img, 'leaflet-zoom-animated'); }
			if (this.options.className) { addClass(img, this.options.className); }
	
			img.onselectstart = falseFn;
			img.onmousemove = falseFn;
	
			// @event load: Event
			// Fired when the ImageOverlay layer has loaded its image
			img.onload = bind(this.fire, this, 'load');
			img.onerror = bind(this._overlayOnError, this, 'error');
	
			if (this.options.crossOrigin) {
				img.crossOrigin = '';
			}
	
			if (this.options.zIndex) {
				this._updateZIndex();
			}
	
			if (wasElementSupplied) {
				this._url = img.src;
				return;
			}
	
			img.src = this._url;
			img.alt = this.options.alt;
		},
	
		_animateZoom: function (e) {
			var scale = this._map.getZoomScale(e.zoom),
			    offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
	
			setTransform(this._image, offset, scale);
		},
	
		_reset: function () {
			var image = this._image,
			    bounds = new Bounds(
			        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
			        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
			    size = bounds.getSize();
	
			setPosition(image, bounds.min);
	
			image.style.width  = size.x + 'px';
			image.style.height = size.y + 'px';
		},
	
		_updateOpacity: function () {
			setOpacity(this._image, this.options.opacity);
		},
	
		_updateZIndex: function () {
			if (this._image && this.options.zIndex !== undefined && this.options.zIndex !== null) {
				this._image.style.zIndex = this.options.zIndex;
			}
		},
	
		_overlayOnError: function () {
			// @event error: Event
			// Fired when the ImageOverlay layer has loaded its image
			this.fire('error');
	
			var errorUrl = this.options.errorOverlayUrl;
			if (errorUrl && this._url !== errorUrl) {
				this._url = errorUrl;
				this._image.src = errorUrl;
			}
		}
	});
	
	// @factory L.imageOverlay(imageUrl: String, bounds: LatLngBounds, options?: ImageOverlay options)
	// Instantiates an image overlay object given the URL of the image and the
	// geographical bounds it is tied to.
	var imageOverlay = function (url, bounds, options) {
		return new ImageOverlay(url, bounds, options);
	};
	
	/*
	 * @class VideoOverlay
	 * @aka L.VideoOverlay
	 * @inherits ImageOverlay
	 *
	 * Used to load and display a video player over specific bounds of the map. Extends `ImageOverlay`.
	 *
	 * A video overlay uses the [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video)
	 * HTML5 element.
	 *
	 * @example
	 *
	 * ```js
	 * var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
	 * 	videoBounds = [[ 32, -130], [ 13, -100]];
	 * L.VideoOverlay(videoUrl, videoBounds ).addTo(map);
	 * ```
	 */
	
	var VideoOverlay = ImageOverlay.extend({
	
		// @section
		// @aka VideoOverlay options
		options: {
			// @option autoplay: Boolean = true
			// Whether the video starts playing automatically when loaded.
			autoplay: true,
	
			// @option loop: Boolean = true
			// Whether the video will loop back to the beginning when played.
			loop: true
		},
	
		_initImage: function () {
			var wasElementSupplied = this._url.tagName === 'VIDEO';
			var vid = this._image = wasElementSupplied ? this._url : create$1('video');
	
			addClass(vid, 'leaflet-image-layer');
			if (this._zoomAnimated) { addClass(vid, 'leaflet-zoom-animated'); }
	
			vid.onselectstart = falseFn;
			vid.onmousemove = falseFn;
	
			// @event load: Event
			// Fired when the video has finished loading the first frame
			vid.onloadeddata = bind(this.fire, this, 'load');
	
			if (wasElementSupplied) {
				var sourceElements = vid.getElementsByTagName('source');
				var sources = [];
				for (var j = 0; j < sourceElements.length; j++) {
					sources.push(sourceElements[j].src);
				}
	
				this._url = (sourceElements.length > 0) ? sources : [vid.src];
				return;
			}
	
			if (!isArray(this._url)) { this._url = [this._url]; }
	
			vid.autoplay = !!this.options.autoplay;
			vid.loop = !!this.options.loop;
			for (var i = 0; i < this._url.length; i++) {
				var source = create$1('source');
				source.src = this._url[i];
				vid.appendChild(source);
			}
		}
	
		// @method getElement(): HTMLVideoElement
		// Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
		// used by this overlay.
	});
	
	
	// @factory L.videoOverlay(video: String|Array|HTMLVideoElement, bounds: LatLngBounds, options?: VideoOverlay options)
	// Instantiates an image overlay object given the URL of the video (or array of URLs, or even a video element) and the
	// geographical bounds it is tied to.
	
	function videoOverlay(video, bounds, options) {
		return new VideoOverlay(video, bounds, options);
	}
	
	/*
	 * @class DivOverlay
	 * @inherits Layer
	 * @aka L.DivOverlay
	 * Base model for L.Popup and L.Tooltip. Inherit from it for custom popup like plugins.
	 */
	
	// @namespace DivOverlay
	var DivOverlay = Layer.extend({
	
		// @section
		// @aka DivOverlay options
		options: {
			// @option offset: Point = Point(0, 7)
			// The offset of the popup position. Useful to control the anchor
			// of the popup when opening it on some overlays.
			offset: [0, 7],
	
			// @option className: String = ''
			// A custom CSS class name to assign to the popup.
			className: '',
	
			// @option pane: String = 'popupPane'
			// `Map pane` where the popup will be added.
			pane: 'popupPane'
		},
	
		initialize: function (options, source) {
			setOptions(this, options);
	
			this._source = source;
		},
	
		onAdd: function (map) {
			this._zoomAnimated = map._zoomAnimated;
	
			if (!this._container) {
				this._initLayout();
			}
	
			if (map._fadeAnimated) {
				setOpacity(this._container, 0);
			}
	
			clearTimeout(this._removeTimeout);
			this.getPane().appendChild(this._container);
			this.update();
	
			if (map._fadeAnimated) {
				setOpacity(this._container, 1);
			}
	
			this.bringToFront();
		},
	
		onRemove: function (map) {
			if (map._fadeAnimated) {
				setOpacity(this._container, 0);
				this._removeTimeout = setTimeout(bind(remove, undefined, this._container), 200);
			} else {
				remove(this._container);
			}
		},
	
		// @namespace Popup
		// @method getLatLng: LatLng
		// Returns the geographical point of popup.
		getLatLng: function () {
			return this._latlng;
		},
	
		// @method setLatLng(latlng: LatLng): this
		// Sets the geographical point where the popup will open.
		setLatLng: function (latlng) {
			this._latlng = toLatLng(latlng);
			if (this._map) {
				this._updatePosition();
				this._adjustPan();
			}
			return this;
		},
	
		// @method getContent: String|HTMLElement
		// Returns the content of the popup.
		getContent: function () {
			return this._content;
		},
	
		// @method setContent(htmlContent: String|HTMLElement|Function): this
		// Sets the HTML content of the popup. If a function is passed the source layer will be passed to the function. The function should return a `String` or `HTMLElement` to be used in the popup.
		setContent: function (content) {
			this._content = content;
			this.update();
			return this;
		},
	
		// @method getElement: String|HTMLElement
		// Alias for [getContent()](#popup-getcontent)
		getElement: function () {
			return this._container;
		},
	
		// @method update: null
		// Updates the popup content, layout and position. Useful for updating the popup after something inside changed, e.g. image loaded.
		update: function () {
			if (!this._map) { return; }
	
			this._container.style.visibility = 'hidden';
	
			this._updateContent();
			this._updateLayout();
			this._updatePosition();
	
			this._container.style.visibility = '';
	
			this._adjustPan();
		},
	
		getEvents: function () {
			var events = {
				zoom: this._updatePosition,
				viewreset: this._updatePosition
			};
	
			if (this._zoomAnimated) {
				events.zoomanim = this._animateZoom;
			}
			return events;
		},
	
		// @method isOpen: Boolean
		// Returns `true` when the popup is visible on the map.
		isOpen: function () {
			return !!this._map && this._map.hasLayer(this);
		},
	
		// @method bringToFront: this
		// Brings this popup in front of other popups (in the same map pane).
		bringToFront: function () {
			if (this._map) {
				toFront(this._container);
			}
			return this;
		},
	
		// @method bringToBack: this
		// Brings this popup to the back of other popups (in the same map pane).
		bringToBack: function () {
			if (this._map) {
				toBack(this._container);
			}
			return this;
		},
	
		_updateContent: function () {
			if (!this._content) { return; }
	
			var node = this._contentNode;
			var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;
	
			if (typeof content === 'string') {
				node.innerHTML = content;
			} else {
				while (node.hasChildNodes()) {
					node.removeChild(node.firstChild);
				}
				node.appendChild(content);
			}
			this.fire('contentupdate');
		},
	
		_updatePosition: function () {
			if (!this._map) { return; }
	
			var pos = this._map.latLngToLayerPoint(this._latlng),
			    offset = toPoint(this.options.offset),
			    anchor = this._getAnchor();
	
			if (this._zoomAnimated) {
				setPosition(this._container, pos.add(anchor));
			} else {
				offset = offset.add(pos).add(anchor);
			}
	
			var bottom = this._containerBottom = -offset.y,
			    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
	
			// bottom position the popup in case the height of the popup changes (images loading etc)
			this._container.style.bottom = bottom + 'px';
			this._container.style.left = left + 'px';
		},
	
		_getAnchor: function () {
			return [0, 0];
		}
	
	});
	
	/*
	 * @class Popup
	 * @inherits DivOverlay
	 * @aka L.Popup
	 * Used to open popups in certain places of the map. Use [Map.openPopup](#map-openpopup) to
	 * open popups while making sure that only one popup is open at one time
	 * (recommended for usability), or use [Map.addLayer](#map-addlayer) to open as many as you want.
	 *
	 * @example
	 *
	 * If you want to just bind a popup to marker click and then open it, it's really easy:
	 *
	 * ```js
	 * marker.bindPopup(popupContent).openPopup();
	 * ```
	 * Path overlays like polylines also have a `bindPopup` method.
	 * Here's a more complicated way to open a popup on a map:
	 *
	 * ```js
	 * var popup = L.popup()
	 * 	.setLatLng(latlng)
	 * 	.setContent('<p>Hello world!<br />This is a nice popup.</p>')
	 * 	.openOn(map);
	 * ```
	 */
	
	
	// @namespace Popup
	var Popup = DivOverlay.extend({
	
		// @section
		// @aka Popup options
		options: {
			// @option maxWidth: Number = 300
			// Max width of the popup, in pixels.
			maxWidth: 300,
	
			// @option minWidth: Number = 50
			// Min width of the popup, in pixels.
			minWidth: 50,
	
			// @option maxHeight: Number = null
			// If set, creates a scrollable container of the given height
			// inside a popup if its content exceeds it.
			maxHeight: null,
	
			// @option autoPan: Boolean = true
			// Set it to `false` if you don't want the map to do panning animation
			// to fit the opened popup.
			autoPan: true,
	
			// @option autoPanPaddingTopLeft: Point = null
			// The margin between the popup and the top left corner of the map
			// view after autopanning was performed.
			autoPanPaddingTopLeft: null,
	
			// @option autoPanPaddingBottomRight: Point = null
			// The margin between the popup and the bottom right corner of the map
			// view after autopanning was performed.
			autoPanPaddingBottomRight: null,
	
			// @option autoPanPadding: Point = Point(5, 5)
			// Equivalent of setting both top left and bottom right autopan padding to the same value.
			autoPanPadding: [5, 5],
	
			// @option keepInView: Boolean = false
			// Set it to `true` if you want to prevent users from panning the popup
			// off of the screen while it is open.
			keepInView: false,
	
			// @option closeButton: Boolean = true
			// Controls the presence of a close button in the popup.
			closeButton: true,
	
			// @option autoClose: Boolean = true
			// Set it to `false` if you want to override the default behavior of
			// the popup closing when another popup is opened.
			autoClose: true,
	
			// @option closeOnEscapeKey: Boolean = true
			// Set it to `false` if you want to override the default behavior of
			// the ESC key for closing of the popup.
			closeOnEscapeKey: true,
	
			// @option closeOnClick: Boolean = *
			// Set it if you want to override the default behavior of the popup closing when user clicks
			// on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
	
			// @option className: String = ''
			// A custom CSS class name to assign to the popup.
			className: ''
		},
	
		// @namespace Popup
		// @method openOn(map: Map): this
		// Adds the popup to the map and closes the previous one. The same as `map.openPopup(popup)`.
		openOn: function (map) {
			map.openPopup(this);
			return this;
		},
	
		onAdd: function (map) {
			DivOverlay.prototype.onAdd.call(this, map);
	
			// @namespace Map
			// @section Popup events
			// @event popupopen: PopupEvent
			// Fired when a popup is opened in the map
			map.fire('popupopen', {popup: this});
	
			if (this._source) {
				// @namespace Layer
				// @section Popup events
				// @event popupopen: PopupEvent
				// Fired when a popup bound to this layer is opened
				this._source.fire('popupopen', {popup: this}, true);
				// For non-path layers, we toggle the popup when clicking
				// again the layer, so prevent the map to reopen it.
				if (!(this._source instanceof Path)) {
					this._source.on('preclick', stopPropagation);
				}
			}
		},
	
		onRemove: function (map) {
			DivOverlay.prototype.onRemove.call(this, map);
	
			// @namespace Map
			// @section Popup events
			// @event popupclose: PopupEvent
			// Fired when a popup in the map is closed
			map.fire('popupclose', {popup: this});
	
			if (this._source) {
				// @namespace Layer
				// @section Popup events
				// @event popupclose: PopupEvent
				// Fired when a popup bound to this layer is closed
				this._source.fire('popupclose', {popup: this}, true);
				if (!(this._source instanceof Path)) {
					this._source.off('preclick', stopPropagation);
				}
			}
		},
	
		getEvents: function () {
			var events = DivOverlay.prototype.getEvents.call(this);
	
			if (this.options.closeOnClick !== undefined ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
				events.preclick = this._close;
			}
	
			if (this.options.keepInView) {
				events.moveend = this._adjustPan;
			}
	
			return events;
		},
	
		_close: function () {
			if (this._map) {
				this._map.closePopup(this);
			}
		},
	
		_initLayout: function () {
			var prefix = 'leaflet-popup',
			    container = this._container = create$1('div',
				prefix + ' ' + (this.options.className || '') +
				' leaflet-zoom-animated');
	
			var wrapper = this._wrapper = create$1('div', prefix + '-content-wrapper', container);
			this._contentNode = create$1('div', prefix + '-content', wrapper);
	
			disableClickPropagation(wrapper);
			disableScrollPropagation(this._contentNode);
			on(wrapper, 'contextmenu', stopPropagation);
	
			this._tipContainer = create$1('div', prefix + '-tip-container', container);
			this._tip = create$1('div', prefix + '-tip', this._tipContainer);
	
			if (this.options.closeButton) {
				var closeButton = this._closeButton = create$1('a', prefix + '-close-button', container);
				closeButton.href = '#close';
				closeButton.innerHTML = '&#215;';
	
				on(closeButton, 'click', this._onCloseButtonClick, this);
			}
		},
	
		_updateLayout: function () {
			var container = this._contentNode,
			    style = container.style;
	
			style.width = '';
			style.whiteSpace = 'nowrap';
	
			var width = container.offsetWidth;
			width = Math.min(width, this.options.maxWidth);
			width = Math.max(width, this.options.minWidth);
	
			style.width = (width + 1) + 'px';
			style.whiteSpace = '';
	
			style.height = '';
	
			var height = container.offsetHeight,
			    maxHeight = this.options.maxHeight,
			    scrolledClass = 'leaflet-popup-scrolled';
	
			if (maxHeight && height > maxHeight) {
				style.height = maxHeight + 'px';
				addClass(container, scrolledClass);
			} else {
				removeClass(container, scrolledClass);
			}
	
			this._containerWidth = this._container.offsetWidth;
		},
	
		_animateZoom: function (e) {
			var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
			    anchor = this._getAnchor();
			setPosition(this._container, pos.add(anchor));
		},
	
		_adjustPan: function () {
			if (!this.options.autoPan || (this._map._panAnim && this._map._panAnim._inProgress)) { return; }
	
			var map = this._map,
			    marginBottom = parseInt(getStyle(this._container, 'marginBottom'), 10) || 0,
			    containerHeight = this._container.offsetHeight + marginBottom,
			    containerWidth = this._containerWidth,
			    layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
	
			layerPos._add(getPosition(this._container));
	
			var containerPos = map.layerPointToContainerPoint(layerPos),
			    padding = toPoint(this.options.autoPanPadding),
			    paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding),
			    paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding),
			    size = map.getSize(),
			    dx = 0,
			    dy = 0;
	
			if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
				dx = containerPos.x + containerWidth - size.x + paddingBR.x;
			}
			if (containerPos.x - dx - paddingTL.x < 0) { // left
				dx = containerPos.x - paddingTL.x;
			}
			if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
				dy = containerPos.y + containerHeight - size.y + paddingBR.y;
			}
			if (containerPos.y - dy - paddingTL.y < 0) { // top
				dy = containerPos.y - paddingTL.y;
			}
	
			// @namespace Map
			// @section Popup events
			// @event autopanstart: Event
			// Fired when the map starts autopanning when opening a popup.
			if (dx || dy) {
				map
				    .fire('autopanstart')
				    .panBy([dx, dy]);
			}
		},
	
		_onCloseButtonClick: function (e) {
			this._close();
			stop(e);
		},
	
		_getAnchor: function () {
			// Where should we anchor the popup on the source layer?
			return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
		}
	
	});
	
	// @namespace Popup
	// @factory L.popup(options?: Popup options, source?: Layer)
	// Instantiates a `Popup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
	var popup = function (options, source) {
		return new Popup(options, source);
	};
	
	
	/* @namespace Map
	 * @section Interaction Options
	 * @option closePopupOnClick: Boolean = true
	 * Set it to `false` if you don't want popups to close when user clicks the map.
	 */
	Map.mergeOptions({
		closePopupOnClick: true
	});
	
	
	// @namespace Map
	// @section Methods for Layers and Controls
	Map.include({
		// @method openPopup(popup: Popup): this
		// Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
		// @alternative
		// @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
		// Creates a popup with the specified content and options and opens it in the given point on a map.
		openPopup: function (popup, latlng, options) {
			if (!(popup instanceof Popup)) {
				popup = new Popup(options).setContent(popup);
			}
	
			if (latlng) {
				popup.setLatLng(latlng);
			}
	
			if (this.hasLayer(popup)) {
				return this;
			}
	
			if (this._popup && this._popup.options.autoClose) {
				this.closePopup();
			}
	
			this._popup = popup;
			return this.addLayer(popup);
		},
	
		// @method closePopup(popup?: Popup): this
		// Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
		closePopup: function (popup) {
			if (!popup || popup === this._popup) {
				popup = this._popup;
				this._popup = null;
			}
			if (popup) {
				this.removeLayer(popup);
			}
			return this;
		}
	});
	
	/*
	 * @namespace Layer
	 * @section Popup methods example
	 *
	 * All layers share a set of methods convenient for binding popups to it.
	 *
	 * ```js
	 * var layer = L.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
	 * layer.openPopup();
	 * layer.closePopup();
	 * ```
	 *
	 * Popups will also be automatically opened when the layer is clicked on and closed when the layer is removed from the map or another popup is opened.
	 */
	
	// @section Popup methods
	Layer.include({
	
		// @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
		// Binds a popup to the layer with the passed `content` and sets up the
		// necessary event listeners. If a `Function` is passed it will receive
		// the layer as the first argument and should return a `String` or `HTMLElement`.
		bindPopup: function (content, options) {
	
			if (content instanceof Popup) {
				setOptions(content, options);
				this._popup = content;
				content._source = this;
			} else {
				if (!this._popup || options) {
					this._popup = new Popup(options, this);
				}
				this._popup.setContent(content);
			}
	
			if (!this._popupHandlersAdded) {
				this.on({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				});
				this._popupHandlersAdded = true;
			}
	
			return this;
		},
	
		// @method unbindPopup(): this
		// Removes the popup previously bound with `bindPopup`.
		unbindPopup: function () {
			if (this._popup) {
				this.off({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				});
				this._popupHandlersAdded = false;
				this._popup = null;
			}
			return this;
		},
	
		// @method openPopup(latlng?: LatLng): this
		// Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
		openPopup: function (layer, latlng) {
			if (!(layer instanceof Layer)) {
				latlng = layer;
				layer = this;
			}
	
			if (layer instanceof FeatureGroup) {
				for (var id in this._layers) {
					layer = this._layers[id];
					break;
				}
			}
	
			if (!latlng) {
				latlng = layer.getCenter ? layer.getCenter() : layer.getLatLng();
			}
	
			if (this._popup && this._map) {
				// set popup source to this layer
				this._popup._source = layer;
	
				// update the popup (content, layout, ect...)
				this._popup.update();
	
				// open the popup on the map
				this._map.openPopup(this._popup, latlng);
			}
	
			return this;
		},
	
		// @method closePopup(): this
		// Closes the popup bound to this layer if it is open.
		closePopup: function () {
			if (this._popup) {
				this._popup._close();
			}
			return this;
		},
	
		// @method togglePopup(): this
		// Opens or closes the popup bound to this layer depending on its current state.
		togglePopup: function (target) {
			if (this._popup) {
				if (this._popup._map) {
					this.closePopup();
				} else {
					this.openPopup(target);
				}
			}
			return this;
		},
	
		// @method isPopupOpen(): boolean
		// Returns `true` if the popup bound to this layer is currently open.
		isPopupOpen: function () {
			return (this._popup ? this._popup.isOpen() : false);
		},
	
		// @method setPopupContent(content: String|HTMLElement|Popup): this
		// Sets the content of the popup bound to this layer.
		setPopupContent: function (content) {
			if (this._popup) {
				this._popup.setContent(content);
			}
			return this;
		},
	
		// @method getPopup(): Popup
		// Returns the popup bound to this layer.
		getPopup: function () {
			return this._popup;
		},
	
		_openPopup: function (e) {
			var layer = e.layer || e.target;
	
			if (!this._popup) {
				return;
			}
	
			if (!this._map) {
				return;
			}
	
			// prevent map click
			stop(e);
	
			// if this inherits from Path its a vector and we can just
			// open the popup at the new location
			if (layer instanceof Path) {
				this.openPopup(e.layer || e.target, e.latlng);
				return;
			}
	
			// otherwise treat it like a marker and figure out
			// if we should toggle it open/closed
			if (this._map.hasLayer(this._popup) && this._popup._source === layer) {
				this.closePopup();
			} else {
				this.openPopup(layer, e.latlng);
			}
		},
	
		_movePopup: function (e) {
			this._popup.setLatLng(e.latlng);
		},
	
		_onKeyPress: function (e) {
			if (e.originalEvent.keyCode === 13) {
				this._openPopup(e);
			}
		}
	});
	
	/*
	 * @class Tooltip
	 * @inherits DivOverlay
	 * @aka L.Tooltip
	 * Used to display small texts on top of map layers.
	 *
	 * @example
	 *
	 * ```js
	 * marker.bindTooltip("my tooltip text").openTooltip();
	 * ```
	 * Note about tooltip offset. Leaflet takes two options in consideration
	 * for computing tooltip offsetting:
	 * - the `offset` Tooltip option: it defaults to [0, 0], and it's specific to one tooltip.
	 *   Add a positive x offset to move the tooltip to the right, and a positive y offset to
	 *   move it to the bottom. Negatives will move to the left and top.
	 * - the `tooltipAnchor` Icon option: this will only be considered for Marker. You
	 *   should adapt this value if you use a custom icon.
	 */
	
	
	// @namespace Tooltip
	var Tooltip = DivOverlay.extend({
	
		// @section
		// @aka Tooltip options
		options: {
			// @option pane: String = 'tooltipPane'
			// `Map pane` where the tooltip will be added.
			pane: 'tooltipPane',
	
			// @option offset: Point = Point(0, 0)
			// Optional offset of the tooltip position.
			offset: [0, 0],
	
			// @option direction: String = 'auto'
			// Direction where to open the tooltip. Possible values are: `right`, `left`,
			// `top`, `bottom`, `center`, `auto`.
			// `auto` will dynamically switch between `right` and `left` according to the tooltip
			// position on the map.
			direction: 'auto',
	
			// @option permanent: Boolean = false
			// Whether to open the tooltip permanently or only on mouseover.
			permanent: false,
	
			// @option sticky: Boolean = false
			// If true, the tooltip will follow the mouse instead of being fixed at the feature center.
			sticky: false,
	
			// @option interactive: Boolean = false
			// If true, the tooltip will listen to the feature events.
			interactive: false,
	
			// @option opacity: Number = 0.9
			// Tooltip container opacity.
			opacity: 0.9
		},
	
		onAdd: function (map) {
			DivOverlay.prototype.onAdd.call(this, map);
			this.setOpacity(this.options.opacity);
	
			// @namespace Map
			// @section Tooltip events
			// @event tooltipopen: TooltipEvent
			// Fired when a tooltip is opened in the map.
			map.fire('tooltipopen', {tooltip: this});
	
			if (this._source) {
				// @namespace Layer
				// @section Tooltip events
				// @event tooltipopen: TooltipEvent
				// Fired when a tooltip bound to this layer is opened.
				this._source.fire('tooltipopen', {tooltip: this}, true);
			}
		},
	
		onRemove: function (map) {
			DivOverlay.prototype.onRemove.call(this, map);
	
			// @namespace Map
			// @section Tooltip events
			// @event tooltipclose: TooltipEvent
			// Fired when a tooltip in the map is closed.
			map.fire('tooltipclose', {tooltip: this});
	
			if (this._source) {
				// @namespace Layer
				// @section Tooltip events
				// @event tooltipclose: TooltipEvent
				// Fired when a tooltip bound to this layer is closed.
				this._source.fire('tooltipclose', {tooltip: this}, true);
			}
		},
	
		getEvents: function () {
			var events = DivOverlay.prototype.getEvents.call(this);
	
			if (touch && !this.options.permanent) {
				events.preclick = this._close;
			}
	
			return events;
		},
	
		_close: function () {
			if (this._map) {
				this._map.closeTooltip(this);
			}
		},
	
		_initLayout: function () {
			var prefix = 'leaflet-tooltip',
			    className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');
	
			this._contentNode = this._container = create$1('div', className);
		},
	
		_updateLayout: function () {},
	
		_adjustPan: function () {},
	
		_setPosition: function (pos) {
			var map = this._map,
			    container = this._container,
			    centerPoint = map.latLngToContainerPoint(map.getCenter()),
			    tooltipPoint = map.layerPointToContainerPoint(pos),
			    direction = this.options.direction,
			    tooltipWidth = container.offsetWidth,
			    tooltipHeight = container.offsetHeight,
			    offset = toPoint(this.options.offset),
			    anchor = this._getAnchor();
	
			if (direction === 'top') {
				pos = pos.add(toPoint(-tooltipWidth / 2 + offset.x, -tooltipHeight + offset.y + anchor.y, true));
			} else if (direction === 'bottom') {
				pos = pos.subtract(toPoint(tooltipWidth / 2 - offset.x, -offset.y, true));
			} else if (direction === 'center') {
				pos = pos.subtract(toPoint(tooltipWidth / 2 + offset.x, tooltipHeight / 2 - anchor.y + offset.y, true));
			} else if (direction === 'right' || direction === 'auto' && tooltipPoint.x < centerPoint.x) {
				direction = 'right';
				pos = pos.add(toPoint(offset.x + anchor.x, anchor.y - tooltipHeight / 2 + offset.y, true));
			} else {
				direction = 'left';
				pos = pos.subtract(toPoint(tooltipWidth + anchor.x - offset.x, tooltipHeight / 2 - anchor.y - offset.y, true));
			}
	
			removeClass(container, 'leaflet-tooltip-right');
			removeClass(container, 'leaflet-tooltip-left');
			removeClass(container, 'leaflet-tooltip-top');
			removeClass(container, 'leaflet-tooltip-bottom');
			addClass(container, 'leaflet-tooltip-' + direction);
			setPosition(container, pos);
		},
	
		_updatePosition: function () {
			var pos = this._map.latLngToLayerPoint(this._latlng);
			this._setPosition(pos);
		},
	
		setOpacity: function (opacity) {
			this.options.opacity = opacity;
	
			if (this._container) {
				setOpacity(this._container, opacity);
			}
		},
	
		_animateZoom: function (e) {
			var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
			this._setPosition(pos);
		},
	
		_getAnchor: function () {
			// Where should we anchor the tooltip on the source layer?
			return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
		}
	
	});
	
	// @namespace Tooltip
	// @factory L.tooltip(options?: Tooltip options, source?: Layer)
	// Instantiates a Tooltip object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the tooltip with a reference to the Layer to which it refers.
	var tooltip = function (options, source) {
		return new Tooltip(options, source);
	};
	
	// @namespace Map
	// @section Methods for Layers and Controls
	Map.include({
	
		// @method openTooltip(tooltip: Tooltip): this
		// Opens the specified tooltip.
		// @alternative
		// @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
		// Creates a tooltip with the specified content and options and open it.
		openTooltip: function (tooltip, latlng, options) {
			if (!(tooltip instanceof Tooltip)) {
				tooltip = new Tooltip(options).setContent(tooltip);
			}
	
			if (latlng) {
				tooltip.setLatLng(latlng);
			}
	
			if (this.hasLayer(tooltip)) {
				return this;
			}
	
			return this.addLayer(tooltip);
		},
	
		// @method closeTooltip(tooltip?: Tooltip): this
		// Closes the tooltip given as parameter.
		closeTooltip: function (tooltip) {
			if (tooltip) {
				this.removeLayer(tooltip);
			}
			return this;
		}
	
	});
	
	/*
	 * @namespace Layer
	 * @section Tooltip methods example
	 *
	 * All layers share a set of methods convenient for binding tooltips to it.
	 *
	 * ```js
	 * var layer = L.Polygon(latlngs).bindTooltip('Hi There!').addTo(map);
	 * layer.openTooltip();
	 * layer.closeTooltip();
	 * ```
	 */
	
	// @section Tooltip methods
	Layer.include({
	
		// @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
		// Binds a tooltip to the layer with the passed `content` and sets up the
		// necessary event listeners. If a `Function` is passed it will receive
		// the layer as the first argument and should return a `String` or `HTMLElement`.
		bindTooltip: function (content, options) {
	
			if (content instanceof Tooltip) {
				setOptions(content, options);
				this._tooltip = content;
				content._source = this;
			} else {
				if (!this._tooltip || options) {
					this._tooltip = new Tooltip(options, this);
				}
				this._tooltip.setContent(content);
	
			}
	
			this._initTooltipInteractions();
	
			if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
				this.openTooltip();
			}
	
			return this;
		},
	
		// @method unbindTooltip(): this
		// Removes the tooltip previously bound with `bindTooltip`.
		unbindTooltip: function () {
			if (this._tooltip) {
				this._initTooltipInteractions(true);
				this.closeTooltip();
				this._tooltip = null;
			}
			return this;
		},
	
		_initTooltipInteractions: function (remove$$1) {
			if (!remove$$1 && this._tooltipHandlersAdded) { return; }
			var onOff = remove$$1 ? 'off' : 'on',
			    events = {
				remove: this.closeTooltip,
				move: this._moveTooltip
			    };
			if (!this._tooltip.options.permanent) {
				events.mouseover = this._openTooltip;
				events.mouseout = this.closeTooltip;
				if (this._tooltip.options.sticky) {
					events.mousemove = this._moveTooltip;
				}
				if (touch) {
					events.click = this._openTooltip;
				}
			} else {
				events.add = this._openTooltip;
			}
			this[onOff](events);
			this._tooltipHandlersAdded = !remove$$1;
		},
	
		// @method openTooltip(latlng?: LatLng): this
		// Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
		openTooltip: function (layer, latlng) {
			if (!(layer instanceof Layer)) {
				latlng = layer;
				layer = this;
			}
	
			if (layer instanceof FeatureGroup) {
				for (var id in this._layers) {
					layer = this._layers[id];
					break;
				}
			}
	
			if (!latlng) {
				latlng = layer.getCenter ? layer.getCenter() : layer.getLatLng();
			}
	
			if (this._tooltip && this._map) {
	
				// set tooltip source to this layer
				this._tooltip._source = layer;
	
				// update the tooltip (content, layout, ect...)
				this._tooltip.update();
	
				// open the tooltip on the map
				this._map.openTooltip(this._tooltip, latlng);
	
				// Tooltip container may not be defined if not permanent and never
				// opened.
				if (this._tooltip.options.interactive && this._tooltip._container) {
					addClass(this._tooltip._container, 'leaflet-clickable');
					this.addInteractiveTarget(this._tooltip._container);
				}
			}
	
			return this;
		},
	
		// @method closeTooltip(): this
		// Closes the tooltip bound to this layer if it is open.
		closeTooltip: function () {
			if (this._tooltip) {
				this._tooltip._close();
				if (this._tooltip.options.interactive && this._tooltip._container) {
					removeClass(this._tooltip._container, 'leaflet-clickable');
					this.removeInteractiveTarget(this._tooltip._container);
				}
			}
			return this;
		},
	
		// @method toggleTooltip(): this
		// Opens or closes the tooltip bound to this layer depending on its current state.
		toggleTooltip: function (target) {
			if (this._tooltip) {
				if (this._tooltip._map) {
					this.closeTooltip();
				} else {
					this.openTooltip(target);
				}
			}
			return this;
		},
	
		// @method isTooltipOpen(): boolean
		// Returns `true` if the tooltip bound to this layer is currently open.
		isTooltipOpen: function () {
			return this._tooltip.isOpen();
		},
	
		// @method setTooltipContent(content: String|HTMLElement|Tooltip): this
		// Sets the content of the tooltip bound to this layer.
		setTooltipContent: function (content) {
			if (this._tooltip) {
				this._tooltip.setContent(content);
			}
			return this;
		},
	
		// @method getTooltip(): Tooltip
		// Returns the tooltip bound to this layer.
		getTooltip: function () {
			return this._tooltip;
		},
	
		_openTooltip: function (e) {
			var layer = e.layer || e.target;
	
			if (!this._tooltip || !this._map) {
				return;
			}
			this.openTooltip(layer, this._tooltip.options.sticky ? e.latlng : undefined);
		},
	
		_moveTooltip: function (e) {
			var latlng = e.latlng, containerPoint, layerPoint;
			if (this._tooltip.options.sticky && e.originalEvent) {
				containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
				layerPoint = this._map.containerPointToLayerPoint(containerPoint);
				latlng = this._map.layerPointToLatLng(layerPoint);
			}
			this._tooltip.setLatLng(latlng);
		}
	});
	
	/*
	 * @class DivIcon
	 * @aka L.DivIcon
	 * @inherits Icon
	 *
	 * Represents a lightweight icon for markers that uses a simple `<div>`
	 * element instead of an image. Inherits from `Icon` but ignores the `iconUrl` and shadow options.
	 *
	 * @example
	 * ```js
	 * var myIcon = L.divIcon({className: 'my-div-icon'});
	 * // you can set .my-div-icon styles in CSS
	 *
	 * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
	 * ```
	 *
	 * By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.
	 */
	
	var DivIcon = Icon.extend({
		options: {
			// @section
			// @aka DivIcon options
			iconSize: [12, 12], // also can be set through CSS
	
			// iconAnchor: (Point),
			// popupAnchor: (Point),
	
			// @option html: String = ''
			// Custom HTML code to put inside the div element, empty by default.
			html: false,
	
			// @option bgPos: Point = [0, 0]
			// Optional relative position of the background, in pixels
			bgPos: null,
	
			className: 'leaflet-div-icon'
		},
	
		createIcon: function (oldIcon) {
			var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
			    options = this.options;
	
			div.innerHTML = options.html !== false ? options.html : '';
	
			if (options.bgPos) {
				var bgPos = toPoint(options.bgPos);
				div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
			}
			this._setIconStyles(div, 'icon');
	
			return div;
		},
	
		createShadow: function () {
			return null;
		}
	});
	
	// @factory L.divIcon(options: DivIcon options)
	// Creates a `DivIcon` instance with the given options.
	function divIcon(options) {
		return new DivIcon(options);
	}
	
	Icon.Default = IconDefault;
	
	/*
	 * @class GridLayer
	 * @inherits Layer
	 * @aka L.GridLayer
	 *
	 * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
	 * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
	 *
	 *
	 * @section Synchronous usage
	 * @example
	 *
	 * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
	 *
	 * ```js
	 * var CanvasLayer = L.GridLayer.extend({
	 *     createTile: function(coords){
	 *         // create a <canvas> element for drawing
	 *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
	 *
	 *         // setup tile width and height according to the options
	 *         var size = this.getTileSize();
	 *         tile.width = size.x;
	 *         tile.height = size.y;
	 *
	 *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
	 *         var ctx = tile.getContext('2d');
	 *
	 *         // return the tile so it can be rendered on screen
	 *         return tile;
	 *     }
	 * });
	 * ```
	 *
	 * @section Asynchronous usage
	 * @example
	 *
	 * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
	 *
	 * ```js
	 * var CanvasLayer = L.GridLayer.extend({
	 *     createTile: function(coords, done){
	 *         var error;
	 *
	 *         // create a <canvas> element for drawing
	 *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
	 *
	 *         // setup tile width and height according to the options
	 *         var size = this.getTileSize();
	 *         tile.width = size.x;
	 *         tile.height = size.y;
	 *
	 *         // draw something asynchronously and pass the tile to the done() callback
	 *         setTimeout(function() {
	 *             done(error, tile);
	 *         }, 1000);
	 *
	 *         return tile;
	 *     }
	 * });
	 * ```
	 *
	 * @section
	 */
	
	
	var GridLayer = Layer.extend({
	
		// @section
		// @aka GridLayer options
		options: {
			// @option tileSize: Number|Point = 256
			// Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
			tileSize: 256,
	
			// @option opacity: Number = 1.0
			// Opacity of the tiles. Can be used in the `createTile()` function.
			opacity: 1,
	
			// @option updateWhenIdle: Boolean = (depends)
			// Load new tiles only when panning ends.
			// `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
			// `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
			// [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
			updateWhenIdle: mobile,
	
			// @option updateWhenZooming: Boolean = true
			// By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
			updateWhenZooming: true,
	
			// @option updateInterval: Number = 200
			// Tiles will not update more than once every `updateInterval` milliseconds when panning.
			updateInterval: 200,
	
			// @option zIndex: Number = 1
			// The explicit zIndex of the tile layer.
			zIndex: 1,
	
			// @option bounds: LatLngBounds = undefined
			// If set, tiles will only be loaded inside the set `LatLngBounds`.
			bounds: null,
	
			// @option minZoom: Number = 0
			// The minimum zoom level down to which this layer will be displayed (inclusive).
			minZoom: 0,
	
			// @option maxZoom: Number = undefined
			// The maximum zoom level up to which this layer will be displayed (inclusive).
			maxZoom: undefined,
	
			// @option maxNativeZoom: Number = undefined
			// Maximum zoom number the tile source has available. If it is specified,
			// the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
			// from `maxNativeZoom` level and auto-scaled.
			maxNativeZoom: undefined,
	
			// @option minNativeZoom: Number = undefined
			// Minimum zoom number the tile source has available. If it is specified,
			// the tiles on all zoom levels lower than `minNativeZoom` will be loaded
			// from `minNativeZoom` level and auto-scaled.
			minNativeZoom: undefined,
	
			// @option noWrap: Boolean = false
			// Whether the layer is wrapped around the antimeridian. If `true`, the
			// GridLayer will only be displayed once at low zoom levels. Has no
			// effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
			// in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
			// tiles outside the CRS limits.
			noWrap: false,
	
			// @option pane: String = 'tilePane'
			// `Map pane` where the grid layer will be added.
			pane: 'tilePane',
	
			// @option className: String = ''
			// A custom class name to assign to the tile layer. Empty by default.
			className: '',
	
			// @option keepBuffer: Number = 2
			// When panning the map, keep this many rows and columns of tiles before unloading them.
			keepBuffer: 2
		},
	
		initialize: function (options) {
			setOptions(this, options);
		},
	
		onAdd: function () {
			this._initContainer();
	
			this._levels = {};
			this._tiles = {};
	
			this._resetView();
			this._update();
		},
	
		beforeAdd: function (map) {
			map._addZoomLimit(this);
		},
	
		onRemove: function (map) {
			this._removeAllTiles();
			remove(this._container);
			map._removeZoomLimit(this);
			this._container = null;
			this._tileZoom = undefined;
		},
	
		// @method bringToFront: this
		// Brings the tile layer to the top of all tile layers.
		bringToFront: function () {
			if (this._map) {
				toFront(this._container);
				this._setAutoZIndex(Math.max);
			}
			return this;
		},
	
		// @method bringToBack: this
		// Brings the tile layer to the bottom of all tile layers.
		bringToBack: function () {
			if (this._map) {
				toBack(this._container);
				this._setAutoZIndex(Math.min);
			}
			return this;
		},
	
		// @method getContainer: HTMLElement
		// Returns the HTML element that contains the tiles for this layer.
		getContainer: function () {
			return this._container;
		},
	
		// @method setOpacity(opacity: Number): this
		// Changes the [opacity](#gridlayer-opacity) of the grid layer.
		setOpacity: function (opacity) {
			this.options.opacity = opacity;
			this._updateOpacity();
			return this;
		},
	
		// @method setZIndex(zIndex: Number): this
		// Changes the [zIndex](#gridlayer-zindex) of the grid layer.
		setZIndex: function (zIndex) {
			this.options.zIndex = zIndex;
			this._updateZIndex();
	
			return this;
		},
	
		// @method isLoading: Boolean
		// Returns `true` if any tile in the grid layer has not finished loading.
		isLoading: function () {
			return this._loading;
		},
	
		// @method redraw: this
		// Causes the layer to clear all the tiles and request them again.
		redraw: function () {
			if (this._map) {
				this._removeAllTiles();
				this._update();
			}
			return this;
		},
	
		getEvents: function () {
			var events = {
				viewprereset: this._invalidateAll,
				viewreset: this._resetView,
				zoom: this._resetView,
				moveend: this._onMoveEnd
			};
	
			if (!this.options.updateWhenIdle) {
				// update tiles on move, but not more often than once per given interval
				if (!this._onMove) {
					this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
				}
	
				events.move = this._onMove;
			}
	
			if (this._zoomAnimated) {
				events.zoomanim = this._animateZoom;
			}
	
			return events;
		},
	
		// @section Extension methods
		// Layers extending `GridLayer` shall reimplement the following method.
		// @method createTile(coords: Object, done?: Function): HTMLElement
		// Called only internally, must be overridden by classes extending `GridLayer`.
		// Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
		// is specified, it must be called when the tile has finished loading and drawing.
		createTile: function () {
			return document.createElement('div');
		},
	
		// @section
		// @method getTileSize: Point
		// Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
		getTileSize: function () {
			var s = this.options.tileSize;
			return s instanceof Point ? s : new Point(s, s);
		},
	
		_updateZIndex: function () {
			if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
				this._container.style.zIndex = this.options.zIndex;
			}
		},
	
		_setAutoZIndex: function (compare) {
			// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)
	
			var layers = this.getPane().children,
			    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min
	
			for (var i = 0, len = layers.length, zIndex; i < len; i++) {
	
				zIndex = layers[i].style.zIndex;
	
				if (layers[i] !== this._container && zIndex) {
					edgeZIndex = compare(edgeZIndex, +zIndex);
				}
			}
	
			if (isFinite(edgeZIndex)) {
				this.options.zIndex = edgeZIndex + compare(-1, 1);
				this._updateZIndex();
			}
		},
	
		_updateOpacity: function () {
			if (!this._map) { return; }
	
			// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
			if (ielt9) { return; }
	
			setOpacity(this._container, this.options.opacity);
	
			var now = +new Date(),
			    nextFrame = false,
			    willPrune = false;
	
			for (var key in this._tiles) {
				var tile = this._tiles[key];
				if (!tile.current || !tile.loaded) { continue; }
	
				var fade = Math.min(1, (now - tile.loaded) / 200);
	
				setOpacity(tile.el, fade);
				if (fade < 1) {
					nextFrame = true;
				} else {
					if (tile.active) {
						willPrune = true;
					} else {
						this._onOpaqueTile(tile);
					}
					tile.active = true;
				}
			}
	
			if (willPrune && !this._noPrune) { this._pruneTiles(); }
	
			if (nextFrame) {
				cancelAnimFrame(this._fadeFrame);
				this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
			}
		},
	
		_onOpaqueTile: falseFn,
	
		_initContainer: function () {
			if (this._container) { return; }
	
			this._container = create$1('div', 'leaflet-layer ' + (this.options.className || ''));
			this._updateZIndex();
	
			if (this.options.opacity < 1) {
				this._updateOpacity();
			}
	
			this.getPane().appendChild(this._container);
		},
	
		_updateLevels: function () {
	
			var zoom = this._tileZoom,
			    maxZoom = this.options.maxZoom;
	
			if (zoom === undefined) { return undefined; }
	
			for (var z in this._levels) {
				if (this._levels[z].el.children.length || z === zoom) {
					this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
					this._onUpdateLevel(z);
				} else {
					remove(this._levels[z].el);
					this._removeTilesAtZoom(z);
					this._onRemoveLevel(z);
					delete this._levels[z];
				}
			}
	
			var level = this._levels[zoom],
			    map = this._map;
	
			if (!level) {
				level = this._levels[zoom] = {};
	
				level.el = create$1('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
				level.el.style.zIndex = maxZoom;
	
				level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
				level.zoom = zoom;
	
				this._setZoomTransform(level, map.getCenter(), map.getZoom());
	
				// force the browser to consider the newly added element for transition
				falseFn(level.el.offsetWidth);
	
				this._onCreateLevel(level);
			}
	
			this._level = level;
	
			return level;
		},
	
		_onUpdateLevel: falseFn,
	
		_onRemoveLevel: falseFn,
	
		_onCreateLevel: falseFn,
	
		_pruneTiles: function () {
			if (!this._map) {
				return;
			}
	
			var key, tile;
	
			var zoom = this._map.getZoom();
			if (zoom > this.options.maxZoom ||
				zoom < this.options.minZoom) {
				this._removeAllTiles();
				return;
			}
	
			for (key in this._tiles) {
				tile = this._tiles[key];
				tile.retain = tile.current;
			}
	
			for (key in this._tiles) {
				tile = this._tiles[key];
				if (tile.current && !tile.active) {
					var coords = tile.coords;
					if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
						this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
					}
				}
			}
	
			for (key in this._tiles) {
				if (!this._tiles[key].retain) {
					this._removeTile(key);
				}
			}
		},
	
		_removeTilesAtZoom: function (zoom) {
			for (var key in this._tiles) {
				if (this._tiles[key].coords.z !== zoom) {
					continue;
				}
				this._removeTile(key);
			}
		},
	
		_removeAllTiles: function () {
			for (var key in this._tiles) {
				this._removeTile(key);
			}
		},
	
		_invalidateAll: function () {
			for (var z in this._levels) {
				remove(this._levels[z].el);
				this._onRemoveLevel(z);
				delete this._levels[z];
			}
			this._removeAllTiles();
	
			this._tileZoom = undefined;
		},
	
		_retainParent: function (x, y, z, minZoom) {
			var x2 = Math.floor(x / 2),
			    y2 = Math.floor(y / 2),
			    z2 = z - 1,
			    coords2 = new Point(+x2, +y2);
			coords2.z = +z2;
	
			var key = this._tileCoordsToKey(coords2),
			    tile = this._tiles[key];
	
			if (tile && tile.active) {
				tile.retain = true;
				return true;
	
			} else if (tile && tile.loaded) {
				tile.retain = true;
			}
	
			if (z2 > minZoom) {
				return this._retainParent(x2, y2, z2, minZoom);
			}
	
			return false;
		},
	
		_retainChildren: function (x, y, z, maxZoom) {
	
			for (var i = 2 * x; i < 2 * x + 2; i++) {
				for (var j = 2 * y; j < 2 * y + 2; j++) {
	
					var coords = new Point(i, j);
					coords.z = z + 1;
	
					var key = this._tileCoordsToKey(coords),
					    tile = this._tiles[key];
	
					if (tile && tile.active) {
						tile.retain = true;
						continue;
	
					} else if (tile && tile.loaded) {
						tile.retain = true;
					}
	
					if (z + 1 < maxZoom) {
						this._retainChildren(i, j, z + 1, maxZoom);
					}
				}
			}
		},
	
		_resetView: function (e) {
			var animating = e && (e.pinch || e.flyTo);
			this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
		},
	
		_animateZoom: function (e) {
			this._setView(e.center, e.zoom, true, e.noUpdate);
		},
	
		_clampZoom: function (zoom) {
			var options = this.options;
	
			if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
				return options.minNativeZoom;
			}
	
			if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
				return options.maxNativeZoom;
			}
	
			return zoom;
		},
	
		_setView: function (center, zoom, noPrune, noUpdate) {
			var tileZoom = this._clampZoom(Math.round(zoom));
			if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
			    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
				tileZoom = undefined;
			}
	
			var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);
	
			if (!noUpdate || tileZoomChanged) {
	
				this._tileZoom = tileZoom;
	
				if (this._abortLoading) {
					this._abortLoading();
				}
	
				this._updateLevels();
				this._resetGrid();
	
				if (tileZoom !== undefined) {
					this._update(center);
				}
	
				if (!noPrune) {
					this._pruneTiles();
				}
	
				// Flag to prevent _updateOpacity from pruning tiles during
				// a zoom anim or a pinch gesture
				this._noPrune = !!noPrune;
			}
	
			this._setZoomTransforms(center, zoom);
		},
	
		_setZoomTransforms: function (center, zoom) {
			for (var i in this._levels) {
				this._setZoomTransform(this._levels[i], center, zoom);
			}
		},
	
		_setZoomTransform: function (level, center, zoom) {
			var scale = this._map.getZoomScale(zoom, level.zoom),
			    translate = level.origin.multiplyBy(scale)
			        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();
	
			if (any3d) {
				setTransform(level.el, translate, scale);
			} else {
				setPosition(level.el, translate);
			}
		},
	
		_resetGrid: function () {
			var map = this._map,
			    crs = map.options.crs,
			    tileSize = this._tileSize = this.getTileSize(),
			    tileZoom = this._tileZoom;
	
			var bounds = this._map.getPixelWorldBounds(this._tileZoom);
			if (bounds) {
				this._globalTileRange = this._pxBoundsToTileRange(bounds);
			}
	
			this._wrapX = crs.wrapLng && !this.options.noWrap && [
				Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
				Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
			];
			this._wrapY = crs.wrapLat && !this.options.noWrap && [
				Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
				Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
			];
		},
	
		_onMoveEnd: function () {
			if (!this._map || this._map._animatingZoom) { return; }
	
			this._update();
		},
	
		_getTiledPixelBounds: function (center) {
			var map = this._map,
			    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
			    scale = map.getZoomScale(mapZoom, this._tileZoom),
			    pixelCenter = map.project(center, this._tileZoom).floor(),
			    halfSize = map.getSize().divideBy(scale * 2);
	
			return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
		},
	
		// Private method to load tiles in the grid's active zoom level according to map bounds
		_update: function (center) {
			var map = this._map;
			if (!map) { return; }
			var zoom = this._clampZoom(map.getZoom());
	
			if (center === undefined) { center = map.getCenter(); }
			if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom
	
			var pixelBounds = this._getTiledPixelBounds(center),
			    tileRange = this._pxBoundsToTileRange(pixelBounds),
			    tileCenter = tileRange.getCenter(),
			    queue = [],
			    margin = this.options.keepBuffer,
			    noPruneRange = new Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
			                              tileRange.getTopRight().add([margin, -margin]));
	
			// Sanity check: panic if the tile range contains Infinity somewhere.
			if (!(isFinite(tileRange.min.x) &&
			      isFinite(tileRange.min.y) &&
			      isFinite(tileRange.max.x) &&
			      isFinite(tileRange.max.y))) { throw new Error('Attempted to load an infinite number of tiles'); }
	
			for (var key in this._tiles) {
				var c = this._tiles[key].coords;
				if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
					this._tiles[key].current = false;
				}
			}
	
			// _update just loads more tiles. If the tile zoom level differs too much
			// from the map's, let _setView reset levels and prune old tiles.
			if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }
	
			// create a queue of coordinates to load tiles from
			for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
				for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
					var coords = new Point(i, j);
					coords.z = this._tileZoom;
	
					if (!this._isValidTile(coords)) { continue; }
	
					var tile = this._tiles[this._tileCoordsToKey(coords)];
					if (tile) {
						tile.current = true;
					} else {
						queue.push(coords);
					}
				}
			}
	
			// sort tile queue to load tiles in order of their distance to center
			queue.sort(function (a, b) {
				return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
			});
	
			if (queue.length !== 0) {
				// if it's the first batch of tiles to load
				if (!this._loading) {
					this._loading = true;
					// @event loading: Event
					// Fired when the grid layer starts loading tiles.
					this.fire('loading');
				}
	
				// create DOM fragment to append tiles in one batch
				var fragment = document.createDocumentFragment();
	
				for (i = 0; i < queue.length; i++) {
					this._addTile(queue[i], fragment);
				}
	
				this._level.el.appendChild(fragment);
			}
		},
	
		_isValidTile: function (coords) {
			var crs = this._map.options.crs;
	
			if (!crs.infinite) {
				// don't load tile if it's out of bounds and not wrapped
				var bounds = this._globalTileRange;
				if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
				    (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
			}
	
			if (!this.options.bounds) { return true; }
	
			// don't load tile if it doesn't intersect the bounds in options
			var tileBounds = this._tileCoordsToBounds(coords);
			return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
		},
	
		_keyToBounds: function (key) {
			return this._tileCoordsToBounds(this._keyToTileCoords(key));
		},
	
		_tileCoordsToNwSe: function (coords) {
			var map = this._map,
			    tileSize = this.getTileSize(),
			    nwPoint = coords.scaleBy(tileSize),
			    sePoint = nwPoint.add(tileSize),
			    nw = map.unproject(nwPoint, coords.z),
			    se = map.unproject(sePoint, coords.z);
			return [nw, se];
		},
	
		// converts tile coordinates to its geographical bounds
		_tileCoordsToBounds: function (coords) {
			var bp = this._tileCoordsToNwSe(coords),
			    bounds = new LatLngBounds(bp[0], bp[1]);
	
			if (!this.options.noWrap) {
				bounds = this._map.wrapLatLngBounds(bounds);
			}
			return bounds;
		},
		// converts tile coordinates to key for the tile cache
		_tileCoordsToKey: function (coords) {
			return coords.x + ':' + coords.y + ':' + coords.z;
		},
	
		// converts tile cache key to coordinates
		_keyToTileCoords: function (key) {
			var k = key.split(':'),
			    coords = new Point(+k[0], +k[1]);
			coords.z = +k[2];
			return coords;
		},
	
		_removeTile: function (key) {
			var tile = this._tiles[key];
			if (!tile) { return; }
	
			// Cancels any pending http requests associated with the tile
			// unless we're on Android's stock browser,
			// see https://github.com/Leaflet/Leaflet/issues/137
			if (!androidStock) {
				tile.el.setAttribute('src', emptyImageUrl);
			}
			remove(tile.el);
	
			delete this._tiles[key];
	
			// @event tileunload: TileEvent
			// Fired when a tile is removed (e.g. when a tile goes off the screen).
			this.fire('tileunload', {
				tile: tile.el,
				coords: this._keyToTileCoords(key)
			});
		},
	
		_initTile: function (tile) {
			addClass(tile, 'leaflet-tile');
	
			var tileSize = this.getTileSize();
			tile.style.width = tileSize.x + 'px';
			tile.style.height = tileSize.y + 'px';
	
			tile.onselectstart = falseFn;
			tile.onmousemove = falseFn;
	
			// update opacity on tiles in IE7-8 because of filter inheritance problems
			if (ielt9 && this.options.opacity < 1) {
				setOpacity(tile, this.options.opacity);
			}
	
			// without this hack, tiles disappear after zoom on Chrome for Android
			// https://github.com/Leaflet/Leaflet/issues/2078
			if (android && !android23) {
				tile.style.WebkitBackfaceVisibility = 'hidden';
			}
		},
	
		_addTile: function (coords, container) {
			var tilePos = this._getTilePos(coords),
			    key = this._tileCoordsToKey(coords);
	
			var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
	
			this._initTile(tile);
	
			// if createTile is defined with a second argument ("done" callback),
			// we know that tile is async and will be ready later; otherwise
			if (this.createTile.length < 2) {
				// mark tile as ready, but delay one frame for opacity animation to happen
				requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
			}
	
			setPosition(tile, tilePos);
	
			// save tile in cache
			this._tiles[key] = {
				el: tile,
				coords: coords,
				current: true
			};
	
			container.appendChild(tile);
			// @event tileloadstart: TileEvent
			// Fired when a tile is requested and starts loading.
			this.fire('tileloadstart', {
				tile: tile,
				coords: coords
			});
		},
	
		_tileReady: function (coords, err, tile) {
			if (!this._map) { return; }
	
			if (err) {
				// @event tileerror: TileErrorEvent
				// Fired when there is an error loading a tile.
				this.fire('tileerror', {
					error: err,
					tile: tile,
					coords: coords
				});
			}
	
			var key = this._tileCoordsToKey(coords);
	
			tile = this._tiles[key];
			if (!tile) { return; }
	
			tile.loaded = +new Date();
			if (this._map._fadeAnimated) {
				setOpacity(tile.el, 0);
				cancelAnimFrame(this._fadeFrame);
				this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
			} else {
				tile.active = true;
				this._pruneTiles();
			}
	
			if (!err) {
				addClass(tile.el, 'leaflet-tile-loaded');
	
				// @event tileload: TileEvent
				// Fired when a tile loads.
				this.fire('tileload', {
					tile: tile.el,
					coords: coords
				});
			}
	
			if (this._noTilesToLoad()) {
				this._loading = false;
				// @event load: Event
				// Fired when the grid layer loaded all visible tiles.
				this.fire('load');
	
				if (ielt9 || !this._map._fadeAnimated) {
					requestAnimFrame(this._pruneTiles, this);
				} else {
					// Wait a bit more than 0.2 secs (the duration of the tile fade-in)
					// to trigger a pruning.
					setTimeout(bind(this._pruneTiles, this), 250);
				}
			}
		},
	
		_getTilePos: function (coords) {
			return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
		},
	
		_wrapCoords: function (coords) {
			var newCoords = new Point(
				this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
				this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y);
			newCoords.z = coords.z;
			return newCoords;
		},
	
		_pxBoundsToTileRange: function (bounds) {
			var tileSize = this.getTileSize();
			return new Bounds(
				bounds.min.unscaleBy(tileSize).floor(),
				bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
		},
	
		_noTilesToLoad: function () {
			for (var key in this._tiles) {
				if (!this._tiles[key].loaded) { return false; }
			}
			return true;
		}
	});
	
	// @factory L.gridLayer(options?: GridLayer options)
	// Creates a new instance of GridLayer with the supplied options.
	function gridLayer(options) {
		return new GridLayer(options);
	}
	
	/*
	 * @class TileLayer
	 * @inherits GridLayer
	 * @aka L.TileLayer
	 * Used to load and display tile layers on the map. Extends `GridLayer`.
	 *
	 * @example
	 *
	 * ```js
	 * L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	 * ```
	 *
	 * @section URL template
	 * @example
	 *
	 * A string of the following form:
	 *
	 * ```
	 * 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
	 * ```
	 *
	 * `{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` — zoom level, `{x}` and `{y}` — tile coordinates. `{r}` can be used to add "&commat;2x" to the URL to load retina tiles.
	 *
	 * You can use custom keys in the template, which will be [evaluated](#util-template) from TileLayer options, like this:
	 *
	 * ```
	 * L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
	 * ```
	 */
	
	
	var TileLayer = GridLayer.extend({
	
		// @section
		// @aka TileLayer options
		options: {
			// @option minZoom: Number = 0
			// The minimum zoom level down to which this layer will be displayed (inclusive).
			minZoom: 0,
	
			// @option maxZoom: Number = 18
			// The maximum zoom level up to which this layer will be displayed (inclusive).
			maxZoom: 18,
	
			// @option subdomains: String|String[] = 'abc'
			// Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
			subdomains: 'abc',
	
			// @option errorTileUrl: String = ''
			// URL to the tile image to show in place of the tile that failed to load.
			errorTileUrl: '',
	
			// @option zoomOffset: Number = 0
			// The zoom number used in tile URLs will be offset with this value.
			zoomOffset: 0,
	
			// @option tms: Boolean = false
			// If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
			tms: false,
	
			// @option zoomReverse: Boolean = false
			// If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
			zoomReverse: false,
	
			// @option detectRetina: Boolean = false
			// If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
			detectRetina: false,
	
			// @option crossOrigin: Boolean = false
			// If true, all tiles will have their crossOrigin attribute set to ''. This is needed if you want to access tile pixel data.
			crossOrigin: false
		},
	
		initialize: function (url, options) {
	
			this._url = url;
	
			options = setOptions(this, options);
	
			// detecting retina displays, adjusting tileSize and zoom levels
			if (options.detectRetina && retina && options.maxZoom > 0) {
	
				options.tileSize = Math.floor(options.tileSize / 2);
	
				if (!options.zoomReverse) {
					options.zoomOffset++;
					options.maxZoom--;
				} else {
					options.zoomOffset--;
					options.minZoom++;
				}
	
				options.minZoom = Math.max(0, options.minZoom);
			}
	
			if (typeof options.subdomains === 'string') {
				options.subdomains = options.subdomains.split('');
			}
	
			// for https://github.com/Leaflet/Leaflet/issues/137
			if (!android) {
				this.on('tileunload', this._onTileRemove);
			}
		},
	
		// @method setUrl(url: String, noRedraw?: Boolean): this
		// Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
		setUrl: function (url, noRedraw) {
			this._url = url;
	
			if (!noRedraw) {
				this.redraw();
			}
			return this;
		},
	
		// @method createTile(coords: Object, done?: Function): HTMLElement
		// Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
		// to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
		// callback is called when the tile has been loaded.
		createTile: function (coords, done) {
			var tile = document.createElement('img');
	
			on(tile, 'load', bind(this._tileOnLoad, this, done, tile));
			on(tile, 'error', bind(this._tileOnError, this, done, tile));
	
			if (this.options.crossOrigin) {
				tile.crossOrigin = '';
			}
	
			/*
			 Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
			 http://www.w3.org/TR/WCAG20-TECHS/H67
			*/
			tile.alt = '';
	
			/*
			 Set role="presentation" to force screen readers to ignore this
			 https://www.w3.org/TR/wai-aria/roles#textalternativecomputation
			*/
			tile.setAttribute('role', 'presentation');
	
			tile.src = this.getTileUrl(coords);
	
			return tile;
		},
	
		// @section Extension methods
		// @uninheritable
		// Layers extending `TileLayer` might reimplement the following method.
		// @method getTileUrl(coords: Object): String
		// Called only internally, returns the URL for a tile given its coordinates.
		// Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
		getTileUrl: function (coords) {
			var data = {
				r: retina ? '@2x' : '',
				s: this._getSubdomain(coords),
				x: coords.x,
				y: coords.y,
				z: this._getZoomForUrl()
			};
			if (this._map && !this._map.options.crs.infinite) {
				var invertedY = this._globalTileRange.max.y - coords.y;
				if (this.options.tms) {
					data['y'] = invertedY;
				}
				data['-y'] = invertedY;
			}
	
			return template(this._url, extend(data, this.options));
		},
	
		_tileOnLoad: function (done, tile) {
			// For https://github.com/Leaflet/Leaflet/issues/3332
			if (ielt9) {
				setTimeout(bind(done, this, null, tile), 0);
			} else {
				done(null, tile);
			}
		},
	
		_tileOnError: function (done, tile, e) {
			var errorUrl = this.options.errorTileUrl;
			if (errorUrl && tile.getAttribute('src') !== errorUrl) {
				tile.src = errorUrl;
			}
			done(e, tile);
		},
	
		_onTileRemove: function (e) {
			e.tile.onload = null;
		},
	
		_getZoomForUrl: function () {
			var zoom = this._tileZoom,
			maxZoom = this.options.maxZoom,
			zoomReverse = this.options.zoomReverse,
			zoomOffset = this.options.zoomOffset;
	
			if (zoomReverse) {
				zoom = maxZoom - zoom;
			}
	
			return zoom + zoomOffset;
		},
	
		_getSubdomain: function (tilePoint) {
			var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
			return this.options.subdomains[index];
		},
	
		// stops loading all tiles in the background layer
		_abortLoading: function () {
			var i, tile;
			for (i in this._tiles) {
				if (this._tiles[i].coords.z !== this._tileZoom) {
					tile = this._tiles[i].el;
	
					tile.onload = falseFn;
					tile.onerror = falseFn;
	
					if (!tile.complete) {
						tile.src = emptyImageUrl;
						remove(tile);
						delete this._tiles[i];
					}
				}
			}
		}
	});
	
	
	// @factory L.tilelayer(urlTemplate: String, options?: TileLayer options)
	// Instantiates a tile layer object given a `URL template` and optionally an options object.
	
	function tileLayer(url, options) {
		return new TileLayer(url, options);
	}
	
	/*
	 * @class TileLayer.WMS
	 * @inherits TileLayer
	 * @aka L.TileLayer.WMS
	 * Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map. Extends `TileLayer`.
	 *
	 * @example
	 *
	 * ```js
	 * var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
	 * 	layers: 'nexrad-n0r-900913',
	 * 	format: 'image/png',
	 * 	transparent: true,
	 * 	attribution: "Weather data © 2012 IEM Nexrad"
	 * });
	 * ```
	 */
	
	var TileLayerWMS = TileLayer.extend({
	
		// @section
		// @aka TileLayer.WMS options
		// If any custom options not documented here are used, they will be sent to the
		// WMS server as extra parameters in each request URL. This can be useful for
		// [non-standard vendor WMS parameters](http://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
		defaultWmsParams: {
			service: 'WMS',
			request: 'GetMap',
	
			// @option layers: String = ''
			// **(required)** Comma-separated list of WMS layers to show.
			layers: '',
	
			// @option styles: String = ''
			// Comma-separated list of WMS styles.
			styles: '',
	
			// @option format: String = 'image/jpeg'
			// WMS image format (use `'image/png'` for layers with transparency).
			format: 'image/jpeg',
	
			// @option transparent: Boolean = false
			// If `true`, the WMS service will return images with transparency.
			transparent: false,
	
			// @option version: String = '1.1.1'
			// Version of the WMS service to use
			version: '1.1.1'
		},
	
		options: {
			// @option crs: CRS = null
			// Coordinate Reference System to use for the WMS requests, defaults to
			// map CRS. Don't change this if you're not sure what it means.
			crs: null,
	
			// @option uppercase: Boolean = false
			// If `true`, WMS request parameter keys will be uppercase.
			uppercase: false
		},
	
		initialize: function (url, options) {
	
			this._url = url;
	
			var wmsParams = extend({}, this.defaultWmsParams);
	
			// all keys that are not TileLayer options go to WMS params
			for (var i in options) {
				if (!(i in this.options)) {
					wmsParams[i] = options[i];
				}
			}
	
			options = setOptions(this, options);
	
			var realRetina = options.detectRetina && retina ? 2 : 1;
			var tileSize = this.getTileSize();
			wmsParams.width = tileSize.x * realRetina;
			wmsParams.height = tileSize.y * realRetina;
	
			this.wmsParams = wmsParams;
		},
	
		onAdd: function (map) {
	
			this._crs = this.options.crs || map.options.crs;
			this._wmsVersion = parseFloat(this.wmsParams.version);
	
			var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
			this.wmsParams[projectionKey] = this._crs.code;
	
			TileLayer.prototype.onAdd.call(this, map);
		},
	
		getTileUrl: function (coords) {
	
			var tileBounds = this._tileCoordsToNwSe(coords),
			    crs = this._crs,
			    bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])),
			    min = bounds.min,
			    max = bounds.max,
			    bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ?
			    [min.y, min.x, max.y, max.x] :
			    [min.x, min.y, max.x, max.y]).join(','),
			url = L.TileLayer.prototype.getTileUrl.call(this, coords);
			return url +
				getParamString(this.wmsParams, url, this.options.uppercase) +
				(this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
		},
	
		// @method setParams(params: Object, noRedraw?: Boolean): this
		// Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
		setParams: function (params, noRedraw) {
	
			extend(this.wmsParams, params);
	
			if (!noRedraw) {
				this.redraw();
			}
	
			return this;
		}
	});
	
	
	// @factory L.tileLayer.wms(baseUrl: String, options: TileLayer.WMS options)
	// Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.
	function tileLayerWMS(url, options) {
		return new TileLayerWMS(url, options);
	}
	
	TileLayer.WMS = TileLayerWMS;
	tileLayer.wms = tileLayerWMS;
	
	/*
	 * @class Renderer
	 * @inherits Layer
	 * @aka L.Renderer
	 *
	 * Base class for vector renderer implementations (`SVG`, `Canvas`). Handles the
	 * DOM container of the renderer, its bounds, and its zoom animation.
	 *
	 * A `Renderer` works as an implicit layer group for all `Path`s - the renderer
	 * itself can be added or removed to the map. All paths use a renderer, which can
	 * be implicit (the map will decide the type of renderer and use it automatically)
	 * or explicit (using the [`renderer`](#path-renderer) option of the path).
	 *
	 * Do not use this class directly, use `SVG` and `Canvas` instead.
	 *
	 * @event update: Event
	 * Fired when the renderer updates its bounds, center and zoom, for example when
	 * its map has moved
	 */
	
	var Renderer = Layer.extend({
	
		// @section
		// @aka Renderer options
		options: {
			// @option padding: Number = 0.1
			// How much to extend the clip area around the map view (relative to its size)
			// e.g. 0.1 would be 10% of map view in each direction
			padding: 0.1,
	
			// @option tolerance: Number = 0
			// How much to extend click tolerance round a path/object on the map
			tolerance : 0
		},
	
		initialize: function (options) {
			setOptions(this, options);
			stamp(this);
			this._layers = this._layers || {};
		},
	
		onAdd: function () {
			if (!this._container) {
				this._initContainer(); // defined by renderer implementations
	
				if (this._zoomAnimated) {
					addClass(this._container, 'leaflet-zoom-animated');
				}
			}
	
			this.getPane().appendChild(this._container);
			this._update();
			this.on('update', this._updatePaths, this);
		},
	
		onRemove: function () {
			this.off('update', this._updatePaths, this);
			this._destroyContainer();
		},
	
		getEvents: function () {
			var events = {
				viewreset: this._reset,
				zoom: this._onZoom,
				moveend: this._update,
				zoomend: this._onZoomEnd
			};
			if (this._zoomAnimated) {
				events.zoomanim = this._onAnimZoom;
			}
			return events;
		},
	
		_onAnimZoom: function (ev) {
			this._updateTransform(ev.center, ev.zoom);
		},
	
		_onZoom: function () {
			this._updateTransform(this._map.getCenter(), this._map.getZoom());
		},
	
		_updateTransform: function (center, zoom) {
			var scale = this._map.getZoomScale(zoom, this._zoom),
			    position = getPosition(this._container),
			    viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
			    currentCenterPoint = this._map.project(this._center, zoom),
			    destCenterPoint = this._map.project(center, zoom),
			    centerOffset = destCenterPoint.subtract(currentCenterPoint),
	
			    topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);
	
			if (any3d) {
				setTransform(this._container, topLeftOffset, scale);
			} else {
				setPosition(this._container, topLeftOffset);
			}
		},
	
		_reset: function () {
			this._update();
			this._updateTransform(this._center, this._zoom);
	
			for (var id in this._layers) {
				this._layers[id]._reset();
			}
		},
	
		_onZoomEnd: function () {
			for (var id in this._layers) {
				this._layers[id]._project();
			}
		},
	
		_updatePaths: function () {
			for (var id in this._layers) {
				this._layers[id]._update();
			}
		},
	
		_update: function () {
			// Update pixel bounds of renderer container (for positioning/sizing/clipping later)
			// Subclasses are responsible of firing the 'update' event.
			var p = this.options.padding,
			    size = this._map.getSize(),
			    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
	
			this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
	
			this._center = this._map.getCenter();
			this._zoom = this._map.getZoom();
		}
	});
	
	/*
	 * @class Canvas
	 * @inherits Renderer
	 * @aka L.Canvas
	 *
	 * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
	 * Inherits `Renderer`.
	 *
	 * Due to [technical limitations](http://caniuse.com/#search=canvas), Canvas is not
	 * available in all web browsers, notably IE8, and overlapping geometries might
	 * not display properly in some edge cases.
	 *
	 * @example
	 *
	 * Use Canvas by default for all paths in the map:
	 *
	 * ```js
	 * var map = L.map('map', {
	 * 	renderer: L.canvas()
	 * });
	 * ```
	 *
	 * Use a Canvas renderer with extra padding for specific vector geometries:
	 *
	 * ```js
	 * var map = L.map('map');
	 * var myRenderer = L.canvas({ padding: 0.5 });
	 * var line = L.polyline( coordinates, { renderer: myRenderer } );
	 * var circle = L.circle( center, { renderer: myRenderer } );
	 * ```
	 */
	
	var Canvas = Renderer.extend({
		getEvents: function () {
			var events = Renderer.prototype.getEvents.call(this);
			events.viewprereset = this._onViewPreReset;
			return events;
		},
	
		_onViewPreReset: function () {
			// Set a flag so that a viewprereset+moveend+viewreset only updates&redraws once
			this._postponeUpdatePaths = true;
		},
	
		onAdd: function () {
			Renderer.prototype.onAdd.call(this);
	
			// Redraw vectors since canvas is cleared upon removal,
			// in case of removing the renderer itself from the map.
			this._draw();
		},
	
		_initContainer: function () {
			var container = this._container = document.createElement('canvas');
	
			on(container, 'mousemove', throttle(this._onMouseMove, 32, this), this);
			on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);
			on(container, 'mouseout', this._handleMouseOut, this);
	
			this._ctx = container.getContext('2d');
		},
	
		_destroyContainer: function () {
			delete this._ctx;
			remove(this._container);
			off(this._container);
			delete this._container;
		},
	
		_updatePaths: function () {
			if (this._postponeUpdatePaths) { return; }
	
			var layer;
			this._redrawBounds = null;
			for (var id in this._layers) {
				layer = this._layers[id];
				layer._update();
			}
			this._redraw();
		},
	
		_update: function () {
			if (this._map._animatingZoom && this._bounds) { return; }
	
			this._drawnLayers = {};
	
			Renderer.prototype._update.call(this);
	
			var b = this._bounds,
			    container = this._container,
			    size = b.getSize(),
			    m = retina ? 2 : 1;
	
			setPosition(container, b.min);
	
			// set canvas size (also clearing it); use double size on retina
			container.width = m * size.x;
			container.height = m * size.y;
			container.style.width = size.x + 'px';
			container.style.height = size.y + 'px';
	
			if (retina) {
				this._ctx.scale(2, 2);
			}
	
			// translate so we use the same path coordinates after canvas element moves
			this._ctx.translate(-b.min.x, -b.min.y);
	
			// Tell paths to redraw themselves
			this.fire('update');
		},
	
		_reset: function () {
			Renderer.prototype._reset.call(this);
	
			if (this._postponeUpdatePaths) {
				this._postponeUpdatePaths = false;
				this._updatePaths();
			}
		},
	
		_initPath: function (layer) {
			this._updateDashArray(layer);
			this._layers[stamp(layer)] = layer;
	
			var order = layer._order = {
				layer: layer,
				prev: this._drawLast,
				next: null
			};
			if (this._drawLast) { this._drawLast.next = order; }
			this._drawLast = order;
			this._drawFirst = this._drawFirst || this._drawLast;
		},
	
		_addPath: function (layer) {
			this._requestRedraw(layer);
		},
	
		_removePath: function (layer) {
			var order = layer._order;
			var next = order.next;
			var prev = order.prev;
	
			if (next) {
				next.prev = prev;
			} else {
				this._drawLast = prev;
			}
			if (prev) {
				prev.next = next;
			} else {
				this._drawFirst = next;
			}
	
			delete layer._order;
	
			delete this._layers[L.stamp(layer)];
	
			this._requestRedraw(layer);
		},
	
		_updatePath: function (layer) {
			// Redraw the union of the layer's old pixel
			// bounds and the new pixel bounds.
			this._extendRedrawBounds(layer);
			layer._project();
			layer._update();
			// The redraw will extend the redraw bounds
			// with the new pixel bounds.
			this._requestRedraw(layer);
		},
	
		_updateStyle: function (layer) {
			this._updateDashArray(layer);
			this._requestRedraw(layer);
		},
	
		_updateDashArray: function (layer) {
			if (layer.options.dashArray) {
				var parts = layer.options.dashArray.split(','),
				    dashArray = [],
				    i;
				for (i = 0; i < parts.length; i++) {
					dashArray.push(Number(parts[i]));
				}
				layer.options._dashArray = dashArray;
			}
		},
	
		_requestRedraw: function (layer) {
			if (!this._map) { return; }
	
			this._extendRedrawBounds(layer);
			this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
		},
	
		_extendRedrawBounds: function (layer) {
			if (layer._pxBounds) {
				var padding = (layer.options.weight || 0) + 1;
				this._redrawBounds = this._redrawBounds || new Bounds();
				this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
				this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
			}
		},
	
		_redraw: function () {
			this._redrawRequest = null;
	
			if (this._redrawBounds) {
				this._redrawBounds.min._floor();
				this._redrawBounds.max._ceil();
			}
	
			this._clear(); // clear layers in redraw bounds
			this._draw(); // draw layers
	
			this._redrawBounds = null;
		},
	
		_clear: function () {
			var bounds = this._redrawBounds;
			if (bounds) {
				var size = bounds.getSize();
				this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
			} else {
				this._ctx.clearRect(0, 0, this._container.width, this._container.height);
			}
		},
	
		_draw: function () {
			var layer, bounds = this._redrawBounds;
			this._ctx.save();
			if (bounds) {
				var size = bounds.getSize();
				this._ctx.beginPath();
				this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
				this._ctx.clip();
			}
	
			this._drawing = true;
	
			for (var order = this._drawFirst; order; order = order.next) {
				layer = order.layer;
				if (!bounds || (layer._pxBounds && layer._pxBounds.intersects(bounds))) {
					layer._updatePath();
				}
			}
	
			this._drawing = false;
	
			this._ctx.restore();  // Restore state before clipping.
		},
	
		_updatePoly: function (layer, closed) {
			if (!this._drawing) { return; }
	
			var i, j, len2, p,
			    parts = layer._parts,
			    len = parts.length,
			    ctx = this._ctx;
	
			if (!len) { return; }
	
			this._drawnLayers[layer._leaflet_id] = layer;
	
			ctx.beginPath();
	
			for (i = 0; i < len; i++) {
				for (j = 0, len2 = parts[i].length; j < len2; j++) {
					p = parts[i][j];
					ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
				}
				if (closed) {
					ctx.closePath();
				}
			}
	
			this._fillStroke(ctx, layer);
	
			// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
		},
	
		_updateCircle: function (layer) {
	
			if (!this._drawing || layer._empty()) { return; }
	
			var p = layer._point,
			    ctx = this._ctx,
			    r = Math.max(Math.round(layer._radius), 1),
			    s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
	
			this._drawnLayers[layer._leaflet_id] = layer;
	
			if (s !== 1) {
				ctx.save();
				ctx.scale(1, s);
			}
	
			ctx.beginPath();
			ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
	
			if (s !== 1) {
				ctx.restore();
			}
	
			this._fillStroke(ctx, layer);
		},
	
		_fillStroke: function (ctx, layer) {
			var options = layer.options;
	
			if (options.fill) {
				ctx.globalAlpha = options.fillOpacity;
				ctx.fillStyle = options.fillColor || options.color;
				ctx.fill(options.fillRule || 'evenodd');
			}
	
			if (options.stroke && options.weight !== 0) {
				if (ctx.setLineDash) {
					ctx.setLineDash(layer.options && layer.options._dashArray || []);
				}
				ctx.globalAlpha = options.opacity;
				ctx.lineWidth = options.weight;
				ctx.strokeStyle = options.color;
				ctx.lineCap = options.lineCap;
				ctx.lineJoin = options.lineJoin;
				ctx.stroke();
			}
		},
	
		// Canvas obviously doesn't have mouse events for individual drawn objects,
		// so we emulate that by calculating what's under the mouse on mousemove/click manually
	
		_onClick: function (e) {
			var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
	
			for (var order = this._drawFirst; order; order = order.next) {
				layer = order.layer;
				if (layer.options.interactive && layer._containsPoint(point) && !this._map._draggableMoved(layer)) {
					clickedLayer = layer;
				}
			}
			if (clickedLayer)  {
				fakeStop(e);
				this._fireEvent([clickedLayer], e);
			}
		},
	
		_onMouseMove: function (e) {
			if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) { return; }
	
			var point = this._map.mouseEventToLayerPoint(e);
			this._handleMouseHover(e, point);
		},
	
	
		_handleMouseOut: function (e) {
			var layer = this._hoveredLayer;
			if (layer) {
				// if we're leaving the layer, fire mouseout
				removeClass(this._container, 'leaflet-interactive');
				this._fireEvent([layer], e, 'mouseout');
				this._hoveredLayer = null;
			}
		},
	
		_handleMouseHover: function (e, point) {
			var layer, candidateHoveredLayer;
	
			for (var order = this._drawFirst; order; order = order.next) {
				layer = order.layer;
				if (layer.options.interactive && layer._containsPoint(point)) {
					candidateHoveredLayer = layer;
				}
			}
	
			if (candidateHoveredLayer !== this._hoveredLayer) {
				this._handleMouseOut(e);
	
				if (candidateHoveredLayer) {
					addClass(this._container, 'leaflet-interactive'); // change cursor
					this._fireEvent([candidateHoveredLayer], e, 'mouseover');
					this._hoveredLayer = candidateHoveredLayer;
				}
			}
	
			if (this._hoveredLayer) {
				this._fireEvent([this._hoveredLayer], e);
			}
		},
	
		_fireEvent: function (layers, e, type) {
			this._map._fireDOMEvent(e, type || e.type, layers);
		},
	
		_bringToFront: function (layer) {
			var order = layer._order;
			var next = order.next;
			var prev = order.prev;
	
			if (next) {
				next.prev = prev;
			} else {
				// Already last
				return;
			}
			if (prev) {
				prev.next = next;
			} else if (next) {
				// Update first entry unless this is the
				// single entry
				this._drawFirst = next;
			}
	
			order.prev = this._drawLast;
			this._drawLast.next = order;
	
			order.next = null;
			this._drawLast = order;
	
			this._requestRedraw(layer);
		},
	
		_bringToBack: function (layer) {
			var order = layer._order;
			var next = order.next;
			var prev = order.prev;
	
			if (prev) {
				prev.next = next;
			} else {
				// Already first
				return;
			}
			if (next) {
				next.prev = prev;
			} else if (prev) {
				// Update last entry unless this is the
				// single entry
				this._drawLast = prev;
			}
	
			order.prev = null;
	
			order.next = this._drawFirst;
			this._drawFirst.prev = order;
			this._drawFirst = order;
	
			this._requestRedraw(layer);
		}
	});
	
	// @factory L.canvas(options?: Renderer options)
	// Creates a Canvas renderer with the given options.
	function canvas$1(options) {
		return canvas ? new Canvas(options) : null;
	}
	
	/*
	 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
	 */
	
	
	var vmlCreate = (function () {
		try {
			document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
			return function (name) {
				return document.createElement('<lvml:' + name + ' class="lvml">');
			};
		} catch (e) {
			return function (name) {
				return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
			};
		}
	})();
	
	
	/*
	 * @class SVG
	 *
	 * Although SVG is not available on IE7 and IE8, these browsers support [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language), and the SVG renderer will fall back to VML in this case.
	 *
	 * VML was deprecated in 2012, which means VML functionality exists only for backwards compatibility
	 * with old versions of Internet Explorer.
	 */
	
	// mixin to redefine some SVG methods to handle VML syntax which is similar but with some differences
	var vmlMixin = {
	
		_initContainer: function () {
			this._container = create$1('div', 'leaflet-vml-container');
		},
	
		_update: function () {
			if (this._map._animatingZoom) { return; }
			Renderer.prototype._update.call(this);
			this.fire('update');
		},
	
		_initPath: function (layer) {
			var container = layer._container = vmlCreate('shape');
	
			addClass(container, 'leaflet-vml-shape ' + (this.options.className || ''));
	
			container.coordsize = '1 1';
	
			layer._path = vmlCreate('path');
			container.appendChild(layer._path);
	
			this._updateStyle(layer);
			this._layers[stamp(layer)] = layer;
		},
	
		_addPath: function (layer) {
			var container = layer._container;
			this._container.appendChild(container);
	
			if (layer.options.interactive) {
				layer.addInteractiveTarget(container);
			}
		},
	
		_removePath: function (layer) {
			var container = layer._container;
			remove(container);
			layer.removeInteractiveTarget(container);
			delete this._layers[stamp(layer)];
		},
	
		_updateStyle: function (layer) {
			var stroke = layer._stroke,
			    fill = layer._fill,
			    options = layer.options,
			    container = layer._container;
	
			container.stroked = !!options.stroke;
			container.filled = !!options.fill;
	
			if (options.stroke) {
				if (!stroke) {
					stroke = layer._stroke = vmlCreate('stroke');
				}
				container.appendChild(stroke);
				stroke.weight = options.weight + 'px';
				stroke.color = options.color;
				stroke.opacity = options.opacity;
	
				if (options.dashArray) {
					stroke.dashStyle = isArray(options.dashArray) ?
					    options.dashArray.join(' ') :
					    options.dashArray.replace(/( *, *)/g, ' ');
				} else {
					stroke.dashStyle = '';
				}
				stroke.endcap = options.lineCap.replace('butt', 'flat');
				stroke.joinstyle = options.lineJoin;
	
			} else if (stroke) {
				container.removeChild(stroke);
				layer._stroke = null;
			}
	
			if (options.fill) {
				if (!fill) {
					fill = layer._fill = vmlCreate('fill');
				}
				container.appendChild(fill);
				fill.color = options.fillColor || options.color;
				fill.opacity = options.fillOpacity;
	
			} else if (fill) {
				container.removeChild(fill);
				layer._fill = null;
			}
		},
	
		_updateCircle: function (layer) {
			var p = layer._point.round(),
			    r = Math.round(layer._radius),
			    r2 = Math.round(layer._radiusY || r);
	
			this._setPath(layer, layer._empty() ? 'M0 0' :
				'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
		},
	
		_setPath: function (layer, path) {
			layer._path.v = path;
		},
	
		_bringToFront: function (layer) {
			toFront(layer._container);
		},
	
		_bringToBack: function (layer) {
			toBack(layer._container);
		}
	};
	
	var create$2 = vml ? vmlCreate : svgCreate;
	
	/*
	 * @class SVG
	 * @inherits Renderer
	 * @aka L.SVG
	 *
	 * Allows vector layers to be displayed with [SVG](https://developer.mozilla.org/docs/Web/SVG).
	 * Inherits `Renderer`.
	 *
	 * Due to [technical limitations](http://caniuse.com/#search=svg), SVG is not
	 * available in all web browsers, notably Android 2.x and 3.x.
	 *
	 * Although SVG is not available on IE7 and IE8, these browsers support
	 * [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language)
	 * (a now deprecated technology), and the SVG renderer will fall back to VML in
	 * this case.
	 *
	 * @example
	 *
	 * Use SVG by default for all paths in the map:
	 *
	 * ```js
	 * var map = L.map('map', {
	 * 	renderer: L.svg()
	 * });
	 * ```
	 *
	 * Use a SVG renderer with extra padding for specific vector geometries:
	 *
	 * ```js
	 * var map = L.map('map');
	 * var myRenderer = L.svg({ padding: 0.5 });
	 * var line = L.polyline( coordinates, { renderer: myRenderer } );
	 * var circle = L.circle( center, { renderer: myRenderer } );
	 * ```
	 */
	
	var SVG = Renderer.extend({
	
		getEvents: function () {
			var events = Renderer.prototype.getEvents.call(this);
			events.zoomstart = this._onZoomStart;
			return events;
		},
	
		_initContainer: function () {
			this._container = create$2('svg');
	
			// makes it possible to click through svg root; we'll reset it back in individual paths
			this._container.setAttribute('pointer-events', 'none');
	
			this._rootGroup = create$2('g');
			this._container.appendChild(this._rootGroup);
		},
	
		_destroyContainer: function () {
			remove(this._container);
			off(this._container);
			delete this._container;
			delete this._rootGroup;
			delete this._svgSize;
		},
	
		_onZoomStart: function () {
			// Drag-then-pinch interactions might mess up the center and zoom.
			// In this case, the easiest way to prevent this is re-do the renderer
			//   bounds and padding when the zooming starts.
			this._update();
		},
	
		_update: function () {
			if (this._map._animatingZoom && this._bounds) { return; }
	
			Renderer.prototype._update.call(this);
	
			var b = this._bounds,
			    size = b.getSize(),
			    container = this._container;
	
			// set size of svg-container if changed
			if (!this._svgSize || !this._svgSize.equals(size)) {
				this._svgSize = size;
				container.setAttribute('width', size.x);
				container.setAttribute('height', size.y);
			}
	
			// movement: update container viewBox so that we don't have to change coordinates of individual layers
			setPosition(container, b.min);
			container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));
	
			this.fire('update');
		},
	
		// methods below are called by vector layers implementations
	
		_initPath: function (layer) {
			var path = layer._path = create$2('path');
	
			// @namespace Path
			// @option className: String = null
			// Custom class name set on an element. Only for SVG renderer.
			if (layer.options.className) {
				addClass(path, layer.options.className);
			}
	
			if (layer.options.interactive) {
				addClass(path, 'leaflet-interactive');
			}
	
			this._updateStyle(layer);
			this._layers[stamp(layer)] = layer;
		},
	
		_addPath: function (layer) {
			if (!this._rootGroup) { this._initContainer(); }
			this._rootGroup.appendChild(layer._path);
			layer.addInteractiveTarget(layer._path);
		},
	
		_removePath: function (layer) {
			remove(layer._path);
			layer.removeInteractiveTarget(layer._path);
			delete this._layers[stamp(layer)];
		},
	
		_updatePath: function (layer) {
			layer._project();
			layer._update();
		},
	
		_updateStyle: function (layer) {
			var path = layer._path,
			    options = layer.options;
	
			if (!path) { return; }
	
			if (options.stroke) {
				path.setAttribute('stroke', options.color);
				path.setAttribute('stroke-opacity', options.opacity);
				path.setAttribute('stroke-width', options.weight);
				path.setAttribute('stroke-linecap', options.lineCap);
				path.setAttribute('stroke-linejoin', options.lineJoin);
	
				if (options.dashArray) {
					path.setAttribute('stroke-dasharray', options.dashArray);
				} else {
					path.removeAttribute('stroke-dasharray');
				}
	
				if (options.dashOffset) {
					path.setAttribute('stroke-dashoffset', options.dashOffset);
				} else {
					path.removeAttribute('stroke-dashoffset');
				}
			} else {
				path.setAttribute('stroke', 'none');
			}
	
			if (options.fill) {
				path.setAttribute('fill', options.fillColor || options.color);
				path.setAttribute('fill-opacity', options.fillOpacity);
				path.setAttribute('fill-rule', options.fillRule || 'evenodd');
			} else {
				path.setAttribute('fill', 'none');
			}
		},
	
		_updatePoly: function (layer, closed) {
			this._setPath(layer, pointsToPath(layer._parts, closed));
		},
	
		_updateCircle: function (layer) {
			var p = layer._point,
			    r = Math.max(Math.round(layer._radius), 1),
			    r2 = Math.max(Math.round(layer._radiusY), 1) || r,
			    arc = 'a' + r + ',' + r2 + ' 0 1,0 ';
	
			// drawing a circle with two half-arcs
			var d = layer._empty() ? 'M0 0' :
				'M' + (p.x - r) + ',' + p.y +
				arc + (r * 2) + ',0 ' +
				arc + (-r * 2) + ',0 ';
	
			this._setPath(layer, d);
		},
	
		_setPath: function (layer, path) {
			layer._path.setAttribute('d', path);
		},
	
		// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
		_bringToFront: function (layer) {
			toFront(layer._path);
		},
	
		_bringToBack: function (layer) {
			toBack(layer._path);
		}
	});
	
	if (vml) {
		SVG.include(vmlMixin);
	}
	
	// @namespace SVG
	// @factory L.svg(options?: Renderer options)
	// Creates a SVG renderer with the given options.
	function svg$1(options) {
		return svg || vml ? new SVG(options) : null;
	}
	
	Map.include({
		// @namespace Map; @method getRenderer(layer: Path): Renderer
		// Returns the instance of `Renderer` that should be used to render the given
		// `Path`. It will ensure that the `renderer` options of the map and paths
		// are respected, and that the renderers do exist on the map.
		getRenderer: function (layer) {
			// @namespace Path; @option renderer: Renderer
			// Use this specific instance of `Renderer` for this path. Takes
			// precedence over the map's [default renderer](#map-renderer).
			var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
	
			if (!renderer) {
				// @namespace Map; @option preferCanvas: Boolean = false
				// Whether `Path`s should be rendered on a `Canvas` renderer.
				// By default, all `Path`s are rendered in a `SVG` renderer.
				renderer = this._renderer = (this.options.preferCanvas && canvas$1()) || svg$1();
			}
	
			if (!this.hasLayer(renderer)) {
				this.addLayer(renderer);
			}
			return renderer;
		},
	
		_getPaneRenderer: function (name) {
			if (name === 'overlayPane' || name === undefined) {
				return false;
			}
	
			var renderer = this._paneRenderers[name];
			if (renderer === undefined) {
				renderer = (SVG && svg$1({pane: name})) || (Canvas && canvas$1({pane: name}));
				this._paneRenderers[name] = renderer;
			}
			return renderer;
		}
	});
	
	/*
	 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
	 */
	
	/*
	 * @class Rectangle
	 * @aka L.Rectangle
	 * @inherits Polygon
	 *
	 * A class for drawing rectangle overlays on a map. Extends `Polygon`.
	 *
	 * @example
	 *
	 * ```js
	 * // define rectangle geographical bounds
	 * var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
	 *
	 * // create an orange rectangle
	 * L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
	 *
	 * // zoom the map to the rectangle bounds
	 * map.fitBounds(bounds);
	 * ```
	 *
	 */
	
	
	var Rectangle = Polygon.extend({
		initialize: function (latLngBounds, options) {
			Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
		},
	
		// @method setBounds(latLngBounds: LatLngBounds): this
		// Redraws the rectangle with the passed bounds.
		setBounds: function (latLngBounds) {
			return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
		},
	
		_boundsToLatLngs: function (latLngBounds) {
			latLngBounds = toLatLngBounds(latLngBounds);
			return [
				latLngBounds.getSouthWest(),
				latLngBounds.getNorthWest(),
				latLngBounds.getNorthEast(),
				latLngBounds.getSouthEast()
			];
		}
	});
	
	
	// @factory L.rectangle(latLngBounds: LatLngBounds, options?: Polyline options)
	function rectangle(latLngBounds, options) {
		return new Rectangle(latLngBounds, options);
	}
	
	SVG.create = create$2;
	SVG.pointsToPath = pointsToPath;
	
	GeoJSON.geometryToLayer = geometryToLayer;
	GeoJSON.coordsToLatLng = coordsToLatLng;
	GeoJSON.coordsToLatLngs = coordsToLatLngs;
	GeoJSON.latLngToCoords = latLngToCoords;
	GeoJSON.latLngsToCoords = latLngsToCoords;
	GeoJSON.getFeature = getFeature;
	GeoJSON.asFeature = asFeature;
	
	/*
	 * L.Handler.BoxZoom is used to add shift-drag zoom interaction to the map
	 * (zoom to a selected bounding box), enabled by default.
	 */
	
	// @namespace Map
	// @section Interaction Options
	Map.mergeOptions({
		// @option boxZoom: Boolean = true
		// Whether the map can be zoomed to a rectangular area specified by
		// dragging the mouse while pressing the shift key.
		boxZoom: true
	});
	
	var BoxZoom = Handler.extend({
		initialize: function (map) {
			this._map = map;
			this._container = map._container;
			this._pane = map._panes.overlayPane;
			this._resetStateTimeout = 0;
			map.on('unload', this._destroy, this);
		},
	
		addHooks: function () {
			on(this._container, 'mousedown', this._onMouseDown, this);
		},
	
		removeHooks: function () {
			off(this._container, 'mousedown', this._onMouseDown, this);
		},
	
		moved: function () {
			return this._moved;
		},
	
		_destroy: function () {
			remove(this._pane);
			delete this._pane;
		},
	
		_resetState: function () {
			this._resetStateTimeout = 0;
			this._moved = false;
		},
	
		_clearDeferredResetState: function () {
			if (this._resetStateTimeout !== 0) {
				clearTimeout(this._resetStateTimeout);
				this._resetStateTimeout = 0;
			}
		},
	
		_onMouseDown: function (e) {
			if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }
	
			// Clear the deferred resetState if it hasn't executed yet, otherwise it
			// will interrupt the interaction and orphan a box element in the container.
			this._clearDeferredResetState();
			this._resetState();
	
			disableTextSelection();
			disableImageDrag();
	
			this._startPoint = this._map.mouseEventToContainerPoint(e);
	
			on(document, {
				contextmenu: stop,
				mousemove: this._onMouseMove,
				mouseup: this._onMouseUp,
				keydown: this._onKeyDown
			}, this);
		},
	
		_onMouseMove: function (e) {
			if (!this._moved) {
				this._moved = true;
	
				this._box = create$1('div', 'leaflet-zoom-box', this._container);
				addClass(this._container, 'leaflet-crosshair');
	
				this._map.fire('boxzoomstart');
			}
	
			this._point = this._map.mouseEventToContainerPoint(e);
	
			var bounds = new Bounds(this._point, this._startPoint),
			    size = bounds.getSize();
	
			setPosition(this._box, bounds.min);
	
			this._box.style.width  = size.x + 'px';
			this._box.style.height = size.y + 'px';
		},
	
		_finish: function () {
			if (this._moved) {
				remove(this._box);
				removeClass(this._container, 'leaflet-crosshair');
			}
	
			enableTextSelection();
			enableImageDrag();
	
			off(document, {
				contextmenu: stop,
				mousemove: this._onMouseMove,
				mouseup: this._onMouseUp,
				keydown: this._onKeyDown
			}, this);
		},
	
		_onMouseUp: function (e) {
			if ((e.which !== 1) && (e.button !== 1)) { return; }
	
			this._finish();
	
			if (!this._moved) { return; }
			// Postpone to next JS tick so internal click event handling
			// still see it as "moved".
			this._clearDeferredResetState();
			this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
	
			var bounds = new LatLngBounds(
			        this._map.containerPointToLatLng(this._startPoint),
			        this._map.containerPointToLatLng(this._point));
	
			this._map
				.fitBounds(bounds)
				.fire('boxzoomend', {boxZoomBounds: bounds});
		},
	
		_onKeyDown: function (e) {
			if (e.keyCode === 27) {
				this._finish();
			}
		}
	});
	
	// @section Handlers
	// @property boxZoom: Handler
	// Box (shift-drag with mouse) zoom handler.
	Map.addInitHook('addHandler', 'boxZoom', BoxZoom);
	
	/*
	 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
	 */
	
	// @namespace Map
	// @section Interaction Options
	
	Map.mergeOptions({
		// @option doubleClickZoom: Boolean|String = true
		// Whether the map can be zoomed in by double clicking on it and
		// zoomed out by double clicking while holding shift. If passed
		// `'center'`, double-click zoom will zoom to the center of the
		//  view regardless of where the mouse was.
		doubleClickZoom: true
	});
	
	var DoubleClickZoom = Handler.extend({
		addHooks: function () {
			this._map.on('dblclick', this._onDoubleClick, this);
		},
	
		removeHooks: function () {
			this._map.off('dblclick', this._onDoubleClick, this);
		},
	
		_onDoubleClick: function (e) {
			var map = this._map,
			    oldZoom = map.getZoom(),
			    delta = map.options.zoomDelta,
			    zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
	
			if (map.options.doubleClickZoom === 'center') {
				map.setZoom(zoom);
			} else {
				map.setZoomAround(e.containerPoint, zoom);
			}
		}
	});
	
	// @section Handlers
	//
	// Map properties include interaction handlers that allow you to control
	// interaction behavior in runtime, enabling or disabling certain features such
	// as dragging or touch zoom (see `Handler` methods). For example:
	//
	// ```js
	// map.doubleClickZoom.disable();
	// ```
	//
	// @property doubleClickZoom: Handler
	// Double click zoom handler.
	Map.addInitHook('addHandler', 'doubleClickZoom', DoubleClickZoom);
	
	/*
	 * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
	 */
	
	// @namespace Map
	// @section Interaction Options
	Map.mergeOptions({
		// @option dragging: Boolean = true
		// Whether the map be draggable with mouse/touch or not.
		dragging: true,
	
		// @section Panning Inertia Options
		// @option inertia: Boolean = *
		// If enabled, panning of the map will have an inertia effect where
		// the map builds momentum while dragging and continues moving in
		// the same direction for some time. Feels especially nice on touch
		// devices. Enabled by default unless running on old Android devices.
		inertia: !android23,
	
		// @option inertiaDeceleration: Number = 3000
		// The rate with which the inertial movement slows down, in pixels/second².
		inertiaDeceleration: 3400, // px/s^2
	
		// @option inertiaMaxSpeed: Number = Infinity
		// Max speed of the inertial movement, in pixels/second.
		inertiaMaxSpeed: Infinity, // px/s
	
		// @option easeLinearity: Number = 0.2
		easeLinearity: 0.2,
	
		// TODO refactor, move to CRS
		// @option worldCopyJump: Boolean = false
		// With this option enabled, the map tracks when you pan to another "copy"
		// of the world and seamlessly jumps to the original one so that all overlays
		// like markers and vector layers are still visible.
		worldCopyJump: false,
	
		// @option maxBoundsViscosity: Number = 0.0
		// If `maxBounds` is set, this option will control how solid the bounds
		// are when dragging the map around. The default value of `0.0` allows the
		// user to drag outside the bounds at normal speed, higher values will
		// slow down map dragging outside bounds, and `1.0` makes the bounds fully
		// solid, preventing the user from dragging outside the bounds.
		maxBoundsViscosity: 0.0
	});
	
	var Drag = Handler.extend({
		addHooks: function () {
			if (!this._draggable) {
				var map = this._map;
	
				this._draggable = new Draggable(map._mapPane, map._container);
	
				this._draggable.on({
					dragstart: this._onDragStart,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this);
	
				this._draggable.on('predrag', this._onPreDragLimit, this);
				if (map.options.worldCopyJump) {
					this._draggable.on('predrag', this._onPreDragWrap, this);
					map.on('zoomend', this._onZoomEnd, this);
	
					map.whenReady(this._onZoomEnd, this);
				}
			}
			addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
			this._draggable.enable();
			this._positions = [];
			this._times = [];
		},
	
		removeHooks: function () {
			removeClass(this._map._container, 'leaflet-grab');
			removeClass(this._map._container, 'leaflet-touch-drag');
			this._draggable.disable();
		},
	
		moved: function () {
			return this._draggable && this._draggable._moved;
		},
	
		moving: function () {
			return this._draggable && this._draggable._moving;
		},
	
		_onDragStart: function () {
			var map = this._map;
	
			map._stop();
			if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
				var bounds = toLatLngBounds(this._map.options.maxBounds);
	
				this._offsetLimit = toBounds(
					this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
					this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
						.add(this._map.getSize()));
	
				this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
			} else {
				this._offsetLimit = null;
			}
	
			map
			    .fire('movestart')
			    .fire('dragstart');
	
			if (map.options.inertia) {
				this._positions = [];
				this._times = [];
			}
		},
	
		_onDrag: function (e) {
			if (this._map.options.inertia) {
				var time = this._lastTime = +new Date(),
				    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
	
				this._positions.push(pos);
				this._times.push(time);
	
				this._prunePositions(time);
			}
	
			this._map
			    .fire('move', e)
			    .fire('drag', e);
		},
	
		_prunePositions: function (time) {
			while (this._positions.length > 1 && time - this._times[0] > 50) {
				this._positions.shift();
				this._times.shift();
			}
		},
	
		_onZoomEnd: function () {
			var pxCenter = this._map.getSize().divideBy(2),
			    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
	
			this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
			this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
		},
	
		_viscousLimit: function (value, threshold) {
			return value - (value - threshold) * this._viscosity;
		},
	
		_onPreDragLimit: function () {
			if (!this._viscosity || !this._offsetLimit) { return; }
	
			var offset = this._draggable._newPos.subtract(this._draggable._startPos);
	
			var limit = this._offsetLimit;
			if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
			if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
			if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
			if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }
	
			this._draggable._newPos = this._draggable._startPos.add(offset);
		},
	
		_onPreDragWrap: function () {
			// TODO refactor to be able to adjust map pane position after zoom
			var worldWidth = this._worldWidth,
			    halfWidth = Math.round(worldWidth / 2),
			    dx = this._initialWorldOffset,
			    x = this._draggable._newPos.x,
			    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
			    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
			    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
	
			this._draggable._absPos = this._draggable._newPos.clone();
			this._draggable._newPos.x = newX;
		},
	
		_onDragEnd: function (e) {
			var map = this._map,
			    options = map.options,
	
			    noInertia = !options.inertia || this._times.length < 2;
	
			map.fire('dragend', e);
	
			if (noInertia) {
				map.fire('moveend');
	
			} else {
				this._prunePositions(+new Date());
	
				var direction = this._lastPos.subtract(this._positions[0]),
				    duration = (this._lastTime - this._times[0]) / 1000,
				    ease = options.easeLinearity,
	
				    speedVector = direction.multiplyBy(ease / duration),
				    speed = speedVector.distanceTo([0, 0]),
	
				    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
				    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),
	
				    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
				    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
	
				if (!offset.x && !offset.y) {
					map.fire('moveend');
	
				} else {
					offset = map._limitOffset(offset, map.options.maxBounds);
	
					requestAnimFrame(function () {
						map.panBy(offset, {
							duration: decelerationDuration,
							easeLinearity: ease,
							noMoveStart: true,
							animate: true
						});
					});
				}
			}
		}
	});
	
	// @section Handlers
	// @property dragging: Handler
	// Map dragging handler (by both mouse and touch).
	Map.addInitHook('addHandler', 'dragging', Drag);
	
	/*
	 * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
	 */
	
	// @namespace Map
	// @section Keyboard Navigation Options
	Map.mergeOptions({
		// @option keyboard: Boolean = true
		// Makes the map focusable and allows users to navigate the map with keyboard
		// arrows and `+`/`-` keys.
		keyboard: true,
	
		// @option keyboardPanDelta: Number = 80
		// Amount of pixels to pan when pressing an arrow key.
		keyboardPanDelta: 80
	});
	
	var Keyboard = Handler.extend({
	
		keyCodes: {
			left:    [37],
			right:   [39],
			down:    [40],
			up:      [38],
			zoomIn:  [187, 107, 61, 171],
			zoomOut: [189, 109, 54, 173]
		},
	
		initialize: function (map) {
			this._map = map;
	
			this._setPanDelta(map.options.keyboardPanDelta);
			this._setZoomDelta(map.options.zoomDelta);
		},
	
		addHooks: function () {
			var container = this._map._container;
	
			// make the container focusable by tabbing
			if (container.tabIndex <= 0) {
				container.tabIndex = '0';
			}
	
			on(container, {
				focus: this._onFocus,
				blur: this._onBlur,
				mousedown: this._onMouseDown
			}, this);
	
			this._map.on({
				focus: this._addHooks,
				blur: this._removeHooks
			}, this);
		},
	
		removeHooks: function () {
			this._removeHooks();
	
			off(this._map._container, {
				focus: this._onFocus,
				blur: this._onBlur,
				mousedown: this._onMouseDown
			}, this);
	
			this._map.off({
				focus: this._addHooks,
				blur: this._removeHooks
			}, this);
		},
	
		_onMouseDown: function () {
			if (this._focused) { return; }
	
			var body = document.body,
			    docEl = document.documentElement,
			    top = body.scrollTop || docEl.scrollTop,
			    left = body.scrollLeft || docEl.scrollLeft;
	
			this._map._container.focus();
	
			window.scrollTo(left, top);
		},
	
		_onFocus: function () {
			this._focused = true;
			this._map.fire('focus');
		},
	
		_onBlur: function () {
			this._focused = false;
			this._map.fire('blur');
		},
	
		_setPanDelta: function (panDelta) {
			var keys = this._panKeys = {},
			    codes = this.keyCodes,
			    i, len;
	
			for (i = 0, len = codes.left.length; i < len; i++) {
				keys[codes.left[i]] = [-1 * panDelta, 0];
			}
			for (i = 0, len = codes.right.length; i < len; i++) {
				keys[codes.right[i]] = [panDelta, 0];
			}
			for (i = 0, len = codes.down.length; i < len; i++) {
				keys[codes.down[i]] = [0, panDelta];
			}
			for (i = 0, len = codes.up.length; i < len; i++) {
				keys[codes.up[i]] = [0, -1 * panDelta];
			}
		},
	
		_setZoomDelta: function (zoomDelta) {
			var keys = this._zoomKeys = {},
			    codes = this.keyCodes,
			    i, len;
	
			for (i = 0, len = codes.zoomIn.length; i < len; i++) {
				keys[codes.zoomIn[i]] = zoomDelta;
			}
			for (i = 0, len = codes.zoomOut.length; i < len; i++) {
				keys[codes.zoomOut[i]] = -zoomDelta;
			}
		},
	
		_addHooks: function () {
			on(document, 'keydown', this._onKeyDown, this);
		},
	
		_removeHooks: function () {
			off(document, 'keydown', this._onKeyDown, this);
		},
	
		_onKeyDown: function (e) {
			if (e.altKey || e.ctrlKey || e.metaKey) { return; }
	
			var key = e.keyCode,
			    map = this._map,
			    offset;
	
			if (key in this._panKeys) {
	
				if (map._panAnim && map._panAnim._inProgress) { return; }
	
				offset = this._panKeys[key];
				if (e.shiftKey) {
					offset = toPoint(offset).multiplyBy(3);
				}
	
				map.panBy(offset);
	
				if (map.options.maxBounds) {
					map.panInsideBounds(map.options.maxBounds);
				}
	
			} else if (key in this._zoomKeys) {
				map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
	
			} else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
				map.closePopup();
	
			} else {
				return;
			}
	
			stop(e);
		}
	});
	
	// @section Handlers
	// @section Handlers
	// @property keyboard: Handler
	// Keyboard navigation handler.
	Map.addInitHook('addHandler', 'keyboard', Keyboard);
	
	/*
	 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
	 */
	
	// @namespace Map
	// @section Interaction Options
	Map.mergeOptions({
		// @section Mousewheel options
		// @option scrollWheelZoom: Boolean|String = true
		// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
		// it will zoom to the center of the view regardless of where the mouse was.
		scrollWheelZoom: true,
	
		// @option wheelDebounceTime: Number = 40
		// Limits the rate at which a wheel can fire (in milliseconds). By default
		// user can't zoom via wheel more often than once per 40 ms.
		wheelDebounceTime: 40,
	
		// @option wheelPxPerZoomLevel: Number = 60
		// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
		// mean a change of one full zoom level. Smaller values will make wheel-zooming
		// faster (and vice versa).
		wheelPxPerZoomLevel: 60
	});
	
	var ScrollWheelZoom = Handler.extend({
		addHooks: function () {
			on(this._map._container, 'mousewheel', this._onWheelScroll, this);
	
			this._delta = 0;
		},
	
		removeHooks: function () {
			off(this._map._container, 'mousewheel', this._onWheelScroll, this);
		},
	
		_onWheelScroll: function (e) {
			var delta = getWheelDelta(e);
	
			var debounce = this._map.options.wheelDebounceTime;
	
			this._delta += delta;
			this._lastMousePos = this._map.mouseEventToContainerPoint(e);
	
			if (!this._startTime) {
				this._startTime = +new Date();
			}
	
			var left = Math.max(debounce - (+new Date() - this._startTime), 0);
	
			clearTimeout(this._timer);
			this._timer = setTimeout(bind(this._performZoom, this), left);
	
			stop(e);
		},
	
		_performZoom: function () {
			var map = this._map,
			    zoom = map.getZoom(),
			    snap = this._map.options.zoomSnap || 0;
	
			map._stop(); // stop panning and fly animations if any
	
			// map the delta with a sigmoid function to -4..4 range leaning on -1..1
			var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
			    d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2,
			    d4 = snap ? Math.ceil(d3 / snap) * snap : d3,
			    delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;
	
			this._delta = 0;
			this._startTime = null;
	
			if (!delta) { return; }
	
			if (map.options.scrollWheelZoom === 'center') {
				map.setZoom(zoom + delta);
			} else {
				map.setZoomAround(this._lastMousePos, zoom + delta);
			}
		}
	});
	
	// @section Handlers
	// @property scrollWheelZoom: Handler
	// Scroll wheel zoom handler.
	Map.addInitHook('addHandler', 'scrollWheelZoom', ScrollWheelZoom);
	
	/*
	 * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
	 */
	
	// @namespace Map
	// @section Interaction Options
	Map.mergeOptions({
		// @section Touch interaction options
		// @option tap: Boolean = true
		// Enables mobile hacks for supporting instant taps (fixing 200ms click
		// delay on iOS/Android) and touch holds (fired as `contextmenu` events).
		tap: true,
	
		// @option tapTolerance: Number = 15
		// The max number of pixels a user can shift his finger during touch
		// for it to be considered a valid tap.
		tapTolerance: 15
	});
	
	var Tap = Handler.extend({
		addHooks: function () {
			on(this._map._container, 'touchstart', this._onDown, this);
		},
	
		removeHooks: function () {
			off(this._map._container, 'touchstart', this._onDown, this);
		},
	
		_onDown: function (e) {
			if (!e.touches) { return; }
	
			preventDefault(e);
	
			this._fireClick = true;
	
			// don't simulate click or track longpress if more than 1 touch
			if (e.touches.length > 1) {
				this._fireClick = false;
				clearTimeout(this._holdTimeout);
				return;
			}
	
			var first = e.touches[0],
			    el = first.target;
	
			this._startPos = this._newPos = new Point(first.clientX, first.clientY);
	
			// if touching a link, highlight it
			if (el.tagName && el.tagName.toLowerCase() === 'a') {
				addClass(el, 'leaflet-active');
			}
	
			// simulate long hold but setting a timeout
			this._holdTimeout = setTimeout(bind(function () {
				if (this._isTapValid()) {
					this._fireClick = false;
					this._onUp();
					this._simulateEvent('contextmenu', first);
				}
			}, this), 1000);
	
			this._simulateEvent('mousedown', first);
	
			on(document, {
				touchmove: this._onMove,
				touchend: this._onUp
			}, this);
		},
	
		_onUp: function (e) {
			clearTimeout(this._holdTimeout);
	
			off(document, {
				touchmove: this._onMove,
				touchend: this._onUp
			}, this);
	
			if (this._fireClick && e && e.changedTouches) {
	
				var first = e.changedTouches[0],
				    el = first.target;
	
				if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
					removeClass(el, 'leaflet-active');
				}
	
				this._simulateEvent('mouseup', first);
	
				// simulate click if the touch didn't move too much
				if (this._isTapValid()) {
					this._simulateEvent('click', first);
				}
			}
		},
	
		_isTapValid: function () {
			return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
		},
	
		_onMove: function (e) {
			var first = e.touches[0];
			this._newPos = new Point(first.clientX, first.clientY);
			this._simulateEvent('mousemove', first);
		},
	
		_simulateEvent: function (type, e) {
			var simulatedEvent = document.createEvent('MouseEvents');
	
			simulatedEvent._simulated = true;
			e.target._simulatedClick = true;
	
			simulatedEvent.initMouseEvent(
			        type, true, true, window, 1,
			        e.screenX, e.screenY,
			        e.clientX, e.clientY,
			        false, false, false, false, 0, null);
	
			e.target.dispatchEvent(simulatedEvent);
		}
	});
	
	// @section Handlers
	// @property tap: Handler
	// Mobile touch hacks (quick tap and touch hold) handler.
	if (touch && !pointer) {
		Map.addInitHook('addHandler', 'tap', Tap);
	}
	
	/*
	 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
	 */
	
	// @namespace Map
	// @section Interaction Options
	Map.mergeOptions({
		// @section Touch interaction options
		// @option touchZoom: Boolean|String = *
		// Whether the map can be zoomed by touch-dragging with two fingers. If
		// passed `'center'`, it will zoom to the center of the view regardless of
		// where the touch events (fingers) were. Enabled for touch-capable web
		// browsers except for old Androids.
		touchZoom: touch && !android23,
	
		// @option bounceAtZoomLimits: Boolean = true
		// Set it to false if you don't want the map to zoom beyond min/max zoom
		// and then bounce back when pinch-zooming.
		bounceAtZoomLimits: true
	});
	
	var TouchZoom = Handler.extend({
		addHooks: function () {
			addClass(this._map._container, 'leaflet-touch-zoom');
			on(this._map._container, 'touchstart', this._onTouchStart, this);
		},
	
		removeHooks: function () {
			removeClass(this._map._container, 'leaflet-touch-zoom');
			off(this._map._container, 'touchstart', this._onTouchStart, this);
		},
	
		_onTouchStart: function (e) {
			var map = this._map;
			if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }
	
			var p1 = map.mouseEventToContainerPoint(e.touches[0]),
			    p2 = map.mouseEventToContainerPoint(e.touches[1]);
	
			this._centerPoint = map.getSize()._divideBy(2);
			this._startLatLng = map.containerPointToLatLng(this._centerPoint);
			if (map.options.touchZoom !== 'center') {
				this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
			}
	
			this._startDist = p1.distanceTo(p2);
			this._startZoom = map.getZoom();
	
			this._moved = false;
			this._zooming = true;
	
			map._stop();
	
			on(document, 'touchmove', this._onTouchMove, this);
			on(document, 'touchend', this._onTouchEnd, this);
	
			preventDefault(e);
		},
	
		_onTouchMove: function (e) {
			if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }
	
			var map = this._map,
			    p1 = map.mouseEventToContainerPoint(e.touches[0]),
			    p2 = map.mouseEventToContainerPoint(e.touches[1]),
			    scale = p1.distanceTo(p2) / this._startDist;
	
			this._zoom = map.getScaleZoom(scale, this._startZoom);
	
			if (!map.options.bounceAtZoomLimits && (
				(this._zoom < map.getMinZoom() && scale < 1) ||
				(this._zoom > map.getMaxZoom() && scale > 1))) {
				this._zoom = map._limitZoom(this._zoom);
			}
	
			if (map.options.touchZoom === 'center') {
				this._center = this._startLatLng;
				if (scale === 1) { return; }
			} else {
				// Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
				var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
				if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
				this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
			}
	
			if (!this._moved) {
				map._moveStart(true, false);
				this._moved = true;
			}
	
			cancelAnimFrame(this._animRequest);
	
			var moveFn = bind(map._move, map, this._center, this._zoom, {pinch: true, round: false});
			this._animRequest = requestAnimFrame(moveFn, this, true);
	
			preventDefault(e);
		},
	
		_onTouchEnd: function () {
			if (!this._moved || !this._zooming) {
				this._zooming = false;
				return;
			}
	
			this._zooming = false;
			cancelAnimFrame(this._animRequest);
	
			off(document, 'touchmove', this._onTouchMove);
			off(document, 'touchend', this._onTouchEnd);
	
			// Pinch updates GridLayers' levels only when zoomSnap is off, so zoomSnap becomes noUpdate.
			if (this._map.options.zoomAnimation) {
				this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
			} else {
				this._map._resetView(this._center, this._map._limitZoom(this._zoom));
			}
		}
	});
	
	// @section Handlers
	// @property touchZoom: Handler
	// Touch zoom handler.
	Map.addInitHook('addHandler', 'touchZoom', TouchZoom);
	
	Map.BoxZoom = BoxZoom;
	Map.DoubleClickZoom = DoubleClickZoom;
	Map.Drag = Drag;
	Map.Keyboard = Keyboard;
	Map.ScrollWheelZoom = ScrollWheelZoom;
	Map.Tap = Tap;
	Map.TouchZoom = TouchZoom;
	
	// misc
	
	var oldL = window.L;
	function noConflict() {
		window.L = oldL;
		return this;
	}
	
	// Always export us to window global (see #2364)
	window.L = exports;
	
	Object.freeze = freeze;
	
	exports.version = version;
	exports.noConflict = noConflict;
	exports.Control = Control;
	exports.control = control;
	exports.Browser = Browser;
	exports.Evented = Evented;
	exports.Mixin = Mixin;
	exports.Util = Util;
	exports.Class = Class;
	exports.Handler = Handler;
	exports.extend = extend;
	exports.bind = bind;
	exports.stamp = stamp;
	exports.setOptions = setOptions;
	exports.DomEvent = DomEvent;
	exports.DomUtil = DomUtil;
	exports.PosAnimation = PosAnimation;
	exports.Draggable = Draggable;
	exports.LineUtil = LineUtil;
	exports.PolyUtil = PolyUtil;
	exports.Point = Point;
	exports.point = toPoint;
	exports.Bounds = Bounds;
	exports.bounds = toBounds;
	exports.Transformation = Transformation;
	exports.transformation = toTransformation;
	exports.Projection = index;
	exports.LatLng = LatLng;
	exports.latLng = toLatLng;
	exports.LatLngBounds = LatLngBounds;
	exports.latLngBounds = toLatLngBounds;
	exports.CRS = CRS;
	exports.GeoJSON = GeoJSON;
	exports.geoJSON = geoJSON;
	exports.geoJson = geoJson;
	exports.Layer = Layer;
	exports.LayerGroup = LayerGroup;
	exports.layerGroup = layerGroup;
	exports.FeatureGroup = FeatureGroup;
	exports.featureGroup = featureGroup;
	exports.ImageOverlay = ImageOverlay;
	exports.imageOverlay = imageOverlay;
	exports.VideoOverlay = VideoOverlay;
	exports.videoOverlay = videoOverlay;
	exports.DivOverlay = DivOverlay;
	exports.Popup = Popup;
	exports.popup = popup;
	exports.Tooltip = Tooltip;
	exports.tooltip = tooltip;
	exports.Icon = Icon;
	exports.icon = icon;
	exports.DivIcon = DivIcon;
	exports.divIcon = divIcon;
	exports.Marker = Marker;
	exports.marker = marker;
	exports.TileLayer = TileLayer;
	exports.tileLayer = tileLayer;
	exports.GridLayer = GridLayer;
	exports.gridLayer = gridLayer;
	exports.SVG = SVG;
	exports.svg = svg$1;
	exports.Renderer = Renderer;
	exports.Canvas = Canvas;
	exports.canvas = canvas$1;
	exports.Path = Path;
	exports.CircleMarker = CircleMarker;
	exports.circleMarker = circleMarker;
	exports.Circle = Circle;
	exports.circle = circle;
	exports.Polyline = Polyline;
	exports.polyline = polyline;
	exports.Polygon = Polygon;
	exports.polygon = polygon;
	exports.Rectangle = Rectangle;
	exports.rectangle = rectangle;
	exports.Map = Map;
	exports.map = createMap;
	
	})));
	//# sourceMappingURL=leaflet-src.js.map


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
		Leaflet.contextmenu, a context menu for Leaflet.
		(c) 2015, Adam Ratcliffe, GeoSmart Maps Limited
	
		@preserve
	*/
	
	(function(factory) {
		// Packaging/modules magic dance
		var L;
		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module === 'object' && typeof module.exports === 'object') {
			// Node/CommonJS
			L = require('leaflet');
			module.exports = factory(L);
		} else {
			// Browser globals
			if (typeof window.L === 'undefined') {
				throw new Error('Leaflet must be loaded first');
			}
			factory(window.L);
		}
	})(function(L) {
	L.Map.mergeOptions({
	    contextmenuItems: []
	});
	
	L.Map.ContextMenu = L.Handler.extend({
	    _touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
	    
	    statics: {
	        BASE_CLS: 'leaflet-contextmenu'
	    },
	    
	    initialize: function (map) {
	        L.Handler.prototype.initialize.call(this, map);
	        
	        this._items = [];
	        this._visible = false;
	
	        var container = this._container = L.DomUtil.create('div', L.Map.ContextMenu.BASE_CLS, map._container);
	        container.style.zIndex = 10000;
	        container.style.position = 'absolute';
	
	        if (map.options.contextmenuWidth) {
	            container.style.width = map.options.contextmenuWidth + 'px';
	        }
	
	        this._createItems();
	
	        L.DomEvent
	            .on(container, 'click', L.DomEvent.stop)
	            .on(container, 'mousedown', L.DomEvent.stop)
	            .on(container, 'dblclick', L.DomEvent.stop)
	            .on(container, 'contextmenu', L.DomEvent.stop);
	    },
	
	    addHooks: function () {
	        var container = this._map.getContainer();
	
	        L.DomEvent
	            .on(container, 'mouseleave', this._hide, this)
	            .on(document, 'keydown', this._onKeyDown, this);
	
	        if (L.Browser.touch) {
	            L.DomEvent.on(document, this._touchstart, this._hide, this);
	        }
	
	        this._map.on({
	            contextmenu: this._show,
	            mousedown: this._hide,
	            movestart: this._hide,
	            zoomstart: this._hide
	        }, this);
	    },
	
	    removeHooks: function () {
	        var container = this._map.getContainer();
	
	        L.DomEvent
	            .off(container, 'mouseleave', this._hide, this)
	            .off(document, 'keydown', this._onKeyDown, this);
	
	        if (L.Browser.touch) {
	            L.DomEvent.off(document, this._touchstart, this._hide, this);
	        }
	
	        this._map.off({
	            contextmenu: this._show,
	            mousedown: this._hide,
	            movestart: this._hide,
	            zoomstart: this._hide
	        }, this);
	    },
	
	    showAt: function (point, data) {
	        if (point instanceof L.LatLng) {
	            point = this._map.latLngToContainerPoint(point);
	        }
	        this._showAtPoint(point, data);
	    },
	
	    hide: function () {
	        this._hide();
	    },
	
	    addItem: function (options) {
	        return this.insertItem(options);
	    },
	
	    insertItem: function (options, index) {
	        index = index !== undefined ? index: this._items.length;
	
	        var item = this._createItem(this._container, options, index);
	
	        this._items.push(item);
	
	        this._sizeChanged = true;
	
	        this._map.fire('contextmenu.additem', {
	            contextmenu: this,
	            el: item.el,
	            index: index
	        });
	
	        return item.el;
	    },
	
	    removeItem: function (item) {
	        var container = this._container;
	
	        if (!isNaN(item)) {
	            item = container.children[item];
	        }
	
	        if (item) {
	            this._removeItem(L.Util.stamp(item));
	
	            this._sizeChanged = true;
	
	            this._map.fire('contextmenu.removeitem', {
	                contextmenu: this,
	                el: item
	            });
	
	            return item;
	        }
	
	        return null;
	    },
	
	    removeAllItems: function () {
	        var items = this._container.children,
	            item;
	
	        while (items.length) {
	            item = items[0];
	            this._removeItem(L.Util.stamp(item));
	        }
	        return items;
	    },
	
	    hideAllItems: function () {
	        var item, i, l;
	
	        for (i = 0, l = this._items.length; i < l; i++) {
	            item = this._items[i];
	            item.el.style.display = 'none';
	        }
	    },
	
	    showAllItems: function () {
	        var item, i, l;
	
	        for (i = 0, l = this._items.length; i < l; i++) {
	            item = this._items[i];
	            item.el.style.display = '';
	        }
	    },
	
	    setDisabled: function (item, disabled) {
	        var container = this._container,
	        itemCls = L.Map.ContextMenu.BASE_CLS + '-item';
	
	        if (!isNaN(item)) {
	            item = container.children[item];
	        }
	
	        if (item && L.DomUtil.hasClass(item, itemCls)) {
	            if (disabled) {
	                L.DomUtil.addClass(item, itemCls + '-disabled');
	                this._map.fire('contextmenu.disableitem', {
	                    contextmenu: this,
	                    el: item
	                });
	            } else {
	                L.DomUtil.removeClass(item, itemCls + '-disabled');
	                this._map.fire('contextmenu.enableitem', {
	                    contextmenu: this,
	                    el: item
	                });
	            }
	        }
	    },
	
	    isVisible: function () {
	        return this._visible;
	    },
	
	    _createItems: function () {
	        var itemOptions = this._map.options.contextmenuItems,
	            item,
	            i, l;
	
	        for (i = 0, l = itemOptions.length; i < l; i++) {
	            this._items.push(this._createItem(this._container, itemOptions[i]));
	        }
	    },
	
	    _createItem: function (container, options, index) {
	        if (options.separator || options === '-') {
	            return this._createSeparator(container, index);
	        }
	
	        var itemCls = L.Map.ContextMenu.BASE_CLS + '-item',
	            cls = options.disabled ? (itemCls + ' ' + itemCls + '-disabled') : itemCls,
	            el = this._insertElementAt('a', cls, container, index),
	            callback = this._createEventHandler(el, options.callback, options.context, options.hideOnSelect),
	            icon = this._getIcon(options),
	            iconCls = this._getIconCls(options),
	            html = '';
	
	        if (icon) {
	            html = '<img class="' + L.Map.ContextMenu.BASE_CLS + '-icon" src="' + icon + '"/>';
	        } else if (iconCls) {
	            html = '<span class="' + L.Map.ContextMenu.BASE_CLS + '-icon ' + iconCls + '"></span>';
	        }
	
	        el.innerHTML = html + options.text;
	        el.href = '#';
	
	        L.DomEvent
	            .on(el, 'mouseover', this._onItemMouseOver, this)
	            .on(el, 'mouseout', this._onItemMouseOut, this)
	            .on(el, 'mousedown', L.DomEvent.stopPropagation)
	            .on(el, 'click', callback);
	
	        if (L.Browser.touch) {
	            L.DomEvent.on(el, this._touchstart, L.DomEvent.stopPropagation);
	        }
	
	        // Devices without a mouse fire "mouseover" on tap, but never “mouseout"
	        if (!L.Browser.pointer) {
	            L.DomEvent.on(el, 'click', this._onItemMouseOut, this);
	        }
	
	        return {
	            id: L.Util.stamp(el),
	            el: el,
	            callback: callback
	        };
	    },
	
	    _removeItem: function (id) {
	        var item,
	            el,
	            i, l, callback;
	
	        for (i = 0, l = this._items.length; i < l; i++) {
	            item = this._items[i];
	
	            if (item.id === id) {
	                el = item.el;
	                callback = item.callback;
	
	                if (callback) {
	                    L.DomEvent
	                        .off(el, 'mouseover', this._onItemMouseOver, this)
	                        .off(el, 'mouseover', this._onItemMouseOut, this)
	                        .off(el, 'mousedown', L.DomEvent.stopPropagation)
	                        .off(el, 'click', callback);
	
	                    if (L.Browser.touch) {
	                        L.DomEvent.off(el, this._touchstart, L.DomEvent.stopPropagation);
	                    }
	
	                    if (!L.Browser.pointer) {
	                        L.DomEvent.on(el, 'click', this._onItemMouseOut, this);
	                    }
	                }
	
	                this._container.removeChild(el);
	                this._items.splice(i, 1);
	
	                return item;
	            }
	        }
	        return null;
	    },
	
	    _createSeparator: function (container, index) {
	        var el = this._insertElementAt('div', L.Map.ContextMenu.BASE_CLS + '-separator', container, index);
	
	        return {
	            id: L.Util.stamp(el),
	            el: el
	        };
	    },
	
	    _createEventHandler: function (el, func, context, hideOnSelect) {
	        var me = this,
	            map = this._map,
	            disabledCls = L.Map.ContextMenu.BASE_CLS + '-item-disabled',
	            hideOnSelect = (hideOnSelect !== undefined) ? hideOnSelect : true;
	
	        return function (e) {
	            if (L.DomUtil.hasClass(el, disabledCls)) {
	                return;
	            }
	
	            if (hideOnSelect) {
	                me._hide();
	            }
	
	            if (func) {
	                func.call(context || map, me._showLocation);
	            }
	
	            me._map.fire('contextmenu.select', {
	                contextmenu: me,
	                el: el
	            });
	        };
	    },
	
	    _insertElementAt: function (tagName, className, container, index) {
	        var refEl,
	            el = document.createElement(tagName);
	
	        el.className = className;
	
	        if (index !== undefined) {
	            refEl = container.children[index];
	        }
	
	        if (refEl) {
	            container.insertBefore(el, refEl);
	        } else {
	            container.appendChild(el);
	        }
	
	        return el;
	    },
	
	    _show: function (e) {
	        this._showAtPoint(e.containerPoint, e);
	    },
	
	    _showAtPoint: function (pt, data) {
	        if (this._items.length) {
	            var map = this._map,
	            layerPoint = map.containerPointToLayerPoint(pt),
	            latlng = map.layerPointToLatLng(layerPoint),
	            event = L.extend(data || {}, {contextmenu: this});
	
	            this._showLocation = {
	                latlng: latlng,
	                layerPoint: layerPoint,
	                containerPoint: pt
	            };
	
	            if (data && data.relatedTarget){
	                this._showLocation.relatedTarget = data.relatedTarget;
	            }
	
	            this._setPosition(pt);
	
	            if (!this._visible) {
	                this._container.style.display = 'block';
	                this._visible = true;
	            }
	
	            this._map.fire('contextmenu.show', event);
	        }
	    },
	
	    _hide: function () {
	        if (this._visible) {
	            this._visible = false;
	            this._container.style.display = 'none';
	            this._map.fire('contextmenu.hide', {contextmenu: this});
	        }
	    },
	
	    _getIcon: function (options) {
	        return L.Browser.retina && options.retinaIcon || options.icon;
	    },
	
	    _getIconCls: function (options) {
	        return L.Browser.retina && options.retinaIconCls || options.iconCls;
	    },
	
	    _setPosition: function (pt) {
	        var mapSize = this._map.getSize(),
	            container = this._container,
	            containerSize = this._getElementSize(container),
	            anchor;
	
	        if (this._map.options.contextmenuAnchor) {
	            anchor = L.point(this._map.options.contextmenuAnchor);
	            pt = pt.add(anchor);
	        }
	
	        container._leaflet_pos = pt;
	
	        if (pt.x + containerSize.x > mapSize.x) {
	            container.style.left = 'auto';
	            container.style.right = Math.min(Math.max(mapSize.x - pt.x, 0), mapSize.x - containerSize.x - 1) + 'px';
	        } else {
	            container.style.left = Math.max(pt.x, 0) + 'px';
	            container.style.right = 'auto';
	        }
	
	        if (pt.y + containerSize.y > mapSize.y) {
	            container.style.top = 'auto';
	            container.style.bottom = Math.min(Math.max(mapSize.y - pt.y, 0), mapSize.y - containerSize.y - 1) + 'px';
	        } else {
	            container.style.top = Math.max(pt.y, 0) + 'px';
	            container.style.bottom = 'auto';
	        }
	    },
	
	    _getElementSize: function (el) {
	        var size = this._size,
	            initialDisplay = el.style.display;
	
	        if (!size || this._sizeChanged) {
	            size = {};
	
	            el.style.left = '-999999px';
	            el.style.right = 'auto';
	            el.style.display = 'block';
	
	            size.x = el.offsetWidth;
	            size.y = el.offsetHeight;
	
	            el.style.left = 'auto';
	            el.style.display = initialDisplay;
	
	            this._sizeChanged = false;
	        }
	
	        return size;
	    },
	
	    _onKeyDown: function (e) {
	        var key = e.keyCode;
	
	        // If ESC pressed and context menu is visible hide it
	        if (key === 27) {
	            this._hide();
	        }
	    },
	
	    _onItemMouseOver: function (e) {
	        L.DomUtil.addClass(e.target || e.srcElement, 'over');
	    },
	
	    _onItemMouseOut: function (e) {
	        L.DomUtil.removeClass(e.target || e.srcElement, 'over');
	    }
	});
	
	L.Map.addInitHook('addHandler', 'contextmenu', L.Map.ContextMenu);
	L.Mixin.ContextMenu = {
	    bindContextMenu: function (options) {
	        L.setOptions(this, options);
	        this._initContextMenu();
	
	        return this;
	    },
	
	    unbindContextMenu: function (){
	        this.off('contextmenu', this._showContextMenu, this);
	
	        return this;
	    },
	
	    addContextMenuItem: function (item) {
	            this.options.contextmenuItems.push(item);
	    },
	
	    removeContextMenuItemWithIndex: function (index) {
	        var items = [];
	        for (var i = 0; i < this.options.contextmenuItems.length; i++) {
	            if (this.options.contextmenuItems[i].index == index){
	                items.push(i);
	            }
	        }
	        var elem = items.pop();
	        while (elem !== undefined) {
	            this.options.contextmenuItems.splice(elem,1);
	            elem = items.pop();
	        }
	    },
	
	    replaceContextMenuItem: function (item) {
	        this.removeContextMenuItemWithIndex(item.index);
	        this.addContextMenuItem(item);
	    },
	
	    _initContextMenu: function () {
	        this._items = [];
	
	        this.on('contextmenu', this._showContextMenu, this);
	    },
	
	    _showContextMenu: function (e) {
	        var itemOptions,
	            data, pt, i, l;
	
	        if (this._map.contextmenu) {
	            data = L.extend({relatedTarget: this}, e);
	
	            pt = this._map.mouseEventToContainerPoint(e.originalEvent);
	
	            if (!this.options.contextmenuInheritItems) {
	                this._map.contextmenu.hideAllItems();
	            }
	
	            for (i = 0, l = this.options.contextmenuItems.length; i < l; i++) {
	                itemOptions = this.options.contextmenuItems[i];
	                this._items.push(this._map.contextmenu.insertItem(itemOptions, itemOptions.index));
	            }
	
	            this._map.once('contextmenu.hide', this._hideContextMenu, this);
	
	            this._map.contextmenu.showAt(pt, data);
	        }
	    },
	
	    _hideContextMenu: function () {
	        var i, l;
	
	        for (i = 0, l = this._items.length; i < l; i++) {
	            this._map.contextmenu.removeItem(this._items[i]);
	        }
	        this._items.length = 0;
	
	        if (!this.options.contextmenuInheritItems) {
	            this._map.contextmenu.showAllItems();
	        }
	    }
	};
	
	var classes = [L.Marker, L.Path],
	    defaultOptions = {
	        contextmenu: false,
	        contextmenuItems: [],
	        contextmenuInheritItems: true
	    },
	    cls, i, l;
	
	for (i = 0, l = classes.length; i < l; i++) {
	    cls = classes[i];
	
	    // L.Class should probably provide an empty options hash, as it does not test
	    // for it here and add if needed
	    if (!cls.prototype.options) {
	        cls.prototype.options = defaultOptions;
	    } else {
	        cls.mergeOptions(defaultOptions);
	    }
	
	    cls.addInitHook(function () {
	        if (this.options.contextmenu) {
	            this._initContextMenu();
	        }
	    });
	
	    cls.include(L.Mixin.ContextMenu);
	}
	return L.Map.ContextMenu;
	});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/*
	 * Google layer using Google Maps API
	 */
	
	/* global google: true */
	
	L.Google = L.Layer.extend({
		includes: L.Evented,
	
		options: {
			minZoom: 0,
			maxZoom: 18,
			tileSize: 256,
			subdomains: 'abc',
			errorTileUrl: '',
			attribution: '',
			opacity: 1,
			continuousWorld: false,
			noWrap: false,
			mapOptions: {
				backgroundColor: '#dddddd'
			}
		},
	
		// Possible types: SATELLITE, ROADMAP, HYBRID, TERRAIN
		initialize: function(type, options) {
			L.Util.setOptions(this, options);
	
			this._ready = google.maps.Map !== undefined;
			if (!this._ready) L.Google.asyncWait.push(this);
	
			this._type = type || 'SATELLITE';
		},
	
		onAdd: function(map, insertAtTheBottom) {
			this._map = map;
			this._insertAtTheBottom = insertAtTheBottom;
	
			// create a container div for tiles
			this._initContainer();
			this._initMapObject();
	
			// set up events
			map.on('viewreset', this._resetCallback, this);
	
			this._limitedUpdate = L.Util.throttle(this._update, 150, this);
			map.on('move', this._update, this);
	
			map.on('zoomanim', this._handleZoomAnim, this);
	
			//20px instead of 1em to avoid a slight overlap with google's attribution
			map._controlCorners.bottomright.style.marginBottom = '20px';
	
			this._reset();
			this._update();
		},
	
		onRemove: function(map) {
			map._container.removeChild(this._container);
	
			map.off('viewreset', this._resetCallback, this);
	
			map.off('move', this._update, this);
	
			map.off('zoomanim', this._handleZoomAnim, this);
	
			//map._controlCorners.bottomright.style.marginBottom = '0em';
		},
	
		getAttribution: function() {
			return this.options.attribution;
		},
	
		setOpacity: function(opacity) {
			this.options.opacity = opacity;
			if (opacity < 1) {
				L.DomUtil.setOpacity(this._container, opacity);
			}
		},
	
		setElementSize: function(e, size) {
			e.style.width = size.x + 'px';
			e.style.height = size.y + 'px';
		},
	
		_initContainer: function() {
			var tilePane = this._map._container,
				first = tilePane.firstChild;
	
			if (!this._container) {
				this._container = L.DomUtil.create('div', 'leaflet-google-layer leaflet-top leaflet-left');
				this._container.id = '_GMapContainer_' + L.Util.stamp(this);
				this._container.style.zIndex = 'auto';
			}
	
			tilePane.insertBefore(this._container, first);
	
			this.setOpacity(this.options.opacity);
			this.setElementSize(this._container, this._map.getSize());
		},
	
		_initMapObject: function() {
			if (!this._ready) return;
			this._google_center = new google.maps.LatLng(0, 0);
			var map = new google.maps.Map(this._container, {
				center: this._google_center,
				zoom: 0,
				tilt: 0,
				mapTypeId: google.maps.MapTypeId[this._type],
				disableDefaultUI: true,
				keyboardShortcuts: false,
				draggable: false,
				disableDoubleClickZoom: true,
				scrollwheel: false,
				streetViewControl: false,
				styles: this.options.mapOptions.styles,
				backgroundColor: this.options.mapOptions.backgroundColor
			});
	
			var _this = this;
			this._reposition = google.maps.event.addListenerOnce(map, 'center_changed',
				function() { _this.onReposition(); });
			this._google = map;
	
			google.maps.event.addListenerOnce(map, 'idle',
				function() { _this._checkZoomLevels(); });
			google.maps.event.addListenerOnce(map, 'tilesloaded',
				function() { _this.fire('load'); });
			//Reporting that map-object was initialized.
			this.fire('MapObjectInitialized', { mapObject: map });
		},
	
		_checkZoomLevels: function() {
			//setting the zoom level on the Google map may result in a different zoom level than the one requested
			//(it won't go beyond the level for which they have data).
			// verify and make sure the zoom levels on both Leaflet and Google maps are consistent
			if (this._google.getZoom() !== this._map.getZoom()) {
				//zoom levels are out of sync. Set the leaflet zoom level to match the google one
				this._map.setZoom( this._google.getZoom() );
			}
		},
	
		_resetCallback: function(e) {
			this._reset(e.hard);
		},
	
		_reset: function(clearOldContainer) {
			this._initContainer();
		},
	
		_update: function(e) {
			if (!this._google) return;
			this._resize();
	
			var center = this._map.getCenter();
			var _center = new google.maps.LatLng(center.lat, center.lng);
	
			this._google.setCenter(_center);
			this._google.setZoom(Math.round(this._map.getZoom()));
	
			this._checkZoomLevels();
		},
	
		_resize: function() {
			var size = this._map.getSize();
			if (this._container.style.width === size.x &&
					this._container.style.height === size.y)
				return;
			this.setElementSize(this._container, size);
			this.onReposition();
		},
	
	
		_handleZoomAnim: function (e) {
			var center = e.center;
			var _center = new google.maps.LatLng(center.lat, center.lng);
	
			this._google.setCenter(_center);
			this._google.setZoom(Math.round(e.zoom));
		},
	
	
		onReposition: function() {
			if (!this._google) return;
			google.maps.event.trigger(this._google, 'resize');
		}
	});
	
	L.Google.asyncWait = [];
	L.Google.asyncInitialize = function() {
		var i;
		for (i = 0; i < L.Google.asyncWait.length; i++) {
			var o = L.Google.asyncWait[i];
			o._ready = true;
			if (o._container) {
				o._initMapObject();
				o._update();
			}
		}
		L.Google.asyncWait = [];
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../css-loader/index.js!./Control.Geocoder.css", function() {
				var newContent = require("!!../../css-loader/index.js!./Control.Geocoder.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".leaflet-control-geocoder {\n\tborder-radius: 4px;\n\tbackground: white;\n\tmin-width: 26px;\n\tmin-height: 26px;\n}\n\n.leaflet-touch .leaflet-control-geocoder {\n\tmin-width: 30px;\n\tmin-height: 30px;\n}\n\n.leaflet-control-geocoder a, .leaflet-control-geocoder .leaflet-control-geocoder-icon {\n\tborder-bottom: none;\n\tdisplay: inline-block;\n}\n\n.leaflet-control-geocoder .leaflet-control-geocoder-alternatives a {\n\twidth: inherit;\n\theight: inherit;\n\tline-height: inherit;\n}\n\n.leaflet-control-geocoder a:hover, .leaflet-control-geocoder .leaflet-control-geocoder-icon:hover {\n\tborder-bottom: none;\n\tdisplay: inline-block;\n}\n\n.leaflet-control-geocoder-form {\n\tdisplay: none;\n\tvertical-align: middle;\n}\n.leaflet-control-geocoder-expanded .leaflet-control-geocoder-form {\n\tdisplay: inline-block;\n}\n.leaflet-control-geocoder-form input {\n\tfont-size: 120%;\n\tborder: 0;\n\tbackground-color: transparent;\n\twidth: 246px;\n}\n\n.leaflet-control-geocoder-icon {\n\tborder-radius: 4px;\n\twidth: 26px;\n\theight: 26px;\n\tborder: none;\n\tbackground-color: white;\n\tbackground-image: url(" + __webpack_require__(15) + ");\n\tbackground-repeat: no-repeat;\n\tbackground-position: center;\n\tcursor: pointer;\n}\n\n.leaflet-touch .leaflet-control-geocoder-icon {\n\twidth: 30px;\n\theight: 30px;\n}\n\n.leaflet-control-geocoder-throbber .leaflet-control-geocoder-icon {\n\tbackground-image: url(" + __webpack_require__(16) + ");\n}\n\n.leaflet-control-geocoder-form-no-error {\n\tdisplay: none;\n}\n\n.leaflet-control-geocoder-form input:focus {\n\toutline: none;\n}\n\n.leaflet-control-geocoder-form button {\n\tdisplay: none;\n}\n.leaflet-control-geocoder-error {\n\tmargin-top: 8px;\n\tmargin-left: 8px;\n\tdisplay: block;\n\tcolor: #444;\n}\n.leaflet-control-geocoder-alternatives {\n\tdisplay: block;\n\twidth: 272px;\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.leaflet-control-geocoder-alternatives-minimized {\n\tdisplay: none;\n\theight: 0;\n}\n.leaflet-control-geocoder-alternatives li {\n\twhite-space: nowrap;\n\tdisplay: block;\n\toverflow: hidden;\n\tpadding: 5px 8px;\n\ttext-overflow: ellipsis;\n\tborder-bottom: 1px solid #ccc;\n\tcursor: pointer;\n}\n\n.leaflet-control-geocoder-alternatives li a, .leaflet-control-geocoder-alternatives li a:hover {\n\twidth: inherit;\n\theight: inherit;\n\tline-height: inherit;\n\tbackground: inherit;\n\tborder-radius: inherit;\n\ttext-align: left;\n}\n\n.leaflet-control-geocoder-alternatives li:last-child {\n\tborder-bottom: none;\n}\n.leaflet-control-geocoder-alternatives li:hover, .leaflet-control-geocoder-selected {\n\tbackground-color: #f5f5f5;\n}\n.leaflet-control-geocoder-address-detail {\n\t\n}\n.leaflet-control-geocoder-address-context {\n\tcolor: #666;\n}", ""]);
	
	// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a987f06fc5d9aaa4e9dfa3df0b37ee22.png";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7bec7f6885833b0b60a0426f027d8f16.gif";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.leafletControlGeocoder = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Nominatim = _dereq_('./geocoders/nominatim')["class"];
	
	module.exports = {
		"class": L.Control.extend({
			options: {
				showResultIcons: false,
				collapsed: true,
				expand: 'touch', // options: touch, click, anythingelse
				position: 'topright',
				placeholder: 'Search...',
				errorMessage: 'Nothing found.',
				suggestMinLength: 3,
				suggestTimeout: 250,
				defaultMarkGeocode: true
			},
	
			includes: L.Evented.prototype || L.Mixin.Events,
	
			initialize: function (options) {
				L.Util.setOptions(this, options);
				if (!this.options.geocoder) {
					this.options.geocoder = new Nominatim();
				}
	
				this._requestCount = 0;
			},
	
			onAdd: function (map) {
				var className = 'leaflet-control-geocoder',
				    container = L.DomUtil.create('div', className + ' leaflet-bar'),
				    icon = L.DomUtil.create('button', className + '-icon', container),
				    form = this._form = L.DomUtil.create('div', className + '-form', container),
				    input;
	
				this._map = map;
				this._container = container;
	
				icon.innerHTML = '&nbsp;';
				icon.type = 'button';
	
				input = this._input = L.DomUtil.create('input', '', form);
				input.type = 'text';
				input.placeholder = this.options.placeholder;
	
				this._errorElement = L.DomUtil.create('div', className + '-form-no-error', container);
				this._errorElement.innerHTML = this.options.errorMessage;
	
				this._alts = L.DomUtil.create('ul',
					className + '-alternatives leaflet-control-geocoder-alternatives-minimized',
					container);
				L.DomEvent.disableClickPropagation(this._alts);
	
				L.DomEvent.addListener(input, 'keydown', this._keydown, this);
				if (this.options.geocoder.suggest) {
					L.DomEvent.addListener(input, 'input', this._change, this);
				}
				L.DomEvent.addListener(input, 'blur', function() {
					if (this.options.collapsed && !this._preventBlurCollapse) {
						this._collapse();
					}
					this._preventBlurCollapse = false;
				}, this);
	
	
				if (this.options.collapsed) {
					if (this.options.expand === 'click') {
						L.DomEvent.addListener(container, 'click', function(e) {
							if (e.button === 0 && e.detail !== 2) {
								this._toggle();
							}
						}, this);
					}
					else if (L.Browser.touch && this.options.expand === 'touch') {
						L.DomEvent.addListener(container, 'touchstart mousedown', function(e) {
							this._toggle();
							e.preventDefault(); // mobile: clicking focuses the icon, so UI expands and immediately collapses
							e.stopPropagation();
						}, this);
					}
					else {
						L.DomEvent.addListener(container, 'mouseover', this._expand, this);
						L.DomEvent.addListener(container, 'mouseout', this._collapse, this);
						this._map.on('movestart', this._collapse, this);
					}
				} else {
					this._expand();
					if (L.Browser.touch) {
						L.DomEvent.addListener(container, 'touchstart', function(e) {
							this._geocode(e);
						}, this);
					}
					else {
						L.DomEvent.addListener(container, 'click', function(e) {
							this._geocode(e);
						}, this);
					}
				}
	
				if (this.options.defaultMarkGeocode) {
					this.on('markgeocode', this.markGeocode, this);
				}
	
				this.on('startgeocode', function() {
					L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-throbber');
				}, this);
				this.on('finishgeocode', function() {
					L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-throbber');
				}, this);
	
				L.DomEvent.disableClickPropagation(container);
	
				return container;
			},
	
			_geocodeResult: function (results, suggest) {
				if (!suggest && results.length === 1) {
					this._geocodeResultSelected(results[0]);
				} else if (results.length > 0) {
					this._alts.innerHTML = '';
					this._results = results;
					L.DomUtil.removeClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
					for (var i = 0; i < results.length; i++) {
						this._alts.appendChild(this._createAlt(results[i], i));
					}
				} else {
					L.DomUtil.addClass(this._errorElement, 'leaflet-control-geocoder-error');
				}
			},
	
			markGeocode: function(result) {
				result = result.geocode || result;
	
				this._map.fitBounds(result.bbox);
	
				if (this._geocodeMarker) {
					this._map.removeLayer(this._geocodeMarker);
				}
	
				this._geocodeMarker = new L.Marker(result.center)
					.bindPopup(result.html || result.name)
					.addTo(this._map)
					.openPopup();
	
				return this;
			},
	
			_geocode: function(suggest) {
				var requestCount = ++this._requestCount,
					mode = suggest ? 'suggest' : 'geocode',
					eventData = {input: this._input.value};
	
				this._lastGeocode = this._input.value;
				if (!suggest) {
					this._clearResults();
				}
	
				this.fire('start' + mode, eventData);
				this.options.geocoder[mode](this._input.value, function(results) {
					if (requestCount === this._requestCount) {
						eventData.results = results;
						this.fire('finish' + mode, eventData);
						this._geocodeResult(results, suggest);
					}
				}, this);
			},
	
			_geocodeResultSelected: function(result) {
				this.fire('markgeocode', {geocode: result});
			},
	
			_toggle: function() {
				if (L.DomUtil.hasClass(this._container, 'leaflet-control-geocoder-expanded')) {
					this._collapse();
				} else {
					this._expand();
				}
			},
	
			_expand: function () {
				L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
				this._input.select();
				this.fire('expand');
			},
	
			_collapse: function () {
				L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-expanded');
				L.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
				L.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
				this._input.blur(); // mobile: keyboard shouldn't stay expanded
				this.fire('collapse');
			},
	
			_clearResults: function () {
				L.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
				this._selection = null;
				L.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
			},
	
			_createAlt: function(result, index) {
				var li = L.DomUtil.create('li', ''),
					a = L.DomUtil.create('a', '', li),
					icon = this.options.showResultIcons && result.icon ? L.DomUtil.create('img', '', a) : null,
					text = result.html ? undefined : document.createTextNode(result.name),
					mouseDownHandler = function mouseDownHandler(e) {
						// In some browsers, a click will fire on the map if the control is
						// collapsed directly after mousedown. To work around this, we
						// wait until the click is completed, and _then_ collapse the
						// control. Messy, but this is the workaround I could come up with
						// for #142.
						this._preventBlurCollapse = true;
						L.DomEvent.stop(e);
						this._geocodeResultSelected(result);
						L.DomEvent.on(li, 'click', function() {
							if (this.options.collapsed) {
								this._collapse();
							} else {
								this._clearResults();
							}
						}, this);
					};
	
				if (icon) {
					icon.src = result.icon;
				}
	
				li.setAttribute('data-result-index', index);
	
				if (result.html) {
					a.innerHTML = a.innerHTML + result.html;
				} else {
					a.appendChild(text);
				}
	
				// Use mousedown and not click, since click will fire _after_ blur,
				// causing the control to have collapsed and removed the items
				// before the click can fire.
				L.DomEvent.addListener(li, 'mousedown touchstart', mouseDownHandler, this);
	
				return li;
			},
	
			_keydown: function(e) {
				var _this = this,
				    select = function select(dir) {
						if (_this._selection) {
							L.DomUtil.removeClass(_this._selection, 'leaflet-control-geocoder-selected');
							_this._selection = _this._selection[dir > 0 ? 'nextSibling' : 'previousSibling'];
						}
						if (!_this._selection) {
							_this._selection = _this._alts[dir > 0 ? 'firstChild' : 'lastChild'];
						}
	
						if (_this._selection) {
							L.DomUtil.addClass(_this._selection, 'leaflet-control-geocoder-selected');
						}
					};
	
				switch (e.keyCode) {
				// Escape
				case 27:
					if (this.options.collapsed) {
						this._collapse();
					}
					break;
				// Up
				case 38:
					select(-1);
					break;
				// Up
				case 40:
					select(1);
					break;
				// Enter
				case 13:
					if (this._selection) {
						var index = parseInt(this._selection.getAttribute('data-result-index'), 10);
						this._geocodeResultSelected(this._results[index]);
						this._clearResults();
					} else {
						this._geocode();
					}
					break;
				}
			},
			_change: function(e) {
				var v = this._input.value;
				if (v !== this._lastGeocode) {
					clearTimeout(this._suggestTimeout);
					if (v.length >= this.options.suggestMinLength) {
						this._suggestTimeout = setTimeout(L.bind(function() {
							this._geocode(true);
						}, this), this.options.suggestTimeout);
					} else {
						this._clearResults();
					}
				}
			}
		}),
		factory: function(options) {
			return new L.Control.Geocoder(options);
		}
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"./geocoders/nominatim":9}],2:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			options: {
				service_url: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
			},
	
			initialize: function(accessToken, options) {
				L.setOptions(this, options);
				this._accessToken = accessToken;
			},
	
			geocode: function(query, cb, context) {
				var params = {
					SingleLine: query,
					outFields: 'Addr_Type',
					forStorage: false,
					maxLocations: 10,
					f: 'json'
				};
	
				if (this._key && this._key.length) {
					params.token = this._key;
				}
	
				Util.getJSON(this.options.service_url + '/findAddressCandidates', params, function(data) {
					var results = [],
						loc,
						latLng,
						latLngBounds;
	
					if (data.candidates && data.candidates.length) {
						for (var i = 0; i <= data.candidates.length - 1; i++) {
							loc = data.candidates[i];
							latLng = L.latLng(loc.location.y, loc.location.x);
							latLngBounds = L.latLngBounds(L.latLng(loc.extent.ymax, loc.extent.xmax), L.latLng(loc.extent.ymin, loc.extent.xmin));
							results[i] = {
									name: loc.address,
									bbox: latLngBounds,
									center: latLng
							};
						}
					}
	
					cb.call(context, results);
				});
			},
	
			suggest: function(query, cb, context) {
				return this.geocode(query, cb, context);
			},
	
			reverse: function(location, scale, cb, context) {
				var params = {
					location: encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat),
					distance: 100,
					f: 'json'
				};
	
				Util.getJSON(this.options.service_url + '/reverseGeocode', params, function(data) {
					var result = [],
						loc;
	
					if (data && !data.error) {
						loc = L.latLng(data.location.y, data.location.x);
						result.push({
							name: data.address.Match_addr,
							center: loc,
							bounds: L.latLngBounds(loc, loc)
						});
					}
	
					cb.call(context, result);
				});
			}
		}),
	
		factory: function(accessToken, options) {
			return new L.Control.Geocoder.ArcGis(accessToken, options);
		}
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],3:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			initialize: function(key) {
				this.key = key;
			},
	
			geocode : function (query, cb, context) {
				Util.jsonp('https://dev.virtualearth.net/REST/v1/Locations', {
					query: query,
					key : this.key
				}, function(data) {
					var results = [];
					if( data.resourceSets.length > 0 ){
						for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
							var resource = data.resourceSets[0].resources[i],
								bbox = resource.bbox;
							results[i] = {
								name: resource.name,
								bbox: L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
								center: L.latLng(resource.point.coordinates)
							};
						}
					}
					cb.call(context, results);
				}, this, 'jsonp');
			},
	
			reverse: function(location, scale, cb, context) {
				Util.jsonp('//dev.virtualearth.net/REST/v1/Locations/' + location.lat + ',' + location.lng, {
					key : this.key
				}, function(data) {
					var results = [];
					for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
						var resource = data.resourceSets[0].resources[i],
							bbox = resource.bbox;
						results[i] = {
							name: resource.name,
							bbox: L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
							center: L.latLng(resource.point.coordinates)
						};
					}
					cb.call(context, results);
				}, this, 'jsonp');
			}
		}),
	
		factory: function(key) {
			return new L.Control.Geocoder.Bing(key);
		}
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],4:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			options: {
				serviceUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
				geocodingQueryParams: {},
				reverseQueryParams: {}
			},
	
			initialize: function(key, options) {
				this._key = key;
				L.setOptions(this, options);
				// Backwards compatibility
				this.options.serviceUrl = this.options.service_url || this.options.serviceUrl;
			},
	
			geocode: function(query, cb, context) {
				var params = {
					address: query
				};
	
				if (this._key && this._key.length) {
					params.key = this._key;
				}
	
				params = L.Util.extend(params, this.options.geocodingQueryParams);
	
				Util.getJSON(this.options.serviceUrl, params, function(data) {
					var results = [],
							loc,
							latLng,
							latLngBounds;
					if (data.results && data.results.length) {
						for (var i = 0; i <= data.results.length - 1; i++) {
							loc = data.results[i];
							latLng = L.latLng(loc.geometry.location);
							latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
							results[i] = {
								name: loc.formatted_address,
								bbox: latLngBounds,
								center: latLng,
								properties: loc.address_components
							};
						}
					}
	
					cb.call(context, results);
				});
			},
	
			reverse: function(location, scale, cb, context) {
				var params = {
					latlng: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng)
				};
				params = L.Util.extend(params, this.options.reverseQueryParams);
				if (this._key && this._key.length) {
					params.key = this._key;
				}
	
				Util.getJSON(this.options.serviceUrl, params, function(data) {
					var results = [],
							loc,
							latLng,
							latLngBounds;
					if (data.results && data.results.length) {
						for (var i = 0; i <= data.results.length - 1; i++) {
							loc = data.results[i];
							latLng = L.latLng(loc.geometry.location);
							latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
							results[i] = {
								name: loc.formatted_address,
								bbox: latLngBounds,
								center: latLng,
								properties: loc.address_components
							};
						}
					}
	
					cb.call(context, results);
				});
			}
		}),
	
		factory: function(key, options) {
			return new L.Control.Geocoder.Google(key, options);
		}
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],5:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	    Util = _dereq_('../util');
	
	module.exports = {
	    "class": L.Class.extend({
	        options: {
	            geocodeUrl: 'http://geocoder.api.here.com/6.2/geocode.json',
	            reverseGeocodeUrl: 'http://reverse.geocoder.api.here.com/6.2/reversegeocode.json',
	            app_id: '<insert your app_id here>',
	            app_code: '<insert your app_code here>',
	            geocodingQueryParams: {},
	            reverseQueryParams: {}
	        },
	
	        initialize: function(options) {
	            L.setOptions(this, options);
	        },
	
	        geocode: function(query, cb, context) {
	            var params = {
	                searchtext: query,
	                gen: 9,
	                app_id: this.options.app_id,
	                app_code: this.options.app_code,
	                jsonattributes: 1
	            };
	            params = L.Util.extend(params, this.options.geocodingQueryParams);
	            this.getJSON(this.options.geocodeUrl, params, cb, context);
	        },
	
	        reverse: function(location, scale, cb, context) {
	            var params = {
	                prox: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng),
	                mode: 'retrieveAddresses',
	                app_id: this.options.app_id,
	                app_code: this.options.app_code,
	                gen: 9,
	                jsonattributes: 1
	            };
	            params = L.Util.extend(params, this.options.reverseQueryParams);
	            this.getJSON(this.options.reverseGeocodeUrl, params, cb, context);
	        },
	
	        getJSON: function(url, params, cb, context) {
	            Util.getJSON(url, params, function(data) {
	                var results = [],
	                    loc,
	                    latLng,
	                    latLngBounds;
	                if (data.response.view && data.response.view.length) {
	                    for (var i = 0; i <= data.response.view[0].result.length - 1; i++) {
	                        loc = data.response.view[0].result[i].location;
	                        latLng = L.latLng(loc.displayPosition.latitude, loc.displayPosition.longitude);
	                        latLngBounds = L.latLngBounds(L.latLng(loc.mapView.topLeft.latitude, loc.mapView.topLeft.longitude), L.latLng(loc.mapView.bottomRight.latitude, loc.mapView.bottomRight.longitude));
	                        results[i] = {
	                            name: loc.address.label,
	                            bbox: latLngBounds,
	                            center: latLng
	                        };
	                    }
	                }
	                cb.call(context, results);
	            })
	        }
	    }),
	
	    factory: function(options) {
	        return new L.Control.Geocoder.HERE(options);
	    }
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],6:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			options: {
				serviceUrl: 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/',
				geocodingQueryParams: {},
				reverseQueryParams: {}
			},
	
			initialize: function(accessToken, options) {
				L.setOptions(this, options);
				this.options.geocodingQueryParams.access_token = accessToken;
				this.options.reverseQueryParams.access_token = accessToken;
			},
	
			geocode: function(query, cb, context) {
				var params = this.options.geocodingQueryParams;
				if (typeof params.proximity !== 'undefined'
					&& params.proximity.hasOwnProperty('lat')
					&& params.proximity.hasOwnProperty('lng'))
				{
					params.proximity = params.proximity.lng + ',' + params.proximity.lat;
				}
				Util.getJSON(this.options.serviceUrl + encodeURIComponent(query) + '.json', params, function(data) {
					var results = [],
					loc,
					latLng,
					latLngBounds;
					if (data.features && data.features.length) {
						for (var i = 0; i <= data.features.length - 1; i++) {
							loc = data.features[i];
							latLng = L.latLng(loc.center.reverse());
							if (loc.hasOwnProperty('bbox'))
							{
								latLngBounds = L.latLngBounds(L.latLng(loc.bbox.slice(0, 2).reverse()), L.latLng(loc.bbox.slice(2, 4).reverse()));
							}
							else
							{
								latLngBounds = L.latLngBounds(latLng, latLng);
							}
							results[i] = {
								name: loc.place_name,
								bbox: latLngBounds,
								center: latLng
							};
						}
					}
	
					cb.call(context, results);
				});
			},
	
			suggest: function(query, cb, context) {
				return this.geocode(query, cb, context);
			},
	
			reverse: function(location, scale, cb, context) {
				Util.getJSON(this.options.serviceUrl + encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat) + '.json', this.options.reverseQueryParams, function(data) {
					var results = [],
					loc,
					latLng,
					latLngBounds;
					if (data.features && data.features.length) {
						for (var i = 0; i <= data.features.length - 1; i++) {
							loc = data.features[i];
							latLng = L.latLng(loc.center.reverse());
							if (loc.hasOwnProperty('bbox'))
							{
								latLngBounds = L.latLngBounds(L.latLng(loc.bbox.slice(0, 2).reverse()), L.latLng(loc.bbox.slice(2, 4).reverse()));
							}
							else
							{
								latLngBounds = L.latLngBounds(latLng, latLng);
							}
							results[i] = {
								name: loc.place_name,
								bbox: latLngBounds,
								center: latLng
							};
						}
					}
	
					cb.call(context, results);
				});
			}
		}),
	
		factory: function(accessToken, options) {
			return new L.Control.Geocoder.Mapbox(accessToken, options);
		}
	};
	
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],7:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			options: {
				serviceUrl: 'https://www.mapquestapi.com/geocoding/v1'
			},
	
			initialize: function(key, options) {
				// MapQuest seems to provide URI encoded API keys,
				// so to avoid encoding them twice, we decode them here
				this._key = decodeURIComponent(key);
	
				L.Util.setOptions(this, options);
			},
	
			_formatName: function() {
				var r = [],
					i;
				for (i = 0; i < arguments.length; i++) {
					if (arguments[i]) {
						r.push(arguments[i]);
					}
				}
	
				return r.join(', ');
			},
	
			geocode: function(query, cb, context) {
				Util.jsonp(this.options.serviceUrl + '/address', {
					key: this._key,
					location: query,
					limit: 5,
					outFormat: 'json'
				}, function(data) {
					var results = [],
						loc,
						latLng;
					if (data.results && data.results[0].locations) {
						for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
							loc = data.results[0].locations[i];
							latLng = L.latLng(loc.latLng);
							results[i] = {
								name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
								bbox: L.latLngBounds(latLng, latLng),
								center: latLng
							};
						}
					}
	
					cb.call(context, results);
				}, this);
			},
	
			reverse: function(location, scale, cb, context) {
				Util.jsonp(this.options.serviceUrl + '/reverse', {
					key: this._key,
					location: location.lat + ',' + location.lng,
					outputFormat: 'json'
				}, function(data) {
					var results = [],
						loc,
						latLng;
					if (data.results && data.results[0].locations) {
						for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
							loc = data.results[0].locations[i];
							latLng = L.latLng(loc.latLng);
							results[i] = {
								name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
								bbox: L.latLngBounds(latLng, latLng),
								center: latLng
							};
						}
					}
	
					cb.call(context, results);
				}, this);
			}
		}),
	
		factory: function(key, options) {
			return new L.Control.Geocoder.MapQuest(key, options);
		}
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],8:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			options: {
				serviceUrl: 'https://search.mapzen.com/v1',
				geocodingQueryParams: {},
				reverseQueryParams: {}
			},
	
			initialize: function(apiKey, options) {
				L.Util.setOptions(this, options);
				this._apiKey = apiKey;
				this._lastSuggest = 0;
			},
	
			geocode: function(query, cb, context) {
				var _this = this;
				Util.getJSON(this.options.serviceUrl + "/search", L.extend({
					'api_key': this._apiKey,
					'text': query
				}, this.options.geocodingQueryParams), function(data) {
					cb.call(context, _this._parseResults(data, "bbox"));
				});
			},
	
			suggest: function(query, cb, context) {
				var _this = this;
				Util.getJSON(this.options.serviceUrl + "/autocomplete", L.extend({
					'api_key': this._apiKey,
					'text': query
				}, this.options.geocodingQueryParams), L.bind(function(data) {
					if (data.geocoding.timestamp > this._lastSuggest) {
						this._lastSuggest = data.geocoding.timestamp;
						cb.call(context, _this._parseResults(data, "bbox"));
					}
				}, this));
			},
	
			reverse: function(location, scale, cb, context) {
				var _this = this;
				Util.getJSON(this.options.serviceUrl + "/reverse", L.extend({
					'api_key': this._apiKey,
					'point.lat': location.lat,
					'point.lon': location.lng
				}, this.options.reverseQueryParams), function(data) {
					cb.call(context, _this._parseResults(data, "bounds"));
				});
			},
	
			_parseResults: function(data, bboxname) {
				var results = [];
				L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng);
					},
					onEachFeature: function(feature, layer) {
						var result = {},
							bbox,
							center;
	
						if (layer.getBounds) {
							bbox = layer.getBounds();
							center = bbox.getCenter();
						} else {
							center = layer.getLatLng();
							bbox = L.latLngBounds(center, center);
						}
	
						result.name = layer.feature.properties.label;
						result.center = center;
						result[bboxname] = bbox;
						result.properties = layer.feature.properties;
						results.push(result);
					}
				});
				return results;
			}
		}),
	
		factory: function(apiKey, options) {
			return new L.Control.Geocoder.Mapzen(apiKey, options);
		}
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],9:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			options: {
				serviceUrl: 'https://nominatim.openstreetmap.org/',
				geocodingQueryParams: {},
				reverseQueryParams: {},
				htmlTemplate: function(r) {
					var a = r.address,
						parts = [];
					if (a.road || a.building) {
						parts.push('{building} {road} {house_number}');
					}
	
					if (a.city || a.town || a.village || a.hamlet) {
						parts.push('<span class="' + (parts.length > 0 ? 'leaflet-control-geocoder-address-detail' : '') +
							'">{postcode} {city} {town} {village} {hamlet}</span>');
					}
	
					if (a.state || a.country) {
						parts.push('<span class="' + (parts.length > 0 ? 'leaflet-control-geocoder-address-context' : '') +
							'">{state} {country}</span>');
					}
	
					return Util.template(parts.join('<br/>'), a, true);
				}
			},
	
			initialize: function(options) {
				L.Util.setOptions(this, options);
			},
	
			geocode: function(query, cb, context) {
				Util.jsonp(this.options.serviceUrl + 'search', L.extend({
					q: query,
					limit: 5,
					format: 'json',
					addressdetails: 1
				}, this.options.geocodingQueryParams),
				function(data) {
					var results = [];
					for (var i = data.length - 1; i >= 0; i--) {
						var bbox = data[i].boundingbox;
						for (var j = 0; j < 4; j++) bbox[j] = parseFloat(bbox[j]);
						results[i] = {
							icon: data[i].icon,
							name: data[i].display_name,
							html: this.options.htmlTemplate ?
								this.options.htmlTemplate(data[i])
								: undefined,
							bbox: L.latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
							center: L.latLng(data[i].lat, data[i].lon),
							properties: data[i]
						};
					}
					cb.call(context, results);
				}, this, 'json_callback');
			},
	
			reverse: function(location, scale, cb, context) {
				Util.jsonp(this.options.serviceUrl + 'reverse', L.extend({
					lat: location.lat,
					lon: location.lng,
					zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
					addressdetails: 1,
					format: 'json'
				}, this.options.reverseQueryParams), function(data) {
					var result = [],
					    loc;
	
					if (data && data.lat && data.lon) {
						loc = L.latLng(data.lat, data.lon);
						result.push({
							name: data.display_name,
							html: this.options.htmlTemplate ?
								this.options.htmlTemplate(data)
								: undefined,
							center: loc,
							bounds: L.latLngBounds(loc, loc),
							properties: data
						});
					}
	
					cb.call(context, result);
				}, this, 'json_callback');
			}
		}),
	
		factory: function(options) {
			return new L.Control.Geocoder.Nominatim(options);
		}
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],10:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			options: {
				serviceUrl: 'https://photon.komoot.de/api/',
				reverseUrl: 'https://photon.komoot.de/reverse/',
				nameProperties: [
					'name',
					'street',
					'suburb',
					'hamlet',
					'town',
					'city',
					'state',
					'country'
				]
			},
	
			initialize: function(options) {
				L.setOptions(this, options);
			},
	
			geocode: function(query, cb, context) {
				var params = L.extend({
					q: query
				}, this.options.geocodingQueryParams);
	
				Util.getJSON(this.options.serviceUrl, params, L.bind(function(data) {
					cb.call(context, this._decodeFeatures(data));
				}, this));
			},
	
			suggest: function(query, cb, context) {
				return this.geocode(query, cb, context);
			},
	
			reverse: function(latLng, scale, cb, context) {
				var params = L.extend({
					lat: latLng.lat,
					lon: latLng.lng
				}, this.options.geocodingQueryParams);
	
				Util.getJSON(this.options.reverseUrl, params, L.bind(function(data) {
					cb.call(context, this._decodeFeatures(data));
				}, this));
			},
	
			_decodeFeatures: function(data) {
				var results = [],
					i,
					f,
					c,
					latLng,
					extent,
					bbox;
	
				if (data && data.features) {
					for (i = 0; i < data.features.length; i++) {
						f = data.features[i];
						c = f.geometry.coordinates;
						latLng = L.latLng(c[1], c[0]);
						extent = f.properties.extent;
	
						if (extent) {
							bbox = L.latLngBounds([extent[1], extent[0]], [extent[3], extent[2]]);
						} else {
							bbox = L.latLngBounds(latLng, latLng);
						}
	
						results.push({
							name: this._deocodeFeatureName(f),
							html: this.options.htmlTemplate ?
								this.options.htmlTemplate(f)
								: undefined,
							center: latLng,
							bbox: bbox,
							properties: f.properties
						});
					}
				}
	
				return results;
			},
	
			_deocodeFeatureName: function(f) {
				var j,
					name;
				for (j = 0; !name && j < this.options.nameProperties.length; j++) {
					name = f.properties[this.options.nameProperties[j]];
				}
	
				return name;
			}
		}),
	
		factory: function(options) {
			return new L.Control.Geocoder.Photon(options);
		}
	};
	
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],11:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Util = _dereq_('../util');
	
	module.exports = {
		"class": L.Class.extend({
			options: {
				serviceUrl: 'https://api.what3words.com/v2/'
			},
	
			initialize: function(accessToken) {
				this._accessToken = accessToken;
			},
	
			geocode: function(query, cb, context) {
				//get three words and make a dot based string
				Util.getJSON(this.options.serviceUrl +'forward', {
					key: this._accessToken,
					addr: query.split(/\s+/).join('.')
				}, function(data) {
					var results = [], loc, latLng, latLngBounds;
					if (data.hasOwnProperty('geometry')) {
						latLng = L.latLng(data.geometry['lat'],data.geometry['lng']);
						latLngBounds = L.latLngBounds(latLng, latLng);
						results[0] = {
							name: data.words,
							bbox: latLngBounds,
							center: latLng
						};
					}
	
					cb.call(context, results);
				});
			},
	
			suggest: function(query, cb, context) {
				return this.geocode(query, cb, context);
			},
	
			reverse: function(location, scale, cb, context) {
				Util.getJSON(this.options.serviceUrl +'reverse', {
					key: this._accessToken,
					coords: [location.lat,location.lng].join(',')
				}, function(data) {
					var results = [],loc,latLng,latLngBounds;
					if (data.status.status == 200) {
						latLng = L.latLng(data.geometry['lat'],data.geometry['lng']);
						latLngBounds = L.latLngBounds(latLng, latLng);
						results[0] = {
							name: data.words,
							bbox: latLngBounds,
							center: latLng
						};
					}
					cb.call(context, results);
				});
			}
		}),
	
		factory: function(accessToken) {
			return new L.Control.Geocoder.What3Words(accessToken);
		}
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"../util":13}],12:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		Control = _dereq_('./control'),
		Nominatim = _dereq_('./geocoders/nominatim'),
		Bing = _dereq_('./geocoders/bing'),
		MapQuest = _dereq_('./geocoders/mapquest'),
		Mapbox = _dereq_('./geocoders/mapbox'),
		What3Words = _dereq_('./geocoders/what3words'),
		Google = _dereq_('./geocoders/google'),
		Photon = _dereq_('./geocoders/photon'),
		Mapzen = _dereq_('./geocoders/mapzen'),
		ArcGis = _dereq_('./geocoders/arcgis'),
		HERE = _dereq_('./geocoders/here');
	
	module.exports = L.Util.extend(Control["class"], {
		Nominatim: Nominatim["class"],
		nominatim: Nominatim.factory,
		Bing: Bing["class"],
		bing: Bing.factory,
		MapQuest: MapQuest["class"],
		mapQuest: MapQuest.factory,
		Mapbox: Mapbox["class"],
		mapbox: Mapbox.factory,
		What3Words: What3Words["class"],
		what3words: What3Words.factory,
		Google: Google["class"],
		google: Google.factory,
		Photon: Photon["class"],
		photon: Photon.factory,
		Mapzen: Mapzen["class"],
		mapzen: Mapzen.factory,
		ArcGis: ArcGis["class"],
		arcgis: ArcGis.factory,
		HERE: HERE["class"],
		here: HERE.factory
	});
	
	L.Util.extend(L.Control, {
		Geocoder: module.exports,
		geocoder: Control.factory
	});
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"./control":1,"./geocoders/arcgis":2,"./geocoders/bing":3,"./geocoders/google":4,"./geocoders/here":5,"./geocoders/mapbox":6,"./geocoders/mapquest":7,"./geocoders/mapzen":8,"./geocoders/nominatim":9,"./geocoders/photon":10,"./geocoders/what3words":11}],13:[function(_dereq_,module,exports){
	(function (global){
	var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
		lastCallbackId = 0,
		htmlEscape = (function() {
			// Adapted from handlebars.js
			// https://github.com/wycats/handlebars.js/
			var badChars = /[&<>"'`]/g;
			var possible = /[&<>"'`]/;
			var escape = {
			  '&': '&amp;',
			  '<': '&lt;',
			  '>': '&gt;',
			  '"': '&quot;',
			  '\'': '&#x27;',
			  '`': '&#x60;'
			};
	
			function escapeChar(chr) {
			  return escape[chr];
			}
	
			return function(string) {
				if (string == null) {
					return '';
				} else if (!string) {
					return string + '';
				}
	
				// Force a string conversion as this will be done by the append regardless and
				// the regex test will do this transparently behind the scenes, causing issues if
				// an object's to string has escaped characters in it.
				string = '' + string;
	
				if (!possible.test(string)) {
					return string;
				}
				return string.replace(badChars, escapeChar);
			};
		})();
	
	module.exports = {
		jsonp: function(url, params, callback, context, jsonpParam) {
			var callbackId = '_l_geocoder_' + (lastCallbackId++);
			params[jsonpParam || 'callback'] = callbackId;
			window[callbackId] = L.Util.bind(callback, context);
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url + L.Util.getParamString(params);
			script.id = callbackId;
			document.getElementsByTagName('head')[0].appendChild(script);
		},
	
		getJSON: function(url, params, callback) {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState !== 4){
					return;
				}
				if (xmlHttp.status !== 200 && xmlHttp.status !== 304){
					callback('');
					return;
				}
				callback(JSON.parse(xmlHttp.response));
			};
			xmlHttp.open('GET', url + L.Util.getParamString(params), true);
			xmlHttp.setRequestHeader('Accept', 'application/json');
			xmlHttp.send(null);
		},
	
		template: function (str, data) {
			return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
				var value = data[key];
				if (value === undefined) {
					value = '';
				} else if (typeof value === 'function') {
					value = value(data);
				}
				return htmlEscape(value);
			});
		},
	
		htmlEscape: htmlEscape
	};
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}]},{},[12])(12)
	});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../css-loader/index.js!./leaflet.css", function() {
				var newContent = require("!!../../css-loader/index.js!./leaflet.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, "/* required styles */\r\n\r\n.leaflet-pane,\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-tile-container,\r\n.leaflet-pane > svg,\r\n.leaflet-pane > canvas,\r\n.leaflet-zoom-box,\r\n.leaflet-image-layer,\r\n.leaflet-layer {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\t}\r\n.leaflet-container {\r\n\toverflow: hidden;\r\n\t}\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\t-webkit-user-select: none;\r\n\t   -moz-user-select: none;\r\n\t        user-select: none;\r\n\t  -webkit-user-drag: none;\r\n\t}\r\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\r\n.leaflet-safari .leaflet-tile {\r\n\timage-rendering: -webkit-optimize-contrast;\r\n\t}\r\n/* hack that prevents hw layers \"stretching\" when loading new tiles */\r\n.leaflet-safari .leaflet-tile-container {\r\n\twidth: 1600px;\r\n\theight: 1600px;\r\n\t-webkit-transform-origin: 0 0;\r\n\t}\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\tdisplay: block;\r\n\t}\r\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\r\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\r\n.leaflet-container .leaflet-overlay-pane svg,\r\n.leaflet-container .leaflet-marker-pane img,\r\n.leaflet-container .leaflet-shadow-pane img,\r\n.leaflet-container .leaflet-tile-pane img,\r\n.leaflet-container img.leaflet-image-layer {\r\n\tmax-width: none !important;\r\n\tmax-height: none !important;\r\n\t}\r\n\r\n.leaflet-container.leaflet-touch-zoom {\r\n\t-ms-touch-action: pan-x pan-y;\r\n\ttouch-action: pan-x pan-y;\r\n\t}\r\n.leaflet-container.leaflet-touch-drag {\r\n\t-ms-touch-action: pinch-zoom;\r\n\t/* Fallback for FF which doesn't support pinch-zoom */\r\n\ttouch-action: none;\r\n\ttouch-action: pinch-zoom;\r\n}\r\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\r\n\t-ms-touch-action: none;\r\n\ttouch-action: none;\r\n}\r\n.leaflet-container {\r\n\t-webkit-tap-highlight-color: transparent;\r\n}\r\n.leaflet-container a {\r\n\t-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\r\n}\r\n.leaflet-tile {\r\n\tfilter: inherit;\r\n\tvisibility: hidden;\r\n\t}\r\n.leaflet-tile-loaded {\r\n\tvisibility: inherit;\r\n\t}\r\n.leaflet-zoom-box {\r\n\twidth: 0;\r\n\theight: 0;\r\n\t-moz-box-sizing: border-box;\r\n\t     box-sizing: border-box;\r\n\tz-index: 800;\r\n\t}\r\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r\n.leaflet-overlay-pane svg {\r\n\t-moz-user-select: none;\r\n\t}\r\n\r\n.leaflet-pane         { z-index: 400; }\r\n\r\n.leaflet-tile-pane    { z-index: 200; }\r\n.leaflet-overlay-pane { z-index: 400; }\r\n.leaflet-shadow-pane  { z-index: 500; }\r\n.leaflet-marker-pane  { z-index: 600; }\r\n.leaflet-tooltip-pane   { z-index: 650; }\r\n.leaflet-popup-pane   { z-index: 700; }\r\n\r\n.leaflet-map-pane canvas { z-index: 100; }\r\n.leaflet-map-pane svg    { z-index: 200; }\r\n\r\n.leaflet-vml-shape {\r\n\twidth: 1px;\r\n\theight: 1px;\r\n\t}\r\n.lvml {\r\n\tbehavior: url(#default#VML);\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\t}\r\n\r\n\r\n/* control positioning */\r\n\r\n.leaflet-control {\r\n\tposition: relative;\r\n\tz-index: 800;\r\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-top,\r\n.leaflet-bottom {\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-top {\r\n\ttop: 0;\r\n\t}\r\n.leaflet-right {\r\n\tright: 0;\r\n\t}\r\n.leaflet-bottom {\r\n\tbottom: 0;\r\n\t}\r\n.leaflet-left {\r\n\tleft: 0;\r\n\t}\r\n.leaflet-control {\r\n\tfloat: left;\r\n\tclear: both;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tfloat: right;\r\n\t}\r\n.leaflet-top .leaflet-control {\r\n\tmargin-top: 10px;\r\n\t}\r\n.leaflet-bottom .leaflet-control {\r\n\tmargin-bottom: 10px;\r\n\t}\r\n.leaflet-left .leaflet-control {\r\n\tmargin-left: 10px;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tmargin-right: 10px;\r\n\t}\r\n\r\n\r\n/* zoom and fade animations */\r\n\r\n.leaflet-fade-anim .leaflet-tile {\r\n\twill-change: opacity;\r\n\t}\r\n.leaflet-fade-anim .leaflet-popup {\r\n\topacity: 0;\r\n\t-webkit-transition: opacity 0.2s linear;\r\n\t   -moz-transition: opacity 0.2s linear;\r\n\t     -o-transition: opacity 0.2s linear;\r\n\t        transition: opacity 0.2s linear;\r\n\t}\r\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r\n\topacity: 1;\r\n\t}\r\n.leaflet-zoom-animated {\r\n\t-webkit-transform-origin: 0 0;\r\n\t    -ms-transform-origin: 0 0;\r\n\t        transform-origin: 0 0;\r\n\t}\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\twill-change: transform;\r\n\t}\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t     -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t}\r\n.leaflet-zoom-anim .leaflet-tile,\r\n.leaflet-pan-anim .leaflet-tile {\r\n\t-webkit-transition: none;\r\n\t   -moz-transition: none;\r\n\t     -o-transition: none;\r\n\t        transition: none;\r\n\t}\r\n\r\n.leaflet-zoom-anim .leaflet-zoom-hide {\r\n\tvisibility: hidden;\r\n\t}\r\n\r\n\r\n/* cursors */\r\n\r\n.leaflet-interactive {\r\n\tcursor: pointer;\r\n\t}\r\n.leaflet-grab {\r\n\tcursor: -webkit-grab;\r\n\tcursor:    -moz-grab;\r\n\t}\r\n.leaflet-crosshair,\r\n.leaflet-crosshair .leaflet-interactive {\r\n\tcursor: crosshair;\r\n\t}\r\n.leaflet-popup-pane,\r\n.leaflet-control {\r\n\tcursor: auto;\r\n\t}\r\n.leaflet-dragging .leaflet-grab,\r\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\r\n.leaflet-dragging .leaflet-marker-draggable {\r\n\tcursor: move;\r\n\tcursor: -webkit-grabbing;\r\n\tcursor:    -moz-grabbing;\r\n\t}\r\n\r\n/* marker & overlays interactivity */\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-image-layer,\r\n.leaflet-pane > svg path,\r\n.leaflet-tile-container {\r\n\tpointer-events: none;\r\n\t}\r\n\r\n.leaflet-marker-icon.leaflet-interactive,\r\n.leaflet-image-layer.leaflet-interactive,\r\n.leaflet-pane > svg path.leaflet-interactive {\r\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r\n\tpointer-events: auto;\r\n\t}\r\n\r\n/* visual tweaks */\r\n\r\n.leaflet-container {\r\n\tbackground: #ddd;\r\n\toutline: 0;\r\n\t}\r\n.leaflet-container a {\r\n\tcolor: #0078A8;\r\n\t}\r\n.leaflet-container a.leaflet-active {\r\n\toutline: 2px solid orange;\r\n\t}\r\n.leaflet-zoom-box {\r\n\tborder: 2px dotted #38f;\r\n\tbackground: rgba(255,255,255,0.5);\r\n\t}\r\n\r\n\r\n/* general typography */\r\n.leaflet-container {\r\n\tfont: 12px/1.5 \"Helvetica Neue\", Arial, Helvetica, sans-serif;\r\n\t}\r\n\r\n\r\n/* general toolbar styles */\r\n\r\n.leaflet-bar {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\r\n\tborder-radius: 4px;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #fff;\r\n\tborder-bottom: 1px solid #ccc;\r\n\twidth: 26px;\r\n\theight: 26px;\r\n\tline-height: 26px;\r\n\tdisplay: block;\r\n\ttext-align: center;\r\n\ttext-decoration: none;\r\n\tcolor: black;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-control-layers-toggle {\r\n\tbackground-position: 50% 50%;\r\n\tbackground-repeat: no-repeat;\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #f4f4f4;\r\n\t}\r\n.leaflet-bar a:first-child {\r\n\tborder-top-left-radius: 4px;\r\n\tborder-top-right-radius: 4px;\r\n\t}\r\n.leaflet-bar a:last-child {\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-bottom-right-radius: 4px;\r\n\tborder-bottom: none;\r\n\t}\r\n.leaflet-bar a.leaflet-disabled {\r\n\tcursor: default;\r\n\tbackground-color: #f4f4f4;\r\n\tcolor: #bbb;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-bar a {\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tline-height: 30px;\r\n\t}\r\n.leaflet-touch .leaflet-bar a:first-child {\r\n\tborder-top-left-radius: 2px;\r\n\tborder-top-right-radius: 2px;\r\n\t}\r\n.leaflet-touch .leaflet-bar a:last-child {\r\n\tborder-bottom-left-radius: 2px;\r\n\tborder-bottom-right-radius: 2px;\r\n\t}\r\n\r\n/* zoom control */\r\n\r\n.leaflet-control-zoom-in,\r\n.leaflet-control-zoom-out {\r\n\tfont: bold 18px 'Lucida Console', Monaco, monospace;\r\n\ttext-indent: 1px;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\r\n\tfont-size: 22px;\r\n\t}\r\n\r\n\r\n/* layers control */\r\n\r\n.leaflet-control-layers {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\r\n\tbackground: #fff;\r\n\tborder-radius: 5px;\r\n\t}\r\n.leaflet-control-layers-toggle {\r\n\tbackground-image: url(" + __webpack_require__(21) + ");\r\n\twidth: 36px;\r\n\theight: 36px;\r\n\t}\r\n.leaflet-retina .leaflet-control-layers-toggle {\r\n\tbackground-image: url(" + __webpack_require__(22) + ");\r\n\tbackground-size: 26px 26px;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers-toggle {\r\n\twidth: 44px;\r\n\theight: 44px;\r\n\t}\r\n.leaflet-control-layers .leaflet-control-layers-list,\r\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r\n\tdisplay: none;\r\n\t}\r\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\t}\r\n.leaflet-control-layers-expanded {\r\n\tpadding: 6px 10px 6px 6px;\r\n\tcolor: #333;\r\n\tbackground: #fff;\r\n\t}\r\n.leaflet-control-layers-scrollbar {\r\n\toverflow-y: scroll;\r\n\toverflow-x: hidden;\r\n\tpadding-right: 5px;\r\n\t}\r\n.leaflet-control-layers-selector {\r\n\tmargin-top: 2px;\r\n\tposition: relative;\r\n\ttop: 1px;\r\n\t}\r\n.leaflet-control-layers label {\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-control-layers-separator {\r\n\theight: 0;\r\n\tborder-top: 1px solid #ddd;\r\n\tmargin: 5px -10px 5px -6px;\r\n\t}\r\n\r\n/* Default icon URLs */\r\n.leaflet-default-icon-path {\r\n\tbackground-image: url(" + __webpack_require__(23) + ");\r\n\t}\r\n\r\n\r\n/* attribution and scale controls */\r\n\r\n.leaflet-container .leaflet-control-attribution {\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.7);\r\n\tmargin: 0;\r\n\t}\r\n.leaflet-control-attribution,\r\n.leaflet-control-scale-line {\r\n\tpadding: 0 5px;\r\n\tcolor: #333;\r\n\t}\r\n.leaflet-control-attribution a {\r\n\ttext-decoration: none;\r\n\t}\r\n.leaflet-control-attribution a:hover {\r\n\ttext-decoration: underline;\r\n\t}\r\n.leaflet-container .leaflet-control-attribution,\r\n.leaflet-container .leaflet-control-scale {\r\n\tfont-size: 11px;\r\n\t}\r\n.leaflet-left .leaflet-control-scale {\r\n\tmargin-left: 5px;\r\n\t}\r\n.leaflet-bottom .leaflet-control-scale {\r\n\tmargin-bottom: 5px;\r\n\t}\r\n.leaflet-control-scale-line {\r\n\tborder: 2px solid #777;\r\n\tborder-top: none;\r\n\tline-height: 1.1;\r\n\tpadding: 2px 5px 1px;\r\n\tfont-size: 11px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\t-moz-box-sizing: border-box;\r\n\t     box-sizing: border-box;\r\n\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.5);\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child) {\r\n\tborder-top: 2px solid #777;\r\n\tborder-bottom: none;\r\n\tmargin-top: -2px;\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r\n\tborder-bottom: 2px solid #777;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-attribution,\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tbox-shadow: none;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tborder: 2px solid rgba(0,0,0,0.2);\r\n\tbackground-clip: padding-box;\r\n\t}\r\n\r\n\r\n/* popup */\r\n\r\n.leaflet-popup {\r\n\tposition: absolute;\r\n\ttext-align: center;\r\n\tmargin-bottom: 20px;\r\n\t}\r\n.leaflet-popup-content-wrapper {\r\n\tpadding: 1px;\r\n\ttext-align: left;\r\n\tborder-radius: 12px;\r\n\t}\r\n.leaflet-popup-content {\r\n\tmargin: 13px 19px;\r\n\tline-height: 1.4;\r\n\t}\r\n.leaflet-popup-content p {\r\n\tmargin: 18px 0;\r\n\t}\r\n.leaflet-popup-tip-container {\r\n\twidth: 40px;\r\n\theight: 20px;\r\n\tposition: absolute;\r\n\tleft: 50%;\r\n\tmargin-left: -20px;\r\n\toverflow: hidden;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-popup-tip {\r\n\twidth: 17px;\r\n\theight: 17px;\r\n\tpadding: 1px;\r\n\r\n\tmargin: -10px auto 0;\r\n\r\n\t-webkit-transform: rotate(45deg);\r\n\t   -moz-transform: rotate(45deg);\r\n\t    -ms-transform: rotate(45deg);\r\n\t     -o-transform: rotate(45deg);\r\n\t        transform: rotate(45deg);\r\n\t}\r\n.leaflet-popup-content-wrapper,\r\n.leaflet-popup-tip {\r\n\tbackground: white;\r\n\tcolor: #333;\r\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tpadding: 4px 4px 0 0;\r\n\tborder: none;\r\n\ttext-align: center;\r\n\twidth: 18px;\r\n\theight: 14px;\r\n\tfont: 16px/14px Tahoma, Verdana, sans-serif;\r\n\tcolor: #c3c3c3;\r\n\ttext-decoration: none;\r\n\tfont-weight: bold;\r\n\tbackground: transparent;\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button:hover {\r\n\tcolor: #999;\r\n\t}\r\n.leaflet-popup-scrolled {\r\n\toverflow: auto;\r\n\tborder-bottom: 1px solid #ddd;\r\n\tborder-top: 1px solid #ddd;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-popup-content-wrapper {\r\n\tzoom: 1;\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\twidth: 24px;\r\n\tmargin: 0 auto;\r\n\r\n\t-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\r\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip-container {\r\n\tmargin-top: -1px;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-control-zoom,\r\n.leaflet-oldie .leaflet-control-layers,\r\n.leaflet-oldie .leaflet-popup-content-wrapper,\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\tborder: 1px solid #999;\r\n\t}\r\n\r\n\r\n/* div icon */\r\n\r\n.leaflet-div-icon {\r\n\tbackground: #fff;\r\n\tborder: 1px solid #666;\r\n\t}\r\n\r\n\r\n/* Tooltip */\r\n/* Base styles for the element that has a tooltip */\r\n.leaflet-tooltip {\r\n\tposition: absolute;\r\n\tpadding: 6px;\r\n\tbackground-color: #fff;\r\n\tborder: 1px solid #fff;\r\n\tborder-radius: 3px;\r\n\tcolor: #222;\r\n\twhite-space: nowrap;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n\tpointer-events: none;\r\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-tooltip.leaflet-clickable {\r\n\tcursor: pointer;\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-tooltip-top:before,\r\n.leaflet-tooltip-bottom:before,\r\n.leaflet-tooltip-left:before,\r\n.leaflet-tooltip-right:before {\r\n\tposition: absolute;\r\n\tpointer-events: none;\r\n\tborder: 6px solid transparent;\r\n\tbackground: transparent;\r\n\tcontent: \"\";\r\n\t}\r\n\r\n/* Directions */\r\n\r\n.leaflet-tooltip-bottom {\r\n\tmargin-top: 6px;\r\n}\r\n.leaflet-tooltip-top {\r\n\tmargin-top: -6px;\r\n}\r\n.leaflet-tooltip-bottom:before,\r\n.leaflet-tooltip-top:before {\r\n\tleft: 50%;\r\n\tmargin-left: -6px;\r\n\t}\r\n.leaflet-tooltip-top:before {\r\n\tbottom: 0;\r\n\tmargin-bottom: -12px;\r\n\tborder-top-color: #fff;\r\n\t}\r\n.leaflet-tooltip-bottom:before {\r\n\ttop: 0;\r\n\tmargin-top: -12px;\r\n\tmargin-left: -6px;\r\n\tborder-bottom-color: #fff;\r\n\t}\r\n.leaflet-tooltip-left {\r\n\tmargin-left: -6px;\r\n}\r\n.leaflet-tooltip-right {\r\n\tmargin-left: 6px;\r\n}\r\n.leaflet-tooltip-left:before,\r\n.leaflet-tooltip-right:before {\r\n\ttop: 50%;\r\n\tmargin-top: -6px;\r\n\t}\r\n.leaflet-tooltip-left:before {\r\n\tright: 0;\r\n\tmargin-right: -12px;\r\n\tborder-left-color: #fff;\r\n\t}\r\n.leaflet-tooltip-right:before {\r\n\tleft: 0;\r\n\tmargin-left: -12px;\r\n\tborder-right-color: #fff;\r\n\t}\r\n", ""]);
	
	// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a6137456ed160d7606981aa57c559898.png";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4f0283c6ce28e888000e978e537a6a56.png";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2273e3d8ad9264b7daa5bdbf8e6b47f8.png";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../css-loader/index.js!./leaflet.contextmenu.css", function() {
				var newContent = require("!!../../css-loader/index.js!./leaflet.contextmenu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".leaflet-contextmenu {\n    display: none;\n    box-shadow: 0 1px 7px rgba(0,0,0,0.4);\n    -webkit-border-radius: 4px;\n    border-radius: 4px;\n    padding: 4px 0;\n    background-color: #fff;\n    cursor: default;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    user-select: none;\n}\n\n.leaflet-contextmenu a.leaflet-contextmenu-item {\n    display: block;\n    color: #222;\n    font-size: 12px;\n    line-height: 20px;\n    text-decoration: none;\n    padding: 0 12px;\n    border-top: 1px solid transparent;\n    border-bottom: 1px solid transparent;\n    cursor: default;\n    outline: none;\n}\n\n.leaflet-contextmenu a.leaflet-contextmenu-item-disabled {\n    opacity: 0.5;\n}\n\n.leaflet-contextmenu a.leaflet-contextmenu-item.over {\n    background-color: #f4f4f4;\n    border-top: 1px solid #f0f0f0;\n    border-bottom: 1px solid #f0f0f0;\n}\n\n.leaflet-contextmenu a.leaflet-contextmenu-item-disabled.over {\n    background-color: inherit;\n    border-top: 1px solid transparent;\n    border-bottom: 1px solid transparent;\n}\n\n.leaflet-contextmenu-icon {\n    margin: 2px 8px 0 0;\n    width: 16px;\n    height: 16px;\n    float: left;\n    border: 0;\n}\n\n.leaflet-contextmenu-separator {\n    border-bottom: 1px solid #ccc;\n    margin: 5px 0;\n}\n", ""]);
	
	// exports


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';
	
	/* Services */
	var eventCaptureServices = angular.module('eventCaptureServices', ['ngResource']).factory('ECStorageService', function () {
	    var store = new dhis2.storage.Store({
	        name: 'dhis2ec',
	        adapters: [dhis2.storage.IndexedDBAdapter, dhis2.storage.DomSessionStorageAdapter, dhis2.storage.InMemoryAdapter],
	        objectStores: ['programs', 'optionSets', 'events', 'programRules', 'programRuleVariables', 'programIndicators', 'ouLevels', 'constants', 'dataElements', 'programAccess']
	    });
	    return {
	        currentStore: store
	    };
	}).factory('OfflineECStorageService', ["$http", "$q", "$rootScope", "$translate", "ECStorageService", "ModalService", "NotificationService", function ($http, $q, $rootScope, $translate, ECStorageService, ModalService, NotificationService) {
	    return {
	        hasLocalData: function hasLocalData() {
	            var def = $q.defer();
	            ECStorageService.currentStore.open().done(function () {
	                ECStorageService.currentStore.getKeys('events').done(function (events) {
	                    $rootScope.$apply(function () {
	                        def.resolve(events.length > 0);
	                    });
	                });
	            });
	            return def.promise;
	        },
	        getLocalData: function getLocalData() {
	            var def = $q.defer();
	            ECStorageService.currentStore.open().done(function () {
	                ECStorageService.currentStore.getAll('events').done(function (events) {
	                    $rootScope.$apply(function () {
	                        def.resolve({ events: events });
	                    });
	                });
	            });
	            return def.promise;
	        },
	        uploadLocalData: function uploadLocalData() {
	            var def = $q.defer();
	            this.getLocalData().then(function (localData) {
	                var evs = { events: [] };
	                angular.forEach(localData.events, function (ev) {
	                    ev.event = ev.id;
	                    delete ev.id;
	                    evs.events.push(ev);
	                });
	
	                $http.post(DHIS2URL + '/events', evs).then(function (evResponse) {
	                    dhis2.ec.store.removeAll('events');
	                    NotificationService.displayDelayedHeaderMessage($translate.instant('upload_success'));
	                    log('Successfully uploaded local events');
	                    def.resolve();
	                }, function (error) {
	                    var serverLog = '';
	                    if (error && error.data && error.data.response && error.data.response.importSummaries) {
	                        angular.forEach(error.data.response.importSummaries, function (is) {
	                            if (is.description) {
	                                serverLog += is.description + ';  ';
	                            }
	                        });
	                    }
	
	                    var modalOptions = {
	                        closeButtonText: 'keep_offline_data',
	                        actionButtonText: 'delete_offline_data',
	                        headerText: 'error',
	                        bodyText: $translate.instant('data_upload_to_server_failed:') + '  ' + serverLog
	                    };
	
	                    var modalDefaults = {
	                        backdrop: true,
	                        keyboard: true,
	                        modalFade: true,
	                        templateUrl: 'views/modal-offline.html'
	                    };
	
	                    ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
	                        dhis2.ec.store.removeAll('events');
	                        NotificationService.displayDelayedHeaderMessage($translate.instant('offline_data_deleted'));
	                        def.resolve();
	                    }, function () {
	                        NotificationService.displayDelayedHeaderMessage($translate.instant('upload_failed_try_again'));
	                        def.resolve();
	                    });
	                });
	            });
	            return def.promise;
	        }
	    };
	}])
	
	/* Factory to fetch optionSets */
	.factory('OptionSetService', function () {
	    return {
	        getCode: function getCode(options, key) {
	            if (options) {
	                for (var i = 0; i < options.length; i++) {
	                    if (key === options[i].displayName) {
	                        return options[i].code;
	                    }
	                }
	            }
	            return key;
	        },
	        getName: function getName(options, key) {
	            if (options) {
	                for (var i = 0; i < options.length; i++) {
	                    if (key === options[i].code) {
	                        return options[i].displayName;
	                    }
	                }
	            }
	            return key;
	        }
	    };
	})
	
	/* Factory to fetch programs */
	.factory('ProgramFactory', ["$q", "$rootScope", "SessionStorageService", "ECStorageService", "CommonUtils", function ($q, $rootScope, SessionStorageService, ECStorageService, CommonUtils) {
	    var access = null;
	    return {
	        getAllAccesses: function getAllAccesses() {
	            var def = $q.defer();
	            if (access) {
	                def.resolve(access);
	            } else {
	                ECStorageService.currentStore.open().done(function () {
	                    ECStorageService.currentStore.getAll('programAccess').done(function (programAccess) {
	                        access = { programsById: {}, programStagesById: {} };
	                        angular.forEach(programAccess, function (program) {
	                            access.programsById[program.id] = program.access;
	                            angular.forEach(program.programStages, function (programStage) {
	                                access.programStagesById[programStage.id] = programStage.access;
	                            });
	                        });
	                        def.resolve(access);
	                    });
	                });
	            }
	            return def.promise;
	        },
	
	        getProgramsByOu: function getProgramsByOu(ou, selectedProgram) {
	            var roles = SessionStorageService.get('USER_PROFILE');
	            var userRoles = roles && roles.userCredentials && roles.userCredentials.userRoles ? roles.userCredentials.userRoles : [];
	            var def = $q.defer();
	
	            this.getAllAccesses().then(function (access) {
	                ECStorageService.currentStore.open().done(function () {
	                    ECStorageService.currentStore.getAll('programs').done(function (prs) {
	                        var programs = [];
	                        angular.forEach(prs, function (pr) {
	                            if (pr.organisationUnits.hasOwnProperty(ou.id) && access && access.programsById[pr.id] && access.programsById[pr.id].data.read) {
	                                pr.access = access.programsById[pr.id];
	                                programs.push(pr);
	                                var accessibleStages = [];
	                                angular.forEach(pr.programStages, function (prs) {
	                                    var prsAccess = access.programStagesById[prs.id];
	                                    if (prsAccess && prsAccess.data.read) {
	                                        prs.access = prsAccess;
	                                        accessibleStages.push(prs);
	                                    }
	                                });
	                                pr.programStages = accessibleStages;
	                            }
	                        });
	
	                        if (programs.length === 0) {
	                            selectedProgram = null;
	                        } else if (programs.length === 1) {
	                            selectedProgram = programs[0];
	                        } else {
	                            if (selectedProgram) {
	                                var continueLoop = true;
	                                for (var i = 0; i < programs.length && continueLoop; i++) {
	                                    if (programs[i].id === selectedProgram.id) {
	                                        selectedProgram = programs[i];
	                                        continueLoop = false;
	                                    }
	                                }
	                                if (continueLoop) {
	                                    selectedProgram = null;
	                                }
	                            }
	                        }
	
	                        $rootScope.$apply(function () {
	                            def.resolve({ programs: programs, selectedProgram: selectedProgram });
	                        });
	                    });
	                });
	            });
	
	            return def.promise;
	        }
	    };
	}])
	
	/* factory for handling program related meta-data */
	.factory('MetaDataFactory', ["$q", "$rootScope", "ECStorageService", function ($q, $rootScope, ECStorageService) {
	
	    return {
	        get: function get(store, uid) {
	
	            var def = $q.defer();
	
	            ECStorageService.currentStore.open().done(function () {
	                ECStorageService.currentStore.get(store, uid).done(function (pv) {
	                    $rootScope.$apply(function () {
	                        def.resolve(pv);
	                    });
	                });
	            });
	            return def.promise;
	        },
	        getByProgram: function getByProgram(store, program) {
	            var def = $q.defer();
	            var objs = [];
	
	            ECStorageService.currentStore.open().done(function () {
	                ECStorageService.currentStore.getAll(store).done(function (data) {
	                    angular.forEach(data, function (o) {
	                        if (o.program.id === program) {
	                            objs.push(o);
	                        }
	                    });
	                    $rootScope.$apply(function () {
	                        def.resolve(objs);
	                    });
	                });
	            });
	            return def.promise;
	        },
	        getByIds: function getByIds(store, ids) {
	            var def = $q.defer();
	            var objs = [];
	
	            ECStorageService.currentStore.open().done(function () {
	                ECStorageService.currentStore.getAll(store).done(function (data) {
	                    angular.forEach(data, function (o) {
	                        if (ids.indexOf(o.id) !== -1) {
	                            objs.push(o);
	                        }
	                    });
	                    $rootScope.$apply(function () {
	                        def.resolve(objs);
	                    });
	                });
	            });
	            return def.promise;
	        },
	        getAll: function getAll(store) {
	            var def = $q.defer();
	            ECStorageService.currentStore.open().done(function () {
	                ECStorageService.currentStore.getAll(store).done(function (objs) {
	                    $rootScope.$apply(function () {
	                        def.resolve(objs);
	                    });
	                });
	            });
	            return def.promise;
	        }
	    };
	}])
	
	/* factory for handling events */
	.factory('DHIS2EventFactory', ["$http", "$q", "ECStorageService", "$rootScope", function ($http, $q, ECStorageService, $rootScope) {
	    var internalGetByFilters = function internalGetByFilters(orgUnit, attributeCategoryUrl, pager, paging, ordering, filterings, format, filterParam, sortParam) {
	        var url;
	        if (format === "csv") {
	            url = DHIS2URL + '/events.csv?' + 'orgUnit=' + orgUnit;
	        } else {
	            url = DHIS2URL + '/events/query.json?' + 'orgUnit=' + orgUnit;
	        }
	
	        if (filterings) {
	            angular.forEach(filterings, function (filtering) {
	                url += '&' + filtering.field + '=' + filtering.value;
	            });
	        }
	
	        if (attributeCategoryUrl && !attributeCategoryUrl.default) {
	            url = url + '&attributeCc=' + attributeCategoryUrl.cc + '&attributeCos=' + attributeCategoryUrl.cp;
	        }
	
	        if (filterParam) {
	            url += filterParam;
	        }
	
	        if (sortParam && sortParam.id && sortParam.direction) {
	            url += '&order=' + sortParam.id + ':' + sortParam.direction;
	        }
	
	        if (paging) {
	            var pgSize = pager.pageSize ? pager.pageSize : 50;
	            var pg = pager.page ? pager.page : 1;
	            pgSize = pgSize > 1 ? pgSize : 1;
	            pg = pg > 1 ? pg : 1;
	            url = url + '&pageSize=' + pgSize + '&page=' + pg + '&totalPages=true';
	        } else {
	            url = url + '&skipPaging=true';
	        }
	
	        if (ordering && ordering.field) {
	            url = url + '&order=' + ordering.field;
	            if (ordering.direction) {
	                url = url + ':' + ordering.direction;
	            }
	        }
	
	        var promise = $http.get(url).then(function (response) {
	            return response.data;
	        }, function () {
	            var def = $q.defer();
	            ECStorageService.currentStore.open().done(function () {
	                ECStorageService.currentStore.getAll('events').done(function (evs) {
	                    var result = { events: [], pager: { pageSize: '', page: 1, toolBarDisplay: 5, pageCount: 1 } };
	                    angular.forEach(evs, function (ev) {
	                        if (ev.programStage === programStage && ev.orgUnit === orgUnit) {
	                            ev.event = ev.id;
	                            result.events.push(ev);
	                        }
	                    });
	                    $rootScope.$apply(function () {
	                        def.resolve(result);
	                    });
	                });
	            });
	            return def.promise;
	        });
	        return promise;
	    };
	
	    return {
	        getByStage: function getByStage(orgUnit, programStage, attributeCategoryUrl, pager, paging, format, filterUrl, sortParam, eventId) {
	            var url;
	            if (format === "csv") {
	                url = DHIS2URL + '/events.csv?' + 'orgUnit=' + orgUnit;
	            } else {
	                url = DHIS2URL + '/events/query.json?' + 'orgUnit=' + orgUnit;
	            }
	
	            if (eventId) {
	                url += "&event=" + eventId;
	            }
	
	            if (programStage) {
	                url += '&programStage=' + programStage;
	            }
	
	            if (attributeCategoryUrl && !attributeCategoryUrl.default) {
	                url = url + '&attributeCc=' + attributeCategoryUrl.cc + '&attributeCos=' + attributeCategoryUrl.cp;
	            }
	
	            if (filterUrl) {
	                url += filterUrl;
	            }
	
	            if (sortParam && sortParam.id && sortParam.direction) {
	                url += '&order=' + sortParam.id + ':' + sortParam.direction;
	            }
	
	            if (paging) {
	                var pgSize = pager.pageSize ? pager.pageSize : 50;
	                var pg = pager.page ? pager.page : 1;
	                pgSize = pgSize > 1 ? pgSize : 1;
	                pg = pg > 1 ? pg : 1;
	                url = url + '&pageSize=' + pgSize + '&page=' + pg + '&totalPages=true';
	            } else {
	                url = url + '&skipPaging=true';
	            }
	
	            var promise = $http.get(url).then(function (response) {
	                return response.data;
	            }, function () {
	                var def = $q.defer();
	                ECStorageService.currentStore.open().done(function () {
	                    ECStorageService.currentStore.getAll('events').done(function (evs) {
	                        var result = { events: [], metaData: { pager: { pageSize: '', page: 1, toolBarDisplay: 5, pageCount: 1 } } };
	                        angular.forEach(evs, function (ev) {
	                            if (ev.programStage === programStage && ev.orgUnit === orgUnit) {
	                                ev.event = ev.id;
	                                result.events.push(ev);
	                            }
	                        });
	                        $rootScope.$apply(function () {
	                            def.resolve(result);
	                        });
	                    });
	                });
	                return def.promise;
	            });
	            return promise;
	        },
	        get: function get(eventUid, event) {
	            if (event && event.state && event.state === 'FULL') {
	                var def = $q.defer();
	                def.resolve(event);
	                return def.promise;
	            } else {
	                var promise = $http.get(DHIS2URL + '/events/' + eventUid + '.json').then(function (response) {
	                    return response.data;
	                }, function () {
	                    var p = dhis2.ec.store.get('events', eventUid).then(function (ev) {
	                        ev.event = eventUid;
	                        return ev;
	                    });
	                    return p;
	                });
	                return promise;
	            }
	        },
	        create: function create(dhis2Event) {
	            var promise = $http.post(DHIS2URL + '/events.json', dhis2Event).then(function (response) {
	                return response.data;
	            }, function () {
	                dhis2Event.id = dhis2.util.uid();
	                dhis2Event.event = dhis2Event.id;
	                dhis2.ec.store.set('events', dhis2Event);
	                return { response: { importSummaries: [{ status: 'SUCCESS', reference: dhis2Event.id }] } };
	            });
	            return promise;
	        },
	        delete: function _delete(dhis2Event) {
	            var promise = $http.delete(DHIS2URL + '/events/' + dhis2Event.event).then(function (response) {
	                return response.data;
	            }, function (response) {
	                dhis2.ec.store.remove('events', dhis2Event.event);
	                return response.data;
	            });
	            return promise;
	        },
	        update: function update(dhis2Event) {
	            var promise = $http.put(DHIS2URL + '/events/' + dhis2Event.event, dhis2Event).then(function (response) {
	                return response.data;
	            }, function () {
	                dhis2.ec.store.remove('events', dhis2Event.event);
	                dhis2Event.id = dhis2Event.event;
	                dhis2.ec.store.set('events', dhis2Event);
	            });
	            return promise;
	        },
	        updateForSingleValue: function updateForSingleValue(singleValue, fullValue) {
	            var promise = $http.put(DHIS2URL + '/events/' + singleValue.event + '/' + singleValue.dataValues[0].dataElement, singleValue).then(function (response) {
	                return response.data;
	            }, function () {
	                dhis2.ec.store.remove('events', fullValue.event);
	                fullValue.id = fullValue.event;
	                dhis2.ec.store.set('events', fullValue);
	            });
	            return promise;
	        },
	        updateForEventDate: function updateForEventDate(dhis2Event, fullEvent) {
	            var promise = $http.put(DHIS2URL + '/events/' + dhis2Event.event + '/eventDate', dhis2Event).then(function (response) {
	                return response.data;
	            }, function () {
	                dhis2.ec.store.remove('events', fullEvent.event);
	                fullEvent.id = fullEvent.event;
	                dhis2.ec.store.set('events', fullEvent);
	            });
	            return promise;
	        }
	    };
	}]);

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';
	
	/* Directives */
	var eventCaptureDirectives = angular.module('eventCaptureDirectives', []).directive('modalBody', function () {
	    return {
	        restrict: 'E',
	        templateUrl: 'views/modal-body.html',
	        scope: {
	            body: '='
	        },
	        controller: ['$scope', '$translate', function ($scope, $translate) {}]
	    };
	});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';
	
	/* Controllers */
	var eventCaptureControllers = angular.module('eventCaptureControllers', ['ngCsv'])
	
	//Controller for settings page
	.controller('MainController', ["$rootScope", "$scope", "$route", "$modal", "$translate", "$anchorScroll", "$window", "$q", "$filter", "$timeout", "$location", "orderByFilter", "SessionStorageService", "Paginator", "MetaDataFactory", "ProgramFactory", "DHIS2EventFactory", "DHIS2EventService", "ContextMenuSelectedItem", "DateUtils", "CalendarService", "GridColumnService", "CustomFormService", "ECStorageService", "CurrentSelection", "ModalService", "DialogService", "CommonUtils", "AuthorityService", "TrackerRulesExecutionService", "OrgUnitFactory", "NotificationService", "OptionSetService", function ($rootScope, $scope, $route, $modal, $translate, $anchorScroll, $window, $q, $filter, $timeout, $location, orderByFilter, SessionStorageService, Paginator, MetaDataFactory, ProgramFactory, DHIS2EventFactory, DHIS2EventService, ContextMenuSelectedItem, DateUtils, CalendarService, GridColumnService, CustomFormService, ECStorageService, CurrentSelection, ModalService, DialogService, CommonUtils, AuthorityService, TrackerRulesExecutionService, OrgUnitFactory, NotificationService, OptionSetService) {
	    $scope.forms = {};
	    $scope.maxOptionSize = 100;
	    $scope.treeLoaded = false;
	    $scope.selectedSection = { id: 'ALL' };
	    $rootScope.ruleeffects = {};
	    $scope.hiddenFields = [];
	    $scope.assignedFields = [];
	    $scope.mandatoryFields = [];
	    $scope.calendarSetting = CalendarService.getSetting();
	    $scope.timeFormat = "24h";
	
	    //Paging
	    $scope.pager = { pageSize: 50, page: 1, toolBarDisplay: 5 };
	
	    function resetView() {
	        $scope.eventRegistration = false;
	        $scope.editingEventInFull = false;
	        $scope.editingEventInGrid = false;
	    }
	
	    resetView();
	
	    $scope.editGridColumns = false;
	    $scope.updateSuccess = false;
	    $scope.currentGridColumnId = '';
	    $scope.dhis2Events = [];
	    $scope.currentEvent = {};
	    $scope.currentEventOriginialValue = {};
	    $scope.displayCustomForm = false;
	    $scope.currentElement = { id: '', update: false };
	    $scope.optionSets = [];
	    $scope.proceedSelection = true;
	    $scope.formUnsaved = false;
	    $scope.fileNames = {};
	    $scope.currentFileNames = {};
	    $scope.gridColumnsInUserStore = null;
	    $scope.model = { exportFormats: ["XML", "JSON", "CSV"], savingRegistration: false };
	
	    //notes
	    $scope.note = {};
	
	    $scope.displayTextEffects = [];
	    $scope.today = DateUtils.getToday();
	    $scope.noteExists = false;
	    $scope.model.editingDisabled = false;
	    var storedBy = CommonUtils.getUsername();
	    var orgUnitFromUrl = $location.search().ou;
	    var eventIdFromUrl = $location.search().event;
	
	    //watch for selection of org unit from tree
	    $scope.$watch('selectedOrgUnit', function () {
	        if (angular.isObject($scope.selectedOrgUnit)) {
	            OrgUnitFactory.getFromStoreOrServer($scope.selectedOrgUnit.id).then(function (orgUnitFromStore) {
	                if (orgUnitFromStore) {
	                    $scope.model.ouDates = { startDate: orgUnitFromStore.odate, endDate: orgUnitFromStore.cdate };
	                    if (orgUnitFromStore.reportDateRange) {
	                        $scope.model.maxDate = orgUnitFromStore.reportDateRange.maxDate;
	                        $scope.model.minDate = orgUnitFromStore.reportDateRange.minDate;
	                        $scope.model.minDate = DateUtils.formatFromApiToUserCalendar($scope.model.minDate);
	                        $scope.model.minDate = DateUtils.formatFromApiToUser($scope.model.minDate);
	                    }
	                    $scope.model.editingDisabled = orgUnitFromStore.closedStatus;
	                }
	            });
	
	            $scope.pleaseSelectLabel = $translate.instant('please_select');
	            $scope.registeringUnitLabel = $translate.instant('registering_unit');
	            $scope.eventCaptureLabel = $translate.instant('event_capture');
	            $scope.programLabel = $translate.instant('program');
	            $scope.searchLabel = $translate.instant('search');
	            $scope.findLabel = $translate.instant('find');
	            $scope.searchOusLabel = $translate.instant('locate_organisation_unit_by_name');
	            $scope.yesLabel = $translate.instant('yes');
	            $scope.noLabel = $translate.instant('no');
	
	            SessionStorageService.set('SELECTED_OU', $scope.selectedOrgUnit);
	
	            $scope.userAuthority = AuthorityService.getUserAuthorities(SessionStorageService.get('USER_PROFILE'));
	            GridColumnService.get("eventCaptureGridColumns").then(function (gridColumns) {
	                if (gridColumns && gridColumns.status !== "ERROR") {
	                    $scope.gridColumnsInUserStore = gridColumns;
	                }
	                //get ouLevels
	                ECStorageService.currentStore.open().done(function () {
	                    ECStorageService.currentStore.getAll('ouLevels').done(function (response) {
	                        var ouLevels = angular.isObject(response) ? orderByFilter(response, '-level').reverse() : [];
	                        CurrentSelection.setOuLevels(orderByFilter(ouLevels, '-level').reverse());
	                    });
	                });
	
	                if ($scope.optionSets.length < 1) {
	                    $scope.optionSets = [];
	                    MetaDataFactory.getAll('optionSets').then(function (optionSets) {
	                        angular.forEach(optionSets, function (optionSet) {
	                            $scope.optionSets[optionSet.id] = optionSet;
	                        });
	                        $scope.loadPrograms();
	                    });
	                } else {
	                    $scope.loadPrograms();
	                }
	            });
	        }
	    });
	
	    $scope.dataElementEditable = function (de) {
	        if ($scope.assignedFields[de.id] || $scope.model.editingDisabled || !$scope.hasDataWrite()) {
	            return false;
	        }
	        return true;
	    };
	
	    $scope.verifyExpiryDate = function () {
	        if (!DateUtils.verifyExpiryDate($scope.currentEvent.eventDate, $scope.selectedProgram.expiryPeriodType, $scope.selectedProgram.expiryDays)) {
	            $scope.currentEvent.eventDate = null;
	        }
	    };
	
	    $scope.completeEnrollment = function () {
	        $scope.currentEvent.status = !$scope.currentEvent.status;
	    };
	
	    //load programs associated with the selected org unit.
	
	    $scope.loadPrograms = function () {
	
	        $scope.resetOu = false;
	        $scope.selectedProgramStage = null;
	        $scope.currentStage = null;
	        $scope.allProgramRules = [];
	        $scope.dhis2Events = [];
	        $scope.currentEvent = {};
	        $scope.currentEventOriginialValue = {};
	        $scope.fileNames = {};
	        $scope.currentFileNames = {};
	        $scope.orgUnitNames = {};
	
	        resetView();
	        $scope.editGridColumns = false;
	        $scope.updateSuccess = false;
	        $scope.currentGridColumnId = '';
	        $scope.displayCustomForm = false;
	
	        if (angular.isObject($scope.selectedOrgUnit)) {
	            ProgramFactory.getProgramsByOu($scope.selectedOrgUnit, $scope.selectedProgram).then(function (response) {
	                $scope.programs = response.programs;
	                if (eventIdFromUrl) {
	                    $scope.showEventForEditing(eventIdFromUrl);
	                } else {
	                    $scope.selectedProgram = response.selectedProgram;
	                    $scope.getProgramDetails($scope.selectedProgram);
	                }
	            });
	        }
	    };
	
	    $scope.showEventForEditing = function (eventId) {
	        DHIS2EventFactory.get(eventId).then(function (event) {
	            if (event) {
	                ContextMenuSelectedItem.setSelectedItem(event);
	                if (!event.coordinate) {
	                    event.coordinate = {};
	                }
	                for (var i = 0; i < $scope.programs.length; i++) {
	                    if ($scope.programs[i].id === event.program) {
	                        $scope.selectedProgram = $scope.programs[i];
	                        $scope.getProgramDetails($scope.selectedProgram);
	                        if ($scope.selectedProgram.programStages[0].id === event.programStage) {
	                            $scope.formatEvent(event);
	                            $scope.currentEvent = angular.copy(event);
	                            $scope.editingEventInFull = false;
	                            $scope.showEditEventInFull();
	                        }
	                        break;
	                    }
	                }
	            }
	        });
	    };
	
	    function setCommonEventProps(event) {
	        event.uid = event.event;
	        event.eventDate = DateUtils.formatFromApiToUser(event.eventDate);
	        event.lastUpdated = DateUtils.formatFromApiToUser(event.lastUpdated);
	        if (event.completedDate) {
	            event.completedDate = DateUtils.formatFromApiToUser(event.completedDate);
	        }
	        if (event.status === "ACTIVE") {
	            event.status = false;
	        } else if (event.status === "COMPLETED") {
	            event.status = true;
	        }
	    };
	
	    $scope.formatCalendar = function (date) {
	        var temp = DateUtils.formatFromApiToUserCalendar(date);
	        temp = DateUtils.formatFromApiToUser(temp);
	        return temp;
	    };
	
	    $scope.formatEvent = function (event) {
	        if (event.notes && event.notes.length > 0 && !$scope.noteExists) {
	            $scope.noteExists = true;
	        }
	
	        angular.forEach(event.dataValues, function (dataValue) {
	            if ($scope.prStDes && $scope.prStDes[dataValue.dataElement] && dataValue.value) {
	
	                if (angular.isObject($scope.prStDes[dataValue.dataElement].dataElement)) {
	                    dataValue.value = CommonUtils.formatDataValue(null, dataValue.value, $scope.prStDes[dataValue.dataElement].dataElement, $scope.optionSets, 'USER');
	                }
	
	                event[dataValue.dataElement] = dataValue.value;
	
	                switch ($scope.prStDes[dataValue.dataElement].dataElement.valueType) {
	                    case "FILE_RESOURCE":
	                        CommonUtils.checkAndSetFileName(event, dataValue.value, dataValue.dataElement);
	                        break;
	                    case "ORGANISATION_UNIT":
	                        CommonUtils.checkAndSetOrgUnitName(dataValue.value);
	                        break;
	                }
	            }
	        });
	
	        $scope.fileNames = CurrentSelection.getFileNames();
	        $scope.orgUnitNames = CurrentSelection.getOrgUnitNames();
	
	        setCommonEventProps(event);
	
	        if ($scope.selectedProgramStage && $scope.selectedProgramStage.captureCoordinates && !event.coordinate) {
	            event.coordinate = {};
	        }
	
	        event.state = 'FULL';
	        delete event.dataValues;
	    };
	
	    $scope.formatEventFromGrid = function (event) {
	        if (event.notes && event.notes.length > 0 && !$scope.noteExists) {
	            $scope.noteExists = true;
	        }
	
	        angular.forEach($scope.selectedProgramStage.programStageDataElements, function (prStDe) {
	            var de = prStDe.dataElement;
	            if (event[de.id]) {
	                event[de.id] = CommonUtils.formatDataValue(null, event[de.id], de, $scope.optionSets, 'USER');
	
	                switch (de.valueType) {
	                    case "FILE_RESOURCE":
	                        CommonUtils.checkAndSetFileName(event, event[de.id], de.id);
	                        break;
	                    case "ORGANISATION_UNIT":
	                        CommonUtils.checkAndSetOrgUnitName(event[de.id]);
	                        break;
	                }
	            }
	        });
	
	        setCommonEventProps(event);
	
	        if (event.latitude) {
	            var lat = $scope.formatNumberResult(event.latitude);
	            if (event.coordinate) {
	                event.coordinate.latitude = lat;
	            } else {
	                event.coordinate = { latitude: lat };
	            }
	        }
	
	        if (event.longitude) {
	            var lng = $scope.formatNumberResult(event.longitude);
	            if (event.coordinate) {
	                event.coordinate.longitude = lng;
	            } else {
	                event.coordinate = { longitude: lng };
	            }
	        }
	
	        event.state = 'PARTIAL';
	    };
	
	    /* If gridCoulumns for a program is stored in user data store then it is restored when
	     * the program is selected. If the grid columns are not stored then the grid columns are set
	     * as the default one for that program (in $scope.search() function)
	     * */
	    $scope.restoreGridColumnsFromUserStore = function () {
	        $scope.savedGridColumns = [];
	        if ($scope.gridColumnsInUserStore && $scope.selectedProgram && $scope.selectedProgram.id) {
	            if ($scope.gridColumnsInUserStore[$scope.selectedProgram.id]) {
	                $scope.savedGridColumns = angular.copy($scope.gridColumnsInUserStore[$scope.selectedProgram.id]);
	            }
	        }
	    };
	
	    $scope.getProgramDetails = function (program) {
	        $scope.selectedProgram = program;
	        $rootScope.ruleeffects = {};
	        var showStatus, savedColumn;
	        $scope.selectedOptions = [];
	        $scope.selectedProgramStage = null;
	        $scope.eventFetched = false;
	        $scope.optionsReady = false;
	
	        //Filtering
	        $scope.reverse = true;
	        $scope.sortHeader = { id: 'lastUpdated', direction: 'desc' };
	        $scope.filterText = {};
	        $scope.filterParam = '';
	
	        if ($scope.selectedProgram && $scope.selectedProgram.programStages && $scope.selectedProgram.programStages[0] && $scope.selectedProgram.programStages[0].id) {
	            var getShowStatus = function getShowStatus(defaultShowStatus, id) {
	                var showStatus = defaultShowStatus;
	
	                savedColumn = $filter('filter')($scope.savedGridColumns, { id: id }, true);
	                if (savedColumn.length > 0) {
	                    showStatus = savedColumn[0].show;
	                }
	                return showStatus;
	            };
	
	            //because this is single event, take the first program stage
	
	            $scope.selectedProgramStage = $scope.selectedProgram.programStages[0];
	            $scope.currentStage = $scope.selectedProgramStage;
	
	            angular.forEach($scope.selectedProgramStage.programStageSections, function (section) {
	                section.open = true;
	            });
	
	            $scope.prStDes = [];
	            $scope.restoreGridColumnsFromUserStore();
	            $scope.filterTypes = {};
	            $scope.newDhis2Event = {};
	            $scope.filterTypes['uid'] = 'TEXT';
	            $scope.eventGridColumns = [];
	
	            $scope.eventGridColumns.push({
	                displayName: 'event_uid',
	                id: 'uid',
	                valueType: 'TEXT',
	                compulsory: false,
	                filterWithRange: false,
	                showFilter: false,
	                show: getShowStatus(false, 'uid'),
	                group: 'FIXED'
	            });
	
	            $scope.eventGridColumns.push({
	                displayName: $scope.selectedProgramStage.executionDateLabel ? $scope.selectedProgramStage.executionDateLabel : $translate.instant('incident_date'),
	                id: 'eventDate',
	                valueType: 'DATE',
	                filterWithRange: true,
	                compulsory: false,
	                showFilter: false,
	                show: getShowStatus(true, 'eventDate'),
	                group: 'FIXED'
	            });
	
	            $scope.eventGridColumns.push({
	                displayName: $translate.instant('last_updated'),
	                id: 'lastUpdated',
	                valueType: 'DATE',
	                filterWithRange: true,
	                compulsory: false,
	                showFilter: false,
	                show: getShowStatus(true, 'lastUpdated'),
	                group: 'FIXED'
	            });
	
	            $scope.filterTypes['eventDate'] = 'DATE';
	            $scope.filterText['eventDate'] = {};
	
	            angular.forEach($scope.selectedProgramStage.programStageDataElements, function (prStDe) {
	
	                $scope.prStDes[prStDe.dataElement.id] = prStDe;
	                $scope.newDhis2Event[prStDe.dataElement.id] = '';
	
	                showStatus = getShowStatus(prStDe.displayInReports, prStDe.dataElement.id);
	
	                //generate grid headers using program stage data elements
	                //create a template for new event
	                //for date type dataelements, filtering is based on start and end dates
	                $scope.eventGridColumns.push({
	                    displayName: prStDe.dataElement.displayFormName,
	                    id: prStDe.dataElement.id,
	                    valueType: prStDe.dataElement.valueType,
	                    compulsory: prStDe.compulsory,
	                    filterWithRange: prStDe.dataElement.valueType === 'DATE' || prStDe.dataElement.valueType === 'NUMBER' || prStDe.dataElement.valueType === 'INTEGER' || prStDe.dataElement.valueType === 'INTEGER_POSITIVE' || prStDe.dataElement.valueType === 'INTEGER_NEGATIVE' || prStDe.dataElement.valueType === 'INTEGER_ZERO_OR_POSITIVE' ? true : false,
	                    showFilter: false,
	                    show: showStatus,
	                    group: 'DYNAMIC'
	                });
	
	                $scope.filterTypes[prStDe.dataElement.id] = prStDe.dataElement.valueType;
	
	                if (prStDe.dataElement.valueType === 'DATE' || prStDe.dataElement.valueType === 'NUMBER' || prStDe.dataElement.valueType === 'INTEGER' || prStDe.dataElement.valueType === 'INTEGER_POSITIVE' || prStDe.dataElement.valueType === 'INTEGER_NEGATIVE' || prStDe.dataElement.valueType === 'INTEGER_ZERO_OR_POSITIVE') {
	                    $scope.filterText[prStDe.dataElement.id] = {};
	                }
	            });
	
	            $scope.emptyFilterText = angular.copy($scope.filterText);
	
	            $scope.customDataEntryForm = CustomFormService.getForProgramStage($scope.selectedProgramStage, $scope.prStDes);
	
	            if ($scope.selectedProgramStage.captureCoordinates) {
	                $scope.newDhis2Event.coordinate = {};
	            }
	
	            $scope.newDhis2Event.eventDate = '';
	            $scope.newDhis2Event.event = 'SINGLE_EVENT';
	            $scope.newDhis2Event.orgUnit = $scope.selectedOrgUnit.id;
	
	            $scope.selectedCategories = [];
	            if ($scope.selectedProgram.categoryCombo && !$scope.selectedProgram.categoryCombo.isDefault && $scope.selectedProgram.categoryCombo.categories) {
	                $scope.selectedCategories = $scope.selectedProgram.categoryCombo.categories;
	            } else {
	                $scope.loadEvents();
	            }
	            $scope.optionsReady = true;
	        }
	    };
	
	    function loadOptions() {
	        $scope.selectedOptions = [];
	        var categoryOptions = null;
	
	        if ($scope.currentEvent.attributeCategoryOptions) {
	            $scope.selectedOptions = $scope.currentEvent.attributeCategoryOptions.split(";");
	            for (var index1 = 0; index1 < $scope.selectedCategories.length; index1++) {
	                categoryOptions = $scope.selectedCategories[index1].categoryOptions;
	                for (var index2 = 0; index2 < categoryOptions.length; index2++) {
	                    if (categoryOptions[index2].id === $scope.selectedOptions[index1]) {
	                        $scope.selectedCategories[index1].selectedOption = categoryOptions[index2];
	                        break;
	                    }
	                }
	            }
	            $scope.optionsReady = true;
	        }
	    }
	
	    $scope.getCategoryOptions = function () {
	        $scope.eventFetched = false;
	        $scope.optionsReady = false;
	        $scope.selectedOptions = [];
	
	        for (var i = 0; i < $scope.selectedCategories.length; i++) {
	            if ($scope.selectedCategories[i].selectedOption && $scope.selectedCategories[i].selectedOption.id) {
	                $scope.optionsReady = true;
	                $scope.selectedOptions.push($scope.selectedCategories[i].selectedOption.id);
	            } else {
	                $scope.optionsReady = false;
	                break;
	            }
	        }
	
	        if ($scope.optionsReady && !$scope.eventRegistration && !$scope.editingEventInFull) {
	            $scope.loadEvents();
	        }
	    };
	
	    //get events for the selected program (and org unit)
	    $scope.loadEvents = function (editInGrid) {
	        if (!editInGrid) {
	            resetView();
	        }
	        $scope.noteExists = false;
	        $scope.eventFetched = true;
	
	        $scope.attributeCategoryUrl = { cc: $scope.selectedProgram.categoryCombo.id, default: $scope.selectedProgram.categoryCombo.isDefault, cp: "" };
	        if (!$scope.selectedProgram.categoryCombo.isDefault) {
	            if ($scope.selectedOptions.length !== $scope.selectedCategories.length) {
	                var dialogOptions = {
	                    headerText: 'error',
	                    bodyText: 'fill_all_category_options'
	                };
	
	                DialogService.showDialog({}, dialogOptions);
	                return;
	            }
	            $scope.attributeCategoryUrl.cp = $scope.selectedOptions.join(';');
	        }
	
	        if ($scope.selectedProgram && $scope.selectedProgramStage && $scope.selectedProgramStage.id) {
	
	            //Load events for the selected program stage and orgunit
	
	            var dataElementUrl = $filter('filter')($scope.eventGridColumns, { group: 'DYNAMIC', show: true }).map(function (c) {
	                return c.id;
	            });
	
	            if (dataElementUrl && dataElementUrl.length > 0) {
	                dataElementUrl = '&dataElement=' + dataElementUrl.join(',');
	            } else {
	                dataElementUrl = '';
	            }
	
	            DHIS2EventFactory.getByStage($scope.selectedOrgUnit.id, $scope.selectedProgramStage.id, $scope.attributeCategoryUrl, $scope.pager, true, null, $scope.filterParam + dataElementUrl, $scope.sortHeader, $scope.selectedEventId).then(function (data) {
	                var _dhis2Events = [];
	                if (dhis2.ec.isOffline) {
	                    angular.forEach(data.events, function (ev) {
	                        $scope.formatEvent(ev);
	                        _dhis2Events.push(ev);
	                    });
	                } else {
	                    if (data && data.headers && data.rows) {
	                        _dhis2Events = [];
	                        angular.forEach(data.rows, function (r) {
	                            var ev = {};
	                            for (var i = 0; i < data.headers.length; i++) {
	                                ev[data.headers[i].name] = r[i];
	                            }
	                            $scope.formatEventFromGrid(ev);
	                            _dhis2Events.push(ev);
	                        });
	
	                        $scope.fileNames = CurrentSelection.getFileNames();
	                        $scope.orgUnitNames = CurrentSelection.getOrgUnitNames();
	                    }
	                }
	
	                if (data.metaData && data.metaData.pager) {
	                    data.metaData.pager.pageSize = data.metaData.pager.pageSize ? data.metaData.pager.pageSize : $scope.pager.pageSize;
	                    $scope.pager = data.metaData.pager;
	                    $scope.pager.toolBarDisplay = 5;
	
	                    Paginator.setPage($scope.pager.page);
	                    Paginator.setPageCount($scope.pager.pageCount);
	                    Paginator.setPageSize($scope.pager.pageSize);
	                    Paginator.setItemCount($scope.pager.total);
	                }
	
	                if ($scope.noteExists && !GridColumnService.columnExists($scope.eventGridColumns, 'comment')) {
	                    $scope.eventGridColumns.push({ displayName: 'comment', id: 'comment', type: 'TEXT', filterWithRange: false, compulsory: false, showFilter: false, show: true });
	                }
	
	                $scope.eventFetched = true;
	                $scope.dhis2Events = _dhis2Events;
	                $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	            });
	        }
	    };
	
	    $scope.jumpToPage = function () {
	
	        if ($scope.pager && $scope.pager.page && $scope.pager.pageCount && $scope.pager.page > $scope.pager.pageCount) {
	            $scope.pager.page = $scope.pager.pageCount;
	        }
	        $scope.loadEvents();
	    };
	
	    $scope.resetPageSize = function () {
	        $scope.pager.page = 1;
	        $scope.loadEvents();
	    };
	
	    $scope.getPage = function (page) {
	        $scope.pager.page = page;
	        $scope.loadEvents();
	    };
	
	    $scope.sortEventGrid = function (gridHeader) {
	        if ($scope.sortHeader && $scope.sortHeader.id === gridHeader.id) {
	            $scope.reverse = !$scope.reverse;
	        }
	        $scope.sortHeader = { id: gridHeader.id, direction: $scope.reverse ? 'desc' : 'asc' };
	        $scope.loadEvents();
	    };
	
	    $scope.showHideColumns = function () {
	        var oldCols = $filter('filter')(angular.copy($scope.eventGridColumns), { group: 'DYNAMIC', show: true }).length;
	        $scope.gridColumnsInUserStore = $scope.gridColumnsInUserStore ? $scope.gridColumnsInUserStore : {};
	        $scope.gridColumnsInUserStore[$scope.selectedProgram.id] = angular.copy($scope.eventGridColumns);
	
	        var modalInstance = $modal.open({
	            templateUrl: 'views/column-modal.html',
	            controller: 'ColumnDisplayController',
	            resolve: {
	                gridColumns: function gridColumns() {
	                    return $scope.eventGridColumns;
	                },
	                hiddenGridColumns: function hiddenGridColumns() {
	                    return $filter('filter')($scope.eventGridColumns, { show: false }).length;
	                },
	                gridColumnsInUserStore: function gridColumnsInUserStore() {
	                    return $scope.gridColumnsInUserStore;
	                },
	                gridColumnDomainKey: function gridColumnDomainKey() {
	                    return "eventCaptureGridColumns";
	                },
	                gridColumnKey: function gridColumnKey() {
	                    return $scope.selectedProgram.id;
	                }
	            }
	        });
	
	        modalInstance.result.then(function (gridColumns) {
	            $scope.eventGridColumns = gridColumns;
	            var newCols = $filter('filter')($scope.eventGridColumns, { group: 'DYNAMIC', show: true }).length;
	            if (newCols > oldCols) {
	                $scope.loadEvents();
	            }
	        });
	    };
	
	    $scope.filterEvents = function (gridColumn, applyFilter, stayOpen) {
	        $scope.filterParam = '';
	        $scope.selectedEventId = null;
	
	        angular.forEach($scope.eventGridColumns, function (col) {
	            if (gridColumn) {
	                if (col.id === gridColumn.id && !stayOpen) {
	                    col.showFilter = !col.showFilter;
	                } else if (!stayOpen) {
	                    col.showFilter = false;
	                }
	            }
	
	            if (applyFilter && $scope.filterText[col.id]) {
	                if (col.group === "FIXED") {
	                    switch (col.id) {
	                        case "eventDate":
	                            if ($scope.filterText[col.id].start || $scope.filterText[col.id].end) {
	                                if ($scope.filterText[col.id].start) {
	                                    $scope.filterParam += '&startDate=' + DateUtils.formatFromUserToApi($scope.filterText[col.id].start);
	                                }
	                                if ($scope.filterText[col.id].end) {
	                                    $scope.filterParam += '&endDate=' + DateUtils.formatFromUserToApi($scope.filterText[col.id].end);
	                                }
	                            }
	                            break;
	                        case "lastUpdated":
	                            if ($scope.filterText[col.id].start || $scope.filterText[col.id].end) {
	                                if ($scope.filterText[col.id].start) {
	                                    $scope.filterParam += '&lastUpdatedStartDate=' + DateUtils.formatFromUserToApi($scope.filterText[col.id].start);
	                                }
	                                if ($scope.filterText[col.id].end) {
	                                    $scope.filterParam += '&lastUpdatedEndDate=' + DateUtils.formatFromUserToApi($scope.filterText[col.id].end);
	                                }
	                            }
	                            break;
	                        case "status":
	                            $scope.filterParam += '&status=' + $scope.filterText[col.id];
	                            break;
	                    }
	                } else {
	                    if ($scope.prStDes[col.id] && $scope.prStDes[col.id].dataElement && $scope.prStDes[col.id].dataElement.optionSetValue) {
	
	                        if ($scope.filterText[col.id].length > 0) {
	                            var filters = $scope.filterText[col.id].map(function (filt) {
	                                return filt.code;
	                            });
	                            if (filters.length > 0) {
	                                $scope.filterParam += '&filter=' + col.id + ':IN:' + filters.join(';');
	                            }
	                        }
	                    } else {
	                        if (col.filterWithRange) {
	                            if ($scope.filterText[col.id].start && $scope.filterText[col.id].start !== "" || $scope.filterText[col.id].end && $scope.filterText[col.id].end !== "") {
	                                $scope.filterParam += '&filter=' + col.id;
	                                if ($scope.filterText[col.id].start) {
	                                    $scope.filterParam += ':GT:' + $scope.filterText[col.id].start;
	                                }
	                                if ($scope.filterText[col.id].end) {
	                                    $scope.filterParam += ':LT:' + $scope.filterText[col.id].end;
	                                }
	                            }
	                        } else {
	                            if (col.id === "uid") {
	                                $scope.selectedEventId = $scope.filterText[col.id];
	                            } else {
	                                $scope.filterParam += '&filter=' + col.id + ':like:' + $scope.filterText[col.id];
	                            }
	                        }
	                    }
	                }
	            }
	        });
	
	        if (applyFilter) {
	            $scope.pager.page = 1;
	            $scope.loadEvents();
	        }
	    };
	
	    $scope.removeStartFilterText = function (gridColumnId) {
	        $scope.filterText[gridColumnId].start = undefined;
	    };
	
	    $scope.removeEndFilterText = function (gridColumnId) {
	        $scope.filterText[gridColumnId].end = undefined;
	    };
	
	    $scope.resetFilter = function () {
	        $scope.filterText = angular.copy($scope.emptyFilterText);
	        $scope.filterEvents(null, true);
	    };
	
	    $scope.cancel = function () {
	
	        resetUrl();
	        if ($scope.formIsChanged()) {
	            var modalOptions = {
	                closeButtonText: 'no',
	                actionButtonText: 'yes',
	                headerText: 'warning',
	                bodyText: 'unsaved_data_exists_proceed'
	            };
	
	            ModalService.showModal({}, modalOptions).then(function (result) {
	                for (var i = 0; i < $scope.dhis2Events.length; i++) {
	                    if ($scope.dhis2Events[i].event === $scope.currentEvent.event) {
	                        $scope.dhis2Events[i] = $scope.currentEventOriginialValue;
	                        break;
	                    }
	                }
	
	                resetView();
	                $scope.currentEvent = {};
	                if (!angular.equals($scope.selectedOptionsOriginal, $scope.selectedOptions)) {
	
	                    $scope.loadEvents();
	                } else {
	                    $scope.showEventList();
	                }
	            });
	        } else {
	            resetView();
	            $scope.currentEvent = {};
	            if (!angular.equals($scope.selectedOptionsOriginal, $scope.selectedOptions)) {
	                $scope.loadEvents();
	            } else {
	                $scope.showEventList();
	            }
	        }
	    };
	
	    $scope.showEventList = function (dhis2Event) {
	
	        ContextMenuSelectedItem.setSelectedItem(dhis2Event);
	        resetView();
	        $scope.currentElement.updated = false;
	        $scope.currentEvent = {};
	        $scope.fileNames['SINGLE_EVENT'] = {};
	        $scope.currentElement = {};
	        $scope.currentEventOriginialValue = angular.copy($scope.currentEvent);
	    };
	
	    $scope.showEventRegistration = function () {
	        $scope.displayCustomForm = $scope.customDataEntryForm ? true : false;
	        $scope.currentEvent = {};
	        $scope.fileNames['SINGLE_EVENT'] = {};
	        $scope.currentFileNames = {};
	        $scope.eventRegistration = !$scope.eventRegistration;
	        $scope.currentEvent = angular.copy($scope.newDhis2Event);
	        if ($scope.outerForm) {
	            $scope.outerForm.submitted = false;
	        }
	        $scope.note = {};
	        $scope.displayTextEffects = [];
	
	        if ($scope.selectedProgramStage.preGenerateUID) {
	            $scope.eventUID = dhis2.util.uid();
	            $scope.currentEvent['uid'] = $scope.eventUID;
	        }
	        $scope.currentEventOriginialValue = angular.copy($scope.currentEvent);
	        $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	
	        if ($scope.eventRegistration) {
	            $scope.executeRules();
	        }
	    };
	
	    $scope.showEditEventInGrid = function () {
	        $scope.currentEvent = ContextMenuSelectedItem.getSelectedItem();
	        if (!$scope.currentEvent.coordinate) $scope.currentEvent.coordinate = {};
	        $scope.currentEventOriginialValue = angular.copy($scope.currentEvent);
	        $scope.editingEventInGrid = !$scope.editingEventInGrid;
	        $scope.outerForm.$valid = true;
	        checkEventEditingStatus();
	        $scope.executeRules("eventGridEdit");
	    };
	
	    var lastRoute = $route.current;
	    $scope.$on('$locationChangeSuccess', function (event) {
	        /* prevents rerouting when eventId, orgunit and category options
	         * are added to the url.*/
	        if ($route && $route.current && $route.current.params) {
	            var newRouteParams = $route.current.params;
	            if (newRouteParams.event || newRouteParams.ou || newRouteParams.options) {
	                $route.current = lastRoute;
	            }
	        }
	    });
	
	    $scope.showEditEventInFull = function () {
	        $scope.note = {};
	        $scope.displayTextEffects = [];
	        $scope.displayCustomForm = $scope.customDataEntryForm ? true : false;
	        $scope.selectedOptionsOriginal = angular.copy($scope.selectedOptions);
	
	        //$scope.currentEvent = ContextMenuSelectedItem.getSelectedItem();
	
	        var event = ContextMenuSelectedItem.getSelectedItem();
	
	        DHIS2EventFactory.get(event.event, event).then(function (event) {
	            $scope.formatEvent(event);
	            $scope.currentEvent = event;
	            loadOptions();
	            /*
	              When the user goes directly to the event edit page for an event with category options,
	              the $scope.dhis2Events will not be initialised since the selected category option for the event
	              was not available. So we initialize it here so that the event list is visibile when the user
	              clicks 'Cancel'/'Update button.
	            */
	            if ($scope.dhis2Events || $scope.dhis2Events.length && $scope.dhis2Events.length === 0) {
	                $scope.loadEvents();
	            }
	            $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, $scope.currentEvent);
	            $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	            $scope.editingEventInFull = !$scope.editingEventInFull;
	            $scope.eventRegistration = false;
	
	            angular.forEach($scope.selectedProgramStage.programStageDataElements, function (prStDe) {
	                if (!$scope.currentEvent.hasOwnProperty(prStDe.dataElement.id)) {
	                    $scope.currentEvent[prStDe.dataElement.id] = '';
	                }
	            });
	            $scope.currentEventOriginialValue = angular.copy($scope.currentEvent);
	
	            if ($scope.editingEventInFull) {
	                //Blank out rule effects, as there is no rules in effect before the first
	                //time the rules is run on a new page.
	                $rootScope.ruleeffects[$scope.currentEvent.event] = {};
	                $scope.executeRules();
	            }
	
	            if (!$location.search().ou) {
	                $location.search("ou", $scope.selectedOrgUnit.id);
	            }
	            if (!$location.search().event) {
	                $location.search("event", $scope.currentEvent.event);
	            }
	            checkEventEditingStatus();
	        });
	    };
	
	    function checkEventEditingStatus() {
	        if (!$scope.model.editingDisabled) {
	            $scope.model.editingDisabled = DHIS2EventService.getEventExpiryStatus($scope.currentEvent, $scope.selectedProgram, $scope.selectedOrgUnit.id);
	
	            if ($scope.model.editingDisabled) {
	                var dialogOptions = {
	                    headerText: $translate.instant('event_expired'),
	                    bodyText: $translate.instant('editing_disabled')
	                };
	                DialogService.showDialog({}, dialogOptions).then(function (response) {});
	            }
	        }
	    }
	
	    $scope.switchDataEntryForm = function () {
	        $scope.displayCustomForm = !$scope.displayCustomForm;
	    };
	
	    $scope.checkAndShowProgramRuleFeedback = function (editInGrid) {
	        //preparing a warnings section in case it is needed by one of the other dialogs.
	        var warningSection = false;
	        if ($scope.warningMessagesOnComplete && $scope.warningMessagesOnComplete.length > 0) {
	            warningSection = {
	                bodyText: 'be_aware_of_validation_warnings',
	                bodyList: $scope.warningMessagesOnComplete,
	                itemType: 'warning'
	            };
	        }
	
	        //Prepare an error section if any errors exist:
	        var errorSection = false;
	        if ($scope.errorMessagesOnComplete && $scope.errorMessagesOnComplete.length > 0) {
	            errorSection = {
	                bodyList: $scope.errorMessagesOnComplete,
	                itemType: 'danger'
	            };
	        }
	
	        var def = $q.defer();
	
	        if (errorSection) {
	            var sections = [errorSection];
	            if (warningSection) {
	                sections.push(warningSection);
	            }
	
	            var dialogOptions = {
	                headerText: 'validation_error',
	                bodyText: 'please_fix_errors_before_saving',
	                sections: sections
	            };
	            if (editInGrid) {
	                def.reject(false);
	                return def.promise;
	            }
	            DialogService.showDialog({}, dialogOptions).then(function (response) {
	                def.reject(response);
	            });
	        } else if (warningSection) {
	            if (editInGrid) {
	                def.resolve(true);
	                return def.promise;
	            }
	            var modalOptions = warningSection;
	            modalOptions.bodyText = 'save_despite_warnings';
	            modalOptions.headerText = 'validation_warnings';
	
	            ModalService.showModal({}, modalOptions).then(function () {
	                def.resolve(true);
	            }, function () {
	                def.reject(false);
	            });
	        } else {
	            def.resolve(true);
	        }
	
	        return def.promise;
	    };
	
	    $scope.addEvent = function (addingAnotherEvent) {
	
	        //check for form validity
	        $scope.outerForm.submitted = true;
	        if ($scope.outerForm.$invalid) {
	            $scope.selectedSection.id = 'ALL';
	            angular.forEach($scope.selectedProgramStage.programStageSections, function (section) {
	                section.open = true;
	            });
	            return false;
	        }
	
	        $scope.checkAndShowProgramRuleFeedback().then(function () {
	            //the form is valid, get the values
	            //but there could be a case where all dataelements are non-mandatory and
	            //the event form comes empty, in this case enforce at least one value
	            var dataValues = [];
	            for (var dataElement in $scope.prStDes) {
	                if ($scope.prStDes.hasOwnProperty(dataElement)) {
	                    var val = $scope.currentEvent[dataElement];
	                    val = CommonUtils.formatDataValue(null, val, $scope.prStDes[dataElement].dataElement, $scope.optionSets, 'API');
	                    dataValues.push({ dataElement: dataElement, value: val });
	                }
	            }
	
	            if (!dataValues.length || dataValues.length === 0) {
	                var dialogOptions = {
	                    headerText: 'empty_form',
	                    bodyText: 'please_fill_at_least_one_dataelement'
	                };
	
	                DialogService.showDialog({}, dialogOptions);
	                return;
	            }
	
	            $scope.model.savingRegistration = true;
	
	            var newEvent = angular.copy($scope.currentEvent);
	
	            //prepare the event to be created
	            var dhis2Event = {
	                program: $scope.selectedProgram.id,
	                programStage: $scope.selectedProgramStage.id,
	                orgUnit: $scope.selectedOrgUnit.id,
	                status: $scope.currentEvent.status ? 'COMPLETED' : 'ACTIVE',
	                eventDate: DateUtils.formatFromUserToApi(newEvent.eventDate),
	                dataValues: dataValues
	            };
	
	            if (dhis2Event.status === 'COMPLETED') {
	                dhis2Event.completedDate = DateUtils.formatFromUserToApi($scope.today);
	            }
	
	            if ($scope.selectedProgramStage.preGenerateUID && !angular.isUndefined(newEvent['uid'])) {
	                dhis2Event.event = newEvent['uid'];
	            }
	
	            if (!angular.isUndefined($scope.note.value) && $scope.note.value !== '') {
	                dhis2Event.notes = [{ value: $scope.note.value }];
	
	                newEvent.notes = [{ value: $scope.note.value, storedDate: $scope.today, storedBy: storedBy }];
	
	                $scope.noteExists = true;
	            }
	
	            if ($scope.selectedProgramStage.captureCoordinates) {
	                dhis2Event.coordinate = { latitude: $scope.currentEvent.coordinate.latitude ? $scope.currentEvent.coordinate.latitude : '',
	                    longitude: $scope.currentEvent.coordinate.longitude ? $scope.currentEvent.coordinate.longitude : '' };
	            }
	
	            if (!$scope.selectedProgram.categoryCombo.isDefault) {
	                if ($scope.selectedOptions.length !== $scope.selectedCategories.length) {
	                    var dialogOptions = {
	                        headerText: 'error',
	                        bodyText: 'fill_all_category_options'
	                    };
	
	                    DialogService.showDialog({}, dialogOptions);
	                    return;
	                }
	
	                //dhis2Event.attributeCc = $scope.selectedProgram.categoryCombo.id;
	                dhis2Event.attributeCategoryOptions = $scope.selectedOptions.join(';');
	            }
	
	            //send the new event to server        
	            DHIS2EventFactory.create(dhis2Event).then(function (data) {
	                if (data.response.importSummaries[0].status === 'ERROR') {
	                    var dialogOptions = {
	                        headerText: 'event_registration_error',
	                        bodyText: data.message
	                    };
	
	                    DialogService.showDialog({}, dialogOptions);
	                } else {
	
	                    //add the new event to the grid                
	                    newEvent.event = data.response.importSummaries[0].reference;
	                    $scope.currentEvent.event = newEvent.event;
	
	                    $scope.updateFileNames();
	
	                    if (!$scope.dhis2Events) {
	                        $scope.dhis2Events = [];
	                        $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	                    }
	                    newEvent['uid'] = newEvent.event;
	                    newEvent['eventDate'] = newEvent.eventDate;
	                    $scope.dhis2Events.splice(0, 0, newEvent);
	
	                    $scope.eventLength++;
	
	                    resetView();
	
	                    //reset form              
	                    $scope.currentEvent = {};
	                    $scope.currentEvent = angular.copy($scope.newDhis2Event);
	                    $scope.currentEventOriginialValue = angular.copy($scope.currentEvent);
	                    $scope.fileNames['SINGLE_EVENT'] = {};
	
	                    $scope.note = {};
	                    $scope.displayTextEffects = [];
	                    $scope.outerForm.submitted = false;
	                    $scope.outerForm.$setPristine();
	
	                    //decide whether to stay in the current screen or not.
	                    if (addingAnotherEvent) {
	                        $scope.showEventRegistration();
	                        $anchorScroll();
	                    }
	                }
	                $scope.model.savingRegistration = false;
	            });
	        });
	    };
	
	    function resetUrl() {
	        if ($location.search().ou) {
	            orgUnitFromUrl = null;
	            eventIdFromUrl = null;
	            //selectedOptionsFromUrl = null;
	            $location.search("event", null);
	            $location.search("ou", null);
	        }
	    }
	
	    $scope.updateEvent = function (editInGrid) {
	        resetUrl();
	        var def = $q.defer();
	        //check for form validity
	        $scope.outerForm.submitted = true;
	        if ($scope.outerForm.$invalid) {
	            $scope.selectedSection.id = 'ALL';
	            angular.forEach($scope.selectedProgramStage.programStageSections, function (section) {
	                section.open = true;
	            });
	            def.reject();
	            return def.promise;
	        }
	
	        return $scope.checkAndShowProgramRuleFeedback(editInGrid).then(function () {
	            //the form is valid, get the values
	            var dataValues = [];
	            for (var dataElement in $scope.prStDes) {
	                if ($scope.prStDes.hasOwnProperty(dataElement)) {
	                    var val = $scope.currentEvent[dataElement];
	                    val = CommonUtils.formatDataValue(null, val, $scope.prStDes[dataElement].dataElement, $scope.optionSets, 'API');
	                    dataValues.push({ dataElement: dataElement, value: val });
	                }
	            }
	
	            var updatedEvent = {
	                program: $scope.currentEvent.program,
	                programStage: $scope.currentEvent.programStage,
	                orgUnit: $scope.currentEvent.orgUnit,
	                status: $scope.currentEvent.status ? 'COMPLETED' : 'ACTIVE',
	                eventDate: DateUtils.formatFromUserToApi($scope.currentEvent.eventDate),
	                event: $scope.currentEvent.event,
	                dataValues: dataValues
	            };
	
	            if ($scope.selectedProgramStage.captureCoordinates) {
	                updatedEvent.coordinate = { latitude: $scope.currentEvent.coordinate.latitude ? $scope.currentEvent.coordinate.latitude : '',
	                    longitude: $scope.currentEvent.coordinate.longitude ? $scope.currentEvent.coordinate.longitude : '' };
	            }
	
	            if (!angular.isUndefined($scope.note.value) && $scope.note.value !== '') {
	
	                updatedEvent.notes = [{ value: $scope.note.value }];
	
	                if ($scope.currentEvent.notes) {
	                    $scope.currentEvent.notes.splice(0, 0, { value: $scope.note.value, storedDate: $scope.today, storedBy: storedBy });
	                } else {
	                    $scope.currentEvent.notes = [{ value: $scope.note.value, storedDate: $scope.today, storedBy: storedBy }];
	                }
	
	                $scope.noteExists = true;
	            }
	
	            if (updatedEvent.status === 'COMPLETED' && $scope.currentEventOriginialValue.status !== 'COMPLETED') {
	                updatedEvent.completedDate = DateUtils.formatFromUserToApi($scope.today);
	            }
	
	            if (!angular.equals($scope.selectedOptionsOriginal, $scope.selectedOptions)) {
	                updatedEvent.attributeCategoryOptions = $scope.selectedOptions.join(';');
	            }
	
	            return DHIS2EventFactory.update(updatedEvent).then(function (data) {
	                //reflect the change in the gird
	                $scope.outerForm.submitted = false;
	                $scope.editingEventInFull = false;
	                //$scope.currentEvent = {};
	                $scope.currentEventOriginialValue = angular.copy($scope.currentEvent);
	                if (!angular.equals($scope.selectedOptionsOriginal, $scope.selectedOptions)) {
	                    $scope.loadEvents(editInGrid);
	                } else {
	                    $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, $scope.currentEvent);
	                    $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	                    $scope.updateFileNames();
	                }
	                if (!editInGrid) {
	                    $scope.currentEvent = {};
	                }
	            });
	        }, function () {
	            def.reject();return def.promise;
	        });
	    };
	
	    $scope.updateEventDate = function () {
	
	        $scope.updateSuccess = false;
	
	        $scope.currentElement = { id: 'eventDate' };
	
	        var rawDate = angular.copy($scope.currentEvent.eventDate);
	        var convertedDate = DateUtils.format($scope.currentEvent.eventDate);
	
	        if (!rawDate || !convertedDate || rawDate !== convertedDate) {
	            $scope.invalidDate = true;
	            $scope.currentEvent.eventDate = $scope.currentEventOriginialValue.eventDate;
	            $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, $scope.currentEvent);
	            $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	            $scope.currentElement.updated = false;
	            return;
	        }
	
	        //get new and old values
	        var newValue = $scope.currentEvent.eventDate;
	        var oldValue = $scope.currentEventOriginialValue.eventDate;
	
	        if ($scope.currentEvent.eventDate === '') {
	            $scope.currentEvent.eventDate = oldValue;
	            $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, $scope.currentEvent);
	            $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	            $scope.currentElement.updated = false;
	            return;
	        }
	
	        if (newValue !== oldValue) {
	            var e = { event: $scope.currentEvent.event,
	                orgUnit: $scope.currentEvent.orgUnit,
	                eventDate: DateUtils.formatFromUserToApi($scope.currentEvent.eventDate)
	            };
	
	            var updatedFullValueEvent = DHIS2EventService.reconstructEvent($scope.currentEvent, $scope.selectedProgramStage.programStageDataElements);
	
	            DHIS2EventFactory.updateForEventDate(e, updatedFullValueEvent).then(function () {
	                //reflect the new value in the grid
	                $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, $scope.currentEvent);
	                $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	
	                //update original value
	                $scope.currentEventOriginialValue = angular.copy($scope.currentEvent);
	
	                $scope.currentElement.updated = true;
	                $scope.updateSuccess = true;
	            });
	        }
	    };
	
	    $scope.updateEventDataValueRadio = function (dataElement, eventToSave, value) {
	        eventToSave[dataElement] = value;
	        return $scope.updateEventDataValue(dataElement, eventToSave);
	    };
	
	    $scope.updateEventDataValue = function (dataElement, eventToSave, backgroundUpdate) {
	
	        $scope.updateSuccess = false;
	
	        //get current element
	        $scope.currentElement = { id: dataElement, pending: true, updated: false, failed: false, event: eventToSave.event };
	
	        //get new and old values
	        var newValue = eventToSave[dataElement];
	        //var oldValue = eventToSave[dataElement];
	        var oldValue = null;
	        for (var i = 0; i < $scope.currentStageEventsOriginal.length; i++) {
	            if ($scope.currentStageEventsOriginal[i].event === eventToSave.event) {
	                oldValue = $scope.currentStageEventsOriginal[i][dataElement];
	                break;
	            }
	        }
	        //check for form validity
	        if ($scope.outerForm.$invalid) {
	            $scope.currentElement.updated = false;
	
	            //reset value back to original
	            eventToSave[dataElement] = oldValue;
	            $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, eventToSave);
	            $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	            return;
	        }
	
	        if ($scope.prStDes[dataElement].compulsory && !newValue) {
	            $scope.currentElement.updated = false;
	
	            //reset value back to original
	            eventToSave[dataElement] = oldValue;
	            $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, eventToSave);
	            $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	            return;
	        }
	
	        if (newValue !== oldValue) {
	            newValue = CommonUtils.formatDataValue(null, newValue, $scope.prStDes[dataElement].dataElement, $scope.optionSets, 'API');
	            var updatedSingleValueEvent = { event: eventToSave.event, dataValues: [{ value: newValue, dataElement: dataElement }] };
	            var updatedFullValueEvent = DHIS2EventService.reconstructEvent(eventToSave, $scope.selectedProgramStage.programStageDataElements);
	
	            return $scope.executeRules("eventGridEdit").then(function () {
	                for (var key in $scope.mandatoryFields) {
	                    if ($scope.mandatoryFields.hasOwnProperty(key) && $scope.prStDes[key]) {
	                        if (!$scope.currentEvent[key]) {
	                            var mandatoryDe = $scope.prStDes[key].dataElement;
	                            $scope.currentElement.updated = false;
	
	                            //reset value back to original
	                            eventToSave[dataElement] = oldValue;
	                            $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, eventToSave);
	                            $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	                            var headerText = $translate.instant('error');
	                            var bodyText = $translate.instant('the_current_input_makes') + ' "' + mandatoryDe.displayName + '" ' + $translate.instant("a_mandatory_field_please_give") + ' "' + mandatoryDe.displayName + '" ' + $translate.instant("a_value_first");
	
	                            NotificationService.showNotifcationDialog(headerText, bodyText);
	                            $scope.executeRules("eventGridEdit");
	                            return;
	                        }
	                    }
	                }
	
	                $scope.updateEvent(true).then(function () {
	                    $scope.currentElement.pending = false;
	                    $scope.currentElement.updated = true;
	                    $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, eventToSave);
	                    $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	                    $scope.currentEventOriginialValue = angular.copy(eventToSave);
	                }, function () {
	                    $scope.currentElement.pending = false;
	                    $scope.currentElement.updated = false;
	                });
	            });
	
	            /*DHIS2EventFactory.updateForSingleValue(updatedSingleValueEvent, updatedFullValueEvent).then(function(data){
	                
	                //reflect the new value in the grid
	                $scope.dhis2Events = DHIS2EventService.refreshList($scope.dhis2Events, eventToSave);
	                $scope.currentStageEventsOriginal = angular.copy($scope.dhis2Events);
	                //update original value
	                $scope.currentEventOriginialValue = angular.copy(eventToSave);      
	                
	                $scope.currentElement.pending = false;
	                $scope.currentElement.updated = true;
	                $scope.updateSuccess = true;
	                if(!backgroundUpdate){
	                    $scope.executeRules("eventGridEdit");
	                }
	            }, function(){
	                $scope.currentElement.pending = false;
	                $scope.currentElement.updated = false;
	                $scope.currentElement.failed = true;
	            });*/
	        }
	        var def = $q.defer();
	        def.resolve();
	        return def.promise;
	    };
	
	    $scope.removeEvent = function () {
	
	        var dhis2Event = ContextMenuSelectedItem.getSelectedItem();
	
	        var modalOptions = {
	            closeButtonText: 'cancel',
	            actionButtonText: 'remove',
	            headerText: 'remove',
	            bodyText: 'are_you_sure_to_remove_with_audit'
	        };
	
	        ModalService.showModal({}, modalOptions).then(function (result) {
	
	            DHIS2EventFactory.delete(dhis2Event).then(function (data) {
	
	                $scope.currentFileNames = {};
	                delete $scope.fileNames[$scope.currentEvent.event];
	                var continueLoop = true,
	                    index = -1;
	                for (var i = 0; i < $scope.dhis2Events.length && continueLoop; i++) {
	                    if ($scope.dhis2Events[i].event === dhis2Event.event) {
	                        $scope.dhis2Events[i] = dhis2Event;
	                        continueLoop = false;
	                        index = i;
	                    }
	                }
	                $scope.dhis2Events.splice(index, 1);
	                $scope.currentEvent = {};
	                $scope.fileNames['SINGLE_EVENT'] = {};
	            }, function (error) {
	
	                //temporarily error message because of new audit functionality
	                var dialogOptions = {
	                    headerText: 'error',
	                    bodyText: 'delete_error_audit'
	                };
	                DialogService.showDialog({}, dialogOptions);
	            });
	        });
	    };
	
	    $scope.getCSVExportList = function () {
	        var csvFields = ["event", "program", "programStage", "orgUnitName", "eventDate", "created", "status"];
	        var selectedDataElements;
	        var deferred = $q.defer();
	
	        var dataElementUrl = $filter('filter')($scope.eventGridColumns, { group: 'DYNAMIC', show: true }).map(function (c) {
	            return c.id;
	        });
	
	        if (dataElementUrl && dataElementUrl.length > 0) {
	            dataElementUrl = '&dataElement=' + dataElementUrl.join(',');
	        } else {
	            dataElementUrl = '';
	        }
	        selectedDataElements = dataElementUrl.substr("&dataElement=".length).split(",");
	        csvFields = csvFields.concat(selectedDataElements);
	
	        DHIS2EventFactory.getByStage($scope.selectedOrgUnit.id, $scope.selectedProgramStage.id, $scope.attributeCategoryUrl, null, false, null, $scope.filterParam + dataElementUrl).then(function (data) {
	            var headerArray,
	                headerFieldNames,
	                headerFieldIds,
	                eventsCSV = [],
	                field,
	                index,
	                csvFieldsIndices = [],
	                csvRow,
	                processedData;
	            if (angular.isObject(data)) {
	                if (angular.isObject(data.headers)) {
	                    headerArray = data.headers;
	                    headerFieldIds = data.headers.map(function (object) {
	                        return object.name;
	                    });
	                    headerFieldNames = data.headers.map(function (object) {
	                        return object.column;
	                    });
	                    eventsCSV[0] = [];
	                    for (var i = 0; i < csvFields.length; i++) {
	                        field = csvFields[i];
	                        index = headerFieldIds.indexOf(field);
	                        if (index > -1) {
	                            csvFieldsIndices.push(index);
	                            eventsCSV[0].push(headerFieldNames[index]);
	                        }
	                    }
	                }
	                if (angular.isObject(data.rows)) {
	                    angular.forEach(data.rows, function (rowArray) {
	                        /* rowArray has one row of values for the event fields */
	                        if (angular.isObject(rowArray)) {
	                            csvRow = [];
	                            csvFieldsIndices.forEach(function (idx) {
	                                processedData = getProcessedValue(headerArray[idx].name, rowArray[idx]);
	                                csvRow.push(processedData.value);
	                            });
	                            eventsCSV.push(csvRow);
	                        }
	                    });
	                }
	                deferred.resolve(eventsCSV);
	            }
	        });
	        return deferred.promise;
	    };
	
	    $scope.getExportList = function (format) {
	        var eventsJSON = [];
	
	        DHIS2EventFactory.getByStage($scope.selectedOrgUnit.id, $scope.selectedProgramStage.id, $scope.attributeCategoryUrl, true).then(function (data) {
	            var headerArray;
	            var eventsXML = '<eventList>';
	            var processedData;
	            var dataValues;
	            var eventJSON;
	            if (angular.isObject(data)) {
	                if (angular.isObject(data.headers)) {
	                    headerArray = data.headers;
	                }
	                if (angular.isObject(data.rows)) {
	                    angular.forEach(data.rows, function (rowArray) {
	                        /* rowArray has one row of values for the event fields */
	                        if (angular.isObject(rowArray)) {
	                            if (format === "JSON") {
	                                eventJSON = {};
	                                dataValues = [];
	                                headerArray.forEach(function (key, idx) {
	                                    if (rowArray[idx]) {
	                                        processedData = getProcessedValue(headerArray[idx].name, rowArray[idx]);
	                                        if (processedData.isDataValue) {
	                                            dataValues.push({ name: processedData.name, id: processedData.id, value: processedData.value });
	                                        } else {
	                                            eventJSON[processedData.name] = processedData.value;
	                                        }
	                                    }
	                                });
	                                if (dataValues.length > 0) {
	                                    eventJSON["dataValues"] = dataValues;
	                                }
	                                eventsJSON.push(eventJSON);
	                            } else if (format === "XML") {
	                                eventsXML += "<event>";
	                                dataValues = [];
	                                headerArray.forEach(function (key, idx) {
	                                    if (rowArray[idx]) {
	                                        processedData = getProcessedValue(headerArray[idx].name, rowArray[idx]);
	                                        if (processedData.isDataValue) {
	                                            dataValues.push(processedData);
	                                        } else {
	                                            eventsXML += "<" + processedData.name + ">" + processedData.value + "</" + processedData.name + ">";
	                                        }
	                                    }
	                                });
	                                if (dataValues.length > 0) {
	                                    eventsXML += "<dataValues>";
	                                    for (var index = 0; index < dataValues.length; index++) {
	                                        eventsXML += '<dataValue dataElementId="' + dataValues[index].id + '" ' + 'dataElementName="' + dataValues[index].name + '" ' + 'value="' + dataValues[index].value + '"/>';
	                                    }
	                                    eventsXML += "</dataValues>";
	                                }
	                                eventsXML += "</event>";
	                            }
	                        }
	                    });
	                }
	            }
	
	            if (format === "JSON") {
	                saveFile(JSON.stringify({ "events": eventsJSON }));
	            } else if (format === "XML") {
	                eventsXML += '</eventList>';
	                saveFile(eventsXML);
	            }
	        });
	
	        function saveFile(data) {
	            var fileName = "eventList." + format.toLowerCase(); // any file name with any extension
	            var a = document.createElement('a');
	            var blob, url;
	
	            a.style = "display: none";
	            blob = new Blob(['' + data], { type: "octet/stream", endings: 'native' });
	            url = window.URL.createObjectURL(blob);
	            a.href = url;
	            a.download = fileName;
	            document.body.appendChild(a);
	            a.click();
	            setTimeout(function () {
	                document.body.removeChild(a);
	                window.URL.revokeObjectURL(url);
	            }, 300);
	        }
	    };
	
	    function getProcessedValue(fieldName, fieldValue) {
	        var processedData = { name: fieldName, value: fieldValue };
	        switch (fieldName) {
	            case 'program':
	                processedData.value = $scope.selectedProgram && $scope.selectedProgram.name ? $scope.selectedProgram.name : fieldValue;
	                break;
	            case 'programStage':
	                processedData.value = $scope.currentStage && $scope.currentStage.name ? $scope.currentStage.name : fieldValue;
	                //alert(fieldValue);
	                break;
	            case 'created':
	            case 'completedDate':
	            case 'eventDate':
	            case 'dueDate':
	                processedData.value = DateUtils.formatFromApiToUser(fieldValue);
	            default:
	                if ($scope.prStDes[fieldName] && $scope.prStDes[fieldName].dataElement) {
	                    processedData.name = $scope.prStDes[fieldName].dataElement.name;
	                    processedData.value = CommonUtils.formatDataValue(null, processedData.value, $scope.prStDes[fieldName].dataElement, $scope.optionSets, 'USER');
	                    processedData.value = processedData.value.toString();
	                    processedData.isDataValue = true;
	                    processedData.id = $scope.prStDes[fieldName].dataElement.id;
	                }
	        }
	        return processedData;
	    }
	
	    $scope.showNotes = function (_dhis2Event) {
	
	        var modalInstance = $modal.open({
	            templateUrl: 'views/notes.html',
	            controller: 'NotesController',
	            resolve: {
	                dhis2Event: function dhis2Event() {
	                    return _dhis2Event;
	                }
	            }
	        });
	
	        modalInstance.result.then(function () {});
	    };
	
	    $scope.getHelpContent = function () {};
	
	    $scope.showAuditHistory = function () {
	
	        var dhis2Event = ContextMenuSelectedItem.getSelectedItem();
	
	        var modalInstance = $modal.open({
	            templateUrl: './templates/audit-history.html',
	            controller: 'AuditHistoryController',
	            resolve: {
	                eventId: function eventId() {
	                    return dhis2Event.event;
	                },
	                dataType: function dataType() {
	                    return 'dataElement';
	                },
	                nameIdMap: function nameIdMap() {
	                    return $scope.prStDes;
	                },
	                optionSets: function optionSets() {
	                    return $scope.optionSets;
	                }
	            }
	        });
	
	        modalInstance.result.then(function () {}, function () {});
	    };
	
	    $scope.formIsChanged = function () {
	        var isChanged = false;
	        var emptyForm = $scope.formIsEmpty();
	        for (var i = 0; i < $scope.selectedProgramStage.programStageDataElements.length && !isChanged; i++) {
	            var deId = $scope.selectedProgramStage.programStageDataElements[i].dataElement.id;
	            if ($scope.currentEventOriginialValue[deId] !== $scope.currentEvent[deId]) {
	                if ($scope.currentEvent[deId] || $scope.currentEventOriginialValue[deId] !== "" && !emptyForm) {
	                    isChanged = true;
	                }
	            }
	        }
	        if (!isChanged) {
	            if ($scope.currentEvent.eventDate !== $scope.currentEventOriginialValue.eventDate || $scope.currentEvent.status !== $scope.currentEventOriginialValue.status) {
	                isChanged = true;
	            }
	        }
	
	        return isChanged;
	    };
	
	    $scope.isFormInvalid = function () {
	        if ($scope.outerForm.submitted) {
	            return $scope.outerForm.$invalid;
	        }
	
	        if ($scope.model.invalidDate) {
	            return true;
	        }
	
	        if (!$scope.outerForm.$dirty) {
	            return false;
	        }
	
	        var formIsInvalid = false;
	        for (var k in $scope.outerForm.$error) {
	            if (angular.isObject($scope.outerForm.$error[k])) {
	
	                for (var i = 0; i < $scope.outerForm.$error[k].length && !formIsInvalid; i++) {
	                    if ($scope.outerForm.$error[k][i].$dirty && $scope.outerForm.$error[k][i].$invalid) {
	                        formIsInvalid = true;
	                    }
	                }
	            }
	
	            if (formIsInvalid) {
	                break;
	            }
	        }
	
	        return formIsInvalid;
	    };
	
	    $scope.formIsEmpty = function () {
	        for (var dataElement in $scope.prStDes) {
	            if ($scope.currentEvent[dataElement]) {
	                return false;
	            }
	        }
	        return true;
	    };
	
	    //watch for event editing
	    $scope.$watchCollection('[editingEventInFull, eventRegistration]', function () {
	        if ($scope.editingEventInFull || $scope.eventRegistration) {
	            //Disable ou selection while in editing mode
	            $("#orgUnitTree").addClass("disable-clicks");
	        } else {
	            //enable ou selection if not in editing mode
	            $("#orgUnitTree").removeClass("disable-clicks");
	        }
	    });
	
	    $scope.interacted = function (field) {
	        var status = false;
	        if (field) {
	            status = $scope.outerForm.submitted || field.$dirty;
	        }
	        return status;
	    };
	
	    //listen for rule effect changes    
	    var ruleEffectsUpdated = function ruleEffectsUpdated(result) {
	        $scope.warningMessages = [];
	        $scope.warningMessagesOnComplete = [];
	        $scope.errorMessagesOnComplete = [];
	        $scope.hiddenSections = [];
	        $scope.hiddenFields = [];
	        $scope.assignedFields = [];
	        $scope.mandatoryFields = [];
	        $scope.displayTextEffects = [];
	
	        var isGridEdit = result.callerId === "eventGridEdit";
	
	        if ($rootScope.ruleeffects[result.event]) {
	            //Establish which event was affected:
	            var affectedEvent = $scope.currentEvent;
	            //In most cases the updated effects apply to the current event. In case the affected event is not the current event, fetch the correct event to affect:
	            if (result.event !== affectedEvent.event) {
	                angular.forEach($scope.currentStageEvents, function (searchedEvent) {
	                    if (searchedEvent.event === result.event) {
	                        affectedEvent = searchedEvent;
	                    }
	                });
	            }
	            angular.forEach($rootScope.ruleeffects[result.event], function (effect) {
	
	                if (effect.ineffect) {
	                    //in the data entry controller we only care about the "hidefield" actions
	                    if (effect.action === "HIDEFIELD") {
	                        if (effect.dataElement) {
	                            if (affectedEvent[effect.dataElement.id]) {
	                                //If a field is going to be hidden, but contains a value, we need to take action;
	                                if (effect.content) {
	                                    //TODO: Alerts is going to be replaced with a proper display mecanism.
	                                    alert(effect.content);
	                                } else {
	                                    //TODO: Alerts is going to be replaced with a proper display mecanism.
	                                    alert($scope.prStDes[effect.dataElement.id].dataElement.displayFormName + " was blanked out and hidden by your last action");
	                                }
	
	                                //Blank out the value:
	                                affectedEvent[effect.dataElement.id] = "";
	                            }
	
	                            $scope.hiddenFields[effect.dataElement.id] = effect.ineffect;
	                        } else {
	                            $log.warn("ProgramRuleAction " + effect.id + " is of type HIDEFIELD, bot does not have a dataelement defined");
	                        }
	                    } else if (effect.action === "HIDESECTION") {
	                        if (effect.programStageSection) {
	                            $scope.hiddenSections[effect.programStageSection] = effect.programStageSection;
	                        }
	                    } else if (effect.action === "SHOWERROR" || effect.action === "ERRORONCOMPLETE") {
	
	                        var message = effect.content + (effect.data ? effect.data : "");
	
	                        if (effect.dataElement && effect.dataElement.id && effect.action === "SHOWERROR") {
	                            message = $scope.prStDes[effect.dataElement.id].dataElement.displayFormName + ": " + message;
	                            $scope.currentEvent[effect.dataElement.id] = $scope.currentEventOriginialValue[effect.dataElement.id];
	                            var dialogOptions = {
	                                headerText: 'validation_error',
	                                bodyText: message
	                            };
	                            DialogService.showDialog({}, dialogOptions);
	                        }
	
	                        $scope.errorMessagesOnComplete.push(message);
	                    } else if (effect.action === "SHOWWARNING" || effect.action === "WARNINGONCOMPLETE") {
	                        if (effect.action === "SHOWWARNING") {
	                            if (effect.dataElement && $scope.hiddenFields[effect.dataElement.id]) {
	                                console.log("Warning (" + effect.id + ") hidden because, data element (" + effect.dataElement.id + ") is hidden by program rule.");
	                            } else {
	                                $scope.warningMessages.push(effect.content + (effect.data ? effect.data : ""));
	                            }
	                        }
	                        $scope.warningMessagesOnComplete.push(effect.content + (effect.data ? effect.data : ""));
	                    } else if (effect.action === "ASSIGN") {
	                        var data = $filter('trimquotes')(effect.data);
	                        var processedValue = CommonUtils.formatDataValue(null, data, $scope.prStDes[effect.dataElement.id].dataElement, $scope.optionSets, 'USER');
	
	                        //For "ASSIGN" actions where we have a dataelement, we save the calculated value to the dataelement:
	                        if ($scope.prStDes[effect.dataElement.id].dataElement.optionSet) {
	                            processedValue = OptionSetService.getName($scope.optionSets[$scope.prStDes[effect.dataElement.id].dataElement.optionSet.id].options, processedValue);
	                        }
	                        processedValue = processedValue === "true" ? true : processedValue;
	                        processedValue = processedValue === "false" ? false : processedValue;
	
	                        affectedEvent[effect.dataElement.id] = processedValue;
	                        $scope.assignedFields[effect.dataElement.id] = true;
	                        //if(isGridEdit) $scope.updateEventDataValue(effect.dataElement.id, affectedEvent, true);
	                    } else if (effect.action === "DISPLAYKEYVALUEPAIR") {
	                        $scope.displayTextEffects.push({ name: effect.content, text: effect.data });
	                    } else if (effect.action === "DISPLAYTEXT") {
	                        $scope.displayTextEffects.push({ text: effect.data + effect.content });
	                    } else if (effect.action === "SETMANDATORYFIELD") {
	                        $scope.mandatoryFields[effect.dataElement.id] = effect.ineffect;
	                    }
	                }
	            });
	        }
	    };
	
	    $scope.executeRules = function (callerId) {
	        $scope.currentEvent.event = !$scope.currentEvent.event ? 'SINGLE_EVENT' : $scope.currentEvent.event;
	        var flags = { debug: true, verbose: $location.search().verbose ? true : false, callerId: callerId };
	        return TrackerRulesExecutionService.loadAndExecuteRulesScope($scope.currentEvent, $scope.selectedProgram.id, $scope.selectedProgramStage.id, $scope.prStDes, null, $scope.optionSets, $scope.selectedOrgUnit.id, flags).then(function (result) {
	            ruleEffectsUpdated(result);
	        });
	    };
	
	    $scope.formatNumberResult = function (val) {
	        return dhis2.validation.isNumber(val) ? new Number(val) : '';
	    };
	
	    $scope.toTwoDecimals = function (val) {
	        //Round data to two decimals if it is a number:
	        if (dhis2.validation.isNumber(val)) {
	            val = Math.round(val * 100) / 100;
	        }
	
	        return val;
	    };
	
	    //check if field is hidden
	    $scope.isHidden = function (id) {
	        //In case the field contains a value, we cant hide it. 
	        //If we hid a field with a value, it would falsely seem the user was aware that the value was entered in the UI.
	        if ($scope.currentEvent[id]) {
	            return false;
	        } else {
	            return $scope.hiddenFields[id];
	        }
	    };
	
	    $scope.saveDatavalue = function () {
	        $scope.executeRules();
	    };
	
	    $scope.saveDatavalueRadio = function (prStDe, event, value) {
	        var id = prStDe.dataElement ? prStDe.dataElement.id : prStDe.id;
	        event[id] = value;
	        $scope.executeRules();
	    };
	
	    $scope.updateDatavalueRadio = function (prStDe, event, value) {
	        var id = prStDe.dataElement ? prStDe.dataElement.id : prStDe.id;
	        event[id] = value;
	        $scope.updateEventDataValue(id);
	    };
	
	    $scope.saveCurrentEventStatus = function (status) {
	        $scope.currentEvent.status = status;
	    };
	
	    $scope.getInputNotifcationClass = function (id, custom) {
	        if ($scope.currentElement.id && $scope.currentElement.id === id) {
	            if ($scope.currentElement.pending) {
	                if (custom) {
	                    return 'input-pending';
	                }
	                return 'form-control input-pending';
	            }
	            if ($scope.currentElement.updated) {
	                if (custom) {
	                    return 'input-success';
	                }
	                return 'form-control input-success';
	            }
	            if ($scope.currentElement.failed) {
	                if (custom) {
	                    return 'input-error';
	                }
	                return 'form-control input-error';
	            }
	        }
	        if (custom) {
	            return '';
	        }
	        return 'form-control';
	    };
	
	    $scope.getClickFunction = function (dhis2Event, column) {
	
	        if (column.id === 'comment') {
	            return "showNotes(" + dhis2Event + ")";
	        } else {
	            if (dhis2Event.event === $scope.currentEvent.event) {
	                return '';
	            } else {
	                return "showEventList(" + dhis2Event + ")";
	            }
	        }
	        return '';
	    };
	
	    $scope.downloadFile = function (eventUid, dataElementUid, e) {
	        eventUid = eventUid ? eventUid : $scope.currentEvent.event ? $scope.currentEvent.event : null;
	        if (!eventUid || !dataElementUid) {
	
	            var dialogOptions = {
	                headerText: 'error',
	                bodyText: 'missing_file_identifier'
	            };
	
	            DialogService.showDialog({}, dialogOptions);
	            return;
	        }
	
	        $window.open(DHIS2URL + '/events/files?eventUid=' + eventUid + '&dataElementUid=' + dataElementUid, '_blank', '');
	        if (e) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	    };
	
	    $scope.deleteFile = function (event, dataElement) {
	
	        if (!dataElement) {
	            var dialogOptions = {
	                headerText: 'error',
	                bodyText: 'missing_file_identifier'
	            };
	            DialogService.showDialog({}, dialogOptions);
	            return;
	        }
	
	        var modalOptions = {
	            closeButtonText: 'cancel',
	            actionButtonText: 'remove',
	            headerText: 'remove',
	            bodyText: 'are_you_sure_to_remove'
	        };
	
	        ModalService.showModal({}, modalOptions).then(function (result) {
	            delete $scope.fileNames[$scope.currentEvent.event][dataElement];
	            $scope.currentEvent[dataElement] = null;
	            $scope.updateEventDataValue(dataElement, $scope.currentEvent);
	        });
	    };
	
	    $scope.updateFileNames = function () {
	        for (var dataElement in $scope.currentFileNames) {
	            if ($scope.currentFileNames[dataElement]) {
	                if (!$scope.fileNames[$scope.currentEvent.event]) {
	                    $scope.fileNames[$scope.currentEvent.event] = {};
	                }
	                $scope.fileNames[$scope.currentEvent.event][dataElement] = $scope.currentFileNames[dataElement];
	            }
	        }
	    };
	
	    $scope.filterTextExist = function () {
	        return angular.equals($scope.filterText, $scope.emptyFilterText);
	    };
	
	    $scope.hasDataWrite = function () {
	        return $scope.selectedProgram && $scope.selectedProgram.access && $scope.selectedProgram.access.data.write;
	    };
	
	    $scope.accessFilter = function (categoryOption) {
	        return categoryOption.access && categoryOption.access.read;
	    };
	}]).controller('NotesController', ["$scope", "$modalInstance", "dhis2Event", function ($scope, $modalInstance, dhis2Event) {
	
	    $scope.dhis2Event = dhis2Event;
	
	    $scope.close = function () {
	        $modalInstance.close();
	    };
	}]);

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	'use strict';
	
	/* Filters */
	var eventCaptureFilters = angular.module('eventCaptureFilters', []);

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';
	
	(function (window, document) {
	
	  // Create all modules and define dependencies to make sure they exist
	  // and are loaded in the correct order to satisfy dependency injection
	  // before all nested files are concatenated by Grunt
	
	  // Config
	  angular.module('ngCsv.config', []).value('ngCsv.config', {
	    debug: true
	  }).config(['$compileProvider', function ($compileProvider) {
	    if (angular.isDefined($compileProvider.urlSanitizationWhitelist)) {
	      $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
	    } else {
	      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
	    }
	  }]);
	
	  // Modules
	  angular.module('ngCsv.directives', ['ngCsv.services']);
	  angular.module('ngCsv.services', []);
	  angular.module('ngCsv', ['ngCsv.config', 'ngCsv.services', 'ngCsv.directives', 'ngSanitize']);
	
	  // Common.js package manager support (e.g. ComponentJS, WebPack)
	  if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
	    module.exports = 'ngCsv';
	  }
	  /**
	   * Created by asafdav on 15/05/14.
	   */
	  angular.module('ngCsv.services').service('CSV', ['$q', function ($q) {
	
	    var EOL = '\r\n';
	    var BOM = '\uFEFF';
	
	    var specialChars = {
	      '\\t': '\t',
	      '\\b': '\b',
	      '\\v': '\v',
	      '\\f': '\f',
	      '\\r': '\r'
	    };
	
	    /**
	     * Stringify one field
	     * @param data
	     * @param options
	     * @returns {*}
	     */
	    this.stringifyField = function (data, options) {
	      if (options.decimalSep === 'locale' && this.isFloat(data)) {
	        return data.toLocaleString();
	      }
	
	      if (options.decimalSep !== '.' && this.isFloat(data)) {
	        return data.toString().replace('.', options.decimalSep);
	      }
	
	      if (typeof data === 'string') {
	        data = data.replace(/"/g, '""'); // Escape double qoutes
	
	        if (options.quoteStrings || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
	          data = options.txtDelim + data + options.txtDelim;
	        }
	
	        return data;
	      }
	
	      if (typeof data === 'boolean') {
	        return data ? 'TRUE' : 'FALSE';
	      }
	
	      return data;
	    };
	
	    /**
	     * Helper function to check if input is float
	     * @param input
	     * @returns {boolean}
	     */
	    this.isFloat = function (input) {
	      return +input === input && (!isFinite(input) || Boolean(input % 1));
	    };
	
	    /**
	     * Creates a csv from a data array
	     * @param data
	     * @param options
	     *  * header - Provide the first row (optional)
	     *  * fieldSep - Field separator, default: ',',
	     *  * addByteOrderMarker - Add Byte order mark, default(false)
	     * @param callback
	     */
	    this.stringify = function (data, options) {
	      var def = $q.defer();
	
	      var that = this;
	      var csv = "";
	      var csvContent = "";
	
	      var dataPromise = $q.when(data).then(function (responseData) {
	        //responseData = angular.copy(responseData);//moved to row creation
	        // Check if there's a provided header array
	        if (angular.isDefined(options.header) && options.header) {
	          var encodingArray, headerString;
	
	          encodingArray = [];
	          angular.forEach(options.header, function (title, key) {
	            this.push(that.stringifyField(title, options));
	          }, encodingArray);
	
	          headerString = encodingArray.join(options.fieldSep ? options.fieldSep : ",");
	          csvContent += headerString + EOL;
	        }
	
	        var arrData = [];
	
	        if (angular.isArray(responseData)) {
	          arrData = responseData;
	        } else if (angular.isFunction(responseData)) {
	          arrData = responseData();
	        }
	
	        // Check if using keys as labels
	        if (angular.isDefined(options.label) && options.label && typeof options.label === 'boolean') {
	          var labelArray, labelString;
	
	          labelArray = [];
	          angular.forEach(arrData[0], function (value, label) {
	            this.push(that.stringifyField(label, options));
	          }, labelArray);
	          labelString = labelArray.join(options.fieldSep ? options.fieldSep : ",");
	          csvContent += labelString + EOL;
	        }
	
	        angular.forEach(arrData, function (oldRow, index) {
	          var row = angular.copy(arrData[index]);
	          var dataString, infoArray;
	
	          infoArray = [];
	
	          var iterator = !!options.columnOrder ? options.columnOrder : row;
	          angular.forEach(iterator, function (field, key) {
	            var val = !!options.columnOrder ? row[field] : field;
	            this.push(that.stringifyField(val, options));
	          }, infoArray);
	
	          dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
	          csvContent += index < arrData.length ? dataString + EOL : dataString;
	        });
	
	        // Add BOM if needed
	        if (options.addByteOrderMarker) {
	          csv += BOM;
	        }
	
	        // Append the content and resolve.
	        csv += csvContent;
	        def.resolve(csv);
	      });
	
	      if (typeof dataPromise['catch'] === 'function') {
	        dataPromise['catch'](function (err) {
	          def.reject(err);
	        });
	      }
	
	      return def.promise;
	    };
	
	    /**
	     * Helper function to check if input is really a special character
	     * @param input
	     * @returns {boolean}
	     */
	    this.isSpecialChar = function (input) {
	      return specialChars[input] !== undefined;
	    };
	
	    /**
	     * Helper function to get what the special character was supposed to be
	     * since Angular escapes the first backslash
	     * @param input
	     * @returns {special character string}
	     */
	    this.getSpecialChar = function (input) {
	      return specialChars[input];
	    };
	  }]);
	  /**
	   * ng-csv module
	   * Export Javascript's arrays to csv files from the browser
	   *
	   * Author: asafdav - https://github.com/asafdav
	   */
	  angular.module('ngCsv.directives').directive('ngCsv', ['$parse', '$q', 'CSV', '$document', '$timeout', function ($parse, $q, CSV, $document, $timeout) {
	    return {
	      restrict: 'AC',
	      scope: {
	        data: '&ngCsv',
	        filename: '@filename',
	        header: '&csvHeader',
	        columnOrder: '&csvColumnOrder',
	        txtDelim: '@textDelimiter',
	        decimalSep: '@decimalSeparator',
	        quoteStrings: '@quoteStrings',
	        fieldSep: '@fieldSeparator',
	        lazyLoad: '@lazyLoad',
	        addByteOrderMarker: "@addBom",
	        ngClick: '&',
	        charset: '@charset',
	        label: '&csvLabel'
	      },
	      controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
	        $scope.csv = '';
	
	        if (!angular.isDefined($scope.lazyLoad) || $scope.lazyLoad != "true") {
	          if (angular.isArray($scope.data)) {
	            $scope.$watch("data", function (newValue) {
	              $scope.buildCSV();
	            }, true);
	          }
	        }
	
	        $scope.getFilename = function () {
	          return $scope.filename || 'download.csv';
	        };
	
	        function getBuildCsvOptions() {
	          var options = {
	            txtDelim: $scope.txtDelim ? $scope.txtDelim : '"',
	            decimalSep: $scope.decimalSep ? $scope.decimalSep : '.',
	            quoteStrings: $scope.quoteStrings,
	            addByteOrderMarker: $scope.addByteOrderMarker
	          };
	          if (angular.isDefined($attrs.csvHeader)) options.header = $scope.$eval($scope.header);
	          if (angular.isDefined($attrs.csvColumnOrder)) options.columnOrder = $scope.$eval($scope.columnOrder);
	          if (angular.isDefined($attrs.csvLabel)) options.label = $scope.$eval($scope.label);
	
	          options.fieldSep = $scope.fieldSep ? $scope.fieldSep : ",";
	
	          // Replaces any badly formatted special character string with correct special character
	          options.fieldSep = CSV.isSpecialChar(options.fieldSep) ? CSV.getSpecialChar(options.fieldSep) : options.fieldSep;
	
	          return options;
	        }
	
	        /**
	         * Creates the CSV and updates the scope
	         * @returns {*}
	         */
	        $scope.buildCSV = function () {
	          var deferred = $q.defer();
	
	          $element.addClass($attrs.ngCsvLoadingClass || 'ng-csv-loading');
	
	          CSV.stringify($scope.data(), getBuildCsvOptions()).then(function (csv) {
	            $scope.csv = csv;
	            $element.removeClass($attrs.ngCsvLoadingClass || 'ng-csv-loading');
	            deferred.resolve(csv);
	          });
	          $scope.$apply(); // Old angular support
	
	          return deferred.promise;
	        };
	      }],
	      link: function link(scope, element, attrs) {
	        function doClick() {
	          var charset = scope.charset || "utf-8";
	          var blob = new Blob([scope.csv], {
	            type: "text/csv;charset=" + charset + ";"
	          });
	
	          if (window.navigator.msSaveOrOpenBlob) {
	            navigator.msSaveBlob(blob, scope.getFilename());
	          } else {
	
	            var downloadContainer = angular.element('<div data-tap-disabled="true"><a></a></div>');
	            var downloadLink = angular.element(downloadContainer.children()[0]);
	            downloadLink.attr('href', window.URL.createObjectURL(blob));
	            downloadLink.attr('download', scope.getFilename());
	            downloadLink.attr('target', '_blank');
	
	            $document.find('body').append(downloadContainer);
	            $timeout(function () {
	              downloadLink[0].click();
	              downloadLink.remove();
	            }, null);
	          }
	        }
	
	        element.bind('click', function (e) {
	          scope.buildCSV().then(function (csv) {
	            doClick();
	          });
	          scope.$apply();
	        });
	      }
	    };
	  }]);
	})(window, document);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "401d815dc206b8dc1b17cd0e37695975.png";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "44a526eed258222515aa21eaffd14a96.png";

/***/ })
/******/ ]);
//# sourceMappingURL=app-5207d00f7a2aa2e3e5a9.js.map