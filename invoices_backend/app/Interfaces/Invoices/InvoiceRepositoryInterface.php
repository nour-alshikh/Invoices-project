<?php

namespace App\Interfaces\Invoices;

interface InvoiceRepositoryInterface
{
    public function index();
    public function store($request);
    public function show($id);
    public function update($request, $id);
    public function destroy($id);
    public function update_status($request, $id);
    public function show_by_status($status);
}
