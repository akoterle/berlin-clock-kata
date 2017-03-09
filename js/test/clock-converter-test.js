'use strict'

var chai = require('chai')
var expect = chai.expect
var ClockConverter = require('../src/clock-converter')
var it = require('mocha').it
var describe = require('mocha').describe

describe('ClockConverter', function () {
  let parseTime = function (stringTime) {
    return new Date(Date.parse('Thu, 01 Jan 1970 ' + stringTime))
  }
  let converter = new ClockConverter()
  let convertTime = function (stringTime) {
    return converter.convert(parseTime(stringTime))
  }
  describe('Single Minutes Row', function () {
    let testCases = [
      { givenTime: '00:00:00', expectedRow: 'OOOO' },
      { givenTime: '23:59:59', expectedRow: 'YYYY' },
      { givenTime: '12:32:00', expectedRow: 'YYOO' },
      { givenTime: '12:34:00', expectedRow: 'YYYY' },
      { givenTime: '12:35:00', expectedRow: 'OOOO' }
    ]
    testCases.forEach(function (testCase) {
      it('Time: ' + testCase.givenTime +
        ' => Row: ' + testCase.expectedRow, function () {
        let berlinTime = convertTime(testCase.givenTime)
        expect(berlinTime.minutesRow).to
            .equal(testCase.expectedRow)
      })
    })
  })

  describe('Five Minutes Row', function () {
    let testCases = [
      { givenTime: '00:00:00', expectedRow: 'OOOOOOOOOOO' },
      { givenTime: '23:59:59', expectedRow: 'YYRYYRYYRYY' },
      { givenTime: '12:04:00', expectedRow: 'OOOOOOOOOOO' },
      { givenTime: '12:23:00', expectedRow: 'YYRYOOOOOOO' },
      { givenTime: '12:35:00', expectedRow: 'YYRYYRYOOOO' }
    ]

    testCases.forEach(function (testCase) {
      it('Time: ' + testCase.givenTime +
        ' => Row: ' + testCase.expectedRow, function () {
        let berlinTime = convertTime(testCase.givenTime)
        expect(berlinTime.fiveMinutesRow).to
            .equal(testCase.expectedRow)
      })
    })
  })

  describe('Single Hours Row', function () {
    let testCases = [
      { givenTime: '00:00:00', expectedRow: 'OOOO' },
      { givenTime: '23:59:59', expectedRow: 'RRRO' },
      { givenTime: '02:04:00', expectedRow: 'RROO' },
      { givenTime: '08:23:00', expectedRow: 'RRRO' },
      { givenTime: '14:35:00', expectedRow: 'RRRR' }
    ]
    testCases.forEach(function (testCase) {
      it('Time: ' + testCase.givenTime +
        ' => Row: ' + testCase.expectedRow, function () {
        let berlinTime = convertTime(testCase.givenTime)
        expect(berlinTime.hoursRow).to
            .equal(testCase.expectedRow)
      })
    })
  })

  describe('Five Hours Row', function () {
    let testCases = [
      { givenTime: '00:00:00', expectedRow: 'OOOO' },
      { givenTime: '23:59:59', expectedRow: 'RRRR' },
      { givenTime: '02:04:00', expectedRow: 'OOOO' },
      { givenTime: '08:23:00', expectedRow: 'ROOO' },
      { givenTime: '16:35:00', expectedRow: 'RRRO' }
    ]
    testCases.forEach(function (testCase) {
      it('Time: ' + testCase.givenTime +
        ' => Row: ' + testCase.expectedRow, function () {
        let berlinTime = convertTime(testCase.givenTime)
        expect(berlinTime.fiveHoursRow).to
            .equal(testCase.expectedRow)
      })
    })
  })

  describe('Seconds lamp', function () {
    it('The seconds lamp is illuminated on even seconds', function () {
      let berlinTime = convertTime('00:00:00')
      expect(berlinTime.seconds).to
        .equal('Y')
    })
    it('The seconds lamp is of on odd seconds', function () {
      let berlinTime = convertTime('23:59:59')
      expect(berlinTime.seconds).to
        .equal('O')
    })
  })

  describe('Entire Berlin Clock', function () {
    let testCases = [
      { givenTime: '00:00:00', expectedRow: 'YOOOOOOOOOOOOOOOOOOOOOOO' },
      { givenTime: '23:59:59', expectedRow: 'ORRRRRRROYYRYYRYYRYYYYYY' },
      { givenTime: '16:50:06', expectedRow: 'YRRROROOOYYRYYRYYRYOOOOO' },
      { givenTime: '11:37:01', expectedRow: 'ORROOROOOYYRYYRYOOOOYYOO' }
    ]
    testCases.forEach(function (testCase) {
      it('Digital Time: ' + testCase.givenTime +
        ' => Berlin Time: ' + testCase.expectedRow, function () {
        let berlinTime = convertTime(testCase.givenTime)
        expect(berlinTime.time).to
            .equal(testCase.expectedRow)
      })
    })
  })
})
