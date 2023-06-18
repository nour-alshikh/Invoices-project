<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'invoice_date',
        'due_date',
        'product',
        'section_id',
        'amount_collection',
        'amount_commission',
        'discount',
        'rate_vat',
        'value_vat',
        'total',
        'note',
        'user',
        'status',
        'value_status',
    ];

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }
}
