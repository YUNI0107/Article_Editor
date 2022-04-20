import classNames from 'classnames'

// components
import Ruler from '../../../../components/layout/Ruler'

// types
import EditorSection from '../../../../components/layout/EditorSection'
import BackDevice from '../BackDevice'

// contexts
import { useContext } from 'react'
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'
import SchemeContextSection from '../../../../contexts/SchemeContextSection'

function MainEditorContainer() {
  const { previewMode } = useContext(EditorInfoContext)

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center">
      {/* top-ruler */}
      <Ruler />

      {/* bottom-preview */}
      <div
        className={classNames(
          'w-full border-x-[2px] border-dashed border-main-gray-300 transition-all duration-700 flex justify-center overflow-y-auto',
          {
            'max-h-mobile': previewMode === 'sm',
            'max-h-tablet': previewMode === 'md',
            'h-full': previewMode === 'lg',
          }
        )}
      >
        <div
          className={classNames('relative h-full', {
            'w-mobile py-16': previewMode === 'sm',
            'w-tablet py-14': previewMode === 'md',
            'w-desktop': previewMode === 'lg',
          })}
        >
          <div
            className={classNames('relative h-full w-full z-20', {
              'p-4': previewMode === 'md' || previewMode === 'sm',
              'p-6 bg-white': previewMode === 'lg',
            })}
          >
            <SchemeContextSection>
              <EditorSection />
            </SchemeContextSection>
          </div>
        </div>
        <BackDevice />
      </div>
    </div>
  )
}

export default MainEditorContainer
