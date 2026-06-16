<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BilliardTable;
use Inertia\Inertia;
use Inertia\Response;

class TableAvailabilityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/TableAvailability', [
            'tables' => BilliardTable::orderBy('table_number')->get(),
        ]);
    }
}
