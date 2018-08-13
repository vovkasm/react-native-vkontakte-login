import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ILogItem } from './types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  who: {
    fontSize: 10,
    width: 55,
  },
  when: {
    fontSize: 10,
    width: 45,
  },
  message: {
    flex: 1,
    fontSize: 10,
  },
})

const LogItem: React.SFC<ILogItem> = (props) => {
  const { when, who, message, error } = props
  const textColor = { color: error ? '#d95b57' : '#507299' }
  const time = format(when, 'HH:mm:ss')
  return (
    <View style={styles.container}>
      <Text style={[styles.when, textColor]}>{time}</Text>
      <Text style={[styles.who, textColor]}>{who}</Text>
      <Text style={[styles.message, textColor]}>{message}</Text>
    </View>
  )
}

export default LogItem
