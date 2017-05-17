scotchApp.controller('advancedSearchController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 'orderByFilter',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, orderBy) {
         console.log("advancedSearchController");

        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        
        //var orderBy = $filter('orderBy');
        $scope.choices = [{id: 'choice1', key: 'All', word:''}, {id: 'choice2', key: 'All', word:''}];
        currchoices = [];
        $scope.addNewChoice = function() {
            var newItemNo = $scope.choices.length+1;
            $scope.choices.push({'id':'choice'+newItemNo});
        };
            
        $scope.removeChoice = function() {
            var lastItem = $scope.choices.length-1;
            $scope.choices.splice(lastItem);
        };  
        console.log($scope.choices);  
            
        $scope.advancedSearch = function (choices) {
            console.log(choices.length);  
            window.localStorage.searchType = '';
            
            console.log(window.localStorage.searchType);
            // console.log($scope.key);
            for (var i = 0; i < choices.length; i++)
            {
                if (choices[i].key == null || choices[i].key == "")
                {
                    
                    choices[i].key = 'All';
                }
                if (choices[i].word == null)
                {
                    console.log('test');
                    choices[i].word = '';
                }  
            }
            
            
            for (var i = 0; i < choices.length; i++)
            {
                currchoices.push({ 
                    "type" : choices[i].key,
                    "keyword"  : choices[i].word,
                    "search"   : "Or"
                }); 
            }
            console.log(currchoices);
            
            window.localStorage.setItem("currchoices", JSON.stringify(currchoices));
            

            // console.log(key);
            dataFactory.advancedSearch(choices).then(function (response) {
                
                // $scope.message = response.data.Status;
                console.log(response);
                if(response.data.other_list)
                {
                    console.log('tst');
                    $scope.files = response.data.book_list.concat(response.data.other_list);
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                    $location.path('/');
                    
                }
                else if(response.data.book_list)
                {
                    $scope.files = response.data.book_list;
                    console.log(response.data.book_list)
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                    $location.path('/');
                }

               

                
                // $scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });
            

        };

        $scope.andSearch = function (choices) {
            console.log(choices.length); 
            window.localStorage.searchType = '';

            
            
            // console.log($scope.key);
            for (var i = 0; i < choices.length; i++)
            {
                if (choices[i].key == null || choices[i].key == "")
                {
                    
                    choices[i].key = 'All';
                }
                if (choices[i].word == null)
                {
                    console.log('test');
                    choices[i].word = '';
                }  
            }
            console.log(choices['0'].key); 
            
            for (var i = 0; i < choices.length; i++)
            {
                currchoices.push({ 
                    "type" : choices[i].key,
                    "keyword"  : choices[i].word,
                    "search"   : 'And'
                }); 
            }
            window.localStorage.setItem("currchoices", JSON.stringify(currchoices));

            // console.log(key);
            dataFactory.andSearch(choices).then(function (response) {
                
                // $scope.message = response.data.Status;
                console.log(response);
                if(response.data.other_list)
                {
                    console.log('tst');
                    $scope.files = response.data.book_list.concat(response.data.other_list);
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                    $location.path('/');
                    
                }
                else if(response.data.book_list)
                {
                    $scope.files = response.data.book_list;
                    console.log(response.data.book_list)
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                    $location.path('/');
                }

               

                
                // $scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });
            

        };

        

    }]);