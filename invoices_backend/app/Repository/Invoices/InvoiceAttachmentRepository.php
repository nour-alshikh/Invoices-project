<?php

namespace App\Repository\Invoices;

use App\Interfaces\Invoices\InvoiceAttachmentRepositoryInterface;
use App\Models\InvoiceAttachment;
use Illuminate\Support\Facades\Storage;

class InvoiceAttachmentRepository implements InvoiceAttachmentRepositoryInterface
{
    public function store($id, $request)
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

    public function show($id)
    {
        $invoiceAttachment = InvoiceAttachment::where('invoice_id', '=', $id)->get();

        return response(
            [
                'invoice_details' => $invoiceAttachment
            ]
        );
    }

    public function destroy($id, $request)
    {
        $invoice_attachment = InvoiceAttachment::find($id);
        $invoice_attachment->delete();

        Storage::disk('public_uploads')->delete($request->invoice_number . '/' . $request->file_name);
    }
}
