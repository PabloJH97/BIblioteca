<?php

use Domain\Loans\Models\Loan;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function(){
    $loans=Loan::where('borrowed', true)->where('is_overdue', false)->where('return_date', '<', date('Y-d-m'))->get();
    foreach($loans as $loan){
        $loan->forceFill([
            'is_overdue'=>true,
        ])->save();
    }
})->timezone('Europe/Madrid')->cron('50 * * * *');
