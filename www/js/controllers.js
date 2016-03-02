angular.module('wechat.controllers', [])

.controller('findCtrl', function($scope, $state) {
    $scope.onSwipeLeft = function() {
        $state.go("tab.setting");
    };
    $scope.onSwipeRight = function() {
        $state.go("tab.friends");
    };
})

.controller('messageCtrl', function($scope, $state, $ionicPopup, localStorageService, messageService) {
    
    // $scope.messages = messageService.getAllMessages();
    // console.log($scope.messages);
    $scope.onSwipeLeft = function() {
        $state.go("tab.friends");
    };
    $scope.popupMessageOpthins = function(message) {
        $scope.popup.index = $scope.messages.indexOf(message);
        $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/popup.html",
            scope: $scope,
        });
        $scope.popup.isPopup = true;
    };
    $scope.markMessage = function() {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        if (message.showHints) {
            message.showHints = false;
            message.noReadMessages = 0;
        } else {
            message.showHints = true;
            message.noReadMessages = 1;
        }
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.updateMessage(message);
    };
    $scope.deleteMessage = function() {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        $scope.messages.splice(index, 1);
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.deleteMessageId(message.id);
        messageService.clearMessage(message);
    };
    $scope.topMessage = function() {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        if (message.isTop) {
            message.isTop = 0;
        } else {
            message.isTop = new Date().getTime();
        }
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.updateMessage(message);
    };
    $scope.messageDetils = function(message) {
        $state.go("messageDetail", {
            "messageId": message.id
        });
    };
    $scope.$on("$ionicView.beforeEnter", function(){
        // console.log($scope.messages);
        $scope.messages = messageService.getAllMessages();
        $scope.popup = {
            isPopup: false,
            index: 0
        };
    });

})

// 首页点击
.controller('openCtrl', function($scope, $timeout, $state) {
    // $timeout(function() {    //默认让它5秒后跳转到主页面
    //     $state.go("tab.message");
    // }, 5000);

    $scope.openMain = function() {
        $state.go("register");
    };
})
// 阅读全文
.controller('rulerCtrl', function($scope, $timeout, $state) {
    console.log("1111");
})
// 注册
.controller('registerCtrl', function($scope, $timeout, $state) {
    $scope.yqm = true;
    $scope.avtive = true;
    $scope.smsCodeBtn = '发送验证码';

    var codeCount = function(){
        var num = 60,str = "$1s后重发";
        $scope.smsCodeBtn = str.replace('\$1', num);
        time = setInterval(function () {
            if (0 === num) {
                clearInterval(time);
                $scope.avtive = true;
                $scope.$apply(function(){
                    $scope.smsCodeBtn = unescape('%u91CD%u65B0%u83B7%u53D6');
                });
                return;
            }
            $scope.avtive = false;
            $scope.$apply(function(){
                $scope.smsCodeBtn = str.replace('\$1', --num);
            });
        }, 1000);
    };

    //获取短信验证码按钮
    $scope.getSmsCode = function(){
        if (!$scope.avtive) {
            return;
        }
        codeCount();
    }

    $scope.registerNow = function(){
        $state.go("registerFast");
    }

    $scope.yqmShow = function() {
        if($scope.yqm){
            $scope.yqm = false;
        }else{
            $scope.yqm = true;
        }
    }
    
})

// 极速注册
.controller('registerFastCtrl', function($scope, $timeout, $state) {

    $scope.joinInNow = function(){
        $state.go("check");
    }
    
})

// 审核
.controller('checkCtrl', function($scope, $timeout, $state) {
    $scope.checkOk = function(){
        $state.go("tab.message");
    }
    
})

.controller('friendsCtrl', function($scope, $state) {
    $scope.onSwipeLeft = function() {
        $state.go("tab.find");
    };
    $scope.onSwipeRight = function() {
        $state.go("tab.message");
    };
    $scope.contacts_right_bar_swipe = function(e){
        console.log(e);
    };
})

.controller('orderCtrl', function($scope, $state) {
    $scope.onSwipeRight = function() {
        $state.go("tab.bbs");
    };
})
.controller('bbsCtrl', function($scope, $state) {
    $scope.onSwipeLeft = function() {
        $state.go("tab.order");
    };
    $scope.onSwipeRight = function() {
        $state.go("tab.setting");
    };
})

.controller('settingCtrl', function($scope, $state) {
    $scope.onSwipeRight = function() {
        $state.go("tab.bbs");
    };
})

.controller('messageDetailCtrl', ['$scope', '$stateParams',
    'messageService', '$ionicScrollDelegate', '$timeout',
    function($scope, $stateParams, messageService, $ionicScrollDelegate, $timeout) {
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
        // console.log("enter");
        $scope.doRefresh = function() {
            // console.log("ok");
            $scope.messageNum += 5;
            $timeout(function() {
                $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                    $stateParams.messageId);
                $scope.$broadcast('scroll.refreshComplete');
            }, 200);
        };

        $scope.$on("$ionicView.beforeEnter", function() {
            $scope.message = messageService.getMessageById($stateParams.messageId);
            $scope.message.noReadMessages = 0;
            $scope.message.showHints = false;
            messageService.updateMessage($scope.message);
            $scope.messageNum = 10;
            $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                $stateParams.messageId);
            $timeout(function() {
                viewScroll.scrollBottom();
            }, 0);
        });

        window.addEventListener("native.keyboardshow", function(e){
            viewScroll.scrollBottom();
        });
    }
])
