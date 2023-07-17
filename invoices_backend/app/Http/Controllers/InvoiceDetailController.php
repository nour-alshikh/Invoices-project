<?php

namespace App\Http\Controllers;

use App\Interfaces\Invoices\InvoiceDetailRepositoryInterface;
use App\Models\InvoiceDetail;

class InvoiceDetailController extends Controller
{
    private $invoice;

    public function __construct(InvoiceDetailRepositoryInterface $invoice)
    {
        $this->invoice = $invoice;
    }

    public function show($id)
    {
        return $this->invoice->show($id);
    }
}
