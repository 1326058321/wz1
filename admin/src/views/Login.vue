<template>
  <div class="login-container">
    <el-card header="请先登入">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type='primary' native-type="submit">登入</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      model:{}
    }
  },
  methods:{
    async login(){
      const res=await this.$http.post('login',this.model)
      //sessionStorage.token=res.data.token       //网页关掉没有
      localStorage.token=res.data.token           //网页关了还有
      // console.log(res.data);
      // console.log(res.data.token);
      this.$router.push('/')
      this.$message({
        type:'success',
        message:'登入成功'
      })
    }
  }
};
</script>

<style>
.login-container {
  width: 25rem;
  margin: 6rem auto;
}
</style>