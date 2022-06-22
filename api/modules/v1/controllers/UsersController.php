<?php

namespace app\modules\v1\controllers;

use app\modules\v1\models\User;
use Yii;

class UsersController extends DefaultController
{

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator']['except'] = ['options'];

        return $behaviors;
    }

    public function actionList()
    {
        $user_id = Yii::$app->user->id;

        return User::find()
        ->select(['id', 'username'])
        ->where('id != :id', ['id' => $user_id])
        ->all();
    }
}