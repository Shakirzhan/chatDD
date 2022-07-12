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
 * @property string $status
 */
class Todos extends ActiveRecord
{

    const ACTIVE_STATUS = 1;
    const REMOVED_STATUS = 0;

    public function rules()
    {
        return [
            [['user_id', 'status'], 'number'],
            [['type', 'title', 'description'], 'string'],
        ];
    }

    public static function tableName()
    {
        return '{{%todos}}';
    }
}