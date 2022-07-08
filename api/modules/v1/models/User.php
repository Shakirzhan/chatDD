<?php

namespace app\modules\v1\models;

use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * User Class for access_token table.
 * @property string $username
 * @property string $status
 * @property string $email
 * @property string $password_hash
 * @property string $auth_key
 */
class User extends ActiveRecord implements IdentityInterface
{

     const STATUS_ACTIVE   = 10;
     const STATUS_INACTIVE = 1;
     const STATUS_DELETED  = 0;   
 
     /**
      * List of names for each status.
      * @var array
      */
     public $statusList = [
         self::STATUS_ACTIVE   => 'Active',
         self::STATUS_INACTIVE => 'Inactive',
         self::STATUS_DELETED  => 'Deleted'
     ];

    /**
     * Declares the name of the database table associated with this AR class.
     *
     * @return string
     */
    public static function tableName()
    {
        return '{{%user}}';
    }
 
     /**
      * Returns the validation rules for attributes.
      *
      * @return array
      */
     public function rules()
     {
         return [
             ['username', 'filter', 'filter' => 'trim'],
             ['username', 'required'],
             ['username', 'string', 'min' => 2, 'max' => 255],        
             ['username', 'unique'],
             ['email', 'filter', 'filter' => 'trim'],
             ['email', 'required'],
             ['email', 'email'],
             ['email', 'string', 'max' => 255],
             ['status', 'required'],
         ];
     }

    /**
     * Finds an identity by the given ID.
     *
     * @param  int|string $id The user id.
     * @return IdentityInterface|static
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id, 'status' => User::STATUS_ACTIVE]);
    }

    /**
     * Returns an ID that can uniquely identify a user identity.
     *
     * @return int|mixed|string
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    /**
     * Finds an identity by the given access token.
     *
     * @param  mixed $token
     * @param  null  $type
     * @return void|IdentityInterface
     *
     * @throws NotSupportedException
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        $accessToken = AccessToken::find()
            ->where(['token' => $token])
            ->andWhere(['>', 'expire_at', strtotime('now')])
            ->one();

        if(!$accessToken) {
            return $accessToken;
        }

        return User::findOne(['id' => $accessToken->user_id]);
    }
 
     /**
      * Returns a list of behaviors that this component should behave as.
      *
      * @return array
      */
     public function behaviors()
     {
         return [
             TimestampBehavior::className(),
         ];
     }
 
     /**
      * Returns the attribute labels.
      *
      * @return array
      */
     public function attributeLabels()
     {
         return [
             'id' => Yii::t('app', 'ID'),
             'username' => Yii::t('app', 'Username'),
             'password' => Yii::t('app', 'Password'),
             'email' => Yii::t('app', 'Email'),
             'status' => Yii::t('app', 'Status'),
             'created_at' => Yii::t('app', 'Created At'),
             'updated_at' => Yii::t('app', 'Updated At'),
         ];
     }

     /**
      * Finds user by username.
      *
      * @param  string $username
      * @return static|null
      */
     public static function findByUsername($username)
     {
         return static::findOne(['username' => $username]);
     }  
     
     /**
      * Finds user by email.
      *
      * @param  string $email
      * @return static|null
      */
     public static function findByEmail($email)
     {
         return static::findOne(['email' => $email]);
     } 
 
     /**
      * Finds user by password reset token.
      *
      * @param  string $token Password reset token.
      * @return null|static
      */
     public static function findByPasswordResetToken($token)
     {
         if (!static::isPasswordResetTokenValid($token)) {
             return null;
         }
 
         return static::findOne([
             'password_reset_token' => $token,
             'status' => User::STATUS_ACTIVE,
         ]);
     }
 
     /**
      * Finds user by account activation token.
      *
      * @param  string $token Account activation token.
      * @return static|null
      */
     public static function findByAccountActivationToken($token)
     {
         return static::findOne([
             'account_activation_token' => $token,
             'status' => User::STATUS_INACTIVE,
         ]);
     }

     /**
      * Returns the user status in nice format.
      *
      * @param  integer $status Status integer value.
      * @return string          Nicely formatted status.
      */
     public function getStatusName($status)
     {
         return $this->statusList[$status];
     }
 
     /**
      * Generates new password reset token.
      */
     public function generatePasswordResetToken()
     {
         $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
     }
     
     /**
      * Removes password reset token.
      */
     public function removePasswordResetToken()
     {
         $this->password_reset_token = null;
     }
 
     /**
      * Finds out if password reset token is valid.
      * 
      * @param  string $token Password reset token.
      * @return bool
      */
     public static function isPasswordResetTokenValid($token)
     {
         if (empty($token)) {
             return false;
         }
 
         $timestamp = (int) substr($token, strrpos($token, '_') + 1);
         $expire = Yii::$app->params['user.passwordResetTokenExpire'];

         return $timestamp + $expire >= time();
     }
 
     /**
      * Generates new account activation token.
      */
     public function generateAccountActivationToken()
     {
         $this->account_activation_token = Yii::$app->security->generateRandomString() . '_' . time();
     }
 
     /**
      * Removes account activation token.
      */
     public function removeAccountActivationToken()
     {
         $this->account_activation_token = null;
     }

    /**
     * Returns a key that can be used to check the validity of a given
     * identity ID. The key should be unique for each individual user, and
     * should be persistent so that it can be used to check the validity of
     * the user identity. The space of such keys should be big enough to defeat
     * potential identity attacks.
     *
     * @return string
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * Validates the given auth key.
     *
     * @param  string  $authKey The given auth key.
     * @return boolean          Whether the given auth key is valid.
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * Generates "remember me" authentication key.
     */
    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
        AccessToken::generateAuthKey($this);
    }

    /**
     * Validates password.
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    /**
     * Generates password hash from password and sets it to the model.
     */
    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }
}
