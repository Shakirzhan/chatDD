<?php

namespace app\modules\v1\controllers;

use app\modules\v1\forms\LoginForm;
use app\modules\v1\forms\SignupForm;
use app\modules\v1\models\Statuses;
use Yii;
 
class UserController extends DefaultController
{
    
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator']['except'] = ['options', 'login', 'signup'];

        return $behaviors;
    }

    public function actionLogin()
    {
        $form = new LoginForm();
        $params = Yii::$app->request->post();

        if($form->load($params, '') && $result = $form->login()) {
            return $result;
        }

        Yii::$app->response->statusCode = Statuses::ERROR_500;

        return $form->errors;
    }

    public function actionSignup()
    {
        $form = new SignupForm();
        $params = Yii::$app->request->post();

        if($form->load($params, '') && $result = $form->signup()) {
            return $result;
        }

        Yii::$app->response->statusCode = Statuses::ERROR_500;

        return $form->errors;
    }
}