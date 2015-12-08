/**
 * Created by user on 05.10.15.
 */

angular
    .module('myApp')
    .controller('HomeController', HomeController);

function HomeController($scope, $log, $location, djangoAuth) {

    $scope.ff = 'qqqqqqqqqqq';
    var vm = this;
    vm.name = {};
    vm.test = 'ddddddddddddddddddddd';
    vm.sendMessage = sendMessage;
    vm.authenticated = false;


    // Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(function () {
        vm.authenticated = true;
    }, function () {
        vm.authenticated = false;
        $log.info($scope.authenticated);
        $location.path('/login');
    });


    function sendMessage() {

        $log.info('function work');

    }


}


angular
    .module('myApp')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $http, $location, $timeout, Flash, AuthUser) {

    $scope.page = '/api/user/';
    $scope.loginProcess = false;
    $scope.title = 'Login';

    $scope.user = AuthUser.query(function (response) {

        if (angular.equals(response.is_auth, false)) {
            //
        } else {
            $location.path('/');
        }

    }, function () {

        $location.path('/');

    });

    // send user's name and mem_id
    $scope.sendLoginData = function () {
        $scope.loginProcess = true;

        $http.post($scope.page, $scope.user).success(function (response) {

            Flash.create('success', response, 'flash-message');
            $scope.delay = $timeout(function () {

                $location.path('/');

            }, 1000);


        }).error(function (error) {

            $scope.sendLoginDataError = error;
            Flash.create('danger', error, 'flash-message');
            $scope.loginProcess = false;
        });
    };


}


angular
    .module('myApp')
    .controller('BookingsController', BookingsController);

function BookingsController($scope, $location, Flash, MyBookings, AuthUser) {

    var date = new Date();
    $scope.isUserAuth = false;
    $scope.currentDate = moment(date).format('MMMM ' + 'YYYY');
    $scope.ordersLoad = false;
    $scope.deleteOrderModalQuestion = "Do you wan't to delete this order?";
    $scope.dateNow = moment(date).format('MMMM YYYY');

    $scope.user = AuthUser.query(function (response) {

        if (angular.equals(response.is_auth, false)) {
            $location.path('/login/');
        } else {
            $scope.isUserAuth = true;
        }

        $scope.bookings = MyBookings.query(function () {

            $scope.ordersLoad = true;

        }, function () {
            $scope.bookingsLoadError = true;
        });


    }, function () {

        $location.path('/');

    });

    //remove order form user's list
    $scope.removeOrder = function (index) {


        MyBookings.delete({id: $scope.bookings[index].id}, function () {

            $scope.bookings.splice(index, 1);

        }, function (error) {

            $scope.defaultError = error.data;
            $scope.detailError = error.data.detail;
            Flash.create('danger', $scope.detailError || $scope.defaultError, 'flash-message');
        });


    };


}

angular
    .module('myApp')
    .controller('AuthController', AuthController);

function AuthController($scope, $location, Flash, djangoAuth) {

    $scope.title = 'signup';
    $scope.loginProcess = false;
    $scope.errorLoginMessage = 'Incorrect username or password.';

    $scope.user = {
        username : undefined,
        password: undefined
    };

    $scope.sendLoginData = function () {
        $scope.loginProcess = true;
        djangoAuth.login($scope.user.username, $scope.user.password)
            .then(function(data){
                $scope.loginProcess = false;
                $location.path('/');

            },function(error){
                // error case
                $scope.loginProcess = false;
                $scope.sendLoginDataError = error;
                Flash.create('danger', $scope.errorLoginMessage, 'flash-message');
            });


    };
}

angular
    .module('myApp')
    .controller('RegistrationController', RegistrationController);

function RegistrationController($scope, $http, $location, $window, Flash, djangoAuth) {

    $scope.page = '/rest-auth/registration/';
    $scope.errorRegisterMessage = 'Incorrect username or password.';

    $scope.user = {
        username : undefined,
        password1: undefined,
        password2: undefined,
        email: undefined
    };


    $scope.sendRegisterData = function () {

        $http.post($scope.page, $scope.user).success(function () {

            //$location.path('/');
            //$window.location.href = '/';

        }).error(function (error) {

            $scope.sendRegisterDataError = error;
            Flash.create('danger', $scope.errorRegisterMessage, 'flash-message');
        });
    };

/*

    $scope.sendRegisterData = function () {
        djangoAuth.register($scope.user)
            .then(function(data){
                // success case
                $scope.complete = true;
            },function(data){
                // error case
                $scope.errors = data;
                Flash.create('danger', $scope.errors, 'flash-message');
            });
    };
*/
}


angular
    .module('myApp')
    .controller('LogoutController', LogoutController);

function LogoutController(djangoAuth, $location, $window) {

    djangoAuth.logout();
    //$location.path('/');
    $window.location.href = '/';
}


angular
    .module('myApp')
    .controller('PageController', PageController);

function PageController($scope) {

    $scope.pageLoad = false;

    angular.element(document).ready(function () {
        $scope.pageLoad = true;
    });

}


angular
    .module('myApp')
    .controller('ModalController', ModalController);

function ModalController($scope, $mdDialog, makeOrderModalQuestion, order) {
    $scope.makeOrderModalQuestion = makeOrderModalQuestion;
    $scope.order = order;

    $scope.approveDialog = function () {
        $mdDialog.hide(order);
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}

