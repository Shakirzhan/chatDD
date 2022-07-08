<?php

namespace app\modules\v1\models;

use yii\db\ActiveRecord;

/**
 * Messages Class for messages table.
 */
class Messages extends ActiveRecord
{
    public function rules()
    {
        return [
            [['send_user_id', 'get_user_id', 'id'], 'number'],
            [['message'], 'string'],
        ];
    }

    public static function tableName()
    {
        return '{{%messages}}';
    }
}