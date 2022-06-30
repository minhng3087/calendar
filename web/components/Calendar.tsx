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
import styles from '../styles/components/Calendar.module.scss'
import { openCustomNotificationWithIcon } from './common/notification'

interface CalendarElement {
  id?: Number,
  title: String,
  start: Object,
  end: Object
}

const Calendar: React.FC = () => {
  
  const [events, setEvents] = useState([] as any)
  const [eventEdit, setEventEdit] = useState(false)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const [form] = Form.useForm()

  const showModal = (arg: any) => {
    if(arg.event){
      axios.get(`${process.env.SERVER}/events/${arg.event.id}`).then(res => {
        form.setFieldsValue({
          id: res.data.id,
          title: res.data.title,
          start_time: moment(res.data.start),
          end_time: moment(res.data.end),
        })
      })
      setEventEdit(true)
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const onSubmit = (values: any) => {
    const data : CalendarElement = {
      title: values.title,
      start: values.start_time && moment(values.start_time._d).format(dateFormat),
      end: values.end_time && moment(values.end_time._d).format(dateFormat)
    }
    if(eventEdit) {
      axios.put(`${process.env.SERVER}/events/${values.id}`, data).then(res => {
        const updatedItem = events.map((todo: CalendarElement) => {
          return todo.id === values.id ? data : todo
        })
        setEvents(updatedItem)
        openCustomNotificationWithIcon('success', res.data.message)
      }).catch(function (response) {
        console.log(response)
      })
      setEventEdit(false)
    }else {
      axios.post(`${process.env.SERVER}/events`, data).then(res => {
        setEvents([...events, data])
        openCustomNotificationWithIcon('success', res.data.message)
      }).catch(function (response) {
        console.log(response)
      })
    }
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDelete = () => {
    const id = form.getFieldValue('id')
    axios.delete(`${process.env.SERVER}/events/${id}`).then(res => {
      const updatedItem = events.filter((event: CalendarElement) => {
        return event.id !== id
      })
      setEvents(updatedItem)
      openCustomNotificationWithIcon('success', res.data.message)
    }).catch(function (response) {
      console.log(response)
    })
    setIsModalVisible(false)
    form.resetFields()
  }

  useEffect(() => {
    axios.get(`${process.env.SERVER}/events`).then(res => {
      setEvents(res.data)
    })
  }, [])

  return (
    <div className="container mx-auto relative mt-2">
      <Button type="primary" onClick={showModal} size="large" className={styles.button + ' absolute border-solid border-2 rounded-sm'}>
        Add Event
      </Button>

      <FullCalendar
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
        ]}
        titleFormat={{ year: 'numeric', month: 'long' }}
        selectable={true}
        editable={true}
        events={events}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventClick={showModal}
      />

      <Modal 
        title={eventEdit ? 'Edit Event' : 'New Event'}
        visible={isModalVisible} 
        // onOk={form.submit}
        onCancel={handleCancel}
        // footer={[
        //   <Button type="primary" danger>
        //     Delete
        //   </Button>
        // ]}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          eventEdit && <Button key="submit" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
          <Button
            onClick={form.submit}
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        <Form onFinish={onSubmit} form={form}>
          <Form.Item
            name="id"
            hidden={true}
          >
            <Input />
          </Form.Item>
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