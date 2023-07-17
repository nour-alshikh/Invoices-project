<?php

namespace App\Repository\Invoices;

use App\Interfaces\Invoices\InvoiceDetailRepositoryInterface;
use App\Models\InvoiceDetail;

class InvoiceDetailRepository implements InvoiceDetailRepositoryInterface
{
    public function show($id)
    {
        $invoiceDetail = InvoiceDetail::where('invoice_id', '=', $id)->get();

        return response(
            [
                'invoice_details' => $invoiceDetail
            ]
        );
    }
}
