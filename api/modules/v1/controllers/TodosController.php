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
        $todo->status = Todos::ACTIVE_STATUS;
        $todo->type = $params['type'];
        $todo->title = $params['title'];
        $todo->description = $params['description'];
        $todo->index = $params['index'];

        if($todo->save()) {
            return $todo;
        }
    }

    public function actionDelete($id)
    {
        $todo = Todos::find()
            ->where(['id' => $id])
            ->one();
        $todo->status = Todos::REMOVED_STATUS;
        $todo->save();
    }

    public function actionUpdate()
    {
        $user_id = Yii::$app->user->id;
        $params = Yii::$app->request->post();
        $todo = Todos::find()
            ->where(['id' => $params['id'], 'user_id' => $user_id])
            ->one();

        if($params['title']) {
            $todo->title = $params['title'];
        }

        if($params['description']) {
            $todo->description = $params['description'];
        }

        if($params['type']) {
            $todo->type = $params['type'];
        }

        if(is_numeric($params['index']) && $params['ids']) {
            array_walk($params['ids']['done'], function($id, $index) {
                $todoUpdateIndex = Todos::find()->where(['id' => $id])->one();
                $todoUpdateIndex->index = $index;
                $todoUpdateIndex->save();
            });
            array_walk($params['ids']['inProgress'], function($id, $index) {
                $todoUpdateIndex = Todos::find()->where(['id' => $id])->one();
                $todoUpdateIndex->index = $index;
                $todoUpdateIndex->save();
            });
            array_walk($params['ids']['todo'], function($id, $index) {
                $todoUpdateIndex = Todos::find()->where(['id' => $id])->one();
                $todoUpdateIndex->index = $index;
                $todoUpdateIndex->save();
            });
        }

        return $todo->save();
    }

    public function actionList()
    {
        $user_id = Yii::$app->user->id;

        return Todos::find()
            ->where(['user_id' => $user_id])
            ->andWhere(['status' => Todos::ACTIVE_STATUS])
            ->orderBy('index', 'ASC')
            ->all();
    }
}