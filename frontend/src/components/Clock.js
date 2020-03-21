import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Text } from 'rebass'

const Clock = ({format}) => {
  const [date, setDate] = useState(dayjs().valueOf())
  useEffect(() => {
    const clearIntervalId = setInterval(() => {
      setDate(dayjs().valueOf())
    }, 1000)
    return function cleanUp() {
      clearInterval(clearIntervalId)
    }
  }, [])
  return (
    <Text color="primary">{`Date: ${dayjs(date).format(format)}`}</Text>
  )
}

export default Clock