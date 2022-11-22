<template>
  <div class="registerInfo"
  v-infinite-scroll="load"
  :infinite-scroll-disabled="disabled"
  >
    <el-card
      class="box-card"
      v-for="item in patients"
      :key="item.registerId"
      shadow="hover"
      @click.native="selectCard(item.registerId)"
    >
      <div slot="header" class="clearfix">
        <span style="font-weight: bold; font-size: 18px">{{ item.name }}</span>
        <div class="rightOperation" v-show="!item.medId">
          <el-button style="float: right; padding: 3px 0" type="text" @click.stop="deleteInfo(item.registerId)"
          >删除</el-button
        >
        <el-button style="float: right; padding: 3px 0" type="text" @click.stop="updateInfo(item)"
          >编辑</el-button
        >
        </div>
        <div class="rightOperation" style="color: blue; font-weight: bold" v-show="item.medId">{{item.medId}}</div>
      </div>
      <div class="body">
        <div class="text item">
          <div><span>场次：</span>{{ item.shift }}</div>
          <div><span>排班：</span>{{item.departmentName}}</div>
          <div><span>登记号：</span>{{ item.cardNo }}</div>
          <div><span>登记时间：</span>{{ item.registerTime }}</div>
        </div>
        <div class="select" v-show="selected.includes(item.registerId)">
          <i class="el-icon-check"></i>
        </div>
      </div>
    </el-card>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import {getRegisters,deleteRegister} from '../axios/register.js'
export default {
  name: "registerInfo",
  props: ['info'],
  data() {
    return {
      patientList: [],
      patients: [
        /* {
          registerId: "1001",
          planId: "XA0313",
          name: "唐美岳",
          cardNo: "0000198",
          age: 22,
          sex: "女",
          departmentCode: "XA0313",
          departmentName: "内三科门诊",
          doctorCode: "191012",
          doctorName: "内三科门诊",
          registerTime: "2022-11-15 13:52",
          shift: "下午",
          cancelFlag: 0,
        },
        {
          registerId: "1002",
          planId: "XA0413",
          name: "金贤及",
          cardNo: "0000199",
          age: 24,
          sex: "男",
          departmentCode: "XA0413",
          departmentName: "外三科门诊",
          doctorCode: "191023",
          doctorName: "内三科门诊",
          registerTime: "2022-11-15 13:52",
          shift: "下午",
          cancelFlag: 0,
        },
        {
          registerId: "1003",
          planId: "XA10202",
          name: "龙建峰",
          cardNo: "0000210",
          age: 23,
          sex: "男",
          departmentCode: "XA10202",
          departmentName: "眼科门诊",
          doctorCode: "100298",
          doctorName: "夏医生",
          registerTime: "2022-11-15 13:52",
          shift: "下午",
          cancelFlag: 0,
        },
        {
          registerId: "1004",
          planId: "XZ101",
          name: "王宗伟",
          cardNo: "0000211",
          age: 25,
          sex: "男",
          departmentCode: "XZ101",
          departmentName: "内科专家门诊朱淑芬",
          doctorCode: "100256",
          doctorName: "朱淑芬",
          registerTime: "2022-11-15 13:52",
          shift: "下午",
          cancelFlag: 0,
        },
        {
          registerId: "1005",
          planId: "XZ102",
          name: "陈露凯",
          cardNo: "0000212",
          age: 28,
          sex: "男",
          departmentCode: "XZ102",
          departmentName: "内科专家门诊师运来",
          doctorCode: "100257",
          doctorName: "师运来",
          registerTime: "2022-11-15 13:52",
          shift: "下午",
          cancelFlag: 0,
        },
        {
          registerId: "1006",
          planId: "XA0511",
          name: "金仙芬",
          cardNo: "0000213",
          age: 30,
          sex: "女",
          departmentCode: "XA0511",
          departmentName: "妇产一科门诊",
          doctorCode: "100273",
          doctorName: "妇产一科门诊",
          registerTime: "2022-11-15 13:52",
          shift: "下午",
          cancelFlag: 0,
        },
        {
          registerId: "1007",
          planId: "XA0521",
          name: "杨二姐",
          cardNo: "0000214",
          age: 26,
          sex: "女",
          departmentCode: "XA0521",
          departmentName: "妇产二科门诊",
          doctorCode: "100211",
          doctorName: "牛慧如",
          registerTime: "2022-11-15 13:52",
          shift: "下午",
          cancelFlag: 0,
        }, */
      ],
      selected: [],
      loading: false,
      count: 12
    };
  },
  computed: {
    noMore(){
      return this.count >= this.patientList.length
    },
    disabled(){
      return this.loading || this.noMore
    }
  },
  methods: {
    load(){
      this.loading = true
      this.count = this.count+4
      this.patients = this.patientList.slice(0,this.count)
      this.loading = false
    },
    selectCard(registerId) {
      let obj = this.selected.find(item => item == registerId);
      if (obj == null) {
        let flag = this.patients.find(item => item.registerId == registerId).medId
        if(flag){
          if(this.selected.length){
            this.$message({
            message: '<已签到>状态无法编辑',
            type: 'warning'
          })
          }
          return
        }
        this.selected.push(registerId);
      } else {
        this.selected = this.selected.filter(
          item => item != registerId
        );
      }
    },
    updateInfo(item){
      this.$emit('updateDialog',item)
    },
    deleteInfo(registerId){
      this.$confirm('将永久删除该登记信息,是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        let fd = new FormData()
      fd.append('registerId',registerId)
      fd.append('areaId',this.info.areaId)
      deleteRegister(fd).then(res => {
        if(res.code == 0){
          this.$message({
            message: '删除成功',
            type: 'success'
        })
        this.init()
        }else{
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      }).catch(err=>{
        console.log('deleteRegister',err)
      })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    init(obj){
      if(obj == null) obj = this.info
      getRegisters(obj).then(res => {
        this.patientList = res.data
        this.patients = this.patientList.slice(0,this.count)
      })
    }
  },
  mounted() {
    this.init(this.info)
  },
  watch:{
    info: {
      deep: true,
      handler(value){
        this.init(value)
      }
    },
    selected: {
      handler(){
        this.$emit('checked',Array.from(this.selected))
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.registerInfo {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 73%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}

.box-card {
  // width: 400px;
  width: 20vw;
  height: 22vh;
  margin-bottom: 20px;
  margin-right: 20px;
}
.text {
  font-size: 16px;
  span{
    font-weight: bold;
  }
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.rightOperation{
  float: right;
  padding: 3px 0;
}

.body {
  display: flex;
  justify-content: space-between;
  .select {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #F56C6C;
    text-align: center;
    line-height: 50px;
    i {
      font-size: 24px;
      color: white;
      font-weight: 1000;
    }
  }
}
</style>
