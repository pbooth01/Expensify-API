<?php

define('EXPENSIFYAPI', dirname(__FILE__) );

require_once(EXPENSIFYAPI.'/classes/ExpensifyApp.php');

/*Pulls what the user wants to execute from the command param*/
if (isset($_GET['command'])) {

    switch ($_GET['command']) {

        case 'authenticate': /* Authenticate User */

            $credentials = array('username' => $_GET['username'], 'password' => $_GET['password']);

            $expensify = new ExpensifyApp($credentials);

            $result = $expensify->get(array('command' => 'Authenticate', 'useExpensifyLogin' => 'false'));

            if($result->jsonCode != 200){
                echo $expensify->returnError($result);
            }else{
                $expensify->setAuthToken($result->authToken);
                echo json_encode($result);
            }

            break;
        case 'transactions': /*Get all transactions for the user*/

            if(isset($_COOKIE['authToken'])){

                $token = $_COOKIE['authToken'];

                $expensify = new ExpensifyApp(array('authToken' => $token));

                $result = $expensify->get(array('command' => 'Get', 'returnValueList' => 'transactionList'));

                if($result->jsonCode != 200){
                    echo $expensify->returnError($result);
                }else{
                    echo json_encode($result);
                }
            }

            break;

        case 'addTransaction': /*Add new transaction for the user*/

            if(isset($_COOKIE['authToken'])){

                $token = $_COOKIE['authToken'];

                $expensify = new ExpensifyApp(array('authToken' => $token));

                $result = $expensify->get(array(
                    'command' => 'CreateTransaction',
                    'created' => $_GET['created'],
                    'merchant' => $_GET['merchant'],
                    'amount' => $_GET['amount'] * 100
                ));

                if($result->jsonCode != 200){
                    echo $expensify->returnError($result);
                }else{
                    echo json_encode($result);
                }
            }
            break;

        default:

            break;
    }
}