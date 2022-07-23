const ERROR_CODES = {
  auth: 'Пожалуйста войдите в систему',
  tokenexpire: 'Авторизация не пройдена. Истек токен.'
}

export function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}
