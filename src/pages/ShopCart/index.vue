<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(item, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @click="updateChecked(item.skuId, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="number"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @click="handler('change', $event.target.value * 1, item)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteSku(item.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @click="updateAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash";

export default {
  name: "ShopCart",
  computed: {
    ...mapGetters("shopCart", ["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //商品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((element) => {
        sum += element.skuPrice * element.skuNum;
      });
      return sum;
    },
    //是否全部商品都是选中状态
    isAllChecked() {
      return (
        this.cartInfoList.every((item) => item.isChecked == 1) &&
        this.cartInfoList.length > 0
      );
    },
  },
  methods: {
    //商品个数改变  节流
    handler: _.throttle(async function (type, num, cart) {
      let disNum = 0;
      if (type == "add") {
        disNum = num;
      } else if (type == "minus") {
        disNum = cart.skuNum <= 1 ? 0 : num;
      } else if (type == "change") {
        if (isNaN(num) || num < 1) disNum = 0;
        else disNum = parseInt(num) - cart.skuNum;
      }
      try {
        await this.$store.dispatch("detail/updateShopCar", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.$store.dispatch("shopCart/getCartList");
      } catch (error) {}
    }, 200),
    //删除指定商品
    async deleteSku(skuId) {
      try {
        await this.$store.dispatch("shopCart/deleteCartById", skuId);
        this.$store.dispatch("shopCart/getCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    //更新商品选中状态
    async updateChecked(id, isChecked) {
      let checkedNum = isChecked ? 1 : 0;
      try {
        await this.$store.dispatch("shopCart/changeChecked", {
          skuId: id,
          isChecked: checkedNum,
        });
        this.$store.dispatch("shopCart/getCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    //删除所有选中的商品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("shopCart/deleteAllChecked");
        this.$store.dispatch("shopCart/getCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    //全选 全不选
    async updateAllChecked(event) {
      if (this.cartInfoList.length() > 0) {
        let checked = event.target.checked ? "1" : "0";
        try {
          await this.$store.dispatch("shopCart/updateAllChecked", checked);
          this.$store.dispatch("shopCart/getCartList");
        } catch (error) {
          alert(error.message);
        }
      }
    },
    goTrade() {
      this.$router.push("/trade");
    },
  },
  mounted() {
    this.$store.dispatch("shopCart/getCartList");
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 35px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>