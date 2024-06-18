export interface CONFIG_TYPE {
  [key: string]: any

  STRINGIFY: (data: any) => string
}

export const CONFIG: CONFIG_TYPE = {
  STRINGIFY(data) {
    return JSON.stringify(data)
  }
}
