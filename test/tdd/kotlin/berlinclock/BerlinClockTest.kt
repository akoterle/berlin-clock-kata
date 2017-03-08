import org.joda.time.LocalTime
import org.junit.Test
import kotlin.test.assertEquals

class BerlinClockTest {

    @Test
    fun SingleMinutesRowIsReturned() {
        val clock = BerlinClock()
        val singleMinutesRow = clock.singleMinutesRow(LocalTime.parse("00:00:00"))
        assertEquals("OOOO", singleMinutesRow)
    }
}




