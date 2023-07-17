<?php

namespace App\Http\Controllers;

use App\Interfaces\Invoices\InvoiceAttachmentRepositoryInterface;
use App\Models\InvoiceAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InvoiceAttachmentController extends Controller
{
    private $invoice;

    public function __construct(InvoiceAttachmentRepositoryInterface $invoice)
    {
        $this->invoice = $invoice;
    }

    public function store($id, Request $request)
    {

        return $this->invoice->store($id, $request);
    }

    public function show($id)
    {
        return $this->invoice->show($id);;
    }

    public function destroy($id, Request $request)
    {
        return $this->invoice->destroy($id, $request);
    }
}
