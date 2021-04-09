// Utilities
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default function (sections = []) {
  return {
    name: 'LoadSections',

    // Iterates the provide list of components
    // and returns a function that returns a
    // Promise.
    components: sections.reduce((acc, cur) => {
      const name = upperFirst(camelCase(cur))

      acc[`Section${name}`] = () => import(`@/views/sections/${name}.vue`)

      return acc
    }, {}),

    data: () => ({ sections }),
  }
}
