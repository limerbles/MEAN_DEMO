function AppCtrl($scope, $http){
    console.log("hello from controller")

    var refresh= ()=>{
        $http.get('/list').success((response)=>{
            console.log("Update info from server")
            $scope.list= response;
            $scope.contact= ""
        })
    
    }
    refresh()
    
    $scope.addContact= ()=>{
        $http.post('/list', $scope.contact).success(()=>{
        refresh()
        })
    }

    $scope.removeContact= (id)=>{
        $http.delete('/list/'+id).success(()=>{
            refresh()
        })
    }

    $scope.editContact= (id)=>{
        $http.get('/list/'+id).success((response)=>{
            $scope.contact= response
        })
    }

    $scope.updateContact= ()=>{
        $http.put('/list/'+  $scope.contact._id, $scope.contact).success(()=>{
            refresh()
        })
    }

    $scope.clear= ()=>{
        $scope.contact=""
    }
}