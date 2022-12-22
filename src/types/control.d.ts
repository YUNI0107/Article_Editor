export type ClickEventType = 'image-popup' | 'link'
export type LineHeightType = 'auto' | 'custom'

export type ChangeValueFuncType = (
  controlName: string,
  value: IControlProps[keyof IControlProps],
  uuid: string,
  childUuid?: string | undefined
) => void

export type GetValueFuncType = (
  controlName: string,
  uuid: string,
  childUuid?: string | undefined
) => IControlProps[keyof IControlProps]

export interface IStyleSelected {
  bold: boolean
  italic: boolean
  underline: boolean
  alignLeft: boolean
  alignCenter: boolean
  alignRight: boolean
  listOrdered: boolean
  listUnOrdered: boolean
}

type NeedUpdateSelectedType = {
  [key in keyof IStyleSelected]: number | string | boolean
}

type NeedUpdateOtherType = {
  fontSize: number
}

type NeedUpdateType = Partial<NeedUpdateSelectedType & NeedUpdateOtherType> | null
