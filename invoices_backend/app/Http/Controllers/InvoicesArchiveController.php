<?php

namespace App\Http\Controllers;

use App\Interfaces\Invoices\InvoicesArchiveRepositoryInterface;

class InvoicesArchiveController extends Controller
{
    private $invoice;

    public function __construct(InvoicesArchiveRepositoryInterface $invoice)

    {
        $this->invoice = $invoice;
    }
    public function index()
    {
        return $this->invoice->index();
    }

    public function addToArchive($id)
    {
        return $this->invoice->addToArchive($id);
    }

    public function restoreArchive($id)
    {
        return $this->invoice->restoreArchive($id);
    }

    public function deleteArchived($id)
    {
        return $this->invoice->deleteArchived($id);
    }
}
