<?php

namespace app\modules\v1\controllers;

use app\modules\v1\models\Todos;
use Yii;

class TodosController extends DefaultController
{

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator']['except'] = ['options'];

        return $behaviors;
    }

    public function actionCreate()
    {
        $params = Yii::$app->request->post();
        $todo = new Todos();
        $todo->user_id = Yii::$app->user->id;
        $todo->type = $params['type'];
        $todo->title = $params['title'];
        $todo->description = $params['description'];

        if($todo->save()) {
            return $todo;
        }
    }

    public function actionList()
    {
        $user_id = Yii::$app->user->id;

        return Todos::find()->where(['user_id' => $user_id])->all();
    }
}