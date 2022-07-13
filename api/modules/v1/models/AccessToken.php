<?php

namespace app\modules\v1\models;

use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use app\modules\v1\models\User;

/**
 * AccessToken Class for access_token table.
 * This is class to manage access_token than will be used in UserIdentity Class
 * UserIdentity class will find any token that active at current date and give Authorization based on access_token status
 * 
 * @property integer $id
 * @property integer  $user_id
 * @property string  $token
 * @property string  $used_at
 * @property string  $expire_at
 * @property integer $created_at
 * @property integer $updated_at
 * @property string  $tokenExpiration
 * @property string  $defaultAccessGiven
 * @property integer $defaultConsumern
 *
 * 
 * @author Heru Arief Wijaya @2020
 * 
 */
class AccessToken extends ActiveRecord
{
    public $tokenExpiration = 60 * 24 * 365; // in seconds

    /**
     * Declares the name of the database table associated with this AR class
     * 
     * @return string
     */
    public static function tableName()
    {
        return '{{%access_token}}';
    }

    /**
     * Generate new access_token that will be used at Authorization
     * 
     * @param object $user the User Object (User::findOne($id))
     */
    public static function generateAuthKey($user)
    {
        $accessToken = new AccessToken();
        $accessToken->user_id = $user->id ?? User::find()->count() + 1;
        $accessToken->token = $user->auth_key;
        $accessToken->used_at = strtotime("now");
        $accessToken->expire_at = $accessToken->tokenExpiration + $accessToken->used_at;
        $accessToken->save();
    }

    /**
     * Make all user token based on any user_id expired
     * 
     * @param int @userId
     */
    public static function makeAllUserTokenExpiredByUserId($userId){
        AccessToken::updateAll(['expire_at' => strtotime("now")], ['user_id' => $userId]);
    }

    /**
     * Expire any access_token
     * 
     * @return bool
     */
    public function expireThisToken(){
        $this->expire_at = strtotime("now");
        return $this->save();
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'used_at', 'expire_at', 'created_at', 'updated_at'], 'integer'],
            [['token'], 'required'],
            [['token'], 'string', 'max' => 32],
            [['token'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'token' => 'Token',
            'used_at' => 'Used At',
            'expire_at' => 'Expire At',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function behaviors()
    {
        return [
            TimestampBehavior::class,
        ];
    }
}