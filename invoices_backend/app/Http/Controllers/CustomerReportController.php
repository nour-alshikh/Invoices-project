<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class CustomerReportController extends Controller
{
    public function index(Request $request)
    {
        if ($request->section_id && $request->product && $request->start_at == "" && $request->end_at == "") {
            $invoices = Invoice::where('section_id', '=', $request->section_id)->where('product', '=', $request->product)->get();
            return response([
                "invoices" => $invoices
            ]);
        } else {
            $start_at = date($request->start_at);
            $end_at = date($request->end_at);
            $invoices = Invoice::whereBetween('invoice_date', [$start_at, $end_at])->where('section_id', '=', $request->section_id)->where('product', '=', $request->product)->get();
            return response([
                $request->status => $invoices
            ]);
        }
    }
}
