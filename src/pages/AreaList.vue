<template>
  <div class="leftClass">
    <el-menu
      :default-openeds="[String(info.areaId)]"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="mode"
      :unique-opened="true"
      @select="selectPlan"
      @open="open"
      ref="menu"
    >
      <div class="fold" @click="mode = !mode">
        <i class="el-icon-s-fold"></i>
        <span v-text="mode ? '' : '收缩'"></span>
      </div>
      <el-submenu
        v-for="item in planList"
        :key="item.id"
        :index="String(item.id)"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="plan in getPlans(item.id)"
            :key="plan.planId"
            :index="plan.planId"
            >{{ plan.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AreaList",
  data() {
    return {
      mode: false,
    };
  },
  props: {
    //登录选择的默认区域
    info: { type: Object },
    //诊区排班分类列表
    planList: { type: Array },
  },
  methods: {
    getPlans(id) {
      // debugger
      let plans = this.planList.filter((p) => p.id == id);
      return plans.length ? plans[0].list : [];
    },
    selectPlan(...arg) {
      let areaId = Number(arg[1][0]);
      let planId = arg[1][1];
      const obj = { areaId, planId };
      this.$emit("selectPlan", obj);
    },
    open(index){
      this.$emit("selectPlan",{ areaId: index, planId: '' })
    },
    overtClick(e) {
      if (e.target == e.currentTarget || e.target.tagName == "leftClass") {
        //点击空区域取消菜单选择，如果有展开当前区域就直接查看当前区域所有患者
        //重复点击不发请求
        if (this.$refs.menu.activeIndex != null) {
          this.$refs.menu.activeIndex = null;
          let areaIds = this.$refs.menu.openedMenus;
          if (areaIds.length == 1) {
            this.$emit("selectPlan", { areaId: areaIds[0],planId: '' });
          }
        }
      }
    },
  },
  watch:{
    'info.planId': {
      handler(value){
        this.$refs.menu.activeIndex = value
      }
    }
  },
  mounted() {
    let dom = document.querySelector(".leftClass");
    dom.addEventListener('click', this.overtClick);
  },
  beforeDestroy(){
    /* let dom = document.querySelector(".leftClass");
    dom.removeEventListener('click',this.overtClick) */
    document.removeEventListener('click',this.overtClick)
  }
};
</script>

<style lang="scss" scoped>
.leftClass {
  // max-width: 200px;
  height: 100vh;
  background-color: rgb(84, 92, 100);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .fold {
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #303133;
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    box-sizing: border-box;
    white-space: nowrap;
    padding-left: 20px;
    color: rgb(255, 255, 255);
    background-color: rgb(84, 92, 100);
    i {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      color: #909399;
    }
  }
}
</style>