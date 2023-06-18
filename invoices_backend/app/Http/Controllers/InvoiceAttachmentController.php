<?php

namespace App\Http\Controllers;

use App\Models\InvoiceAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InvoiceAttachmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($id, Request $request)
    {
        $invoice_id = $id;
        $file = $request->file('file');
        $file_name = $file->getClientOriginalExtension();

        $invoice_number = $request->invoice_number;

        $attachments = new InvoiceAttachment();
        $attachments->file_name = $file_name;
        $attachments->invoice_number = $invoice_number;
        $attachments->created_by = $request->user;
        $attachments->invoice_id = $invoice_id;
        $attachments->save();

        $fileName = $request->file->getClientOriginalExtension();
        $request->file->move(public_path('attachments/' . $request->$invoice_number), $fileName);

        return response("Attachment Added");
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $invoiceAttachment = InvoiceAttachment::where('invoice_id', '=', $id)->get();

        return response(
            [
                'invoice_details' => $invoiceAttachment
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvoiceAttachment $invoiceAttachment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, Request $request)
    {
        $invoice_attachment = InvoiceAttachment::find($id);
        $invoice_attachment->delete();

        Storage::disk('public_uploads')->delete($request->invoice_number . '/' . $request->file_name);
    }
}
