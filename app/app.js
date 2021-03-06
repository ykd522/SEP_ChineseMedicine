// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngCookies', 'ui.router', 'angularBootstrapNavTree', 'ngStorage', 'ngPassword', 'ui.bootstrap', 'ngFileUpload']);

scotchApp.config(function ($stateProvider, $urlRouterProvider) {
    // $stateProvider.state({
    //     name: 'home',
    //     url: '/',
    //     cache: false,
    //     templateUrl: 'pages/home.html',
    //     controller: 'homeController'
    // });
    $stateProvider.state({
        name: 'about',
        url: '/about',
        cache: false,
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    });
    $stateProvider.state({
        name: 'contact',
        url: '/contact',
        cache: false,
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    });
    $stateProvider.state({
        name: 'login',
        url: '/login',
        cache: false,
        templateUrl: 'pages/login.html',
        controller: 'loginController'
    });
    $stateProvider.state({
        name: 'users',
        url: '/users',
        cache: false,
        templateUrl: 'pages/users.html',
        controller: 'userController'
    });
    $stateProvider.state({
        name: 'currentUsers',
        url: '/currentUsers',
        cache: false,
        templateUrl: 'pages/currentUsers.html',
        controller: 'currentUsersController'
    });
	$stateProvider.state({
        name: 'register',
        url: '/register',
        cache: false,
        templateUrl: 'pages/register.html',
        controller: 'registerController'
    });
    $stateProvider.state({
        name: 'forgetPassword',
        url: '/forgetPassword',
        cache: false,
        templateUrl: 'pages/forgetPassword.html',
        controller: 'forgetPasswordController'
    });
	$stateProvider.state({
        name: 'changePassword',
        url: '/changePassword',
        cache: false,
        templateUrl: 'pages/changePassword.html',
        controller: 'changePasswordController'
    });
	$stateProvider.state({
        name: 'upload',
        url: '/upload',
        cache: false,
        templateUrl: 'pages/upload.html',
        controller: 'uploadController'
    });
    $stateProvider.state({
        name: 'search',
        url: '/',
        cache: false,
        templateUrl: 'pages/search.html',
        controller: 'searchController'
    });

    //shiftDetail page
    
    $stateProvider.state({
        name: 'fileDetails',
        url: '/fileDetails',
        cache: false,
        templateUrl: 'pages/fileDetails.html',
        controller: 'fileDetailsController'
    });
    $stateProvider.state({
        name: 'userAdd',
        url: '/userAdd',
        cache: false,
        templateUrl: 'pages/userAdd.html',
        controller: 'userAddController'
    });
    $stateProvider.state({
        name: 'edit',
        url: '/edit',
        cache: false,
        templateUrl: 'pages/edit.html',
        controller: 'editController'
    });
    $stateProvider.state({
        name: 'advancedSearch',
        url: '/advancedSearch',
        cache: false,
        templateUrl: 'pages/advancedSearch.html',
        controller: 'advancedSearchController'
    });
    
    $stateProvider.state({
        name: 'logs',
        url: '/logs',
        cache: false,
        templateUrl: 'pages/logs.html',
        controller: 'logsController'
    });
    
    $stateProvider.state({
        name: 'emailset',
        url: '/emailset',
        cache: false,
        templateUrl: 'pages/emailCustom.html',
        controller: 'emailCustomController'
    });
    
    // if none of the above states are matched, returned to search page
    $urlRouterProvider.otherwise('/');
});

scotchApp.run(function ($rootScope, $http, $cookies, $httpBackend, $localStorage, $location, dataFactory) {
    
    
    
    // keep user logged in after page refresh
    if (localStorage['currentUsername']) {

    

        $rootScope.currentUserSignedIn = true;

        $http.defaults.headers.common.Authorization = 'JWT ' + window.localStorage['currentToken'];
        $rootScope.permission = window.localStorage['currentPermission'];
        $rootScope.username = window.localStorage['currentUsername'];
        $rootScope.userCount = window.localStorage['usersCount'];
        $rootScope.files = JSON.parse(localStorage.getItem("files"));

        
    }
    
    console.log($rootScope.files);
    // redirect to login page if not logged in and trying to access a restricted page
    // $rootScope.$on('$locationChangeStart', function (event, next, current) {
        
    //     var publicPages = ['/login'];
    //     var restrictedPage = publicPages.indexOf($location.path()) === -1;
        
    //     if (restrictedPage && !window.localStorage['currentUsername']) {
    //         console.log('test');


    //         $location.path('/login');
    //         window.location.reload();
    //         //window.location.reload();
    //         //$route.reload();
    //     }
    // });



    console.log("App run");
    $rootScope.hasVisitedAboutPage = false;

    

    //Logout function and remove user from local storage and clear http auth header
    $rootScope.doLogout = function () {
        console.log('Logout function');
        delete window.localStorage['currentUsername'];
        delete window.localStorage['currentUserID'];
        delete window.localStorage['currentToken'];
        delete window.localStorage['currentPermission'];
        delete window.localStorage['key'];
        delete window.localStorage['word'];
        delete window.localStorage['files'];
        delete window.localStorage['usersCount'];
        delete window.localStorage['currfiles'];
        delete window.localStorage['currchoices'];
        delete window.localStorage['searchType'];
        delete window.localStorage['searchKeyword'];
        console.log($rootScope);
        $http.defaults.headers.common.Authorization = '';
        $rootScope.currentUserSignedIn = false;
        $rootScope.permission = '';
    };



    console.log($rootScope);
});


scotchApp.filter('startFrom', function(){
    return function(data, start){
        
        if (data)
        {
            return data.slice(start);
        }
        
    }
});

scotchApp.filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    });


scotchApp.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
