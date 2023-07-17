<?php

namespace App\Interfaces\Invoices;

interface InvoicesArchiveRepositoryInterface
{
    public function index();
    public function addToArchive($id);
    public function restoreArchive($id);
    public function deleteArchived($id);
}
