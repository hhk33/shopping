<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>

      <div
        class="address clearFix"
        v-for="address in userAddressList"
        :key="address.id"
        @click="changeDefault(address, userAddressList)"
      >
        <span
          class="username"
          :class="{ selected: address.isDefault == '1' }"
          >{{ address.consignee }}</span
        >
        <p>
          <span class="s1">{{ address.fullAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-show="address.isDefault == '1'">默认地址</span>
        </p>
      </div>

      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="sku in trade.detailArrayList"
          :key="sku.skuId"
        >
          <img :src="sku.imgUrl" />
          <li>
            <p>{{ sku.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ sku.orderPrice }}</h3>
          </li>
          <li style="padding-top: 20px">X{{ sku.skuNum }}</li>
          <li style="padding-top: 20px">有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="message"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ trade.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ trade.totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="contain">
        <div class="price">
          应付金额: <span>¥{{ trade.totalAmount }}</span>
        </div>
        <div class="receiveInfo">
          寄送至:
          <span>{{ userDefaultAddress.fullAddress }}</span>
          收货人：<span>{{ userDefaultAddress.consignee }}</span>
          <span>{{ userDefaultAddress.phoneNum }}</span>
        </div>
      </div>
      <a class="subBtn" @click="postOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqSubmitOrder } from "@/api";

export default {
  name: "Trade",
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState("trade", ["userAddressList", "trade"]),
    userDefaultAddress() {
      return this.userAddressList.find((item) => item.isDefault == "1") || {};
    },
  },
  methods: {
    changeDefault(address, addressList) {
      addressList.forEach((element) => {
        element.isDefault = "0";
      });
      address.isDefault = "1";
    },
    async postOrder() {
      let tradeNo = this.trade.tradeNo;
      let data = {
        consignee: this.userDefaultAddress.consignee,
        consigneeTel: this.userDefaultAddress.phoneNum,
        deliveryAddress: this.userDefaultAddress.fullAddress,
        paymentWay: "ONLINE",
        orderComment: this.message,
        orderDetailList: this.trade.detailArrayList,
      };
      let res = await reqSubmitOrder(tradeNo, data);
      console.log(res);
      if (res.code == 200) {
        this.$router.push(`/pay?orderId=${res.data}`);
      } else {
        alert(res.message);
      }
    },
  },
  mounted() {
    this.$store.dispatch("trade/findUserAddressList");
    this.$store.dispatch("trade/findTrade");
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding: 0 20px;
      margin: 20px;

      .username {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
        display: inline-block;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        display: inline-block;
        margin-left: 20px;

        .s2 {
          margin: 0 5px;
        }

        .s3 {
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
        img {
          width: 10%;
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    height: 120px;
    margin: 20px auto;

    ul {
      width: 350px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    .contain {
      float: left;
      width: 1000px;
    }

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }

    .subBtn {
      display: inline-block;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>