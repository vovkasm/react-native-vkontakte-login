import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import LogItem from './LogItem'
import { ILogItem } from './types'

interface IProps {
  logs: ILogItem[]
}

export default class Logs extends React.PureComponent<IProps> {
  render() {
    return <FlatList inverted data={this.props.logs} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
  }

  private renderItem: ListRenderItem<ILogItem> = ({ item }) => <LogItem {...item} />
  private keyExtractor = (item: ILogItem) => item.when.toString()
}
