<?php

namespace App\Repositories;

use App\Interfaces\EventRepositoryInterface;
use App\Models\Event;

class EventRepository implements EventRepositoryInterface 
{
    public function getAllEvents() 
    {
        return Event::all();
    }

    public function deleteEvent($orderId) 
    {
        Event::destroy($orderId);
    }

    public function createEvent($event) 
    {
        return Event::create($orderDetails);
    }

    public function updateEvent($eventId, $event) 
    {
        return Event::find($eventId)->update($event);
    }

}