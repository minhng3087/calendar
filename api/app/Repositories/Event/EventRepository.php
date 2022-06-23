<?php

namespace App\Repositories\Event;

use App\Repositories\Event\EventRepositoryInterface;
use App\Repositories\BaseRepository;

class EventRepository extends BaseRepository implements EventRepositoryInterface 
{
    public function getModel()
    {
        return \App\Models\Event::class;
    }
}