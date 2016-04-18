<?php
Class ExpensifyApp {

    private $apiUrl = 'https://api.expensify.com';
    private $partnerName = 'applicant';
    private $partnerPassword = 'd7c3119c6cdab02d68d9';
    private $authToken = '';
    private $partnerUserID;
    private $partnerUserSecret;


    public function __construct($params){

        if (isset($params['authToken']))
        {
            $this->authToken = $params['authToken'];
        }
        else
        {
            $this->partnerUserID = $params['username'];
            $this->partnerUserSecret = $params['password'];
        }

    }

    /*Sets auth-token for 1 hour*/
    public function setAuthToken($token){

        $cookie_name = "authToken";
        $cookie_value = $token;
        setcookie($cookie_name, $cookie_value, time() + (86400 / 24), "/");
        
    }

    /*returns a JSON encoded errorMsg */
    public function returnError($data){

        $messageArray = explode(" ", $data->message);
        $code = array_shift($messageArray);
        $message = implode(" ", $messageArray);

        return json_encode(['errorMsg'=> $message]);
    }

    /*
     * Function takes in an array of query params and calls the appropriate api function.
     * Chose to implement it this way because every API call is a GET request
    */
    public function get($data){

        if ($this->authToken != '')
        {
            $data['authToken'] = $this->authToken;
        }
        else
        {
            $data['partnerUserID'] = $this->partnerUserID;
            $data['partnerUserSecret'] = $this->partnerUserSecret;
        }
        
        $data['partnerName'] = $this->partnerName;
        $data['partnerPassword'] = $this->partnerPassword;

        $queryString = http_build_query($data);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $this->apiUrl . '?' . $queryString
        ));

        $result = json_decode(curl_exec($curl));

        curl_close($curl);

        return $result;
    }
}