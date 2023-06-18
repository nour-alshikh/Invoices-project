<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoicesArchiveController extends Controller
{
    public function index()
    {

        $invoices = Invoice::onlyTrashed()->get();

        return response([
            'invoices' => $invoices
        ]);
    }

    public function addToArchive($id)
    {
        $invoice = Invoice::find($id);
        $invoice->delete();
        return response("added to archive");
    }

    public function restoreArchive($id)
    {
        $invoice = Invoice::onlyTrashed()->where('id', '=', $id)->restore();

        return response("invoice restored");
    }
}
