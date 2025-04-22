<?php

namespace App\Notifications;

use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationMail extends Notification
{
    use Queueable;
    public $user, $book;
    /**
     * Create a new notification instance.
     */
    public function __construct(User $user, Book $book)
    {
        $this->user=$user;
        $this->book=$book;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Libro disponible')
            ->subject('¡Buenas!')
            ->line('Buenos días, '.$this->user->name.', el libro '.$this->book->title.' ya se encuentra disponible.')
            ->action('Visite nuestra biblioteca', url('/'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
