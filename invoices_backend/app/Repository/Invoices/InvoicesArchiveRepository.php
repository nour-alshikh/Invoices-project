<?php

namespace App\Repository\Invoices;

use App\Interfaces\Invoices\InvoicesArchiveRepositoryInterface;
use App\Models\Invoice;

class InvoicesArchiveRepository implements InvoicesArchiveRepositoryInterface
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

    public function deleteArchived($id)
    {
        $invoice = Invoice::onlyTrashed()->where('id', '=', $id)->get();

        $invoice->forceDelete();
        return response("Deleted");
    }
}
