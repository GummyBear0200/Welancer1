<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User; // make sure to import User

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'created_by',
        'status',
        'priority',
        'start_date',
        'due_date',
        'completed_date',
        'progress',
    ];

    // Relation to tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // Relation to the user who created the project
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
