<?php

namespace app\modules\v1\models;

use yii\db\ActiveRecord;

/**
 * Todos Class for todos table.
 * @property string $title
 * @property string $description
 * @property string $type
 * @property string $user_id
 * @property string $index
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