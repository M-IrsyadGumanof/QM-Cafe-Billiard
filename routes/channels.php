<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

/**
 * Private channel untuk notifikasi real-time per customer.
 * Hanya customer dengan user_id yang cocok yang diizinkan masuk.
 *
 * Frontend listen: Echo.private(`customer.${auth.user.id}`)
 */
Broadcast::channel('customer.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});
