<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $year = rand(2021, 2022);
        $month = rand(1, 12);
        $day = rand(1, 28);
        $hour = rand(1, 12);
        $minute = rand(1, 59);
        $second = rand(1, 59);
        $date = Carbon::create($year,$month ,$day , $hour, $minute, $second);
        return [
            'title' => $this->faker->name,
            'start'  => $date->format('Y-m-d H:i:s'),
            'end'  => $date->addWeeks(rand(1, 52))->format('Y-m-d H:i:s')
        ];
    }
}
