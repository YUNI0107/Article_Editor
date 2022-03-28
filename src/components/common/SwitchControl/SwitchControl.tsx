// type
import { IControlProps, IControls } from '../../../types/editor'

// components
import ImgPathControl from '../../controls/ImgPathControl'

function SwitchControl({
  control,
  props,
  order,
  uuid,
}: {
  control: IControls
  props: IControlProps
  order?: number
  uuid: string
}) {
  switch (control) {
    case 'imgPathControl':
      return <ImgPathControl {...props} order={order} uuid={uuid} />
    default:
      return <></>
  }
}

export default SwitchControl