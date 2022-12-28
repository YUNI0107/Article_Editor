import { useContext, useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import FontSize from '../../../tiptap/extension-font-size'
import LineHeight from '../../../tiptap/extension-line-height'

// types
import { IComponentSchema } from '../../../types/editor'
import { IDistance } from '../../../contexts/EditorInfoContextSection/EditorInfoContextSection'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'
import { TextPopupContext } from '../../../contexts/TextPopupContextSection/TextPopupContextSection'

// utils
import getSelectionPosition from '../../../utils/getSelectionPosition'
import SimpleTextEditor from '../../layout/SimpleTextEditor'

function BasicEditorContent({
  schema,
  controlName,
}: {
  schema: IComponentSchema
  controlName: string
}) {
  const { uuid } = schema
  const { controlHandler } = useContext(SchemaContext)
  const {
    setStyleSelected,
    needUpdate,
    setNeedUpdate,
    setFontSize,
    setLineHeight,
    setLineHeightType,
    focusTextEditor,
    setFocusTextEditor,
  } = useContext(TextPopupContext)
  const [isTextMenuShow, setIsTextMenuShow] = useState(false)
  const [textMenuPosition, setTextMenuPosition] = useState<IDistance>({ top: 0, left: 0 })
  const editorElement = useRef<HTMLDivElement | null>(null)

  // Text editor data
  const extensions = [
    StarterKit,
    Underline,
    FontSize,
    LineHeight,
    TextStyle,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ]
  const defaultHTMLContent = '<p>Hello World!</p>'

  const editor = useEditor({
    extensions,
    content: defaultHTMLContent,
    onBlur({ editor, event }) {
      controlHandler?.changeValue(controlName, JSON.stringify(editor.getJSON()), uuid)
      const targetElement = event.relatedTarget

      if (!(targetElement && editorElement.current?.contains(targetElement as Node))) {
        setIsTextMenuShow(false)
      }
    },
    onUpdate({ editor }) {
      if (editor.isFocused) {
        updatePopup(editor)
      }
    },
    onSelectionUpdate({ editor, transaction }) {
      if (editor.isFocused) {
        updatePopup(editor)
      }

      if (transaction.selection.empty) {
        setIsTextMenuShow(false)
      } else {
        const element = editorElement.current
        const position = getSelectionPosition(element?.getBoundingClientRect())

        if (position) {
          setTextMenuPosition(position)
          setIsTextMenuShow(true)
        }
      }
    },
    onFocus({ editor }) {
      setFocusTextEditor(editor.options.element)
    },
  })

  // operations
  const updatePopup = (editor: Editor) => {
    setStyleSelected({
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      underline: editor.isActive('underline'),
      alignLeft: editor.isActive({ textAlign: 'left' }),
      alignCenter: editor.isActive({ textAlign: 'center' }),
      alignRight: editor.isActive({ textAlign: 'right' }),
      listOrdered: editor.isActive('orderList'),
      listUnOrdered: editor.isActive('bulletList'),
    })

    const element = window.getComputedStyle(editor.options.element)
    const defaultFontSize = element.fontSize.split('px')?.[0]

    const defaultLinHeight = element.lineHeight.split('px')?.[0]

    console.log(
      "editor.getAttributes('textStyle').lineHeight",
      editor.getAttributes('textStyle').lineHeight
    )
    setFontSize(editor.getAttributes('textStyle').fontSize || parseFloat(defaultFontSize) || 0)
    setLineHeight(editor.getAttributes('textStyle').lineHeight || parseFloat(defaultLinHeight) || 0)
  }

  useEffect(() => {
    const previousJsonString = controlHandler?.getValue(controlName, uuid) as string

    if (!previousJsonString || !editor) return

    try {
      const previousJSON = JSON.parse(previousJsonString)
      editor.commands.setContent(previousJSON)
    } catch (error) {
      console.error(error)
    }
  }, [editor])

  useEffect(() => {
    console.log('needUpdate', needUpdate)
    if (needUpdate && editor) {
      if (editor.options.element === focusTextEditor) {
        for (const key in needUpdate) {
          switch (key) {
            case 'bold':
              editor.chain().focus().toggleBold().run()
              break
            case 'italic':
              editor.chain().focus().toggleItalic().run()
              break
            case 'underline':
              editor.chain().focus().toggleUnderline().run()
              break
            case 'alignLeft':
              editor.chain().focus().setTextAlign('left').run()
              break
            case 'alignCenter':
              editor.chain().focus().setTextAlign('center').run()
              break
            case 'alignRight':
              editor.chain().focus().setTextAlign('right').run()
              break
            case 'listOrdered':
              console.log('toggleOrderedList')
              editor.chain().focus().toggleOrderedList().run()
              break
            case 'listUnOrdered':
              console.log('toggleBulletList')
              editor.chain().focus().toggleBulletList().run()
              break
            case 'fontSize':
              editor
                .chain()
                .focus()
                .setFontSize(needUpdate[key] as number)
                .run()
              break
            case 'lineHeight':
              if (needUpdate[key] === null) {
                editor.chain().focus().unsetLineHeight().run()

                setLineHeightType('auto')
              } else {
                editor
                  .chain()
                  .focus()
                  .setLineHeight(needUpdate[key] as number)
                  .run()

                setLineHeightType('custom')
              }
              break
            default:
              break
          }
        }
      }

      setNeedUpdate(null)
    }
  }, [needUpdate, editor, focusTextEditor])

  return (
    <div className="relative" ref={editorElement}>
      <EditorContent editor={editor} />
      {isTextMenuShow && <SimpleTextEditor editor={editor} distance={textMenuPosition} />}
    </div>
  )
}

export default BasicEditorContent
