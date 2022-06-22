import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import { Modal, DatePicker, Form, Input } from 'antd'
import moment from 'moment'

const Calendar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [form] = Form.useForm()

  const showModal = (arg) => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const onSubmit = (values) => {
    console.log(moment(values.startDate._d).format('MM/DD/YYYY'))
  }

  return (
    <>
      <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
        ]}
        titleFormat={{ year: 'numeric', month: 'long' }}
        editable={true}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        dateClick={showModal}
      />

      <Modal 
        title="New Title"
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
            name="startDate"
            label="Start Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker showTime/>
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker showTime/>
          </Form.Item>
        </Form>
      </Modal>
    </>
    
  )
}

export default Calendar