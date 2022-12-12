export interface IRest<T = any>  {
  ok: boolean
  mensaje: string
  code: number
  data?: T
}
