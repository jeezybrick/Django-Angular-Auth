/**
 * Created by user on 05.10.15.
 */

angular
    .module('myApp')
    .controller('HomeController', HomeController);

function HomeController($scope, $log, $location, djangoAuth) {

    $scope.ff = 'qqqqqqqqqqq';
    var vm = this;
    vm.authenticated = false;
    vm.sendMessage = sendMessage;
    vm.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'right'
    };



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
    .controller('UserProfileController', UserProfileController);

function UserProfileController($scope, djangoAuth, Validate) {

    var vm = this;
    vm.authenticated = false;
    vm.complete = false;
    vm.model = {'first_name':'','last_name':'','email':''};


    // Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(function () {
        vm.authenticated = true;
    }, function () {
        vm.authenticated = false;
    });

  	djangoAuth.profile().then(function(data){
  		vm.model = data;
  	});

    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.updateProfile(model)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.error = data;
        });
      }
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
    .controller('AuthController', AuthController);

function AuthController($scope, $location, Flash, djangoAuth) {

    $scope.title = 'login';
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
                $location.path('/main');

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
    $scope.complete = false;
    $scope.title = 'sign up';

    $scope.user = {
        username : undefined,
        password1: undefined,
        password2: undefined,
        email: undefined
    };

    $scope.sendRegisterData = function () {
        $scope.successPath = '/login';
        djangoAuth.register($scope.user.username, $scope.user.password1, $scope.user.password2,$scope.user.email)
            .then(function(data){
                // success case
                $scope.complete = true;
                $location.path($scope.successPath);
            },function(data){
                // error case
                $scope.errors = data;
                Flash.create('danger', $scope.errors, 'flash-message');
            });
    };

}

angular
    .module('myApp')
    .controller('PasswordChangeController', PasswordChangeController);

function PasswordChangeController($scope, djangoAuth, Validate) {

    // Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(function () {
        $scope.authenticated = true;
    }, function () {
        $scope.authenticated = false;

    });

    $scope.model = {'new_password1':'','new_password2':''};
  	$scope.complete = false;
    $scope.changePassword = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.changePassword($scope.model.new_password1, $scope.model.new_password2)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
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

