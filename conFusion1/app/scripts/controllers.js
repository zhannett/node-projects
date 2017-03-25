/**
 * Created by janetkulyk on 2017-02-23.
 */
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        'use strict';
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.select =  function (setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = 'appetizer';
            } else if (setTab === 3) {
                $scope.filtText = 'mains';
            } else if (setTab === 4) {
                $scope.filtText = 'dessert';
            } else {
                $scope.filtText = '';
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        $scope.showDetails = false;
        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };

        $scope.dishes = menuFactory.getDishes();
    }])
    .controller('ContactController', ['$scope', function ($scope) {
        'use strict';
        var channels = [
            {
                value: "tel",
                label: "Tel."
            },
            {
                value: "Email",
                label: "Email"
            }
        ];
        $scope.feedback = {
            mychannel: '',
            firstName: '',
            lastName: '',
            agree: false,
            emailid: ''
        };
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])
    .controller('FeedbackController', ['$scope', function ($scope) {
        'use strict';
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === '') && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: '',
                    firstName: '',
                    lastName: '',
                    agree: false,
                    email: ''};
                $scope.feedback.mychannel = '';
                $scope.feedbackForm.$setPristine();
                console.log('correct ' + $scope.feedback);
            }
        };
    }])
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        'use strict';

        var dish = menuFactory.getDish(parseInt($stateParams.id, 10));
        $scope.dish = dish;

    }])
    .controller('DishCommentController', ['$scope', function($scope) {
        'use strict';
       // $scope.stars = {};
        //$scope.stars.value = '5 stars';

        $scope.myComment = {rating: 5, comment: '', author: '', date: ''};
        $scope.submitComment = function() {
            var myCommentDateDate = new Date();
            $scope.dish.comments.push ({
                rating: parseInt($scope.stars.value),
                comment: $scope.comment.comments,
                author: $scope.comment.name,
                date: myCommentDateDate.toISOString()
            });
            $scope.comment.name = '';
            $scope.comment.comments = '';
            $scope.stars.value = '5 stars';
            $scope.commentForm.$setPristine();
            $scope.stars.checked =  [false, false, false, false, true];

            console.log($scope.dish.comments);
        };
    }]);
