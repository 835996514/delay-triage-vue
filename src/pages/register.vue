<template>
  <div class="register">
    <AreaList
      :info="info"
      :planList="planList"
      @selectPlan="selectPlan"
    />
    <div class="right">
      <div class="search">
        <div class="search-item">
          <span>患者姓名：</span>
          <el-input
            v-model="searchObj.name"
            placeholder="请输入姓名"
            clearable
            @keyup.enter.native="search"
          ></el-input>
        </div>
        <div class="search-item">
          <span>登记号：</span>
          <el-input
            v-model="searchObj.cardNo"
            placeholder="请输入登记号"
            clearable
            @keyup.enter.native="search"
          ></el-input>
        </div>
        <div class="search-item">
          <span>身份证号：</span>
          <el-input
            v-model="searchObj.idNo"
            placeholder="请输入身份证号"
            clearable
            @keyup.enter.native="search"
          ></el-input>
        </div>
        <div class="search-item">
          <span style="width: 60px">场次：</span>
          <el-select v-model="searchObj.shift" placeholder="请选择场次">
            <el-option label="请选择" value=""></el-option>
            <el-option label="上午" value="上午"></el-option>
            <el-option label="下午" value="下午"></el-option>
          </el-select>
        </div>
        <div class="search-item" style="padding-left: 40px">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="success" icon="el-icon-circle-plus-outline" @click="addRegister">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteAll">删除</el-button>
        </div>
        <div class="search-item">
          <el-tooltip effect="dark" placement="bottom">
            <span style="cursor: pointer" slot="content" @click="logout">退出登录</span>
            <span class="el-icon-user-solid">{{$store.state.loginStore.userData.name}}</span>
          </el-tooltip>
        </div>
      </div>
      <el-divider></el-divider>
      <RegisterInfo :info="info" @checked="checked" @updateDialog="updateDialog" ref="register"/>
    </div>
    <el-dialog 
    :title="formTitle" 
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    >
      <el-form
        ref="registerForm"
        :model="registerObj"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerObj.name" placeholder="请输入患者姓名" style="width: 226px"></el-input>
        </el-form-item>
        <el-form-item label="排班" prop="planId">
          <el-select
          v-model="registerObj.planId"
          placeholder="请选择排班"
          >
            <el-option
              v-for="item in planAvaliabel"
              :key="item.planId"
              :label="item.name"
              :value="item.planId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场次" prop="shift">
          <el-select v-model="registerObj.shift" placeholder="请选择场次">
            <el-option
              label="上午"
              value="上午"
            ></el-option>
            <el-option
              label="下午"
              value="下午"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登记号" prop="cardNo">
          <el-input v-model="registerObj.cardNo" placeholder="请输入登记号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNo">
          <el-input v-model="registerObj.idNo" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button type="info" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import AreaList from "./AreaList.vue";
import RegisterInfo from "./registerInfo.vue";

import {getPlans,deleteAllRegister,register,updateRegister} from '../axios/register'
export default {
  name: "Register",
  data() {
    return {
      //搜索条件
      searchObj: {
        name: '',
        cardNo: '',
        idNo: '',
        shift: '',
        areaId: 0,
        planId: '',
      },
      //检索患者信息条件
      info: {
        areaId: 0,
        planId: ''
      },
      //诊区排班分类列表
      planList: [],
      //当前选择的患者
      selected: [],
      //表单对话框
      dialogVisible: false,
      //新增表单
      registerAdd: {
        registerId: '',
        planId: '',
        name: '',
        cardNo: '',
        departmentCode: '',
        departmentName: '',
        idNo: '',
        registerTime: '',
        shift: '',
        cancelFlag: 0,
      },
      //编辑表单
      registerObj: {},
      formTitle: '新增',
      rules: {
        name: [
          { required: true, message: '患者姓名不能为空',trigger: 'blur' },
          { min: 2, max: 5, message: '名字长度在2到5个字符', trigger: 'blur' }
        ],
        planId: [{ required: true, message: '请选择排班', trigger: 'change' }],
        shift: [{ required: true, message: '请选择场次', trigger: 'change' }]
      }
    };
  },
  methods: {
    search() {
      this.$refs.register.init(this.searchObj)
    },
    selectPlan(obj){      
      let { areaId,planId } = obj
      this.searchObj.areaId = areaId
      this.searchObj.planId = planId
      this.info.areaId = areaId
      this.info.planId = planId
      // this.info = { areaId,planId }
      // this.$refs.register.init({ areaId,planId })
    },
    checked(arr){
      this.selected = arr
    },
    updateDialog(register){
      this.formTitle = '编辑'
      this.registerObj = register
      this.dialogVisible = true
    },
    addRegister(){
      this.formTitle = '新增'
      this.registerObj = JSON.parse(JSON.stringify(this.registerAdd))
      this.registerObj.planId = this.info.planId
      let hours = new Date().getHours()
      if(hours >=0 && hours <=12){
        this.registerObj.shift = '上午'
      }else{
        this.registerObj.shift = '下午'
      }
      this.dialogVisible = true
    },
    deleteAll(){
      if(!this.selected.length){
        this.$message({
          message: '操作失败,请先选择要删除的对象!!!',
          type: 'info',
        })
        return
      }
      this.$confirm('此操作将永久删除所有已选患者信息,是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        let fd = new FormData()
      fd.append('registerIds',this.selected)
      fd.append('areaId',this.info.areaId)
      deleteAllRegister(fd).then(res => {
        if(res.code == 0){
          this.$message({
            message: '删除患者登记信息成功',
            type: 'success'
          })
          this.$refs.register.init()
        }else{
          this.$message({
            message: '删除患者登记信息失败',
            type: 'error',
            duration: 5*1000
          })
        }
      }).catch(err=>{
        console.log('deleteAllRegister',err)
      })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    submitForm(){
      this.$refs.registerForm.validate(valid => {
        if(valid){
          let planId = this.registerObj.planId
          let planName = this.planAvaliabel.find( plan => plan.planId ==  planId).name
          this.registerObj.departmentCode = this.registerObj.planId
          this.registerObj.departmentName = planName

          /* let obj = JSON.parse(JSON.stringify(this.registerObj))
          obj.areaId = this.info.areaId */

          let fd = new FormData()
          fd.append('areaId',this.info.areaId)
          fd.append('registerId',this.registerObj.registerId)
          fd.append('name',this.registerObj.name)
          fd.append('planId',planId)
          fd.append('cardNo',this.registerObj.cardNo)
          fd.append('departmentCode',planId)
          fd.append('departmentName',planName)
          fd.append('idNo',this.registerObj.idNo)
          fd.append('shift',this.registerObj.shift)
          fd.append('cancelFlag',this.registerObj.cancelFlag)  
          fd.append('registerTime',this.registerObj.registerTime)
          if(this.formTitle == '新增'){
            register(fd).then(res=>{
              if(res.code == 0){
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.dialogVisible = false
                this.$refs.registerForm.resetFields()
                //触发左侧排班列表选择菜单
                this.info.planId = planId
                this.$refs.register.init()
              }
            }).catch(err=>{
              console.log('register',err)
              this.$message({
                message: '提交错误',
                type: 'error'
              })
            })
          }else{
            console.log(this.registerObj.medId)
            fd.append('source',this.info.areaId)
            fd.append('medId',this.registerObj.medId)
            updateRegister(fd).then(res => {
              if(res.code == 0){
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                this.dialogVisible = false
                this.$refs.registerForm.resetFields()
                this.info.planId = planId
                this.$refs.register.init()
              }
            }).catch(err=>{
              console.log('updateRegister',err)
            })
          }
        }else{
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel(){
      this.dialogVisible = false
      this.$refs['registerForm'].resetFields()
      this.registerObj = this.addRegister
    },
    logout(){
      this.$store.dispatch('loginStore/logoutUser')
      this.$router.push({path: '/login'})
    }
  },
  computed: {
    planAvaliabel(){
      if(this.planList.length){
        let item = this.planList.find(item=>item.id == this.info.areaId)
        if(item != null){
          return item.list
        }
      }
    }
  },
  mounted() {
    let id = Number(this.$route.query.areaId)
    this.searchObj.areaId = id
    this.info.areaId = id

    JSON.parse(this.$route.query.listArea).forEach((item) => {
      let plans = item.departmentCodes;
      let fd = new FormData();
      fd.append("planIds", JSON.parse(plans));
      getPlans(fd).then((res) => {
        this.planList.push({ id: item.id, name: item.name, list: res.data });
      });
    });
  },
  components: {
    AreaList,
    RegisterInfo,
  },
};
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  .right{
    flex: 70%;
    padding: 0 10px 0 30px;
    height: 100vh;
    .search {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    .search-item {
      padding: 12px 12px 0 12px;
      display: flex;
      align-items: center;
      span {
        width: 80px;
      }
      .el-input {
        width: 200px;
      }
    }
    .search-item:last-child{
      margin-left: 120px;
      text-align: center;
      width: 60px;
      height: 60px;
      span{
        line-height: 60px;
      }
    }
    .el-button {
      height: 40px;
    }
  }
  }
}
</style>