<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Event\EventRepositoryInterface;

class EventController extends Controller
{
    private EventRepositoryInterface $eventRepository;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct(EventRepositoryInterface $eventRepository) 
    {
        $this->eventRepository = $eventRepository;
    }
    public function index()
    {
        return response()->json(
           $this->eventRepository->getAll()
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->eventRepository->create($request->all());
        return response()->json([
            'message' => 'Create Successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json($this->eventRepository->find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->eventRepository->update($id, $request->all());
        return response()->json([
            'message' => 'Edit Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->eventRepository->delete($id);
        return response()->json([
            'message' => 'Delete Successfully'
        ]);
    }
}
