myApp.controller("assignmentController", function ($scope, $http) {
  $scope.message = "Assignment demo";
  $scope.currency = "INR";
  $scope.isINRview = true;
  $scope.products = [];
  $scope.initializeProduct = () => {
    $scope.changePrice();
    $scope.products.push(
      new Product(
        "https://images-na.ssl-images-amazon.com/images/I/61utX8kBDlL._UY575_.jpg",
        500.0,
        "Shoes"
      )
    );
    $scope.products.push(
      new Product(
        "https://images-na.ssl-images-amazon.com/images/I/91cjHJE3JDL._SL1500_.jpg",
        700.0,
        "Backpack"
      )
    );
    $scope.products.push(
      new Product(
        "https://www.thejewelleryeditor.com/media/images_thumbnails/filer_public_thumbnails/old/48947/WatchesandFastCars004.jpg__1536x0_q75_crop-scale_subsampling-2_upscale-false.jpg",
        1000.0,
        "Watch"
      )
    );
  };

  $scope.changePrice = () => {
    if ($scope.currency == "USD" && $scope.isINRview == true) {
      $http
        .get("https://api.exchangeratesapi.io/latest?base=INR")
        .then((response) => {
          var usd_rates = response.data.rates.USD;
          $scope.updateProducts(usd_rates);
          $scope.isINRview = false;
        });
    } else if ($scope.currency == "INR" && $scope.isINRview == false) {
      $http
        .get("https://api.exchangeratesapi.io/latest?base=USD")
        .then((response) => {
          var inr_rates = response.data.rates.INR;
          $scope.updateProducts(inr_rates);
        });
    }
  };

  $scope.updateProducts = (rates) => {
    $scope.products.map((p) => {
      p.cost *= rates;
    });
  };
});

class Product {
  constructor(imgSrc, costInRupees, name) {
    this.imgSrc = imgSrc;
    this.name = name;
    this.cost = costInRupees;
  }
}
