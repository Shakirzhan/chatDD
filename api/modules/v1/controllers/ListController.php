<?php
namespace app\modules\v1\controllers;

class ListController extends DefaultController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator']['except'] = ['options'];

        return $behaviors;
    }
    // We are using the regular web app modules:
    public function actionItem()
    {
        return [];  
    }

}