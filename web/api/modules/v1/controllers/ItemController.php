<?php
namespace app\controllers;

use Yii;
use app\models\Post;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class ItemController extends Controller
{
    public function actionIndex()
    {
        return [
            'item'
        ];
    }
}