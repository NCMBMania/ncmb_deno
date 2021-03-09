interface dateFormat {
  __type: string,
  iso: string
}

interface authData {
  id: string,
  access_token: string,
  expires?: number,
  expiration_date: dateFormat
}
