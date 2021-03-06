<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%todos}}`.
 */
class m220708_095350_create_todos_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%todos}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'type' => $this->string(),
            'title' => $this->string(),
            'description' => $this->string(),
            'index' => $this->integer(),
            'status' => $this->integer(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%todos}}');
    }
}
