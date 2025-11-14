<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'assigned_to',
        'created_by',
        'status',
        'priority',
        'start_date',
        'due_date',
        'completed_date',
        'estimated_hours',
        'actual_hours',
        'quality_score',
    ];
}
