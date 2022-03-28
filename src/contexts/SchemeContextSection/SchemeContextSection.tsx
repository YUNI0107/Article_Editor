import { ReactNode, createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// types
import { IComponentSchema } from '../../types/editor'

const uuid1 = uuidv4()
const uuid2 = uuidv4()

const a: IComponentSchema = {
  uuid: uuid1,
  groupType: 'images',
  type: 'triplicate-square',
  children: [
    {
      props: {
        imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
      },
      controls: ['imgPathControl'],
    },
    {
      props: {
        imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
      },
      controls: ['imgPathControl'],
    },
    {
      props: {
        imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
      },
      controls: ['imgPathControl'],
    },
  ],
}

const b: IComponentSchema = {
  uuid: uuid2,
  groupType: 'images',
  type: 'triplicate-square',
  children: [
    {
      props: {
        imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
      },
      controls: ['imgPathControl'],
    },
    {
      props: {
        imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
      },
      controls: ['imgPathControl'],
    },
    {
      props: {
        imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
      },
      controls: ['imgPathControl'],
    },
  ],
}

const defaultSchemes: {
  schemes: Array<IComponentSchema>
  handleScheme: (newSchemes: Array<IComponentSchema>) => void
} = {
  schemes: [],
  handleScheme: (newSchemes: Array<IComponentSchema>) => {
    console.log(newSchemes)
  },
}
export const SchemeContext = createContext(defaultSchemes)

function SchemeContextSection({ children }: { children: ReactNode }) {
  const [schemes, setSchemes] = useState<Array<IComponentSchema>>([a, b])

  return (
    <SchemeContext.Provider
      value={{
        schemes,
        handleScheme: (newSchemes: Array<IComponentSchema>) => setSchemes([...newSchemes]),
      }}
    >
      {children}
    </SchemeContext.Provider>
  )
}

export default SchemeContextSection