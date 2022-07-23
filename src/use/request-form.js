import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm(fn) {
  const {isSubmitting, handleSubmit} = useForm()

  const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
    'title',
    yup.string()
      .trim()
      .required('Введите заголовок записи')
  )
  const {value: content, errorMessage: cError, handleBlur: cBlur} = useField(
    'content',
    yup
      .string()
      .trim()
      .required('Поле не может быть пустым')
  )

  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting,
    onSubmit,
    title, tBlur, tError,
    content, cBlur, cError
  }
}
