import { Button, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useEffect, useState } from 'react';
import Container from '../components/Container';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';



const Event: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.events)
    const {user} = useTypedSelector(state => state.auth)

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        fetchGuests()   
        fetchEvents(user.username)     
    }, [])

    const addNewEvent = (event: IEvent) => {
        createEvent(event)
        setIsModalVisible(false);
    }

    return (
        <Container>
            <EventCalendar events={events}/>
            <Row justify='center'>
                <Button onClick={showModal}>Добавить событие</Button>
            </Row>
            <Modal title="Добавить событие" visible={isModalVisible} footer={null} onCancel={() => handleCancel()}>
                <EventForm 
                    guests={guests} 
                    submit={addNewEvent}
                />
            </Modal>
        </Container>
    );
};

export default Event;