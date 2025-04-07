<script setup lang="ts">
import { ref } from 'vue'
import { 
  ElButton, 
  ElCard, 
  ElContainer, 
  ElHeader, 
  ElMain, 
  ElFooter,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage
} from 'element-plus'
import { 
  Message, 
  Service, 
  User, 
  Phone, 
  Location, 
  Timer, 
  ChatLineRound,
  FirstAidKit,
  Message as MessageIcon
} from '@element-plus/icons-vue'

const showAIConsult = ref(false)
const showContact = ref(false)
const messages = ref<Array<{type: 'user' | 'ai', content: string}>>([])

const consultForm = ref({
  symptoms: '',
  name: '',
  phone: ''
})

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const mockResponses = [
  {
    question: "挂号",
    answer: "您好，您可以通过以下方式预约挂号：\n1. 电话预约：400-XXX-XXXX\n2. 网上预约：访问医院官网\n3. 现场挂号：一楼大厅服务台\n需要我帮您预约具体科室吗？"
  },
  {
    question: "检查报告",
    answer: "您好，检查报告查询方式如下：\n1. 网上查询：登录医院APP或官网\n2. 现场查询：一楼报告查询处\n3. 电话咨询：400-XXX-XXXX\n请注意带好您的就诊卡和身份证。"
  },
  {
    question: "就医流程",
    answer: "东方明德医院就医流程：\n1. 预约挂号\n2. 按时就诊，出示就诊卡\n3. 医生诊断开具检查单\n4. 缴费检查\n5. 取报告复诊\n6. 开具处方取药\n需要了解具体环节吗？"
  },
  {
    question: "营业时间",
    answer: "医院各部门开放时间：\n1. 门诊：周一至周日 8:00-17:30\n2. 急诊：24小时\n3. 检验科：周一至周日 7:30-17:00\n4. 放射科：周一至周日 8:00-17:00\n如需其他科室具体时间可以继续咨询。"
  },
  {
    question: "医保报销",
    answer: "本院支持以下医保类型：\n1. 城镇职工医保\n2. 城乡居民医保\n3. 异地医保\n4. 商业保险\n请持医保卡和身份证到一楼服务台办理。"
  }
]

const handleAIConsult = () => {
  showAIConsult.value = true
  if (messages.value.length === 0) {
    messages.value.push({
      type: 'ai',
      content: '您好，我是赵院士，东方明德医院AI智能问诊助手。我拥有丰富的临床经验和专业知识，可以为您提供初步诊断和用药建议。请详细描述您的症状，我会为您提供专业的医疗建议。'
    })
  }
}

const handleSendMessage = () => {
  if (!consultForm.value.symptoms.trim()) {
    ElMessage.warning('请输入您的问题')
    return
  }
  
  const userQuestion = consultForm.value.symptoms.trim()
  messages.value.push({
    type: 'user',
    content: userQuestion
  })
  
  // 查找匹配的问题
  const matchedQA = mockResponses.find(qa => 
    userQuestion.includes(qa.question)
  )
  
  setTimeout(() => {
    messages.value.push({
      type: 'ai',
      content: matchedQA ? matchedQA.answer : "抱歉，我不太理解您的问题。您可以询问：挂号、检查报告、就医流程、营业时间、医保报销等问题。"
    })
  }, 800)
  
  consultForm.value.symptoms = ''
}

const handleContact = () => {
  showContact.value = true
}

const handleSubmitContact = () => {
  if (!contactForm.value.email || !contactForm.value.message) {
    ElMessage.warning('请填写完整信息')
    return
  }
  ElMessage.success('消息已发送，我们会尽快回复您！')
  showContact.value = false
  contactForm.value = {
    name: '',
    email: '',
    message: ''
  }
}
</script>

<template>
  <el-container class="hospital-container">
    <el-header class="hospital-header">
      <div class="logo-section">
        <img src="../assets/logo.png" alt="东方明德医院" class="hospital-logo">
        <h1 class="hospital-title">东方明德医院</h1>
      </div>
      <div class="nav-section">
        <el-button type="primary" :icon="FirstAidKit">就医指南</el-button>
        <el-button type="primary" :icon="Service">专家团队</el-button>
        <el-button type="primary" :icon="ChatLineRound" @click="handleAIConsult">AI智能问诊</el-button>
        <el-button type="primary" :icon="Phone" @click="handleContact">联系我们</el-button>
      </div>
    </el-header>

    <el-main>
      <div class="hero-section">
        <h2>智慧医疗 • 以人为本</h2>
        <p>运用前沿AI技术，为您提供优质医疗服务</p>
        <el-button type="primary" size="large" @click="handleAIConsult">
          立即咨询 <el-icon><ChatLineRound /></el-icon>
        </el-button>
      </div>

      <div class="features-grid">
        <el-card class="feature-card" shadow="hover">
          <template #header>
            <div class="feature-header">
              <el-icon><Timer /></el-icon>
              <h3>在线预约</h3>
            </div>
          </template>
          <p>便捷的线上预约系统，智能分诊，为您节省时间</p>
        </el-card>

        <el-card class="feature-card" shadow="hover">
          <template #header>
            <div class="feature-header">
              <el-icon><ChatLineRound /></el-icon>
              <h3>AI智能问诊</h3>
            </div>
          </template>
          <p>24小时智能问诊服务，快速准确的初步诊断</p>
        </el-card>

        <el-card class="feature-card" shadow="hover">
          <template #header>
            <div class="feature-header">
              <el-icon><Service /></el-icon>
              <h3>专家团队</h3>
            </div>
          </template>
          <p>汇聚各领域顶尖专家，提供专业医疗服务</p>
        </el-card>
      </div>

      <!-- AI问诊对话框 -->
      <el-dialog
        v-model="showAIConsult"
        title="AI智能问诊"
        width="60%"
        class="ai-consult-dialog"
      >
        <div class="ai-doctor-info">
          <img src="../assets/head.png" alt="赵院士" class="doctor-avatar">
          <div class="doctor-details">
            <h3>赵院士</h3>
            <p>主任医师 | 博士生导师</p>
            <p>专长：内科疾病诊治、心血管疾病、慢性病管理</p>
          </div>
        </div>
        
        <div class="chat-container">
          <div class="chat-messages">
            <div v-for="(msg, index) in messages" 
                 :key="index" 
                 :class="['message', msg.type === 'ai' ? 'ai-message' : 'user-message']">
              <img v-if="msg.type === 'ai'" src="../assets/head.png" alt="赵院士" class="message-avatar">
              <div class="message-content">{{ msg.content }}</div>
            </div>
          </div>
          
          <div class="chat-input">
            <el-input
              v-model="consultForm.symptoms"
              type="textarea"
              :rows="3"
              placeholder="请详细描述您的症状..."
              @keyup.enter="handleSendMessage"
            />
            <el-button type="primary" @click="handleSendMessage">发送</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 联系我们对话框 -->
      <el-dialog
        v-model="showContact"
        title="联系我们"
        width="50%"
      >
        <div class="contact-info">
          <p><el-icon><Phone /></el-icon> 急诊热线：120</p>
          <p><el-icon><Phone /></el-icon> 预约电话：400-XXX-XXXX</p>
          <p><el-icon><Location /></el-icon> 医院地址：XX市XX区XX路XX号</p>
          <p><el-icon><Timer /></el-icon> 门诊时间：周一至周日 8:00-17:30</p>
        </div>
        
        <el-form :model="contactForm" class="contact-form">
          <el-form-item label="姓名">
            <el-input v-model="contactForm.name" placeholder="请输入您的姓名（选填）" />
          </el-form-item>
          <el-form-item label="邮箱" required>
            <el-input v-model="contactForm.email" placeholder="请输入您的邮箱" />
          </el-form-item>
          <el-form-item label="留言内容" required>
            <el-input
              v-model="contactForm.message"
              type="textarea"
              :rows="4"
              placeholder="请输入您的留言内容..."
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmitContact">
              <el-icon><MessageIcon /></el-icon> 发送留言
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>

    <el-footer class="hospital-footer">
      <p>© 2024 东方明德医院 版权所有</p>
    </el-footer>
  </el-container>
</template>

<style scoped>
.hospital-container {
  min-height: 100vh;
  background: url('../assets/bg.jpeg') no-repeat center center fixed;
  background-size: cover;
}

.hospital-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hospital-logo {
  height: 40px;
}

.nav-section {
  display: flex;
  gap: 1rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 800px;
}

.hero-section h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.95);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-header .el-icon {
  font-size: 1.5rem;
  color: #409eff;
}

.contact-info {
  padding: 1rem;
}

.contact-info p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.hospital-footer {
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .nav-section {
    display: none;
  }
}

.ai-consult-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.ai-doctor-info {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f0f9ff;
  border-bottom: 1px solid #e6f0f9;
}

.doctor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.doctor-details h3 {
  margin: 0 0 8px 0;
  color: #1a1a1a;
}

.doctor-details p {
  margin: 4px 0;
  color: #666;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 600px;
  font-size: 16px;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.message-content {
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 80%;
}

.ai-message .message-content {
  background: #ecf5ff;
  color: #2c3e50;
}

.user-message {
  flex-direction: row-reverse;
}

.user-message .message-content {
  background: #409eff;
  color: white;
  margin-right: 12px;
}

.chat-input {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.chat-input .el-input {
  flex: 1;
}

.contact-form {
  margin-top: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.contact-info {
  background: #f0f9ff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
.hospital-title {
  color: #1a5276;
  font-family: 'STXingkai', 'STKaiti', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
