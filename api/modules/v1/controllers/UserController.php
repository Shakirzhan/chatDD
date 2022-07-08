<?php

namespace app\modules\v1\controllers;

use app\modules\v1\forms\LoginForm;
use app\modules\v1\forms\SignupForm;
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
        $form->load($params, '');

        if($form->validate()) {
            return $form->login();
        }

        return $form->errors;
    }

    public function actionSignup()
    {
        $form = new SignupForm();
        $params = Yii::$app->request->post();
        $form->load($params, '');

        if($form->validate()) {
            return $form->signup();
        }

        return $form->errors;
    }
}