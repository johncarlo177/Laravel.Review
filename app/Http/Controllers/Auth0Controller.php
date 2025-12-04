<?php

namespace App\Http\Controllers;

use App\Support\Auth\Auth0\Auth0Manager;

class Auth0Controller extends Controller
{
    private Auth0Manager $auth0;

    public function __construct()
    {
        $this->auth0 = new Auth0Manager;
    }

    public function login()
    {
        return $this->auth0->redirectToAuth0Login();
    }

    public function logout()
    {
        // Clear the authentication cookie if it exists
        cookie()->queue(cookie()->forget('token'));
        
        // If Auth0 is not enabled, just redirect to home
        if (!$this->auth0->isEnabled()) {
            return redirect('/')->withHeaders([
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);
        }
        
        return $this->auth0->redirectToAuth0Logout();
    }

    public function handleCallback()
    {
        return $this->auth0->handleCallback();
    }
}
