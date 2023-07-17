<?php

namespace App\Http\Controllers;

use App\Interfaces\Invoices\InvoiceRepositoryInterface;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    private $invoice;

    public function __construct(InvoiceRepositoryInterface $invoice)
    {
        $this->invoice = $invoice;
    }

    public function index()
    {

        return $this->invoice->index();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->invoice->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->invoice->show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        return $this->invoice->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return $this->invoice->destroy($id);
    }

    public function update_status(Request $request, $id)
    {

        return $this->invoice->update_status($request, $id);
    }

    public function show_by_status($status)
    {
        return $this->invoice->show_by_status($status);
    }
}
