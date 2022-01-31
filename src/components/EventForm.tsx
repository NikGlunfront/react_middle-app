import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Moment } from 'moment';
import React, { FC, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {

    const {user} = useTypedSelector(state => state.auth)

    const [event, setEvent] = useState<IEvent>({
        author: "",
        date: '',
        description: '',
        guest: '',
    } as IEvent)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date?.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <div>
            <Form onFinish={submitForm}>
                <Form.Item
                    label="Описание события"
                    name="description"
                    rules={[rules.required()]}
                >
                    <Input 
                        value={event.description}
                        onChange={(e) => setEvent({...event, description: e.target.value})} 
                    />
                </Form.Item>
                <Form.Item
                    label="Дата события"
                    name="date"
                    rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}
                >
                    <DatePicker
                        onChange={(date) => selectDate(date)}
                        style={{ width: '100%' }} 
                    
                    />
                </Form.Item>
                <Form.Item
                    label="Выберите пользователя"
                    name="guestname"
                    rules={[rules.required()]}
                >
                    <Select 
                        onChange={(guest: string) => setEvent({...event, guest})}
                        defaultValue="Выберите пользователя" 
                        style={{ width: '100%' }}
                    >
                        {props.guests.map(guest =>
                            <Select.Option key={guest.username} value={guest.username}>
                                {guest.username}
                            </Select.Option>    
                        )}
                    </Select>
                </Form.Item>
                <Row justify='end'>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Добавить событие
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    );
};

export default EventForm;