<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="postPageNo(pageNo - 1)">
      上一页
    </button>
    <button
      v-if="starePageAndEndPage[0] >= parseInt(continues / 2)"
      @click="postPageNo(1)"
      :class="{ border: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="starePageAndEndPage[0] > parseInt(continues / 2)">···</button>
    <button
      v-for="(page, index) in starePageAndEndPage[1]"
      :key="index"
      v-show="page >= starePageAndEndPage[0]"
      @click="postPageNo(page)"
      :class="{ border: pageNo == page }"
    >
      {{ page }}
    </button>
    <button
      v-if="totalPage - starePageAndEndPage[1] > parseInt(continues / 2) - 1"
    >
      ···
    </button>
    <button
      v-if="totalPage - starePageAndEndPage[1] >= parseInt(continues / 2) - 1"
      @click="postPageNo(totalPag)"
      :class="{ border: pageNo == total }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="postPageNo(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //当前页数,1页显示几条数据,数据总量,连续页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    starePageAndEndPage() {
      const { totalPage, continues, pageNo } = this;
      let start = pageNo,
        end = pageNo;
      //总页数小于连续页码数
      if (totalPage <= continues) {
        start = 1;
        end = totalPage;
      } else {
        if (pageNo <= parseInt(continues / 2)) {
          start = 1;
          end = continues;
        } else if (totalPage - pageNo < parseInt(continues / 2)) {
          end = totalPage;
          start = totalPage - continues + 1;
        } else {
          start = pageNo - parseInt(continues / 2);
          end = pageNo + parseInt(continues / 2);
        }
      }
      return [start, end];
    },
  },
  methods: {
    postPageNo(page) {
      this.$emit("getPageNo", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  .border {
    border: 1px solid red;
  }

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
