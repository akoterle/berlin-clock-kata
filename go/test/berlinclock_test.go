package berlinclock_test

import (
	"testing"
	"time"

	"berlinclock"
)

func checkSingleMinutesRow(timestr string, expected string) func(t *testing.T) {
	return func(t *testing.T) {
		timeFormat := "15:04:05"
		digitalTime, error := time.Parse(timeFormat, timestr)
		got := berlinclock.ConvertMinutes(digitalTime)
		if (error != nil) || (expected != got) {
			t.Errorf("Got %s, expected %s", got, expected)
		}
	}
}

func checkFimeMinutesRow(timestr string, expected string) func(t *testing.T) {
	return func(t *testing.T) {
		timeFormat := "15:04:05"
		digitalTime, error := time.Parse(timeFormat, timestr)
		got := berlinclock.FiveMinutesRow(digitalTime)
		if (error != nil) || (expected != got) {
			t.Errorf("Got %s, expected %s", got, expected)
		}

	}
}

func TestBerlinClock(t *testing.T) {

	t.Run("Single Minutes Row", func(t *testing.T) {
		t.Run("Is OOOO when time is 00:00:00", checkSingleMinutesRow("00:00:00", "OOOO"))
		t.Run("Is YYYY when time is 23:59:59", checkSingleMinutesRow("23:59:59", "YYYY"))
		t.Run("Is YYOO when time is 12:32:00", checkSingleMinutesRow("12:32:00", "YYOO"))
		t.Run("Is YYYY when time is 12:34:00", checkSingleMinutesRow("12:34:00", "YYYY"))
		t.Run("Is OOOO when time is 12:35:00", checkSingleMinutesRow("12:35:00", "OOOO"))
	})

	t.Run("Five Minutes Row", func(t *testing.T) {
		t.Run("Is OOOOOOOOOOO when time is 00:00:00", checkFimeMinutesRow("00:00:00", "OOOOOOOOOOO"))
		t.Run("Is YYRYYRYYRYY when time is 23:59:59", checkFimeMinutesRow("23:59:59", "YYRYYRYYRYY"))
		t.Run("Is OOOOOOOOOOO when time is 12:04:00", checkFimeMinutesRow("12:04:00", "OOOOOOOOOOO"))
		t.Run("Is YYRYOOOOOOO when time is 12:23:00", checkFimeMinutesRow("12:23:00", "YYRYOOOOOOO"))
		t.Run("Is YYRYYRYOOOO when time is 12:35:00", checkFimeMinutesRow("12:35:00", "YYRYYRYOOOO"))
	})
}
