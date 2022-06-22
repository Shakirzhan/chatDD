<?php

namespace app\modules\v1\controllers;

use app\modules\v1\models\User;
use Yii;
 
class UserController extends DefaultController
{

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator']['except'] = ['options', 'login'];

        return $behaviors;
    }

    public function actionLogin()
    {
        $params = Yii::$app->request->post();

        if(empty($params['username']) || empty($params['password'])) {
            return [
                'message' => "Нужен логин и пароль",
                'data' => ''
            ];
        }

        $user = User::findByUsername($params['username']);

        if ($user->validatePassword($params['password'])) {
            if(isset($params['consumer'])) {
                $user->consumer = $params['consumer'];
            }

            if(isset($params['access_given'])) {
                $user->access_given = $params['access_given'];
            }

            $user->generateAuthKey();
            $user->save();

            return [
                'message' => 'Войти успешно, сохранить токен',
                'data' => [
                    'id' => $user->username,
                    'token' => $user->auth_key,
                    'email' => $user['email'],
                ]
            ];
        }

        return [
            'message' => 'Имя пользователя и пароль не найдены. Проверить снова!',
            'data' => ''
        ];
    }

    public function actionSignup()
    {
        $model = new User();
        $params = Yii::$app->request->post();

        if(!$params) {
            return [
                'message' => "Нужно имя пользователя, пароль и адрес электронной почты",
                'data' => ''
            ];
        }

        $model->username = $params['username'];
        $model->email = $params['email'];
        $model->setPassword($params['password']);
        $model->generateAuthKey();

        if ($model->save()) {
            return [
                'message' => 'Вы стали участником',
                'data' => User::findByUsername($model->username),
            ];
        }

        $model->getErrors();

        return [
            'message' => 'Ошибка сохранения данных!',
            'data' => [
                'hasErrors' => $model->hasErrors(),
                'getErrors' => $model->getErrors(),
            ]
        ];
    }
}