angular.module('wechat.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('open', {
            url: '/open',
            templateUrl: 'templates/open.html',
            controller: "openCtrl"
        })
        .state('ruler', {
            url: '/ruler',
            templateUrl: 'templates/user/ruler.html',
            controller: "rulerCtrl"
        })
        .state('check', {
            url: '/check',
            templateUrl: 'templates/user/check.html',
            controller: "checkCtrl"
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/user/register.html',
            controller: "registerCtrl"
        })
        .state('registerFast', {
            url: '/registerFast',
            templateUrl: 'templates/user/fast-register.html',
            controller: "registerFastCtrl"
        })
        .state("tab", {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html",
        })
        .state('tab.order', {
            url: '/order',
            views: {
                'tab-order': {
                    templateUrl: 'templates/tab-order.html',
                    controller: "orderCtrl"
                }
            }
        })
        .state('tab.bbs', {
            url: '/bbs',
            views: {
                'tab-bbs': {
                    templateUrl: 'templates/tab-bbs.html',
                    controller: "bbsCtrl"
                }
            }
        })
        .state('tab.message', {
            url: '/message',
            views: {
                'tab-message': {
                    templateUrl: 'templates/tab-message.html',
                    controller: "messageCtrl"
                }
            }
        })
        .state('messageDetail', {
            url: '/messageDetail/:messageId',
            templateUrl: "templates/message-detail.html",
            controller: "messageDetailCtrl"
        })
        .state('tab.friends', {
            url: '/friends',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/tab-friends.html',
                    controller: "friendsCtrl"
                }
            }
        })
        .state('tab.find', {
            url: '/find',
            views: {
                'tab-find': {
                    templateUrl: 'templates/tab-find.html',
                    controller: "findCtrl"
                }
            },
        })
        .state('tab.setting', {
            url: '/setting',
            views: {
                'tab-setting': {
                    templateUrl: 'templates/tab-setting.html',
                    controller: "settingCtrl"
                }
            }
        });
    $urlRouterProvider.otherwise("/open");
    // $urlRouterProvider.otherwise("/tab/message");
});