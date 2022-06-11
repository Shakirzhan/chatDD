<?php
namespace app\modules\v1\controllers;

use app\modules\v1\models\Messages;
use Yii;

class MessageController extends DefaultController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator']['except'] = ['options'];

        return $behaviors;
    }
    // We are using the regular web app modules:
    public function actionSend()
    {
        $request = Yii::$app->request->post();
        $send_user_id = Yii::$app->user->id;
        $customer = new Messages();
        $customer->send_user_id = $send_user_id;
        $customer->get_user_id = $request['get_user_id'];
        $customer->message = $request['message'];
        $customer->save();
    }

    public function actionMessages($user_id)
    {
        $send_user_id = Yii::$app->user->id;
        return Messages::find()
        ->where(['send_user_id' => [$send_user_id, $user_id]])
        ->andWhere(['get_user_id' => [$send_user_id, $user_id]])
        ->all();
    }
}