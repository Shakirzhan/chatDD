<?php
namespace app\api\modules\v1\controllers;

use app\api\modules\v1\models\User;

class UsersController extends DefaultController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator']['except'] = ['options'];

        return $behaviors;
    }
    // We are using the regular web app modules:
    public function actionList()
    {
        return User::find()->all();
    }
}