<?php

namespace App\Interfaces\Invoices;

interface InvoiceAttachmentRepositoryInterface
{
    public function store($id, $request);


    public function show($id);


    public function destroy($id, $request);
}
