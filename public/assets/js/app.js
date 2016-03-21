angular.module('budgetApp', [])
  .controller('buySellController', function($http) {
    var buySell = this;
    buySell.item = 0;
    buySell.expenseTotal = 0;

    buySell.login = function() {
      console.log(buySell.username);
      buySell.loggedIn = true;

      $http({
        method: 'POST',
        url: '/user',
        data: {username:buySell.username}
      }).then(function(result) {
        console.log(result.data);
        buySell.userId = result.data._id;
        buySell.username = result.data.username;
        buySell.item = result.data.item;
        buySell.expenses = result.data.expenses;
        buySell.calculate();
      });
    };

    buySell.updateitem = function() {
      $http({
        method: 'POST',
        url: '/updateitem/' + buySell.userId,
        data: {item:buySell.item}
      }).then(function(result) {
        buySell.item = result.data.item;
        buySell.calculate();

        alert('item saved to DB');
      });
    };

    buySell.addExpense = function() {
      $http({
        method: 'POST',
        url: '/newitem/' + buySell.userId,
        data: {
          amount:buySell.item.amount,
          name: buySell.item.name
        }
      }).then(function(result) {
        buySell.login();
      });
    };

    buySell.calculate = function(){
      var itemTotal = 0;
      angular.forEach(buySell.itemLeft, function (eachOne){
        itemTotal += eachOne.amount;
      });
      //buySell.monthlySalary = buySell.salary/12;
      buySell.itemLeft =  buySell. - itemTotal;
    };

    buySell.deleteitem = function(itemId){
      $http({
        method: 'GET',
        url: '/deleteitem/' + itemId
      }).then(function(result) {
        buySell.login();
      });
    };



  });