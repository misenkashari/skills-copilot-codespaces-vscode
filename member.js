function skillsMember(){
    return {
        name: 'skillsMember',
        templateUrl: 'app/components/member/skillsMember.html',
        restrict: 'E',
        controller: 'MemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    }
}