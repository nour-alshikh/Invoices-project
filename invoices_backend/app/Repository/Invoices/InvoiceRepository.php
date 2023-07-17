<?php

namespace App\Repository\Invoices;

use App\Interfaces\Invoices\InvoiceRepositoryInterface;
use App\Models\Invoice;
use App\Models\InvoiceAttachment;
use App\Models\InvoiceDetail;
use App\Models\User;
use App\Notifications\InvoiceAdded;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;

class InvoiceRepository implements InvoiceRepositoryInterface
{
    public function index()
    {
        $invoices = Invoice::all();
        return response([
            'invoices' => $invoices
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($request)
    {
        $invoice = new Invoice;
        $invoice->invoice_number = $request->invoice_number;
        $invoice->invoice_date = $request->invoice_date;
        $invoice->due_date = $request->due_date;
        $invoice->product = $request->product;
        $invoice->section_id = $request->section_id;
        $invoice->amount_collection = $request->amount_collection;
        $invoice->amount_commission = $request->amount_commission;
        $invoice->discount = $request->discount;
        $invoice->rate_vat = $request->rate_vat;
        $invoice->value_vat = $request->value_vat;
        $invoice->total = $request->total;
        $invoice->note = $request->note;
        $invoice->user = $request->user;
        $invoice->status = "unpaid";
        $invoice->value_status = 2;
        $invoice->section = $request->section;

        $invoice->save();

        $invoice_id = Invoice::latest()->first()->id;
        $invoice_details = InvoiceDetail::create([
            'invoice_id' => $invoice_id,
            'invoice_number' => $request->invoice_number,
            'product' => $request->product,
            'section' => $request->section,
            'value_status' => 2,
            'note' => $request->note,
            'user' => $request->user,
        ]);

        if ($request->hasFile('file')) {
            $invoice_id = Invoice::latest()->first()->id;
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
            $request->file->move(public_path('attachments/' . $invoice_number), $fileName);
        }


        // all users

        // $user = User::get();

        // user who created this invoice
        $user = User::where('name', '=', $request->user)->first();

        // admin
        // $user = User::where('roles', '=', ['owner'])->get();

        $invoice = Invoice::latest()->first();

        Notification::send($user, new InvoiceAdded($invoice));


        return response("Invoice Added");
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $invoice = Invoice::find($id);
        return response([
            'invoice' => $invoice
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($request, $id)
    {

        $invoice = Invoice::find($id);

        $invoice->update([
            "invoice_number" => $request->invoice_number,
            "invoice_date" => $request->invoice_date,
            "due_date" => $request->due_date,
            "product" => $request->product,
            "section_id" => $request->section_id,
            "amount_collection" => $request->amount_collection,
            "amount_commission" => $request->amount_commission,
            "discount" => $request->discount,
            "rate_vat" => $request->rate_vat,
            "value_vat" => $request->value_vat,
            "total" => $request->total,
            "note" => $request->note,
            "user" => $request->user,
        ]);

        return response($invoice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $invoice =  Invoice::find($id);

        $attachments = InvoiceAttachment::where('invoice_id', '=', $id)->first();

        if (!empty($attachments->invoice_number)) {
            Storage::disk('public_uploads')->delete($attachments->invoice_number . '/' . $attachments->file_name);
        }
        $invoice->forceDelete();

        return response("invoice deleted");
    }

    public function update_status($request, $id)
    {

        $invoice = Invoice::find($id);

        if ($request->status === 'paid') {

            $invoice->update([
                'status' => $request->status,
                'value_status' => $request->value_status,
                'payment_date' => $request->payment_date,
            ]);

            InvoiceDetail::create([
                'invoice_id' => $invoice->id,
                'invoice_number' => $request->invoice_number,
                'product' => $request->product,
                'section' => $request->section,
                'note' => $request->note,
                'user' => $request->user,
                'status' => $request->status,
                'value_status' => $request->value_status,
                'payment_date' => $request->payment_date,
            ]);
        } else {
            $invoice->update([
                'status' => $request->status,
                'value_status' => $request->value_status,
                'payment_date' => $request->payment_date,
            ]);

            InvoiceDetail::create([
                'invoice_id' => $invoice->id,
                'invoice_number' => $request->invoice_number,
                'product' => $request->product,
                'section' => $request->section,
                'note' => $request->note,
                'user' => $request->user,
                'status' => $request->status,
                'value_status' => $request->value_status,
                'payment_date' => $request->payment_date,
            ]);
        }
    }

    public function show_by_status($status)
    {
        if ($status === 'paid') {

            $invoices = Invoice::where('value_status', '=', 1)->get();
        } else if ($status === 'unpaid') {
            $invoices = Invoice::where('value_status', '=', 2)->get();
        } else {
            $invoices = Invoice::where('value_status', '=', 3)->get();
        }


        return response([
            'invoices' => $invoices
        ]);
    }
}
