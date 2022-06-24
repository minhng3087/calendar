import React, { useState, useEffect } from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import { Modal, DatePicker, Form, Input, Button} from 'antd'
import moment from 'moment'
import axios from 'axios'
import styles from '../styles/Calendar.module.scss'
import { openCustomNotificationWithIcon } from './common/notification'

const Calendar = () => {
  const [events, setEvents] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const onSubmit = (values) => {
    const data = {
      title: values.title,
      start: moment(values.start_time._d).format(dateFormat),
      end: moment(values.end_time._d).format(dateFormat)
    }
    axios.post(`${process.env.SERVER}/events`, data).then(res => {
      openCustomNotificationWithIcon('success', res.data.message)
    }).catch(function (response) {
      console.log(response)
    })
    setIsModalVisible(false)
    form.resetFields()
  }

  useEffect(() => {
    const data = axios.get(`${process.env.SERVER}/events`).then(res => {
      setEvents(res.data)
    })
  }, [])

  return (
    <div className="container mx-auto relative">
      <Button type="primary" onClick={showModal} className={styles.button + ' absolute top-9 border-solid border-2 rounded-sm'}>
        Add Event
      </Button>

      <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
        ]}
        titleFormat={{ year: 'numeric', month: 'long' }}
        editable={true}
        events={events}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />

      <Modal 
        title="New Event"
        visible={isModalVisible} 
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form onFinish={onSubmit} form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="start_time"
            label="Start Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker 
              showTime 
            />
          </Form.Item>
          <Form.Item
            name="end_time"
            label="End Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker 
              showTime 
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Calendar