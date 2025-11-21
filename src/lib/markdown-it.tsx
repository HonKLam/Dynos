import MarkdownIt from 'markdown-it'
import { tasklist } from '@mdit/plugin-tasklist'
import { Text, View } from 'react-native'
import CheckBox from 'expo-checkbox'
import { ASTNode } from 'react-native-markdown-display'

export const md = new MarkdownIt()

md.use(tasklist, { label: true })

export const rules = {
  checkbox_input: (node: ASTNode) => {
    const checked = node.attributes?.checked ?? false
    return (
      <CheckBox
        key={node.key}
        value={checked ? true : false}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
      />
    )
  },
  label: (node: ASTNode, children: React.ReactNode[]) => {
    return (
      <View key={node.key}>
        <Text>{children}</Text>
      </View>
    )
  },
}
