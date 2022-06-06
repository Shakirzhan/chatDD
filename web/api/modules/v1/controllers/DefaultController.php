<?php
namespace app\api\modules\v1\controllers;
 
use yii\web\Controller;
use yii\web\Response;
use yii\filters\ContentNegotiator;

class DefaultController extends Controller
{
    public function behaviors()
    {
        return [
            [
                'class' => ContentNegotiator::class,
                'formats' => [
                    'application/json' => Response::FORMAT_JSON,
                    'application/xml' => Response::FORMAT_XML,
                ],
                'languages' => [
                    'en-US',
                    'de',
                ],
            ],
        ];
    }
}