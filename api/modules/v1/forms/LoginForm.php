<?php

namespace app\modules\v1\forms;

use app\modules\v1\models\User;
use yii\base\Model;

class LoginForm extends Model
{
    public $username;
    public $password;

    public function rules()
    {
        return [
            [['username', 'password'], 'required', 'message' => 'Обязательное для заполнения!'],
            ['password', 'validatePassword'],
        ];
    }

    public function validatePassword()
    {
        $user = User::findByUsername($this->username);

        if (!$user || !$user->validatePassword($this->password)) {
            $this->addError('password', 'Неправильное имя пользователя или пароль.');
        }
    }

    public function login()
    {
        $user = User::findByUsername($this->username);
        $user->generateAuthKey();

       return [
           'token' => $user->auth_key
       ];
    }
}