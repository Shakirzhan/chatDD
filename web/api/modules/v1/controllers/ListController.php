<?php
namespace app\api\modules\v1\controllers;

class ListController extends DefaultController
{
    // We are using the regular web app modules:
    public function actionItem()
    {
        return [
            'bodysuit',
            'booties',
            'romper',
            'sleeper',
            'cloth diaper',
            'bib',
        ];  
    }

    public function actionHint()
    {
        return [
            'bodysuit',
            'booties',
            'romper',
            'sleeper',
            'cloth diaper',
            'bib',
        ];
    }
}