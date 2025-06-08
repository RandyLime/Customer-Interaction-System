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
        Schema::create('user_missions', function (Blueprint $table) {
            $table->integer('id', true);
            $table->unsignedBigInteger('user_id')->index('user_missions_userid_foreign');
            $table->integer('mission_id')->index('mission_id');
            $table->integer('progress')->nullable()->default(0);
            $table->boolean('reward_claimed')->nullable()->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_missions');
    }
};
