<?php

namespace App\Http\Controllers;

use App\Interfaces\Reports\InvoiceReportRepositoryInterface;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceReportController extends Controller
{
    private $report;

    public function __construct(InvoiceReportRepositoryInterface $report)
    {
        $this->report = $report;
    }
    public function index(Request $request)
    {
        return $this->report->index($request);
    }
}
