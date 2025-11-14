<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // id bigint(20) UNSIGNED AUTO_INCREMENT
            $table->foreignId('project_id')->constrained()->cascadeOnDelete(); // project_id index
            $table->string('title'); // title varchar(255)
            $table->text('description')->nullable(); // description text nullable
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete(); // assigned_to index
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete(); // created_by index
            $table->enum('status', ['pending', 'in_progress', 'completed', 'overdue'])->default('pending'); // status enum
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium'); // priority enum
            $table->date('start_date')->nullable(); // start_date
            $table->date('due_date')->nullable(); // due_date
            $table->date('completed_date')->nullable(); // completed_date
            $table->integer('estimated_hours')->nullable(); // estimated_hours
            $table->integer('actual_hours')->nullable(); // actual_hours
            $table->decimal('quality_score', 5, 2)->nullable(); // quality_score
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
