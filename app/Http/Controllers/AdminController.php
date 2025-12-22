<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function showLogin()
    {
        // Check if already logged in as admin
        if (session('admin')) {
            return redirect('/admin/dashboard');
        }
        
        return Inertia::render('admin/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Hardcoded admin credentials
        $adminEmail = 'admin@example.com';
        $adminPassword = '123456';

        if ($request->email !== $adminEmail || $request->password !== $adminPassword) {
            throw ValidationException::withMessages([
                'email' => ['Invalid admin credentials.']
            ]);
        }

        // Create a simple admin user object for session
        $admin = (object) [
            'id' => 1,
            'email' => $adminEmail,
            'name' => 'Admin',
            'role' => 'admin'
        ];

        // Store admin in session
        session(['admin' => $admin]);

        // Set token cookie for API authentication
        $token = 'admin_token_' . time();
        cookie()->queue('admin_token', $token, 60 * 24 * 365); // 1 year

        return response()->json([
            'token' => $token,
            'user' => $admin,
            'redirect' => '/admin/dashboard'
        ]);
    }

    public function dashboard()
    {
        // Check if admin is logged in
        if (!session('admin')) {
            return redirect('/admin/login');
        }

        return Inertia::render('admin/Dashboard', [
            'admin' => session('admin')
        ]);
    }

    public function logout()
    {
        session()->forget('admin');
        cookie()->queue(cookie()->forget('admin_token'));
        
        return redirect('/admin/login');
    }
}

