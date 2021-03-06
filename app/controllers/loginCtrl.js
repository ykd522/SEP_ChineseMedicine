scotchApp.controller('loginController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $localStorage) {
        console.log("loginController");
        if($rootScope.currentUserSignedIn == true){
            console.log("test");
            $location.path('/');
        }
        $scope.userName = "";
        $scope.password = "";
        
        
        $scope.doLogin = function () {

            
                
            

            dataFactory.login($scope.userName, $scope.password).then(function (response) {
                
                
                // $scope.message = response.data.Status;
                console.log(response.data)
                /*
                window.localStorage['currentUser'] = {
                    "token" : response.data['token'],
                    "username" : response.data['username'],
                    "permission" : response.data['permission'], 
                    "userID" : response.data['userID']
                }
                */
                window.localStorage['currentUsername'] = response.data['username'];
                window.localStorage['currentUserID'] = response.data['userID'];
                window.localStorage['currentToken'] = response.data['token'];
                window.localStorage['currentPermission'] = response.data['permission'];
                $rootScope.permission = window.localStorage['currentPermission'];
                $rootScope.username = window.localStorage['currentUsername'];
                //$cookies.put("AuthorizationHeader", true, null);
                $http.defaults.headers.common.Authorization = 'JWT ' + response.data['token'];
                
                $rootScope.currentUserSignedIn = true;
                if (window.localStorage['currentPermission'] == 1)
                {
                    dataFactory.getUsersCount().then(function (response) {
            
                        window.localStorage['usersCount'] = response.data;
                        $rootScope.userCount = window.localStorage['usersCount'];

                    })
                }
                $location.path('/');
                
            }, function (error) {
                $scope.message = "Invalid Username or Password";
            });

        };



    }]);