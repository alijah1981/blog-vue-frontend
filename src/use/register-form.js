// import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useRegisterForm() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting} = useForm()

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

  const onSubmit = handleSubmit(async values => {
    // console.log('Form:', values)
    try {
      await store.dispatch('auth/register', values)
      router.push('/auth')
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
    isSubmitting
  }
}
