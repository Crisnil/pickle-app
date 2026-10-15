<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    public function ping(): JsonResponse
    {
        $dbTime = DB::select('select now() as now')[0]->now;

        return response()->json([
            'status' => 'ok',
            'service' => 'picklematch-api',
            'db_connected' => true,
            'db_time' => $dbTime,
        ]);
    }
}
