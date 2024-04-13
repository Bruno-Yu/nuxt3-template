<script setup lang="ts">
import { computed, defineEmits, defineModel, onBeforeMount, watch, watchEffect } from 'vue'
import { SuccessFilled } from '@element-plus/icons-vue'
const props = defineProps({
  otpCount: {
    type: Number,
    default: 4,
  },
  showResend: {
    type: Boolean,
    default: true,
  },
  isSignup: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    default: ''
  }
})
// $emit 出去驗證碼彈窗的行為
const $emits = defineEmits(['otpConfirm'])

const dialogWidth = computed(() => {
  if (window.innerWidth >= 765)
    return 350
  else
    return '80%'
})

const show = defineModel()

const { $toast } = useNuxtApp()

const inputRefs = reactive([])

const otpForm: string[] = reactive([])

const condition = computed(() => otpForm.length > 1 && otpForm.filter(e => e === '').length === 0
)

watch(
  () => props.otpCount,
  (count, prevCount) => {
    otpForm.splice(0)
    for (let i = 0; i < props.otpCount; i++)
      otpForm.push('')
  }, {
    immediate: true
  })

watchEffect(() => {
  if (condition.value) {
    const otp = otpForm.join('')
    $emits('otpConfirm', `${otp}`)
  }
})

const handleInputKeyup = (event, index) => {
  event.preventDefault() // 阻止預設的輸入行為

  /**
   * 刪除/左鍵
   * event.keyCode === 8 : Backspace / Delete
   * event.keyCode === 37 : Left Arrow ←
   */
  if (event.keyCode === 8 || event.keyCode === 37) {
    if (event.keyCode === 8) // 刪除
      otpForm[index] = ''

    // focus到前一個input
    if (index > 0)
      inputRefs[index - 1].focus()
  } else if (((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) { // 輸入數字鍵
    /**
     * event.keyCode >= 48 && event.keyCode <= 57
     * event.keyCode >= 96 && event.keyCode <= 105
     * 皆為輸入數字時的keyCode
     */
    if (otpForm[index]) { // 當前輸入框有值時，又輸入數字，就自動將輸入的值填入下一個輸入框
      if (index < otpForm.length - 1)
        otpForm[index + 1] = event.key
    } else { // 當前輸入框沒有值時，就自動將輸入的值填入該輸入框
      otpForm[index] = event.key
    }

    if (index < otpForm.length - 1)
      inputRefs[index + 1].focus() // focus到下一個輸入框
  } else if (event.keyCode === 39) {
    /**
     * focus到下一個輸入框
     * 輸入數字/右鍵
     * event.keyCode === 39 : Right Arrow →
     */
    if (index < otpForm.length - 1)
      inputRefs[index + 1].focus()
  }
}

// 顯示在 dialog 左方的錯誤訊息內容
const errorMessage = ref('')

// 重送 otp
const resendOtp = async () => {
  
}
</script>

<template>
  <el-dialog
    v-model="show"
    title=""
    :width="dialogWidth"
    modal-class="otp-dialog"
  >
    <p class="text-center font-bold text-2xl pt-5">Please enter OTP</p>
    <p v-if="props.showResend" class="text-center text-sm mt-2">OTP sent to {{ props.phone }}</p>
    <el-form class="otp-form mt-5 px-5">
      <el-form-item>
        <div class="otp-form__container flex gap-2">
          <template v-for="(item, index) in otpForm" :key="index">
            <el-input :ref="el => inputRefs.push(el)" v-model="otpForm[index]" autofocus size="large" maxlength="1" type="text" inputmode="numeric" @keydown="handleInputKeyup($event, index)"></el-input>
          </template>
        </div>
      </el-form-item>
      <div class="dialog-footer pt-4 pb-8">
        <div v-if="props.showResend" class="flex justify-between">
          <p class="text-red-600">{{ errorMessage }}</p>
          <el-button size="small" type="primary" link @click="resendOtp">
            Resend OTP
          </el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
.otp-form {
  &__container {
    ::v-deep .el-input__wrapper {
      box-shadow: none;
      border-bottom: 1px solid var(--el-input-border-color);
      border-radius: 0;
      padding: 0; // 文字置中所以不需要padding，避免螢幕寬度太小的情況下文字被padding擠到隱藏
    }
    ::v-deep .el-input__inner {
      text-align: center;
    }
  }
}

.dialog-footer {
  margin-top: -1rem;
}
</style>
