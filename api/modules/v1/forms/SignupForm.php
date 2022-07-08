<?php

namespace app\modules\v1\forms;

use app\modules\v1\models\User;
use yii\base\Model;

class SignupForm extends Model
{
    public $username;
    public $password;
    public $email;

    public function rules()
    {
        return [
            [['username', 'password', 'email'], 'required', 'message' => 'Обязательное для заполнения!'],
            ['email', 'email', 'message' => 'Электронная почта не является действительным адресом электронной почты.'],
            ['username', 'checkUniquenessUsername'],
            ['email', 'checkUniquenessEmail'],
        ];
    }

    public function checkUniquenessEmail()
    {
        $user_email = User::findByEmail($this->email);

        if($user_email) {
            $this->addError("Email", "Email пользователя занято!");
        }
    }

    public function checkUniquenessUsername()
    {
        $user_name = User::findByUsername($this->username);

        if($user_name) {
            $this->addError('Имя', "Имя пользователя занято!");
        }
    }

    public function signup()
    {
        $user = new User();
        $user->username = $this->username;
        $user->email = $this->email;
        $user->status = User::STATUS_ACTIVE;
        $user->setPassword($this->password);
        $user->generateAuthKey();

        if($user->save()) {
            return [
                'token' => $user->auth_key
            ];
        }

        return [
            'message' => 'Ошибка сохранения данных!',
            'data' => [
                'hasErrors' => $user->hasErrors(),
                'getErrors' => $user->getErrors(),
            ]
        ];
    }
}