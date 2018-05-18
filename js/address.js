new Vue({
  el: '.container',
  data: {
    limitNumber: 3,
    addressList: [],
    currentIndex: 0,
    shippingMethod: 1
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddressList();
    });
  },
  computed: {
    filterAddress: function() {
      return this.addressList.slice(0, this.limitNumber);
    }
  },
  methods: {
    getAddressList: function() {
      var _this = this;
      this.$http.get('data/address.json').then(function(response) {
        var res = response.body;
        if (res.status == 0) {
          _this.addressList = res.result;
        }
      });
    },
    setDefault: function(addressId) {
      this.addressList.forEach(function(item, index) {
        if(item.addressId === addressId) {
          item.isDefault = true;
        } else {
          item.isDefault = false;
        }
      });
    }
  }
});
