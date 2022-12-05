import { createContext, ReactNode, useState } from 'react'

// types
import { PreviewModesType } from '../../types/layout'
import { IComponentSchema, SingleControlSchemaType } from '../../types/editor'

export interface IDistance {
  top: number
  left: number
}

const defaultInformation: {
  isEditorMode: boolean
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
  popupPosition: IDistance
  setPopupPosition: (distance: IDistance) => void
  textMenuPosition: IDistance
  setTextMenuPosition: (distance: IDistance) => void
  focusElementSchema: SingleControlSchemaType | null
  setFocusElementSchema: (schema: IComponentSchema | null) => void
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  isTextMenuShow: boolean
  setIsTextMenuShow: (isShow: boolean) => void
  focusElementHeight: number
  setFocusElementHeight: (height: number) => void
} = {
  isEditorMode: true,
  previewMode: 'lg',
  handlePreviewMode: (mode: PreviewModesType) => console.log(mode),
  popupPosition: { left: 0, top: 0 },
  setPopupPosition: (position) => console.log(position),
  textMenuPosition: { left: 0, top: 0 },
  setTextMenuPosition: (position) => console.log(position),
  focusElementSchema: null,
  setFocusElementSchema: (schema) => console.log(schema),
  isPopupShow: false,
  setIsPopupShow: (isShow) => console.log(isShow),
  isTextMenuShow: false,
  setIsTextMenuShow: (isShow) => console.log(isShow),
  focusElementHeight: 0,
  setFocusElementHeight: (height: number) => {
    console.log(height)
  },
}

export const EditorInfoContext = createContext(defaultInformation)

function EditorInfoContextSection({ children }: { children: ReactNode }) {
  const [previewMode, setPreviewMode] = useState<PreviewModesType>('lg')
  const [focusElementSchema, setFocusElementSchema] = useState<SingleControlSchemaType | null>(null)
  const [focusElementHeight, setFocusElementHeight] = useState<number>(0)

  // Layout show
  const [isPopupShow, setIsPopupShow] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const [isTextMenuShow, setIsTextMenuShow] = useState(false)
  const [textMenuPosition, setTextMenuPosition] = useState({ top: 0, left: 0 })

  const isEditorMode = true

  // operations
  const handlePreviewMode = (mode: PreviewModesType) => {
    setPreviewMode(mode)
  }

  const focusElementSchemaHandler = (schema: IComponentSchema | null) => {
    if (schema?.groupType === 'images') return null
    setFocusElementSchema(schema)
  }

  return (
    <EditorInfoContext.Provider
      value={{
        isEditorMode,
        previewMode,
        handlePreviewMode,
        popupPosition,
        setPopupPosition,
        setTextMenuPosition,
        textMenuPosition,
        focusElementSchema: focusElementSchema,
        setFocusElementSchema: focusElementSchemaHandler,
        isPopupShow,
        setIsPopupShow,
        isTextMenuShow,
        setIsTextMenuShow,
        focusElementHeight,
        setFocusElementHeight,
      }}
    >
      {children}
    </EditorInfoContext.Provider>
  )
}

export default EditorInfoContextSection
