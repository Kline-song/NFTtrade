<template>
  <div>
    <h1>个人资料</h1>
    <form>
      <div class="form-item">
        <label>ID:</label>
        <input type="text" :value="userInfo.id" readonly>
      </div>
      <div class="form-item">
        <label>用户名:</label>
        <input type="text" v-model="userInfo.username">
      </div>
      <div class="form-item">
        <label>性别:</label>
        <select v-model="userInfo.gender">
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </div>
      <div class="form-item">
        <label>生日:</label>
        <input type="date" v-model="userInfo.birthday">
      </div>
      <div class="form-item">
        <button @click="editUserInfo" :disabled="isEditing">修改信息</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name:'PersonalInfo',
  data() {
    return {
      userInfo: {
        id: '123456',
        username: '',
        gender: '',
        birthday: ''
      },
      isEditing: false
    };
  },
  methods: {
    editUserInfo() {
      this.isEditing = true;
    }
  }
};
</script>

<style scoped>
.form-item {
  margin-left: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-item label {
  flex: 0 0 80px; /* 标签宽度 */
}

.form-item input,
.form-item select {

}
</style>
