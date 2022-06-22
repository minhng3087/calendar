<?php

namespace App\Interfaces;

interface EventRepositoryInterface 
{
    public function getAllEvents();
    public function createEvent($event);
    public function updateEvent($eventId, $event);
    public function deleteEvent($eventId);
}