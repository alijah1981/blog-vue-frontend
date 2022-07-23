import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting, submitCount} = useForm()

  const MIN_LENGTH = 6

  const {value: login, errorMessage: lError, handleBlur: lBlur} = useField(
    'login',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите логин')
      .min(MIN_LENGTH, `Логин не может быть меньше ${MIN_LENGTH} символов`)
  )

  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите пароль')
      .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
  )

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 1500)
    }
  })

  const onSubmit = handleSubmit(async values => {
    // console.log('Form:', values)
    try {
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch (e) {
    }
  })

  return {
    login,
    password,
    lError,
    pError,
    lBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts
  }
}
