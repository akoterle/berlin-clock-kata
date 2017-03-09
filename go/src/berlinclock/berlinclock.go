package berlinclock

import "time"
import "strings"

//ConvertMinutes ...
//Receives a time object and returs its berlin representation
//Berlin clock single minutes row converter
func ConvertMinutes(t time.Time) string {
	if 0 == t.Minute() {
		return "OOOO"
	}
	reminder := t.Minute() % 5
	row := []string{"O", "O", "O", "O"}
	for i := range row {
		if reminder > 0 {
			row[i] = "Y"
			reminder--
		}

	}
	return strings.Join(row, "")
}

//FiveMinutesRow ...
func FiveMinutesRow(t time.Time) string {
	blocks := t.Minute() / 5
	lamp := func(i int, on bool) rune {
		r := 'O'
		if on {
			r = 'Y'
			if 0 == i%3 {
				r = 'R'
			}
		}
		return r
	}
	row := ""
	for i := 0; i < 11; i++ {
		row += string(lamp(i+1, blocks > 0))
		blocks--
	}
	return row
}
