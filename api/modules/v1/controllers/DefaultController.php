<?php
namespace app\modules\v1\controllers;
 
use yii\web\Controller;
use yii\web\Response;
use yii\filters\ContentNegotiator;
use yii\filters\auth\HttpBearerAuth;

class DefaultController extends Controller
{
    public function actions()
    {
        return [
            'options' => [
                'class' => 'yii\rest\OptionsAction',
            ],
        ];
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        return array_merge($behaviors, [
            'contentNegotiator' => [
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

            'authenticator' => [
                'class' => HttpBearerAuth::className(),
            ],

            // For cross-domain AJAX request
            'corsFilter'  => [
                'class' => \yii\filters\Cors::className(),
                'cors'  => [
                    // restrict access to domains:
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Allow-Credentials' => null,
                    'Access-Control-Max-Age' => 86400,
                    'Access-Control-Expose-Headers' => []
                ],
            ],

        ]);
    }
}