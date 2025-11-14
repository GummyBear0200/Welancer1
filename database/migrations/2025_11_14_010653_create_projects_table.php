<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id(); // id BIGINT UNSIGNED AUTO_INCREMENT
            $table->string('name'); // name VARCHAR(255)
            $table->text('description')->nullable(); // description TEXT NULLABLE
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete(); // created_by BIGINT UNSIGNED
            $table->enum('status', ['pending', 'in_progress', 'completed', 'on_hold'])->default('pending'); // status ENUM
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium'); // priority ENUM
            $table->date('start_date')->nullable(); // start_date DATE NULLABLE
            $table->date('due_date')->nullable(); // due_date DATE NULLABLE
            $table->date('completed_date')->nullable(); // completed_date DATE NULLABLE
            $table->decimal('progress', 5, 2)->default(0.00); // progress DECIMAL(5,2) DEFAULT 0.00
            $table->timestamps(); // created_at & updated_at TIMESTAMP
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
