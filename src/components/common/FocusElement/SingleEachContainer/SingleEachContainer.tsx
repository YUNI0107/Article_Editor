// components
import BannerComponent from '../../../element/BannerComponent'

// types
import { ISingleSchema } from '../../../../types/editor'

interface IEachContainer {
  schema: ISingleSchema
  PopupShowHandler: () => void
  isButtonShow: boolean
  distance: { top: number; left: number }
}

function EachContainer(props: IEachContainer) {
  const { schema } = props

  switch (schema.groupType) {
    case 'banner':
      return <BannerComponent {...props} schema={schema} />
    default:
      return <></>
  }
}

export default EachContainer
