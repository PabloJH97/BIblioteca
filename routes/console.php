<?php

use App\Notifications\LoanLateMail;
use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function(){
    $loans=Loan::where('borrowed', true)->where('is_overdue', false)->where('return_date', '<', date('Y-m-d'))->get();
    if(count($loans)>=1){
        foreach($loans as $loan){
            $loan->forceFill([
                'is_overdue'=>true,
            ])->save();
        }
    }
    $loans=Loan::where('borrowed', true)->where('is_overdue', true)->get();
    if(count($loans)>=1){
        foreach($loans as $loan){
            $user=User::where('id', $loan->user_id)->first();
            $book=Book::where('id', $loan->book_id)->first();
            $user->notify(new LoanLateMail($user, $book));
        }
    }
})->timezone('Europe/Madrid')->cron('0 12 * * *');
