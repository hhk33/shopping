<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveShow" @mouseenter="enterShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <!-- 事件委托 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="c1 in categoryList"
              :key="c1.categoryId"
              @mouseenter="changeIndex(c1.categoryId)"
              :class="{ hightLight: currentIndex === c1.categoryId }"
            >
              <h3>
                <!-- 一级目录 添加自定义属性 data-categoryName data-category1Id-->
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{
                  display: currentIndex == c1.categoryId ? 'block' : 'none',
                }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <!-- 二级目录 添加自定义属性 data-categoryName data-category2Id-->
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- 二级目录 添加自定义属性 data-categoryName data-category2Id-->
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                        >
                          {{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
      path: "",
    };
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    // 节流 当前展示目录
    changeIndex: _.throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    enterShow() {
      if (this.path != "/home") {
        this.show = true;
      }
    },

    leaveShow() {
      this.currentIndex = -1;
      if (this.path != "/home") {
        this.show = false;
      }
    },
    //点击三级联动选项，跳转Search
    goSearch(event) {
      // 编程式导航 + 事件委托,event获取事件对象
      let element = event.target;
      // 通过dataset寻找自定义属性（data—前缀）
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      let location = { name: "Search" };
      let query = { categoryName: categoryname };
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
  },
  mounted() {
    //判断当前路由路径，决定显示与否
    this.path = this.$route.path;
    if (this.path != "/home") {
      this.show = false;
    }
  },
};
</script>

<style  lang='less' scoped>
a {
  text-decoration: none;
}

.type-nav {
  border-bottom: 2px solid #e1251b;
  margin-top: -50px;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      margin-bottom: 0px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 25px;
        line-height: 55px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 55px;
      width: 210px;
      height: 461px;
      margin-top: 4.5px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            font-size: 10px;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }

    .sort-enter {
      height: 0px;
      opacity: 0;
    }

    .sort-enter-to {
      height: 461px;
      opacity: 1;
    }

    .sort-enter-active {
      transition: all 0.2s linear;
    }
  }
}

.hightLight {
  background-color: skyblue;
}
</style>
