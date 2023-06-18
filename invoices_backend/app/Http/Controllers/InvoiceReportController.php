<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceReportController extends Controller
{
    public function index(Request $request)
    {
        if ($request->radio == 1) {
            if ($request->status && $request->start_at == "" && $request->end_at == "") {
                $invoices = Invoice::where('status', '=', $request->status)->get();
                return response([
                    $request->status => $invoices
                ]);
            } else {
                $start_at = date($request->start_at);
                $end_at = date($request->end_at);
                $invoices = Invoice::whereBetween('invoice_date', [$start_at, $end_at])->where('status', '=', $request->status)->get();
                return response([
                    $request->status => $invoices
                ]);
            }
        } else {
            $invoice = Invoice::where('invoice_number', '=', $request->invoice_number)->get();
            return response([
                "invoice" => $invoice
            ]);
        }
    }
}
