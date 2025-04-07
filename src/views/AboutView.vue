<template>
  <div class="about">
    <h1>关于我们</h1>
    <!-- 公司简介 -->
    <section class="company-intro">
      <h2>公司简介</h2>
      <p>{{ companyInfo.introduction }}</p>
    </section>
    <!-- 团队介绍 -->
    <section class="team-intro">
      <h2>团队介绍</h2>
      <p>{{ teamInfo.introduction }}</p>
      <div class="team-members">
        <!-- 成员循环展示 -->
        <div class="team-member" v-for="member in teamInfo.members" :key="member.name">
          <h3>{{ member.name }}</h3>
          <p>职位：{{ member.position }}</p>
          <p>简介：{{ member.description }}</p>
        </div>
      </div>
    </section>
    <!-- 发展历程 -->
    <section class="development-history">
      <h2>发展历程</h2>
      <ul>
        <li v-for="(event, index) in developmentHistory" :key="index"><strong>{{ event.year }}</strong> - {{ event.event }}</li>
      </ul>
    </section>
    <!-- 联系我们 -->
    <section class="contact-us">
      <h2>联系我们</h2>
      <p>如果您有任何问题或建议，欢迎随时联系我们：</p>
      <ul>
        <li>电话：{{ contactInfo.phone }}</li>
        <li>邮箱：{{ contactInfo.email }}</li>
        <li>地址：{{ contactInfo.address }}</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 公司信息假数据
const companyInfo = ref({
  introduction: '我们是一家专注于软件开发的创新型公司，致力于通过技术和服务为客户提供高质量的解决方案。自成立以来，我们始终秉持着创新、协作、卓越的理念，不断追求卓越，为客户创造更大的价值。'
});

// 团队信息假数据
const teamInfo = ref({
  introduction: '我们的团队由一群富有激情和创造力的专业人士组成，他们在软件开发领域拥有丰富的经验和深厚的技术背景。我们相信，团队的力量是无穷的，通过紧密的合作和协作，我们能够为客户提供更加优质的服务。',
  members: [
    {
      name: '张三',
      position: '前端开发工程师',
      description: '拥有5年前端开发经验，熟练掌握Vue.js、React等框架。'
    },
    {
      name: '李四',
      position: '后端开发工程师',
      description: '擅长Python、Java等后端开发语言，有丰富的项目经验。'
    }
  ]
});

// 发展历程假数据
const developmentHistory = ref([
  { year: '2020', event: '公司成立' },
  { year: '2021', event: '推出第一款产品' },
  { year: '2022', event: '获得优秀软件企业奖项' },
  { year: '2023', event: '扩大业务范围，服务更多客户' }
]);

// 联系信息假数据
const contactInfo = ref({
  phone: '123456789',
  email: 'example@example.com',
  address: '北京市朝阳区XX路XX号'
});
</script>

<style scoped>
.about {
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 10px;
}

.team-members {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.team-member {
  width: calc(50% - 10px);
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.team-member img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>
