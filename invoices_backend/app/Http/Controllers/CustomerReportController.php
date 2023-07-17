<?php

namespace App\Http\Controllers;

use App\Interfaces\Reports\CustomerReportRepositoryInterface;
use Illuminate\Http\Request;

class CustomerReportController extends Controller
{
    private $report;

    public function __construct(CustomerReportRepositoryInterface $report)
    {
        $this->report = $report;
    }
    public function index(Request $request)
    {
        return $this->report->index($request);
    }
}
