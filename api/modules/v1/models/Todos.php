<?php

namespace app\modules\v1\models;

use yii\db\ActiveRecord;

/**
 * Todos Class for todos table.
 */
class Todos extends ActiveRecord
{
    public function rules()
    {
        return [
            ['user_id', 'number'],
            [['type', 'title', 'description'], 'string'],
        ];
    }

    public static function tableName()
    {
        return '{{%todos}}';
    }
}