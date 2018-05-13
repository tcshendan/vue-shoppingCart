var vm = new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
        selectedProduct: [],
        checkAllFlag: false
    },
    filters: {
        formatMoney: function(value) {
            return '¥' + value.toFixed(2);
        }
    },
    mounted: function() {
        this.cartView();
    },
    methods: {
        cartView: function() {
            var _this = this;
            this.$http.get('data/cartData.json').then(function(res) {
                _this.totalMoney = res.body.result.totalMoney;
                _this.productList = res.body.result.list;
            });
        },
        changeMoney: function(product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
        },
        selectProduct: function(item) {
            var len = this.productList.length;
            if (typeof item.checked == 'undefined') {
                //Vue.set(item, 'checked', true);
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            if (item.checked) {
                this.selectedProduct.push(item);
            } else {
                this.selectedProduct.splice(this.selectedProduct.indexOf(item), 1);
            }
            if (this.selectedProduct.length === len) {
                this.checkAllFlag = true;
            } else {
                this.checkAllFlag = false;
            }
        },
        checkAll: function(flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, 'checked', _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
        }
    }
});
