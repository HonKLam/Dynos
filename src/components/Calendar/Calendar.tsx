import { View, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'

import MemoModal from '@/components/Memos/MemoModal'
import useCalendar from '@/hooks/useCalendar'
import { useTheme } from '@react-navigation/native'

export default () => {
  const { markedDates, openActionSheet, isVisible, handleSubmit, handleCancel, text, updateText } = useCalendar()
  const { colors, dark } = useTheme()

  // Force Rerender
  const calendarKey = dark ? 'dark' : 'light'

  return (
    <View key={calendarKey} style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: colors.card,
          calendarBackground: colors.card,
          textSectionTitleColor: colors.primary,
          dayTextColor: colors.text,
          todayTextColor: colors.primary,
          selectedDayTextColor: colors.background,
          monthTextColor: colors.text,
          textDisabledColor: colors.border,
          dotColor: colors.primary,
          selectedDotColor: colors.notification,

          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
        }}
        onDayPress={(day) => openActionSheet(day)}
        maxDate={new Date().toISOString().split('T')[0]}
        markedDates={markedDates}
        markingType="custom"
        disableMonthChange
        showSixWeeks={true}
      />
      <MemoModal
        isVisible={isVisible}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        text={text}
        setText={updateText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15,
    paddingTop: 30,
  },
  calendar: {
    borderRadius: 20,
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
  },
})
