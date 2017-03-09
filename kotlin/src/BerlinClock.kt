import org.joda.time.LocalTime

class BerlinClock {
    fun singleMinutesRow(dateTime: LocalTime): String {
        val minuteOfHour = dateTime.minuteOfHour
        if (minuteOfHour == 0)
            return "OOOO"
        return ""
    }
}